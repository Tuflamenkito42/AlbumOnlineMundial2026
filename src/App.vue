<template>
  <IonApp>
    <IonContent fullscreen class="app-content">
      <main class="app-shell">
        <CollectionOverview
          :owned-count="ownedCount"
          :missing-count="missingCount"
          :total-count="totalCount"
          :progress-percent="progressPercent"
          :dark-mode="darkMode"
          :locale="locale"
          :copy="copy.overview"
          :complete="missingCount === 0"
          @update:darkMode="setDarkMode"
          @update:locale="setLocale"
        />

        <CollectionControls
          v-model:query="query"
          v-model:filter="filter"
          :copy="copy.controls"
        />

        <section class="section-shell ion-padding-horizontal ion-padding-bottom">
          <div class="section-head">
            <div>
              <p class="section-kicker">{{ copy.grid.title }}</p>
              <h2>{{ visibleAlbumCount }} / {{ totalCount }} · {{ copy.grid.sortedByAlbum }}</h2>
              <p>{{ copy.grid.tapToMark }}</p>
            </div>
            <div class="section-chip">{{ localeLabel }}</div>
          </div>

          <StickerGrid
            :stickers="visibleStickers"
            :owned-set="ownedSet"
            :copy="copy.grid"
            :card-copy="copy.card"
            :locale="locale"
            :extra-tiers="extraTiers"
            @toggle="toggleSticker"
            @toggle-tier="handleTierToggle"
            @decrement-tier="handleTierDecrement"
          />
        </section>
      </main>
    </IonContent>
  </IonApp>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { IonApp, IonContent } from '@ionic/vue';
import CollectionControls from './components/CollectionControls.vue';
import CollectionOverview from './components/CollectionOverview.vue';
import StickerGrid from './components/StickerGrid.vue';
import { stickers } from './data/stickers';
import { useCollection } from './composables/useCollection';
import type { AppCopy, ExtraTier, Locale } from './types';

const {
  filter,
  extraTiers,
  missingCount,
  ownedCount,
  ownedSet,
  progressPercent,
  query,
  setExtraTier,
  decrementExtraTier,
  toggleSticker,
  totalCount,
  visibleAlbumCount,
  visibleStickers,
} = useCollection(stickers);

const darkMode = ref(false);
const locale = ref<Locale>('es');

const themeKey = 'mundial-cartas-2026-theme';
const localeKey = 'mundial-cartas-2026-locale';

