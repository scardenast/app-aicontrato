import React, { ChangeEvent, useMemo } from 'react';
import { ContractData, ContractType } from '../../types';
import Input from '../Input';
import Select from '../Select';
import { chileanRegions } from '../../data/chileanData';
import { formatCLP, unformatCLP } from '../../utils/formatting';

interface Props {
  contractType: ContractType;
  data: ContractData;
  onDataChange: (field: keyof ContractData, value: string) => void;
  errors: Partial<Record<keyof ContractData, string>>;
}

const Step3PropertyAndTerms: React.FC<Props> = ({ contractType, data, onDataChange, errors }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'rentAmountCLP' || id === 'depositAmountCLP') {
            const numericValue = unformatCLP(value);
            // Allow only numbers
            if (/^\d*$/.test(numericValue)) {
                onDataChange(id as keyof ContractData, numericValue);
            }
        } else {
             onDataChange(id as keyof ContractData, value);
        }
    };
    
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onDataChange(e.target.id as keyof ContractData, e.target.value);
    };

    const communesForSelectedRegion = useMemo(() => {
        const selectedRegion = chileanRegions.find(r => r.name === data.propertyRegion);
        return selectedRegion ? selectedRegion.communes : [];
    }, [data.propertyRegion]);

    const termsFields = [
        { id: 'rentAmountCLP', label: 'Monto Renta (CLP)', type: 'text', inputMode: 'numeric' },
        { id: 'depositAmountCLP', label: 'Monto Garantía (CLP)', type: 'text', inputMode: 'numeric' },
        { id: 'contractStartDate', label: 'Fecha de Inicio', type: 'date' },
        { id: 'rentPaymentDay', label: 'Día de Pago (1-28)', type: 'number', min: 1, max: 28 },
        { id: 'contractDurationMonths', label: 'Duración (meses)', type: 'number', min: 1 }
    ];

    return (
        <div>
            <div className="text-center mb-10">
                <h3 className="text-xl font-semibold leading-7 text-slate-100">Sobre la Propiedad y los Términos</h3>
                <p className="text-slate-400 mt-1">Define el inmueble y las condiciones del acuerdo.</p>
            </div>
            
            <div className="space-y-10">
                <div>
                    <h3 className="text-lg font-semibold leading-7 text-slate-200 mb-4 flex items-center"><span className="text-2xl mr-3">🔑</span>Detalles de la Propiedad</h3>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <Input
                                id="propertyAddress"
                                label="Dirección de la Propiedad"
                                value={data.propertyAddress as string}
                                onChange={handleInputChange}
                                error={errors.propertyAddress}
                                required
                                tooltip="Calle y número de la propiedad que se arrienda (Ej: Av. Providencia 1234, Depto 5B)."
                                placeholder="Ej: Av. Providencia 1234, Depto 5B"
                            />
                        </div>

                         <Select
                            id="propertyRegion"
                            label="Región"
                            value={data.propertyRegion}
                            onChange={handleSelectChange}
                            error={errors.propertyRegion}
                            required
                        >
                            <option value="">Seleccione una región...</option>
                            {chileanRegions.map(region => (
                                <option key={region.number} value={region.name}>{region.name}</option>
                            ))}
                        </Select>

                        <Select
                            id="propertyComuna"
                            label="Comuna"
                            value={data.propertyComuna}
                            onChange={handleSelectChange}
                            error={errors.propertyComuna}
                            required
                            disabled={!data.propertyRegion}
                        >
                            <option value="">Seleccione una comuna...</option>
                            {communesForSelectedRegion.map(comuna => (
                                <option key={comuna.name} value={comuna.name}>{comuna.name}</option>
                            ))}
                        </Select>

                        {contractType === 'professional' && (
                             <div className="sm:col-span-2">
                                <Input
                                    id="propertyRol"
                                    label="Rol de Avalúo Fiscal"
                                    value={data.propertyRol as string}
                                    onChange={handleInputChange}
                                    error={errors.propertyRol}
                                    required
                                    tooltip="Identificador único de la propiedad ante el SII. Ej: 1234-56. Es opcional pero recomendado para mayor formalidad."
                                    placeholder="Ej: 1234-56"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold leading-7 text-slate-200 mb-4 flex items-center"><span className="text-2xl mr-3">📜</span>Condiciones del Contrato</h3>
                     <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                        {termsFields.map(field => (
                            <div key={field.id}>
                                <Input
                                    id={field.id}
                                    label={field.label}
                                    type={field.type || 'text'}
                                    inputMode={field.inputMode as any}
                                    value={field.id.includes('Amount') ? formatCLP(data[field.id as keyof ContractData] as string) : data[field.id as keyof ContractData] as string}
                                    onChange={handleInputChange}
                                    error={errors[field.id as keyof ContractData]}
                                    required
                                    min={field.min}
                                    max={field.max}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3PropertyAndTerms;