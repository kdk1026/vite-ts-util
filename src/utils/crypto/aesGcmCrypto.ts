/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2026.01.09
 * @version 1.0
 * @description 강력 권장
 */

const validateString = (value: string, name: string) => {
    if ( !value?.trim() ) {
        console.error(`${name}는 유효한 문자열이어야 합니다.`);
        return false;
    }
    return true;
};

/**
 * Base64를 Uint8Array로 변환
 * @param {string} base64 
 * @returns 
 */
const base64ToUint8Array = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.codePointAt(i)!;
    }

    return bytes;
}

/**
 * Uint8Array를 Base64 문자열로 변환
 * @param {Uint8Array} uint8Array 
 * @returns 
 */
const uint8ArrayToBase64 = (uint8Array: Uint8Array) => {
    return btoa(String.fromCodePoint(...uint8Array));
}

export interface EncryptResult {
    cipherText: string;
    iv: string
}

/**
 * AES GCM 암호화
 * @param {string} plaintext 
 * @param {string} b64Key 
 * @returns {{cipherText: string, iv: string}} - 암호화된 Uint8Array와 IV (모두 Base64 인코딩)
 * 
 * @example
 * await aesGcmEncrypt("홍길동", param.b64Key)
 * .then(result => console.log(result));
 */
export const aesGcmEncrypt = async (plaintext: string, b64Key: string): Promise<EncryptResult> => {
    if ( !validateString(plaintext, 'plaintext') ) {
        return { cipherText: '', iv: '' };
    }

    if ( !validateString(b64Key, 'b64Key') ) {
        return { cipherText: '', iv: '' };
    }

    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(plaintext);

        // 1. 데이터를 Uint8Array로 변환
        const keyData = base64ToUint8Array(b64Key);

        // 2. 키 객체 생성 (b64Key는 16, 24, 32바이트 Uint8Array)
        const cryptoKey = await window.crypto.subtle.importKey(
            "raw",
            keyData,
            { name: "AES-GCM" },
            true,
            ["encrypt"]
        );

        // 3. 고유한 IV 생성 (12바이트)
        const iv = window.crypto.getRandomValues(new Uint8Array(12));

        // 4. 암호화 수행
        // Web Crypto API는 암호화 결과물 끝에 인증 태그(16바이트)를 자동으로 붙임
        const encryptedBuffer = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv,
                tagLength: 128 // 16바이트 태그
            },
            cryptoKey,
            data
        );

        // 5. 결과물을 Base64로 인코딩하여 객체로 반환
        return {
            iv: uint8ArrayToBase64(iv),
            cipherText: uint8ArrayToBase64(new Uint8Array(encryptedBuffer))
        };

    } catch (e) {
        console.error("암호화 실패:", e);
        throw e;
    }
}

interface DecryptOptions {
    b64Key: string;
    b64Iv: string;
    b64CipherText: string;
}

/**
 * AES GCM 복호화
 * * @param {object} options
 * @param {string} options.b64Key
 * @param {string} options.b64Iv
 * @param {string} options.b64CipherText
 * @returns
 * 
 * @example
 * await aesGcmDecrypt(options)
 * .then(result => console.log(result));
 */
export const aesGcmDecrypt = async ({b64Key, b64Iv, b64CipherText}: DecryptOptions = {} as DecryptOptions): Promise<string> => {
    if ( !validateString(b64Key, 'b64Key') ) return '';
    if ( !validateString(b64Iv, 'b64Iv') ) return '';
    if ( !validateString(b64CipherText, 'b64CipherText') ) return '';

    try {
        // 1. 데이터를 Uint8Array로 변환
        const keyData = base64ToUint8Array(b64Key);
        const iv = base64ToUint8Array(b64Iv);
        const cipherText = base64ToUint8Array(b64CipherText);

        // 2. 키 객체 생성 (AES-GCM 용)
        const cryptoKey = await window.crypto.subtle.importKey(
            "raw",
            keyData,
            { name: "AES-GCM" },
            false,
            ["decrypt"]
        );

        // 3. 복호화 실행
        const decrypted = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv,
                tagLength: 128 // 자바 기본값 128비트
            },
            cryptoKey,
            cipherText
        );

        // 4. 결과를 문자열로 변환 (UTF-8 기준)
        return new TextDecoder().decode(decrypted);
    } catch (e) {
        console.error("복호화 실패:", e);
        throw e;
    }
}