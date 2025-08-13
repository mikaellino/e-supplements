import { useState } from 'react'
import Home from './pages/Home'
import Whey from './pages/Whey'
import Creatina from './pages/Creatina'
import Vitaminas from './pages/Vitaminas'
import PreTreino from './pages/PreTreino'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer';

import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const renderPage = () => {
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
      <div className="flex-1 overflow-auto">
        {renderPage()}
      </div>
      <Footer />
    </div>
  )
}

export default App