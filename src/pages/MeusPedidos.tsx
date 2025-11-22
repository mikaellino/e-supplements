
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  products: {
    name: string;
    image: string;
  };
}

interface Order {
  id: number;
  created_at: string;
  total: number;
  status: string;
  order_items: OrderItem[];
}

const MeusPedidos: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  async function fetchOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            quantity,
            price,
            products (
              name,
              image
            )
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setOrders(data);
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="text-orange-500">📦</span> Meus Pedidos
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-xl">
            <p className="text-zinc-400 text-lg">Você ainda não fez nenhum pedido.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="glass-card rounded-xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-300">
                <div className="bg-zinc-900/50 px-6 py-4 border-b border-white/5 flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <span className="text-sm text-orange-500 font-bold uppercase tracking-wider">Pedido #{order.id}</span>
                    <p className="text-xs text-zinc-400">
                      {new Date(order.created_at).toLocaleDateString('pt-BR')} às {new Date(order.created_at).toLocaleTimeString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      order.status === 'Entregue' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                      order.status === 'Em Trânsito' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                      'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Itens do Pedido:</h4>
                      <ul className="space-y-3">
                        {order.order_items.map((item) => (
                          <li key={item.id} className="text-zinc-400 text-sm flex items-center gap-3">
                            <img 
                              src={item.products?.image || 'https://via.placeholder.com/40'} 
                              alt={item.products?.name}
                              className="w-10 h-10 rounded bg-zinc-800 object-cover"
                            />
                            <div>
                              <p className="text-white font-medium">{item.products?.name}</p>
                              <p className="text-xs">
                                {item.quantity}x R$ {item.price.toFixed(2)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right w-full md:w-auto bg-zinc-900/50 p-4 rounded-lg border border-white/5">
                      <p className="text-xs text-zinc-500 uppercase">Total do Pedido</p>
                      <p className="text-2xl font-black text-white">R$ {order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5">
                    <button className="text-zinc-400 text-sm font-semibold hover:text-white hover:underline transition-colors">
                      Ver Detalhes
                    </button>
                    <button className="btn-primary px-6 py-2 rounded-lg text-sm font-bold shadow-lg">
                      Comprar Novamente
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeusPedidos;