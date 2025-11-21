import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProduct } from '../context/ProductContext';
import Cart from './Cart';
import LoginModal from './LoginModal';
import logo from '../assets/e-supp-logo.png';

interface NavbarProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onPageChange, currentPage }) => {
  const { items } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const { setSelectedProduct } = useProduct();
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (page: string) => {
    setSelectedProduct(null);
    onPageChange(page);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      handleNavigation('home');
    }, 1000);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'whey', label: 'Whey' },
    { id: 'creatina', label: 'Creatina' },
    { id: 'vitaminas', label: 'Vitaminas' },
    { id: 'pre-treino', label: 'Pré-Treino' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div 
              className="flex-shrink-0 cursor-pointer flex items-center gap-2 group"
              onClick={() => handleNavigation('home')}
            >
              <img className="h-10 w-auto group-hover:scale-110 transition-transform duration-300" src={logo} alt="Logo" />
              <span className="text-xl font-bold tracking-tighter text-white group-hover:text-orange-500 transition-colors">
                E-SUPPLEMENTS
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavigation(link.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      currentPage === link.id
                        ? 'text-orange-500 bg-white/5'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="hidden md:flex items-center gap-6">
              {/* Cart */}
              <button 
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-zinc-400 hover:text-orange-500 transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-orange-500/50 animate-pulse">
                    {items.length}
                  </span>
                )}
              </button>

              {/* User / Login */}
              {isLoggedIn ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-500">{user?.name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="text-sm font-medium max-w-[100px] truncate">{user?.name}</span>
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50">
                    <button 
                      onClick={() => handleNavigation('meus-pedidos')}
                      className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      Meus Pedidos
                    </button>
                    {user?.role === 'admin' && (
                      <button 
                        onClick={() => handleNavigation('admin')}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300"
                      >
                        Painel Admin
                      </button>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setLoginOpen(true)}
                  className="text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all border border-white/5"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigation(link.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    currentPage === link.id
                      ? 'bg-zinc-800 text-orange-500'
                      : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setCartOpen(true); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                Carrinho ({items.length})
              </button>
              {isLoggedIn ? (
                <>
                   <button
                    onClick={() => handleNavigation('meus-pedidos')}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  >
                    Meus Pedidos
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-zinc-800"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setLoginOpen(true); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-green-400 hover:bg-zinc-800"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} onNavigate={handleNavigation} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} onNavigate={handleNavigation} />
    </>
  );
};

export default Navbar;
