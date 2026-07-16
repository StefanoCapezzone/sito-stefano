import type { CollectionEntry } from 'astro:content';
import { routePath, type Lang } from '../i18n/utils';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * URL del post. Lo slug della collection porta il prefisso della cartella di
 * lingua (`it/foo`), che non fa parte dell'URL.
 */
export function blogPostUrl(post: BlogPost, lang: Lang): string {
  return routePath('blog', lang, post.slug.replace(/^(it|en)\//, ''));
}

/**
 * Varianti responsive pre-generate accanto all'originale (vedi CLAUDE.md).
 * Le card del blog rendono a ~380px: servire l'originale costa fino a 10× i byte.
 *
 * Il descrittore `w` dichiara la **larghezza**: `-400` e `-800` devono essere
 * larghe 400 e 800px, non "rimpicciolite a 400/800 sul lato lungo". Su
 * un'immagine verticale le due cose divergono — `claude-code-800.webp` era
 * 583×800, quindi `800w` mentiva e il browser la sceglieva credendo di avere
 * 800px di larghezza. Generarle con `cwebp -resize <w> 0` (altezza 0 = auto).
 */
export function imageSrcset(image: string): string {
  const base = image.replace(/\.webp$/, '');
  return `${base}-400.webp 400w, ${base}-800.webp 800w`;
}

/** Larghezza resa dalle card nelle griglie a 3 colonne (max-w-6xl, gap-8). */
export const CARD_IMAGE_SIZES =
  '(min-width: 1024px) 362px, (min-width: 768px) 350px, 100vw';
