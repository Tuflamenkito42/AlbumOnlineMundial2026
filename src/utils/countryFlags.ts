// Map country names to emoji flags
const COUNTRY_FLAGS: Record<string, string> = {
  // Default/Special
  'Panini': '🏷️',
  'FWC': '🌍',
  'LastSticker.com': '🏷️',
  
  // Europe
  'England': '🇬🇧',
  'Germany': '🇩🇪',
  'Spain': '🇪🇸',
  'France': '🇫🇷',
  'Netherlands': '🇳🇱',
  'Belgium': '🇧🇪',
  'Portugal': '🇵🇹',
  'Switzerland': '🇨🇭',
  'Austria': '🇦🇹',
  'Croatia': '🇭🇷',
  'Poland': '🇵🇱',
  'Serbia': '🇷🇸',
  'Sweden': '🇸🇪',
  'Turkey': '🇹🇷',
  'Türkiye': '🇹🇷',
  'Denmark': '🇩🇰',
  'Czech Republic': '🇨🇿',
  'Czechia': '🇨🇿',
  'Norway': '🇳🇴',
  'Ukraine': '🇺🇦',
  'Italy': '🇮🇹',
  'Greece': '🇬🇷',
  'Iceland': '🇮🇸',
  'Romania': '🇷🇴',
  'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'Northern Ireland': '🏴󠁧󠁢󠁮󠁩󠁲󠁿',
  'Ireland': '🇮🇪',
  'Hungary': '🇭🇺',
  'Bulgaria': '🇧🇬',
  'Slovakia': '🇸🇰',
  'Slovenia': '🇸🇮',
  'Montenegro': '🇲🇪',
  'Albania': '🇦🇱',
  'North Macedonia': '🇲🇰',
  
  // North America
  'United States': '🇺🇸',
  'United States of America': '🇺🇸',
  'USA': '🇺🇸',
  'Canada': '🇨🇦',
  'Mexico': '🇲🇽',
  
  // South America
  'Argentina': '🇦🇷',
  'Brazil': '🇧🇷',
  'Uruguay': '🇺🇾',
  'Colombia': '🇨🇴',
  'Ecuador': '🇪🇨',
  'Peru': '🇵🇪',
  'Chile': '🇨🇱',
  'Paraguay': '🇵🇾',
  'Bolivia': '🇧🇴',
  'Venezuela': '🇻🇪',
  
  // Africa
  'Morocco': '🇲🇦',
  'Egypt': '🇪🇬',
  'Senegal': '🇸🇳',
  'Tunisia': '🇹🇳',
  'Algeria': '🇩🇿',
  'Ghana': '🇬🇭',
  'South Africa': '🇿🇦',
  'Cameroon': '🇨🇲',
  'Ivory Coast': '🇨🇮',
  "Côte d'Ivoire": '🇨🇮',
  'Cote d Ivoire': '🇨🇮',
  'Kenya': '🇰🇪',
  'Nigeria': '🇳🇬',
  'Cabo Verde': '🇨🇻',
  'Cape Verde': '🇨🇻',
  'Mali': '🇲🇱',
  'Burkina Faso': '🇧🇫',
  'Guinea': '🇬🇳',
  
  // Asia
  'Japan': '🇯🇵',
  'South Korea': '🇰🇷',
  'Korea Republic': '🇰🇷',
  'Republic of Korea': '🇰🇷',
  'China': '🇨🇳',
  'Saudi Arabia': '🇸🇦',
  'Saudi Arabi': '🇸🇦',
  'Saudi': '🇸🇦',
  'United Arab Emirates': '🇦🇪',
  'Iran': '🇮🇷',
  'Iraq': '🇮🇶',
  'Qatar': '🇶🇦',
  'Jordan': '🇯🇴',
  'Lebanon': '🇱🇧',
  'Israel': '🇮🇱',
  'Palestine': '🇵🇸',
  'India': '🇮🇳',
  'Thailand': '🇹🇭',
  'Vietnam': '🇻🇳',
  'Bangladesh': '🇧🇩',
  'Pakistan': '🇵🇰',
  'Afghanistan': '🇦🇫',
  'Malaysia': '🇲🇾',
  'Singapore': '🇸🇬',
  'Indonesia': '🇮🇩',
  'Philippines': '🇵🇭',
  'Australia': '🇦🇺',
  'Uzbekistan': '🇺🇿',
  
  // Central America & Caribbean
  'Costa Rica': '🇨🇷',
  'Panama': '🇵🇦',
  'Honduras': '🇭🇳',
  'Curaçao': '🇨🇼',
  'Curacao': '🇨🇼',
  'Jamaica': '🇯🇲',
  'Trinidad and Tobago': '🇹🇹',
  'Cuba': '🇨🇺',
  'Belize': '🇧🇿',
  
  // Other
  'Congo DR': '🇨🇩',
  'New Zealand': '🇳🇿',
  'Bosnia-Herzegovina': '🇧🇦',
  'Bosnia and Herzegovina': '🇧🇦',
  'Fiji': '🇫🇯',
};

