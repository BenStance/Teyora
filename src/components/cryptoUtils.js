// src/utils/cryptoUtils.js

import CryptoJS from 'crypto-js';

// Encryption function
export const encryptData = (data) => {
    const secretKey = 'your-secret-key';  // Use a secure key or environment variable in production
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encodeURIComponent(ciphertext);  // URL-safe encoding
};

// Decryption function
export const decryptData = (encryptedData) => {
    const secretKey = 'your-secret-key';  // The same key must be used for decryption
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedData), secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
