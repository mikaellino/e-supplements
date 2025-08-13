import React from 'react';

const Creatina: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-900 to-orange-400 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Creatina</h1>
        <p className="text-xl text-orange-100 mb-8">Página em desenvolvimento</p>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-orange-300/30">
          <p className="text-orange-100">Em breve você encontrará aqui nossa linha completa de creatina!</p>
        </div>
      </div>
    </div>
  );
};

export default Creatina;
