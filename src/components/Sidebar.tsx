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
  const { isLoggedIn, user, isLoggingOut, logout } = useAuth();
  const { setSelectedProduct } = useProduct();
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLogout = () => {
    logout();
    // Após logout, redireciona para Home
    setTimeout(() => {
      setSelectedProduct(null);
      onPageChange('home');
    }, 1600); // Um pouco mais que o tempo do loading
  };

  const categories: Category[] = [
    { id: 'home', name: 'Home', icon: '🏠', path: '/' },
    { id: 'whey', name: 'Whey Protein', icon: '💪', path: '/whey' },
    { id: 'creatina', name: 'Creatina', icon: '⚡', path: '/creatina' },
    { id: 'vitaminas', name: 'Vitaminas', icon: '🍊', path: '/vitaminas' },
    { id: 'pre-treino', name: 'Pré-Treino', icon: '🔥', path: '/pre-treino' },
    { id: 'meus-pedidos', name: 'Meus Pedidos', icon: '📦', path: '/meus-pedidos' },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedProduct(null);
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
        <div className="p-4 flex-1 overflow-y-auto">
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
                  ${currentPage === category.id
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

            {user?.role === 'admin' && (
              <>
                <div className="my-4 border-t border-orange-600/50"></div>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    onPageChange('admin');
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-all duration-200 ease-in-out
                    hover:bg-red-700 hover:scale-105 bg-red-800/80
                    ${currentPage === 'admin' ? 'ring-2 ring-yellow-400' : ''}
                  `}
                >
                  <span className="text-xl">⚙️</span>
                  <span className="font-medium">Painel Admin</span>
                </button>
              </>
            )}
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
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">👤</span>
                <div>
                  <p className="text-xs text-orange-100">Bem-vindo!</p>
                  <p className="font-semibold text-white truncate w-32 text-sm">{user?.name}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`w-full mt-2 py-2 rounded transition-all text-sm font-semibold ${
                  isLoggingOut 
                    ? 'bg-gray-500 cursor-not-allowed text-gray-300' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isLoggingOut ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saindo...
                  </div>
                ) : (
                  'Sair'
                )}
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

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} onNavigate={onPageChange} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} onNavigate={onPageChange} />
    </>
  );
};

export default Sidebar;