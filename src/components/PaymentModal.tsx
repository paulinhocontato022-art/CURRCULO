import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { X, Lock, CheckCircle, CreditCard, QrCode, Copy, ShieldCheck, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type PaymentMethod = 'CREDIT_CARD' | 'PIX';
type PaymentStatus = 'IDLE' | 'PROCESSING' | 'WAITING_PIX' | 'APPROVED';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [method, setMethod] = useState<PaymentMethod>('CREDIT_CARD');
  const [status, setStatus] = useState<PaymentStatus>('IDLE');
  const [pixCopied, setPixCopied] = useState(false);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setMethod('CREDIT_CARD');
      setStatus('IDLE');
      setPixCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreditCardPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('PROCESSING');
    
    // Simula processamento do cartão via PagSeguro
    setTimeout(() => {
      setStatus('APPROVED');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 3000);
  };

  const handlePixGeneration = () => {
    setStatus('WAITING_PIX');
    // Simula o webhook recebendo a confirmação após 5 segundos
    setTimeout(() => {
      setStatus('APPROVED');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 5000);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-42661417400052040000530398654049.905802BR5913CV Profissional6009Sao Paulo62070503***6304ABCD");
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            <span className="font-bold text-gray-700 text-sm">Pagamento Seguro</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {status === 'APPROVED' ? (
            <div className="text-center py-10 animate-in zoom-in duration-300">
              <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pagamento Aprovado!</h2>
              <p className="text-gray-500">Seu download iniciará automaticamente em instantes.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-gray-900">Desbloquear Download</h2>
                <p className="text-gray-500 text-sm mt-1">Acesso vitalício aos arquivos PDF e DOCX</p>
                <div className="mt-4 flex justify-center items-baseline gap-1">
                  <span className="text-sm text-gray-500">R$</span>
                  <span className="text-4xl font-extrabold text-gray-900">9,90</span>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg mb-6">
                <button
                  onClick={() => { setMethod('CREDIT_CARD'); setStatus('IDLE'); }}
                  className={cn(
                    "flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all",
                    method === 'CREDIT_CARD' 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <CreditCard className="h-4 w-4" />
                  Cartão
                </button>
                <button
                  onClick={() => { setMethod('PIX'); setStatus('IDLE'); }}
                  className={cn(
                    "flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all",
                    method === 'PIX' 
                      ? "bg-white text-green-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <QrCode className="h-4 w-4" />
                  PIX
                </button>
              </div>

              {method === 'CREDIT_CARD' && (
                <form onSubmit={handleCreditCardPayment} className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <Input 
                    label="Número do Cartão" 
                    placeholder="0000 0000 0000 0000" 
                    required 
                    maxLength={19}
                    className="font-mono"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Validade" 
                      placeholder="MM/AA" 
                      required 
                      maxLength={5}
                      className="font-mono"
                    />
                    <Input 
                      label="CVV" 
                      placeholder="123" 
                      required 
                      maxLength={4}
                      className="font-mono"
                    />
                  </div>
                  <Input 
                    label="Nome no Cartão" 
                    placeholder="COMO NO CARTAO" 
                    required 
                  />
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base" 
                      isLoading={status === 'PROCESSING'}
                    >
                      {status === 'PROCESSING' ? 'Processando...' : 'Pagar R$ 9,90'}
                    </Button>
                  </div>
                </form>
              )}

              {method === 'PIX' && (
                <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                  {status === 'IDLE' ? (
                    <div className="text-center space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <p className="text-sm text-green-800 font-medium">
                          Aprovação imediata. Liberação do download na hora.
                        </p>
                      </div>
                      <Button 
                        onClick={handlePixGeneration} 
                        className="w-full bg-green-600 hover:bg-green-700 h-12 text-base"
                      >
                        Gerar QR Code PIX
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                        {/* Mock QR Code - In production use a real generator */}
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-42661417400052040000530398654049.905802BR5913CV Profissional6009Sao Paulo62070503***6304ABCD" 
                          alt="QR Code PIX" 
                          className="w-48 h-48 mix-blend-multiply opacity-90"
                        />
                        <p className="text-xs text-gray-500 mt-2">Escaneie com o app do seu banco</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-700 block">Pix Copia e Cola</label>
                        <div className="flex gap-2">
                          <input 
                            readOnly 
                            value="00020126580014BR.GOV.BCB.PIX0136123e4567..." 
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 text-sm text-gray-500 font-mono"
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleCopyPix}
                            className={cn("min-w-[100px]", pixCopied && "text-green-600 border-green-200 bg-green-50")}
                          >
                            {pixCopied ? (
                              <><CheckCircle className="h-4 w-4 mr-2" /> Copiado</>
                            ) : (
                              <><Copy className="h-4 w-4 mr-2" /> Copiar</>
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg animate-pulse">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="font-medium">Aguardando pagamento...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" /> 
            Pagamento processado via <strong>PagSeguro</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
