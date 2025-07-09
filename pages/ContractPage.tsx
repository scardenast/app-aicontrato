
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import saveAs from 'file-saver';

const ContractPage: React.FC = () => {
  const { contractData, generatedContract, isLoading, error } = useAppContext();
  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState('');
  const contractContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!generatedContract && !isLoading && !error) {
      navigate('/');
    }
  }, [generatedContract, isLoading, error, navigate]);

  const handleCopy = () => {
    if (contractContentRef.current) {
        navigator.clipboard.writeText(contractContentRef.current.innerText).then(() => {
        setCopySuccess('¡Copiado!');
        setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
        setCopySuccess('Error al copiar.');
        });
    }
  };

  const handleStartOver = () => {
    navigate('/');
  };
  
  const handleDownloadWord = () => {
    if (!generatedContract || !contractData) return;

    let contractBodyText = generatedContract.trim();

    // If bank details are included, find and replace them with a formatted 2-column HTML table.
    if (contractData.includeBankDetailsClause && contractData.bankDetails) {
        const bankDetailsLines = contractData.bankDetails.trim().split('\n').filter(l => l.trim() !== '');
        const midPoint = Math.ceil(bankDetailsLines.length / 2);
        const leftColumnLines = bankDetailsLines.slice(0, midPoint);
        const rightColumnLines = bankDetailsLines.slice(midPoint);

        const generateColumnHtml = (lines: string[]) => {
            let columnHtml = '<table style="border-collapse: collapse; width: 100%; font-family: \'Times New Roman\', Times, serif; font-size: 11pt;"><tbody>';
            for (const detailLine of lines) {
                const parts = detailLine.split(':');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const value = parts.slice(1).join(':').trim();
                    columnHtml += `<tr>
                                    <td style="padding: 1px 8px 1px 0; text-align: left; vertical-align: top; white-space: nowrap;"><b>${key}:</b></td>
                                    <td style="padding: 1px 0; text-align: left; vertical-align: top;">${value}</td>
                                </tr>`;
                } else {
                    columnHtml += `<tr><td colspan="2" style="padding: 1px 0;">${detailLine}</td></tr>`;
                }
            }
            columnHtml += '</tbody></table>';
            return columnHtml;
        };
        
        const leftColumn = generateColumnHtml(leftColumnLines);
        const rightColumn = generateColumnHtml(rightColumnLines);

        const bankDetailsHtml = `
            <table style="width: 100%; border-collapse: collapse; margin-top: 8pt; margin-bottom: 12pt;">
                <tbody>
                    <tr>
                        <td style="width: 50%; vertical-align: top; padding-right: 15px;">${leftColumn}</td>
                        <td style="width: 50%; vertical-align: top; padding-left: 15px;">${rightColumn}</td>
                    </tr>
                </tbody>
            </table>
        `;
        
        contractBodyText = contractBodyText.replace(contractData.bankDetails, bankDetailsHtml);
    }

    const processTextToHtml = (text: string): string => {
        const lines = text.split('\n');
        
        return lines.map(line => {
            const trimmedLine = line.trim();
            if (trimmedLine === '') return '';

            // If a line is already HTML (our table), don't wrap it in <p> tags.
            if (trimmedLine.startsWith('<table')) {
                return trimmedLine;
            }
            
            // Main title: centered, bold, size 14pt
            if (trimmedLine.startsWith('CONTRATO DE ARRIENDO')) {
                return `<h1 style="text-align: center; font-weight: bold; font-size: 14pt; margin-bottom: 24pt; font-family: 'Times New Roman', Times, serif;">${trimmedLine}</h1>`;
            }

            // Other titles (e.g., "EL ARRENDADOR:", "PRIMERO: ..."): left-aligned, bold, size 11pt
            const isSubtitle = /^[A-ZÁÉÍÓÚÑ\s.:]+$/.test(trimmedLine) && trimmedLine === trimmedLine.toUpperCase();
            if (isSubtitle && trimmedLine.length > 2 && !trimmedLine.match(/^\d/)) {
                return `<h2 style="text-align: left; font-weight: bold; font-size: 11pt; margin-top: 20pt; margin-bottom: 12pt; font-family: 'Times New Roman', Times, serif;">${trimmedLine}</h2>`;
            }
            
            // Regular paragraphs: justified text
            return `<p style="text-align: justify; margin-bottom: 12pt; line-height: 1.5; font-size: 11pt;">${trimmedLine}</p>`;
        }).join('');
    };
    
    const contractHtml = processTextToHtml(contractBodyText);

const signatureHeaderHtml = `
    <h2 style="text-align: left; font-weight: bold; font-size: 11pt; margin-top: 20pt; margin-bottom: 12pt; font-family: 'Times New Roman', Times, serif;">FIRMAS</h2>
    <p style="text-align: justify; margin-bottom: 12pt; line-height: 1.5; font-size: 11pt;">Para constancia, las partes firman el presente contrato en dos ejemplares de igual tenor y fecha.</p>
`;

