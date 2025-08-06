import React from 'react';
import logo from '../assets/e-supp-logo.png';

const Home: React.FC = () => {
  return (
    <div className="flex-1 h-screen bg-gradient-to-b from-orange-900 to-orange-400 flex items-center justify-center">
      <div className="text-center">
        {/* Logo grande */}
        <div className="mb-8">
          <img 
            src={logo} 
            alt="E-Supplements Logo" 
            className="h-32 w-auto object-contain mx-auto drop-shadow-2xl"
          />
        </div>
        
        {/* Texto com blur */}
        <div className="relative">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            E-Supplements
          </h1>
          <div className="absolute inset-0 text-6xl font-bold text-white blur-sm opacity-50">
            E-Supplements
          </div>
        </div>
        
        {/* Texto descritivo */}
        <p className="text-xl text-orange-100 mt-6 max-w-md mx-auto leading-relaxed">
          Sua loja completa de suplementos alimentares.
          Qualidade, confiança e resultados garantidos.
        </p>
        
        {/* Botão call-to-action */}
        <button className="mt-8 bg-white text-orange-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-orange-50 transition-colors duration-300 shadow-lg">
          Explorar Produtos
        </button>
      </div>
    </div>
  );
};

export default Home;
