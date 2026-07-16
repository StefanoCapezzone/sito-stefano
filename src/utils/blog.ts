import type { CollectionEntry } from 'astro:content';
import { routePath, type Lang } from '../i18n/utils';
import { measuredSize } from './images';

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
 *
 * Qui il `w` resta **dichiarato**, non misurato, e va bene: a garantirlo c'è
 * `assertVariantWidths` in `astro.config.mjs`, che al build controlla ogni
 * `*-<N>.webp` di `public/` e fallisce se non è larga N. Misurare a ogni
 * chiamata renderebbe async sei `.map()` nel markup per ricontrollare, immagine
 * per immagine, un fatto già verificato una volta per tutte.
 */
export function imageSrcset(image: string): string {
  const base = image.replace(/\.webp$/, '');
  return `${base}-400.webp 400w, ${base}-800.webp 800w`;
}

/** Larghezza resa dalle card nelle griglie a 3 colonne (max-w-6xl, gap-8). */
export const CARD_IMAGE_SIZES =
  '(min-width: 1024px) 362px, (min-width: 768px) 350px, 100vw';

/**
 * Tutto ciò che serve all'`<img>` di copertina di un articolo — l'elemento LCP
 * della pagina, servito `eager` e `fetchpriority="high"`.
 *
 * **`srcset`**: rende in un box largo fino a 848px (`max-w-4xl` meno il
 * padding), quindi a differenza delle card ha bisogno anche dell'originale — le
 * varianti si fermano a 800w e su schermi retina l'800w andrebbe scalato 2×.
 * L'originale entra con la sua larghezza vera, che cambia da immagine a immagine
 * (864, 1169, 1516) e per questo va misurata e non supposta.
 *
 * **`width`/`height`**: sono le dimensioni intrinseche dell'originale, e servono
 * a riservare lo spazio prima che l'immagine arrivi. Senza, il browser non
 * conosce le proporzioni: la `<figure>` occupa zero, poi l'immagine atterra e
 * spinge giù ~770px di articolo. È CLS, ed è la Core Web Vital che si rompe
 * proprio ottimizzando l'LCP e dimenticandosi il resto. Le varianti sono
 * riduzioni proporzionali dell'originale, quindi il rapporto vale per tutte
 * qualunque sia quella scelta dal browser.
 */
export async function heroImage(image: string): Promise<{
  srcset: string;
  width: number;
  height: number;
}> {
  const base = image.replace(/\.webp$/, '');
  const candidates = [`${base}-400.webp`, `${base}-800.webp`, image];
  const sizes = await Promise.all(candidates.map(measuredSize));

  return {
    srcset: candidates.map((src, i) => `${src} ${sizes[i].width}w`).join(', '),
    // L'originale è l'ultimo candidato: è lui a dare le proporzioni vere.
    ...sizes[sizes.length - 1],
  };
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
