# Checklist de conformité UI — Arbraphore

Cette checklist sert à vérifier la conformité **fonctionnelle et visuelle** de chaque page du site Arbraphore.

---

## A. Règles globales

- [ ] Aucun header global
- [ ] Navigation limitée à la sidebar et aux séquences
- [ ] Contenu centré et lisible (desktop / mobile)
- [ ] Mode clair / sombre fonctionnel
- [ ] Aucune UI décorative inutile

---

## B. Sidebar

### Desktop
- [ ] Sidebar visible
- [ ] Logo cliquable → /
- [ ] Titre : **L’arbraphore**
- [ ] Sous-titre : *Mon élan poétique*
- [ ] Recherche visible
- [ ] Bouton Articles :
  - [ ] gauche → /articles
  - [ ] droite → /rss.xml
- [ ] Bouton Journal :
  - [ ] gauche → /journal
  - [ ] droite → /rss/journal.xml
- [ ] Pas de Tags / Catégories
- [ ] Bouton Éditer en pied de sidebar
- [ ] Icône seul pour le mode clair/sombre

### Mobile
- [ ] Sidebar masquée par défaut
- [ ] Chevron visible
- [ ] Tap / swipe ouvre la sidebar
- [ ] Tap hors sidebar ferme

---

## C. Pages séquencées

- [ ] Barre de navigation en bas visible
- [ ] Flèches précédent / suivant fonctionnelles
- [ ] Menu sections (hamburger) fonctionnel
- [ ] Navigation par hash correcte

### Sections média only
- [ ] Pas de scroll
- [ ] Contenu centré verticalement
- [ ] Titre affiché
- [ ] Image seule → alt utilisé comme titre

### Sections texte
- [ ] Scroll autorisé
- [ ] Texte justifié

---

## D. Liste des articles

- [ ] Titre en h2
- [ ] Titre / image / description cliquables
- [ ] Date sous le titre (format FR)
- [ ] Catégories cliquables
- [ ] Tags cliquables
- [ ] Desktop : image ~50% gauche
- [ ] Mobile : image avant description
- [ ] Filtres catégorie + tag centrés
- [ ] Aucun texte d’aide / encadré inutile

---

## E. Journal

- [ ] /journal affiche 3 derniers contenus
- [ ] Navigation par année / mois
- [ ] Date toujours cliquable

### Rendu des types
- [ ] YouTube/Vimeo : vidéo + texte
- [ ] Image : image + texte
- [ ] Citation : texte seul
- [ ] Documents : texte + liens

---

## F. Médias

- [ ] Médias dans /src/content/medias
- [ ] Références relatives dans MD/MDX
- [ ] URLs finales en /medias/...
- [ ] Articles avec image à la une 16:9

---

## G. RSS & SEO

- [ ] RSS articles OK
- [ ] RSS journal OK
- [ ] RSS tags / catégories OK
- [ ] Sitemap généré

---

## H. CMS

- [ ] /admin accessible
- [ ] Bouton Éditer fonctionne
- [ ] Édition article MDX OK
- [ ] Édition journal OK
