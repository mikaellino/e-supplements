import React from 'react';
import ProductCard from './ProductCard';
import { type Product } from '../context/ProductContext';

interface ProductListProps {
  products: Product[];
  title: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, title }) => {
  return (
    <div className="p-8 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
            {title} <span className="text-orange-600">.</span>
          </h2>
          <div className="h-1 flex-grow ml-8 bg-gradient-to-r from-orange-600/50 to-transparent rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              quantity={product.quantity}
              category_id={product.category_id}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;