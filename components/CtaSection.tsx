
import React from 'react';

const CtaSection: React.FC = () => {
    const handleScrollToForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formSection = document.getElementById('form-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        // Outer section: "azul mas claro" (lighter blue). Using bg-slate-900.
        <section className="bg-slate-900 py-20 sm:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Inner container: "azul mas oscuro" (darker blue) card, styled like the image */}
                <div
                    className="relative text-center px-8 py-20 rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                        backgroundColor: '#020617', // slate-950, a very dark blue/black
                        backgroundImage: `
                            repeating-linear-gradient(90deg, transparent, transparent 99px, rgba(255, 255, 255, 0.05) 100px, rgba(255, 255, 255, 0.05) 101px),
                            radial-gradient(ellipse at 50% -100%, rgba(59, 130, 246, 0.1), transparent)
                        `
                    }}
                >
                    {/* The subtle horizontal line seen in the image's design */}
                    <div className="absolute left-0 right-0 top-[52%] h-px bg-slate-200/10 transform -translate-y-1/2"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl max-w-3xl mx-auto">
                           Crea tu próximo contrato con AIContrato
                        </h2>
                        
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                             <button
                                onClick={handleScrollToForm}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                            >
                                Empezar Ahora
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
