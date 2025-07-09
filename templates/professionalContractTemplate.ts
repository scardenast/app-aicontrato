export const professionalContractTemplateString = `CONTRATO DE ARRIENDO

En la comuna de {{propertyComuna}}, {{propertyRegion}}, a {{contractStartDate}}, comparecen:

EL ARRENDADOR:
Don/Doña {{landlordName}}, de nacionalidad {{landlordNationality}}, de profesión u oficio {{landlordProfession}}, cédula de identidad N° {{landlordRUT}}, con domicilio en {{landlordAddress}}, en adelante también "el Arrendador".

EL ARRENDATARIO:
Don/Doña {{tenantName}}, de nacionalidad {{tenantNationality}}, de profesión u oficio {{tenantProfession}}, cédula de identidad N° {{tenantRUT}}, con domicilio en {{tenantAddress}}, en adelante también "el Arrendatario".

Los comparecientes, mayores de edad, han convenido en el siguiente contrato de arrendamiento:

PRIMERO: PROPIEDAD ARRENDADA.
El Arrendador da en arrendamiento al Arrendatario, quien acepta para sí, el inmueble ubicado en {{propertyAddress}}, de la comuna de {{propertyComuna}}, inscrito en el Conservador de Bienes Raíces bajo el Rol de Avalúo Fiscal N° {{propertyRol}}.
El inmueble se destinará exclusivamente para la habitación del Arrendatario y su familia. El Arrendatario declara conocer y aceptar el estado actual de la propiedad, la cual se entrega en perfectas condiciones de mantenimiento y conservación, obligándose a restituirla en el mismo estado, salvo el deterioro causado por el uso legítimo y el paso del tiempo.

SEGUNDO: RENTA.
La renta mensual de arrendamiento será la suma de $ {{rentAmountCLP}} ({{rentAmountCLP_inWords}} pesos chilenos).
La renta se pagará por anticipado dentro de los primeros {{rentPaymentDay}} días de cada mes, mediante transferencia electrónica a la cuenta bancaria que el Arrendador informe por escrito. El no pago oportuno constituirá al Arrendatario en mora, generando un interés penal del 1% por cada día de atraso, sin perjuicio de las demás acciones que pueda ejercer el Arrendador.

TERCERO: PLAZO.
El presente contrato rige a partir del {{contractStartDate}} y tendrá una duración de {{contractDurationMonths}} meses.
Al vencimiento del plazo, si ninguna de las partes manifestare su voluntad de ponerle término mediante carta certificada enviada al domicilio de la otra parte con una antelación mínima de sesenta (60) días, el contrato se entenderá renovado automáticamente por períodos iguales y sucesivos.
No obstante, lo anterior, el Arrendatario podrá poner término anticipado al contrato después de cumplidos doce meses de vigencia, desahuciando al Arrendador con una antelación mínima de 60 días, según lo estipula la Ley 18.101.

CUARTO: REAJUSTE.
La renta de arrendamiento se reajustará anualmente, en el mes que corresponda a la fecha de inicio de este contrato, según la variación experimentada por el Índice de Precios al Consumidor (IPC) determinado por el Instituto Nacional de Estadísticas (INE) o el organismo que lo reemplace, correspondiente a los últimos doce meses.

QUINTO: GARANTÍA.
A fin de garantizar la conservación de la propiedad y su restitución en el mismo estado en que la recibe, el pago de los perjuicios y deterioros que se causen en la propiedad arrendada, sus servicios e instalaciones, y en general, para responder al fiel cumplimiento de las estipulaciones de este contrato, el Arrendatario entrega en este acto al Arrendador la suma de $ {{depositAmountCLP}} ({{depositAmountCLP_inWords}} pesos chilenos).
Dicha suma será devuelta por el Arrendador al Arrendatario, debidamente reajustada según la variación del IPC, dentro de los 60 días siguientes a la restitución del inmueble, previa verificación del estado del mismo y del pago de todas las cuentas de servicios y gastos comunes.

SEXTO: OBLIGACIONES DEL ARRENDATARIO.
Serán obligaciones del Arrendatario, entre otras:
1. Pagar oportunamente la renta de arrendamiento.
2. Pagar íntegra y oportunamente los gastos por servicios básicos (electricidad, agua, gas, etc.).
3. Pagar íntegra y oportunamente los gastos comunes, tanto ordinarios como extraordinarios, que correspondan al inmueble, si los hubiere.
4. Usar la propiedad con el cuidado debido, destinándola exclusivamente al uso habitacional.
5. Realizar las reparaciones "locativas" o de mantención que requiera el inmueble.
6. Respetar el reglamento de copropiedad del edificio o condominio, si existiere.
7. No realizar actividades ilícitas o que perturben la tranquilidad de los vecinos.

SÉPTIMO: PROHIBICIONES.
Queda expresamente prohibido al Arrendatario:
1. Subarrendar o ceder en todo o en parte sus derechos sobre la propiedad, sin la autorización previa y por escrito del Arrendador.
2. Realizar modificaciones o mejoras estructurales en la propiedad sin el consentimiento previo y por escrito del Arrendador.
3. Almacenar materiales inflamables, peligrosos o de mal olor.
4. Causar ruidos molestos.

OCTAVO: REPARACIONES MAYORES.
Las reparaciones mayores, no locativas, que sean necesarias para la conservación de la estructura del inmueble serán de cargo del Arrendador, debiendo el Arrendatario dar aviso inmediato de cualquier falla grave.

NOVENO: VISITAS AL INMUEBLE.
El Arrendador tendrá derecho a visitar el inmueble, previo aviso al Arrendatario con al menos 24 horas de antelación. Durante los últimos 60 días del contrato, el Arrendador podrá mostrar la propiedad a potenciales nuevos arrendatarios en horarios a convenir.

DÉCIMO: TÉRMINO ANTICIPADO.
El Arrendador podrá poner término de inmediato al presente contrato, por las siguientes causales:
1. No pago de la renta de arrendamiento.
2. Incumplimiento grave de cualquiera de las obligaciones del contrato.
3. Uso indebido o deterioro culpable del inmueble.
Si el Arrendatario pusiera término al contrato antes del primer año sin causa justificada, deberá pagar una multa equivalente a un mes de renta.

DÉCIMO PRIMERO: DOMICILIO Y JURISDICCIÓN.
Para todos los efectos derivados de este contrato, las partes fijan su domicilio en la comuna de {{propertyComuna}} y se someten a la competencia de sus Tribunales Ordinarios de Justicia, de conformidad con la Ley Nº 18.101 sobre arrendamiento de predios urbanos, modificada por la Ley Nº 21.461, y demás normas pertinentes del Código Civil chileno.

DÉCIMO SEGUNDO: INVENTARIO.
Se deja constancia que la propiedad se arrienda con el siguiente mobiliario o equipamiento: {{inventory}}. Un anexo con inventario fotográfico podrá ser firmado por las partes.

DÉCIMO TERCERO: RESOLUCIÓN DE CONFLICTOS.
Las partes acuerdan que, en caso de controversias derivadas del presente contrato, procurarán resolverlas amigablemente. Si no fuera posible, podrán recurrir a un procedimiento de mediación antes de acudir a los Tribunales Ordinarios de Justicia.

DÉCIMO CUARTO: COMUNICACIONES.
Cualquier notificación entre las partes podrá efectuarse válidamente por correo electrónico, considerándose plenamente recibida el día de su envío, siempre que se tenga confirmación de recepción.

{{#if includePetsClause}}
{{nextClauseNumber}}: CLÁUSULA DE MASCOTAS.
Se autoriza la tenencia de mascotas en el inmueble, bajo las siguientes condiciones: {{petsClauseDetails}}. El Arrendatario será único responsable por cualquier daño o molestia que las mascotas puedan causar a la propiedad o a terceros.
{{/if}}

{{#if includeParkingClause}}
{{nextClauseNumber}}: ESTACIONAMIENTO.
El presente contrato de arriendo incluye el uso y goce del estacionamiento número {{parkingClauseDetails}}.
{{/if}}

{{#if includeStorageClause}}
{{nextClauseNumber}}: BODEGA.
El presente contrato de arriendo incluye el uso y goce de la bodega número {{storageClauseDetails}}.
{{/if}}

{{#if includeBankDetailsClause}}
{{nextClauseNumber}}: DATOS PARA TRANSFERENCIA.
Para efectos del pago de la renta de arrendamiento, el Arrendador designa la siguiente cuenta bancaria:
{{bankDetails}}
{{/if}}
`