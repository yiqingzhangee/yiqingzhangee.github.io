import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  lang: z.enum(['zh', 'en']),
  translationKey: z.string(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: articleSchema,
});
const reviews = defineCollection({
  loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
  schema: articleSchema.extend({ sourceUrl: z.string().url().optional() }),
});

export const collections = { posts, reviews };
