import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  
  // Form States
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('1');
  const [image, setImage] = useState('/wheypadrao.webp');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          category_id: Number(category),
          name,
          description: 'Descrição adicionada pelo Admin',
          price: parseFloat(price),
          stock_quantity: Number(stock),
          image_url: image
        })
      });

      if (response.ok) {
        alert('✅ Produto Cadastrado!');
        setName(''); setPrice(''); setStock('');
      } else {
        const data = await response.json();
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      alert('Erro de conexão');
    }
  };

  if (user?.role !== 'admin') {
    return <div className="p-10 text-center text-red-600 font-bold">Acesso Restrito.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-orange-900 mb-6">Painel do Administrador</h1>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Adicionar Novo Produto</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">Nome do Produto</label>
            <input type="text" required className="w-full border p-2 rounded" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700">Preço (R$)</label>
              <input type="number" step="0.01" required className="w-full border p-2 rounded" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Estoque</label>
              <input type="number" required className="w-full border p-2 rounded" value={stock} onChange={e => setStock(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Categoria</label>
            <select className="w-full border p-2 rounded" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="1">Whey Protein</option>
              <option value="2">Creatina</option>
              <option value="3">Vitaminas</option>
              <option value="4">Pré-Treino</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Imagem (Caminho)</label>
            <select className="w-full border p-2 rounded" value={image} onChange={e => setImage(e.target.value)}>
              <option value="/wheypadrao.webp">Whey Padrão</option>
              <option value="/vitaminapadrao.webp">Vitamina Padrão</option>
              <option value="/pretreinopadrao.webp">Pré-Treino Padrão</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Usando imagens padrão por enquanto.</p>
          </div>

          <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded font-bold hover:bg-orange-700">
            Cadastrar Produto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;