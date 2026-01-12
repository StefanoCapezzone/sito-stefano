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
