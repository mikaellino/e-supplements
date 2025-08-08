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
    <div className="border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center text-center">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 font-bold text-lg mb-4">R$ {price.toFixed(2)}</p>
      <p className="text-sm text-gray-500 mb-4">Em stock: {quantity}</p>
      <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
        Adicionar ao carrinho
      </button>
    </div>
  );
};

export default ProductCard;