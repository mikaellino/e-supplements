import React from 'react';
import ProductList from '../components/ProductList';
import { useProduct } from '../context/ProductContext';

const PreTreino: React.FC = () => {
  const { products } = useProduct();
  const preTreinoProducts = products.filter(p => p.category_id === 4);

  return (
    <div>
      <ProductList products={preTreinoProducts} title="Pré-Treino" />
    </div>
  );
};

export default PreTreino;