import React from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image, quantity }) => {
  return (
    <div className="bg-white border border-orange-200 rounded-xl shadow-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
      <h3 className="text-xl font-bold text-orange-900 mb-2">{name}</h3>
      <p className="text-orange-700 font-bold text-2xl mb-3">R$ {price.toFixed(2)}</p>
      <p className="text-sm text-orange-600 mb-4 bg-orange-50 px-3 py-1 rounded-full">Em estoque: {quantity}</p>
      <button className="bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-3 px-6 rounded-full hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
        Adicionar ao carrinho
      </button>
    </div>
  );
};

export default ProductCard;