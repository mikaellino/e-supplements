// src/pages/Whey.tsx

import React from 'react';
import ProductList from '../components/ProductList';
import wheyDefaultImage from '../assets/wheypadrao.webp';

const wheyProducts = [
  {
    id: 1,
    name: 'Whey Protein Concentrado',
    price: 129.90,
    image: wheyDefaultImage,
    quantity: 50,
  },
  {
    id: 2,
    name: 'Whey Protein Isolado',
    price: 189.90,
    image: wheyDefaultImage,
    quantity: 30,
  },
  {
    id: 3,
    name: 'Blend de Proteínas',
    price: 109.90,
    image: wheyDefaultImage,
    quantity: 75,
  },
];

const Whey: React.FC = () => {
  return (
    <div>
      <ProductList products={wheyProducts} title="Whey Protein" />
    </div>
  );
};

export default Whey;