import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { syncMedias } from './scripts/sync-medias.mjs';
import { remarkMediasToAbsolute } from './scripts/remark-medias.mjs';

function mediasIntegration(){
  return {
    name: 'medias-sync',
    hooks: {
      'astro:server:start': ({ logger }) => syncMedias(logger),
      'astro:build:start': ({ logger }) => syncMedias(logger),
    },
  };
}

export default defineConfig({
  site: 'https://example.com', // TODO: replace with your final domain (needed for sitemap + RSS absolute URLs)
  integrations: [
    mdx(),
    sitemap(),
    mediasIntegration(),
  ],
  markdown: {
    remarkPlugins: [remarkMediasToAbsolute],
  },
});
