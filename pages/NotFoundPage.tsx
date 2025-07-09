
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full min-h-[60vh] px-4 pt-24 md:pt-28 pb-8">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div className="bg-slate-600 px-2 text-sm rounded rotate-12 absolute text-white">
            Página No Encontrada
        </div>
        <p className="mt-4 text-lg text-slate-400">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <Link to="/" className="mt-8">
            <Button>
                Volver al Inicio
            </Button>
        </Link>
    </div>
  );
};

export default NotFoundPage;