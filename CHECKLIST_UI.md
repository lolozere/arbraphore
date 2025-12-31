# Checklist de conformité UI — Arbraphore

Cette checklist sert à vérifier la conformité **fonctionnelle et visuelle** de chaque page du site Arbraphore.

---

## A. Règles globales

- [x] Aucun header global
- [x] Navigation limitée à la sidebar et aux séquences
- [x] Contenu centré et lisible (desktop / mobile)
- [x] Mode clair / sombre fonctionnel
- [x] Aucune UI décorative inutile

---

## B. Sidebar

### Desktop
- [x] Sidebar visible
- [x] Logo cliquable → /
- [x] Titre : **L’arbraphore**
- [x] Sous-titre : *Mon élan poétique*
- [x] Recherche visible
- [x] Bouton Articles :
  - [x] gauche → /articles
  - [x] droite → /rss.xml
- [x] Bouton Journal :
  - [x] gauche → /journal
  - [x] droite → /rss/journal.xml
- [x] Pas de Tags / Catégories
- [x] Bouton Éditer en pied de sidebar
- [x] Icône seul pour le mode clair/sombre

### Mobile
- [x] Sidebar masquée par défaut
- [x] Chevron visible
- [x] Tap / swipe ouvre la sidebar
- [x] Tap hors sidebar ferme

---

## C. Pages séquencées

- [x] Barre de navigation en bas visible
- [x] Flèches précédent / suivant fonctionnelles
- [x] Boutons précédent / suivant du navigateur passent à la séquence précédente / suivante
- [x] Swipe gauche / droite sur mobile change de séquence
- [x] Menu sections (hamburger) fonctionnel
- [x] Navigation par hash correcte
- [x] Titre + dates (publication / modification) toujours visibles en haut

### Sections média only
- [x] Pas de scroll
- [x] Contenu centré verticalement
- [x] Titre affiché
- [x] Image seule → alt utilisé comme titre
- [x] Média responsive sur toute la largeur disponible
- [x] Image seule cliquable en taille réelle sur mobile

### Sections texte
- [x] Scroll autorisé
- [x] Texte justifié
- [x] Images adaptées à la largeur du conteneur

---

## D. Liste des articles

- [x] Titre en h2
- [x] Titre / image / description cliquables
- [x] Date sous le titre (format FR)
- [x] Catégories cliquables
- [x] Tags cliquables
- [x] Visuels distincts entre tags et catégories
- [x] Desktop : image ~50% gauche
- [x] Mobile : image avant description
- [x] Filtres catégorie + tag alignés à gauche
- [x] Aucun texte d’aide / encadré inutile

## Dbis. Pages tags / catégories

- [x] Listes tag / catégorie reprennent l’affichage de la page articles
- [x] Filtres et alignements identiques à la liste des articles

---

## E. Journal

- [x] /journal affiche 3 derniers contenus
- [x] Navigation par année / mois
- [x] Date toujours cliquable
- [x] Introduction : « Journal de bord de la traversée »

### Rendu des types
- [x] YouTube/Vimeo : vidéo + texte
- [x] Image : image + texte
- [x] Citation : texte seul
- [x] Documents : texte + liens

---

## F. Médias

- [x] Médias dans /src/content/medias
- [x] Références relatives dans MD/MDX
- [x] URLs finales en /medias/...
- [x] Articles avec image à la une 16:9

---

## G. RSS & SEO

- [x] RSS articles OK
- [x] RSS journal OK
- [x] RSS tags / catégories OK
- [x] Sitemap généré
- [x] og:image présent avec l’image à la une

---

## H. CMS

- [x] /admin accessible
- [x] Bouton Éditer fonctionne
- [x] Édition article MDX OK
- [x] Édition journal OK
