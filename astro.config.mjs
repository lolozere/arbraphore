import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import { syncMedias } from './scripts/sync-medias.mjs';
import { remarkMediasToAbsolute } from './scripts/remark-medias.mjs';

// Load .env files so `SITE` is available when computing absolute URLs (RSS, sitemap, etc.)
// Pass `''` as third arg to load non-VITE_ variables.
const { SITE } = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

function mediasIntegration(){
  return {
    name: 'medias-sync',
    hooks: {
      'astro:server:start': ({ logger }) => syncMedias(logger),
      'astro:build:start': ({ logger }) => syncMedias(logger),
    },
  };
}

function adminIndexFallback(){
  const rewriteRequest = (server)=>{
    server.middlewares.use((req,res,next)=>{
      if(req.url === '/admin' || req.url === '/admin/'){
        req.url = '/admin/index.html';
      }
      next();
    });
  };

  return {
    name: 'admin-index-fallback',
    configureServer(server){
      rewriteRequest(server);
    },
    configurePreviewServer(server){
      rewriteRequest(server);
    },
  };
}

export default defineConfig({
  site: SITE || 'https://example.com', // TODO: replace with your final domain (needed for sitemap + RSS absolute URLs)
  vite: {
    server: {
      allowedHosts: [".local"],
    },
    plugins: [
      adminIndexFallback(),
    ],
  },
  integrations: [
    mdx(),
    sitemap(),
    mediasIntegration(),
  ],
  
  markdown: {
    remarkPlugins: [remarkMediasToAbsolute],
  },
});
