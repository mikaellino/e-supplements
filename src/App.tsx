import { useState } from 'react';
import Home from './pages/Home';
import Whey from './pages/Whey';
import Creatina from './pages/Creatina';
import Vitaminas from './pages/Vitaminas';
import PreTreino from './pages/PreTreino';
import MeusPedidos from './pages/MeusPedidos';
import AdminPanel from './pages/AdminPanel';
import Checkout from './pages/Checkout';
import ForgotPassword from './pages/ForgotPassword';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider, useProduct } from './context/ProductContext';

import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const { selectedProduct } = useProduct();
  const { isLoggingOut } = useAuth();

  const renderPage = () => {
    if (selectedProduct) {
      return <ProductDetail />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onPageChange={setCurrentPage} />;
      case 'whey':
        return <Whey />;
      case 'creatina':
        return <Creatina />;
      case 'vitaminas':
        return <Vitaminas />;
      case 'pre-treino':
        return <PreTreino />;
      case 'meus-pedidos':
        return <MeusPedidos />;
      case 'admin':
        return <AdminPanel />;
      case 'checkout':
        return <Checkout />;
      case 'forgot-password':
        return <ForgotPassword />;
      case 'contact':
        return <Contact />;
        
      default:
        return <Home onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Tela de Loading durante Logout */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-2">Fazendo Logout</h3>
            <p className="text-zinc-400">Aguarde um momento...</p>
          </div>
        </div>
      )}

      <Navbar onPageChange={setCurrentPage} currentPage={currentPage} />
      
      <main className="flex-grow flex flex-col">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <ProductProvider>
          <AppContent />
        </ProductProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;