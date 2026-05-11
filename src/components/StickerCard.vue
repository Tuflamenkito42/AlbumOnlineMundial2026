<template>
  <button
    class="sticker-card"
    :class="{ 'is-owned': owned }"
    type="button"
    :aria-pressed="owned"
    @click="$emit('toggle')"
  >
    <span class="sticker-topline">
      <span class="sticker-badge">#{{ sticker.albumOrder.toString().padStart(3, '0') }}</span>
      <span class="sticker-code">{{ sticker.code }}</span>
      <span class="sticker-series" :data-series="sticker.series">{{ sticker.series }}</span>
    </span>

    <strong class="sticker-country">{{ countryFlag }} {{ sticker.country }}</strong>
    <span class="sticker-name">{{ sticker.name }}</span>

    <span class="sticker-meta">
      <span class="sticker-group">{{ sticker.group }}</span>
      <span class="sticker-category">{{ sticker.category }}</span>
    </span>

    <span class="owned-overlay">{{ owned ? copy.owned : copy.missing }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AppCopy, Sticker } from '../types';
import { getCountryFlag } from '../utils/countryFlags';

interface Props {
  sticker: Sticker;
  owned: boolean;
  copy: AppCopy['card'];
}

const props = defineProps<Props>();

const countryFlag = computed(() => getCountryFlag(props.sticker.country));

defineEmits<{
  (event: 'toggle'): void;
}>();
</script>