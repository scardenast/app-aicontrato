
import React from 'react';

// Mock data for testimonials, tailored for a Chilean audience
const testimonials = [
  {
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Javiera Pérez',
    handle: '@javiperez',
    text: 'Como corredora de propiedades, esta herramienta es un salvavidas. Genero borradores para mis clientes en minutos. ¡Totalmente recomendada!',
    date: 'Jun 12, 2024',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Benjamín Rojas',
    handle: '@benjarojas',
    text: 'Arrendé mi primer departamento y usé esta app para entender el contrato. La versión simple es clara y me dio la confianza que necesitaba.',
    date: 'Jun 10, 2024',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Matías González',
    handle: '@mati_gonzalez',
    text: 'Simple, rápido y efectivo. El contrato profesional tiene todas las cláusulas que buscaba. Me ahorró tiempo y dinero en asesoría legal.',
    date: 'Jun 05, 2024',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Isidora Castro',
    handle: '@isicastro',
    text: '¡Una maravilla! La interfaz es muy intuitiva y el resultado es un documento profesional. El poder agregar cláusulas de mascotas es un plus.',
    date: 'May 28, 2024',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Sebastián Muñoz',
    handle: '@sebamunoz',
    text: 'Excelente plataforma para estandarizar los contratos de arriendo de mis propiedades. La opción de descarga en Word es perfecta.',
    date: 'May 22, 2024',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Catalina Silva',
    handle: '@catalinasilva',
    text: 'La funcionalidad para rellenar con datos de ejemplo es genial para probar la plataforma. El resultado final es muy profesional.',
    date: 'May 19, 2024',
  }
];

// Duplicate testimonials for a seamless loop
const duplicatedTestimonials = [...testimonials, ...testimonials];

const TestimonialCard: React.FC<Pick<typeof testimonials[0], 'avatar' | 'name' | 'text'>> = ({ avatar, name, text }) => (
  <li className="flex-shrink-0 w-[280px] p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 shadow-lg">
    <div className="flex items-center gap-3">
      <img className="w-10 h-10 rounded-full object-cover" src={avatar} alt={name} loading="lazy" />
      <div>
        <p className="font-semibold text-white text-sm">{name}</p>
        <p className="text-slate-300 text-xs mt-0.5">"{text.substring(0, 75)}..."</p>
      </div>
    </div>
  </li>
);


const Testimonials: React.FC = () => {
  return (
    <div className="max-w-xl lg:ml-0 sm:mx-auto">
        <div
            className="relative w-full overflow-hidden"
            style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
        >
            <style>{`
            @keyframes scroll-sm {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
            }
            .scrolling-wrapper-sm {
                animation: scroll-sm 70s linear infinite;
            }
            `}</style>
            <ul className="flex gap-4 w-max p-2 scrolling-wrapper-sm hover:[animation-play-state:paused]">
            {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={index} avatar={testimonial.avatar} name={testimonial.name} text={testimonial.text} />
            ))}
            </ul>
        </div>
    </div>
  );
};

export default Testimonials;
