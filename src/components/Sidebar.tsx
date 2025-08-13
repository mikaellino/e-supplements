import React from 'react';
import logo from '../assets/e-supp-logo.png';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface SidebarProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onPageChange, currentPage }) => {
  const categories: Category[] = [
    { id: 'home', name: 'Home', icon: '🏠' },
    { id: 'whey', name: 'Whey Protein', icon: '💪' },
    { id: 'creatina', name: 'Creatina', icon: '⚡' },
    { id: 'vitaminas', name: 'Vitaminas', icon: '🍊' },
    { id: 'pre-treino', name: 'Pré-Treino', icon: '🔥' },
  ];

  const handleCategoryClick = (categoryId: string) => {
    onPageChange(categoryId);
    console.log(`Navegando para: ${categoryId}`);
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-orange-900 to-orange-400 text-white shadow-2xl">

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

      {/* Categories */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-orange-200">
          Categorias
        </h2>
        <nav className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                transition-all duration-200 ease-in-out
                hover:bg-orange-700 hover:scale-105
                ${
                  currentPage === category.id
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
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
