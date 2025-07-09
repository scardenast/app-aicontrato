import { ReactNode } from 'react';

export type ContractType = 'simple' | 'professional';

export interface ContractData {
  // Common fields
  landlordName: string;
  landlordRUT: string;
  landlordAddress: string;
  tenantName: string;
  tenantRUT: string;
  tenantAddress: string;
  propertyAddress: string;
  propertyRegion: string;
  propertyComuna: string;
  propertyRol: string;
  rentAmountCLP: string;
  rentPaymentDay: string;
  depositAmountCLP: string;
  contractStartDate: string;
  contractDurationMonths: string;
  inventory: string;

  // Professional fields
  landlordNationality: string;
  landlordProfession: string;
  tenantNationality: string;
  tenantProfession: string;
  
  // Optional clauses
  includePetsClause: boolean;
  petsClauseDetails: string;
  includeParkingClause: boolean;
  parkingClauseDetails: string;
  includeStorageClause: boolean;
  storageClauseDetails: string;
  includeBankDetailsClause: boolean;
  bankDetails: string;
}

export interface AppContextType {
  contractType: ContractType;
  setContractType: React.Dispatch<React.SetStateAction<ContractType>>;
  contractData: ContractData;
  setContractData: React.Dispatch<React.SetStateAction<ContractData>>;
  generatedContract: string;
  setGeneratedContract: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  error: string | null;
  generateContract: () => Promise<boolean>;
}

export interface AppProviderProps {
    children: ReactNode;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  category: 'Consejos Legales' | 'Guías' | 'Noticias' | 'Actualizaciones';
  imageUrl: string;
}