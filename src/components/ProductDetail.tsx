import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

interface NutrientData {
  [key: string]: {
    value: string;
    unit: string;
    description: string;
  };
}

const ProductDetail: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useProduct();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  // Dados nutricionais fictícios variam por tipo de produto
  const getNutritionData = (): NutrientData => {
    const baseNutrition: NutrientData = {
      energia: { value: '110', unit: 'kcal', description: 'Energia' },
      proteína: { value: '24', unit: 'g', description: 'Proteína' },
      carboidrato: { value: '2', unit: 'g', description: 'Carboidrato' },
      gordura: { value: '1', unit: 'g', description: 'Gordura Total' },
      gorduraSaturada: { value: '0.5', unit: 'g', description: 'Gordura Saturada' },
      sodio: { value: '150', unit: 'mg', description: 'Sódio' },
      calcio: { value: '200', unit: 'mg', description: 'Cálcio' },
      ferro: { value: '3', unit: 'mg', description: 'Ferro' },
    };

    // Variar ligeiramente os valores conforme o tipo de produto
    if (selectedProduct.id <= 6) {
      // Whey Protein
      baseNutrition.proteína.value = '25';
      baseNutrition.carboidrato.value = '1.5';
    } else if (selectedProduct.id <= 11) {
      // Creatina
      baseNutrition.energia.value = '4';
      baseNutrition.proteína.value = '0';
      baseNutrition.carboidrato.value = '0';
    } else if (selectedProduct.id <= 17) {
      // Vitaminas
      baseNutrition.proteína.value = '0';
      baseNutrition.carboidrato.value = '1';
      baseNutrition.energia.value = '5';
    } else {
      // Pré-Treino
      baseNutrition.energia.value = '15';
      baseNutrition.carboidrato.value = '3.5';
      baseNutrition.proteína.value = '0.5';
    }

    return baseNutrition;
  };

  const getSpecifications = () => {
    const baseSpecs = [
      { label: 'Marca', value: 'E-Supplements Premium' },
      { label: 'Sabor', value: 'Chocolate' },
      { label: 'Formato', value: 'Pó' },
      { label: 'Peso Líquido', value: '900g' },
      { label: 'Serviços por Embalagem', value: '30' },
      { label: 'Tempo de Validade', value: '2 anos' },
    ];

    // Personalizar especificações por tipo de produto
    if (selectedProduct.id <= 6) {
      baseSpecs[1] = { label: 'Sabor', value: 'Chocolate ou Morango' };
      baseSpecs[3] = { label: 'Peso Líquido', value: '900g ou 2kg' };
    } else if (selectedProduct.id <= 11) {
      baseSpecs[1] = { label: 'Tipo', value: 'Monohidratada Pura' };
      baseSpecs[2] = { label: 'Formato', value: 'Pó Cristalino' };
    }

    return baseSpecs;
  };

  const handleAddToCart = () => {
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      quantity: selectedProduct.quantity,
      cartQuantity: quantity,
    });
    alert(`✅ ${selectedProduct.name} adicionado ao carrinho!`);
  };

  const nutrition = getNutritionData();
  const specs = getSpecifications();

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Botão Voltar */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="mb-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar para a lista
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Seção Esquerda - Imagem */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-transparent rounded-3xl blur-2xl"></div>
            <div className="relative glass-card rounded-3xl p-8 flex items-center justify-center h-[600px] group overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-contain drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Seção Direita - Detalhes */}
          <div className="space-y-8">
            {/* Header do Produto */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm font-bold uppercase tracking-wider border border-orange-500/20">
                  Premium Quality
                </span>
                <span className="text-zinc-500 text-sm">SKU: {String(selectedProduct.id).padStart(5, '0')}</span>
              </div>
              
              <h1 className="text-5xl font-black text-white mb-4 leading-tight">{selectedProduct.name}</h1>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {selectedProduct.description || 'Potencialize seus treinos com a máxima pureza e absorção. Desenvolvido para atletas que buscam performance superior.'}
              </p>
            </div>

            {/* Preço e Ações */}
            <div className="glass-card p-6 rounded-2xl border-l-4 border-orange-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-zinc-400 text-sm mb-1">Preço por unidade</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">R$ {selectedProduct.price.toFixed(2)}</span>
                    <span className="text-zinc-500 line-through text-lg">R$ {(selectedProduct.price * 1.2).toFixed(2)}</span>
                  </div>
                  <p className="text-green-500 text-sm mt-2 font-medium">
                    ✓ Em estoque: {selectedProduct.quantity} unidades
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                  {/* Seletor de Quantidade */}
                  <div className="flex items-center bg-zinc-900 rounded-lg p-1 border border-zinc-700 w-full md:w-48">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors text-xl font-bold"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center font-bold text-white text-xl">{quantity}</div>
                    <button 
                      onClick={() => setQuantity(Math.min(selectedProduct.quantity, quantity + 1))}
                      className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors text-xl font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="btn-primary w-full md:w-48 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Adicionar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs / Informações */}
            <div className="space-y-6">
              {/* Especificações */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-orange-500">📋</span> Especificações
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specs.map((spec, idx) => (
                    <div key={idx} className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                      <span className="text-zinc-400">{spec.label}</span>
                      <span className="font-bold text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabela Nutricional */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-orange-500">⚡</span> Informação Nutricional <span className="text-sm font-normal text-zinc-500">(Porção 30g)</span>
                </h3>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-900 text-zinc-400 uppercase">
                      <tr>
                        <th className="px-6 py-3">Nutriente</th>
                        <th className="px-6 py-3 text-right">Qtd</th>
                        <th className="px-6 py-3 text-right">% VD*</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-zinc-900/50">
                      {Object.entries(nutrition).map(([key, data]) => (
                        <tr key={key} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-white">{data.description}</td>
                          <td className="px-6 py-4 text-right text-zinc-300">{data.value} {data.unit}</td>
                          <td className="px-6 py-4 text-right text-zinc-500">{Math.round(Math.random() * 40 + 10)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
