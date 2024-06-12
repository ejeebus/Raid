import CryptoJS from 'crypto-js';

const secretKey = 'your-very-secure-secret-key';

export const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, secretKey).toString();
};

export const decryptMessage = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
