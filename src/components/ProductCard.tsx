import React from 'react';
import { useCart } from '../context/CartContext';
import { useProduct } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onProductDeleted?: () => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, quantity, onProductDeleted }) => {
  const { addToCart } = useCart();
  const { setSelectedProduct } = useProduct();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, name, price, image, quantity, cartQuantity: 1 });
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if(!confirm('Tem certeza que deseja excluir este produto?')) return;

    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
            alert('Produto removido!');
            if (onProductDeleted) onProductDeleted();
        } else {
            const data = await res.json();
            alert(`Erro: ${data.error}`);
        }
    } catch (err) {
        alert('Erro ao deletar.');
    }
  };

  return (
    <div 
      onClick={() => setSelectedProduct({ id, name, price, image, quantity })}
      className="bg-white border border-orange-200 rounded-xl shadow-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer relative"
    >
      {/* BOTÃO DE DELETE (SÓ PARA ADMIN) */}
      {user?.role === 'admin' && (
          <button 
            onClick={handleDelete}
            className="absolute top-2 right-2 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition z-10"
            title="Excluir Produto"
          >
            ✕
          </button>
      )}

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
    </div>
  );
};

export default ProductCard;