// js/produit.js

// 1. Récupère l'ID depuis l'URL (ex: produit.html?id=2)
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
const produit = produits.find(p => p.id === id);

if (!produit) {
  document.body.innerHTML = '<div class="container"><h1>Produit non trouvé</h1><a href="index.html">Retour</a></div>';
  throw new Error("Produit introuvable");
}

// 2. Injection des données
document.getElementById('nom-produit').textContent = produit.nom;
document.getElementById('prix-produit').textContent = formatPrix(produit.prix) + ' FCFA';
document.getElementById('desc-produit').textContent = produit.description;
document.getElementById('img-principale').src = produit.images[0];

// Miniatures
const containerMini = document.getElementById('miniatures');
containerMini.innerHTML = produit.images.map((img, idx) => `
  <img src="${img}" onclick="changerImagePrincipale('${img}')" class="${idx === 0 ? 'active' : ''}" />
`).join('');

// Caractéristiques
const listeSpecs = document.getElementById('liste-specs');
const specs = produit.specs;
listeSpecs.innerHTML = `
  <li><strong>Processeur :</strong> ${specs.processeur}</li>
  <li><strong>RAM :</strong> ${specs.ram}</li>
  <li><strong>Stockage :</strong> ${specs.stockage}</li>
  <li><strong>Carte graphique :</strong> ${specs.carteGraphique}</li>
  <li><strong>Écran :</strong> ${specs.ecran}</li>
  <li><strong>Système :</strong> ${specs.systeme}</li>
`;

// 3. Gestion des images (Galerie)
let indexLightbox = 0;

function changerImagePrincipale(src) {
  document.getElementById('img-principale').src = src;
  // Met à jour la classe active sur miniatures
  document.querySelectorAll('.miniatures img').forEach(img => {
    img.classList.toggle('active', img.src.includes(src));
  });
}

function ouvrirLightbox() {
  const lightbox = document.getElementById('lightbox');
  indexLightbox = 0;
  majLightbox();
  lightbox.style.display = 'flex';
}

function fermerLightbox(e) {
  if (e.target.id === 'lightbox' || e.target.className === 'fermer-lightbox') {
    document.getElementById('lightbox').style.display = 'none';
  }
}

function changerImage(direction) {
  indexLightbox += direction;
  if (indexLightbox < 0) indexLightbox = produit.images.length - 1;
  if (indexLightbox >= produit.images.length) indexLightbox = 0;
  majLightbox();
}

function majLightbox() {
  document.getElementById('lightbox-img').src = produit.images[indexLightbox];
}

// 4. Ajouter au panier
function ajouterAuPanier() {
  const panier = getPanier();
  const existant = panier.find(item => item.id === produit.id);
  if (existant) {
    existant.qte++;
  } else {
    panier.push({ id: produit.id, nom: produit.nom, prix: produit.prix, qte: 1, image: produit.images[0] });
  }
  sauverPanier(panier);
  alert('✅ Ajouté au panier !');
}
