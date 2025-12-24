document.addEventListener("DOMContentLoaded", function () {

  // ===== NAVEGAÇÃO =====
  window.mostrar = function (id) {
    document.querySelectorAll('.tela').forEach(t => t.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  };

  // ===== PRODUTOS POR CATEGORIA =====
  const categorias = {
    "Linha 150ml (24 un)": [
      { nome: "Creme de Alho Sem Ardor", unidades: 24, custo_caixa: 72 },
      { nome: "Creme de Alho Picante", unidades: 24, custo_caixa: 72 },
      { nome: "Molho Barbecue Churrasco Picante", unidades: 24, custo_caixa: 72 },
      { nome: "Molho de Pimenta Extra Forte", unidades: 24, custo_caixa: 72 }
    ],
    "Linha 60ml Vidro (24 un)": [
      { nome: "Molho de Pimenta Baiana Super Picante", unidades: 24, custo_caixa: 108 },
      { nome: "Molho de Pimenta Carolina Reaper", unidades: 24, custo_caixa: 168 }
    ],
    "Top Down 330g (12 un)": [
      { nome: "Maionese de Alho Premium 330g", unidades: 12, custo_caixa: 84 }
    ],
    "Temperos 450g (12 un)": [
      { nome: "Tempero Alho e Sal", unidades: 12, custo_caixa: 72 }
    ]
  };

  // ===== ELEMENTOS =====
  const categoriaSelect = document.getElementById("categoriaSelect");
  const produtoSelect = document.getElementById("produtoSelect");
  const listaProdutos = document.getElementById("listaProdutos");

  // ===== CARREGAR CATEGORIAS =====
  Object.keys(categorias).forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoriaSelect.appendChild(opt);

    const resumo = document.createElement("p");
    resumo.innerHTML = `<strong>${cat}</strong> – ${categorias[cat].length} produtos`;
    listaProdutos.appendChild(resumo);
  });

  function atualizarProdutos() {
    produtoSelect.innerHTML = "";
    categorias[categoriaSelect.value].forEach((p, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = p.nome;
      produtoSelect.appendChild(opt);
    });
    atualizarCustos();
  }

  categoriaSelect.addEventListener("change", atualizarProdutos);

  function atualizarCustos() {
    const p = categorias[categoriaSelect.value][produtoSelect.value];
    document.getElementById("custoCaixa").textContent = p.custo_caixa.toFixed(2);
    document.getElementById("custoUnitario").textContent =
      (p.custo_caixa / p.unidades).toFixed(2);
  }

  produtoSelect.addEventListener("change", atualizarCustos);
  atualizarProdutos();

  // ===== PEDIDO =====
  let itensPedido = [];
    window.adicionarItem = function () {
    const p = categorias[categoriaSelect.value][produtoSelect.value];
    const tipo = document.getElementById("tipoVenda").value;
    const qtd = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("precoVenda").value);

    if (!preco || preco <= 0) {
      alert("Informe o preço de venda");
      return;
    }

    const custo = tipo === "caixa"
      ? p.custo_caixa
      : p.custo_caixa / p.unidades;

    const total = preco * qtd;
    const lucro = (preco - custo) * qtd;

    itensPedido.push({
      nome: p.nome,
      total,
      lucro
    });

    atualizarPedido();
  };

  function atualizarPedido() {
    let total = 0;
    let lucro = 0;

    const ul = document.getElementById("listaItens");
    ul.innerHTML = "";

    itensPedido.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.nome} - R$ ${item.total.toFixed(2)}`;
      ul.appendChild(li);

      total += item.total;
      lucro += item.lucro;
    });

    document.getElementById("totalPedido").textContent = total.toFixed(2);
    document.getElementById("lucroPedido").textContent = lucro.toFixed(2);
  }

  window.salvarPedido = function () {
    alert("Pedido salvo com sucesso!");
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

    doc.setFontSize(14);
    doc.text("PEDIDO", 10, y);
    y += 10;

    itensPedido.forEach(item => {
      doc.text(`${item.nome} - R$ ${item.total.toFixed(2)}`, 10, y);
      y += 6;
    });

    doc.text(
      `Total: R$ ${document.getElementById("totalPedido").textContent}`,
      10,
      y + 6
    );
    doc.text(
      `Lucro: R$ ${document.getElementById("lucroPedido").textContent}`,
      10,
      y + 12
    );

    doc.save("pedido.pdf");
  };

});
