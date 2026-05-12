<template>
  <div
    class="sticker-card"
    :class="{ 'is-owned': owned }"
    role="button"
    tabindex="0"
    :aria-pressed="owned"
    @click="emit('toggle')"
    @keydown.enter.prevent="emit('toggle')"
    @keydown.space.prevent="emit('toggle')"
  >
    <span class="sticker-topline">
      <span class="sticker-badge">{{ albumCodeLabel }}</span>
      <span
        v-if="sticker.series === 'Extra'"
        class="sticker-extra-pill"
        data-series="Extra"
      >
        {{ selectedExtraTierLabel }}
      </span>
      <span v-else class="sticker-series" :data-series="sticker.series">{{ sticker.series }}</span>
    </span>

    <strong class="sticker-country">
      <img v-if="countryFlagImage" class="sticker-country-flag" :src="countryFlagImage.src" :alt="countryFlagImage.alt" />
      <span>{{ countryName }}</span>
    </strong>
    <span class="sticker-name">{{ sticker.name }}</span>

    <span v-if="sticker.series === 'Extra'" class="sticker-extra-selector" role="group" :aria-label="extraSelectorLabel">
      <button
        v-for="option in extraTierOptions"
        :key="option.value"
        type="button"
        class="sticker-extra-choice"
        :class="[option.className, { 'is-active': selectedExtraTier === option.value }]"
        @click.stop="selectExtraTier(option.value)"
      >
        {{ option.label }}
      </button>
    </span>

    <span class="sticker-meta">
      <span class="sticker-group">{{ sticker.group }}</span>
      <span class="sticker-category">{{ sticker.category }}</span>
    </span>

    <span class="owned-overlay">{{ owned ? copy.owned : copy.missing }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AppCopy, ExtraTier, Locale, Sticker } from '../types';
import { getCountryDisplayName, getCountryFlagImage } from '../utils/countryFlags';

interface Props {
  sticker: Sticker;
  owned: boolean;
  copy: AppCopy['card'];
  locale: Locale;
  selectedExtraTier: ExtraTier | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: 'toggle'): void;
  (event: 'select-extra', value: ExtraTier): void;
}>();

const countryFlagImage = computed(() => getCountryFlagImage(props.sticker.country));
const countryName = computed(() => getCountryDisplayName(props.sticker.country, props.locale));
const albumCodeLabel = computed(() => formatAlbumCode(props.sticker.code));
const extraTierOptions = computed<Array<{ value: ExtraTier; label: string; className: string }>>(() => [
  { value: 'Base', label: props.locale === 'en' ? 'Base' : 'Base', className: 'is-base' },
  { value: 'Gold', label: props.locale === 'en' ? 'Gold' : 'Dorado', className: 'is-gold' },
  { value: 'Silver', label: props.locale === 'en' ? 'Silver' : 'Plata', className: 'is-silver' },
  { value: 'Bronze', label: props.locale === 'en' ? 'Bronze' : 'Bronce', className: 'is-bronze' },
]);
const selectedExtraTierLabel = computed(() => {
  const selected = props.selectedExtraTier ?? props.sticker.extraTier ?? 'Base';
  return extraTierOptions.value.find((option) => option.value === selected)?.label ?? 'Base';
});
const extraSelectorLabel = computed(() => (props.locale === 'en' ? 'Select extra tier' : 'Selecciona el tipo'));

function selectExtraTier(value: ExtraTier) {
  emit('select-extra', value);
}

function formatAlbumCode(code: string) {
  return code.replace(/^([A-Za-z]+)(\d+)$/, (_, prefix: string, digits: string) => `${prefix.toUpperCase()} ${digits}`);
}
</script>