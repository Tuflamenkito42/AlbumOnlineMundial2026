<template>
  <section class="grid-shell ion-padding-horizontal ion-padding-bottom">
    <div v-if="!stickers.length" class="empty-state">
      <h2>{{ copy.emptyTitle }}</h2>
      <p>{{ copy.emptyBody }}</p>
    </div>

    <div v-else class="sticker-flow">
      <section v-for="block in blocks" :key="block.key" class="country-group">
        <button
          type="button"
          class="section-divider section-toggle"
          :aria-expanded="isBlockOpen(block.key)"
          :aria-controls="panelId(block.key)"
          @click="toggleBlock(block.key)"
        >
          <span class="section-divider-main">
            <img v-if="block.image" class="section-divider-flag" :src="block.image.src" :alt="block.image.alt" />
            <strong>{{ block.label }}</strong>
          </span>
          <span class="section-divider-meta">
            <span class="section-divider-count">{{ block.stickers.length }}</span>
            <span class="section-chevron" :class="{ 'is-open': isBlockOpen(block.key) }">▾</span>
          </span>
        </button>

        <div v-if="isBlockOpen(block.key)" :id="panelId(block.key)" class="sticker-grid">
          <StickerCard
            v-for="sticker in block.stickers"
            :key="sticker.albumOrder"
            :sticker="sticker"
            :owned="isStickerCardOwned(sticker)"
            :copy="cardCopy"
            :locale="locale"
            :selected-tiers="extraTiers[sticker.albumOrder] ?? {}"
            @toggle="$emit('toggle', sticker.albumOrder)"
            @toggle-tier="$emit('toggle-tier', sticker.albumOrder, $event)"
            @decrement-tier="$emit('decrement-tier', sticker.albumOrder, $event)"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import StickerCard from './StickerCard.vue';
import type { AppCopy, ExtraTier, ExtraTierCounts, Locale, Sticker } from '../types';
import { getCountryFlagImage, getSectionDisplayName } from '../utils/countryFlags';

type GridBlock = {
  key: string;
  label: string;
  image: { src: string; alt: string } | null;
  stickers: Sticker[];
};

const props = defineProps<{
  stickers: Sticker[];
  ownedSet: Set<number>;
  copy: AppCopy['grid'];
  cardCopy: AppCopy['card'];
  locale: Locale;
  extraTiers: Record<number, ExtraTierCounts>;
}>();

const openSections = ref<Set<string>>(new Set());

function extraTierSum(counts: ExtraTierCounts | undefined): number {
  if (!counts) {
    return 0;
  }
  return Object.values(counts).reduce((sum, n) => sum + (typeof n === 'number' ? n : 0), 0);
}

function isStickerCardOwned(sticker: Sticker): boolean {
  if (props.ownedSet.has(sticker.albumOrder)) {
    return true;
  }
  if (sticker.series === 'Extra' && sticker.group === 'Extra') {
    return extraTierSum(props.extraTiers[sticker.albumOrder]) > 0;
  }
  return false;
}

defineEmits<{
  (event: 'toggle', number: number): void;
  (event: 'toggle-tier', number: number, tier: ExtraTier): void;
  (event: 'decrement-tier', number: number, tier: ExtraTier): void;
}>();

function isBlockOpen(key: string) {
  return openSections.value.has(key);
}

function toggleBlock(key: string) {
  const next = new Set(openSections.value);
  if (next.has(key)) {
    next.delete(key);
  } else {
    next.add(key);
  }
  openSections.value = next;
}

function panelId(key: string) {
  return `panel-${key.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
}

const blocks = computed<GridBlock[]>(() => {
  const result: GridBlock[] = [];
  const extraStickers = props.stickers.filter((sticker) => sticker.series === 'Extra');
  const regularStickers = props.stickers.filter((sticker) => sticker.series !== 'Extra');
  let previousSection = '';
  let currentBlock: GridBlock | null = null;

  for (const sticker of regularStickers) {
    if (sticker.section !== previousSection) {
      previousSection = sticker.section;
      currentBlock = {
        key: `section-${sticker.section}`,
        label: getSectionDisplayName(sticker.section, props.locale),
        image: getCountryFlagImage(sticker.section),
        stickers: [],
      };

      result.push(currentBlock);
    }

    currentBlock?.stickers.push(sticker);
  }

  if (extraStickers.length > 0) {
    const extraBlock: GridBlock = {
      key: 'section-extra-sticker',
      label: props.locale === 'en' ? 'Extra Sticker' : 'Extra Sticker',
      image: null,
      stickers: extraStickers,
    };

    // Insert the Extra Sticker block after the FIFA World Cup History block when present,
    // so it appears right below "Historia de la Copa Mundial" in the accordion order.
    const historyKey = 'section-FIFA World Cup History';
    const historyIndex = result.findIndex((b) => b.key === historyKey);
    if (historyIndex >= 0) {
      result.splice(historyIndex + 1, 0, extraBlock);
    } else {
      result.push(extraBlock);
    }
  }
  // Remove variant entries like BEL2s, BEL3s... and GER2s, GER3s... from Belgium/Germany blocks
  for (const block of result) {
    try {
      if (block.key === 'section-Belgium') {
        block.stickers = block.stickers.filter((sticker) => !/^BEL\d+s$/i.test(String(sticker.code ?? '')));
      }

      if (block.key === 'section-Germany') {
        block.stickers = block.stickers.filter((sticker) => !/^GER\d+s$/i.test(String(sticker.code ?? '')));
      }
    } catch (e) {
      // defensive: if sticker shape unexpected, skip filtering for that block
    }
  }

  return result;
});

watch(
  blocks,
  (currentBlocks) => {
    const validKeys = new Set(currentBlocks.map((block) => block.key));
    openSections.value = new Set([...openSections.value].filter((key) => validKeys.has(key)));
  },
  { immediate: true },
);
</script>