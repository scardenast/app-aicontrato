
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
    const headingStyle = "text-xl font-bold text-white mt-8 mb-4";
    const pStyle = "mb-4 leading-relaxed";
    const listStyle = "list-disc list-inside space-y-2 mb-4 pl-4";
    const linkStyle = "text-indigo-400 hover:text-indigo-300 underline";

    return (
        <div className="bg-slate-900 text-slate-300">
            <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-white mb-2">Política de Privacidad</h1>
                    <p className="text-slate-400 mb-8">Última actualización: 1 de Agosto de 2024</p>

                    <div className="text-base">
                        <p className={pStyle}>
                            Bienvenido a AIContrato. Nos tomamos muy en serio tu privacidad. Esta Política de Privacidad explica cómo manejamos tu información personal cuando utilizas nuestra aplicación web.
                        </p>

                        <h2 className={headingStyle}>1. Información que Recopilamos</h2>
                        <p className={pStyle}>
                            Para generar un contrato de arrendamiento, te pedimos que ingreses datos personales, tales como:
                        </p>
                        <ul className={listStyle}>
                            <li>Nombres completos, RUT, nacionalidad, profesión y domicilio del arrendador y arrendatario.</li>
                            <li>Dirección, comuna y rol de avalúo de la propiedad.</li>
                            <li>Términos financieros como monto de la renta y garantía.</li>
                            <li>Detalles para cláusulas opcionales (datos bancarios, detalles de mascotas, etc.).</li>
                        </ul>

                        <h2 className={headingStyle}>2. Cómo Usamos tu Información</h2>
                        <p className={pStyle}>
                            La información que proporcionas se utiliza con un único propósito:
                        </p>
                        <ul className={listStyle}>
                            <li>Para rellenar la plantilla de contrato seleccionada.</li>
                            <li>Para enviar esta información a la API de Google Gemini, que procesa los datos y genera el texto final del contrato.</li>
                        </ul>
                        <p className={`${pStyle} font-semibold text-slate-200`}>
                            No almacenamos, guardamos, ni compartimos tu información personal en nuestros servidores. Los datos que ingresas existen únicamente en tu navegador durante tu sesión activa. Una vez que cierras la pestaña o el navegador, la información se pierde. No tenemos acceso a los contratos que generas.
                        </p>

                        <h2 className={headingStyle}>3. Servicios de Terceros</h2>
                        <p className={pStyle}>
                            Utilizamos la API de OpenAI para la funcionalidad de inteligencia artificial. El uso de nuestro servicio implica que los datos del formulario son procesados por OpenAI. Te recomendamos revisar la <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className={linkStyle}>Política de Privacidad de OpenAI</a> para entender cómo manejan los datos.
                        </p>
                        
                        <h2 className={headingStyle}>4. Seguridad de los Datos</h2>
                        <p className={pStyle}>
                           Implementamos medidas de seguridad razonables para proteger la transmisión de tus datos, como el uso de conexiones seguras (HTTPS). Sin embargo, ningún método de transmisión por Internet o de almacenamiento electrónico es 100% seguro.
                        </p>

                        <h2 className={headingStyle}>5. Tus Derechos</h2>
                        <p className={pStyle}>
                           Dado que no almacenamos tu información personal, no es necesario que solicites su eliminación. Simplemente puedes cerrar la página para descartar tus datos.
                        </p>

                        <h2 className={headingStyle}>6. Cambios a esta Política de Privacidad</h2>
                        <p className={pStyle}>
                            Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos de cualquier cambio publicando la nueva política en esta página. Se te aconseja revisar esta página periódicamente para cualquier cambio.
                        </p>
                        
                        <h2 className={headingStyle}>7. Contacto</h2>
                        <p className={pStyle}>
                            Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos a través de un correo electrónico a <a href="mailto:contacto@aicontrato.example" className={linkStyle}>contacto@aicontrato.example</a>.
                        </p>
                    </div>
                     <div className="mt-12 text-center">
                         <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-semibold">
                           &larr; Volver al Inicio
                         </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
