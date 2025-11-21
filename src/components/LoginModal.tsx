import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        await register(name, email, password);
        alert('Cadastro realizado com sucesso! Faça login.');
        setIsRegistering(false);
      } else {
        await login(email, password);
        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = () => {
    if (onNavigate) {
      onClose();
      onNavigate('forgot-password');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative glass-card w-full max-w-md p-8 rounded-2xl shadow-2xl border border-white/10 transform transition-all scale-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          ✕
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">
            {isRegistering ? 'Crie sua Conta' : 'Bem-vindo'}
          </h2>
          <p className="text-zinc-400 text-sm">
            {isRegistering ? 'Junte-se à elite do fitness' : 'Acesse sua conta para continuar'}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">Nome</label>
              <input
                type="text"
                className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder-zinc-600"
                placeholder="Seu nome completo"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">E-mail</label>
            <input
              type="email"
              className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder-zinc-600"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-1 ml-1">Senha</label>
            <input
              type="password"
              className="w-full bg-zinc-900/50 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder-zinc-600"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {!isRegistering && (
            <div className="text-right">
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-zinc-400 hover:text-orange-500 transition-colors"
              >
                Esqueceu a senha?
              </button>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full btn-primary py-3 rounded-xl font-bold text-lg shadow-lg mt-4"
          >
            {isRegistering ? 'Criar Conta' : 'Entrar'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-zinc-400 text-sm">
            {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'}
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-orange-500 font-bold ml-2 hover:text-orange-400 transition-colors"
            >
              {isRegistering ? 'Fazer Login' : 'Cadastre-se'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;