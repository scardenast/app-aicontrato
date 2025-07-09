import React, { useEffect, useRef } from 'react';

// Declare paypal on window for TypeScript to recognize it
declare global {
    interface Window {
        paypal: any;
    }
}

interface PayPalButtonProps {
    amount: string;
    onSuccess: () => void;
    onError: (err: any) => void;
    onCancel: () => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess, onError, onCancel }) => {
    const paypalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.paypal && paypalRef.current) {
            // To prevent conflicts with React re-renders, clear the container first
            paypalRef.current.innerHTML = "";

            try {
                window.paypal.Buttons({
                    style: {
                        layout: 'vertical',
                        color:  'blue',
                        shape:  'rect',
                        label:  'pay',
                        height: 55
                    },
                    createOrder: (data: any, actions: any) => {
                        return actions.order.create({
                            purchase_units: [{
                                description: 'AIContrato - Generación de Contrato Profesional',
                                amount: {
                                    currency_code: 'CLP',
                                    value: amount
                                }
                            }]
                        });
                    },
                    onApprove: (data: any, actions: any) => {
                        // This function captures the funds from the transaction.
                        return actions.order.capture().then((details: any) => {
                            // This function shows a success message to your buyer.
                            console.log('Pago capturado exitosamente:', details);
                            onSuccess();
                        }).catch((err: any) => {
                            console.error('Error al capturar el pago:', err);
                            onError(err);
                        });
                    },
                    onError: (err: any) => {
                        console.error('Error en el botón de PayPal:', err);
                        onError(err);
                    },
                    onCancel: () => {
                        console.log('Pago cancelado por el usuario.');
                        onCancel();
                    }
                }).render(paypalRef.current);
            } catch (error) {
                console.error("Error al renderizar los botones de PayPal:", error);
                onError(error);
            }
        }
    }, [amount, onSuccess, onError, onCancel]);

    return <div ref={paypalRef}></div>;
};

export default PayPalButton;