const translations: Record<Locale, AppCopy> = {
  es: {
    overview: {
      eyebrow: 'Álbum digital',
      title: 'Mundial Cartas 2026',
      subtitle: 'Ordenado por país, con un tema claro y controles rápidos para seguir tu colección.',
      language: 'Idioma',
      darkMode: 'Oscuro',
      lightMode: 'Claro',
      progress: 'Progreso',
      owned: 'Tengo',
      missing: 'Me faltan',
      total: 'Total',
      complete: 'Colección completa. Ya cerraste el álbum.',
    },
    controls: {
      searchPlaceholder: 'Buscar por código, número o nombre',
      all: 'Todas',
      owned: 'Tengo',
      missing: 'Me faltan',
      export: 'Exportar',
      import: 'Importar',
      reset: 'Reiniciar',
    },
    grid: {
      title: 'Cromos',
      sortedByAlbum: 'Ordenado por país',
      tapToMark: 'Toca una carta para marcarla como tuya.',
      emptyTitle: 'No hay resultados',
      emptyBody: 'Prueba con otro número, otro nombre o cambia el filtro.',
    },
    card: {
      owned: 'La tengo',
      missing: 'La necesito',
    },
    dialogs: {
      resetConfirm: '¿Reiniciar toda la colección?',
      importError: 'No se pudo importar el archivo.',
    },
  },
  en: {
    overview: {
      eyebrow: 'Digital album',
      title: 'World Cup Stickers 2026',
      subtitle: 'Ordered by country, with a clearer theme and faster controls to track your collection.',
      language: 'Language',
      darkMode: 'Dark',
      lightMode: 'Light',
      progress: 'Progress',
      owned: 'Owned',
      missing: 'Missing',
      total: 'Total',
      complete: 'Collection complete. You finished the album.',
    },
    controls: {
      searchPlaceholder: 'Search by code, number or name',
      all: 'All',
      owned: 'Owned',
      missing: 'Missing',
      export: 'Export',
      import: 'Import',
      reset: 'Reset',
    },
    grid: {
      title: 'Stickers',
      sortedByAlbum: 'Sorted by country',
      tapToMark: 'Tap a card to mark it as owned.',
      emptyTitle: 'No results',
      emptyBody: 'Try another number, another name, or change the filter.',
    },
    card: {
      owned: 'Owned',
      missing: 'Missing',
    },
    dialogs: {
      resetConfirm: 'Reset the whole collection?',
      importError: 'The file could not be imported.',
    },
  },
  ru: {
    overview: {
      eyebrow: 'Цифровой альбом',
      title: 'Стикеры ЧМ 2026',
      subtitle: 'Сортировка по стране, более выразительная тема и быстрые элементы управления.',
      language: 'Язык',
      darkMode: 'Тёмная',
      lightMode: 'Светлая',
      progress: 'Прогресс',
      owned: 'Есть',
      missing: 'Не хватает',
      total: 'Всего',
      complete: 'Коллекция завершена. Альбом собран.',
    },
    controls: {
      searchPlaceholder: 'Поиск по коду, номеру или названию',
      all: 'Все',
      owned: 'Есть',
      missing: 'Не хватает',
      export: 'Экспорт',
      import: 'Импорт',
      reset: 'Сброс',
    },
    grid: {
      title: 'Наклейки',
      sortedByAlbum: 'Сортировка по стране',
      tapToMark: 'Нажми на карточку, чтобы отметить её как свою.',
      emptyTitle: 'Ничего не найдено',
      emptyBody: 'Попробуй другой номер, название или фильтр.',
    },
    card: {
      owned: 'Есть',
      missing: 'Нет',
    },
    dialogs: {
      resetConfirm: 'Сбросить всю коллекцию?',
      importError: 'Не удалось импортировать файл.',
    },
  },
  zh: {
    overview: {
      eyebrow: '数字贴纸册',
      title: '2026 世界杯贴纸',
      subtitle: '按国家排序，更清晰的主题，更快的收藏管理。',
      language: '语言',
      darkMode: '深色',
      lightMode: '浅色',
      progress: '进度',
      owned: '已拥有',
      missing: '缺少',
      total: '总计',
      complete: '收藏已完成。你已经集齐了整本册子。',
    },
    controls: {
      searchPlaceholder: '按代码、编号或名称搜索',
      all: '全部',
      owned: '已拥有',
      missing: '缺少',
      export: '导出',
      import: '导入',
      reset: '重置',
    },
    grid: {
      title: '贴纸',
      sortedByAlbum: '按国家排序',
      tapToMark: '点按卡片即可标记为已拥有。',
      emptyTitle: '没有结果',
      emptyBody: '试试别的编号、名称，或更换筛选条件。',
    },
    card: {
      owned: '已拥有',
      missing: '未拥有',
    },
    dialogs: {
      resetConfirm: '要重置整个收藏吗？',
      importError: '无法导入该文件。',
    },
  },
};

const copy = computed(() => translations[locale.value]);
const localeLabel = computed(() => {
  switch (locale.value) {
    case 'en':
      return 'EN';
    case 'ru':
      return 'РУ';
    case 'zh':
      return '中文';
    default:
      return 'ES';
  }
});

function setDarkMode(value: boolean) {
  darkMode.value = value;
}

function setLocale(value: Locale) {
  locale.value = value;
}

function handleTierToggle(stickerNumber: number, tier: ExtraTier) {
  setExtraTier(stickerNumber, tier);
}

function handleTierDecrement(stickerNumber: number, tier: ExtraTier) {
  decrementExtraTier(stickerNumber, tier);
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function applyTheme(value: boolean) {
  // Usar nextTick para asegurar que se aplique después del renderizado
  document.documentElement.classList.toggle('dark', value);
  document.body.classList.toggle('dark', value);
  // Forzar reflow para asegurar que se aplique
  void document.documentElement.offsetHeight;
}

function loadTheme() {
  if (!canUseStorage()) {
    applyTheme(false);
    return;
  }

  const saved = localStorage.getItem(themeKey);
  if (saved !== null) {
    darkMode.value = saved === 'true';
  } else {
    darkMode.value = false;
  }
  applyTheme(darkMode.value);
}

function loadLocale() {
  if (!canUseStorage()) {
    document.documentElement.lang = locale.value;
    return;
  }

  const saved = localStorage.getItem(localeKey);
  if (saved === 'en' || saved === 'ru' || saved === 'zh' || saved === 'es') {
    locale.value = saved;
  }

  document.documentElement.lang = locale.value;
}

watch(darkMode, (value) => {
  if (canUseStorage()) {
    localStorage.setItem(themeKey, String(value));
  }
  applyTheme(value);
});

watch(locale, (value) => {
  if (canUseStorage()) {
    localStorage.setItem(localeKey, value);
  }

  document.documentElement.lang = value;
});

onMounted(() => {
  loadTheme();
  loadLocale();
});
</script>