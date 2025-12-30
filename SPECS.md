# Arbraphore — Les spécifications fonctionnelles et techniques

Arbraphore est un **starter éditorial statique** basé sur **Astro**, conçu pour publier des articles et un journal personnel sous forme de **contenus Markdown / MDX**, hébergés dans un dépôt Git, **sans base de données**, avec une expérience de lecture **par séquences** centrée sur le contenu.

Le projet privilégie :
- la performance (SEO, HTML statique)
- la simplicité structurelle
- le contrôle total du contenu
- une interface minimaliste

---

## Sommaire

- [Principes](#principes)
- [Exigences fonctionnelles](#exigences-fonctionnelles)
- [Types de contenus](#types-de-contenus)
- [Lecture par séquences](#lecture-par-séquences)
- [Navigation et interface](#navigation-et-interface)
- [Recherche, SEO et RSS](#recherche-seo-et-rss)
- [Choix techniques](#choix-techniques)
- [Organisation du dépôt](#organisation-du-dépôt)
- [Déploiement](#déploiement)
- [CMS (édition en ligne)](#cms-édition-en-ligne)

---

## Principes

- **Tout est fichier**
- **Aucune base de données**
- **Git comme source de vérité**
- **HTML statique performant**
- **Lecture rythmée, séquentielle**
- **UI minimale, pas de distraction**

---

## Exigences fonctionnelles

### Contenu
- Contenu stocké exclusivement dans un dépôt Git (GitHub, GitLab ou Gitea).
- Rédaction en **Markdown** et **MDX**.
- Versionnement complet du contenu.
- Aucun backend applicatif.

### Tri & métadonnées
- Tri par date (du plus récent au plus ancien).
- Système de **tags**.
- Système de **catégories** (un contenu peut appartenir à plusieurs catégories).

---

## Types de contenus

### Articles
- Contenus longs et riches.
- Lecture **par séquences**.
- Appartiennent à plusieurs catégories et tags.
- Listés sur :
  - `/articles`
  - `/categories/[category]`
  - `/tags/[tag]`

### Journal (brèves)
- Contenus courts, type “post LinkedIn”.
- **Pas de lecture séquentielle**.
- Chaque entrée possède :
  - un titre
  - une date cliquable
  - un contenu Markdown
- Types supportés :
  - YouTube / Vimeo → vidéo + texte
  - Image → image + texte
  - Citation → texte seul
  - Documents → texte + liens de téléchargement

#### Navigation du journal
- `/journal` → 3 derniers contenus
- `/journal/[year]`
- `/journal/[year]/[month]`

### Pages
- Pages éditoriales (ex : accueil, à propos).
- Lecture **par séquences** comme les articles.

---

## Lecture par séquences

### Principe
- Chaque section est définie par un titre `##` en Markdown.
- Une section = une **séquence de lecture**.
- Navigation via **hash** (`#section-x`).

### Navigation
- Barre fixe en bas d’écran :
  - flèche précédente
  - flèche suivante
  - menu hamburger listant les sections
- Aucune autre navigation globale.

### Règles d’affichage des sections

#### Section texte
- Scroll autorisé.
- Contenu justifié.
- Largeur de lecture confortable.

#### Section média uniquement
- Pas de scroll.
- Contenu centré verticalement.
- Titre affiché en haut.
- Si image seule : le titre affiché est le **texte alternatif** de l’image.

---

## Navigation et interface

- **Pas d’en-tête**.
- Une **sidebar unique**, seul élément de navigation globale.
- La sidebar contient :
  - un logo
  - le **titre de la marque affiché : “L’arbraphore”**
  - un champ de recherche
  - les menus (articles, journal, tags, catégories, flux RSS)

### Comportement responsive
- Sur desktop :
  - sidebar visible en permanence
- Sur mobile :
  - sidebar masquée par défaut
  - ouverture via un **chevron discret** (tap ou swipe depuis le bord de l’écran)

### Principes visuels
- Mode sombre supporté.
- Interface minimaliste.
- Contenu prioritaire, sans distraction.

---

## Recherche, SEO et RSS

### Recherche
- Recherche plein texte par mots-clés.
- Fonctionne **sans serveur** et **sans base de données**.

### SEO
- HTML statique.
- URLs propres et stables.
- Métadonnées SEO.
- Sitemap automatique.

### RSS
- 1 feed global pour les articles
- 1 feed pour le journal
- 1 feed par **tag**
- 1 feed par **catégorie**

---

## Choix techniques

### Astro
- Générateur de site statique.
- HTML-first.
- Support Markdown et MDX.
- Chargement JavaScript minimal.
- Très bonnes performances SEO.

### Content Collections Astro
- Collections définies :
  - `articles`
  - `journal`
  - `pages`
- Validation du frontmatter.
- Accès unifié pour pages, RSS et recherche.

### MDX
- Utilisé pour les articles et les pages.
- Permet l’intégration de médias (Spotify, YouTube, audio, etc.).
- Aucune balise spéciale pour les sections :
  - découpage automatique par `##`.

### Détection automatique des sections
- Parsing du contenu MDX au build.
- Chaque `h2` devient une séquence.
- Détection automatique :
  - section texte
  - section média-only
- Aucun composant dédié type `<MediaOnly>`.

### Recherche
- **Pagefind**
  - index généré au build
  - recherche côté client
  - aucun backend

---

## Organisation du dépôt

```
src/
  content/
    articles/
    journal/
    pages/
  pages/
    articles/
    journal/
    categories/
    tags/
    rss/
public/
  admin/        # Decap CMS
  uploads/      # images et documents
```

---

## Déploiement

### Dépôt Git
- Compatible GitHub, GitLab et Gitea.
- Démonstration réalisée avec GitHub.

### Hébergement
- **Cloudflare Pages**
  - plan gratuit
  - CDN mondial
  - domaines personnalisés possibles

### CI/CD
- Build automatique à chaque commit :
  1. installation des dépendances
  2. `astro build`
  3. génération de l’index Pagefind
  4. déploiement Pages

---

## CMS (édition en ligne)

### Decap CMS
- Interface accessible via `/admin`.
- Authentification Git (OAuth).
- Écriture directe dans le dépôt.
- Pas de base de données.
- Compatible Markdown et MDX.

---

## Philosophie du projet

Arbraphore est pensé comme un **outil d’écriture et de lecture**, pas comme une plateforme sociale.

Le rythme de lecture, la sobriété visuelle et la pérennité du contenu priment sur la complexité technique.

---

## Licence

Libre d’utilisation et d’adaptation pour des projets personnels ou éditoriaux.
