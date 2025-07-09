
import React, { useEffect, useRef, useState } from 'react';

const stepsData = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Elige y Completa',
    description: 'Selecciona el tipo de contrato y llena nuestro formulario intuitivo con los datos del arriendo. Es rápido y sencillo.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'La IA Redacta por Ti',
    description: 'Nuestro motor de IA procesa tu información y redacta un borrador legal profesional en segundos, basado en la legislación chilena.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: 'Descarga y Firma',
    description: 'Revisa el documento, descárgalo en Word y ajústalo si es necesario. ¡El último paso es firmarlo ante Notario para que sea legalmente válido!',
  },
];

const HowItWorks: React.FC = () => {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(new Array(stepsData.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setVisibleSteps(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="bg-slate-950 py-20 sm:py-28">
      <style>{`
        .step-item {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .step-item.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .timeline-line {
          content: '';
          position: absolute;
          top: 4.5rem; 
          bottom: -1rem;
          left: 2rem;
          width: 2px;
          background-image: linear-gradient(to bottom, #4f46e5 40%, transparent 60%);
          background-size: 1px 10px;
          background-repeat: repeat-y;
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">¿Cómo Funciona?</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-slate-400">
            Crea tu contrato en tres simples pasos.
          </p>
        </div>
        <div className="relative">
            <ul className="relative md:flex md:justify-between">
                {stepsData.map((step, index) => (
                    <li
                        key={index}
                        ref={(el) => {
                          stepRefs.current[index] = el;
                        }}
                        data-index={index}
                        className={`step-item relative md:flex-1 mb-12 md:mb-0 ${visibleSteps[index] ? 'is-visible' : ''}`}
                        style={{ transitionDelay: `${index * 200}ms` }}
                    >
                        {index !== stepsData.length - 1 && <div className="md:hidden timeline-line"></div>}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-slate-800 border-2 border-slate-700 text-indigo-400 font-bold text-2xl z-10">
                                {index + 1}
                            </div>
                            <div className="ml-6">
                                <div className="flex items-center gap-3 mb-2">
                                    {step.icon}
                                    <h3 className="text-xl font-bold text-slate-100">{step.title}</h3>
                                </div>
                                <p className="text-slate-400">{step.description}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;