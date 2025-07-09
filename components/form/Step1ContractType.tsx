
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { ContractType } from '../../types';

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const Step1ContractType: React.FC = () => {
  const { contractType, setContractType } = useAppContext();

  const handleSelect = (type: ContractType) => {
    setContractType(type);
  }

  const plans = [
    {
      type: 'simple' as ContractType,
      name: 'Básico',
      price: 'Gratis',
      description: 'Ideal para arriendos rápidos y directos sin complicaciones.',
      features: [
        'Cláusulas esenciales',
        'Datos básicos de las partes',
        'Términos de arriendo estándar',
        'Generación de contrato simple',
      ],
      isPopular: false,
    },
    {
      type: 'professional' as ContractType,
      name: 'Profesional',
      price: '$1.990',
      description: 'Contrato robusto con mayor detalle legal y personalización.',
      features: [
        'Todo lo del plan Básico',
        'Cláusulas opcionales (mascotas, etc.)',
        'Reajuste de IPC anual',
        'Campos adicionales para las partes',
        'Formato profesional para Word'
      ],
      isPopular: true,
    }
  ];

  return (
    <div className="text-center">
        <h3 className="text-xl font-semibold leading-7 text-slate-100 mb-2">
            Elige el Nivel de Detalle
        </h3>
        <p className="text-slate-400 mb-10">
            Comienza seleccionando qué tan detallado quieres que sea tu contrato.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
                <div
                    key={plan.type}
                    onClick={() => handleSelect(plan.type)}
                    className={`cursor-pointer rounded-2xl p-6 flex flex-col transition-all duration-300 border ${
                        plan.isPopular ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-800/40 border-slate-700/60'
                    } ${
                        contractType === plan.type ? 'ring-2 ring-indigo-500 scale-105 border-indigo-500/80' : 'hover:border-slate-600'
                    }`}
                >
                    <div className="flex-grow">
                        <h4 className="text-lg font-bold mb-1 text-white">{plan.name}</h4>
                        <div className="text-4xl font-extrabold text-white">
                            {plan.price}
                        </div>
                        <p className="mt-3 text-sm h-12 text-slate-300">{plan.description}</p>
                        <div className="h-px my-6 bg-slate-700"></div>
                        <ul className="space-y-3 text-left">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                    <CheckIcon />
                                    <span className="ml-3 text-sm text-slate-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`mt-8 rounded-lg py-3 font-semibold text-center transition-colors duration-200 ${
                        (contractType === plan.type) ? 'bg-indigo-600 text-white' : 'bg-slate-700/80 text-slate-200 hover:bg-slate-700'
                    }`}>
                        {contractType === plan.type ? 'Plan Seleccionado' : 'Seleccionar Plan'}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Step1ContractType;
