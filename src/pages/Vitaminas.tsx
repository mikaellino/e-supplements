import React from 'react';
import ProductList from '../components/ProductList';
import wheyDefaultImage from '../assets/wheypadrao.webp';

const vitaminesProducts = [
  {
    id: 201,
    name: 'Vitamina C 1000mg',
    price: 39.90,
    image: wheyDefaultImage,
    quantity: 60,
  },
  {
    id: 202,
    name: 'Vitamina D3 2000 IU',
    price: 59.90,
    image: wheyDefaultImage,
    quantity: 40,
  },
  {
    id: 203,
    name: 'Complexo B Premium',
    price: 49.90,
    image: wheyDefaultImage,
    quantity: 50,
  },
  {
    id: 204,
    name: 'Ômega 3 1000mg',
    price: 69.90,
    image: wheyDefaultImage,
    quantity: 35,
  },
  {
    id: 205,
    name: 'Multivitamínico Completo',
    price: 89.90,
    image: wheyDefaultImage,
    quantity: 45,
  },
  {
    id: 206,
    name: 'Ferro + Vitamina C',
    price: 44.90,
    image: wheyDefaultImage,
    quantity: 55,
  },
];

const Vitaminas: React.FC = () => {
  return (
    <div>
      <ProductList products={vitaminesProducts} title="Vitaminas" />
    </div>
  );
};

export default Vitaminas;
