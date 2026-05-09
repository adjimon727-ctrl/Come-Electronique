fetch('products.json')
    .then(response => response.json())
    .then(data => {
        const display = document.getElementById('product-list');
        display.innerHTML = ""; // Vide la liste avant d'afficher
        
        data.forEach(pc => {
            display.innerHTML += `
                <div class="product-card" onclick="window.location.href='product.html?id=${pc.id}'">
                    <img src="${pc.images[0]}" alt="${pc.nom}">
                    <div class="product-info">
                        <h3>${pc.nom}</h3>
                        <p style="color: #666; font-size: 0.9rem;">${pc.specs.substring(0, 40)}...</p>
                        <p class="price">${pc.prix}</p>
                    </div>
                </div>
            `;
        });
    })
    .catch(err => console.error("Erreur de chargement :", err));