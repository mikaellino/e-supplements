import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProduct } from '../context/ProductContext';
import Cart from './Cart';
import LoginModal from './LoginModal';
import logo from '../assets/e-supp-logo.png';

interface Category {
  id: string;
  name: string;
  icon: string;
  path: string;
}

interface SidebarProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onPageChange, currentPage }) => {
  const { items } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const { setSelectedProduct } = useProduct();
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const categories: Category[] = [
    { id: 'home', name: 'Home', icon: '🏠', path: '/' },
    { id: 'whey', name: 'Whey Protein', icon: '💪', path: '/whey' },
    { id: 'creatina', name: 'Creatina', icon: '⚡', path: '/creatina' },
    { id: 'vitaminas', name: 'Vitaminas', icon: '🍊', path: '/vitaminas' },
    { id: 'pre-treino', name: 'Pré-Treino', icon: '🔥', path: '/pre-treino' },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedProduct(null); // Limpa o produto selecionado
    onPageChange(categoryId);
  };

  return (
    <>
      <div className="w-64 h-screen bg-gradient-to-b from-orange-900 to-orange-400 text-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-orange-700">
          <div className="flex justify-center">
            <img 
              src={logo} 
              alt="E-Supplements Logo" 
              className="h-30 w-auto object-contain"
            />
          </div>
          <p className="text-orange-200 text-sm text-center mt-3 font-bold">
            Sua loja de suplementos
          </p>
        </div>

        {/* Categorias */}
        <div className="p-4 flex-1">
          <h2 className="text-lg font-semibold mb-4 text-orange-200">Categorias</h2>
          <nav className="space-y-2">
            {categories.map((category) => (
              <button 
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-all duration-200 ease-in-out
                  hover:bg-orange-700 hover:scale-105
                  ${
                    currentPage === category.id
                      ? 'bg-orange-600 shadow-lg border-l-4 border-yellow-400'
                      : 'bg-orange-800/50 hover:bg-orange-700'
                  }
                `}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                {currentPage === category.id && (
                  <span className="ml-auto text-yellow-400">●</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer do Sidebar */}
        <div className="p-4 border-t border-orange-700 space-y-3">
          {/* Carrinho */}
          <button
            onClick={() => setCartOpen(true)}
            className="w-full flex items-center justify-between bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg transition-all font-semibold shadow-lg"
          >
            <span>🛒 Carrinho</span>
            {items.length > 0 && (
              <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {items.length}
              </span>
            )}
          </button>

          {/* Login/Logout */}
          {isLoggedIn ? (
            <div className="bg-orange-600 rounded-lg p-3 border border-orange-500">
              <p className="text-xs text-orange-100">Bem-vindo!</p>
              <p className="font-semibold text-white truncate">👤 {user?.name}</p>
              <button
                onClick={logout}
                className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition-all text-sm font-semibold"
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-all font-semibold shadow-lg"
            >
              👤 Fazer Login
            </button>
          )}
        </div>
      </div>

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Sidebar;