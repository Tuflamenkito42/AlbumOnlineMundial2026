<template>
  <section class="grid-shell ion-padding-horizontal ion-padding-bottom">
    <div v-if="!stickers.length" class="empty-state">
      <h2>{{ copy.emptyTitle }}</h2>
      <p>{{ copy.emptyBody }}</p>
    </div>

    <div v-else class="sticker-grid">
      <StickerCard
        v-for="sticker in stickers"
        :key="sticker.number"
        :sticker="sticker"
        :owned="ownedSet.has(sticker.number)"
        :copy="cardCopy"
        @toggle="$emit('toggle', sticker.number)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import StickerCard from './StickerCard.vue';
import type { AppCopy, Sticker } from '../types';

defineProps<{
  stickers: Sticker[];
  ownedSet: Set<number>;
  copy: AppCopy['grid'];
  cardCopy: AppCopy['card'];
}>();

defineEmits<{
  (event: 'toggle', number: number): void;
}>();
</script>