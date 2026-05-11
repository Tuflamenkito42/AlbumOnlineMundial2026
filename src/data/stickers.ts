import checklistData from './checklist.json';
import type { Sticker } from '../types';

const COUNTRY_SUFFIXES = [
  'South Africa',
  'Bosnia-Herzegovina',
  'Korea Republic',
  'Republic of Korea',
  'South Korea',
  'Czechia',
  'Costa Rica',
  'Saudi Arabia',
  'Saudi Arabi',
  'Saudi',
  'Cote d Ivoire',
  "Côte d'Ivoire",
  'Curaçao',
  'Congo DR',
  'New Zealand',
  'Netherlands',
  'United States',
  'United Kingdom',
  'United Arab Emirates',
  'United States of America',
  'England',
  'Germany',
  'France',
  'Mexico',
  'Argentina',
  'Brazil',
  'Canada',
  'Spain',
  'Uruguay',
  'Morocco',
  'Belgium',
  'Croatia',
  'Ecuador',
  'Egypt',
  'Iran',
  'Japan',
  'Norway',
  'Portugal',
  'Panama',
  'Ghana',
  'Algeria',
  'Austria',
  'Jordan',
  'Colombia',
  'Tunisia',
  'Switzerland',
  'Australia',
  'Qatar',
  'Senegal',
  'Iraq',
  'Poland',
  'Serbia',
  'Sweden',
  'Turkey',
  'Türkiye',
  'Cabo Verde',
  'Cape Verde',
  'Curacao',
  'USA',
  'Scotland',
  'Uzbekistan',
  'Paraguay',
  'Wales',
  'Northern Ireland',
  'Ireland',
  'Greece',
  'Italy',
  'Denmark',
  'Ukraine',
  'Iceland',
  'Romania',
  'Hungary',
  'Bulgaria',
  'Slovakia',
  'Slovenia',
  'Montenegro',
  'Albania',
  'North Macedonia',
  'Peru',
  'Chile',
  'Bolivia',
  'Venezuela',
  'Cameroon',
  'Kenya',
  'Nigeria',
  'Mali',
  'Burkina Faso',
  'Guinea',
  'China',
  'India',
  'Thailand',
  'Vietnam',
  'Bangladesh',
  'Pakistan',
  'Afghanistan',
  'Malaysia',
  'Singapore',
  'Indonesia',
  'Philippines',
  'Honduras',
  'Jamaica',
  'Trinidad and Tobago',
  'Cuba',
  'Belize',
  'Fiji',
  'Lebanon',
  'Israel',
  'Palestine',
].sort((left, right) => right.length - left.length);

const TITLE_SUFFIXES = [
  'Extra / Bronze',
  'Extra / Silver',
  'Extra / Gold',
  'Extra / Base',
  'Coca Cola / USA Canada',
  'Coca Cola / Latin America',
  'FIFA World Cup History foil',
  'FIFA World Cup 2026 foil',
  'bronze',
  'silver',
  'gold',
  'foil',
  '-',
];

function fold(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

function stripTrailingSuffixes(text: string) {
  let result = text.trim();
  for (const suffix of TITLE_SUFFIXES) {
    const foldedResult = fold(result);
    const foldedSuffix = fold(suffix);
    if (foldedResult.endsWith(foldedSuffix)) {
      result = result.slice(0, result.length - suffix.length).trim();
    }
  }
  return result.replace(/\s+$/g, '').trim();
}

function splitCountrySuffix(text: string) {
  const cleaned = stripTrailingSuffixes(text);
  const folded = fold(cleaned);

  for (const country of COUNTRY_SUFFIXES) {
    const foldedCountry = fold(country);
    if (folded === foldedCountry) {
      return { title: '', country };
    }

    if (folded.endsWith(` ${foldedCountry}`)) {
      return {
        title: cleaned.slice(0, cleaned.length - country.length).trim(),
        country,
      };
    }
  }

  return {
    title: cleaned,
    country: cleaned,
  };
}

function normalizeHeadline(text: string) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s+[-/]+\s*$/g, '')
    .trim();
}

