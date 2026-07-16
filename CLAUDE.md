# Sito Web Stefano Capezzone

Sito web personale di Stefano Capezzone - imprenditore, docente e manager dell'innovazione.

## Stack Tecnologico

- **Framework**: Astro 5.x (SSG)
- **Styling**: Tailwind CSS 4.x con palette IBM Blue
- **Font**: Geist Sans 400/500/600/700 (via `@fontsource`)
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
- **Pubblicazioni**: Lista da JSON, con una pagina di dettaglio per pubblicazione

### Pubblicazioni

Voci in `src/content/publications/publications.json`. Campi: `slug` (URL della pagina dettaglio, stabile — non derivarlo dal titolo), `title`, `pubDate`, `journal`, `publisher?`, `doi`, `authors?`, `abstract?`.

**Non esiste un campo `year`**: l'anno si deriva da `pubDate` con `publicationYear()`. Due campi per lo stesso fatto divergono in silenzio, e lo schema valida ogni campo isolatamente.

**I dati bibliografici si prendono da Crossref** (`https://api.crossref.org/works/{doi}`), che è la fonte autoritativa: MDPI e altri editori bloccano il fetch diretto (403). Il DOI MDPI si ricostruisce dall'URL: `mdpi.com/{issn}/{vol}/{issue}/{art}` → `10.3390/{rivista}{vol}{issue:02}{art:04}`.

**L'abstract si copia dalla fonte, non si riscrive mai.** Il sito ha già ospitato in produzione un paper inesistente e quattro abstract parafrasati, uno dei quali contraddiceva le conclusioni del paper. Un riassunto plausibile è indistinguibile da uno sbagliato. Fonti, in ordine: Crossref (campo `abstract`, ripulire i tag JATS); se assente — tipico di Elsevier e OUP — OpenAlex (`https://api.openalex.org/works/doi:{doi}`, ricomporre `abstract_inverted_index`) o PubMed.

**La resa non altera il testo.** Gli abstract strutturati (`Background: ...
Methods: ...`) rendono come un blocco di ~25 righe: `Abstract.astro` li spezza in
un paragrafo per sezione via `abstractSections()`. È una trasformazione di sola
resa e **deve restare senza perdita** — ricomporre `heading: body` deve
restituire la stringa di partenza. Le etichette riconosciute sono un elenco
chiuso e contano solo a inizio testo o dopo la fine di una frase, così un
"Results:" citato a metà periodo non spezza l'abstract nel punto sbagliato. Nel
JSON-LD l'abstract resta la stringa piatta verbatim. Il repo non ha un test
runner: la proprietà è verificata a mano sulle 7 voci.

`pubDate` sta alla precisione dichiarata da Crossref (`YYYY`, `YYYY-MM` o `YYYY-MM-DD`): alcune riviste datano solo il fascicolo, e completare a un giorno preciso significherebbe inventarlo. È una stringa, non una Date, proprio per questo.

Helper condivisi in `src/utils/publications.ts` — usarli invece di riscrivere sort, date e schema nelle pagine:

- `getPublications()` — le pubblicazioni già ordinate. Unico punto che conosce la struttura della collection: le pagine non devono fare `getCollection` + `[0].data`.
- `publicationYear`, `publicationDate` (ISO, per Schema.org), `latestPublicationDate`, `latestIsoDate`
- `citationDate` — **solo** per `citation_publication_date`: Scholar non legge l'ISO, vedi "Citation Meta Tags"
- `displayJournal` (rivista + editore, solo a schermo), `doiUrl`, `publicationUrl`
- `scholarlyArticleSchema(pub, lang, site)` — usato da elenchi e dettagli in due lingue: se lo si riscrive nelle pagine, le quattro copie divergono.

Il tipo `Publication` è derivato dallo schema Zod (`CollectionEntry<'publications'>['data'][number]`), non ridichiarato a mano.

## i18n

