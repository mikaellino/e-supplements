import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-orange-900 to-orange-800 text-white py-8 border-t-4 border-yellow-500">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Sobre */}
          <div>
            <h3 className="text-base font-bold mb-3 text-yellow-300">Sobre</h3>
            <p className="text-orange-100 text-xs leading-relaxed">
              E-Supplements é sua loja confiável de suplementos de alta qualidade para atletas e entusiastas de fitness.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-base font-bold mb-3 text-yellow-300">Links Rápidos</h3>
            <ul className="space-y-1 text-xs">
              <li><a href="#" className="text-orange-100 hover:text-yellow-300 transition">Produtos</a></li>
              <li><a href="#" className="text-orange-100 hover:text-yellow-300 transition">Sobre Nós</a></li>
              <li><a href="#" className="text-orange-100 hover:text-yellow-300 transition">Contato</a></li>
              <li><a href="#" className="text-orange-100 hover:text-yellow-300 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-base font-bold mb-3 text-yellow-300">Atendimento</h3>
            <ul className="space-y-1 text-xs text-orange-100">
              <li>📧 contato@e-supplements.com</li>
              <li>📞 (11) 99999-8888</li>
              <li>🕐 Seg-Sex: 9h às 18h</li>
              <li>📍 São Paulo, SP</li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-base font-bold mb-3 text-yellow-300">Redes Sociais</h3>
            <div className="flex gap-3">
              <a href="#" className="bg-orange-700 hover:bg-yellow-500 p-2 rounded-full transition text-lg" title="Facebook">f</a>
              <a href="#" className="bg-orange-700 hover:bg-yellow-500 p-2 rounded-full transition text-lg" title="Instagram">📷</a>
              <a href="#" className="bg-orange-700 hover:bg-yellow-500 p-2 rounded-full transition text-lg" title="Twitter">𝕏</a>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-orange-100">
            <p>&copy; {new Date().getFullYear()} E-Supplements. Todos os direitos reservados.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-yellow-300 transition">Política de Privacidade</a>
              <a href="#" className="hover:text-yellow-300 transition">Termos de Serviço</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;