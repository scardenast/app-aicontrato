
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center">
        <div className="flex justify-center items-center space-x-4 mb-4">
            <Link to="/privacy-policy" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors">
                Política de Privacidad
            </Link>
            <span className="text-slate-500">|</span>
            <Link to="/terms-of-service" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors">
                Términos de Servicio
            </Link>
        </div>
        <p className="text-sm text-slate-300">
          © {new Date().getFullYear()} AIContrato. Todos los derechos reservados.
        </p>
        <p className="text-xs text-slate-400 mt-2">
          <strong>Aviso:</strong> Este es un borrador generado por IA y no constituye asesoramiento legal. 
          Para su validez legal en Chile, el contrato debe ser firmado por ambas partes ante Notario Público. Consulte con un profesional antes de su uso.
        </p>
      </div>
    </footer>
  );
};

export default Footer;