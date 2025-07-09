
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { ContractData } from '../types';
import Button from '../components/Button';
import Spinner from '../components/Spinner';

import HowItWorks from '../components/HowItWorks';
import StepIndicator from '../components/form/StepIndicator';
import StepNavigation from '../components/form/StepNavigation';
import Step1ContractType from '../components/form/Step1ContractType';
import Step2Parties from '../components/form/Step2Parties';
import Step3PropertyAndTerms from '../components/form/Step3PropertyAndTerms';
import Step4Clauses from '../components/form/Step4Clauses';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';
import HeroMockup from '../components/HeroMockup';
import { validateRUT } from '../utils/validation';
import { unformatCLP } from '../utils/formatting';
import CtaSection from '../components/CtaSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { faqData } from '../data/faqData';
import PaymentModal from '../components/PaymentModal';

const HomePage: React.FC = () => {
  const { contractType, contractData, setContractData, generateContract, isLoading, error: apiError } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContractData, string>>>({});
  const [animationClass, setAnimationClass] = useState('animate-fade-in-right');
  const formRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const steps = ['Tipo de Contrato', 'Las Partes', 'Propiedad y Términos', 'Cláusulas'];

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // remove #
      const element = document.getElementById(id);
      if (element) {
        // give a slight delay for the page to render fully before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const faqElement = document.getElementById('faq');
      if (faqElement) {
        const { top } = faqElement.getBoundingClientRect();
        // Show button when the top of the FAQ section is almost visible
        setShowScrollButton(top < window.innerHeight * 0.8);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDataChange = (field: keyof ContractData, value: any) => {
    // When region changes, reset comuna
    if (field === 'propertyRegion') {
        setContractData(prev => ({ ...prev, propertyRegion: value, propertyComuna: '' }));
    } else {
        setContractData(prev => ({ ...prev, [field]: value }));
    }

    if (formErrors[field]) {
        setFormErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Partial<Record<keyof ContractData, string>> = {};
    const { landlordRUT, tenantRUT } = contractData;

    switch (step) {
        case 2:
            const partiesFieldsSimple: (keyof ContractData)[] = ['landlordName', 'landlordRUT', 'landlordAddress', 'tenantName', 'tenantRUT', 'tenantAddress'];
            const partiesFieldsProf: (keyof ContractData)[] = [...partiesFieldsSimple, 'landlordNationality', 'landlordProfession', 'tenantNationality', 'tenantProfession'];
            const partiesRequired = contractType === 'simple' ? partiesFieldsSimple : partiesFieldsProf;
            
            partiesRequired.forEach(key => { if (!contractData[key]) errors[key] = 'Este campo es requerido.'; });
            
            if (landlordRUT && !validateRUT(landlordRUT)) errors.landlordRUT = 'El RUT del arrendador no es válido.';
            if (tenantRUT && !validateRUT(tenantRUT)) errors.tenantRUT = 'El RUT del arrendatario no es válido.';
            break;
        case 3:
            const propertyFields: (keyof ContractData)[] = ['propertyAddress', 'propertyRegion', 'propertyComuna', 'rentAmountCLP', 'depositAmountCLP', 'contractStartDate'];
            if (contractType === 'professional') propertyFields.push('propertyRol');
            
            propertyFields.forEach(key => { if (!contractData[key]) errors[key] = 'Este campo es requerido.'; });
            
            const rentAmount = Number(unformatCLP(contractData.rentAmountCLP));
            if (contractData.rentAmountCLP && (isNaN(rentAmount) || rentAmount <= 0)) errors.rentAmountCLP = 'Debe ser un número positivo.';
            
            const depositAmount = Number(unformatCLP(contractData.depositAmountCLP));
            if (contractData.depositAmountCLP && (isNaN(depositAmount) || depositAmount < 0)) errors.depositAmountCLP = 'Debe ser un número positivo o cero.';
            
            break;
        case 4:
            if (!contractData.inventory) errors.inventory = 'Este campo es requerido.';
            if (contractType === 'professional') {
                if (contractData.includePetsClause && !contractData.petsClauseDetails) errors.petsClauseDetails = 'Debe especificar los detalles.';
                if (contractData.includeParkingClause && !contractData.parkingClauseDetails) errors.parkingClauseDetails = 'Debe especificar los detalles.';
                if (contractData.includeStorageClause && !contractData.storageClauseDetails) errors.storageClauseDetails = 'Debe especificar los detalles.';
                if (contractData.includeBankDetailsClause && !contractData.bankDetails) errors.bankDetails = 'Debe especificar los detalles.';
            }
            break;
    }
    
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
        // Scroll to the first error
        const firstErrorKey = Object.keys(errors)[0];
        const errorElement = document.getElementById(firstErrorKey);
        errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return Object.keys(errors).length === 0;
  };

  const handlePaymentSuccess = async () => {
    setIsPaymentModalOpen(false);
    const success = await generateContract();
    if (success) {
        navigate('/contract');
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length && validateStep(currentStep)) {
      setAnimationClass('animate-fade-out-left');
      setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setAnimationClass('animate-fade-in-right');
          window.scrollTo(0, formRef.current?.offsetTop ? formRef.current.offsetTop - 100 : 0);
      }, 300);
    } else if (currentStep === steps.length) {
        if (validateStep(currentStep)) {
          if (contractType === 'professional') {
            setIsPaymentModalOpen(true);
          } else {
            const success = await generateContract();
            if (success) {
                navigate('/contract');
            }
          }
        }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
        setAnimationClass('animate-fade-out-right');
        setTimeout(() => {
            setCurrentStep(currentStep - 1);
            setAnimationClass('animate-fade-in-left');
            window.scrollTo(0, formRef.current?.offsetTop ? formRef.current.offsetTop - 100 : 0);
        }, 300);
    }
  };

  const handleFillWithTestData = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    setContractData({
        landlordName: 'José Ignacio Pérez Soto',
        landlordRUT: '18.665.631-8',
        landlordAddress: 'Avenida Providencia 1234, Depto 101, Providencia',
        landlordNationality: 'Chilena',
        landlordProfession: 'Ingeniero Comercial',
        tenantName: 'Carolina Andrea Rojas Castro',
        tenantRUT: '17.771.184-5',
        tenantAddress: 'Calle Los Plátanos 567, Casa B, Ñuñoa',
        tenantNationality: 'Chilena',
        tenantProfession: 'Diseñadora Gráfica',
        propertyAddress: 'Merced 821, Depto 5B',
        propertyRegion: 'Región Metropolitana de Santiago',
        propertyComuna: 'Santiago',
        propertyRol: '1122-33',
        rentAmountCLP: '450000',
        rentPaymentDay: '5',
        depositAmountCLP: '450000',
        contractStartDate: formattedDate,
        contractDurationMonths: '12',
        inventory: 'Propiedad se arrienda sin muebles. Incluye lámparas y cortinas roller. Cocina equipada con horno, encimera y campana.',
        includePetsClause: true,
        petsClauseDetails: 'Una mascota pequeña, raza Yorkshire Terrier.',
        includeParkingClause: true,
        parkingClauseDetails: 'E-125, en subterráneo -2.',
        includeStorageClause: false,
        storageClauseDetails: '',
        includeBankDetailsClause: true,
        bankDetails: 'Banco: BancoEstado\nTipo de Cuenta: Cuenta Corriente\nN° Cuenta: 12345678\nNombre: José Ignacio Pérez Soto\nRUT: 18.665.631-8\nEmail: j.perez.soto@email.com',
    });
    setFormErrors({});
  };
  
  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleTestDataAndScroll = () => {
    handleFillWithTestData();
    setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  
  const renderStep = () => {
    switch (currentStep) {
        case 1: return <Step1ContractType />;
        case 2: return <Step2Parties contractType={contractType} data={contractData} onDataChange={handleDataChange} errors={formErrors} />;
        case 3: return <Step3PropertyAndTerms contractType={contractType} data={contractData} onDataChange={handleDataChange} errors={formErrors} />;
        case 4: return <Step4Clauses contractType={contractType} data={contractData} onDataChange={handleDataChange} errors={formErrors} />;
        default: return null;
    }
  };

  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }), []);

  const softwareSchema = useMemo(() => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "AIContrato",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "description": "Generador de contratos de arrendamiento para Chile poteniado por IA. Crea borradores legales personalizados para arriendos simples o profesionales en minutos.",
      "offers": [
          {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "CLP",
              "name": "Básico"
          },
          {
              "@type": "Offer",
              "price": "1990",
              "priceCurrency": "CLP",
              "name": "Profesional"
          }
      ],
      "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "42"
      },
      "softwareHelp": {
          "@type": "CreativeWork",
          "url": "https://your-domain.com/#faq"
      }
  }), []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <style>{`
        @keyframes fade-in-right {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-out-left {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-20px); }
        }
        @keyframes fade-in-left {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-out-right {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(20px); }
        }
        .animate-fade-in-right { animation: fade-in-right 0.3s ease-out forwards; }
        .animate-fade-out-left { animation: fade-out-left 0.3s ease-in forwards; }
        .animate-fade-in-left { animation: fade-in-left 0.3s ease-out forwards; }
        .animate-fade-out-right { animation: fade-out-right 0.3s ease-in forwards; }
      `}</style>
      <div className="bg-slate-900">
        <section className="mx-auto max-w-screen-xl pt-28 pb-20 px-4 items-center lg:flex md:px-8">
            <div className="space-y-5 flex-1 sm:text-center lg:text-left">
                <h1 className="text-white font-bold text-4xl xl:text-5xl">
                    Genera Contratos de Arriendo
                    <span className="text-indigo-400"> Profesionales en Minutos</span>
                </h1>
                <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                    Nuestra plataforma utiliza inteligencia artificial para crear borradores de contratos de arrendamiento personalizados para Chile. Completa un simple formulario y obtén tu documento legal listo para usar.
                </p>
                <div className="!mt-8 !mb-4">
                  <Testimonials />
                </div>
                <div className="pt-0 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                    <Button onClick={handleScrollToForm} variant="primary" className="w-full sm:w-auto">
                        Empezar Ahora
                    </Button>
                    <Button onClick={handleTestDataAndScroll} variant="secondary" className="w-full sm:w-auto">
                        Probar con Datos de Ejemplo
                    </Button>
                </div>
            </div>
            <div className="flex-1 text-center mt-12 lg:mt-0 lg:ml-3">
                <HeroMockup />
            </div>
        </section>
      </div>

      <HowItWorks />

      <div ref={formRef} className="relative bg-slate-900 py-20 sm:py-28">
         <div
            className="absolute inset-0 -z-10 h-full w-full"
            style={{
                background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent)'
            }}
        ></div>

        <div id="form-section" className="relative max-w-4xl mx-auto px-4">
            <div className="relative text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Crea tu Contrato de Arriendo</h2>
                <p className="mt-4 text-lg text-slate-300">Sigue los pasos para que nuestra IA genere un borrador profesional.</p>
            </div>

            <div className="bg-slate-950/60 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl shadow-black/40">
                <StepIndicator steps={steps} currentStep={currentStep} />
                
                <div className="mt-10 relative">
                    <div className={animationClass} key={currentStep}>
                        {renderStep()}
                    </div>
                </div>

                {apiError && <p className="text-red-500 bg-red-900/40 border border-red-500/30 p-3 rounded-md my-6 text-sm text-center">{apiError}</p>}
                
                <StepNavigation 
                    currentStep={currentStep}
                    totalSteps={steps.length}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    isLoading={isLoading}
                    isProfessional={contractType === 'professional'}
                />
            </div>
        </div>
      </div>
      
      <Faq />

      <CtaSection />

      <ScrollToTopButton show={showScrollButton} onClick={handleScrollToForm} />
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        amount="1990"
      />
    </>
  );
};

export default HomePage;