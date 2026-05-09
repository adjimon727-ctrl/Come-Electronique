// js/index.js

const grille = document.getElementById('grille-produits');

function afficherProduits() {
  grille.innerHTML = produits.map(p => `
    <a href="produit.html?id=${p.id}" class="carte-produit">
      <div class="image-carte">
        <img src="${p.images[0]}" alt="${p.nom}" loading="lazy" />
      </div>
      <div class="contenu-carte">
        <h3>${p.nom}</h3>
        <p class="prix-carte">${formatPrix(p.prix)} FCFA</p>
        <span class="categorie">${p.categorie}</span>
      </div>
    </a>
  `).join('');
}

afficherProduits();