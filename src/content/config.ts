import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    ogImage: z.string().optional(),
    lang: z.enum(['it', 'en']),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  type: 'data',
  schema: z
    .array(
      z.object({
        slug: z.string(),
        title: z.string(),
        // Data da Crossref, alla precisione che Crossref dichiara: alcune
        // riviste datano solo il fascicolo (YYYY-MM) o solo l'anno (YYYY).
        // Resta stringa per non inventare un giorno che la fonte non ha.
        // L'anno si deriva da qui (publicationYear), non è un campo a parte:
        // due campi per lo stesso fatto divergono senza che nulla se ne accorga.
        pubDate: z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/),
        journal: z.string(),
        // L'editore sta fuori da `journal`: citation_journal_title deve
        // contenere il titolo esatto della rivista, o Scholar non la riconosce.
        publisher: z.string().optional(),
        doi: z.string(),
        abstract: z.string().optional(),
        authors: z.array(z.string()).optional(),
      })
    )
    .superRefine((pubs, ctx) => {
      // Due slug uguali generano rotte in conflitto in getStaticPaths.
      const slugs = pubs.map((p) => p.slug);
      const duplicati = slugs.filter((s, i) => slugs.indexOf(s) !== i);
      if (duplicati.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `slug duplicati: ${[...new Set(duplicati)].join(', ')}`,
        });
      }
    }),
});

export const collections = {
  blog,
  publications,
};
