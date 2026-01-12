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

## Immagini

### Struttura

```
public/images/
├── StefanoCapezzone.jpg   # Immagine sorgente originale (2880x1800)
├── og-default.webp        # OG image di default per social
├── optimized/             # Varianti responsive pre-ottimizzate
│   ├── stefano-400.webp   # 400px width
│   ├── stefano-800.webp   # 800px width
│   └── stefano-1200.webp  # 1200px width
└── blog/                  # Immagini articoli del blog
    └── *.webp
```

### Strategia di ottimizzazione

- **Formato**: WebP (compressione efficiente, supporto browser moderni)
- **Approccio**: Ottimizzazione manuale pre-build (no `@astrojs/image` o servizi esterni)
- **Varianti responsive**: Generate manualmente a 400px, 800px, 1200px

### Pattern per immagini responsive

Le immagini hero/profilo usano l'elemento `<picture>` nativo con `srcset`:

```html
<picture>
  <source
    type="image/webp"
    srcset="/images/optimized/stefano-400.webp 400w,
            /images/optimized/stefano-800.webp 800w"
    sizes="(max-width: 640px) 256px, 320px"
  />
  <img
    src="/images/optimized/stefano-800.webp"
    alt="..."
    loading="eager"
    decoding="async"
    fetchpriority="high"
  />
</picture>
```

### Performance

- **Hero/LCP images**: `loading="eager"` + `fetchpriority="high"`
- **Below-fold images**: `loading="lazy"`
- **Blog images**: Referenziate via frontmatter (`image: "/images/blog/nome.webp"`)

### OG Images

- Default: `/images/og-default.webp` (usato in `BaseLayout.astro`)
- Custom: Ogni post può specificare `image` nel frontmatter

## Note

- Gli articoli del blog vanno in `src/content/blog/{lang}/`
- La palette IBM Blue è definita in `src/styles/global.css`
