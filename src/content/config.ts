import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const journal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['youtube', 'vimeo', 'image', 'citation', 'documents']),
    // Optional media fields depending on type:
    youtubeId: z.string().optional(),
    vimeoId: z.string().optional(),
    image: z.string().optional(), // path under /public or a URL
    imageAlt: z.string().optional(),
    documents: z.array(z.object({
      label: z.string(),
      file: z.string(), // path under /public or a URL
    })).optional(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const medias = defineCollection({
  type: 'data',
  schema: z.object({}).optional(),
});

export const collections = { articles, journal, pages, medias };
