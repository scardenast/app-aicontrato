import React, { createContext, useState, useContext, useCallback } from 'react';
import { ContractData, AppContextType, AppProviderProps, ContractType } from '../types';
import { generateContract as generateContractService } from '../services/openaiService';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [contractType, setContractType] = useState<ContractType>('simple');
  const [contractData, setContractData] = useState<ContractData>({
    landlordName: '',
    landlordRUT: '',
    landlordAddress: '',
    tenantName: '',
    tenantRUT: '',
    tenantAddress: '',
    propertyAddress: '',
    propertyRegion: '',
    propertyComuna: '',
    propertyRol: '',
    rentAmountCLP: '',
    rentPaymentDay: '5',
    depositAmountCLP: '',
    contractStartDate: '',
    contractDurationMonths: '12',
    inventory: 'La propiedad se entrega sin muebles.',
    // Professional fields
    landlordNationality: 'Chilena',
    landlordProfession: '',
    tenantNationality: 'Chilena',
    tenantProfession: '',
    // Optional clauses
    includePetsClause: false,
    petsClauseDetails: '',
    includeParkingClause: false,
    parkingClauseDetails: '',
    includeStorageClause: false,
    storageClauseDetails: '',
    includeBankDetailsClause: false,
    bankDetails: '',
  });

  const [generatedContract, setGeneratedContract] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateContract = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setGeneratedContract('');
    try {
      const result = await generateContractService(contractType, contractData);
      setGeneratedContract(result);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [contractType, contractData]);

  const value = {
    contractType,
    setContractType,
    contractData,
    setContractData,
    generatedContract,
    setGeneratedContract,
    isLoading,
    error,
    generateContract,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};