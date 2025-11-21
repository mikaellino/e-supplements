import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de envio de email
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
        <div className="glass-card p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-white/10 animate-fadeIn">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
            <span className="text-3xl">✉️</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Email Enviado!</h2>
          <p className="text-zinc-400 mb-6 text-sm">
            Verifique sua caixa de entrada. Enviamos um link para redefinição de senha para <strong className="text-orange-500">{email}</strong>.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="text-orange-500 font-bold hover:text-orange-400 transition-colors text-sm uppercase tracking-wide"
          >
            Voltar para o Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <div className="glass-card p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2 italic">Recuperar Senha</h2>
          <p className="text-zinc-400 text-sm">
            Digite seu email abaixo e enviaremos as instruções para recuperar sua senha.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder-zinc-600"
              placeholder="seu@email.com"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full btn-primary py-3 rounded-xl font-bold text-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Enviar Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
