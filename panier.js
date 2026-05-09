// js/panier.js

function afficherPanier() {
  const panier = getPanier();
  const contenu = document.getElementById('panier-contenu');
  const recap = document.getElementById('recap-panier');

  if (panier.length === 0) {
    contenu.innerHTML = '<p>Votre panier est vide. <a href="index.html">Voir les produits</a></p>';
    recap.style.display = 'none';
    return;
  }

  let total = 0;
  contenu.innerHTML = '<div class="liste-panier">' + panier.map((item, idx) => {
    total += item.prix * item.qte;
    return `
      <div class="item-panier">
        <img src="${item.image}" width="80" />
        <div class="item-infos">
          <h4>${item.nom}</h4>
          <p>${formatPrix(item.prix)} FCFA x ${item.qte}</p>
        </div>
        <div class="item-actions">
          <button onclick="modifierQte(${idx}, 1)">+</button>
          <button onclick="modifierQte(${idx}, -1)">-</button>
          <button onclick="supprimer(${idx})" class="btn-suppr">🗑️</button>
        </div>
      </div>
    `;
  }).join('') + '</div>';

  document.getElementById('total-prix').textContent = formatPrix(total);
  recap.style.display = 'block';
}

function modifierQte(index, delta) {
  const panier = getPanier();
  panier[index].qte += delta;
  if (panier[index].qte <= 0) panier.splice(index, 1);
  sauverPanier(panier);
  afficherPanier();
}

function supprimer(index) {
  const panier = getPanier();
  panier.splice(index, 1);
  sauverPanier(panier);
  afficherPanier();
}

function validerCommande() {
  const nom = document.getElementById('nom-client').value.trim();
  const tel = document.getElementById('tel-client').value.trim();
  const adresse = document.getElementById('adresse-client').value.trim();
  const panier = getPanier();

  if (!nom || !tel || !adresse) {
    alert('Merci de remplir tous les champs.');
    return;
  }

  if (panier.length === 0) return;

  // Construit le message WhatsApp
  let msg = `*Nouvelle Commande*%0A%0A`;
  msg += `*Nom :* ${nom}%0A`;
  msg += `*Téléphone :* ${tel}%0A`;
  msg += `*Adresse :* ${adresse}%0A%0A`;
  msg += `*Produits :*%0A`;
  
  let total = 0;
  panier.forEach(item => {
    msg += `- ${item.nom} (${item.qte}x) = ${formatPrix(item.prix * item.qte)} FCFA%0A`;
    total += item.prix * item.qte;
  });
  
  msg += `%0A*Total :* ${formatPrix(total)} FCFA%0A`;
  msg += `(Paiement à la livraison)`;

  // Ouvre WhatsApp
  window.open(`https://wa.me/67765313?text=${msg}`, '_blank');

  // Vide le panier après envoi
  localStorage.removeItem('panier');
  mettreAJourCompteur();
  alert('✅ Commande envoyée sur WhatsApp !');
  afficherPanier();
}

afficherPanier();