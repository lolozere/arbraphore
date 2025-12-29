import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('articles'))
    .filter(e => !e.data.draft)
    .sort((a,b)=>b.data.date.valueOf()-a.data.date.valueOf());

  return rss({
    title: 'Articles — Créer mon journal en ligne',
    description: 'Flux RSS des articles',
    site: context.site ?? new URL('https://example.com'),
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/articles/${p.slug}/`,
    })),
  });
}
