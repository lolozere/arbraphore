# Arbraphore — Spécifications fonctionnelles et techniques

Arbraphore est un **starter éditorial statique** basé sur **Astro**, destiné à la publication d’articles et d’un journal personnel en **Markdown / MDX**, hébergés dans un dépôt Git, **sans base de données**, avec une expérience de lecture **par séquences** centrée sur le contenu.

Le projet privilégie :
- la performance (SEO, HTML statique)
- la simplicité structurelle
- le contrôle total du contenu
- une interface minimaliste et narrative

---

## Sommaire

- [Contexte général](#contexte-général)
- [Principes](#principes)
- [Sidebar](#sidebar)
- [Types de contenus](#types-de-contenus)
- [Lecture par séquences](#lecture-par-séquences)
- [Contenus et médias](#contenus-et-médias)
- [Page liste des articles](#page-liste-des-articles)
- [Recherche, SEO et RSS](#recherche-seo-et-rss)
- [Build et déploiement](#build-et-déploiement)
- [Organisation du dépôt](#organisation-du-dépôt)
- [CMS (édition en ligne)](#cms-édition-en-ligne)

---

## Contexte général

- Site statique basé sur **Astro**.
- Contenu rédigé en **MDX** pour les articles et pages séquencées.
- Brèves de **journal** en Markdown simple, non séquencées.
- Chaque titre `##` dans un article ou une page correspond à une **séquence de lecture**.
- Pages principales :
  - Accueil (séquencé)
  - Articles
  - Journal
  - À propos (séquencé)
  - Pages de taxonomie (tags, catégories)
- Flux **RSS** pour :
  - tous les articles
  - chaque catégorie
  - chaque tag
  - le journal
- Recherche statique générée via **Pagefind** au build.
- Sitemap généré automatiquement par Astro.
- Navigation séquencée :
  - flèches précédente / suivante en bas d’écran
  - menu listant les sections
  - navigation par **hash URL** généré depuis le titre de section.

---

## Principes

- **Tout est fichier**
- **Aucune base de données**
- **Git comme source de vérité**
- **HTML statique performant**
- **Lecture rythmée, séquentielle**
- **UI minimale, pas de distraction**

---

## Sidebar

- Le **logo**, placé au-dessus du titre du site, est **cliquable** et renvoie vers l’accueil.
- Le bouton « Accueil (séquences) » n’est **pas présent** dans le menu.
- Le titre du site affiché est : **« L’arbraphore »**.
- Le sous-titre est : **« Mon élan poétique »**.
- Les boutons **Articles** et **Journal** sont divisés en deux zones cliquables :
  - zone gauche : lien vers la page de listing
  - zone droite : icône RSS pointant vers le flux correspondant
- Les boutons **Tags** et **Catégories** sont **retirés** de la sidebar.
- Le bouton **« Éditer »** est placé dans le **pied de la sidebar**, entre l’année affichée et le sélecteur de thème.
- Le basculement clair / sombre se fait via une **icône seule** (aucun libellé texte).
- Sur mobile :
  - la sidebar est masquée par défaut
  - ouverture via un **chevron discret** (tap ou swipe).

---

## Types de contenus

### Articles
- Contenus longs et riches en **MDX**.
- Lecture **par séquences**.
- Chaque article possède :
  - un titre
  - une date de publication
  - une date de dernière modification
  - une description
  - une **image à la une au format 16:9** (obligatoire)
  - des catégories (multiples)
  - des tags (multiples)
- Le titre, la date de publication et la date de modification restent affichés en haut de l’écran quelle que soit la séquence.
- Listés sur :
  - `/articles`
  - `/categories/[category]`
  - `/tags/[tag]`

### Journal (brèves)
- Contenus courts, type “post LinkedIn”.
- **Pas de lecture séquencée**.
- Chaque entrée possède :
  - un titre
  - une date cliquable
  - un contenu Markdown
- L’introduction de la page « Journal » affiche : « Journal de bord de la traversée ».
- Types supportés :
  - YouTube / Vimeo → vidéo + texte
  - Image → image + texte
  - Citation → texte seul
  - Documents → texte + liens de téléchargement
- Navigation :
  - `/journal` → 3 derniers contenus
  - `/journal/[year]`
  - `/journal/[year]/[month]`

### Pages
- Pages éditoriales (Accueil, À propos).
- Lecture **par séquences**, identique aux articles.

---

## Lecture par séquences

### Principe
- Chaque section est définie par un titre `##`.
- Une section = une **séquence de lecture**.
- Navigation via **hash** (`#slug-de-section`).

### Navigation
- Barre fixe en bas d’écran :
  - flèche précédente
  - flèche suivante
  - menu hamburger listant les sections
- Aucune autre navigation globale.
- Navigation historique :
  - sur desktop, le bouton précédent du navigateur remonte à la séquence précédente, le suivant avance à la séquence suivante
  - sur mobile, le swipe gauche/droite déclenche le changement de séquence correspondant

### Rappels de présentation

- **Section média only** :
  - image, iframe, audio ou vidéo sans texte
  - centrée verticalement
  - sans scroll
  - affiche un titre en haut
    - si image seule : texte alternatif de l’image
    - sinon : titre `##`
  - média responsive : largeur maximale de l’écran
  - si l’image est seule, elle peut être ouverte en taille réelle sur mobile
- **Section texte** :
  - scroll autorisé
  - texte justifié
  - images intégrées qui respectent la largeur du conteneur
  - largeur de lecture confortable

---

## Contenus et médias

- Chaque article possède une **image à la une 16:9**.
- Tous les médias (images, audio, vidéos, documents) sont stockés dans :
  ```
  /src/content/medias
  ```
- Les fichiers Markdown / MDX référencent les médias via des **chemins relatifs** :
  ```
  ../medias/ai-neurons.svg
  ```
- Lors du build statique :
  - les médias sont copiés vers `/public/medias`
  - les liens sont réécrits en **chemin absolu racine** (`/medias/...`)
  - aucun domaine n’est inclus (compatible preview / production).

---

## Page liste des articles

- Le titre de chaque article est en **`<h2>`**.
- Le **titre**, l’**image à la une** et la **description** sont cliquables.
- La **date** est affichée :
  - sous le titre
  - sans espace supplémentaire
  - au format français
- Les **catégories** et **tags** sont cliquables.
- Tags et catégories utilisent des visuels distincts pour être différenciés.
- Mise en page responsive :
  - **bureau** : image à la une ~50% de la largeur, alignée à gauche
  - **mobile** : image affichée avant la description
- Barre de filtres :
  - listes déroulantes catégorie + tag
  - sur une même ligne
  - alignées à gauche
  - sans encadré de type “card”
- Texte d’aide au tri/filtrage supprimé.
- Les pages de tags ou de catégories reprennent exactement les mêmes principes d’affichage et de filtres que la liste des articles.

---

## Recherche, SEO et RSS

### Recherche
- Recherche plein texte par mots-clés.
- Générée au build via **Pagefind**.
- Aucune API, aucun backend.

### SEO
- HTML statique performant.
- URLs propres et stables.
- Métadonnées SEO.
- L’image à la une de chaque article est présente dans les balises Open Graph (`og:image`).
- Sitemap automatique.

### RSS
- 1 feed global pour les articles
- 1 feed pour le journal
- 1 feed par **tag**
- 1 feed par **catégorie**

---

## Build et déploiement

### Commandes
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview` (vérification du build avec Pagefind)

### Déploiement
- Déploiement recommandé via **Cloudflare Pages** :
  - intégration Git
  - ou GitHub Actions
- Secrets requis :
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_PAGES_PROJECT_NAME`

---

## Organisation du dépôt

```
src/
  content/
    articles/
    journal/
    pages/
    medias/
  pages/
    articles/
    journal/
    categories/
    tags/
    rss/
public/
  admin/        # Decap CMS
  medias/       # médias copiés au build
```

---

## CMS (édition en ligne) — Exigences GitHub + Cloudflare (toutes branches)

Cette section précise les exigences de fonctionnement de **Decap CMS** avec un dépôt **GitHub** et un hébergement **Cloudflare Pages**, y compris pour les déploiements de prévisualisation (branches/PR) dont l’URL peut varier.

### Objectifs
- L’interface d’admin est accessible via **`/admin`** sur **toutes** les versions déployées (production et previews).
- L’authentification Decap fonctionne via GitHub OAuth **sans dépendre** d’une URL Pages fixe (compatible `arbraphore.pages.dev` et `*.arbraphore.pages.dev`).
- L’édition crée/modifie des fichiers dans le dépôt GitHub (workflow éditorial possible), sans base de données.

### Architecture retenue
- **Decap CMS** est servi statiquement depuis `public/admin/`.
- La configuration Decap est **dynamique** via `public/admin/config.js` (et non via `config.yml`), afin de s’adapter automatiquement à l’URL du déploiement courant.
- Un **OAuth proxy** est hébergé sur **Cloudflare Workers** (domaine stable `*.workers.dev` ou sous-domaine Cloudflare), et sert d’interface OAuth entre Decap et GitHub.

### Fichiers et scripts (ordre obligatoire)
- `public/admin/index.html` :
  - définit `window.CMS_MANUAL_INIT = true` **avant** de charger Decap
  - charge ensuite `decap-cms.js`
  - charge enfin `public/admin/config.js` qui appelle `CMS.init(...)`

Ordre attendu :
1. `window.CMS_MANUAL_INIT = true;`
2. `<script src="...decap-cms.js"></script>`
3. `<script src="/admin/config.js"></script>`

> Remarque : `public/admin/config.yml` est **vide/absent** (pour éviter double chargement de configuration et collisions de noms de collections).

### Configuration Decap (config.js)
Exigences minimales dans `config.js` :
- `backend.name = "github"`
- `backend.repo = "<owner>/<repo>"` (ex. `lolozere/arbraphore`)
- `backend.branch = "main"` (branche cible des commits/PR créés par Decap)
- `backend.base_url = "https://<ton-worker>.workers.dev"` (domaine stable de l’OAuth proxy)
- `site_url` et `display_url` doivent être **dynamiques** :
  - `const origin = window.location.origin;`
  - `site_url: origin`
  - `display_url: origin`

Ainsi, Decap s’adapte automatiquement aux URLs Cloudflare Pages :
- production : `https://arbraphore.pages.dev`
- preview (hash) : `https://<hash>.arbraphore.pages.dev`
- preview (branche) : `https://<branche>.arbraphore.pages.dev`

### OAuth proxy (Cloudflare Workers)
Exigences :
- Un Worker “OAuth proxy” expose au minimum :
  - `/auth`
  - `/callback`
- Le Worker est déployé sur un **domaine stable** (workers.dev ou sous-domaine Cloudflare).

Le champ Decap correspondant :
- `backend.base_url = "https://<domaine-du-worker>"`

### GitHub OAuth App (obligatoire)
Dans GitHub → Developer Settings → OAuth Apps :
- **Homepage URL** : URL de production Pages (ex. `https://arbraphore.pages.dev`)
- **Authorization callback URL** : `https://<domaine-du-worker>/callback`

> Le callback pointe **toujours** vers le Worker (stable), pas vers une URL de preview Pages.

### Compatibilité multi-branches (exigences)
- L’admin `/admin` doit fonctionner quel que soit le domaine du déploiement (prod/preview).
- `config.js` doit être la **seule source de configuration** Decap (pas de `config.yml` actif).
- Les collections doivent avoir des `name` uniques (ex. `articles`, `journal`, `pages`) et ne pas être déclarées deux fois.
- Le bouton **« Éditer »** (sidebar) pointe vers `/admin` (même origine), donc compatible previews.

### Notes opérationnelles
- Decap peut fonctionner en `publish_mode: editorial_workflow` (PR/branches internes GitHub) ou en mode direct selon tes préférences.
- Pour les previews de PR Cloudflare Pages, l’admin est utilisable pour éditer, mais les changements sont envoyés vers la branche cible configurée dans `backend.branch` (ex. `main`) ou via workflow éditorial GitHub.


---

---

## Philosophie du projet

Arbraphore est pensé comme un **outil d’écriture et de lecture**, pas comme une plateforme sociale.

Le rythme de lecture, la sobriété visuelle et la pérennité du contenu priment sur la complexité technique.
