import { useState } from 'react';
import Home from './pages/Home';
import Whey from './pages/Whey';
import Creatina from './pages/Creatina';
import Vitaminas from './pages/Vitaminas';
import PreTreino from './pages/PreTreino';
import MeusPedidos from './pages/MeusPedidos';
import AdminPanel from './pages/AdminPanel';
import Sidebar from './components/Sidebar';
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
        
      default:
        return <Home onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Tela de Loading durante Logout */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-orange-900 mb-2">Fazendo Logout</h3>
            <p className="text-gray-600">Aguarde um momento...</p>
          </div>
        </div>
      )}

      <Sidebar onPageChange={setCurrentPage} currentPage={currentPage} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-grow">
            {renderPage()}
          </div>
          <Footer />
        </div>
      </div>
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