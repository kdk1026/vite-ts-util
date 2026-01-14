/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.1
 */

/**
 * 전화번호 포맷
 * - 휴대폰 번호
 * - 일반 전화번호
 * - 070 인터넷 전화(VoIP)
 * - 080 수신자 부담 전화
 * - 030, 050 평생번호 및 안심번호
 * - 15xx, 16xx, 18xx 등 전국 대표번호
 * @param {string} value 
 * @returns 
 */
export const makePhoneNum = (value: string): string | null => {
    if ( typeof value !== 'string' || !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    let result = makeCellPhoneNum(value);

    if ( !result ) {
        result = makeBasicPhoneNum(value)
    }

    if ( !result ) {
        result = makeInternetPhoneNum(value)
    }

    if ( !result ) {
        result = makeTollFreePhoneNum(value)
    }

    if ( !result ) {
        result = makeVirtualPhoneNum(value)
    }

    if ( !result ) {
        result = makeBusinessPhoneNum(value)
    }

    return result
}

/**
 * 일반 전환번호 포맷
 * - 0x(x)-xxx(x)-xxxx
 * @param {string} value 
 * @returns 
 */
export const makeBasicPhoneNum = (value: string): string | null => {
    if ( typeof value !== 'string' || !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    const digits = value.replaceAll(/[^\d]/g, '');

    const isSeoul = digits.startsWith('02');
    const prefixLen = isSeoul ? 2 : 3;
    
    if (!/^(02|03[1-3]|04[1-4]|05[1-5]|06[1-4])/.test(digits)) {
        return '';
    }
    
    const len = digits.length;

    if (len <= prefixLen) {
        return digits;
    } else if (len <= (prefixLen + 4)) {
        return `${digits.slice(0, prefixLen)}-${digits.slice(prefixLen)}`;
    } else {
        return `${digits.slice(0, prefixLen)}-${digits.slice(prefixLen, len - 4)}-${digits.slice(len - 4)}`;
    }
}

/**
 * 070 인터넷 전화(VoIP) 포맷
 * - 070-xxx(x)-xxxx
 * @param {string} value 
 * @returns 
 */
export const makeInternetPhoneNum = (value: string): string | null => {
    if ( typeof value !== 'string' || !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    const digits = value.replaceAll(/[^\d]/g, '');
    
    if (!digits.startsWith('070')) {
        return '';
    }
    
    const len = digits.length;

    if (len <= 3) {
        return digits;
    } else if (len <= 7) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (len <= 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else {
        return `${digits.slice(0, 3)}-${digits.slice(3, len - 4)}-${digits.slice(len - 4)}`;
    }
}

/**
 * 080 수신자 부담 전화 포맷
 * - 080-xxx(x)-xxxx
 * @param {string} value 
 * @returns 
 */
export const makeTollFreePhoneNum = (value: string): string | null => {
    if ( typeof value !== 'string' || !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    const digits = value.replaceAll(/[^\d]/g, '');
    
    if (!digits.startsWith('080')) {
        return '';
    }
    
    const len = digits.length;

    if (len <= 3) {
        return digits;
    } else if (len <= 7) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (len <= 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else {
        return `${digits.slice(0, 3)}-${digits.slice(3, len - 4)}-${digits.slice(len - 4)}`;
    }
}

/**
 * 030, 050 평생번호 및 안심번호 포맷
 * - 030|050-xxx(x)-xxxx
 * @param {string} value 
 * @returns 
 */
export const makeVirtualPhoneNum = (value: string): string | null => {
    if ( typeof value !== 'string' || !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    const digits = value.replaceAll(/[^\d]/g, '');

    if (!/^(030|050)/.test(digits)) {
        return '';
    }

    const len = digits.length;

    if (len <= 3) {
        return digits;
    } else if (len <= 7) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (len <= 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else {
        return `${digits.slice(0, 3)}-${digits.slice(3, len - 4)}-${digits.slice(len - 4)}`;
    }
}

/**
 * 15xx, 16xx, 18xx 등 전국 대표번호 포맷
 * - 15|16|18-xx-xxxx
 * @param {string} value 
 * @returns 
 */
export const makeBusinessPhoneNum = (value: string): string | null => {
    if ( typeof value !== 'string' || !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    const digits = value.replaceAll(/[^\d]/g, '');

    if (!/^(15|16|18)/.test(digits)) {
        return '';
    }

    const len = digits.length;

    if (len <= 4) return digits;
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}`;
}

/**
 * 휴대폰 번호 포맷
 * - 01x-xxx(x)-xxxx
 * @param {string} value 
 * @returns 
 */
export const makeCellPhoneNum = (value: string): string | null => {
    if ( typeof value !== 'string' || !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    const digits = value.replaceAll(/[^\d]/g, '');

    if (!digits.startsWith('010')) {
        return '';
    }

    const len = digits.length;

    if (len < 4) return digits;

    if (len < 7) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (len < 11) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else {
        return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
    }
}

/**
 * 날짜 포맷
 * - YYYY-MM-DD
 * @param {string} value 
 * @returns 
 */
export const makeYYYYMMDD = (value: string): string | null => {
    if ( typeof value !== 'string' || !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    const digits = value.replaceAll(/[^\d]/g, '');
    const len = digits.length;

    if (len <= 4) {
        return digits;
    } else if (len <= 6) {
        return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    } else {
        return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
    }
}

/**
 * 카드번호 포맷
 * - (16자리) ####-####-####-####
 * - (15자리) ####-######-#####
 * @param {string} value 
 * @returns 
 */
export const makeCardNo = (value: string): string | null => {
    if ( typeof value !== 'string' || !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    const digits = value.replaceAll(/[^\d]/g, '');
    const len = digits.length;

    // 15자리 카드 (주로 AMEX: 4-6-5 포맷)
    if (len <= 15 && (digits.startsWith('34') || digits.startsWith('37'))) {
        // AMEX 특화 포맷
        if (len <= 4) return digits;
        if (len <= 10) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
        return `${digits.slice(0, 4)}-${digits.slice(4, 10)}-${digits.slice(10, 15)}`;
    }

    // 일반적인 16자리 카드 (4-4-4-4 포맷)
    if (len <= 4) {
        return digits;
    } else if (len <= 8) {
        return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    } else if (len <= 12) {
        return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`;
    } else {
        return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8, 12)}-${digits.slice(12, 16)}`;
    }
}

/**
 * 수치를 금액 표현으로 변환
 * - #,###
 * @param {string | number} value 
 * @returns
 */
export const convertMoneyFormat = (value: string | number): string | null => {
    if (value === null || value === undefined || value === '') {
        return null;
    }

    const cleanNum = String(value).replaceAll(',', '');

    if (Number.isNaN(cleanNum) || cleanNum.trim() === '') {
        console.warn('Invalid input value:', value);
        return null;
    }

    return Number(cleanNum).toLocaleString();
}

/**
 * 숫자가 아닌 모든 문자를 제거
 * @param {string} value 
 * @returns 
 */
export const formatNumber = (value: string): string | null => {
    if ( typeof value !== 'string' || !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    return value.replaceAll(/[^\d]/g, '');
}

