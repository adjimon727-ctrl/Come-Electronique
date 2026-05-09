// js/utils.js

// Récupère ou initialise le panier dans le localStorage
function getPanier() {
  return JSON.parse(localStorage.getItem('panier')) || [];
}

function sauverPanier(panier) {
  localStorage.setItem('panier', JSON.stringify(panier));
  mettreAJourCompteur();
}

// Met à jour le nombre d'articles dans le header
function mettreAJourCompteur() {
  const panier = getPanier();
  const total = panier.reduce((sum, item) => sum + item.qte, 0);
  document.querySelectorAll('#compteur-panier').forEach(el => el.textContent = total);
}

// Format prix
function formatPrix(prix) {
  return new Intl.NumberFormat('fr-FR').format(prix);
}

// Au chargement de chaque page
document.addEventListener('DOMContentLoaded', mettreAJourCompteur);