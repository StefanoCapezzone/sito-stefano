# Sito Web Stefano Capezzone

Sito web personale di Stefano Capezzone - imprenditore, docente e manager dell'innovazione.

## Stack Tecnologico

- **Framework**: Astro 5.x (SSG)
- **Styling**: Tailwind CSS 4.x con palette IBM Blue
- **Font**: Geist Sans/Mono
- **Deploy**: Cloudflare Pages
- **Dominio**: stefano.capezzone.it

## Comandi

```bash
npm run dev      # Server di sviluppo (localhost:4321)
npm run build    # Build di produzione
npm run preview  # Preview del build
```

## Struttura

```
src/
├── components/     # Componenti Astro (Header, Footer, etc.)
├── layouts/        # Layout base
├── pages/          # Pagine (IT e EN)
│   ├── it/         # Versione italiana
│   └── en/         # Versione inglese
├── content/        # Content Collections
│   ├── blog/       # Articoli blog (IT/EN)
│   └── publications/ # Pubblicazioni scientifiche
├── i18n/           # Traduzioni
└── styles/         # CSS globale
```

## Contenuti

- **Bio**: Profilo professionale in `/it/bio` e `/en/bio`
- **Blog**: Articoli in markdown con frontmatter
- **Pubblicazioni**: Lista da JSON con link DOI

## i18n

Il sito è bilingue (IT/EN) con routing basato su cartelle:
- `/it/*` - Italiano (default)
- `/en/*` - English

## Note

- Le immagini vanno in `public/images/`
- Gli articoli del blog vanno in `src/content/blog/{lang}/`
- La palette IBM Blue è definita in `src/styles/global.css`
