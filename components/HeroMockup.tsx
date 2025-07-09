import React, { useState, useEffect, useRef } from 'react';

const HeroMockup: React.FC = () => {
    const sourceLines = [
        "CONTRATO DE ARRIENDO",
        "",
        "En la ciudad de Santiago, comuna de Santiago Centro, a 07 de Julio de 2025, comparecen:",
        "",
        "EL ARRENDADOR:",
        "Don José Ignacio Pérez Soto, cédula de identidad N° 15.665.634-8, con domicilio en Avenida Providencia 1234, Providencia, Santiago, en adelante también \"el Arrendador\".",
        "",
        "EL ARRENDATARIO:",
        "Doña Carolina Andrea Rojas Castro, cédula de identidad N° 13.371.154-5, con domicilio en Calle Los Plátanos 567, Ñuñoa, Santiago, en adelante también \"el Arrendatario\".",
        "",
        "Los comparecientes, mayores de edad, han convenido en el siguiente contrato de arrendamiento:",
        "",
        "PRIMERO: PROPIEDAD ARRENDADA.",
        "El Arrendador da en arrendamiento al Arrendatario el inmueble ubicado en Merced 821, Depto 5B, en la comuna de Santiago Centro. El Arrendatario declara conocer y aceptar el estado de la propiedad.",
        "",
        "SEGUNDO: RENTA Y PAGO.",
        "La renta mensual de arrendamiento será la suma de $450.000 (cuatrocientos cincuenta mil pesos chilenos), que se pagará por anticipado dentro de los primeros cinco días de cada mes.",
        "",
        "TERCERO: DURACIÓN.",
        "El presente contrato rige a partir de esta fecha y tendrá una duración de 12 meses, renovándose automáticamente por períodos iguales si ninguna de las partes manifestare su voluntad de ponerle término.",
    ];

    const [lines, setLines] = useState<string[]>(['']);
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [lines]);
    
    useEffect(() => {
        const restartTyping = () => {
            setLines(['']);
            setLineIndex(0);
            setCharIndex(0);
        };
        
        if (lineIndex >= sourceLines.length) {
            const timer = setTimeout(restartTyping, 8000); // Wait longer before restart
            return () => clearTimeout(timer);
        }

        const currentSourceLine = sourceLines[lineIndex];

        // Handle empty lines for spacing
        if (currentSourceLine.length === 0) {
            const emptyLineTimeout = setTimeout(() => {
                 setLines(prevLines => [...prevLines, '']);
                 setLineIndex(lineIndex + 1);
                 setCharIndex(0);
            }, 150);
            return () => clearTimeout(emptyLineTimeout);
        }
        
        // Type characters
        if (charIndex < currentSourceLine.length) {
            const typingTimeout = setTimeout(() => {
                setLines(prevLines => {
                    const newLines = [...prevLines];
                    newLines[lineIndex] = currentSourceLine.slice(0, charIndex + 1);
                    return newLines;
                });
                setCharIndex(charIndex + 1);
            }, 20);
            return () => clearTimeout(typingTimeout);
        } else { // End of line, move to next
            const lineEndTimeout = setTimeout(() => {
                if (lineIndex < sourceLines.length - 1) {
                    setLines(prevLines => [...prevLines, '']);
                    setLineIndex(lineIndex + 1);
                    setCharIndex(0);
                } else {
                    setLineIndex(lineIndex + 1); // Mark as finished
                }
            }, 300); 
            return () => clearTimeout(lineEndTimeout);
        }
    }, [charIndex, lineIndex, sourceLines]);
    
    const WordIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 9.5V5.5C20.5 4.94772 20.0523 4.5 19.5 4.5H13.5M11.5 4.5H4.5C3.94772 4.5 3.5 4.94772 3.5 5.5V18.5C3.5 19.0523 3.94772 19.5 4.5 19.5H19.5C20.0523 19.5 20.5 19.0523 20.5 18.5V14.5M7.5 12.5L10 8L12.5 12.5M11.5 16.5H8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>;
    const BoldIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 12.5C15.5 14.71 13.71 16.5 11.5 16.5H7.5V7.5H10.5C12.71 7.5 14.5 9.29 14.5 11.5C14.5 12.08 14.36 12.63 14.11 13.11C14.89 13.53 15.5 14.15 15.5 15V15.5C15.5 14.71 13.71 16.5 11.5 16.5H7.5V7.5H10.5C12.71 7.5 14.5 9.29 14.5 11.5S12.71 15.5 10.5 15.5H9.5V12.5H11.5C12.71 12.5 13.5 11.71 13.5 10.5C13.5 9.29 12.71 8.5 11.5 8.5H9.5V7.5H10.5C12.71 7.5 14.5 9.29 14.5 11.5C14.5 12.08 14.36 12.63 14.11 13.11L15.65 14.65C16.14 14.16 16.5 13.58 16.5 12.83V12.5C16.5 11.05 15.45 9.56 14.11 8.89C14.36 8.37 14.5 7.92 14.5 7.5C14.5 5.29 12.71 3.5 10.5 3.5H6.5V18.5H11.5C14.81 18.5 17.5 15.81 17.5 12.5V11.5C17.5 10.15 16.45 8.66 15.11 7.89C15.36 7.37 15.5 6.92 15.5 6.5C15.5 4.29 13.71 2.5 11.5 2.5H5.5C4.95 2.5 4.5 2.95 4.5 3.5V19.5C4.5 20.05 4.95 20.5 5.5 20.5H12.5C15.81 20.5 18.5 17.81 18.5 14.5V12.5C18.5 10.54 17.3 8.8 15.5 7.83V7.5Z M13.5 13.5H9.5V15.5H11.5C12.71 15.5 13.5 14.71 13.5 13.5Z"/></svg>;
    const ItalicIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M10 5.5H14L11 18.5H7L10 5.5M10.5 3.5L6.5 20.5H9.5L13.5 3.5H10.5Z"/></svg>;
    const UnderlineIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.5C14.21 17.5 16 15.71 16 13.5V3.5H14V13.5C14 14.6 13.1 15.5 12 15.5C10.9 15.5 10 14.6 10 13.5V3.5H8V13.5C8 15.71 9.79 17.5 12 17.5ZM6 19.5V17.5H18V19.5H6Z"/></svg>;
    const AlignJustifyIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 9H21V11H3V9ZM3 14H21V16H3V14ZM3 19H21V21H3V19Z"/></svg>;
    const AlignLeftIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 9H15V11H3V9ZM3 14H21V16H3V14ZM3 19H15V21H3V19Z"/></svg>;

    return (
        <div className="w-full max-w-4xl mx-auto rounded-t-lg shadow-2xl overflow-hidden border border-gray-300 bg-gray-100">
             <style>{`
                .mockup-scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .mockup-scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                    scroll-behavior: smooth;
                }
            `}</style>
            <div className="bg-blue-600 px-3 py-1 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2">
                    <WordIcon />
                    <span>contrato-arriendo - Word</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-gray-200/40"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-200/40"></div>
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                </div>
            </div>
            
            <div className="bg-gray-50 border-b border-gray-200 text-sm text-gray-700">
                <div className="px-4 pt-2 flex items-center gap-5">
                    <span className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">Archivo</span>
                    <span>Inicio</span>
                    <span>Insertar</span>
                    <span>Diseño</span>
                    <span>Revisar</span>
                </div>
                <div className="px-4 py-2 flex items-center gap-6 text-gray-600">
                    <div className="flex items-center p-1 bg-gray-200 rounded">
                        <span className="px-1"><BoldIcon /></span>
                        <span className="p-1"><ItalicIcon /></span>
                        <span className="p-1"><UnderlineIcon /></span>
                    </div>
                     <div className="flex items-center p-1 bg-blue-100 rounded">
                        <span className="p-1 text-blue-600"><AlignLeftIcon /></span>
                        <span className="p-1"><AlignJustifyIcon /></span>
                    </div>
                </div>
            </div>

            <div className="p-4 sm:p-8 md:p-6 bg-gray-200/70">
                <div ref={scrollContainerRef} className="bg-white shadow-lg p-8 sm:p-10 h-[320px] overflow-y-auto mockup-scrollbar-hide font-serif text-slate-800 text-[13px]">
                    {lines.map((line, index) => {
                        const isTitle = index === 0;
                        const isSubheading = /^[A-ZÁÉÍÓÚÑ\s.:]+$/.test(line.trim()) && line.length > 2 && line.length < 35 && !line.match(/^\d/);
                        const isRegularParagraph = !isTitle && !isSubheading && line.trim() !== '';

                        let className = 'min-h-[1.4em]';
                        if (isTitle) className += ' text-center font-bold text-sm mb-4';
                        else if (isSubheading) className += ' text-left font-bold text-xs mt-3 mb-1';
                        else if (isRegularParagraph) className += ' text-justify mb-2 leading-snug';

                        return (
                             <p key={index} className={className}>
                                {line}
                                {index === lineIndex && lineIndex < sourceLines.length && (
                                    <span className="animate-pulse text-slate-500">|</span>
                                )}
                            </p>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default HeroMockup;
