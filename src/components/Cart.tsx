import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onNavigate }) => {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { isLoggedIn, user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleFinalizePurchase = async () => {
    if (!isLoggedIn || !user) {
      onClose(); 
      alert("Por favor, faça login para continuar.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      onNavigate('checkout');
    }, 1000);
  };

  const handleDeleteItem = (itemId: number) => {
    if (window.confirm('Remover este item do carrinho?')) {
      removeFromCart(itemId);
    }
  };

  const handleQuantityChange = (itemId: number, newQuantity: number, stock: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > stock) {
      alert(`Desculpe, só temos ${stock} unidades em estoque.`);
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Cart Panel */}
      <div className="relative w-full max-w-md bg-zinc-900 h-full shadow-2xl flex flex-col border-l border-white/10 transform transition-transform duration-300 ease-out">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900/50 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🛒 Seu Carrinho
            <span className="text-sm font-normal text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full">
              {items.length} itens
            </span>
          </h2>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
              <div className="text-6xl opacity-20">🛒</div>
              <p className="text-lg">Seu carrinho está vazio.</p>
              <button 
                onClick={onClose}
                className="text-orange-500 hover:text-orange-400 font-bold hover:underline"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="bg-zinc-800/50 border border-white/5 rounded-xl p-4 flex gap-4 hover:border-orange-500/30 transition-colors">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-zinc-700" />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white line-clamp-1">{item.name}</h3>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-zinc-500 hover:text-red-500 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <p className="text-orange-500 font-bold mb-3">R$ {item.price.toFixed(2)}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-zinc-900 rounded-lg p-1 border border-white/5">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.cartQuantity - 1, item.quantity)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        max={item.quantity}
                        value={item.cartQuantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1, item.quantity)}
                        className="w-12 text-center bg-transparent text-white font-bold outline-none text-sm"
                      />
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.cartQuantity + 1, item.quantity)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs text-zinc-500">
                      Subtotal: <span className="text-zinc-300 font-bold">R$ {(item.price * item.cartQuantity).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-zinc-900 border-t border-white/10 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="text-zinc-400">Total</span>
              <span className="text-2xl font-black text-white">R$ {total.toFixed(2)}</span>
            </div>
            
            <button
              onClick={handleFinalizePurchase}
              disabled={isProcessing}
              className="w-full btn-primary py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processando...
                </>
              ) : (
                <>Finalizar Compra ➔</>
              )}
            </button>
            
            <button 
              onClick={clearCart}
              className="w-full text-zinc-500 hover:text-red-500 text-sm font-medium transition-colors"
            >
              Limpar Carrinho
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;