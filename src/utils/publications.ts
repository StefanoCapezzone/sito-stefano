import { getCollection, type CollectionEntry } from 'astro:content';
import { routePath, type Lang } from '../i18n/utils';

/** Derivato dallo schema Zod: non ridichiarare la forma a mano, o le due divergono. */
export type Publication = CollectionEntry<'publications'>['data'][number];

/** Le pubblicazioni, già ordinate dalla più recente. */
export async function getPublications(): Promise<Publication[]> {
  const data = await getCollection('publications');
  return sortPublications(data[0]?.data ?? []);
}

/**
 * Chiave d'ordinamento. Le date parziali (YYYY o YYYY-MM) vengono completate al
 * primo giorno utile: serve solo a confrontarle, non viene mai emessa.
 */
function sortKey(pub: Publication): string {
  const [year, month = '01', day = '01'] = pub.pubDate.split('-');
  return `${year}-${month}-${day}`;
}

/** Pubblicazioni dalla più recente alla più vecchia. */
export function sortPublications(pubs: Publication[]): Publication[] {
  return [...pubs].sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
}

/**
 * Data di pubblicazione alla precisione dichiarata dalla fonte, in ISO.
 * Usata per `datePublished` (Schema.org), che accetta YYYY, YYYY-MM e
 * YYYY-MM-DD. **Non** per Scholar, che vuole un altro formato: vedi
 * `citationDate()`.
 */
export function publicationDate(pub: Publication): string {
  return pub.pubDate;
}

/**
 * Data per `citation_publication_date` (Highwire Press / Google Scholar).
 *
 * Scholar non usa l'ISO. Documenta un formato solo, con le barre e senza zeri
 * iniziali, e una sola alternativa: «Provide full dates in the "2010/5/12"
 * format if available; **or a year alone otherwise**».
 *
 * Da qui le due sole uscite possibili:
 * - `YYYY-MM-DD` → `YYYY/M/D`, la data piena.
 * - `YYYY-MM` e `YYYY` → `YYYY`, l'anno da solo.
 *
 * Il caso interessante è il secondo. `pubDate` sta alla precisione di Crossref
 * (vedi CLAUDE.md) e alcune riviste datano solo il fascicolo: `2026-01` non è
 * né una data piena né un anno, cioè non è nessuno dei due formati che Scholar
 * dichiara di leggere. Completarlo a `2026/1/1` significherebbe inventare un
 * giorno per far contento un parser. L'anno da solo è la via che Scholar offre
 * esattamente per questo caso: si perde precisione che non avevamo, non se ne
 * aggiunge di falsa.
 */
export function citationDate(pub: Publication): string {
  const [year, month, day] = pub.pubDate.split('-');
  if (!month || !day) return year;
  return `${year}/${Number(month)}/${Number(day)}`;
}

/** Anno di pubblicazione, per la resa a schermo. */
export function publicationYear(pub: Publication): number {
  return Number(pub.pubDate.slice(0, 4));
}

/** La più recente fra date ISO, ignorando quelle assenti. */
export function latestIsoDate(
  dates: Array<string | undefined>
): string | undefined {
  return dates.filter((d): d is string => Boolean(d)).sort().at(-1);
}

/**
 * Data ISO completa della pubblicazione più recente.
 * Alimenta dateModified delle pagine generate dalla collection, così non va
 * più aggiornato a mano a ogni nuova pubblicazione.
 */
export function latestPublicationDate(pubs: Publication[]): string | undefined {
  const [latest] = sortPublications(pubs);
  return latest && sortKey(latest);
}

/** Rivista con editore, per la sola resa a schermo. */
export function displayJournal(pub: Publication): string {
  return pub.publisher ? `${pub.journal} (${pub.publisher})` : pub.journal;
}

export function doiUrl(pub: Publication): string {
  return `https://doi.org/${pub.doi}`;
}

/** URL della pagina di dettaglio. */
export function publicationUrl(pub: Publication, lang: Lang): string {
  return routePath('publications', lang, pub.slug);
}

