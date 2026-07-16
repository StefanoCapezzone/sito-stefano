// @ts-check
import { readdir, rename, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import sharp from 'sharp';

/**
 * Ogni variante `*-<N>.webp` deve essere larga esattamente N pixel.
 *
 * È l'invariante su cui poggia ogni `srcset` del sito: il descrittore `w` non è
 * un'etichetta, è la larghezza vera del file, ed è l'unico dato su cui il
 * browser sceglie. Il repo l'ha già visto mentire — `claude-code-800.webp` era
 * 583×800 e si annunciava `800w`, quindi il browser la sceglieva credendo di
 * avere 800px di larghezza (vedi CLAUDE.md).
 *
 * Il controllo vive qui e non nei componenti perché il fatto è statico: le
 * varianti si generano a mano con `cwebp` e cambiano solo quando qualcuno le
 * rigenera. Verificarlo una volta al build copre **tutte** le varianti — quelle
 * del blog (`-400`, `-800`) e quelle della foto profilo (`-320`, `-640`, `-960`),
 * che sono scritte a mano nel markup e nessuna funzione controllerebbe.
 *
 * Fallisce forte, come `nestedNotFoundAsFile`: una variante storta non rompe
 * niente in modo visibile, fa solo scaricare al browser il file sbagliato per
 * sempre.
 */
function assertVariantWidths() {
  /** @type {URL} */
  let publicDir;
  return {
    name: 'assert-variant-widths',
    hooks: {
      'astro:config:done': ({ config }) => {
        publicDir = config.publicDir;
      },
      'astro:build:start': async () => {
        const root = fileURLToPath(new URL('images/', publicDir));
        const files = await readdir(root, { recursive: true });
        const varianti = files.filter((f) => /-\d+\.webp$/.test(f));

        const bugiarde = [];
        for (const file of varianti) {
          const attesa = Number(file.match(/-(\d+)\.webp$/)[1]);
          const { width } = await sharp(root + file).metadata();
          if (width !== attesa) {
            bugiarde.push(`  ${file}: dichiara ${attesa}w, è larga ${width}px`);
          }
        }

        if (bugiarde.length > 0) {
          throw new Error(
            `Varianti con larghezza diversa dal nome:\n${bugiarde.join('\n')}\n` +
              `Rigenerarle con: cwebp -resize <N> 0 -q 82 <sorgente> -o <file>-<N>.webp`
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
 * Il rename fallisce forte di proposito: se un giorno Astro cambiasse la resa,
 * meglio un build rotto di una 404 che risponde 200 senza dirlo a nessuno.
 */
function nestedNotFoundAsFile() {
  return {
    name: 'nested-404-as-file',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        await rename(new URL('en/404/index.html', dir), new URL('en/404.html', dir));
        await rm(new URL('en/404/', dir), { recursive: true });
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
    assertVariantWidths(),
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
