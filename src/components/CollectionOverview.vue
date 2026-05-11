<template>
  <section class="overview-shell ion-padding">
    <div class="overview-header">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1>{{ copy.title }}</h1>
        <p class="subtitle">{{ copy.subtitle }}</p>
      </div>

      <div class="overview-actions">
        <div class="language-dropdown">
          <select
            :value="locale"
            @change="handleLocaleChange"
            class="language-select"
          >
            <option v-for="(info, code) in localeOptions" :key="code" :value="code">
              {{ info.flag }} {{ info.label }}
            </option>
          </select>
        </div>

        <button
          type="button"
          class="theme-toggle"
          :class="{ 'is-dark': darkMode }"
          :aria-pressed="darkMode"
          :aria-label="themeLabel"
          @click="$emit('update:darkMode', !darkMode)"
        >
          <span class="theme-icon" aria-hidden="true">{{ darkMode ? '☀' : '🌙' }}</span>
          <span>{{ themeLabel }}</span>
        </button>
      </div>
    </div>

    <div class="stats-row">
      <article class="stat-card is-owned">
        <span>{{ copy.owned }}</span>
        <strong>{{ ownedCount }}</strong>
      </article>
      <article class="stat-card is-missing">
        <span>{{ copy.missing }}</span>
        <strong>{{ missingCount }}</strong>
      </article>
      <article class="stat-card is-total">
        <span>{{ copy.total }}</span>
        <strong>{{ totalCount }}</strong>
      </article>
    </div>

    <div class="progress-card">
      <div class="progress-meta">
        <span>{{ copy.progress }}</span>
        <strong>{{ progressPercent }}%</strong>
      </div>
      <div class="progress-track" aria-hidden="true">
        <div class="progress-fill" :style="{ width: `${progressPercent}%` }"></div>
      </div>
      <p v-if="complete" class="complete-message">{{ copy.complete }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AppCopy, Locale } from '../types';
import { LOCALE_FLAGS } from '../utils/countryFlags';

const localeOptions = LOCALE_FLAGS;

interface Props {
  ownedCount: number;
  missingCount: number;
  totalCount: number;
  progressPercent: number;
  darkMode: boolean;
  complete: boolean;
  locale: Locale;
  copy: AppCopy['overview'];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'update:darkMode', value: boolean): void;
  (event: 'update:locale', value: Locale): void;
}>();

function handleLocaleChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:locale', target.value as Locale);
}

const themeLabel = computed(() => (props.darkMode ? props.copy.lightMode : props.copy.darkMode));
</script>