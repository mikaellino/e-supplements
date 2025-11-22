import React, { useState } from 'react';
import { useProduct, type Product } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const AdminPanel: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProduct();
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('1');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  // Se não for admin, não mostra nada (ou redireciona)
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Acesso Negado</h1>
          <p className="text-zinc-400">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  const handleEdit = (product: Product) => {
    setIsEditing(true);
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
    setStock(product.quantity.toString());
    setCategory(product.category_id?.toString() || '1');
    setImage(product.image);
    setDescription(product.description || '');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setName('');
    setPrice('');
    setStock('');
    setCategory('1');
    setImage('');
    setDescription('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const productData = {
      name,
      price: parseFloat(price),
      quantity: parseInt(stock),
      category_id: parseInt(category),
      image,
      description
    };

    try {
      if (isEditing && editId) {
        await updateProduct({ ...productData, id: editId });
        alert('Produto atualizado com sucesso!');
      } else {
        await addProduct(productData);
        alert('Produto criado com sucesso!');
      }
      handleCancelEdit();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar produto.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error(error);
        alert('Erro ao excluir produto.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
          <span className="text-orange-500">⚙️</span> Painel Administrativo
        </h1>

        {/* Formulário */}
        <div className="glass-card p-8 rounded-2xl mb-12 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
            {isEditing ? '✏️ Editar Produto' : '➕ Novo Produto'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">Nome do Produto</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">Estoque</label>
                <input
                  type="number"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">Categoria</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none"
                >
                  <option value="1">Whey Protein</option>
                  <option value="2">Creatina</option>
                  <option value="3">Vitaminas</option>
                  <option value="4">Pré-Treino</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">URL da Imagem</label>
                <input
                  type="text"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">Descrição</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              ></textarea>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed
                  ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'btn-primary'}
                `}
              >
                {isLoading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Cadastrar Produto')}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                  className="px-6 py-3 rounded-xl font-bold text-zinc-400 bg-zinc-800 hover:bg-zinc-700 hover:text-white transition-all"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Produtos */}
        <div className="glass-card p-8 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">📋 Gerenciar Produtos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-zinc-500 border-b border-white/10 text-sm uppercase tracking-wider">
                  <th className="p-4">ID</th>
                  <th className="p-4">Produto</th>
                  <th className="p-4">Preço</th>
                  <th className="p-4">Estoque</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-zinc-500">#{product.id}</td>
                    <td className="p-4 font-medium text-white flex items-center gap-3">
                      <img src={product.image} alt="" className="w-10 h-10 rounded bg-zinc-800 object-cover" />
                      {product.name}
                    </td>
                    <td className="p-4 text-zinc-300">R$ {product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold border ${
                        product.quantity > 10 ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                        product.quantity > 0 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {product.quantity} un
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300 font-semibold text-sm transition-colors"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;