import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com', // TODO: replace with your final domain (needed for sitemap + RSS absolute URLs)
  integrations: [
    mdx(),
    sitemap(),
  ],
});
