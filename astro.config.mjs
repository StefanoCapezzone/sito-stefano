// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://stefano.capezzone.it',

  // Output statico - massime performance
  output: 'static',

  // Prefetch automatico dei link al hover
  prefetch: true,

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
      lastmod: new Date(),
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
