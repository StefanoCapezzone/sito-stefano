import it from './it.json';
import en from './en.json';

export type Lang = 'it' | 'en';

const translations = { it, en } as const;

type TranslationType = typeof it;

/**
 * Get translation for a given key
 */
export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

/**
 * Get all translations for a language
 */
export function getTranslations(lang: Lang): TranslationType {
  return translations[lang];
}

/**
 * Get the opposite language
 */
export function getAlternateLang(lang: Lang): Lang {
  return lang === 'it' ? 'en' : 'it';
}

/**
 * Get language from URL path
 */
export function getLangFromPath(path: string): Lang {
  if (path.startsWith('/en/') || path === '/en') {
    return 'en';
  }
  return 'it';
}

/**
 * Format date according to locale
 */
export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get localized URL
 */
export function getLocalizedUrl(path: string, targetLang: Lang): string {
  // Remove existing language prefix
  const cleanPath = path.replace(/^\/(it|en)/, '');
  return `/${targetLang}${cleanPath || '/'}`;
}
