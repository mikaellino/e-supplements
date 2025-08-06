// src/components/ProductList.tsx

import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: 'Suplemento de Proteína',
    price: 99.90,
    image: 'https://via.placeholder.com/300/4a4a4a/ffffff?text=Suplemento+1'
  },
  {
    id: 2,
    name: 'Pré-Treino',
    price: 69.90,
    image: 'https://via.placeholder.com/300/4a4a4a/ffffff?text=Suplemento+2'
  },
  {
    id: 3,
    name: 'Creatina Monohidratada',
    price: 49.90,
    image: 'https://via.placeholder.com/300/4a4a4a/ffffff?text=Suplemento+3'
  },
  {
    id: 4,
    name: 'Vitaminas e Minerais',
    price: 39.90,
    image: 'https://via.placeholder.com/300/4a4a4a/ffffff?text=Suplemento+4'
  },
];

const ProductList: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Nossos Produtos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;