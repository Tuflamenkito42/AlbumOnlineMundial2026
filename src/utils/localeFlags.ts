export interface LocaleFlagOption {
  value: 'es' | 'en' | 'ru' | 'zh';
  label: string;
  flagSrc: string;
  flagAlt: string;
}

export const LOCALE_FLAG_OPTIONS: LocaleFlagOption[] = [
  {
    value: 'es',
    label: 'Español',
    flagSrc: 'https://flagcdn.com/w40/es.png',
    flagAlt: 'Bandera de España',
  },
  {
    value: 'en',
    label: 'English',
    flagSrc: 'https://flagcdn.com/w40/gb.png',
    flagAlt: 'Flag of the United Kingdom',
  },
  {
    value: 'ru',
    label: 'Русский',
    flagSrc: 'https://flagcdn.com/w40/ru.png',
    flagAlt: 'Флаг России',
  },
  {
    value: 'zh',
    label: '中文',
    flagSrc: 'https://flagcdn.com/w40/cn.png',
    flagAlt: '中国国旗',
  },
];
