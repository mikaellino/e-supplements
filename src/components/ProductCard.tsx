import React from 'react';
import { useCart } from '../context/CartContext';
import { useProduct } from '../context/ProductContext';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, quantity }) => {
  const { addToCart } = useCart();
  const { setSelectedProduct } = useProduct();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id,
      name,
      price,
      image,
      quantity,
      cartQuantity: 1,
    });
  };

  const handleViewDetails = () => {
    setSelectedProduct({ id, name, price, image, quantity });
  };

  return (
    <div 
      onClick={handleViewDetails}
      className="bg-white border border-orange-200 rounded-xl shadow-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
      <h3 className="text-xl font-bold text-orange-900 mb-2">{name}</h3>
      <p className="text-orange-700 font-bold text-2xl mb-3">R$ {price.toFixed(2)}</p>
      <p className="text-sm text-orange-600 mb-4 bg-orange-50 px-3 py-1 rounded-full">Em estoque: {quantity}</p>
      <button
        onClick={handleAddToCart}
        className="bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-3 px-6 rounded-full hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        🛒 Adicionar ao carrinho
      </button>
      <p className="text-xs text-gray-500 mt-2 italic">Clique para ver detalhes</p>
    </div>
  );
};

export default ProductCard;