import { useState } from 'react'
import Home from './pages/Home'
import Whey from './pages/Whey'
import Creatina from './pages/Creatina'
import Vitaminas from './pages/Vitaminas'
import PreTreino from './pages/PreTreino'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import ProductDetail from './components/ProductDetail'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import { useProduct } from './context/ProductContext'

import './App.css'

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const { selectedProduct } = useProduct();

  const renderPage = () => {
    if (selectedProduct) {
      return <ProductDetail />;
    }

    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'whey':
        return <Whey />;
      case 'creatina':
        return <Creatina />;
      case 'vitaminas':
        return <Vitaminas />;
      case 'pre-treino':
        return <PreTreino />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onPageChange={setCurrentPage} currentPage={currentPage} />
      
      {/* Área principal (Conteúdo + Footer) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Conteúdo scrollável */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          
          {/* Conteúdo da página */}
          <div className="flex-grow">
            {renderPage()}
          </div>

          {/* O Footer agora está DENTRO da área de rolagem */}
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
  )
}

export default App