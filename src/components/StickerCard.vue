<template>
  <div class="sticker-card" :class="{ 'is-owned': owned }">
    <!-- Botón nativo: los clics funcionan bien dentro de ion-content / móvil (no usar div+click). -->
    <button
      type="button"
      class="sticker-card-hit"
      :aria-label="cardAriaLabel"
      @click="emit('toggle')"
    >
      <span class="sticker-topline">
        <span class="sticker-badge">{{ albumCodeLabel }}</span>
        <span class="sticker-series" :data-series="sticker.series">{{ sticker.series }}</span>
      </span>

      <strong class="sticker-country">
        <img v-if="countryFlagImage" class="sticker-country-flag" :src="countryFlagImage.src" :alt="countryFlagImage.alt" />
        <span>{{ countryName }}</span>
      </strong>
      <span class="sticker-name">{{ sticker.name }}</span>

      <span v-if="!isExtraSticker" class="sticker-meta">
        <span class="sticker-group">{{ sticker.group }}</span>
        <span class="sticker-category">{{ sticker.category }}</span>
      </span>

      <span class="owned-overlay">{{ owned ? copy.owned : copy.missing }}</span>
    </button>

    <span v-if="isExtraSticker" class="sticker-extra-selector" role="group" :aria-label="extraSelectorLabel">
      <span v-for="tier in tierOptions" :key="tier" class="sticker-tier-cell">
        <button
          type="button"
          class="sticker-tier-choice"
          :class="{ 'is-active': getTierCount(tier) > 0 }"
          :data-tier="tier"
          @click="toggleTier(tier)"
        >
          <span class="sticker-tier-count" :class="{ 'is-visible': getTierCount(tier) > 0 }">
            {{ getTierCount(tier) }}
          </span>
        </button>
        <button
          v-if="getTierCount(tier) > 0"
          type="button"
          class="sticker-tier-minus"
          :aria-label="minusAria(tier)"
          @click="emit('decrement-tier', tier)"
        >
          −
        </button>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AppCopy, ExtraTier, ExtraTierCounts, Locale, Sticker } from '../types';
import { getCountryDisplayName, getCountryFlagImage } from '../utils/countryFlags';

interface Props {
  sticker: Sticker;
  owned: boolean;
  copy: AppCopy['card'];
  locale: Locale;
  selectedTiers: ExtraTierCounts;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: 'toggle'): void;
  (event: 'toggle-tier', tier: ExtraTier): void;
  (event: 'decrement-tier', tier: ExtraTier): void;
}>();

const tierOptions: ExtraTier[] = ['Base', 'Bronze', 'Silver', 'Gold'];
const countryFlagImage = computed(() => getCountryFlagImage(props.sticker.country));
const countryName = computed(() => getCountryDisplayName(props.sticker.country, props.locale));
const albumCodeLabel = computed(() => formatAlbumCode(props.sticker.code));
const isExtraSticker = computed(() => props.sticker.series === 'Extra' && props.sticker.group === 'Extra');
const extraSelectorLabel = computed(() => (props.locale === 'en' ? 'Select versions' : 'Seleccionar versiones'));

const cardAriaLabel = computed(() => {
  const state = props.owned ? props.copy.owned : props.copy.missing;
  return `${props.sticker.code} — ${props.sticker.name}. ${state}`;
});

function toggleTier(tier: ExtraTier) {
  emit('toggle-tier', tier);
}

function getTierCount(tier: ExtraTier) {
  return props.selectedTiers[tier] ?? 0;
}

function minusAria(tier: ExtraTier) {
  if (props.locale === 'en') {
    return `Remove one ${tier}`;
  }
  if (props.locale === 'ru') {
    return `Убрать одну · ${tier}`;
  }
  if (props.locale === 'zh') {
    return `减一 · ${tier}`;
  }
  return `Restar uno · ${tier}`;
}

function formatAlbumCode(code: string) {
  return code.replace(/^([A-Za-z]+)(\d+)$/, (_, prefix: string, digits: string) => `${prefix.toUpperCase()} ${digits}`);
}
</script>