import type { Locale } from '../types';

// Map locale codes to language names and their flags
export const LOCALE_FLAGS: Record<string, { label: string; flag: string }> = {
  'es': { label: 'Español', flag: '🇪🇸' },
  'en': { label: 'English', flag: '🇬🇧' },
  'ru': { label: 'Русский', flag: '🇷🇺' },
  'zh': { label: '中文', flag: '🇨🇳' },
};

const COUNTRY_NAMES_ES: Record<string, string> = {
  'Panini': 'Panini',
  'FWC': 'FWC',
  'LastSticker.com': 'LastSticker.com',
  'England': 'Inglaterra',
  'Germany': 'Alemania',
  'Spain': 'España',
  'France': 'Francia',
  'Netherlands': 'Países Bajos',
  'Belgium': 'Bélgica',
  'Portugal': 'Portugal',
  'Switzerland': 'Suiza',
  'Austria': 'Austria',
  'Croatia': 'Croacia',
  'Poland': 'Polonia',
  'Serbia': 'Serbia',
  'Sweden': 'Suecia',
  'Turkey': 'Turquía',
  'Türkiye': 'Turquía',
  'Denmark': 'Dinamarca',
  'Czech Republic': 'Chequia',
  'Czechia': 'Chequia',
  'Norway': 'Noruega',
  'Ukraine': 'Ucrania',
  'Italy': 'Italia',
  'Greece': 'Grecia',
  'Iceland': 'Islandia',
  'Romania': 'Rumanía',
  'Ireland': 'Irlanda',
  'Hungary': 'Hungría',
  'Bulgaria': 'Bulgaria',
  'Slovakia': 'Eslovaquia',
  'Slovenia': 'Eslovenia',
  'Montenegro': 'Montenegro',
  'Albania': 'Albania',
  'North Macedonia': 'Macedonia del Norte',
  'United States': 'Estados Unidos',
  'United States of America': 'Estados Unidos',
  'USA': 'Estados Unidos',
  'Canada': 'Canadá',
  'Mexico': 'México',
  'Argentina': 'Argentina',
  'Brazil': 'Brasil',
  'Uruguay': 'Uruguay',
  'Colombia': 'Colombia',
  'Ecuador': 'Ecuador',
  'Peru': 'Perú',
  'Chile': 'Chile',
  'Paraguay': 'Paraguay',
  'Bolivia': 'Bolivia',
  'Venezuela': 'Venezuela',
  'Morocco': 'Marruecos',
  'Egypt': 'Egipto',
  'Senegal': 'Senegal',
  'Tunisia': 'Túnez',
  'Algeria': 'Argelia',
  'Ghana': 'Ghana',
  'South Africa': 'Sudáfrica',
  'Cameroon': 'Camerún',
  'Ivory Coast': 'Costa de Marfil',
  "Côte d'Ivoire": 'Costa de Marfil',
  'Cote d Ivoire': 'Costa de Marfil',
  'Haiti': 'Haití',
  'Kenya': 'Kenia',
  'Nigeria': 'Nigeria',
  'Cabo Verde': 'Cabo Verde',
  'Cape Verde': 'Cabo Verde',
  'Mali': 'Mali',
  'Burkina Faso': 'Burkina Faso',
  'Guinea': 'Guinea',
  'Japan': 'Japón',
  'South Korea': 'Corea del Sur',
  'Korea Republic': 'Corea del Sur',
  'Republic of Korea': 'Corea del Sur',
  'China': 'China',
  'Saudi Arabia': 'Arabia Saudí',
  'Saudi Arabi': 'Arabia Saudí',
  'Saudi': 'Arabia Saudí',
  'United Arab Emirates': 'Emiratos Árabes Unidos',
  'Iran': 'Irán',
  'Iraq': 'Irak',
  'Qatar': 'Catar',
  'Jordan': 'Jordania',
  'Lebanon': 'Líbano',
  'Israel': 'Israel',
  'Palestine': 'Palestina',
  'India': 'India',
  'Thailand': 'Tailandia',
  'Vietnam': 'Vietnam',
  'Bangladesh': 'Bangladés',
  'Pakistan': 'Pakistán',
  'Afghanistan': 'Afganistán',
  'Malaysia': 'Malasia',
  'Singapore': 'Singapur',
  'Indonesia': 'Indonesia',
  'Philippines': 'Filipinas',
  'Australia': 'Australia',
  'Uzbekistan': 'Uzbekistán',
  'Costa Rica': 'Costa Rica',
  'Panama': 'Panamá',
  'Honduras': 'Honduras',
  'Curaçao': 'Curazao',
  'Curacao': 'Curazao',
  'Jamaica': 'Jamaica',
  'Trinidad and Tobago': 'Trinidad y Tobago',
  'Cuba': 'Cuba',
  'Belize': 'Belice',
  'Congo DR': 'República Democrática del Congo',
  'New Zealand': 'Nueva Zelanda',
  'Bosnia-Herzegovina': 'Bosnia y Herzegovina',
  'Bosnia and Herzegovina': 'Bosnia y Herzegovina',
  'Fiji': 'Fiyi',
};

