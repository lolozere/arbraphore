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
- [ ] Boutons précédent / suivant du navigateur passent à la séquence précédente / suivante
- [ ] Swipe gauche / droite sur mobile change de séquence
- [ ] Menu sections (hamburger) fonctionnel
- [ ] Navigation par hash correcte
- [ ] Titre + dates (publication / modification) toujours visibles en haut

### Sections média only
- [ ] Pas de scroll
- [ ] Contenu centré verticalement
- [ ] Titre affiché
- [ ] Image seule → alt utilisé comme titre
- [ ] Média responsive sur toute la largeur disponible
- [ ] Image seule cliquable en taille réelle sur mobile

### Sections texte
- [ ] Scroll autorisé
- [ ] Texte justifié
- [ ] Images adaptées à la largeur du conteneur

---

## D. Liste des articles

- [ ] Titre en h2
- [ ] Titre (et vignette, si active) cliquables ; la description n’est pas un lien
- [ ] Date sous le titre (format FR)
- [ ] Catégories cliquables
- [ ] Tags cliquables
- [ ] Visuels distincts entre tags et catégories avec hauteur uniforme
- [ ] Desktop : image représentative (quand activée) à droite sur 50 % de la largeur ; aucun bloc réservé si l’image est absente
- [ ] Mobile : image représentative (si présente) entre le titre et la date, largeur 100 %
- [ ] Descriptions affichées en paragraphes séparés et espacés, `<br>` pour les retours simples
- [ ] Filtres catégorie + tag alignés à gauche
- [ ] Aucun texte d’aide / encadré inutile

## Dbis. Pages tags / catégories

- [ ] Listes tag / catégorie reprennent l’affichage de la page articles
- [ ] Filtres et alignements identiques à la liste des articles

---

## E. Journal

- [ ] /journal affiche 3 derniers contenus
- [ ] Navigation par année / mois
- [ ] Date toujours cliquable
- [ ] Introduction : « Journal de bord de la traversée »

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
- [ ] og:image présent avec l’image à la une

---

## H. CMS

- [ ] /admin accessible
- [ ] Bouton Éditer fonctionne
- [ ] Édition article MDX OK
- [ ] Édition journal OK
