import { computed, onMounted, ref, watch } from 'vue';
import type { ExtraTier, ExtraTierCounts, PersistedProgress, Sticker, StickerFilter } from '../types';

const STORAGE_KEY = 'mundial-cartas-2026-progress';
const VALID_TIERS: ExtraTier[] = ['Base', 'Gold', 'Silver', 'Bronze'];

function canUseStorage() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function loadProgress(): PersistedProgress | null {
  if (!canUseStorage()) {
    return null;
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as PersistedProgress;
    return Array.isArray(parsed.ownedIds) ? parsed : null;
  } catch {
    return null;
  }
}

function fold(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

function normalizeTierCounts(value: unknown): ExtraTierCounts {
  if (Array.isArray(value)) {
    // Backward compatibility: previous format stored a list of selected tiers.
    return Object.fromEntries(
      value
        .filter((tier): tier is ExtraTier => typeof tier === 'string' && VALID_TIERS.includes(tier as ExtraTier))
        .map((tier) => [tier, 1]),
    ) as ExtraTierCounts;
  }

  if (!value || typeof value !== 'object') {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([tier, count]) => VALID_TIERS.includes(tier as ExtraTier) && typeof count === 'number' && count > 0)
      .map(([tier, count]) => [tier, Math.floor(count as number)]),
  ) as ExtraTierCounts;
}