const SECTION_NAMES_ES: Record<string, string> = {
  'FIFA World Cup 2026': 'Copa Mundial 2026',
  'FIFA World Cup History': 'Historia de la Copa Mundial',
  'Coca Cola': 'Coca-Cola',
  'Extra': 'Extra',
  "McDonald's Exclusive": 'McDonald\'s Exclusivo',
};

const COUNTRY_FLAG_IMAGES: Record<string, { src: string; alt: string }> = {
  'South Africa': { src: 'https://flagcdn.com/w40/za.png', alt: 'Bandera de Sudáfrica' },
  'Saudi Arabia': { src: 'https://flagcdn.com/w40/sa.png', alt: 'Bandera de Arabia Saudí' },
  'United Arab Emirates': { src: 'https://flagcdn.com/w40/ae.png', alt: 'Bandera de Emiratos Árabes Unidos' },
  'Qatar': { src: 'https://flagcdn.com/w40/qa.png', alt: 'Bandera de Catar' },
  'Egypt': { src: 'https://flagcdn.com/w40/eg.png', alt: 'Bandera de Egipto' },
  'Morocco': { src: 'https://flagcdn.com/w40/ma.png', alt: 'Bandera de Marruecos' },
  'Tunisia': { src: 'https://flagcdn.com/w40/tn.png', alt: 'Bandera de Túnez' },
  'Senegal': { src: 'https://flagcdn.com/w40/sn.png', alt: 'Bandera de Senegal' },
  'Ghana': { src: 'https://flagcdn.com/w40/gh.png', alt: 'Bandera de Ghana' },
  'Nigeria': { src: 'https://flagcdn.com/w40/ng.png', alt: 'Bandera de Nigeria' },
  'Cameroon': { src: 'https://flagcdn.com/w40/cm.png', alt: 'Bandera de Camerún' },
  'Algeria': { src: 'https://flagcdn.com/w40/dz.png', alt: 'Bandera de Argelia' },
  'Congo DR': { src: 'https://flagcdn.com/w40/cd.png', alt: 'Bandera de la República Democrática del Congo' },
  'Cabo Verde': { src: 'https://flagcdn.com/w40/cv.png', alt: 'Bandera de Cabo Verde' },
  'Cape Verde': { src: 'https://flagcdn.com/w40/cv.png', alt: 'Bandera de Cabo Verde' },
  'Ecuador': { src: 'https://flagcdn.com/w40/ec.png', alt: 'Bandera de Ecuador' },
  'Uruguay': { src: 'https://flagcdn.com/w40/uy.png', alt: 'Bandera de Uruguay' },
  'Paraguay': { src: 'https://flagcdn.com/w40/py.png', alt: 'Bandera de Paraguay' },
  'Colombia': { src: 'https://flagcdn.com/w40/co.png', alt: 'Bandera de Colombia' },
  'Chile': { src: 'https://flagcdn.com/w40/cl.png', alt: 'Bandera de Chile' },
  'Peru': { src: 'https://flagcdn.com/w40/pe.png', alt: 'Bandera de Perú' },
  'Bolivia': { src: 'https://flagcdn.com/w40/bo.png', alt: 'Bandera de Bolivia' },
  'Venezuela': { src: 'https://flagcdn.com/w40/ve.png', alt: 'Bandera de Venezuela' },
  'Australia': { src: 'https://flagcdn.com/w40/au.png', alt: 'Bandera de Australia' },
  'New Zealand': { src: 'https://flagcdn.com/w40/nz.png', alt: 'Bandera de Nueva Zelanda' },
  'India': { src: 'https://flagcdn.com/w40/in.png', alt: 'Bandera de India' },
  'Pakistan': { src: 'https://flagcdn.com/w40/pk.png', alt: 'Bandera de Pakistán' },
  'Bangladesh': { src: 'https://flagcdn.com/w40/bd.png', alt: 'Bandera de Bangladés' },
  'Thailand': { src: 'https://flagcdn.com/w40/th.png', alt: 'Bandera de Tailandia' },
  'Vietnam': { src: 'https://flagcdn.com/w40/vn.png', alt: 'Bandera de Vietnam' },
  'Philippines': { src: 'https://flagcdn.com/w40/ph.png', alt: 'Bandera de Filipinas' },
  'Indonesia': { src: 'https://flagcdn.com/w40/id.png', alt: 'Bandera de Indonesia' },
  'Malaysia': { src: 'https://flagcdn.com/w40/my.png', alt: 'Bandera de Malasia' },
  'Singapore': { src: 'https://flagcdn.com/w40/sg.png', alt: 'Bandera de Singapur' },
  'Iraq': { src: 'https://flagcdn.com/w40/iq.png', alt: 'Bandera de Irak' },
  'Iran': { src: 'https://flagcdn.com/w40/ir.png', alt: 'Bandera de Irán' },
  'Jordan': { src: 'https://flagcdn.com/w40/jo.png', alt: 'Bandera de Jordania' },
  'Israel': { src: 'https://flagcdn.com/w40/il.png', alt: 'Bandera de Israel' },
  'Lebanon': { src: 'https://flagcdn.com/w40/lb.png', alt: 'Bandera de Líbano' },
  'Palestine': { src: 'https://flagcdn.com/w40/ps.png', alt: 'Bandera de Palestina' },
  'Uzbekistan': { src: 'https://flagcdn.com/w40/uz.png', alt: 'Bandera de Uzbekistán' },
  'Fiji': { src: 'https://flagcdn.com/w40/fj.png', alt: 'Bandera de Fiyi' },
  'Mexico': { src: 'https://flagcdn.com/w40/mx.png', alt: 'Bandera de México' },
  'Argentina': { src: 'https://flagcdn.com/w40/ar.png', alt: 'Bandera de Argentina' },
  'Brazil': { src: 'https://flagcdn.com/w40/br.png', alt: 'Bandera de Brasil' },
  'Canada': { src: 'https://flagcdn.com/w40/ca.png', alt: 'Bandera de Canadá' },
  'Switzerland': { src: 'https://flagcdn.com/w40/ch.png', alt: 'Bandera de Suiza' },
  'Haiti': { src: 'https://flagcdn.com/w40/ht.png', alt: 'Bandera de Haití' },
  'Turkey': { src: 'https://flagcdn.com/w40/tr.png', alt: 'Bandera de Turquía' },
  'Türkiye': { src: 'https://flagcdn.com/w40/tr.png', alt: 'Bandera de Turquía' },
  'Ivory Coast': { src: 'https://flagcdn.com/w40/ci.png', alt: 'Bandera de Costa de Marfil' },
  'Cote d Ivoire': { src: 'https://flagcdn.com/w40/ci.png', alt: 'Bandera de Costa de Marfil' },
  "Côte d'Ivoire": { src: 'https://flagcdn.com/w40/ci.png', alt: 'Bandera de Costa de Marfil' },
  'Sweden': { src: 'https://flagcdn.com/w40/se.png', alt: 'Bandera de Suecia' },
  'Norway': { src: 'https://flagcdn.com/w40/no.png', alt: 'Bandera de Noruega' },
  'Austria': { src: 'https://flagcdn.com/w40/at.png', alt: 'Bandera de Austria' },
  'Croatia': { src: 'https://flagcdn.com/w40/hr.png', alt: 'Bandera de Croacia' },
  'Panama': { src: 'https://flagcdn.com/w40/pa.png', alt: 'Bandera de Panamá' },
  'Curacao': { src: 'https://flagcdn.com/w40/cw.png', alt: 'Bandera de Curazao' },
  'Curaçao': { src: 'https://flagcdn.com/w40/cw.png', alt: 'Bandera de Curazao' },
  'Czech Republic': { src: 'https://flagcdn.com/w40/cz.png', alt: 'Bandera de Chequia' },
  'Czechia': { src: 'https://flagcdn.com/w40/cz.png', alt: 'Bandera de Chequia' },
  'Bosnia-Herzegovina': { src: 'https://flagcdn.com/w40/ba.png', alt: 'Bandera de Bosnia y Herzegovina' },
  'Bosnia and Herzegovina': { src: 'https://flagcdn.com/w40/ba.png', alt: 'Bandera de Bosnia y Herzegovina' },
  'United States': { src: 'https://flagcdn.com/w40/us.png', alt: 'Bandera de Estados Unidos' },
  'United States of America': { src: 'https://flagcdn.com/w40/us.png', alt: 'Bandera de Estados Unidos' },
  'USA': { src: 'https://flagcdn.com/w40/us.png', alt: 'Bandera de Estados Unidos' },
  'Spain': { src: 'https://flagcdn.com/w40/es.png', alt: 'Bandera de España' },
  'England': { src: 'https://flagcdn.com/w40/gb.png', alt: 'Bandera de Inglaterra' },
  'United Kingdom': { src: 'https://flagcdn.com/w40/gb.png', alt: 'Bandera del Reino Unido' },
  'France': { src: 'https://flagcdn.com/w40/fr.png', alt: 'Bandera de Francia' },
  'Germany': { src: 'https://flagcdn.com/w40/de.png', alt: 'Bandera de Alemania' },
  'Italy': { src: 'https://flagcdn.com/w40/it.png', alt: 'Bandera de Italia' },
  'Japan': { src: 'https://flagcdn.com/w40/jp.png', alt: 'Bandera de Japón' },
  'South Korea': { src: 'https://flagcdn.com/w40/kr.png', alt: 'Bandera de Corea del Sur' },
  'Korea Republic': { src: 'https://flagcdn.com/w40/kr.png', alt: 'Bandera de Corea del Sur' },
  'Republic of Korea': { src: 'https://flagcdn.com/w40/kr.png', alt: 'Bandera de Corea del Sur' },
  'China': { src: 'https://flagcdn.com/w40/cn.png', alt: 'Bandera de China' },
  'Portugal': { src: 'https://flagcdn.com/w40/pt.png', alt: 'Bandera de Portugal' },
  'Belgium': { src: 'https://flagcdn.com/w40/be.png', alt: 'Bandera de Bélgica' },
  'Netherlands': { src: 'https://flagcdn.com/w40/nl.png', alt: 'Bandera de Países Bajos' },
  'Scotland': { src: 'https://flagcdn.com/w40/gb-sct.png', alt: 'Bandera de Escocia' },
};

