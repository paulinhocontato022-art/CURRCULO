import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { X, Mail, Check, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await signInWithEmail(email);

    setIsLoading(false);
    if (error) {
      setError(error.message || 'Erro ao enviar email.');
    } else {
      setIsSent(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Entrar / Cadastrar</h2>
            <p className="text-gray-500 text-sm mt-2">Salve seu currículo e acesse de qualquer dispositivo.</p>
          </div>

          {isSent ? (
            <div className="text-center bg-green-50 p-6 rounded-lg border border-green-100 animate-in zoom-in duration-300">
              <div className="mx-auto bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-green-800">Link enviado!</h3>
              <p className="text-sm text-green-700 mt-1">
                Verifique sua caixa de entrada em <strong>{email}</strong> e clique no link mágico para entrar.
              </p>
              <Button variant="outline" className="mt-4 w-full" onClick={onClose}>
                Fechar
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Seu E-mail"
                type="email"
                placeholder="voce@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
              
              {error && (
                <p className="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-100">
                  {error}
                </p>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
                isLoading={isLoading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Enviar Link Mágico
              </Button>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                Não precisa de senha. Enviaremos um link seguro para seu e-mail.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
