import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (!email.includes('@')) {
      setError('Email inválido');
      return;
    }

    login(email, password);
    setEmail('');
    setPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-96 shadow-2xl">
        <h2 className="text-2xl font-bold text-orange-900 mb-6 text-center">Fazer Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-orange-900 mb-2">Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-orange-900 mb-2">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-semibold bg-red-50 p-2 rounded">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-2 rounded-lg hover:from-orange-700 hover:to-orange-800 transition font-semibold shadow-lg"
          >
            Entrar
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full mt-3 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
        >
          Cancelar
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          💡 Dica: Use qualquer email e senha para entrar
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
