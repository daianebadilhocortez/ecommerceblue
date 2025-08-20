const produtos = [
    { id: 1, nome: "Camiseta Masculina Estampa Geométrica", preco: 89.90, imagem: "img/camiseta1.jpg" },
    { id: 2, nome: "Camiseta Masculina Lisa", preco: 69.90, imagem: "img/camiseta2.jpg" },
    { id: 3, nome: "Camiseta Masculina Manga Longa", preco: 99.90, imagem: "img/camiseta3.jpg" },
    { id: 4, nome: "Camiseta Masculina Polo", preco: 129.90, imagem: "img/camiseta4.jpg" },
  ];
  
  const productList = document.getElementById("productList");
  
  function renderProducts(filteredProducts) {
    productList.innerHTML = "";
    filteredProducts.forEach(produto => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
        <div class="product-details">
          <h3 class="product-name">${produto.nome}</h3>
          <p class="product-price">R$ ${produto.preco.toFixed(2)}</p>
          <a href="product.html?id=${produto.id}" class="product-link">Ver Detalhes</a>
        </div>
      `;
      productList.appendChild(div);
    });
  }
  
  document.getElementById("searchInput").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const filtered = produtos.filter(p => p.nome.toLowerCase().includes(searchTerm));
    renderProducts(filtered);
  });
  
  renderProducts(produtos);
  