function saveProgress(ownedIds: number[], extraTiers: Record<number, ExtraTierCounts>) {
  if (!canUseStorage()) {
    return;
  }

  const payload: PersistedProgress = {
    version: 3,
    ownedIds: [...ownedIds].sort((a, b) => a - b),
    extraTiers: Object.fromEntries(
      Object.entries(extraTiers).map(([key, tiers]) => [key, tiers])
    ),
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function useCollection(stickers: Sticker[]) {
  const ownedIds = ref<number[]>([]);
  const extraTiers = ref<Record<number, ExtraTierCounts>>({});
  const query = ref('');
  const filter = ref<StickerFilter>('all');

  onMounted(() => {
    const saved = loadProgress();
    if (saved) {
      ownedIds.value = saved.ownedIds.filter((id) => id >= 1 && id <= stickers.length);
      extraTiers.value = Object.fromEntries(
        Object.entries(saved.extraTiers ?? {})
          .map(([key, tiers]) => [Number(key), normalizeTierCounts(tiers)])
          .filter(([, counts]) => Object.keys(counts).length > 0),
      ) as Record<number, ExtraTierCounts>;
    }
  });

  watch(
    [ownedIds, extraTiers],
    (value) => {
      const [currentOwnedIds, currentExtraTiers] = value;
      saveProgress(currentOwnedIds, currentExtraTiers as Record<number, ExtraTierCounts>);
    },
    { deep: true },
  );

  const ownedSet = computed(() => new Set(ownedIds.value));

  function extraTierTotalFor(albumOrder: number): number {
    const counts = extraTiers.value[albumOrder] ?? {};
    return Object.values(counts).reduce((sum, n) => sum + (typeof n === 'number' ? n : 0), 0);
  }

  /** Incluye carta marcada en el álbum o extras con algún contador de versión > 0. */
  function isStickerOwnedForFilter(sticker: Sticker): boolean {
    if (ownedSet.value.has(sticker.albumOrder)) {
      return true;
    }
    if (sticker.series === 'Extra' && sticker.group === 'Extra' && extraTierTotalFor(sticker.albumOrder) > 0) {
      return true;
    }
    return false;
  }

  function isAlbumProgressSticker(sticker: Sticker) {
    if (['Extra', 'CC', 'Panini'].includes(sticker.series)) {
      return false;
    }

    // Exclude McDonald's promos from album progress as requested.
    if (sticker.group === "McDonald's" || sticker.section === "McDonald's Exclusive") {
      return false;
    }

    return true;
  }

  const stickerByOrder = computed(() => new Map(stickers.map((sticker) => [sticker.albumOrder, sticker])));
  const albumStickers = computed(() => stickers.filter((sticker) => isAlbumProgressSticker(sticker)));
  const totalCount = computed(() => albumStickers.value.length);
  const ownedCount = computed(() =>
    ownedIds.value.filter((id) => {
      const sticker = stickerByOrder.value.get(id);
      return sticker ? isAlbumProgressSticker(sticker) : false;
    }).length,
  );
  const missingCount = computed(() => totalCount.value - ownedCount.value);
  const progressPercent = computed(() =>
    totalCount.value === 0 ? 0 : Math.round((ownedCount.value / totalCount.value) * 100),
  );

  const visibleStickers = computed(() => {
    const search = query.value.trim();
    const numberQuery = Number(search);
    const hasSearch = search.length > 0;

    const filtered = stickers
      .filter((sticker) => {
        const owned = isStickerOwnedForFilter(sticker);

        if (filter.value === 'owned' && !owned) {
          return false;
        }

        if (filter.value === 'missing' && owned) {
          return false;
        }

        if (!hasSearch) {
          return true;
        }

        const foldedQuery = fold(search);
        const codeCompact = fold(sticker.code.replace(/\s+/g, ''));

        if (!Number.isNaN(numberQuery) && (sticker.albumOrder === numberQuery || String(sticker.albumOrder).includes(search))) {
          return true;
        }

        if (foldedQuery.length > 0 && codeCompact.includes(foldedQuery.replace(/\s+/g, ''))) {
          return true;
        }

        return [sticker.code, sticker.name, sticker.country, sticker.group, sticker.section]
          .filter(Boolean)
          .some((value) => fold(String(value)).includes(foldedQuery));
      })
      .sort((left, right) => left.albumOrder - right.albumOrder);

    return filtered;
  });

  /** Cartas visibles en la rejilla que sí entran en el total del álbum (mismo criterio que totalCount). */
  const visibleAlbumCount = computed(
    () => visibleStickers.value.filter((sticker) => isAlbumProgressSticker(sticker)).length,
  );

  function toggleSticker(number: number) {
    const set = new Set(ownedIds.value);

    if (set.has(number)) {
      set.delete(number);
    } else {
      set.add(number);
    }

    ownedIds.value = [...set].sort((a, b) => a - b);
  }

  function setOwned(number: number, value: boolean) {
    const set = new Set(ownedIds.value);

    if (value) {
      set.add(number);
    } else {
      set.delete(number);
    }

    ownedIds.value = [...set].sort((a, b) => a - b);
  }

  function resetCollection() {
    ownedIds.value = [];
    extraTiers.value = {};
  }

  function exportProgress() {
    const payload: PersistedProgress = {
      version: 3,
      ownedIds: [...ownedIds.value].sort((a, b) => a - b),
      extraTiers: extraTiers.value,
      updatedAt: new Date().toISOString(),
    };

    return JSON.stringify(payload, null, 2);
  }

  function importProgress(raw: string) {
    const parsed = JSON.parse(raw) as Partial<PersistedProgress>;
    if (!parsed || !Array.isArray(parsed.ownedIds)) {
      throw new Error('El archivo no contiene un progreso válido.');
    }

    ownedIds.value = parsed.ownedIds
      .filter((id) => Number.isInteger(id) && id >= 1 && id <= stickers.length)
      .sort((a, b) => a - b);

    extraTiers.value = Object.fromEntries(
      Object.entries(parsed.extraTiers ?? {})
        .map(([key, tiers]) => [Number(key), normalizeTierCounts(tiers)])
        .filter(([, counts]) => Object.keys(counts).length > 0),
    ) as Record<number, ExtraTierCounts>;
  }

  function setExtraTier(number: number, tier: ExtraTier) {
    const current = extraTiers.value[number] ?? {};
    extraTiers.value = {
      ...extraTiers.value,
      [number]: {
        ...current,
        [tier]: (current[tier] ?? 0) + 1,
      },
    };
  }

  function decrementExtraTier(number: number, tier: ExtraTier) {
    const current = { ...(extraTiers.value[number] ?? {}) };
    const count = current[tier] ?? 0;
    if (count <= 0) {
      return;
    }
    const next = count - 1;
    if (next <= 0) {
      delete current[tier];
    } else {
      current[tier] = next;
    }
    if (Object.keys(current).length === 0) {
      const copy = { ...extraTiers.value };
      delete copy[number];
      extraTiers.value = copy;
    } else {
      extraTiers.value = {
        ...extraTiers.value,
        [number]: current,
      };
    }
  }

  function getExtraTiers(number: number) {
    return extraTiers.value[number] ?? {};
  }
  
  function hasExtraTier(number: number, tier: ExtraTier) {
    return (extraTiers.value[number]?.[tier] ?? 0) > 0;
  }

  return {
    filter,
    missingCount,
    ownedCount,
    ownedIds,
    extraTiers,
    ownedSet,
    progressPercent,
    query,
    resetCollection,
    exportProgress,
    importProgress,
    getExtraTiers,
    hasExtraTier,
    setOwned,
    setExtraTier,
    decrementExtraTier,
    toggleSticker,
    totalCount,
    visibleAlbumCount,
    visibleStickers,
  };
}