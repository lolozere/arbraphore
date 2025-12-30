import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('journal'))
    .filter(e => !e.data.draft)
    .sort((a,b)=>b.data.date.valueOf()-a.data.date.valueOf());

  return rss({
    title: "Journal — L'arbraphore",
    description: 'Flux RSS du journal (brèves)',
    site: context.site ?? new URL('https://example.com'),
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: `${p.data.type} — ${p.data.title}`,
      link: `/journal/${p.slug}/`,
    })),
  });
}
