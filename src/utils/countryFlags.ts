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

// Map locale codes to language names and their flags
export const LOCALE_FLAGS: Record<string, { label: string; flag: string }> = {
  'es': { label: 'Español', flag: '🇪🇸' },
  'en': { label: 'English', flag: '🇬🇧' },
  'ru': { label: 'Русский', flag: '🇷🇺' },
  'zh': { label: '中文', flag: '🇨🇳' },
};

export function getCountryFlag(country: string): string {
  if (!country) return '🏷️';
  
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
  return '🏷️';
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
