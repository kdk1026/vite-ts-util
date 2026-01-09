/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 * @description 매개변수 3개부터는 RORO 패턴 적용
 */

import CryptoJS from "crypto-js";

const validateString = (value: string, name: string) => {
    if ( typeof value !== 'string' || !value?.trim() ) {
        console.error(`${name}는 유효한 문자열이어야 합니다.`);
        return false;
    }
    return true;
};

export interface EncryptResult {
    cipherText: string;
    iv: string
}

/**
 * AES 암호화
 * @param {string} plaintext 
 * @param {string} b64Key
 * @returns {EncryptResult} - 암호화된 텍스트와 IV (모두 Base64 인코딩)
 */
export const encrypt = (plaintext: string, b64Key: string): EncryptResult | undefined => {
    if ( !validateString(plaintext, 'plaintext') ) {
        return { cipherText: '', iv: '' };
    }

    const ivWordArray = CryptoJS.lib.WordArray.random(16);

    const cipher = CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(b64Key), {
        iv: ivWordArray,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });
    
    return {
        cipherText: cipher.toString(),
        iv: CryptoJS.enc.Base64.stringify(ivWordArray)
    }
}

interface DecryptOptions {
    b64Key: string;
    b64Iv: string;
    b64CipherText: string;
}

/**
 * AES 복호화
 * * @param {object} options
 * @param {string} options.b64Key 
 * @param {string} options.b64Iv
 * @param {string} options.b64CipherText
 * @returns 
 */
export const decrypt = ({b64Key, b64Iv, b64CipherText}: DecryptOptions = {} as DecryptOptions): string | undefined => {
    if ( !validateString(b64Key, 'b64Key') ) return '';
    if ( !validateString(b64Iv, 'b64Iv') ) return '';
    if ( !validateString(b64CipherText, 'b64CipherText') ) return '';

    let iv = '';
    if ( b64Iv && typeof b64Iv === 'string' && b64Iv.trim() ) {
        iv = CryptoJS.enc.Base64.parse(b64Iv).toString(CryptoJS.enc.Utf8);
    }

    const ivWordArray = CryptoJS.enc.Utf8.parse(iv);

    const decipher = CryptoJS.AES.decrypt(b64CipherText, CryptoJS.enc.Utf8.parse(b64Key), {
        iv: ivWordArray,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    })

    try {
        return decipher.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        console.error("복호화에 실패했습니다.", e);
        return '';
    }
}