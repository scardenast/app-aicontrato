import React from 'react';

interface ScrollToTopButtonProps {
  show: boolean;
  onClick: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ show, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Subir a crear contrato"
      title="Subir a crear contrato"
      className={`fixed bottom-8 right-8 z-20 p-3 rounded-full bg-indigo-600/90 text-white shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
