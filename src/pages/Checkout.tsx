import React, { useState } from 'react';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();

  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCepBlur = async () => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress(prev => ({
            ...prev,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      }
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulação de processamento
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="glass-card max-w-lg w-full p-8 rounded-2xl text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Pedido Confirmado!</h2>
          <p className="text-zinc-400 mb-8">
            Obrigado pela sua compra, {user?.name}! <br/>
            Você receberá um email com os detalhes do pedido.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-primary px-8 py-3 rounded-full w-full"
          >
            Voltar para a Loja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="text-orange-500">💳</span> Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Endereço e Pagamento */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Endereço */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                📍 Endereço de Entrega
              </h2>
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">CEP</label>
                    <input
                      type="text"
                      value={cep}
                      onChange={e => setCep(e.target.value.replace(/\D/g, ''))}
                      onBlur={handleCepBlur}
                      maxLength={8}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="00000-000"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Rua</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={e => setAddress({...address, street: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Número</label>
                    <input
                      type="text"
                      value={address.number}
                      onChange={e => setAddress({...address, number: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Complemento</label>
                    <input
                      type="text"
                      value={address.complement}
                      onChange={e => setAddress({...address, complement: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Bairro</label>
                    <input
                      type="text"
                      value={address.neighborhood}
                      onChange={e => setAddress({...address, neighborhood: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Cidade</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={e => setAddress({...address, city: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Estado</label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={e => setAddress({...address, state: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Pagamento */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                💳 Forma de Pagamento
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'bg-orange-600/20 border-orange-500 text-white'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  <span className="text-2xl">💳</span>
                  <span className="font-bold">Cartão de Crédito</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                    paymentMethod === 'pix'
                      ? 'bg-orange-600/20 border-orange-500 text-white'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  <span className="text-2xl">💠</span>
                  <span className="font-bold">PIX</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-2xl sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded bg-zinc-800 object-cover" />
                      <span className="absolute -top-2 -right-2 bg-zinc-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.cartQuantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs text-zinc-400">R$ {item.price.toFixed(2)}</p>
                    </div>
                    <p className="text-sm font-bold text-orange-500">
                      R$ {(item.price * item.cartQuantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-700 pt-4 space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Frete</span>
                  <span className="text-green-500">Grátis</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-2">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing || items.length === 0}
                className="w-full mt-8 btn-primary py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
