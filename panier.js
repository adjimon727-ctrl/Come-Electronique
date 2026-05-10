// js/panier.js

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    afficherPanier();
});

function afficherPanier() {
  const panier = getPanier();
  const contenu = document.getElementById('panier-contenu');
  const recap = document.getElementById('recap-panier');

  if (panier.length === 0) {
    contenu.innerHTML = `
      <p>Votre panier est vide.</p>
      <a href="index.html" style="color: #0984e3; font-weight: bold;">← Continuer les achats</a>
    `;
    recap.style.display = 'none';
    return;
  }

  let total = 0;
  let html = '<div class="liste-panier">';

  panier.forEach((item, idx) => {
    total += item.prix * item.qte;
    html += `
      <div class="item-panier">
        <img src="${item.image}" width="80" alt="${item.nom}">
        <div class="item-infos">
          <h4>${item.nom}</h4>
          <p>${formatPrix(item.prix)} FCFA × ${item.qte}</p>
        </div>
        <div class="item-actions">
          <button onclick="modifierQte(${idx}, 1)">+</button>
          <span style="min-width:30px; text-align:center;">${item.qte}</span>
          <button onclick="modifierQte(${idx}, -1)">-</button>
          <button onclick="supprimer(${idx})" class="btn-suppr">🗑️</button>
        </div>
      </div>
    `;
  });

  html += '</div>';
  contenu.innerHTML = html;

  document.getElementById('total-prix').textContent = formatPrix(total);
  recap.style.display = 'block';
}

function modifierQte(index, delta) {
  let panier = getPanier();
  panier[index].qte += delta;
  if (panier[index].qte <= 0) {
    panier.splice(index, 1);
  }
  sauverPanier(panier);
  afficherPanier();
}

function supprimer(index) {
  let panier = getPanier();
  panier.splice(index, 1);
  sauverPanier(panier);
  afficherPanier();
}

function validerCommande() {
  const nom = document.getElementById('nom-client').value.trim();
  const tel = document.getElementById('tel-client').value.trim();
  const adresse = document.getElementById('adresse-client').value.trim();
  const panier = getPanier();

  if (!nom || !tel || !adresse || panier.length === 0) {
    alert('Veuillez remplir tous les champs et avoir au moins un produit.');
    return;
  }

  let msg = `*Nouvelle Commande*%0A%0A`;
  msg += `*Nom :* ${nom}%0A`;
  msg += `*Téléphone :* ${tel}%0A`;
  msg += `*Adresse :* ${adresse}%0A%0A`;
  msg += `*Produits :*%0A`;

  let total = 0;
  panier.forEach(item => {
    const sousTotal = item.prix * item.qte;
    msg += `- ${item.nom} (${item.qte}x) = ${formatPrix(sousTotal)} FCFA%0A`;
    total += sousTotal;
  });

  msg += `%0A*Total :* ${formatPrix(total)} FCFA%0A`;
  msg += `(Paiement à la livraison)`;

  // Remplace par ton vrai numéro WhatsApp
  window.open(`https://wa.me/67765313?text=${msg}`, '_blank');

  // Vider le panier après commande
  localStorage.removeItem('panier');
  mettreAJourCompteur();
  alert('✅ Commande envoyée sur WhatsApp !');
  afficherPanier();
}
