import React from 'react';


const MeusPedidos: React.FC = () => {


  // Mock de pedidos
  const orders = [
    {
      id: 101,
      date: '2023-10-25',
      total: 149.90,
      status: 'Entregue',
      items: ['Whey Protein Isolado', 'Creatina Monohidratada']
    },
    {
      id: 102,
      date: '2023-11-05',
      total: 89.90,
      status: 'Em Trânsito',
      items: ['Pré-Treino Insane']
    },
    {
      id: 103,
      date: '2023-11-15',
      total: 210.00,
      status: 'Processando',
      items: ['Multivitamínico', 'Whey Protein Concentrado', 'BCAA']
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="text-orange-500">📦</span> Meus Pedidos
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="glass-card rounded-xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-300">
              <div className="bg-zinc-900/50 px-6 py-4 border-b border-white/5 flex justify-between items-center">
                <div>
                  <span className="text-sm text-orange-500 font-bold uppercase tracking-wider">Pedido #{order.id}</span>
                  <p className="text-xs text-zinc-400">{order.date}</p>
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
                  <div>
                    <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Itens do Pedido:</h4>
                    <ul className="space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="text-zinc-400 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                          {item}
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
      </div>
    </div>
  );
};

export default MeusPedidos;