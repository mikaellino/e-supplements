import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de envio
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
        <div className="glass-card p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-white/10 animate-fadeIn">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h2>
          <p className="text-zinc-400 mb-6">
            Obrigado pelo contato, <strong className="text-orange-500">{formData.name}</strong>. <br/>
            Nossa equipe responderá em breve.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-primary px-6 py-2 rounded-lg font-bold shadow-lg w-full"
          >
            Enviar outra mensagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto glass-card rounded-2xl shadow-2xl overflow-hidden border border-white/10">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8 text-center">
          <h1 className="text-3xl font-black text-white mb-2 uppercase italic tracking-wider">Fale Conosco</h1>
          <p className="text-orange-100 font-medium">
            Dúvidas, sugestões ou reclamações? Estamos aqui para ajudar!
          </p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">Nome</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder-zinc-600"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder-zinc-600"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">Mensagem</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none placeholder-zinc-600"
                placeholder="Como podemos ajudar?"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full btn-primary py-3 rounded-xl font-bold text-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
