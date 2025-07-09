import React, { ChangeEvent } from 'react';
import { ContractData, ContractType } from '../../types';
import Input from '../Input';
import { formatRUT } from '../../utils/formatting';

interface Props {
  contractType: ContractType;
  data: ContractData;
  onDataChange: (field: keyof ContractData, value: string) => void;
  errors: Partial<Record<keyof ContractData, string>>;
}

const Step2Parties: React.FC<Props> = ({ contractType, data, onDataChange, errors }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'landlordRUT' || id === 'tenantRUT') {
      onDataChange(id as keyof ContractData, formatRUT(value));
    } else {
      onDataChange(id as keyof ContractData, value);
    }
  };

  const commonFields = (party: 'landlord' | 'tenant') => [
    { id: `${party}Name`, label: 'Nombre Completo', required: true },
    { id: `${party}RUT`, label: 'RUT', placeholder: '12.345.678-9', required: true },
    ...(contractType === 'professional' ? [
        { id: `${party}Nationality`, label: 'Nacionalidad', required: true },
        { id: `${party}Profession`, label: 'Profesión u Oficio', required: true }
    ] : []),
    { id: `${party}Address`, label: 'Domicilio', required: true, tooltip: 'Dirección completa (calle, número, depto/casa) que se usará para notificaciones legales.' },
  ];

  return (
    <div>
        <div className="text-center mb-10">
            <h3 className="text-xl font-semibold leading-7 text-slate-100">Identificación de las Partes</h3>
            <p className="text-slate-400 mt-1">Ingresa los datos del arrendador y del arrendatario.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {(['landlord', 'tenant'] as const).map(party => (
                <div key={party}>
                    <h3 className="text-lg font-semibold leading-7 text-slate-200 mb-4 flex items-center">
                        <span className="text-2xl mr-3">{party === 'landlord' ? '🏠' : '👤'}</span>
                        Datos del {party === 'landlord' ? 'Arrendador' : 'Arrendatario'}
                    </h3>
                    <div className="space-y-6">
                        {commonFields(party).map(field => (
                            <Input
                                key={field.id}
                                id={field.id}
                                label={field.label}
                                placeholder={field.placeholder}
                                tooltip={field.tooltip}
                                value={data[field.id as keyof ContractData] as string}
                                onChange={handleChange}
                                error={errors[field.id as keyof ContractData]}
                                required={field.required}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Step2Parties;