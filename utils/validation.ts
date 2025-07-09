export const validateRUT = (rut: string): boolean => {
    if (!rut || typeof rut !== 'string') return false;
    
    // Clean RUT: remove dots and hyphen, and convert to lowercase
    const cleanRUT = rut.replace(/[.-]/g, '').toLowerCase();
    
    // Basic format check
    if (!/^[0-9]{7,8}[0-9k]{1}$/.test(cleanRUT)) {
        return false;
    }
    
    const body = cleanRUT.slice(0, -1);
    const verifier = cleanRUT.slice(-1);
    
    let sum = 0;
    let multiplier = 2;
    
    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i], 10) * multiplier;
        multiplier = multiplier < 7 ? multiplier + 1 : 2;
    }
    
    const calculatedVerifier = 11 - (sum % 11);
    
    let expectedVerifier: string;
    if (calculatedVerifier === 11) {
        expectedVerifier = '0';
    } else if (calculatedVerifier === 10) {
        expectedVerifier = 'k';
    } else {
        expectedVerifier = String(calculatedVerifier);
    }
    
    return verifier === expectedVerifier;
};