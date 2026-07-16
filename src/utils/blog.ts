import sharp from 'sharp';
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

/**
 * Larghezza reale di un file di `public/`, letta dal file stesso al build.
 *
 * Il descrittore `w` non è un'etichetta: dichiara al browser quanti pixel di
 * larghezza ha davvero il file, ed è l'unico dato su cui il browser sceglie.
 * Scriverlo a mano l'ha già fatto mentire una volta — `claude-code-800.webp`
 * era 583×800 e veniva annunciato `800w` (vedi `imageSrcset` e CLAUDE.md).
 * Misurarlo toglie di mezzo la classe di bug: se una variante viene rigenerata
 * storta, il srcset lo dice invece di nasconderlo.
 */
async function measuredWidth(publicPath: string): Promise<number> {
  const { width } = await sharp(`public${publicPath}`).metadata();
  if (!width) throw new Error(`Larghezza non leggibile da ${publicPath}`);
  return width;
}

/**
 * Srcset dell'immagine di copertina di un articolo — l'elemento LCP della
 * pagina, servito `eager` e `fetchpriority="high"`.
 *
 * Rende in un box largo fino a 848px (`max-w-4xl` meno il padding), quindi a
 * differenza delle card ha bisogno anche dell'originale: le varianti si fermano
 * a 800w e su schermi retina l'800w andrebbe scalato 2×. L'originale entra con
 * la sua larghezza vera, che cambia da immagine a immagine (864, 1169, 1516) e
 * per questo va misurata e non supposta.
 */
export async function heroSrcset(image: string): Promise<string> {
  const base = image.replace(/\.webp$/, '');
  const candidates = [`${base}-400.webp`, `${base}-800.webp`, image];
  const entries = await Promise.all(
    candidates.map(async (src) => `${src} ${await measuredWidth(src)}w`)
  );
  return entries.join(', ');
}

/**
 * Larghezza resa dalla copertina dell'articolo: `max-w-4xl` (896px) meno il
 * padding, che cambia ai breakpoint sm (1rem→1.5rem) e lg (1.5rem→2rem).
 */
export const HERO_IMAGE_SIZES =
  '(min-width: 1024px) 832px, (min-width: 896px) 848px, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)';

/** Larghezza resa dalle miniature degli articoli correlati (max-w-4xl, gap-6). */
export const RELATED_IMAGE_SIZES =
  '(min-width: 1024px) 261px, (min-width: 640px) calc((100vw - 4.5rem) / 2), calc(100vw - 2rem)';
