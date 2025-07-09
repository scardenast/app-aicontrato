export const contractTemplateString = `CONTRATO DE ARRIENDO

En la comuna de {{propertyComuna}}, {{propertyRegion}}, a {{contractStartDate}}, comparecen:

EL ARRENDADOR:
Don/Doña {{landlordName}}, cédula de identidad N° {{landlordRUT}}, con domicilio en {{landlordAddress}}, en adelante también "el Arrendador".

EL ARRENDATARIO:
Don/Doña {{tenantName}}, cédula de identidad N° {{tenantRUT}}, con domicilio en {{tenantAddress}}, en adelante también "el Arrendatario".

Los comparecientes, mayores de edad, han convenido en el siguiente contrato de arrendamiento:

PRIMERO: PROPIEDAD ARRENDADA.
El Arrendador da en arrendamiento al Arrendatario el inmueble ubicado en {{propertyAddress}}, en la comuna de {{propertyComuna}}. El Arrendatario declara conocer y aceptar el estado de la propiedad.

SEGUNDO: RENTA Y PAGO.
La renta mensual de arrendamiento será la suma de $ {{rentAmountCLP}} ({{rentAmountCLP_inWords}} pesos chilenos), que se pagará por anticipado dentro de los primeros {{rentPaymentDay}} días de cada mes.

TERCERO: DURACIÓN.
El presente contrato rige a partir del {{contractStartDate}} y tendrá una duración de {{contractDurationMonths}} meses. Se renovará automáticamente por períodos iguales si ninguna parte avisa con 60 días de anticipación su intención de ponerle término.

CUARTO: GARANTÍA.
El Arrendatario entrega en este acto al Arrendador la suma de $ {{depositAmountCLP}} ({{depositAmountCLP_inWords}} pesos chilenos), para garantizar el fiel cumplimiento de sus obligaciones. Será devuelta dentro de los 60 días posteriores a la restitución del inmueble, descontando gastos de servicios o deterioros.

QUINTO: USO Y MANTENCIÓN.
La propiedad se destinará exclusivamente a vivienda. El Arrendatario deberá mantenerla en buen estado y pagar los servicios básicos (luz, agua, gas). Queda prohibido subarrendar o hacer modificaciones sin permiso escrito del Arrendador.

SEXTO: DOMICILIO.
Para todos los efectos legales, las partes fijan su domicilio en la comuna de {{propertyComuna}} y se someten a la jurisdicción de sus tribunales.

SÉPTIMO: INVENTARIO.
Se deja constancia que la propiedad se arrienda con el siguiente mobiliario o equipamiento: {{inventory}}.
`;