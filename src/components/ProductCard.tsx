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
  category_id: number;
  description?: string;
  onProductDeleted?: () => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, quantity, category_id, description, onProductDeleted }) => {
  const { addToCart } = useCart();
  const { setSelectedProduct, deleteProduct } = useProduct();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, name, price, image, quantity, cartQuantity: 1 });
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if(!window.confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
        deleteProduct(id);
        if (onProductDeleted) onProductDeleted();
    } catch (err) {
        alert('Erro ao deletar.');
    }
  };

  return (
    <div 
      onClick={() => setSelectedProduct({ id, name, price, image, quantity, category_id, description })}
      className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer flex flex-col h-full"
    >
      {/* Admin Delete Button */}
      {user?.role === 'admin' && (
          <button 
            onClick={handleDelete}
            className="absolute top-3 right-3 z-20 bg-red-500/80 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition backdrop-blur-sm"
            title="Excluir Produto"
          >
            ✕
          </button>
      )}

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-zinc-800 p-4 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" 
        />
        
        {/* Quick Add Button (Visible on Hover) */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 z-20 bg-orange-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-orange-500 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
        >
          <span>Adicionar</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-500 transition-colors line-clamp-2">{name}</h3>
          <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{description || 'Suplemento de alta performance.'}</p>
        </div>
        
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-zinc-800">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Preço</p>
            <p className="text-2xl font-black text-white">
              R$ {price.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
             <span className={`text-xs font-bold px-2 py-1 rounded-full ${
               quantity > 0 
                 ? 'bg-green-500/10 text-green-500' 
                 : 'bg-red-500/10 text-red-500'
             }`}>
               {quantity > 0 ? 'Em Estoque' : 'Esgotado'}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;