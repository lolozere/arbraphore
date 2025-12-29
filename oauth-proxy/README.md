# OAuth proxy pour Decap CMS (GitHub) — pour Cloudflare Pages

Quand tu héberges le site sur Cloudflare Pages et que tu utilises le backend GitHub de Decap,
tu as généralement besoin d’un **OAuth proxy** (petit service serverless) pour finaliser l’auth GitHub
sans Netlify Identity/Git Gateway.

## Option la plus simple
Utiliser le template Cloudflare Worker “decap-proxy” (référence recommandée par la doc Decap) :

1. Crée une GitHub OAuth App (callback = `https://<ton-proxy>/callback`)
2. Déploie le Worker sur un sous-domaine (ex: `https://decap.example.com`)
3. Mets ces secrets dans le Worker :
   - `GITHUB_OAUTH_ID`
   - `GITHUB_OAUTH_SECRET`
4. Dans `public/admin/config.yml`, renseigne :
   - `backend.repo: <user>/<repo>`
   - `backend.base_url: https://decap.example.com`

Notes :
- Si ton repo est privé, l’OAuth scope doit inclure `repo`.
