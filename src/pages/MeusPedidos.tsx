import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Order {
  id: number;
  total_amount: string;
  status: string;
  created_at: string;
  items_summary: string;
}

const MeusPedidos: React.FC = () => {
  const { logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch('http://localhost:3000/api/my-orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.status === 401 || res.status === 403) {
        logout();
        throw new Error("Sessão expirada");
      }
      return res.json();
    })
    .then(data => {
      setOrders(data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center py-10">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-900 mb-8">Meus Pedidos</h2>
        
        {orders.length === 0 ? (
          <p className="text-gray-600">Você ainda não fez nenhuma compra.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Pedido #{order.id}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(order.created_at).toLocaleDateString('pt-BR')} às {new Date(order.created_at).toLocaleTimeString('pt-BR')}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {order.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700">Itens:</p>
                  <p className="text-gray-600">{order.items_summary}</p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total da Compra</span>
                  <span className="text-2xl font-bold text-orange-600">
                    R$ {parseFloat(order.total_amount).toFixed(2)}
                  </span>
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