import React from 'react';
import ProductList from '../components/ProductList';
import { useProduct } from '../context/ProductContext';

const Creatina: React.FC = () => {
  const { products } = useProduct();
  const creatinaProducts = products.filter(p => p.category_id === 2);

  return (
    <div>
      <ProductList products={creatinaProducts} title="Creatina" />
    </div>
  );
};

export default Creatina;