# L'arbraphore — starter (Astro + MDX + Decap CMS + Pagefind)

Ce dépôt initialise un site statique **sans base de données** :
- Articles en **MDX** lus en **séquences** (chaque `##` = une section)
- Journal (brèves) **non séquencé** avec types : `youtube`, `vimeo`, `image`, `citation`, `documents`
- Pages **Accueil** et **/about** en séquences
- Tags + catégories (multiples) + pages de listing + RSS
- Recherche **statique** (Pagefind) générée au build
- Sitemap via Astro

## Spécifications et contrôle qualité

Les 3 fichiers suivants résument les exigences et points à vérifier lors d'évolutions du site :

- [SPECS.md](SPECS.md) : liste d'instructions à respecter pour générer le site
- [CHECKLIST_UI.md](CHECKLIST_UI.md) : checklist pour un audit détaillé de l'interface utilisateur
- [QA_RAPIDE.md](QA_RAPIDE.md) : Checklist express de l'interface utilisateur et quelques fonctionnalités avant livraison ou démo.

## Démarrage local

1. Crée un fichier `.env.development` avec l'URL utilisée en local, par exemple :

```bash
SITE=http://arbraphore.local:4321
```

(`SITE` est utilisée pour générer des URLs absolues dans le sitemap/RSS en dev.)

2. Install

```bash
npm install
npm run dev
```

3. Build + index recherche :

```bash
npm run build
npm run preview
```

> `postbuild` lance `pagefind --site dist` pour générer `/pagefind/*` dans le build.

## Déploiement Cloudflare Pages (2 options)

> Ajoute la variable d’environnement `SITE` dans Cloudflare Pages (Settings → Environment variables) : production = ton domaine final, preview = l’URL `https://<project>.pages.dev` pour des sitemaps/RSS corrects.

### Option A — Recommandée : intégration Git (sans GitHub Actions)

1. Va dans Cloudflare Pages → **Create a project** et connecte ton repo GitHub.
2. Paramètres build :
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Dans **Settings → Environment variables**, ajoute `SITE` (production et preview).

(astro docs + cloudflare pages build settings) (voir docs Astro + Cloudflare Pages)

### Option B — GitHub Actions (inclus dans ce repo)

Le workflow `.github/workflows/cloudflare-pages.yml` déploie à chaque commit sur `main`.

1. Crée un projet Cloudflare Pages (vide, ou en "Direct Upload").
2. Ajoute des secrets GitHub dans **Settings → Secrets and variables → Actions** :
   - `CLOUDFLARE_API_TOKEN` (token avec permissions Pages)
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_PAGES_PROJECT_NAME` (le nom exact du projet Pages)
3. Dans Cloudflare Pages, ajoute aussi la variable `SITE` (production et preview).

Puis push sur `main`.

## Decap CMS (/admin)
1. Édite `public/admin/config.yml` :
   - `repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME`
   - `site_url` et `display_url` avec l'URL Cloudflare Pages (`https://<project>.pages.dev`), puis ton domaine ensuite
2. Dans GitHub, configure une GitHub OAuth App si besoin (selon ton modèle d’auth),
   puis autorise l'accès.

Doc config Decap CMS (voir docs Decap CMS)

## Conventions “séquences”
- Chaque **`## Titre`** démarre une séquence.
- Navigation : flèches bas d’écran + menu hamburger listant les sections.
- Hash URL : `#titre-de-section` (slugifié).

Règles d’affichage :
- Section “média only” (image/iframe/audio/video sans texte) : centrée verticalement, **pas de scroll**, affiche un titre en haut.
- Si la section contient **uniquement une image**, le titre affiché = **alt** de l’image (sinon le titre `##`).
- Section texte : scroll autorisé, texte justifié.

## Contenu de démonstration
- 3 articles sur l’IA (dont un sur la façon dont tu as demandé ce travail)
- 5 brèves journal (un par type)
