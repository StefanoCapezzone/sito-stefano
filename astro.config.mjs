// @ts-check
import { readdir, rename, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { VARIANT_WIDTHS, variantSrc } from './src/utils/blog';
import { measuredSize } from './src/utils/images';

/**
 * Ogni variante che il sito annuncia in un `srcset` deve esistere ed essere
 * larga quanto il suo `w` dichiara.
 *
 * È l'invariante su cui poggia ogni `srcset`: il descrittore `w` non è
 * un'etichetta, è la larghezza vera del file, ed è l'unico dato su cui il
 * browser sceglie. Il repo l'ha già visto mentire — `claude-code-800.webp` era
 * 583×800 e si annunciava `800w`, quindi il browser la sceglieva credendo di
 * avere 800px di larghezza (vedi CLAUDE.md).
 *
 * **Parte dalle dichiarazioni, non dai file.** Per ogni copertina del blog
 * chiede a `imageSrcset` cosa promette e verifica quello. Spazzolare invece
 * `public/` cercando i nomi che *sembrano* varianti sbaglia da entrambi i lati:
 * `-\d+\.webp` matcha `linux-day-2025.webp` — una copertina chiamata come lo
 * slug del suo articolo, cioè la convenzione più naturale — e fa fallire il
 * build con «dichiara 2025w, è larga 1169px»; e non nota una variante
 * *mancante*, perché un file che non c'è non ha un nome da controllare.
 *
 * Fallisce forte, come `nestedNotFoundAsFile`: una variante storta o assente
 * non rompe niente in modo visibile, fa solo scaricare al browser il file
 * sbagliato — o un 404 — per sempre.
 */
function assertDeclaredVariants() {
  /** @type {URL} */
  let publicDir;
  return {
    name: 'assert-declared-variants',
    hooks: {
      'astro:config:done': ({ config }) => {
        publicDir = config.publicDir;
      },
      'astro:build:start': async () => {
        // Le copertine: i .webp di blog/ che non siano già una variante o una OG.
        const blogDir = new URL('images/blog/', publicDir);
        const covers = (await readdir(fileURLToPath(blogDir)))
          .filter((f) => f.endsWith('.webp'))
          .filter((f) => !/-(\d+|og)\.webp$/.test(f));

        /** Ciò che il sito promette: `[percorso, larghezza attesa]`. */
        const promesse = [
          ...covers.flatMap((cover) =>
            VARIANT_WIDTHS.map((w) => [
              variantSrc(`/images/blog/${cover}`, w),
              w,
            ])
          ),
          // La foto profilo: le sue varianti sono scritte a mano nel markup di
          // homepage e bio, quindi nessuna funzione le dichiara e vanno elencate.
          ...[320, 640, 960].map((w) => [
            `/images/optimized/stefano-square-${w}.webp`,
            w,
          ]),
        ];

        const rotte = [];
        for (const [percorso, attesa] of promesse) {
          let width;
          try {
            ({ width } = await measuredSize(percorso));
          } catch {
            rotte.push(`  ${percorso}: annunciata ${attesa}w, non esiste`);
            continue;
          }
          if (width !== attesa) {
            rotte.push(`  ${percorso}: annunciata ${attesa}w, è larga ${width}px`);
          }
        }

        if (rotte.length > 0) {
          throw new Error(
            `Varianti annunciate nei srcset ma assenti o di larghezza diversa:\n` +
              `${rotte.join('\n')}\n` +
              `Generarle con: cwebp -resize <N> 0 -q 82 <sorgente> -o <file>-<N>.webp`
          );
        }
      },
    },
  };
}

/**
 * Astro emette `404.html` solo per la 404 di radice: `src/pages/en/404.astro`
 * diventa `dist/en/404/index.html`. Ma Cloudflare Pages cerca un *file*
 * `404.html` risalendo l'albero delle directory, quindi non lo troverebbe:
 * /en/* ricadrebbe sulla 404 italiana e /en/404/ resterebbe una pagina "non
 * trovata" servita con 200 — il soft 404 che questa pagina esiste per togliere.
 *
 * Le lingue arrivano da `i18n.locales` e non sono scritte qui: la lingua di
 * default ha già la 404 di radice, tutte le altre hanno la propria annidata.
 * Cablare `en` significherebbe che una terza lingua **non fa niente in
 * silenzio** — nessun rename, nessun errore, e /fr/* che ricade sulla 404
 * italiana mentre /fr/404/ torna a rispondere 200. Cioè esattamente il bug che
 * questa integrazione esiste per togliere, di nuovo, senza che nessuno lo veda.
 *
 * Il rename fallisce forte di proposito: se un giorno Astro cambiasse la resa,
 * meglio un build rotto di una 404 che risponde 200 senza dirlo a nessuno.
 */
function nestedNotFoundAsFile() {
  /** @type {string[]} */
  let annidate;
  return {
    name: 'nested-404-as-file',
    hooks: {
      'astro:config:done': ({ config }) => {
        annidate = config.i18n.locales
          .map((l) => (typeof l === 'string' ? l : l.path))
          .filter((l) => l !== config.i18n.defaultLocale);
      },
      'astro:build:done': async ({ dir }) => {
        for (const lang of annidate) {
          await rename(
            new URL(`${lang}/404/index.html`, dir),
            new URL(`${lang}/404.html`, dir)
          );
          await rm(new URL(`${lang}/404/`, dir), { recursive: true });
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://stefano.capezzone.it',

  // Output statico - massime performance
  output: 'static',

  // Prefetch al hover. Serve prefetchAll: con il solo `true` Astro precarica
  // unicamente i link marcati data-astro-prefetch — che qui non esistono,
  // quindi il runtime veniva spedito senza precaricare nulla.
  prefetch: { prefetchAll: true },

  // Internazionalizzazione
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: true,
    }
  },

  // Integrazioni
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: {
          it: 'it-IT',
          en: 'en-US',
        },
      },
      // Il sitemap dice due cose sole: quali URL esistono e in che lingue.
      //
      // Niente `lastmod`: `new Date()` lo fissava al momento del build, quindi
      // ogni rebuild — anche di un fix CSS — dichiarava tutte le pagine
      // modificate. Google lo usa "if it's consistently and verifiably
      // accurate", e omettere è esplicitamente previsto ("it's fine to leave
      // out lastmod for those pages"): meglio assente che falso. La data di
      // modifica reale resta nei dati strutturati e nei meta DC.date.modified.
      //
      // Niente `priority` né `changefreq`, per due motivi. Il primo è che non
      // servono: "Google ignores <priority> and <changefreq> values"
      // (developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
      // Il secondo conta di più: `changefreq: 'weekly'` era un'affermazione
      // che nessun contenuto sosteneva, dichiarata a ogni crawler — lo stesso
      // difetto per cui il lastmod è stato tolto tre righe più su.
      //
      // La homepage non va indicizzata: è un redirect a /it/ (vedi _redirects).
      filter: (page) => page !== 'https://stefano.capezzone.it/',
    }),
    nestedNotFoundAsFile(),
    assertDeclaredVariants(),
  ],

  // Vite plugins
  vite: {
    plugins: [tailwindcss()]
  },

  // Build ottimizzato
  build: {
    inlineStylesheets: 'auto',
  },

  // Compressione HTML
  compressHTML: true,
});
