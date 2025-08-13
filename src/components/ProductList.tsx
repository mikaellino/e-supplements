import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ProductListProps {
  products: Product[];
  title: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, title }) => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            quantity={product.quantity}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;