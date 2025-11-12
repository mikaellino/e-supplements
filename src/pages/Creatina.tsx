import React from 'react';
import ProductList from '../components/ProductList';
import wheyDefaultImage from '../assets/wheypadrao.webp';

const creatineProducts = [
  {
    id: 101,
    name: 'Creatina Monohidratada 300g',
    price: 49.90,
    image: wheyDefaultImage,
    quantity: 45,
  },
  {
    id: 102,
    name: 'Creatina Monohidratada 1kg',
    price: 129.90,
    image: wheyDefaultImage,
    quantity: 25,
  },
  {
    id: 103,
    name: 'Creatina Micronizada',
    price: 79.90,
    image: wheyDefaultImage,
    quantity: 35,
  },
  {
    id: 104,
    name: 'Creatina com Transportador',
    price: 99.90,
    image: wheyDefaultImage,
    quantity: 20,
  },
  {
    id: 105,
    name: 'Creatina Buffered (pH-X)',
    price: 119.90,
    image: wheyDefaultImage,
    quantity: 30,
  },
];

const Creatina: React.FC = () => {
  return (
    <div>
      <ProductList products={creatineProducts} title="Creatina" />
    </div>
  );
};

export default Creatina;
