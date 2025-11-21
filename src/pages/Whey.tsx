import React from 'react';
import ProductList from '../components/ProductList';
import { useProduct } from '../context/ProductContext';

const Whey: React.FC = () => {
  const { products } = useProduct();
  const wheyProducts = products.filter(p => p.category_id === 1);

  return (
    <div>
      <ProductList products={wheyProducts} title="Whey Protein" />
    </div>
  );
};

export default Whey;