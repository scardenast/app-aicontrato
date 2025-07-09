import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Spinner from './Spinner';
import { unformatCLP } from '../utils/formatting';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: string;
}

const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID as string;
const CURRENCY = "USD";

// Componente interno para gestionar el botón
const Checkout: React.FC<{ amount: string; onSuccess: () => void; onProcessing: (isProcessing: boolean) => void }> = ({ amount, onSuccess, onProcessing }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (options.currency !== CURRENCY) {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: CURRENCY,
        },
      });
    }
  }, [CURRENCY]);

  const createOrder = async (_data: any, actions: any) => {
    setError(null);
    onProcessing(true);
    try {
      const orderId = await actions.order.create({
        purchase_units: [
          {
            description: 'AIContrato - Contrato Profesional',
            amount: {
              currency_code: CURRENCY,
              value: unformatCLP(amount),
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      });
      return orderId;
    } catch (err) {
      console.error("PayPal createOrder error:", err);
      setError("No se pudo iniciar el pago. Intente de nuevo.");
      onProcessing(false);
      throw err;
    }
  };

  const onApprove = async (_data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      console.log("Pago exitoso:", details);
      onSuccess();
    } catch (err) {
      console.error("PayPal onApprove error:", err);
      setError("Ocurrió un error al procesar el pago.");
      onProcessing(false);
    }
  };

  const onError = (err: any) => {
    console.error("PayPal Button error:", err);
    setError("Ocurrió un error con el pago de PayPal. Por favor, intenta de nuevo o refresca la página.");
    onProcessing(false);
  };

  return (
    <>
      {isPending && <div className="flex justify-center items-center py-8"><Spinner /></div>}
      <PayPalButtons
        style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay', tagline: false }}
        disabled={isPending}
        forceReRender={[amount, CURRENCY]}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
      {error && <p className="text-xs text-red-400 mt-2 text-center">{error}</p>}
    </>
  );
};

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, amount }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative transform transition-all animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors" disabled={isProcessing}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Confirmar Compra</h2>
        <p className="text-slate-400 mb-6">Estás a punto de adquirir el Contrato Profesional.</p>

        <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-center">
          <p className="text-sm text-slate-300">Total a pagar</p>
          <p className="text-3xl font-extrabold text-white">${amount} <span className="text-base font-medium text-slate-400">USD</span></p>
        </div>

        {isProcessing && (
          <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center z-10 rounded-2xl">
            <Spinner size="w-8 h-8" />
            <p className="mt-3 text-white">Procesando pago...</p>
          </div>
        )}

        <PayPalScriptProvider
          options={{
            'client-id': CLIENT_ID,
            currency: CURRENCY,
            intent: 'capture',
            'disable-funding': 'card,credit,venmo'
          }}
        >
          <Checkout amount={amount} onSuccess={onSuccess} onProcessing={setIsProcessing} />
        </PayPalScriptProvider>

        <p className="text-xs text-slate-500 mt-4 text-center">Serás redirigido a PayPal para completar tu compra de forma segura.</p>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default PaymentModal;