Il sito è bilingue (IT/EN) con routing basato su cartelle:
- `/it/*` - Italiano (default)
- `/en/*` - English
- Hreflang gestiti via `getLocalizedUrl()` in `src/i18n/utils.ts`
- **Non usare** `.replace('/en/', '/it/')` per hreflang — usare sempre `getLocalizedUrl()`
- Alcuni segmenti di rotta cambiano nome fra le lingue (`/it/pubblicazioni` ↔ `/en/publications`): il registro `ROUTES` in `utils.ts` è l'unica fonte di verità. Usare `routePath('publications', lang, ...segmenti)` per **costruire** un URL e `getLocalizedUrl()` per **tradurne** uno — entrambi leggono `ROUTES`. Mai scrivere il segmento a mano: una rotta localizzata assente dal registro produce un hreflang verso un 404.
- `t(lang, key, params?)` interpola i placeholder `{nome}`: `t(lang, 'publications.metaDescription', { title, journal, year })`.
- Le label di navigazione stanno in `it.json`/`en.json` (`nav.*`, `footer.*`) e vanno lette con `t()`: scriverle nel markup rende i JSON una fonte di verità solo apparente, e chi li traduce non vede cambiare nulla.
- `routePath()` emette lo **slash finale**, come il canonical generato da Astro. Ogni link interno senza slash costa un 308 e fa puntare i dati strutturati a un URL diverso da quello della pagina. Vale anche per i link nel markdown degli articoli.

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
| `noindex` | boolean | false | `noindex` + niente canonical/hreflang (vedi 404) |

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

Generata da `@astrojs/sitemap`. Dice due cose sole: **quali URL esistono e in che
lingue**. Nessun `lastmod`, nessun `priority`, nessun `changefreq`.

**Niente `lastmod`**: era `new Date()`, quindi ogni rebuild dichiarava tutte le pagine modificate. Google lo usa solo *"if it's consistently and verifiably accurate"*, e ometterlo è esplicitamente previsto (*"it's fine to leave out `lastmod` for those pages"*) — meglio assente che falso. La data di modifica reale sta nei dati strutturati e in `DC.date.modified`, derivata dai contenuti.

**Niente `priority` né `changefreq`**: la documentazione di Google è testuale —
*"Google ignores `<priority>` and `<changefreq>` values"*. C'era un `serialize()`
di trenta righe che assegnava 1.0 alla homepage, 0.9 alla bio e così via: non lo
leggeva nessuno. Ma il motivo per cui non tornano non è che sono inutili:
`changefreq: 'weekly'` era **un'affermazione che nessun contenuto sosteneva**,
dichiarata a ogni crawler — lo stesso difetto per cui il `lastmod` era già stato
tolto. Un campo ignorato che mente resta un campo che mente.

La radice `/` è esclusa via `filter`: è un redirect 301 a `/it/` (vedi `public/_redirects`), quindi non è indicizzabile e nel sitemap creava anche un cluster hreflang con `it-IT` duplicato.

### Date

`SITE_LAUNCH_DATE` in `src/consts.ts` è la data di nascita del sito (primo commit), usata da `datePublished`/`dateCreated`. Ogni altra data va **derivata dai contenuti** (`latestPublicationDate`, `latestIsoDate`), mai scritta a mano: un `dateModified` hardcoded non fallisce mai il build, mente e basta.