const signatureBlockHtml = `
  <br />
  <table style="width: 100%; border-collapse: collapse; margin-top: 50px; page-break-inside: avoid; font-family: 'Times New Roman', Times, serif; font-size: 11pt;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 20px 40px; text-align: center; vertical-align: top;">
          <div style="height: 80px;"></div>
          <table style="width: 90%; margin: 0 auto 10px auto; border-collapse: collapse;">
            <tr><td style="border-bottom: 1px solid #000;">&nbsp;</td></tr>
          </table>
          <p style="margin: 0; font-weight: normal;">${contractData.landlordName}</p>
          <p style="margin: 4px 0 4px 0;">RUT: ${contractData.landlordRUT}</p>
          <p style="margin: 0; font-weight: bold;">ARRENDADOR</p>
        </td>
        <td style="width: 50%; padding: 20px 40px; text-align: center; vertical-align: top;">
          <div style="height: 80px;"></div>
          <table style="width: 90%; margin: 0 auto 10px auto; border-collapse: collapse;">
            <tr><td style="border-bottom: 1px solid #000;">&nbsp;</td></tr>
          </table>
          <p style="margin: 0; font-weight: normal;">${contractData.tenantName}</p>
          <p style="margin: 4px 0 4px 0;">RUT: ${contractData.tenantRUT}</p>
          <p style="margin: 0; font-weight: bold;">ARRENDATARIO</p>
        </td>
      </tr>
    </tbody>
  </table>
`;


    const fullHtml = `
        <!DOCTYPE html>
        <html xmlns:w="urn:schemas-microsoft-com:office:word">
        <head>
            <meta charset="UTF-8">
            <!--[if gte mso 9]>
            <xml>
                <w:WordDocument>
                    <w:View>Print</w:View>
                    <w:Zoom>100</w:Zoom>
                    <w:DoNotOptimizeForBrowser/>
                </w:WordDocument>
            </xml>
            <![endif]-->
            <style>
                @page WordSection1 {
                    size: 8.5in 11.0in;
                    margin: 1.0in 1.0in 1.0in 1.0in;
                }
                div.WordSection1 {
                    page: WordSection1;
                }
                body {
                    font-family: 'Times New Roman', Times, serif;
                    font-size: 11pt;
                }
                p {
                   margin: 0; 
                }
                table {
                    border-collapse: collapse;
                }
            </style>
        </head>
        <body>
            <div class="WordSection1">
                ${contractHtml}
                ${signatureHeaderHtml}
                ${signatureBlockHtml}
            </div>
        </body>
        </html>
    `;

    const blob = new Blob([fullHtml], { type: 'application/msword;charset=utf-8' });
    saveAs(blob, 'contrato-arriendo.doc');
  };
  
  const SignatureBlock = () => {
    if (!contractData?.landlordName) {
      return null;
    }

    return (
      <div className="mt-20 font-serif text-sm text-slate-800">
        <div className="flex justify-around text-center gap-12">
          <div className="flex-1">
            <div className="h-20" /> {/* Spacer for signature */}
            <div className="border-b border-slate-700 w-11/12 mx-auto mb-3" />
            <p>{contractData.landlordName}</p>
            <p>RUT: {contractData.landlordRUT}</p>
            <p className="font-bold">ARRENDADOR</p>
          </div>
          <div className="flex-1">
            <div className="h-20" /> {/* Spacer for signature */}
            <div className="border-b border-slate-700 w-11/12 mx-auto mb-3" />
            <p>{contractData.tenantName}</p>
            <p>RUT: {contractData.tenantRUT}</p>
            <p className="font-bold">ARRENDATARIO</p>
          </div>
        </div>
      </div>
    );
  };

  const contractBody = useMemo(() => {
    if (!generatedContract || !contractData) return null;
    
    let bodyText = generatedContract;
    
    const bankDetailsPlaceholder = '[[BANK_DETAILS_GRID_PLACEHOLDER]]';
    let bankDetailsGrid = null;

    if (contractData.includeBankDetailsClause && contractData.bankDetails) {
        // Replace the raw bank details text with our placeholder
        bodyText = bodyText.replace(contractData.bankDetails, bankDetailsPlaceholder);

        const bankDetailsLines = contractData.bankDetails.trim().split('\n').filter(l => l.trim() !== '');
        
        // Create the grid component to be used later
        bankDetailsGrid = (
            <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm font-serif">
                {bankDetailsLines.map((detailLine, i) => {
                    const parts = detailLine.split(':');
                    if (parts.length < 2) return <div key={i} className="sm:col-span-2 text-justify">{detailLine}</div>;
                    const key = parts[0].trim();
                    const value = parts.slice(1).join(':').trim();
                    return (
                        <div key={i} className="flex">
                            <span className="font-semibold w-28 flex-shrink-0">{key}:</span>
                            <span className="break-words">{value}</span>
                        </div>
                    );
                })}
            </div>
        );
    }
    
    const paragraphs = bodyText.trim().split('\n').filter(line => line.trim() !== '');

    const formattedBody = paragraphs.map((paragraph, index) => {
        const trimmedLine = paragraph.trim();

        if (trimmedLine === bankDetailsPlaceholder) {
            return <React.Fragment key={index}>{bankDetailsGrid}</React.Fragment>;
        }
        
        if (trimmedLine.startsWith('CONTRATO DE ARRIENDO')) {
            return <h1 key={index} className="text-center font-bold text-lg mb-8 font-serif">{trimmedLine}</h1>;
        }
        
        // More robust check for subtitles: must be all caps and contain mostly letters.
        // This prevents "RUT: 12.345.678-9" from being styled as a subtitle.
        const isSubtitle = /^[A-ZÁÉÍÓÚÑ\s.:]+$/.test(trimmedLine) && trimmedLine === trimmedLine.toUpperCase();
        if (isSubtitle && trimmedLine.length > 2 && !trimmedLine.match(/^\d/)) {
            return <h2 key={index} className="text-left font-bold text-sm mt-6 mb-4 font-serif">{trimmedLine}</h2>;
        }

        return <p key={index} className="text-justify mb-4 leading-relaxed text-sm font-serif">{trimmedLine}</p>;
    });

    return (
      <>
        {formattedBody}
        <h2 className="text-left font-bold text-sm mt-6 mb-4 font-serif">FIRMAS</h2>
        <p className="text-justify mb-4 leading-relaxed text-sm font-serif">Para constancia, las partes firman el presente contrato en dos ejemplares de igual tenor y fecha.</p>
        <SignatureBlock />
      </>
    );
  }, [generatedContract, contractData]);


  if (isLoading) {
      return (
          <div className="flex flex-col items-center justify-center text-center h-full min-h-[50vh] px-4 pt-24 md:pt-28 pb-8">
              <div className="text-white p-4 rounded-full mb-4"><Spinner size="w-12 h-12"/></div>
              <h2 className="text-2xl font-semibold text-white">Analizando y redactando...</h2>
              <p className="text-slate-400 mt-2">La IA está generando tu contrato. Esto puede tardar unos segundos.</p>
          </div>
      );
  }

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full min-h-[50vh] bg-red-900/20 border border-red-500/30 rounded-lg p-8 m-4 mt-20 md:mt-24">
             <div className="text-5xl mb-4">😢</div>
             <h2 className="text-2xl font-semibold text-red-300">Ocurrió un Error</h2>
             <p className="text-red-400 mt-2 max-w-md">{error}</p>
             <Button onClick={handleStartOver} variant="primary" className="mt-6 bg-red-600 hover:bg-red-700 focus:ring-red-500">Intentar de Nuevo</Button>
        </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 md:pt-28 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Tu Contrato ha sido Generado</h2>
        <p className="mt-4 text-lg text-slate-300">Revisa el borrador. Puedes copiarlo o descargarlo.</p>
      </div>
      
      <div ref={contractContentRef} className="bg-white p-8 sm:p-12 rounded-lg shadow-lg text-slate-800">
         <div className="max-w-none">
             {contractBody}
         </div>
      </div>

      <div className="mt-10 border-t border-slate-800 pt-8">
          <div className="bg-blue-900/40 border border-blue-500/30 rounded-lg p-6">
              <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400 mr-4 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                      <h3 className="text-xl font-bold text-white mb-2">¡Paso Final y Crucial! La Firma ante Notario</h3>
                      <p className="text-blue-200 mb-3">
                          Para que este contrato de arriendo sea <strong>legalmente válido y ejecutivo en Chile</strong>, es obligatorio que las firmas del arrendador y del arrendatario sean autorizadas por un <strong>Notario Público</strong>.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                          <li>Este requisito fue establecido por la Ley 21.461 (conocida como "Devuélveme mi casa") desde el 30 de junio de 2022.</li>
                          <li>La autorización notarial protege a ambas partes y permite acceder a procedimientos judiciales más rápidos en caso de incumplimiento.</li>
                          <li>Una vez descargado el documento, ambas partes deben acudir a una notaría para firmarlo.</li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center flex-wrap gap-4">
        <Button onClick={handleCopy}>
          {copySuccess ? <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg><span>{copySuccess}</span></> : <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6z" /></svg><span>Copiar Texto</span></>}
        </Button>
        <Button onClick={handleDownloadWord} variant="secondary">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
           <span>Descargar Word</span>
        </Button>
        <Button onClick={handleStartOver} variant="secondary">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
          <span>Empezar de Nuevo</span>
        </Button>
      </div>
    </div>
  );
};

export default ContractPage;