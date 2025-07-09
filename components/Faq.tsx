
import React, { useState } from 'react';
import { faqData } from '../data/faqData';

const FaqItem = ({ faq, isOpen, onClick }: { faq: typeof faqData[0], isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-slate-700/80 py-5">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left text-slate-200 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-medium">{faq.question}</span>
        <span className="ml-6 flex-shrink-0">
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] mt-4' : 'max-h-0'}`}
      >
        <p className="text-slate-400 leading-relaxed pr-6">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

  return (
    <section id="faq" className="bg-slate-950 py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Preguntas Frecuentes</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-slate-400">
                Resolvemos tus dudas para que generes tu contrato con total confianza.
            </p>
        </div>
        <div className="divide-y divide-slate-700/80">
          {faqData.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openFaq === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;