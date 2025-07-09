# AIContrato – Generador de Contratos de Arriendo con IA

<p align="center"><strong>
Genera contratos de arriendo personalizados en Chile con ayuda de inteligencia artificial. Rápido, intuitivo y ajustado a la normativa local.
</strong></p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img alt="OpenAI GPT-4o" src="https://img.shields.io/badge/OpenAI-GPT--4o-7A42F4?style=for-the-badge&logo=openai&logoColor=white">
</p>

---

## Introducción

Redactar un contrato de arriendo en Chile puede ser complejo: cláusulas obligatorias, cambios legales recientes (como la Ley 21.461), y el riesgo de errores en documentos descargados desde Internet.  
**AIContrato** resuelve este problema creando contratos personalizados en segundos mediante inteligencia artificial, en una plataforma simple y segura.

**Despliegue en producción**: [https://aicontrato.vercel.app/](https://aicontrato.vercel.app/)

---

## Características Principales

- **Generación con IA:** Redacción automática con la API de Google Gemini, siguiendo estructura legal chilena.
- **Dos versiones disponibles:** 
  - **Básica:** Gratuita, para acuerdos simples.
  - **Profesional:** (pago simulado) Incluye cláusulas opcionales más robustas.
- **Formulario paso a paso:** 
  - 1. Tipo de contrato  
  - 2. Las partes  
  - 3. Propiedad y términos  
  - 4. Cláusulas adicionales
- **Cláusulas personalizables:** Mascotas, estacionamiento, bodega, cuenta bancaria y más.
- **Validación en tiempo real:** RUT chileno, montos en CLP, fechas.
- **Exportación en formato Word (.doc):** Contrato editable, con formato profesional y compatible con Microsoft Word.
- **Diseño responsivo:** Adaptado a escritorio y móvil.
- **Blog legal integrado:** Artículos educativos sobre arriendo en Chile, mejora SEO y confianza del usuario.
- **Privacidad primero:** Los datos no se almacenan. Todo se procesa en el navegador.
- **Aviso legal visible:** El contrato es un borrador. Debe firmarse ante notario para tener validez legal.

---

## Tech Stack

- **Frontend:** React + TypeScript  
- **Estilos:** Tailwind CSS  
- **Routing:** React Router (HashRouter)  
- **IA:** OpenAI API
- **Archivos:** `file-saver` para exportar `.doc`  
- **Carga de dependencias:** Vía importmap y CDN (`esm.sh`)

---

## Cómo Funciona

1. **Selecciona** el tipo de contrato (Básico o Profesional).
2. **Completa** los campos guiado por un formulario claro y validado.
3. **Genera** el contrato en segundos con ayuda de IA.
4. **Revisa y descarga** el archivo editable (.doc).
5. **Imprime y firma** el documento ante notario para formalizarlo.

---

## Estructura del Proyecto

```
/                         # HTML principal con importmap
├── index.html
├── metadata.json         # Metadatos del sitio
└── src/
    ├── App.tsx           # Componente raíz
    ├── index.tsx         # Punto de entrada
    ├── types.ts          # Tipos de datos
    ├── components/       # UI reutilizable (Input, Button, etc.)
    │   └── form/         # Formulario por pasos
    ├── data/             # Comunas, FAQs, artículos
    ├── hooks/            # useAppContext, etc.
    ├── pages/            # Pantallas principales
    ├── services/         # Lógica de integración con OpenAI
    ├── templates/        # Plantillas base para contratos
    └── utils/            # Validaciones y helpers
```

 ---

## Aviso Legal

AIContrato no es un estudio jurídico ni ofrece asesoría legal.
Los documentos generados son borradores de carácter referencial.
Para su validez legal en Chile, es obligatorio firmarlos ante notario.
Se recomienda que un abogado revise el documento final antes de firmarlo.

## Licencia

Este proyecto se encuentra protegido bajo derechos de autor.  
Su uso, copia, modificación o distribución están estrictamente prohibidos sin autorización previa y por escrito del autor.

© 2025 Sebastián Cárdenas. Todos los derechos reservados.

