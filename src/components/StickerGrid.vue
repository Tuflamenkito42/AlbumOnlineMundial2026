<template>
  <section class="grid-shell ion-padding-horizontal ion-padding-bottom">
    <div v-if="!stickers.length" class="empty-state">
      <h2>{{ copy.emptyTitle }}</h2>
      <p>{{ copy.emptyBody }}</p>
    </div>

    <div v-else class="sticker-flow">
      <section v-for="block in blocks" :key="block.key" class="country-group">
        <div class="section-divider">
          <img v-if="block.image" class="section-divider-flag" :src="block.image.src" :alt="block.image.alt" />
          <strong>{{ block.label }}</strong>
        </div>

        <div class="sticker-grid">
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
import { computed } from 'vue';
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
    result.push({
      key: 'section-extra-sticker',
      label: props.locale === 'en' ? 'Extra Sticker' : 'Extra Sticker',
      image: null,
      stickers: extraStickers,
    });
  }

  return result;
});
</script>