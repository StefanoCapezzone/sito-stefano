// @ts-check
import { rename, rm } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
      changefreq: 'weekly',
      // Nessun lastmod: `new Date()` lo fissava al momento del build, quindi
      // ogni rebuild — anche di un fix CSS — dichiarava tutte le 29 pagine
      // modificate. Google ignora il lastmod per l'intero sito quando lo trova
      // cronicamente inaffidabile: meglio ometterlo che mentire. La data di
      // modifica reale resta nei dati strutturati e nei meta DC.date.modified.
      // La homepage non va indicizzata: è un redirect a /it/ (vedi _redirects).
      filter: (page) => page !== 'https://stefano.capezzone.it/',
      serialize(item) {
        // Homepage e bio con priorita' alta
        if (item.url.match(/\/(it|en)\/?$/)) {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/bio')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/blog/') && !item.url.endsWith('/blog/')) {
          // Singoli articoli blog
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/blog')) {
          // Blog index
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/pubblicazioni') || item.url.includes('/publications')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.5;
        }
        return item;
      },
    }),
    nestedNotFoundAsFile(),
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
