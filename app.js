document.addEventListener("DOMContentLoaded", function () {

  // ================== NAVEGAÇÃO ==================
  window.mostrar = function (id) {
    document.querySelectorAll('.tela').forEach(t => t.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  };

  // ================== PRODUTOS POR CATEGORIA ==================
  const categorias = {
    "Linha 150ml (24 un)": [
      { nome: "Creme de Alho Sem Ardor", unidades: 24, custo_caixa: 72 },
      { nome: "Creme de Alho Picante", unidades: 24, custo_caixa: 72 }
    ],
    "Linha 60ml Vidro (24 un)": [
      { nome: "Molho de Pimenta Baiana Super Picante", unidades: 24, custo_caixa: 108 },
      { nome: "Molho de Pimenta Vulcão Super Picante", unidades: 24, custo_caixa: 108 }
    ],
    "Top Down 330g (12 un)": [
      { nome: "Maionese de Alho Premium 330g", unidades: 12, custo_caixa: 84 }
    ],
    "Linha Premium 200ml (12 un)": [
      { nome: "Molho Habanero com Ervas Picante", unidades: 12, custo_caixa: 63.6 }
    ],
    "Temperos 450g (12 un)": [
      { nome: "Tempero Alho e Sal", unidades: 12, custo_caixa: 72 }
    ],
    "Conservas 160g": [
      { nome: "Conserva de Pimenta Malagueta", unidades: 24, custo_caixa: 96 }
    ]
  };

  // ================== ELEMENTOS ==================
  const categoriaSelect = document.getElementById("categoriaSelect");
  const produtoSelect = document.getElementById("produtoSelect");
  const listaProdutos = document.getElementById("listaProdutos");

  // ================== CARREGAR CATEGORIAS ==================
  Object.keys(categorias).forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoriaSelect.appendChild(opt);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${cat}</h3>`;

    categorias[cat].forEach(p => {
      card.innerHTML += `<div>${p.nome}<br><small>Cx: R$ ${p.custo_caixa.toFixed(2)}</small></div>`;
    });

    listaProdutos.appendChild(card);
  });

  // ================== PRODUTOS POR CATEGORIA ==================
  function atualizarProdutos() {
    produtoSelect.innerHTML = "";
    const produtos = categorias[categoriaSelect.value];

    produtos.forEach((p, index) => {
      const opt = document.createElement("option");
      opt.value = index;
      opt.textContent = p.nome;
      produtoSelect.appendChild(opt);
    });

    atualizarCustos();
  }

  categoriaSelect.addEventListener("change", atualizarProdutos);

  // ================== CUSTOS ==================
  function atualizarCustos() {
    const produto = categorias[categoriaSelect.value][produtoSelect.value];
    document.getElementById("custoCaixa").textContent = produto.custo_caixa.toFixed(2);
    document.getElementById("custoUnitario").textContent =
      (produto.custo_caixa / produto.unidades).toFixed(2);
  }

  produtoSelect.addEventListener("change", atualizarCustos);

  atualizarProdutos();

  // ================== PEDIDO ==================
  let itensPedido = [];

  window.adicionarItem = function () {
    const produto = categorias[categoriaSelect.value][produtoSelect.value];
    const tipo = document.getElementById("tipoVenda").value;
    const qtd = Number(document.getElementById("quantidade").value);
    const precoVenda = Number(document.getElementById("precoVenda").value);

    if (!precoVenda || precoVenda <= 0) {
      alert("Informe o preço de venda");
      return;
    }

    const custoUnit = produto.custo_caixa / produto.unidades;
    const custo = tipo === "caixa" ? produto.custo_caixa : custoUnit;

    const total = precoVenda * qtd;
    const lucro = (precoVenda - custo) * qtd;

    itensPedido.push({ produto: produto.nome, tipo, qtd, total, lucro });
    atualizarPedido();
  };

  function atualizarPedido() {
    const listaItens = document.getElementById("listaItens");
    listaItens.innerHTML = "";

    let total = 0;
    let lucro = 0;

    itensPedido.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.qtd}x ${item.produto} (${item.tipo}) - R$ ${item.total.toFixed(2)}`;
      listaItens.appendChild(li);
      total += item.total;
      lucro += item.lucro;
    });

    document.getElementById("totalPedido").textContent = total.toFixed(2);
    document.getElementById("lucroPedido").textContent = lucro.toFixed(2);
  }

  window.salvarPedido = function () {
    if (!document.getElementById("cliente").value) {
      alert("Informe o cliente");
      return;
    }
    alert("Pedido salvo!");
    itensPedido = [];
    atualizarPedido();
  };

  window.gerarPDF = function () {
    if (itensPedido.length === 0) {
      alert("Nenhum item no pedido");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    doc.text("PEDIDO", 10, y);
    y += 10;

    itensPedido.forEach(item => {
      doc.text(`${item.qtd}x ${item.produto} - R$ ${item.total.toFixed(2)}`, 10, y);
      y += 6;
    });

    doc.text(`Total: R$ ${document.getElementById("totalPedido").textContent}`, 10, y + 6);
    doc.text(`Lucro: R$ ${document.getElementById("lucroPedido").textContent}`, 10, y + 12);

    doc.save("pedido.pdf");
  };

});
