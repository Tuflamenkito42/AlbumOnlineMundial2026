<template>
  <section class="overview-shell ion-padding">
    <div class="overview-header">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1>{{ copy.title }}</h1>
        <p class="subtitle">{{ copy.subtitle }}</p>
      </div>

      <div class="overview-actions">
        <div ref="languageMenuRef" class="language-dropdown">
          <button
            type="button"
            class="language-trigger"
            :aria-expanded="languageMenuOpen"
            aria-haspopup="menu"
            @click="languageMenuOpen = !languageMenuOpen"
          >
            <img class="language-flag" :src="selectedLocale.flagSrc" :alt="selectedLocale.flagAlt" />
            <span>{{ copy.language }}</span>
          </button>

          <div v-if="languageMenuOpen" class="language-panel" role="menu">
            <button
              v-for="option in localeOptions"
              :key="option.value"
              type="button"
              class="language-option"
              :class="{ 'is-active': locale === option.value }"
              role="menuitemradio"
              :aria-checked="locale === option.value"
              @click="selectLocale(option.value)"
            >
              <img class="language-flag" :src="option.flagSrc" :alt="option.flagAlt" />
              <span>{{ option.label }}</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          class="theme-toggle"
          :class="{ 'is-dark': darkMode }"
          :aria-pressed="darkMode"
          :aria-label="`${copy.darkMode}/${copy.lightMode}`"
          @click="$emit('update:darkMode', !darkMode)"
        >
          <span class="theme-toggle-sun" aria-hidden="true">☀️</span>
          <span class="theme-toggle-track" aria-hidden="true">
            <span class="theme-toggle-thumb"></span>
          </span>
          <span class="theme-toggle-moon" aria-hidden="true">🌙</span>
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { AppCopy, Locale } from '../types';
import { LOCALE_FLAG_OPTIONS } from '../utils/localeFlags';

const localeOptions = LOCALE_FLAG_OPTIONS;

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

const languageMenuOpen = ref(false);
const languageMenuRef = ref<HTMLElement | null>(null);
const selectedLocale = computed(
  () => localeOptions.find((option) => option.value === props.locale) ?? localeOptions[0],
);
const themeLabel = computed(() => (props.darkMode ? props.copy.lightMode : props.copy.darkMode));

function selectLocale(value: Locale) {
  emit('update:locale', value);
  languageMenuOpen.value = false;
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node | null;
  if (languageMenuRef.value && target && !languageMenuRef.value.contains(target)) {
    languageMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
});
</script>