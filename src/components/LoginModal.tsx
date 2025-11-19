import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        if (!name) throw new Error("Nome é obrigatório");
        await register(name, email, password);
        alert("Cadastro realizado! Faça login.");
        setIsRegistering(false);
      } else {
        await login(email, password);
        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-96 shadow-2xl">
        <h2 className="text-2xl font-bold text-orange-900 mb-6 text-center">
          {isRegistering ? 'Criar Conta' : 'Fazer Login'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-sm font-semibold text-orange-900 mb-2">Nome</label>
              <input
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-orange-900 mb-2">Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-orange-900 mb-2">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-semibold bg-red-50 p-2 rounded border border-red-200">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-2 rounded-lg hover:from-orange-700 hover:to-orange-800 transition font-semibold shadow-lg"
          >
            {isRegistering ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
            className="text-sm text-orange-700 hover:underline font-medium"
          >
            {isRegistering ? 'Já tem conta? Fazer Login' : 'Não tem conta? Cadastre-se'}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 text-gray-500 hover:text-gray-700 text-sm"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default LoginModal;