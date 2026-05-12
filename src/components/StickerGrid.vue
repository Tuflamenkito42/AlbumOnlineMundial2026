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
            :key="sticker.number"
            :sticker="sticker"
            :owned="ownedSet.has(sticker.number)"
            :copy="cardCopy"
            :locale="locale"
            :selected-extra-tier="extraTiers[sticker.number] ?? sticker.extraTier ?? null"
            @toggle="$emit('toggle', sticker.number)"
            @select-extra="$emit('select-extra', sticker.number, $event)"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import StickerCard from './StickerCard.vue';
import type { AppCopy, ExtraTier, Locale, Sticker } from '../types';
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
  extraTiers: Record<number, ExtraTier>;
}>();

defineEmits<{
  (event: 'toggle', number: number): void;
  (event: 'select-extra', number: number, value: ExtraTier): void;
}>();

const blocks = computed<GridBlock[]>(() => {
  const result: GridBlock[] = [];
  let previousSection = '';
  let currentBlock: GridBlock | null = null;

  for (const sticker of props.stickers) {
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

  return result;
});
</script>