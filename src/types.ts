export type StickerFilter = 'all' | 'owned' | 'missing';
export type Locale = 'es' | 'en' | 'ru' | 'zh';
export type ExtraTier = 'Base' | 'Gold' | 'Silver' | 'Bronze';

export interface Sticker {
  code: string;
  albumOrder: number;
  number: number;
  name: string;
  country: string;
  section: string;
  extraTier?: ExtraTier;
  category: string;
  group: string;
  series: 'FWC' | 'Teams' | 'History' | 'Extra' | 'CC' | 'Panini';
}

export interface PersistedProgress {
  version: number;
  ownedIds: number[];
  extraTiers?: Record<string, ExtraTier>;
  updatedAt: string;
}

export interface AppCopy {
  overview: {
    eyebrow: string;
    title: string;
    subtitle: string;
    language: string;
    darkMode: string;
    lightMode: string;
    progress: string;
    owned: string;
    missing: string;
    total: string;
    complete: string;
  };
  controls: {
    searchPlaceholder: string;
    all: string;
    owned: string;
    missing: string;
    export: string;
    import: string;
    reset: string;
  };
  grid: {
    title: string;
    sortedByAlbum: string;
    tapToMark: string;
    emptyTitle: string;
    emptyBody: string;
  };
  card: {
    owned: string;
    missing: string;
  };
  dialogs: {
    resetConfirm: string;
    importError: string;
  };
}