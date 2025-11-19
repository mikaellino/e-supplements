import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFinalizePurchase = async () => {
    if (!isLoggedIn || !user) {
      setLoginOpen(true);
      return;
    }

    setIsProcessing(true);

    try {
      const payload = {
        userId: user.id,
        items: items.map(item => ({
          id: item.id,
          quantity: item.cartQuantity,
          price: item.price
        }))
      };

      const response = await fetch('http://localhost:3000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ ${data.message} (Pedido #${data.orderId})`);
        clearCart();
        onClose();
      } else {
        alert(`Erro: ${data.error}`);
      }

    } catch (error) {
      console.error("Erro na compra:", error);
      alert("Erro de conexão ao finalizar compra.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
        <div className="bg-white w-96 h-full shadow-2xl flex flex-col">
          <div className="p-6 border-b border-orange-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-orange-900">Carrinho</h2>
            <button
              onClick={onClose}
              className="text-2xl text-gray-500 hover:text-gray-700 transition"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-center text-gray-500 text-lg">
                  🛒 Carrinho vazio
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="border border-orange-200 rounded-lg p-3 hover:shadow-md transition">
                    {/* Imagem do Produto */}
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <h3 className="font-semibold text-orange-900 text-sm">{item.name}</h3>
                    <p className="text-orange-600 font-bold mb-2">R$ {item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                        className="bg-orange-200 px-2 py-1 rounded hover:bg-orange-300 transition text-sm font-semibold"
                      >
                        −
                      </button>
                      <span className="flex-1 text-center font-semibold">{item.cartQuantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                        className="bg-orange-200 px-2 py-1 rounded hover:bg-orange-300 transition text-sm font-semibold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 text-xs font-semibold transition"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-orange-200 p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-orange-900">Subtotal:</span>
                <span className="font-bold text-orange-600">R$ {total.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={handleFinalizePurchase}
                disabled={isProcessing}
                className={`w-full text-white py-3 rounded-lg font-semibold transition shadow-lg
                  ${isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                  }`}
              >
                {isProcessing ? 'Processando...' : (isLoggedIn ? '✓ Finalizar Compra' : '🔒 Finalizar Compra (Login)')}
              </button>
              
              <button
                onClick={clearCart}
                className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Limpar Carrinho
              </button>
            </div>
          )}
        </div>
      </div>
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Cart;