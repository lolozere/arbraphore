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

Créeer un fichier `.env.development` avec l'URL utilisée en local, par exemple :

```bash
SITE=http://arbraphore.local
```

(`SITE` est utilisée pour générer des URLs absolues dans le sitemap/RSS en dev.)

Configurer aussi Decap CMS pour une fonctionnement local : lire section dédiée [Decap CMS en local](#decap-cms-en-local)

### Avec docker-compose

Copier le fichier `docker-compose.yml.dist` vers `docker-compose.yml` et le configurer en fonction de votre propre environnement local.

### 

1. Install

```bash
npm install
npm run dev
```

2. Build + index recherche :

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

### Decap CMS en local (avec docker-compose)

1. Active le service `arbraphore.decap` défini dans `docker-compose.yml` : il lance `npx decap-server` sur le port 80 et expose `decap.arbraphore.local` pour le reverse proxy nginx. Tu peux démarrer tout le stack avec `docker compose up`.
2. Dans `public/admin/config.js`, la configuration `local_config` bascule vers `git-gateway` et pointe `local_backend.url` sur `http://decap.arbraphore.local/api/v1` tout en ajoutant ce domaine à `allowed_hosts`. Le CMS local n’utilise pas `editorial_workflow` par défaut.
3. Depuis ta machine hôte, fais pointer `decap.arbraphore.local` vers l’IP de l’hôte Docker (ou `localhost` si le proxy reverse local accepte ce nom) et laisse nginx-proxy router les requêtes vers le conteneur `arbraphore.decap`.
4. L’interface `/admin` (par exemple `http://arbraphore.local/admin`) parlera ensuite au backend local via le proxy Git Gateway. Pour déboguer, vérifie `docker compose logs decap-server` et que `http://decap.arbraphore.local/api/v1` répond (un 404 depuis un navigateur est normal, l’essentiel est que la connexion TCP soit établie).

### Decap CMS avec Github

1. Édite `public/admin/config.js` :
   - `repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME`
   - `site_url` et `display_url` avec l'URL Cloudflare Pages (`https://<project>.pages.dev`), puis ton domaine ensuite
2. Dans GitHub, configure une GitHub OAuth App si besoin (selon ton modèle d’auth), puis autorise l'accès.



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
