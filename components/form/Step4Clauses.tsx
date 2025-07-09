import React, { ChangeEvent } from 'react';
import { ContractData, ContractType } from '../../types';
import Input from '../Input';
import Textarea from '../Textarea';
import Tooltip from '../Tooltip';

interface Props {
  contractType: ContractType;
  data: ContractData;
  onDataChange: (field: keyof ContractData, value: string | boolean) => void;
  errors: Partial<Record<keyof ContractData, string>>;
}

const Step4Clauses: React.FC<Props> = ({ contractType, data, onDataChange, errors }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    const checked = type === 'checkbox' && 'checked' in e.target ? e.target.checked : undefined;
    onDataChange(id as keyof ContractData, type === 'checkbox' ? checked as boolean : value);
  };

  const optionalClauses = [
      { id: 'includePetsClause', label: 'Incluir Cláusula de Mascotas', detailId: 'petsClauseDetails', placeholder: 'Ej: Un perro pequeño, no más de 10kg', tooltip: 'Permite o prohíbe explícitamente la tenencia de mascotas y define las condiciones.' },
      { id: 'includeParkingClause', label: 'Incluir Estacionamiento', detailId: 'parkingClauseDetails', placeholder: 'Ej: Estacionamiento N° 123, subterráneo -1', tooltip: 'Especifica si el arriendo incluye uno o más estacionamientos y su identificación.' },
      { id: 'includeStorageClause', label: 'Incluir Bodega', detailId: 'storageClauseDetails', placeholder: 'Ej: Bodega N° 45, subterráneo -1', tooltip: 'Especifica si el arriendo incluye una bodega y su identificación.' },
      { id: 'includeBankDetailsClause', label: 'Incluir Datos Bancarios para Transferencia', detailId: 'bankDetails', placeholder: 'Ej: Banco: MiBanco\nCuenta Corriente: 12345678-9\nNombre:...\nRUT:...\nEmail:...', isTextarea: true, tooltip: 'Añade una cláusula con los datos de la cuenta bancaria del arrendador para facilitar el pago de la renta.' }
  ];
  
  return (
    <div>
        <div className="text-center mb-10">
            <h3 className="text-xl font-semibold leading-7 text-slate-100">Cláusulas Adicionales</h3>
            <p className="text-slate-400 mt-1">Añade los últimos detalles para completar tu contrato.</p>
        </div>
        <div className="space-y-10">
            <div>
                <Textarea
                    id="inventory"
                    label="Inventario y Estado de la Propiedad"
                    value={data.inventory as string}
                    onChange={handleChange}
                    error={errors.inventory}
                    required
                    placeholder="Ej: La propiedad se entrega sin muebles. Incluye lámparas y cortinas roller..."
                    tooltip="Describe el estado en que se entrega la propiedad y qué elementos incluye (muebles, electrodomésticos, etc.). Esto es clave para la devolución de la garantía."
                />
            </div>

            {contractType === 'professional' && (
                <div>
                    <h3 className="text-lg font-semibold leading-7 text-slate-200 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Cláusulas Opcionales
                    </h3>
                    <div className="space-y-6">
                    {optionalClauses.map(clause => (
                        <div key={clause.id} className="relative flex flex-col gap-2 rounded-md p-4 border border-slate-700/80 bg-slate-800/50">
                            <div className="flex items-center">
                                <input id={clause.id} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={data[clause.id as keyof ContractData] as boolean} onChange={handleChange} />
                                <label htmlFor={clause.id} className="ml-3 block text-sm font-medium text-slate-200">{clause.label}</label>
                                {clause.tooltip && <div className="ml-2"><Tooltip text={clause.tooltip} /></div>}
                            </div>
                            {data[clause.id as keyof ContractData] && (
                                <div className="ml-7 mt-2 animate-fade-in-right" style={{animationDuration: '0.3s'}}>
                                    {clause.isTextarea ? (
                                        <Textarea id={clause.detailId} value={data[clause.detailId as keyof ContractData] as string} onChange={handleChange} placeholder={clause.placeholder} required error={errors[clause.detailId as keyof ContractData]} rows={4} />
                                    ) : (
                                        <Input id={clause.detailId} value={data[clause.detailId as keyof ContractData] as string} onChange={handleChange} placeholder={clause.placeholder} required error={errors[clause.detailId as keyof ContractData]} />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default Step4Clauses;