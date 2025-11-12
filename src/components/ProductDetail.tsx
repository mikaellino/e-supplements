import React from 'react';
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
      cartQuantity: 1,
    });
    alert(`✅ ${selectedProduct.name} adicionado ao carrinho!`);
  };

  const nutrition = getNutritionData();
  const specs = getSpecifications();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 py-8">
      <div className="container mx-auto px-8">
        {/* Botão Voltar */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="mb-6 flex items-center gap-2 text-orange-700 hover:text-orange-900 font-semibold transition"
        >
          ← Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Seção Esquerda - Imagem */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-96 object-cover rounded-xl mb-6"
              />
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-4 px-6 rounded-full hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🛒 Adicionar ao Carrinho
              </button>
            </div>
          </div>

          {/* Seção Direita - Detalhes */}
          <div className="space-y-8">
            {/* Título e Preço */}
            <div>
              <h1 className="text-4xl font-bold text-orange-900 mb-2">{selectedProduct.name}</h1>
              <p className="text-gray-600 mb-4">SKU: {String(selectedProduct.id).padStart(5, '0')}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-green-600">R$ {selectedProduct.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">Em estoque: {selectedProduct.quantity} unidades</span>
              </div>
            </div>

            {/* Especificações */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-orange-900 mb-4">Especificações</h2>
              <div className="space-y-3">
                {specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-orange-100 last:border-b-0">
                    <span className="font-semibold text-gray-700">{spec.label}:</span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabela Nutricional */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-orange-900 mb-4">Informação Nutricional</h2>
              <p className="text-sm text-gray-600 mb-4">Por porção (30g)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-orange-600 bg-orange-50">
                      <th className="text-left py-2 px-3 font-bold text-orange-900">Nutriente</th>
                      <th className="text-right py-2 px-3 font-bold text-orange-900">Quantidade</th>
                      <th className="text-right py-2 px-3 font-bold text-orange-900">% VD*</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(nutrition).map(([key, data]) => (
                      <tr key={key} className="border-b border-orange-100 hover:bg-orange-50 transition">
                        <td className="py-3 px-3 text-gray-800">{data.description}</td>
                        <td className="text-right py-3 px-3 text-gray-700 font-semibold">
                          {data.value} {data.unit}
                        </td>
                        <td className="text-right py-3 px-3 text-gray-600">
                          {Math.round(Math.random() * 40 + 10)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-3">*% Valores Diários de referência para uma dieta de 2000 kcal ou 8400 kJ.</p>
            </div>

            {/* Benefícios */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Benefícios</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Alta qualidade e pureza garantida</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Absorção rápida e eficaz</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Resultado comprovado em atletas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Melhor custo-benefício do mercado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