function deriveSticker(item: any, albumOrder: number): Sticker {
  const code = String(item.id ?? '').trim();
  const raw = String(item.raw ?? '').trim();
  const normalizedRaw = normalizeHeadline(raw);

  if (code === '00') {
    return {
      code,
      albumOrder,
      number: albumOrder,
      name: 'Panini Logo',
      country: 'Panini',
      category: 'Logo',
      group: 'Panini',
      series: 'Panini',
    };
  }

  const fwcMatch = code.match(/^FWC(\d+)$/i);
  if (fwcMatch) {
    const fwcNumber = Number.parseInt(fwcMatch[1], 10);
    const section = fwcNumber <= 8 ? 'FWC' : 'History';

    if (section === 'FWC') {
      const title = normalizedRaw
        .replace(/\s+FIFA World Cup 2026\s*foil$/i, '')
        .replace(/\s+FIFA World Cup 2026$/i, '')
        .trim();

      return {
        code,
        albumOrder,
        number: albumOrder,
        name: title,
        country: 'FIFA World Cup 2026',
        category: 'FWC',
        group: 'FWC',
        series: 'FWC',
      };
    }

    const historyMatch = normalizedRaw.match(/^(.+?)\s+(\d{4})\s+FIFA World Cup History/i);
    const country = historyMatch ? historyMatch[1].trim() : 'FIFA World Cup History';
    const title = historyMatch ? historyMatch[2].trim() : normalizedRaw;

    return {
      code,
      albumOrder,
      number: albumOrder,
      name: title,
      country,
      category: 'FWC',
      group: 'History',
      series: 'History',
    };
  }

  if (code.startsWith('CC-')) {
    const leftPart = normalizedRaw.replace(/\s+Coca Cola\s*\/.*$/i, '').trim();
    const { title, country } = splitCountrySuffix(leftPart);

    return {
      code,
      albumOrder,
      number: albumOrder,
      name: title || leftPart,
      country,
      category: 'Promo',
      group: 'Coca Cola',
      series: 'CC',
    };
  }

  if (/\bExtra\s*\/\s*/i.test(normalizedRaw)) {
    const leftPart = normalizedRaw.replace(/\s+Extra\s*\/.*$/i, '').trim();
    const { title, country } = splitCountrySuffix(leftPart);

    return {
      code,
      albumOrder,
      number: albumOrder,
      name: title || leftPart,
      country,
      category: 'Extra',
      group: 'Extra',
      series: 'Extra',
    };
  }

  if (/\bFIFA World Cup History\b/i.test(normalizedRaw)) {
    const historyMatch = normalizedRaw.match(/^(.+?)\s+(\d{4})\s+FIFA World Cup History/i);
    const country = historyMatch ? historyMatch[1].trim() : normalizedRaw;
    const name = historyMatch ? historyMatch[2].trim() : normalizedRaw;

    return {
      code,
      albumOrder,
      number: albumOrder,
      name,
      country,
      category: 'FWC',
      group: 'History',
      series: 'History',
    };
  }

  const { title, country } = splitCountrySuffix(normalizedRaw);
  const displayName = title || normalizedRaw;

  return {
    code,
    albumOrder,
    number: albumOrder,
    name: displayName,
    country,
    category: code.startsWith('CC') ? 'Promo' : 'Team',
    group: code.startsWith('CC') ? 'Coca Cola' : 'Teams',
    series: 'Teams',
  };
}

const checklistRows = Array.isArray(checklistData) ? checklistData : [];
const stickersFromChecklist = checklistRows
  .filter((item: any) => typeof item?.id === 'string' && item.id !== 'No.' && item.id !== 'All')
  .map((item: any, index: number) => deriveSticker(item, index + 1));

const sampleStickers: Sticker[] = stickersFromChecklist.slice(0, 200);

export const stickers: Sticker[] = stickersFromChecklist.length ? stickersFromChecklist : sampleStickers;

export { sampleStickers };
