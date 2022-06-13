import CryptoJS from 'crypto-js';

export function encryptText(email: string) : string {
    let emailURIEncoded = encodeURIComponent(email);
    let ciphertext = CryptoJS.AES.encrypt(emailURIEncoded, 'my-secret-key@123').toString();
    return ciphertext;
}