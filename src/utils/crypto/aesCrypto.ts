/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

import CryptoJS from "crypto-js";

const rawKey = sessionStorage.getItem('primaryData');
const secretKey = rawKey ? atob(rawKey) : null;

const rawIv = sessionStorage.getItem('secondaryData');
const iv = rawIv ? atob(rawIv) : null;

export interface EncryptResult {
    encryptedText: string;
    iv: string
}

/**
 * AES 암호화
 * @param {string} text 
 * @returns {EncryptResult} - 암호화된 텍스트와 IV (모두 Base64 인코딩)
 */
export const encrypt = (text: string): EncryptResult | undefined => {
    if ( !text?.trim() ) {
        console.error("암호화할 텍스트는 유효한 문자열이어야 합니다.");
        return { encryptedText: '', iv: '' };
    }

    if ( secretKey && iv ) {
        const keyParam = `${secretKey.substring(18, 34)}${atob(import.meta.env.VITE_AES_KEY_HALF)}`;
        const ivStr = `${iv.substring(34, 42)}${atob(import.meta.env.VITE_AES_IV_HALF)}`;

        const ivWordArray = CryptoJS.enc.Utf8.parse(ivStr);
    
        const cipher = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(keyParam), {
            iv: ivWordArray,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
        });

        return {
            encryptedText: cipher.toString(),
            iv: CryptoJS.enc.Base64.stringify(ivWordArray)
        }
    } else if ( secretKey && !iv ) {
        const keyParam = `${secretKey.substring(18, 34)}${atob(import.meta.env.VITE_AES_KEY_HALF)}`;
        const ivWordArray = CryptoJS.lib.WordArray.random(16);

        const cipher = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(keyParam), {
            iv: ivWordArray,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
        });
        
        return {
            encryptedText: cipher.toString(),
            iv: CryptoJS.enc.Base64.stringify(ivWordArray)
        }
    }
}

/**
 * AES 복호화
 * @param {string} encryptedText 
 * @param {null|string} ivStr
 * @param {boolean} isBase64Iv
 * @returns 
 */
export const decrypt = (encryptedText: string, ivStr: null | string, isBase64Iv: boolean): string | undefined => {
    if ( typeof encryptedText !== 'string' || !encryptedText?.trim() ) {
        console.error("복호화할 암호문은 유효한 문자열이어야 합니다.");
        return '';
    }

    if ( secretKey ) {
        const keyParam = `${secretKey.substring(18, 34)}${atob(import.meta.env.VITE_AES_KEY_HALF)}`;

        let ivParam;
        if ( ivStr && typeof ivStr === 'string' && ivStr.trim() && isBase64Iv ) {
            ivParam = CryptoJS.enc.Base64.parse(ivStr).toString(CryptoJS.enc.Utf8);
        } else if ( ivStr && typeof ivStr === 'string' && ivStr.trim() && !isBase64Iv ) {
            ivParam = ivStr;
        } else if ( !ivStr && iv ) {
            ivParam = `${iv.substring(34, 42)}${atob(import.meta.env.VITE_AES_IV_HALF)}`;
        } else {
            ivParam = CryptoJS.lib.WordArray.random(16).toString();
        }

        const ivWordArray = CryptoJS.enc.Utf8.parse(ivParam);

        const decipher = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(keyParam), {
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
}