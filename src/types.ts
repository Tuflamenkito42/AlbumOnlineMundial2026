export type StickerFilter = 'all' | 'owned' | 'missing';
export type Locale = 'es' | 'en' | 'ru' | 'zh';

export interface Sticker {
  code: string;
  albumOrder: number;
  number: number;
  name: string;
  country: string;
  category: string;
  group: string;
  series: 'FWC' | 'Teams' | 'History' | 'Extra' | 'CC' | 'Panini';
}

export interface PersistedProgress {
  version: number;
  ownedIds: number[];
  updatedAt: string;
}

export interface AppCopy {
  overview: {
    eyebrow: string;
    title: string;
    subtitle: string;
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