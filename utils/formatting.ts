/**
 * Formats a raw RUT string (e.g., "123456789") into a display format (e.g., "12.345.678-9").
 * @param rut The RUT string to format.
 * @returns The formatted RUT string.
 */
export const formatRUT = (rut: string): string => {
    if (!rut) return '';
    let cleanRUT = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    if (cleanRUT.length === 0) return '';

    let body = cleanRUT.slice(0, -1);
    let verifier = cleanRUT.slice(-1);

    body = new Intl.NumberFormat('de-DE').format(parseInt(body, 10));

    return `${body}-${verifier}`;
};


/**
 * Formats a number or string into CLP currency format (e.g., "1.250.000").
 * @param value The number or string to format.
 * @returns The formatted currency string.
 */
export const formatCLP = (value: string | number): string => {
    if (value === null || value === undefined || value === '') return '';
    const stringValue = String(value);
    const unformatted = unformatCLP(stringValue);
    if (unformatted === '') return '';
    
    const number = parseInt(unformatted, 10);
    if (isNaN(number)) return '';

    return new Intl.NumberFormat('de-DE').format(number);
};

/**
 * Removes CLP formatting (dots) from a string.
 * @param value The formatted currency string.
 * @returns The unformatted numeric string.
 */
export const unformatCLP = (value: string): string => {
    if (!value) return '';
    return value.replace(/\./g, '');
};