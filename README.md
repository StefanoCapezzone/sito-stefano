# Sito Web Stefano Capezzone

Sito web personale di Stefano Capezzone - imprenditore, docente e manager dell'innovazione.

## Stack Tecnologico

- **Framework**: [Astro 5](https://astro.build) (Static Site Generator)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) con palette IBM Blue
- **Font**: [Geist](https://vercel.com/font) (Vercel)
- **Icone**: [Lucide](https://lucide.dev)
- **Deploy**: Cloudflare Pages

## Funzionalita

- Sito bilingue (Italiano / English)
- Blog con Content Collections
- Lista pubblicazioni scientifiche con link DOI
- SEO ottimizzato con sitemap
- View Transitions per navigazione fluida
- Prefetch automatico dei link
- Design responsive

## Comandi

```bash
# Installare le dipendenze
npm install

# Avviare il server di sviluppo
npm run dev

# Build di produzione
npm run build

# Preview del build
npm run preview
```

## Struttura del Progetto

```
src/
├── components/       # Componenti riutilizzabili
├── content/          # Content Collections (blog, pubblicazioni)
├── i18n/             # File di traduzione
├── layouts/          # Layout delle pagine
├── pages/            # Pagine del sito
│   ├── it/           # Versione italiana
│   └── en/           # Versione inglese
└── styles/           # CSS globale
```

## Licenza

Tutti i diritti riservati.
