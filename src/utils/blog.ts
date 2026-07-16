import type { CollectionEntry } from 'astro:content';
import { routePath, type Lang } from '../i18n/utils';
import { measuredSize, type ImageSize } from './images';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * URL del post. Lo slug della collection porta il prefisso della cartella di
 * lingua (`it/foo`), che non fa parte dell'URL.
 */
export function blogPostUrl(post: BlogPost, lang: Lang): string {
  return routePath('blog', lang, post.slug.replace(/^(it|en)\//, ''));
}

/**
 * Le larghezze delle varianti generate a mano accanto a ogni copertina.
 *
 * **È l'unica dichiarazione della scala**: la leggono `imageSrcset` per
 * annunciarle e `assertVariantWidths` (`astro.config.mjs`) per verificarle al
 * build. Aggiungerne una qui la fa entrare nel srcset e nel controllo insieme;
 * scriverla in due posti li farebbe divergere in silenzio, con le card che
 * servono una variante e la copertina no.
 */
export const VARIANT_WIDTHS = [400, 800] as const;

/** Nome della variante larga `w` generata accanto a `image`. */
export function variantSrc(image: string, w: number): string {
  return `${image.replace(/\.webp$/, '')}-${w}.webp`;
}

/**
 * Varianti responsive pre-generate accanto all'originale (vedi CLAUDE.md).
 * Le card del blog rendono a ~341px: servire l'originale costa fino a 10× i byte.
 *
 * Il descrittore `w` dichiara la **larghezza**: `-400` e `-800` devono essere
 * larghe 400 e 800px, non "rimpicciolite a 400/800 sul lato lungo". Su
 * un'immagine verticale le due cose divergono — `claude-code-800.webp` era
 * 583×800, quindi `800w` mentiva e il browser la sceglieva credendo di avere
 * 800px di larghezza. Generarle con `cwebp -resize <w> 0` (altezza 0 = auto).
 *
 * Qui il `w` resta **dichiarato**, non misurato, e va bene: a garantirlo c'è
 * `assertVariantWidths`, che al build verifica esistenza e larghezza di ciò che
 * questa funzione promette. Misurare a ogni chiamata ricontrollerebbe, immagine
 * per immagine, un fatto già verificato una volta per tutte.
 */
export function imageSrcset(image: string): string {
  return VARIANT_WIDTHS.map((w) => `${variantSrc(image, w)} ${w}w`).join(', ');
}

/**
 * Larghezza resa dalle card nelle griglie a 3 colonne (max-w-6xl, gap-8).
 * (1152 − 64 di `lg:px-8` − 64 di gap) / 3 = 341. Dichiarava 362, che è lo
 * stesso conto **senza** il padding del container: misurato in browser, il box
 * è 341. Errore inerte finché la scala resta 400/800 — a 341 come a 362 il
 * browser sceglie lo stesso file — ma inerte non vuol dire vero.
 */
export const CARD_IMAGE_SIZES =
  '(min-width: 1024px) 341px, (min-width: 768px) 350px, 100vw';

/**
 * Tutto ciò che serve all'`<img>` di copertina di un articolo — l'elemento LCP
 * della pagina, servito `eager` e `fetchpriority="high"`.
 *
 * **`srcset`**: rende in un box largo fino a 848px (`max-w-4xl` meno il
 * padding), quindi a differenza delle card ha bisogno anche dell'originale — le
 * varianti si fermano a 800w e su schermi retina l'800w andrebbe scalato 2×.
 * Aggiunge quindi l'originale a ciò che `imageSrcset` già annuncia. È l'unico
 * file che va **misurato**: ogni copertina ha una larghezza diversa dalle altre,
 * mentre le varianti hanno la larghezza che il build ha già verificato.
 *
 * **`width`/`height`**: sono le dimensioni intrinseche dell'originale, e servono
 * a riservare lo spazio prima che l'immagine arrivi. Senza, il browser non
 * conosce le proporzioni: la `<figure>` occupa zero, poi l'immagine atterra e
 * spinge giù ~770px di articolo. È CLS, ed è la Core Web Vital che si rompe
 * proprio ottimizzando l'LCP e dimenticandosi il resto. Le varianti sono
 * riduzioni proporzionali dell'originale, quindi il rapporto vale per tutte
 * qualunque sia quella scelta dal browser.
 */
export async function heroImage(image: string): Promise<ImageSize & { srcset: string }> {
  const size = await measuredSize(image);
  return {
    srcset: `${imageSrcset(image)}, ${image} ${size.width}w`,
    ...size,
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
