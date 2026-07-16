// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
