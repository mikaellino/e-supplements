import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Whey from './pages/Whey'
import Creatina from './pages/Creatina'
import Vitaminas from './pages/Vitaminas'
import PreTreino from './pages/PreTreino'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer';
import Whey from './pages/Whey';
import Creatina from './pages/Creatina';
import PreTreino from './pages/PreTreino';
import Vitaminas from './pages/Vitaminas';

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
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whey" element={<Whey />} />
          <Route path="/creatina" element={<Creatina />} />
          <Route path="/pre-treino" element={<PreTreino />} />
          <Route path="/vitaminas" element={<Vitaminas />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App