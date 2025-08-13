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
    <div className="min-h-screen bg-gradient-to-b from-orange-900 to-orange-400 py-12">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-white drop-shadow-lg">{title}</h2>
        <p className="text-center text-orange-100 mb-12 text-lg">Descubra nossa seleção premium de produtos</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
    </div>
  );
};

export default ProductList;