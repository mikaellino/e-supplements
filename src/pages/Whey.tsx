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
  {
    id: 4,
    name: 'Whey Isolado Premium',
    price: 219.90,
    image: wheyDefaultImage,
    quantity: 25,
  },
  {
    id: 5,
    name: 'Whey Protein Hidrolisado',
    price: 249.90,
    image: wheyDefaultImage,
    quantity: 20,
  },
  {
    id: 6,
    name: 'Whey Gourmet Chocolate',
    price: 139.90,
    image: wheyDefaultImage,
    quantity: 40,
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