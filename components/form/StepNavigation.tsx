import React from 'react';
import Button from '../Button';
import Spinner from '../Spinner';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  isLoading: boolean;
  isProfessional: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ currentStep, totalSteps, onPrev, onNext, isLoading, isProfessional }) => {
  const isFinalStep = currentStep === totalSteps;

  const getFinalStepContent = () => {
    if (isProfessional) {
        return {
            text: 'Pagar y Generar',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm3 0a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
        };
    }
    return {
        text: 'Generar Contrato',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
    };
  };

  return (
    <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center">
      <div>
        {currentStep > 1 && (
          <Button type="button" onClick={onPrev} variant="secondary">
            Anterior
          </Button>
        )}
      </div>
      <div>
        <Button type="button" onClick={onNext} disabled={isLoading} className="min-w-[150px]">
          {isLoading ? (
            <>
              <Spinner />
              <span>{isFinalStep ? 'Generando...' : 'Cargando...'}</span>
            </>
          ) : (
            isFinalStep ? (
              <>
                <span>{getFinalStepContent().text}</span>
                {getFinalStepContent().icon}
              </>
            ) : (
              <>
                <span>Siguiente</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </>
            )
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepNavigation;