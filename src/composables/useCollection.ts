import { computed, onMounted, ref, watch } from 'vue';
import type { ExtraTier, PersistedProgress, Sticker, StickerFilter } from '../types';

const STORAGE_KEY = 'mundial-cartas-2026-progress';

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

function saveProgress(ownedIds: number[], extraTiers: Record<string, ExtraTier>) {
  if (!canUseStorage()) {
    return;
  }

  const payload: PersistedProgress = {
    version: 2,
    ownedIds: [...ownedIds].sort((a, b) => a - b),
    extraTiers,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function useCollection(stickers: Sticker[]) {
  const ownedIds = ref<number[]>([]);
  const extraTiers = ref<Record<number, ExtraTier>>({});
  const query = ref('');
  const filter = ref<StickerFilter>('all');

  onMounted(() => {
    const saved = loadProgress();
    if (saved) {
      ownedIds.value = saved.ownedIds.filter((id) => id >= 1 && id <= stickers.length);
      extraTiers.value = Object.fromEntries(
        Object.entries(saved.extraTiers ?? {}).filter(([, tier]) => ['Base', 'Gold', 'Silver', 'Bronze'].includes(tier)),
      ) as Record<number, ExtraTier>;
    }
  });

  watch(
    [ownedIds, extraTiers],
    (value) => {
      const [currentOwnedIds, currentExtraTiers] = value;
      saveProgress(currentOwnedIds, currentExtraTiers as Record<string, ExtraTier>);
    },
    { deep: true },
  );

  const ownedSet = computed(() => new Set(ownedIds.value));
  const totalCount = computed(() => stickers.length);
  const ownedCount = computed(() => ownedIds.value.length);
  const missingCount = computed(() => totalCount.value - ownedCount.value);
  const progressPercent = computed(() =>
    totalCount.value === 0 ? 0 : Math.round((ownedCount.value / totalCount.value) * 100),
  );

  const visibleStickers = computed(() => {
    const search = query.value.trim();
    const numberQuery = Number(search);
    const hasSearch = search.length > 0;

    return stickers
      .filter((sticker) => {
        const owned = ownedSet.value.has(sticker.albumOrder);

        if (filter.value === 'owned' && !owned) {
          return false;
        }

        if (filter.value === 'missing' && owned) {
          return false;
        }

        if (!hasSearch) {
          return true;
        }

        const lowerSearch = search.toLowerCase();

        if (!Number.isNaN(numberQuery) && (sticker.albumOrder === numberQuery || String(sticker.albumOrder).includes(search))) {
          return true;
        }

        return [sticker.code, sticker.name, sticker.country, sticker.group]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(lowerSearch));
      })
      .sort((left, right) => {
        return left.albumOrder - right.albumOrder;
      });
  });

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
      version: 2,
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
      Object.entries(parsed.extraTiers ?? {}).filter(([, tier]) => ['Base', 'Gold', 'Silver', 'Bronze'].includes(tier)),
    ) as Record<number, ExtraTier>;
  }

  function setExtraTier(number: number, tier: ExtraTier) {
    extraTiers.value = {
      ...extraTiers.value,
      [number]: tier,
    };
  }

  function getExtraTier(number: number) {
    return extraTiers.value[number] ?? null;
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
    getExtraTier,
    setOwned,
    setExtraTier,
    toggleSticker,
    totalCount,
    visibleStickers,
  };
}