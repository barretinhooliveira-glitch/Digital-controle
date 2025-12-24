function mostrar(id) {
  document.querySelectorAll('.tela').forEach(t => t.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

const produtos = [
  { codigo: "601000", nome: "Creme de Alho Sem Ardor", custo: 72 },
  { codigo: "601001", nome: "Creme de Alho Picante", custo: 72 }
];

const lista = document.getElementById("listaProdutos");

produtos.forEach(p => {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${p.nome}</strong><br>Custo caixa: R$ ${p.custo}`;
  lista.appendChild(div);
});
