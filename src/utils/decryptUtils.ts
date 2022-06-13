import CryptoJS from 'crypto-js';

export function decryptText(encryptedData: string) : string {
    let bytes = CryptoJS.AES.decrypt(encryptedData, 'my-secret-key@123');
   return bytes.toString(CryptoJS.enc.Utf8);
}