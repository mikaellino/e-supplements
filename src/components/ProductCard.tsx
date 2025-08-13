import React from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
  return (
    <div className="w-64 border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center text-center bg-white hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md mb-3" />
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{name}</h3>
      <p className="text-orange-600 font-bold text-xl mb-4">R$ {price.toFixed(2)}</p>
      <button className="bg-orange-600 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-700 transition-colors duration-300 w-full">
        Adicionar ao carrinho
      </button>
    </div>
  );
};

export default ProductCard;