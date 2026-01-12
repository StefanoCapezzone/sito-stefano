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
    lang: z.enum(['it', 'en']),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      title: z.string(),
      year: z.number(),
      journal: z.string(),
      doi: z.string(),
      abstract: z.string().optional(),
      authors: z.array(z.string()).optional(),
    })
  ),
});

export const collections = {
  blog,
  publications,
};
