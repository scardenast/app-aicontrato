
import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
    const headingStyle = "text-xl font-bold text-white mt-8 mb-4";
    const pStyle = "mb-4 leading-relaxed";
    const linkStyle = "text-indigo-400 hover:text-indigo-300 underline";

    return (
        <div className="bg-slate-900 text-slate-300">
            <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-white mb-2">Términos de Servicio</h1>
                    <p className="text-slate-400 mb-8">Última actualización: 1 de Agosto de 2024</p>

                    <div className="text-base">
                        <p className={pStyle}>
                           Lea estos Términos de Servicio ("Términos") cuidadosamente antes de usar el sitio web AIContrato (el "Servicio"). Su acceso y uso del Servicio está condicionado a su aceptación y cumplimiento de estos Términos.
                        </p>

                        <h2 className={headingStyle}>1. Aceptación de los Términos</h2>
                        <p className={pStyle}>
                           Al acceder o utilizar el Servicio, usted acepta estar sujeto a estos Términos. Si no está de acuerdo con alguna parte de los términos, no podrá acceder al Servicio.
                        </p>

                        <h2 className={headingStyle}>2. Descripción del Servicio</h2>
                        <p className={pStyle}>
                           AIContrato es una herramienta de software que utiliza inteligencia artificial para ayudar a los usuarios a generar borradores de contratos de arrendamiento para propiedades en Chile. El Servicio utiliza plantillas predefinidas y la información proporcionada por el usuario para crear un documento.
                        </p>

                        <h2 className={`${headingStyle} text-yellow-300`}>3. El Servicio NO Constituye Asesoramiento Legal</h2>
                        <p className={`${pStyle} font-semibold border-l-4 border-yellow-400 pl-4 bg-yellow-900/20 py-2`}>
                           <strong>AIContrato no es un bufete de abogados y no proporciona asesoramiento legal.</strong> Los contratos generados por nuestro Servicio son borradores y se proporcionan únicamente con fines informativos. No deben considerarse como un sustituto del consejo de un abogado calificado.
                        </p>
                        <p className={pStyle}>
                           Las leyes de arrendamiento pueden ser complejas y variar según las circunstancias específicas. Le recomendamos encarecidamente que consulte con un profesional legal para revisar cualquier contrato antes de su firma y para asegurarse de que protege sus intereses y cumple con toda la legislación aplicable.
                        </p>

                        <h2 className={headingStyle}>4. Uso del Servicio</h2>
                        <p className={pStyle}>
                           Usted se compromete a utilizar el Servicio de manera responsable y a proporcionar información precisa y veraz. Usted es el único responsable del contenido que proporciona y del uso que hace del documento final generado. El uso del Servicio para fines ilegales o no autorizados está estrictamente prohibido.
                        </p>

                        <h2 className={headingStyle}>5. Limitación de Responsabilidad</h2>
                        <p className={pStyle}>
                           El Servicio se proporciona "tal cual" y "según disponibilidad". En la máxima medida permitida por la ley, AIContrato, sus directores y afiliados renuncian a toda responsabilidad por cualquier daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la incapacidad de usar el Servicio o los documentos generados, incluso si se ha advertido de la posibilidad de tales daños. Usted utiliza el Servicio bajo su propio riesgo.
                        </p>

                        <h2 className={headingStyle}>6. Propiedad Intelectual</h2>
                        <p className={pStyle}>
                           El Servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de AIContrato. El documento generado es para su uso personal o comercial, pero no le otorga ningún derecho sobre la tecnología subyacente del Servicio.
                        </p>
                        
                        <h2 className={headingStyle}>7. Ley Aplicable</h2>
                        <p className={pStyle}>
                            Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República de Chile, sin tener en cuenta sus disposiciones sobre conflicto de leyes.
                        </p>

                        <h2 className={headingStyle}>8. Cambios a los Términos</h2>
                        <p className={pStyle}>
                            Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Le notificaremos de cualquier cambio publicando los nuevos Términos en esta página.
                        </p>
                        
                        <h2 className={headingStyle}>9. Contacto</h2>
                        <p className={pStyle}>
                           Si tiene alguna pregunta sobre estos Términos, por favor contáctanos a través de un correo electrónico a <a href="mailto:contacto@aicontrato.example" className={linkStyle}>contacto@aicontrato.example</a>.
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

export default TermsOfServicePage;
