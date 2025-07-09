import OpenAI from "openai";
import { ContractData, ContractType } from "../types";
import { contractTemplateString } from "../templates/contractTemplate";
import { professionalContractTemplateString } from "../templates/professionalContractTemplate";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function buildPrompt(type: ContractType, data: ContractData): string {
  const template = type === 'simple' ? contractTemplateString : professionalContractTemplateString;

  let dataForPrompt: Partial<ContractData> = { ...data };

  if (type === 'simple') {
    const simpleFields: (keyof ContractData)[] = [
      'landlordName', 'landlordRUT', 'landlordAddress',
      'tenantName', 'tenantRUT', 'tenantAddress',
      'propertyAddress', 'propertyRegion', 'propertyComuna',
      'rentAmountCLP', 'rentPaymentDay', 'depositAmountCLP',
      'contractStartDate', 'contractDurationMonths', 'inventory'
    ];
    const simpleData: Partial<ContractData> = {};
    for (const key of simpleFields) {
      if (key in data) {
        (simpleData as any)[key] = data[key];
      }
    }
    dataForPrompt = simpleData;
  }

  const serializableData = Object.fromEntries(
    Object.entries(dataForPrompt).map(([key, value]) => [key, String(value)])
  );

  return `
**Rol:** Eres un asistente legal experto en Chile. Tu única tarea es rellenar la siguiente plantilla de contrato con los datos JSON proporcionados.

**Instrucciones Generales:**
1. Reemplaza cada marcador en la plantilla (ej. {{landlordName}}) con el valor correspondiente del objeto JSON.
2. Importante: Solo rellena la plantilla. No agregues cláusulas, títulos o contenido que no esté explícitamente definido en la plantilla. Si un dato no existe en el JSON, deja el marcador como está.
3. Formatea todos los montos de dinero (CLP) con separadores de miles para los puntos (ej. 450.000).
4. Genera una versión en palabras para los marcadores {{rentAmountCLP_inWords}} y {{depositAmountCLP_inWords}}.
5. Formatea la fecha de inicio del contrato (contractStartDate) al formato "DD de [Mes en palabras] de AAAA" (ej. "01 de Enero de 2024").
6. Tu respuesta debe ser únicamente el texto del contrato rellenado, en formato de texto plano. No incluyas explicaciones, comentarios, ni los bloques de "Rol", "Instrucciones", etc.

**Instrucciones para Plantilla Profesional (si aplica):**
1. Cláusulas Opcionales: Revisa los campos booleanos includePetsClause, includeParkingClause, includeStorageClause, etc.
2. Si un campo booleano es true, incluye el bloque de la cláusula correspondiente que comienza con {{#if ...}} y reemplaza sus detalles internos.
3. Si es false, elimina todo el bloque de la cláusula opcional, incluyendo su título y el marcador {{#if}}.
4. Numeración de Cláusulas: Ajusta la numeración de las cláusulas de forma secuencial y correcta. Si se incluyen cláusulas opcionales, estas deben continuar la numeración (ej. DÉCIMO TERCERO, DÉCIMO CUARTO, etc.). Reemplaza los marcadores {{nextClauseNumber}} y pon el número romano correcto.

**Plantilla a Rellenar:**
${template}

**Datos del Usuario (JSON):**
${JSON.stringify(serializableData, null, 2)}
  `.trim();
}

export async function generateContract(type: ContractType, data: ContractData): Promise<string> {
  const prompt = buildPrompt(type, data);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // o "gpt-4"
      messages: [
        {
          role: "system",
          content: "Eres un abogado chileno experto en contratos de arriendo. Tu única tarea es devolver el contrato final rellenado, sin explicaciones ni markdown.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
      max_tokens: 2048,
    });

    const result = response.choices[0].message.content?.trim();
    if (!result) {
      throw new Error("Respuesta vacía del modelo");
    }

    return result;
  } catch (error) {
    console.error("Error generating contract with OpenAI API:", error);
    throw new Error("La IA no pudo procesar la solicitud. Revisa los datos e intenta nuevamente.");
  }
}
