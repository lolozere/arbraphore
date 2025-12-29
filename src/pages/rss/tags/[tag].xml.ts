import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { slugify } from '../../../lib/slug';

export async function getStaticPaths() {
  const all = (await getCollection('articles')).filter(e => !e.data.draft);
  const tagSet = new Set(all.flatMap(a => (a.data.tags || []).map(slugify)));
  return Array.from(tagSet).map(tag => ({ params: { tag } }));
}

export async function GET(context) {
  const tag = context.params.tag!;
  const all = (await getCollection('articles'))
    .filter(e => !e.data.draft && (e.data.tags || []).map(slugify).includes(tag))
    .sort((a,b)=>b.data.date.valueOf()-a.data.date.valueOf());

  const label = (all[0]?.data.tags || []).find(t => slugify(t)===tag) || tag;

  return rss({
    title: `Tag: ${label} — Articles`,
    description: `Flux RSS des articles taggés ${label}`,
    site: context.site ?? new URL('https://example.com'),
    items: all.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/articles/${p.slug}/`,
    })),
  });
}
