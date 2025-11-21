import React from 'react';
import logo from '../assets/e-supp-logo.png';

interface HomeProps {
  onPageChange?: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onPageChange }) => {
  const handleExplorarProdutos = () => {
    if (onPageChange) {
      onPageChange('whey');
    }
  };

  return (
    <div className="flex-1 relative overflow-hidden bg-zinc-950">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center py-20 text-center">
        
        {/* Logo Animation */}
        <div className="mb-10 relative group">
          <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
          <img 
            src={logo} 
            alt="E-Supplements Logo" 
            className="h-40 w-auto object-contain relative z-10 drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white">
          ALCANCE SUA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 animate-gradient-x">
            MELHOR VERSÃO
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Suplementos de alta performance para quem busca resultados reais. 
          Qualidade premium, entrega rápida e o melhor custo-benefício do mercado.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleExplorarProdutos}
            className="btn-primary px-8 py-4 rounded-full text-lg flex items-center justify-center gap-2 group"
          >
            EXPLORAR PRODUTOS
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <button className="px-8 py-4 rounded-full text-lg font-bold text-white border border-zinc-700 hover:bg-white/5 hover:border-orange-500/50 transition-all duration-300">
            SAIBA MAIS
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-5xl">
          {[
            { icon: '🚀', title: 'Entrega Flash', desc: 'Receba seus produtos em tempo recorde.' },
            { icon: '🛡️', title: 'Qualidade Garantida', desc: 'Produtos 100% originais e certificados.' },
            { icon: '💳', title: 'Pagamento Seguro', desc: 'Parcele em até 12x ou pague via PIX.' },
          ].map((feature, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl text-left hover:-translate-y-2 transition-transform duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
