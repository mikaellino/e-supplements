import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-zinc-950 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Sobre */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white italic">
              E-SUPPLEMENTS<span className="text-orange-500">.</span>
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Potencialize seus resultados com suplementos de alta performance. 
              Qualidade premium para quem busca a excelência.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navegação</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Produtos</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Lançamentos</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Suporte</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="text-orange-500">✉</span> contato@esupplements.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">📞</span> (11) 99999-8888
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">🕒</span> Seg-Sex: 9h às 18h
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Fique por dentro</h3>
            <p className="text-zinc-400 text-sm mb-4">Receba ofertas exclusivas e dicas de treino.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg px-4 py-2 w-full focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors font-bold">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs">
            &copy; {new Date().getFullYear()} E-Supplements. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;