export function getCountryFlag(country: string): string {
  if (!country) return '';
  
  // Try exact match first
  if (COUNTRY_FLAGS[country]) {
    return COUNTRY_FLAGS[country];
  }
  
  // Try normalized match (case-insensitive)
  const normalized = country.toLowerCase();
  for (const [key, flag] of Object.entries(COUNTRY_FLAGS)) {
    if (key.toLowerCase() === normalized) {
      return flag;
    }
  }
  
  // Extract base country name (remove suffixes like "silver", "gold", etc.)
  const baseParts = country.split(/\s+(silver|gold|bronze|emblem|base|badge|\d+)$/i);
  const baseCountry = baseParts[0]?.trim();
  
  if (baseCountry && baseCountry !== country) {
    // Try exact match for base country
    if (COUNTRY_FLAGS[baseCountry]) {
      return COUNTRY_FLAGS[baseCountry];
    }
    
    // Try normalized match for base country
    const baseNormalized = baseCountry.toLowerCase();
    for (const [key, flag] of Object.entries(COUNTRY_FLAGS)) {
      if (key.toLowerCase() === baseNormalized) {
        return flag;
      }
    }
  }
  
  // Default
  return '';
}

export function getCountryFlagImage(country: string) {
  const direct = COUNTRY_FLAG_IMAGES[country];
  if (direct) {
    return direct;
  }

  const normalized = normalizeCountryName(country);
  return COUNTRY_FLAG_IMAGES[normalized] ?? null;
}

