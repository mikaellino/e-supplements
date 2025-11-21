import React from 'react';
import ProductList from '../components/ProductList';
import { useProduct } from '../context/ProductContext';

const Vitaminas: React.FC = () => {
  const { products } = useProduct();
  const vitaminasProducts = products.filter(p => p.category_id === 3);

  return (
    <div>
      <ProductList products={vitaminasProducts} title="Vitaminas" />
    </div>
  );
};

export default Vitaminas;