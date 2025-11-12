import React from 'react';
import ProductList from '../components/ProductList';
import wheyDefaultImage from '../assets/wheypadrao.webp';

const preworkoutProducts = [
  {
    id: 301,
    name: 'Pré-Treino Explosivo 300g',
    price: 99.90,
    image: wheyDefaultImage,
    quantity: 40,
  },
  {
    id: 302,
    name: 'Pré-Treino C4 Original',
    price: 139.90,
    image: wheyDefaultImage,
    quantity: 25,
  },
  {
    id: 303,
    name: 'Cafeína Pura 100g',
    price: 59.90,
    image: wheyDefaultImage,
    quantity: 50,
  },
  {
    id: 304,
    name: 'Beta-Alanina Premium',
    price: 79.90,
    image: wheyDefaultImage,
    quantity: 35,
  },
  {
    id: 305,
    name: 'Pré-Treino com DMAA',
    price: 149.90,
    image: wheyDefaultImage,
    quantity: 20,
  },
  {
    id: 306,
    name: 'L-Arginina 500g',
    price: 69.90,
    image: wheyDefaultImage,
    quantity: 45,
  },
];

const PreTreino: React.FC = () => {
  return (
    <div>
      <ProductList products={preworkoutProducts} title="Pré-Treino" />
    </div>
  );
};

export default PreTreino;
