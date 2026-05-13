export type StickerFilter = 'all' | 'owned' | 'missing';
export type Locale = 'es' | 'en' | 'ru' | 'zh';
export type ExtraTier = 'Base' | 'Gold' | 'Silver' | 'Bronze';
export type ExtraTierCounts = Partial<Record<ExtraTier, number>>;

export interface Sticker {
  code: string;
  albumOrder: number;
  number: number;
  name: string;
  country: string;
  section: string;
  category: string;
  group: string;
  series: 'FWC' | 'Teams' | 'History' | 'Extra' | 'CC' | 'Panini';
  extraTier?: ExtraTier;
}

export interface PersistedProgress {
  version: number;
  ownedIds: number[];
  extraTiers?: Record<string, ExtraTierCounts | ExtraTier[]>;
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