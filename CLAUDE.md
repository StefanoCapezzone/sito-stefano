# Sito Web Stefano Capezzone

Sito web personale di Stefano Capezzone - imprenditore, docente e manager dell'innovazione.

## Stack Tecnologico

- **Framework**: Astro 5.x (SSG)
- **Styling**: Tailwind CSS 4.x con palette IBM Blue
- **Font**: Geist Sans/Mono (via `@fontsource`)
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
├── components/     # Componenti Astro (Header, Footer, Breadcrumb, SocialLinks)
├── layouts/        # BaseLayout (head, JSON-LD, meta tags)
├── pages/          # Pagine (IT e EN)
│   ├── it/         # Versione italiana
│   ├── en/         # Versione inglese
│   └── robots.txt.ts  # robots.txt generato dinamicamente
├── content/        # Content Collections
│   ├── blog/       # Articoli blog (IT/EN, markdown)
│   └── publications/ # Pubblicazioni scientifiche (JSON)
├── i18n/           # Traduzioni (it.json, en.json, utils.ts)
└── styles/         # CSS globale (Tailwind + IBM Blue palette)
```

## Contenuti

- **Bio**: Profilo professionale in `/it/bio` e `/en/bio`
- **Blog**: Articoli in markdown con frontmatter (`pubDate`, `updatedDate`, `tags`, `image`, `ogImage`)
- **Pubblicazioni**: Lista da JSON con link DOI, abstract e autori

## i18n

Il sito è bilingue (IT/EN) con routing basato su cartelle:
- `/it/*` - Italiano (default)
- `/en/*` - English
- Hreflang gestiti via `getLocalizedUrl()` in `src/i18n/utils.ts`
- **Non usare** `.replace('/en/', '/it/')` per hreflang — usare sempre `getLocalizedUrl()`

## SEO e Dati Strutturati

### JSON-LD (Schema.org)

Il `BaseLayout.astro` emette automaticamente un grafo JSON-LD con:
- **Person** (`@id: /#person`): identità, sameAs, worksFor, alumniOf, knowsAbout
- **WebSite** (`@id: /#website`): nome, url, publisher

Le singole pagine aggiungono schema specifici via prop `jsonLd`:
- **Blog posts**: `Article` con author, datePublished, dateModified
- **Bio**: `ProfilePage` + `ItemList` di `Event` (speaking engagements)
- **Pubblicazioni**: `ItemList` di `ScholarlyArticle`
- **Breadcrumb**: `BreadcrumbList` (componente `Breadcrumb.astro`)

### Meta Tags

Il `BaseLayout.astro` supporta queste props per il SEO:

| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `title` | string | required | Titolo pagina |
| `description` | string | required | Descrizione pagina |
| `image` | string? | — | Immagine per og/twitter |
| `ogImage` | string? | — | Immagine OG separata |
| `lang` | 'it'\|'en' | 'it' | Lingua |
| `ogType` | string | 'website' | Tipo OG (`article` per blog) |
| `articleMeta` | object? | — | Meta article:* per blog posts |
| `citationMeta` | array? | — | Highwire Press tags per pubblicazioni |
| `jsonLd` | object\|array? | — | Schema JSON-LD aggiuntivi |

Meta tags emessi su tutte le pagine:
- `robots`: index, follow, max-snippet:-1, max-image-preview:large
- `twitter:site` e `twitter:creator`: @stefacap
- Dublin Core: DC.title, DC.creator, DC.description, DC.language
- `rel="author"` link alla bio
- DNS prefetch per doi.org, linkedin.com, orcid.org

### Breadcrumb

Il componente `Breadcrumb.astro` accetta `items` (array di `{label, href?}`) e genera sia il breadcrumb visivo sia il JSON-LD `BreadcrumbList`. Va inserito in tutte le pagine eccetto la homepage.

### Social Links

Il componente `SocialLinks.astro` include: LinkedIn, X/Twitter, Mastodon, ORCID, Facebook. Tutti con `rel="me"`. Supporta varianti: `default`, `footer`, `hero`.

### Sitemap

Generata da `@astrojs/sitemap` con priorità differenziate:
- Homepage: 1.0 | Bio: 0.9 | Blog posts e pubblicazioni: 0.8 | Blog index: 0.7

### robots.txt

Generato dinamicamente da `src/pages/robots.txt.ts` (NON usare `public/robots.txt`).

### Citation Meta Tags

Le pagine pubblicazioni emettono Highwire Press meta tags (`citation_title`, `citation_author`, `citation_doi`, `citation_journal_title`, `citation_publication_date`) per l'indicizzazione su Google Scholar.

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
- Custom: Ogni post può specificare `ogImage` (separato da `image`) nel frontmatter

## Blog Posts

### Frontmatter supportato

```yaml
title: "Titolo articolo"
description: "Descrizione per meta e preview"
pubDate: 2026-01-09
updatedDate: 2026-02-12        # opzionale, aggiorna dateModified
image: "/images/blog/nome.webp"
imageAlt: "Alt text"
ogImage: "/images/blog/nome-og.webp"  # opzionale, OG separato
lang: it                       # o en
tags: ["tag1", "tag2"]
draft: false
```

### Struttura pagina blog post

Ogni blog post include automaticamente:
- Breadcrumb (Home > Blog > Titolo)
- Byline autore con link `rel="author"` alla bio
- Data pubblicazione e aggiornamento
- Tags
- Immagine featured
- Contenuto markdown
- Author bio box con foto e link
- Articoli correlati (per tag)
- Link alle pubblicazioni scientifiche
- Navigazione "Torna al blog"

## Note

- Gli articoli del blog vanno in `src/content/blog/{lang}/`
- La palette IBM Blue è definita in `src/styles/global.css`
- I font Geist sono caricati via `@fontsource` in `global.css`
- Il sito usa `compressHTML: true` in `astro.config.mjs`
- View Transitions abilitate via `ClientRouter` di Astro