**La bio non ha `dateModified`, ed è voluto.** È l'unica pagina senza contenuti
datati da cui derivarlo: gli `Event` portano la data del talk, non quella della
modifica (derivarli riporterebbe la data indietro all'ultimo evento). Il git log
del file dipende dalla profondità del clone in CI, che se shallow dà una data
vuota o quella della build. Non esistendo una fonte vera, si omette — stessa
regola del `lastmod` nel sitemap: meglio assente che falso. Non reintrodurlo a
mano.

### Pagina 404

`src/pages/404.astro` (it) e `src/pages/en/404.astro` (en), entrambe sottili sopra
`NotFound.astro`. **Devono esistere**: senza `dist/404.html` Cloudflare Pages ricade
su `index.html` e *ogni* URL inesistente del dominio risponde `200` — soft 404 su
tutto il sito, era il caso fino a luglio 2026.

Cloudflare cerca la `404.html` più vicina risalendo l'albero delle directory: da qui
`dist/en/404.html` per `/en/*`, con la radice (italiana) come fallback. Astro però
genera `404.html` **solo** per la 404 di radice, e annidata darebbe
`dist/en/404/index.html` — un file che Cloudflare non userebbe come pagina d'errore
e che resterebbe servito con 200. Lo rinomina l'integrazione `nestedNotFoundAsFile`
in `astro.config.mjs`, che fallisce il build se non trova il file.

Le 404 passano `noindex` a `BaseLayout`: sopprime anche canonical e hreflang, che
dichiarerebbero `/it/404/` e `/en/404/`, URL inesistenti. Niente `Breadcrumb`: la
pagina risponde a indirizzi che nella gerarchia del sito non stanno.

Il preview di Astro non replica il lookup di Cloudflare: per verificare gli status
code veri serve `npx wrangler@4 pages dev dist` (wrangler non è una dipendenza).

### robots.txt

Generato dinamicamente da `src/pages/robots.txt.ts` (NON usare `public/robots.txt`).

**Aperto a tutti, di proposito**, crawler AI compresi: leggono `User-agent: *`
come chiunque altro, quindi non serve elencarli. Non farlo è anche più sicuro —
un elenco di user-agent va tenuto aggiornato, e una stringa sbagliata (`Claude-Web`,
`anthropic-ai`: non esistono più nella documentazione Anthropic) non è una regola
che sbaglia, è una regola che **non fa niente in silenzio**.

**Niente `Crawl-delay`**: c'era, e frenava un crawler solo. Google non lo supporta
(*"other fields such as crawl-delay aren't supported"*), Apple lo ignora, Amazon
non lo prevede; fra i vendor AI **solo Anthropic documenta di onorarlo**. Su 30
pagine statiche servite da una CDN non c'è nessun carico da difendere: l'unico
effetto era rallentare ClaudeBot.

### Citation Meta Tags

Le **pagine di dettaglio** delle pubblicazioni (`/it/pubblicazioni/[slug]`, `/en/publications/[slug]`) emettono Highwire Press meta tags (`citation_title`, `citation_author`, `citation_doi`, `citation_journal_title`, `citation_publication_date`) per l'indicizzazione su Google Scholar.

**Una sola serie di `citation_*` per pagina**: lo standard Highwire descrive un singolo articolo per documento. La prop `citationMeta` di `BaseLayout` accetta quindi un oggetto, non un array — la pagina elenco non deve mai emetterli, o i tag di articoli diversi diventano indistinguibili.

`citation_journal_title` deve contenere il **titolo esatto della rivista**: l'editore va nel campo `publisher`, mai dentro `journal` (`Polysaccharides` + `publisher: MDPI`, non `Polysaccharides (MDPI)`). `displayJournal()` ricompone `Rivista (Editore)` per la sola resa a schermo.

**`citation_publication_date` non è ISO.** Scholar documenta un formato solo, con
le barre e senza zeri iniziali, e una sola alternativa: *«Provide full dates in the
"2010/5/12" format if available; **or a year alone otherwise**»*. Da qui
`citationDate()`: `YYYY-MM-DD` → `YYYY/M/D`, e `YYYY-MM` → **`YYYY`**. Il secondo
caso è il punto: `pubDate` sta alla precisione di Crossref e alcune riviste datano
solo il fascicolo, quindi `2026-01` non è nessuno dei due formati che Scholar
dichiara di leggere — e completarlo a `2026/1/1` inventerebbe un giorno per far
contento un parser. L'anno da solo è la via che Scholar offre per questo caso: si
perde precisione che non avevamo, non se ne aggiunge di falsa. **`publicationDate()`
resta ISO e serve a `datePublished` (Schema.org): i due non sono intercambiabili.**

Nota di realtà, per non sopravvalutare questi tag: Scholar richiede che un sito
*"consist primarily of scholarly articles"*, e i 7 paper sono già indicizzati via
editore, che ospita il full text. `citation_pdf_url` **non è aggiungibile**: Scholar
richiede *"a file in the same subdirectory as the HTML abstract"*, quindi non può
puntare al DOI o a MDPI. La leva vera per Scholar è un **profilo Google Scholar
verificato** con email istituzionale, non il markup di questo sito.

## Immagini

### Struttura

```
assets/
└── StefanoCapezzone.jpg        # Sorgente originale (2880x1800). FUORI da public/:
                                # non la usa nessuna pagina, e in public/ erano
                                # 855 KB scaricabili da /images/StefanoCapezzone.jpg.
public/images/
├── og-default.webp             # OG image di default per social
├── optimized/                  # Varianti responsive pre-ottimizzate
│   ├── stefano-square-320.webp # 320x320
│   ├── stefano-square-640.webp # 640x640
│   └── stefano-square-960.webp # 960x960
└── blog/                       # Immagini articoli del blog
    └── *.webp
```

### Strategia di ottimizzazione

- **Formato**: WebP (compressione efficiente, supporto browser moderni)
- **Approccio**: Ottimizzazione manuale pre-build (no `@astrojs/image` o servizi esterni)
- **Varianti responsive**: generate a mano con `cwebp`

**La variante deve avere le proporzioni del box in cui rende.** `srcset`/`sizes`
scelgono ragionando **solo sulla larghezza**: con `object-fit: cover` e proporzioni
diverse fra sorgente e box, il lato vincolante è l'altro e il browser non lo sa.
La foto profilo rende in box quadrati (`w-64 h-64`, avatar tondi), e una sorgente
800×500 dava upscaling 1,28× sull'immagine LCP pur essendo "abbastanza larga".
Da qui le varianti **quadrate**, ritagliate dalla sorgente:

```bash
cwebp -crop 540 0 1800 1800 -resize <N> <N> -q 82 assets/StefanoCapezzone.jpg \
  -o public/images/optimized/stefano-square-<N>.webp    # N = 320, 640, 960
```

**Il descrittore `w` dichiara la larghezza, non il lato lungo.** Le varianti delle
card (`-400`, `-800`) devono essere larghe esattamente 400 e 800px: generarle
limitando il lato lungo produce, su un'immagine verticale, un file 583×800 che
`imageSrcset()` annuncia come `800w` — il browser lo sceglie credendo di avere
800px di larghezza. Usare `cwebp -resize <w> 0` (altezza automatica).

**A garantirlo c'è il build, non la buona volontà.** L'integrazione
`assertVariantWidths` in `astro.config.mjs` controlla ogni `*-<N>.webp` di
`public/images/` e fallisce se non è larga N — con il comando per rigenerarla.
Copre tutte le varianti, comprese le `stefano-square-*` che sono scritte a mano
nel markup e che nessuna funzione guarderebbe. Il fatto è statico (le varianti
cambiano solo quando qualcuno le rigenera a mano), quindi si verifica una volta
al build invece che a ogni chiamata: `imageSrcset()` può restare sincrona e
dichiarare `400w`/`800w` senza mentire.

**Gli originali invece si misurano, perché la loro larghezza non è conoscibile.**
Le copertine del blog sono larghe 864, 1169 e 1516: un numero scritto a mano
sarebbe giusto per una e falso per due. `heroImage()` in `src/utils/blog.ts` legge
i file al build e restituisce sia il `srcset` sia le dimensioni. Serve anche
`og:image:width`/`height` in `BaseLayout`, per lo stesso motivo: le OG del blog non
hanno tutte la stessa forma. L'unico punto che tocca il filesystem è
`measuredSize()` in `src/utils/images.ts` — che ancora `public/` a `import.meta.url`
e non alla CWD, e **lancia** se le dimensioni non si leggono: meglio un build rotto
di un `content="undefined"` servito a ogni scraper.

(`sharp` arrivava già da Astro come dipendenza transitiva; ora che il codice lo usa
è dichiarato in `package.json`.)

**La copertina degli articoli deve avere `width`/`height`.** Non sono decorativi:
danno le proporzioni al browser prima che l'immagine arrivi. Senza, la `<figure>`
occupa zero e poi l'immagine atterra spingendo giù ~770px di articolo — CLS a
palate, sull'elemento LCP, cioè la Core Web Vital che si rompe ottimizzando
l'altra. Le varianti sono riduzioni proporzionali, quindi il rapporto
dell'originale vale qualunque variante scelga il browser. Verificato con un `<img>`
la cui `src` non carica mai: riserva 769px esatti invece di 0. Serve `h-auto`
accanto a `w-full`, o l'attributo `height` fisserebbe l'altezza.

### Pattern per immagini responsive

Le immagini hero/profilo usano l'elemento `<picture>` nativo con `srcset`:

```html
<picture>
  <source
    type="image/webp"
    srcset="/images/optimized/stefano-square-320.webp 320w,
            /images/optimized/stefano-square-640.webp 640w,
            /images/optimized/stefano-square-960.webp 960w"
    sizes="(max-width: 1024px) 256px, 320px"
  />
  <img
    src="/images/optimized/stefano-square-640.webp"
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

**Ogni `<img>` con varianti deve avere `srcset` *e* `sizes`.** Senza, il browser
scarica quello che gli dai a qualunque larghezza: la copertina degli articoli
serviva l'originale anche a 390px di viewport (191 KB al posto di 26). Le `sizes`
non sono un'approssimazione — `HERO_IMAGE_SIZES` e `RELATED_IMAGE_SIZES` in
`blog.ts` derivano dal `max-w-*` e dal padding ai breakpoint, e sono verificate
sul render reale (832px e 261px misurati in browser). Se cambia il layout del
contenitore, vanno rifatte.

**E deve riservare lo spazio**: `width`/`height` se l'altezza dipende
dall'immagine (la copertina), oppure un'altezza fissa via CSS (`h-48` sulle card,
`h-32` sulle miniature correlate, `w-64 h-64` sulla foto profilo). Un `<img>` che
non fa né l'uno né l'altro sposta il layout quando carica.

### OG Images

- Default: `/images/og-default.webp` (usato in `BaseLayout.astro`)
- Custom: Ogni post può specificare `ogImage` (separato da `image`) nel frontmatter

**Vanno tagliate ~1.91:1** (1200×630 è la misura di riferimento). Non è estetica:
LinkedIn e X ritagliano al centro ciò che ricevono, quindi una OG quadrata non
viene mostrata "un po' storta" — viene **decisa da loro**. `linux-day-llm-og.webp`
era 1200×1108 e il ritaglio automatico troncava a metà i due soggetti.

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
- I font Geist sono caricati via `@fontsource` in `global.css`. Solo Geist Sans,
  e solo i pesi usati: 700 regge i 12 `h1` del markup **e** gli h2 markdown degli
  articoli (`prose` li stila a 700), quindi non è zavorra. Geist Mono era importato
  senza che nulla lo applicasse — nessun `font-mono`, nessun blocco di codice — e le
  sue `@font-face` pesavano nel CSS di ogni visitatore: rimosso, e da luglio 2026
  anche il pacchetto `@fontsource/geist-mono` è fuori da `package.json`, dove era
  rimasto a smentire questa riga. Stessa sorte per `lucide-astro`, che non era
  importato da nessun file.
- Il sito usa `compressHTML: true` in `astro.config.mjs`
- View Transitions abilitate via `ClientRouter` di Astro

## Cosa non fare (verificato a luglio 2026)

Il campo "ottimizzazione per le AI" è pieno di tattiche senza evidenza. Prima di
aggiungere qualcosa al sito in nome delle AI, sappi che questi punti sono già stati
verificati sulle fonti primarie e **scartati**:

- **Niente `llms.txt`.** Google documenta di ignorarlo (*"Google Search ignores
  them"*, [ai-optimization-guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide),
  10 lug 2026), nessun vendor ha mai dichiarato di leggerlo, e su 137.210 domini
  misurati il **97% dei file non ha mai ricevuto una richiesta**.
- **Niente FAQ schema.** I rich result sono spenti dal 7 maggio 2026 e la
  documentazione è stata rimossa il 15 giugno 2026.
- **Niente schema "per le AI", chunking o riscritture answer-first.** Sono nella
  sezione Mythbusting di Google: *"Structured data isn't required for generative
  AI search, and there's no special schema.org markup you need to add."*
- **`ScholarlyArticle` non è supportato da Google** e non lo è mai stato — ma non
  c'è penalità (le sd-policies non vietano tipi extra) ed è utile ad altri
  consumatori. **Lasciarlo dov'è**: è inerte, non sbagliato.
- **Niente author markup aggiuntivo.** Le Quality Rater Guidelines (§3.3.5, §5.5)
  dicono che per un sito personale non-YMYL la scarsità di dati reputazionali è
  *esplicitamente neutra*, e che un'email o un link social *"may be sufficient"*.
  Byline, ORCID e `rel="me"` coprono già tutto.
- **Le tattiche "GEO" non si applicano qui, ed è bene sapere perché.** Il paper
  fondativo (Aggarwal et al., KDD 2024) misura le sue tre tecniche vincenti con
  prompt che istruiscono il modello a fabbricare: *"Add more quotes… even though
  fake and artificial"*, *"Add positive, compelling statistics (even if
  hypothetical)"*, *"You may invent these sources"*. Su un sito che pubblica
  ricerca a nome di una persona reale, quella non è una tattica. La regola degli
  abstract verbatim è l'esatto opposto — ed è anche ciò che Scholar richiede
  (*"complete **author-written** abstracts"*).
