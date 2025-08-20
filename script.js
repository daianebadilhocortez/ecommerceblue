// ===== Produtos disponíveis =====
const produtos = [
    { id: 1, nome: "Camiseta Masculina Estampa Geométrica", preco: 89.90, imagem: "img/camiseta1.jpg" },
    { id: 2, nome: "Camiseta Masculina Lisa", preco: 69.90, imagem: "img/camiseta2.jpg" },
    { id: 3, nome: "Camiseta Masculina Manga Longa", preco: 99.90, imagem: "img/camiseta3.jpg" },
    { id: 4, nome: "Camiseta Masculina Polo", preco: 129.90, imagem: "img/camiseta4.jpg" },
  ];
  
  // ===== Renderizar produtos na página =====
  const productList = document.getElementById("productList");
  
  function renderProducts(filteredProducts) {
    if (!productList) return;
    productList.innerHTML = "";
    filteredProducts.forEach(produto => {
      const div = document.createElement("div");
      div.className = "product-card border p-4 rounded bg-white shadow";
      div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" class="product-image w-full h-48 object-cover mb-2">
        <div class="product-details">
          <h3 class="product-name font-bold text-lg mb-2">${produto.nome}</h3>
          <p class="product-price text-blue-600 font-semibold mb-2">R$ ${produto.preco.toFixed(2)}</p>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="adicionarCarrinho(${produto.id})">Adicionar ao Carrinho</button>
          <a href="product.html?id=${produto.id}" class="product-link text-blue-500 underline ml-2">Ver Detalhes</a>
        </div>
      `;
      productList.appendChild(div);
    });
  }
  
  // ===== Busca de produtos =====
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const filtered = produtos.filter(p => p.nome.toLowerCase().includes(searchTerm));
      renderProducts(filtered);
    });
  }
  
  // ===== Carrinho =====
  function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }
  
  function carregarCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
  }
  
  function adicionarCarrinho(produtoId) {
    const carrinho = carregarCarrinho();
    const produto = produtos.find(p => p.id === produtoId);
    const itemExistente = carrinho.find(item => item.id === produtoId);
  
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }
  
    salvarCarrinho(carrinho);
    alert(`${produto.nome} adicionado ao carrinho!`);
    atualizarCarrinhoVisual();
  }
  
  // ===== Atualizar carrinho visual =====
  function atualizarCarrinhoVisual() {
    const carrinhoTabela = document.getElementById('itens-carrinho');
    const totalGeral = document.getElementById('total-geral');
    if (!carrinhoTabela) return;
  
    const carrinho = carregarCarrinho();
    carrinhoTabela.innerHTML = '';
  
    let total = 0;
  
    carrinho.forEach(item => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;
  
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="border px-2 py-1">${item.nome}</td>
        <td class="border px-2 py-1">
          <input type="number" value="${item.quantidade}" min="1" class="w-16 border p-1" onchange="alterarQuantidade(${item.id}, this.value)">
        </td>
        <td class="border px-2 py-1">R$ ${item.preco.toFixed(2)}</td>
        <td class="border px-2 py-1">R$ ${subtotal.toFixed(2)}</td>
        <td class="border px-2 py-1">
          <button class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onclick="removerItem(${item.id})">Remover</button>
        </td>
      `;
      carrinhoTabela.appendChild(row);
    });
  
    if (totalGeral) totalGeral.textContent = total.toFixed(2);
  }
  
  function alterarQuantidade(produtoId, novaQtd) {
    const carrinho = carregarCarrinho();
    const item = carrinho.find(i => i.id === produtoId);
    if (item) {
      item.quantidade = parseInt(novaQtd);
      salvarCarrinho(carrinho);
      atualizarCarrinhoVisual();
    }
  }
  
  function removerItem(produtoId) {
    let carrinho = carregarCarrinho();
    carrinho = carrinho.filter(item => item.id !== produtoId);
    salvarCarrinho(carrinho);
    atualizarCarrinhoVisual();
  }
  
  // ===== Inicialização =====
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts(produtos);
    atualizarCarrinhoVisual();
  });
  