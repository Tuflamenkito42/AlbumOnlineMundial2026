<template>
  <section class="controls-shell ion-padding">
    <ion-searchbar
      :model-value="query"
      :placeholder="copy.searchPlaceholder"
      inputmode="search"
      enterkeyhint="search"
      show-clear-button="focus"
      @ionInput="$emit('update:query', ($event.detail.value ?? '').toString())"
    />

    <ion-segment
      :value="filter"
      @ionChange="$emit('update:filter', (($event.detail.value ?? 'missing').toString() as StickerFilter))"
      scrollable
    >
      <ion-segment-button value="missing">
        <ion-label>{{ copy.missing }}</ion-label>
      </ion-segment-button>
      <ion-segment-button value="owned">
        <ion-label>{{ copy.owned }}</ion-label>
      </ion-segment-button>
      <ion-segment-button value="all">
        <ion-label>{{ copy.all }}</ion-label>
      </ion-segment-button>
    </ion-segment>

  </section>
</template>

<script setup lang="ts">
import { IonLabel, IonSearchbar, IonSegment, IonSegmentButton } from '@ionic/vue';
import type { AppCopy } from '../types';
import type { StickerFilter } from '../types';

defineProps<{
  query: string;
  filter: StickerFilter;
  copy: AppCopy['controls'];
}>();

defineEmits<{
  (event: 'update:query', value: string): void;
  (event: 'update:filter', value: StickerFilter): void;
}>();
</script>