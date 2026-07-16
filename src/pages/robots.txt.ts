import type { APIRoute } from 'astro';

/**
 * Aperto a tutti, di proposito: il sito esiste per essere letto, e questo vale
 * tanto per i motori di ricerca quanto per i crawler dei sistemi AI, che
 * leggono `User-agent: *` come chiunque altro. Elencarli uno per uno non
 * aggiungerebbe permessi — solo un elenco da tenere aggiornato, che sbagliato
 * diventa una regola che non corrisponde a nessun bot e non fa niente.
 *
 * Niente `Crawl-delay`: c'era, e frenava un crawler solo. Google non lo
 * supporta ("other fields such as crawl-delay aren't supported"), Apple lo
 * ignora, Amazon non lo prevede; fra i vendor AI **solo Anthropic documenta di
 * onorarlo**. Su 30 pagine statiche servite da una CDN non c'è carico da
 * difendere: l'unico effetto era rallentare ClaudeBot.
 */
const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`.trim();

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
