import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { slugify } from '../../../lib/slug';

export async function getStaticPaths() {
  const all = (await getCollection('articles')).filter(e => !e.data.draft);
  const set = new Set(all.flatMap(a => (a.data.categories || []).map(slugify)));
  return Array.from(set).map(category => ({ params: { category } }));
}

export async function GET(context) {
  const category = context.params.category!;
  const all = (await getCollection('articles'))
    .filter(e => !e.data.draft && (e.data.categories || []).map(slugify).includes(category))
    .sort((a,b)=>b.data.date.valueOf()-a.data.date.valueOf());

  const label = (all[0]?.data.categories || []).find(c => slugify(c)===category) || category;

  return rss({
    title: `Catégorie: ${label} — Articles`,
    description: `Flux RSS des articles dans ${label}`,
    site: context.site ?? new URL('https://example.com'),
    items: all.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/articles/${p.slug}/`,
    })),
  });
}
