document.addEventListener("DOMContentLoaded", function () {

  window.mostrar = function (id) {
    document.querySelectorAll('.tela').forEach(t => t.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  };

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

  const categoriaSelect = document.getElementById("categoriaSelect");
  const produtoSelect = document.getElementById("produtoSelect");
  const listaProdutos = document.getElementById("listaProdutos");

  Object.keys(categorias).forEach(cat => {
    categoriaSelect.innerHTML += `<option>${cat}</option>`;
    listaProdutos.innerHTML += `<p><strong>${cat}</strong> – ${categorias[cat].length} produtos</p>`;
  });

  function atualizarProdutos() {
    produtoSelect.innerHTML = "";
    categorias[categoriaSelect.value].forEach((p, i) => {
      produtoSelect.innerHTML += `<option value="${i}">${p.nome}</option>`;
    });
    atualizarCustos();
  }

  categoriaSelect.addEventListener("change", atualizarProdutos);

  function atualizarCustos() {
    const p = categorias[categoriaSelect.value][produtoSelect.value];
    document.getElementById("custoCaixa").textContent = p.custo_caixa.toFixed(2);
    document.getElementById("custoUnitario").textContent = (p.custo_caixa / p.unidades).toFixed(2);
  }

  produtoSelect.addEventListener("change", atualizarCustos);
  atualizarProdutos();

  let itensPedido = [];

  window.adicionarItem = function () {
    const p = categorias[categoriaSelect.value][produtoSelect.value];
    const tipo = document.getElementById("tipoVenda").value;
    const qtd = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("precoVenda").value);

    const custo = tipo === "caixa" ? p.custo_caixa : p.custo_caixa / p.unidades;
    const total = preco * qtd;
    const lucro = (preco - custo) * qtd;

    itensPedido.push({ nome: p.nome, total, lucro });
    atualizarPedido();
  };

  function atualizarPedido() {
    let total = 0, lucro = 0;
    const ul = document.getElementById("listaItens");
    ul.innerHTML = "";

    itensPedido.forEach(i => {
      ul.innerHTML += `<li>${i.nome} – R$ ${i.total.toFixed(2)}</li>`;
      total += i.total;
      lucro += i.lucro;
    });

    document.getElementById("totalPedido").textContent = total.toFixed(2);
    document.getElementById("lucroPedido").textContent = lucro.toFixed(2);
  }

  window.salvarPedido = function () {
    alert("Pedido salvo");
    itensPedido = [];
    atualizarPedido();
  };

  window.gerarPDF = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;
    doc.text("PEDIDO", 10, y);
    y += 10;

    itensPedido.forEach(i => {
      doc.text(`${i.nome} - R$ ${i.total.toFixed(2)}`, 10, y);
      y += 6;
    });

    doc.text(`Total: R$ ${document.getElementById("totalPedido").textContent}`, 10, y + 6);
    doc.save("pedido.pdf");
  };

});
