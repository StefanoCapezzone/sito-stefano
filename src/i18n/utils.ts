import it from './it.json';
import en from './en.json';

export type Lang = 'it' | 'en';

const translations = { it, en } as const;


/**
 * Get translation for a given key.
 * I placeholder `{nome}` nella stringa vengono sostituiti con `params`.
 */
export function t(
  lang: Lang,
  key: string,
  params?: Record<string, string | number>
): string {
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

  if (typeof value !== 'string') return key;
  if (!params) return value;

  return value.replace(/\{(\w+)\}/g, (match, name) =>
    name in params ? String(params[name]) : match
  );
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
 * Registro delle rotte: unica fonte di verità per i segmenti localizzati.
 * Chiavato per identità di rotta, non per stringa, così serve sia a costruire
 * un URL (routePath) sia a tradurne uno esistente (getLocalizedUrl). Senza
 * questo, /it/pubblicazioni genererebbe l'hreflang /en/pubblicazioni (404):
 * scambiare il prefisso di lingua non basta.
 */
const ROUTES = {
  bio: { it: 'bio', en: 'bio' },
  blog: { it: 'blog', en: 'blog' },
  publications: { it: 'pubblicazioni', en: 'publications' },
} as const;

export type RouteKey = keyof typeof ROUTES;

/**
 * URL di una rotta nota, con eventuali segmenti in coda (es. uno slug).
 * Con lo slash finale, perché è così che Astro genera le pagine e così che le
 * dichiara il canonical: senza, ogni link interno costa un 308 e i dati
 * strutturati puntano a un URL diverso da quello della pagina che li ospita.
 */
export function routePath(
  key: RouteKey,
  lang: Lang,
  ...rest: string[]
): string {
  return `/${lang}/${[ROUTES[key][lang], ...rest].join('/')}/`;
}

function translateSegment(segment: string, targetLang: Lang): string {
  const key = (Object.keys(ROUTES) as RouteKey[]).find((k) =>
    Object.values(ROUTES[k]).includes(segment as never)
  );
  return key ? ROUTES[key][targetLang] : segment;
}

/**
 * Get localized URL
 */
export function getLocalizedUrl(path: string, targetLang: Lang): string {
  // Remove existing language prefix
  const cleanPath = path.replace(/^\/(it|en)/, '');
  const segments = cleanPath.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLang}/`;
  }

  segments[0] = translateSegment(segments[0], targetLang);
  const trailingSlash = cleanPath.endsWith('/') ? '/' : '';

  return `/${targetLang}/${segments.join('/')}${trailingSlash}`;
}
