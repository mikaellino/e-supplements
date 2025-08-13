import React from 'react';
import ProductCard from '../components/ProductCard';

const Whey: React.FC = () => {
  return (
    <div className="p-8 bg-gradient-to-b from-orange-900 to-orange-400 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Whey Protein
        </h1>
        <p className="text-gray-600 text-center mb-12 text-lg">
          Os melhores suplementos de proteína para seus treinos
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          <ProductCard
            id={1}
            name="Whey Protein Isolado"
            price={89.90}
            image="https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Whey+Isolado"
          />
          <ProductCard
            id={2}
            name="Whey Protein Concentrado"
            price={65.90}
            image="https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Whey+Concentrado"
          />
          <ProductCard
            id={3}
            name="Whey Protein Hidrolisado"
            price={120.90}
            image="https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Whey+Hidrolisado"
          />
          <ProductCard
            id={4}
            name="Whey Protein Blend"
            price={75.90}
            image="https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Whey+Blend"
          />
        </div>
      </div>
    </div>
  );
};

export default Whey;
