/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

/**
 * 전화번호 형식 변환 (휴대폰)
 * @param {string} value 
 * @returns 
 */
export const formatPhoneNumber = (value: string): string | null => {
    if ( !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    const phoneNumber = value.replaceAll(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) {
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
}

/**
 * 전화번호 일반화 (일반전화, 휴대폰, 인터넷전화 등)
 * @param {string} value 
 * @returns 
 */
export const formatGeneralPhoneNumber = (value: string): string | null => {
    if ( !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }   

    const phoneNumber = value.replaceAll(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumber.startsWith('02')) {
        if (phoneNumberLength > 2 && phoneNumberLength <= 6) {
            return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(2)}`;
        } else if (phoneNumberLength > 6 && phoneNumberLength <= 9) {
            return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 9)}`;
        } else if (phoneNumberLength > 9) {
            return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6, 10)}`;
        }
    } else if (phoneNumber.startsWith('050') && phoneNumber.charAt(3) >= '2' && phoneNumber.charAt(3) <= '7') {
        if (phoneNumberLength > 4 && phoneNumberLength <= 7) {
            return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
        } else if (phoneNumberLength > 7) {
            return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 11)}`;
        }
    } else if (phoneNumber.startsWith('070')) {
        if (phoneNumberLength > 3 && phoneNumberLength <= 7) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        } else if (phoneNumberLength > 7) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 71)}`;
        }
    }

    if (phoneNumberLength > 3 && phoneNumberLength <= 7) {
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else if (phoneNumberLength > 7 && phoneNumberLength <= 11) {
        if (phoneNumberLength === 10) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
        } else {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
        }
    }

    return phoneNumber;
}

/**
 * 숫자가 아닌 모든 문자를 제거
 * @param {string} value 
 * @returns 
 */
export const formatNumber = (value: string): string | null => {
    if ( !value?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    return value.replaceAll(/[^\d]/g, '');
}

/**
 * 숫자 금액 형식 변환 (세자리 콤마)
 * @param {string} num 
 * @returns 
 */
export const formatNumberComma = (num: string): string | null => {
    if ( !num?.trim() ) {
        console.warn('Invalid input value');
        return null;
    }

    return Number(num.replaceAll(',', '')).toLocaleString();
}