/** Una sezione di abstract strutturato. `heading` assente = testo non strutturato. */
export interface AbstractSection {
  heading?: string;
  body: string;
}

/**
 * Etichette di sezione degli abstract strutturati, come le usano gli editori.
 * Solo queste: un elenco chiuso non può inventare una sezione dove non c'è.
 */
const ABSTRACT_HEADINGS = [
  'Background and Objective',
  'Background and Objectives',
  'Background',
  'Objective',
  'Objectives',
  'Purpose',
  'Aim',
  'Aims',
  'Materials and Methods',
  'Methods',
  'Results',
  'Discussion',
  'Conclusion',
  'Conclusions',
  'Significance',
];

/**
 * Spezza un abstract strutturato (`Background: ... Methods: ...`) nelle sue
 * sezioni, per poterle rendere come paragrafi invece che come un muro di righe.
 *
 * È una trasformazione di **sola resa**, e deve restare senza perdita:
 * ricomporre `heading: body` con uno spazio deve restituire la stringa di
 * partenza. Gli abstract sono copiati verbatim dalla fonte e non si riscrivono
 * mai (vedi CLAUDE.md), quindi la resa non può permettersi di alterarli.
 * Il repo non ha un test runner: la proprietà è verificata a mano sulle 7 voci.
 * Se un giorno arriva vitest, questo è il primo caso da coprire.
 *
 * Un'etichetta conta solo se apre il testo o segue la fine di una frase: senza
 * questo vincolo un "Results:" citato a metà periodo spezzerebbe l'abstract in
 * un punto sbagliato. Chi non ha etichette torna in un blocco unico.
 */
export function abstractSections(abstract: string): AbstractSection[] {
  const labels = ABSTRACT_HEADINGS.join('|');
  // (^ | fine frase) + etichetta + ":"  — l'etichetta va rispettata nel caso,
  // sia Title Case sia MAIUSCOLO, ma non "results:" in mezzo a una frase.
  const re = new RegExp(`(?:^|(?<=\\.)\\s+)(${labels}|${labels.toUpperCase()}):\\s+`, 'g');

  const marks: Array<{ start: number; end: number; heading: string }> = [];
  for (const m of abstract.matchAll(re)) {
    marks.push({ start: m.index!, end: m.index! + m[0].length, heading: m[1] });
  }
  if (marks.length === 0) return [{ body: abstract }];

  const out: AbstractSection[] = [];
  const preamble = abstract.slice(0, marks[0].start).trim();
  if (preamble) out.push({ body: preamble });
  marks.forEach((mark, i) => {
    const body = abstract.slice(mark.end, marks[i + 1]?.start ?? abstract.length);
    out.push({ heading: mark.heading, body: body.trim() });
  });
  return out;
}

/**
 * Schema ScholarlyArticle. Vive qui e non nelle pagine perché lo usano sia gli
 * elenchi sia i dettagli, in due lingue: quattro copie divergono in fretta.
 */
export function scholarlyArticleSchema(
  pub: Publication,
  lang: Lang,
  site: URL | undefined
) {
  return {
    "@type": "ScholarlyArticle",
    "name": pub.title,
    "headline": pub.title,
    "author": pub.authors?.map((name) => ({ "@type": "Person", "name": name })) || [],
    "datePublished": publicationDate(pub),
    "isPartOf": { "@type": "Periodical", "name": pub.journal },
    ...(pub.publisher
      ? { "publisher": { "@type": "Organization", "name": pub.publisher } }
      : {}),
    "identifier": { "@type": "PropertyValue", "propertyID": "DOI", "value": pub.doi },
    "sameAs": doiUrl(pub),
    "url": new URL(publicationUrl(pub, lang), site).href,
    // Gli abstract sono in inglese anche sulle pagine italiane.
    "inLanguage": "en",
    ...(pub.abstract ? { "abstract": pub.abstract } : {}),
  };
}
