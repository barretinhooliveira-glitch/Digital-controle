// ================== NAVEGAÇÃO ==================
function mostrar(id) {
  document.querySelectorAll('.tela').forEach(t => t.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// ================== PRODUTOS POR CATEGORIA ==================
const categorias = {
  "Linha 150ml (24 un)": [
    { nome: "Creme de Alho Sem Ardor", unidades: 24, custo_caixa: 72 },
    { nome: "Creme de Alho Picante", unidades: 24, custo_caixa: 72 },
    { nome: "Molho Barbecue Churrasco Picante", unidades: 24, custo_caixa: 72 },
    { nome: "Molho de Pimenta Bruta Super Picante", unidades: 24, custo_caixa: 72 },
    { nome: "Molho de Pimenta Cheiro Verde", unidades: 24, custo_caixa: 72 },
    { nome: "Molho de Pimenta Restaurante Extra Forte", unidades: 24, custo_caixa: 108 },
    { nome: "Molho de Pimenta Galinha Caipira Picante", unidades: 24, custo_caixa: 72 },
    { nome: "Molho de Pimenta Habanero Cremosa", unidades: 24, custo_caixa: 72 },
    { nome: "Molho de Pimenta Malagueta Cremosa Extra Picante", unidades: 24, custo_caixa: 72 },
    { nome: "Molho de Pimenta Extra Forte", unidades: 24, custo_caixa: 72 },
    { nome: "Molho de Pimenta Tradicional Extra Picante", unidades: 24, custo_caixa: 45.6 },
    { nome: "Molho de Alho", unidades: 24, custo_caixa: 45.6 },
    { nome: "Molho de Alho com Ervas", unidades: 24, custo_caixa: 45.6 },
    { nome: "Molho de Pimenta Suave", unidades: 24, custo_caixa: 72 },
    { nome: "Molho de Pimenta Caseira Extra Forte", unidades: 24, custo_caixa: 72 }
  ],

  "Linha 60ml Vidro (24 un)": [
    { nome: "Molho de Pimenta Baiana Super Picante", unidades: 24, custo_caixa: 108 },
    { nome: "Molho de Pimenta Vulcão Super Picante", unidades: 24, custo_caixa: 108 },
    { nome: "Molho de Pimenta Scorpion Super Picante", unidades: 24, custo_caixa: 144 },
    { nome: "Molho de Pimenta Moruga Super Picante", unidades: 24, custo_caixa: 108 },
    { nome: "Molho de Pimenta Insana Ultra Picante", unidades: 24, custo_caixa: 168 },
    { nome: "Molho de Pimenta Carolina Reaper Ultra Picante", unidades: 24, custo_caixa: 168 },
    { nome: "Molho de Pimenta com Pequi", unidades: 24, custo_caixa: 108 }
  ],

  "Top Down 330g (12 un)": [
    { nome: "Maionese de Alho Premium 330g", unidades: 12, custo_caixa: 84 },
    { nome: "Maionese Verde Temperada 330g", unidades: 12, custo_caixa: 84 },
    { nome: "BBQ Barbecue e Mel 400g", unidades: 12, custo_caixa: 90 },
    { nome: "Molho Ketchup Premium 400g", unidades: 12, custo_caixa: 96 },
    { nome: "Molho Ketchup Premium Picante 400g", unidades: 12, custo_caixa: 96 }
  ],

  "Top Down – Lançamentos": [
    { nome: "Molho para Churrasco Defumado", unidades: 12, custo_caixa: 84 },
    { nome: "Maionese Defumada", unidades: 12, custo_caixa: 84 },
    { nome: "Maionese Tradicional", unidades: 12, custo_caixa: 84 },
    { nome: "Molho Especial Burger", unidades: 12, custo_caixa: 84 },
    { nome: "Molho Especial Churrasco Picante", unidades: 12, custo_caixa: 84 },
    { nome: "Molho Especial de Alho", unidades: 12, custo_caixa: 84 },
    { nome: "Molho Especial do Chef Picante", unidades: 12, custo_caixa: 84 },
    { nome: "Maionese Light", unidades: 12, custo_caixa: 84 },
    { nome: "Molho Mostarda e Mel", unidades: 12, custo_caixa: 90 },
    { nome: "Molho Sweet Chilli", unidades: 12, custo_caixa: 84 }
  ],

  "Linha Premium 200ml (12 un)": [
    { nome: "Molho Habanero com Ervas Picante", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho de Pimenta Mexicana Super Picante", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho de Pequi com Ervas Picante", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho de Cebola Rose com Ervas Picante", unidades: 12, custo_caixa: 63 },
    { nome: "Molho de Alho com Ervas Sem Ardor", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho Barbecue Mexicano Extra Picante", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho de Pimenta Jalapeno Refogado", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho de Pimenta Malagueta Refogada", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho de Pimenta Scorpion Refogado", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho de Pimenta Calabresa", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho de Pimenta Sriracha Caramelizado", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho de Pimenta Chipotle Caramelizado", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho de Pimenta Caseiro", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho de Pimenta Acarajé", unidades: 12, custo_caixa: 63.6 },
    { nome: "Molho de Pimenta com Leite de Coco", unidades: 12, custo_caixa: 63.6 }
  ],

  "Temperos 450g (12 un)": [
    { nome: "Tempero Alho e Sal", unidades: 12, custo_caixa: 72 },
    { nome: "Tempero Alho e Pimenta de Cheiro", unidades: 12, custo_caixa: 72 },
    { nome: "Tempero Alho e Açafrão", unidades: 12, custo_caixa: 72 },
    { nome: "Tempero Completo com Pimenta", unidades: 12, custo_caixa: 72 },
    { nome: "Tempero Completo sem Pimenta", unidades: 12, custo_caixa: 72 },
    { nome: "Tempero Cheiro Verde", unidades: 12, custo_caixa: 72 }
  ],

  "Conservas 160g": [
    { nome: "Conserva de Pimenta Malagueta", unidades: 24, custo_caixa: 96 }
  ]