export function getCountryDisplayName(country: string, locale: Locale): string {
  const normalized = normalizeCountryName(country);

  if (locale === 'en') {
    return normalized;
  }

  return COUNTRY_NAMES_ES[normalized] ?? COUNTRY_NAMES_ES[country] ?? normalized;
}

export function getSectionDisplayName(section: string, locale: Locale): string {
  if (!section) {
    return '';
  }

  if (section.startsWith('Extra /')) {
    const tier = section.split('/').pop()?.trim() ?? '';
    if (locale === 'en') {
      return `Extra / ${tier}`;
    }

    const translatedTier =
      tier === 'Base' ? 'Base' : tier === 'Gold' ? 'Dorado' : tier === 'Silver' ? 'Plata' : tier === 'Bronze' ? 'Bronce' : tier;
    return `Extra / ${translatedTier}`;
  }

  if (section === 'FIFA World Cup 2026' || section === 'FIFA World Cup History') {
    return locale === 'en' ? section : SECTION_NAMES_ES[section] ?? section;
  }

  if (section === "McDonald's Exclusive") {
    return locale === 'en' ? section : SECTION_NAMES_ES[section] ?? section;
  }

  return getCountryDisplayName(section, locale);
}

export function normalizeCountryName(country: string): string {
  // Normalize for consistent matching
  const normalized = country.trim();
  
  // Fix common variations
  if (normalized.includes('Korea')) return 'South Korea';
  if (normalized.includes('Czechia')) return 'Czech Republic';
  if (normalized.includes("Côte") || normalized.includes('Cote')) return 'Ivory Coast';
  if (normalized.includes('Saudi') && !normalized.includes('Arabia')) return 'Saudi Arabia';
  if (normalized.includes('Cape') || normalized.includes('Cabo')) return 'Cabo Verde';
  if (normalized.includes('Bosnia')) return 'Bosnia-Herzegovina';
  if (normalized.includes('Curacao') || normalized.includes('Curaçao')) return 'Curaçao';
  if (normalized === 'USA' || normalized === 'United States') return 'United States';
  if (normalized.includes('Türkiye') || normalized.includes('Turkey')) return 'Turkey';
  
  return normalized;
}
