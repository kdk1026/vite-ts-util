/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

/**
 * 쿠키 생성
 * @param {string} name 
 * @param {string} value 
 * @param {number} days 
 * @param {string} profile 
 * @param {undefined|string} path 
 * @param {undefined|string} domain 
 */
export const setCookie = (name: string, value: string, days: number, profile: string, path?: string, domain?: string): void => {
    if ( !name.trim() ) {
        console.error('name is empty.');
        return;
    }

    if ( days > 0 ) {
        if ( !value.trim() ) {
            console.error('value is empty.');
            return;
        }
    }

    if ( !profile.trim() ) {
        console.error('profile is empty.');
        return;
    }

    let cookieStr = `${name}=${encodeURIComponent(value) || ''}`;

    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        cookieStr += `; expires=${date.toUTCString()}`;
    }

    if ( profile !== 'local' ) {
        cookieStr += `; secure`;
    }

    if (path) {
        if ( !path.trim() ) {
            console.error('path is empty or null.');
            return;
        }

        cookieStr += `; path=${path}`;
    } else {
        cookieStr += `; path=/`;
    }

    if (domain) {
        if ( !domain.trim() ) {
            console.error('domain is empty or null.');
            return;
        }

        cookieStr += `; domain=${domain}`;
    }

    document.cookie = cookieStr;
};

/**
 * 쿠키 삭제
 * @param {string} name
 * @param {string} profile
 * @param {undefined|string} path 
 * @param {undefined|string} domain 
 */
export const removeCookie = (name: string, profile: string, path?: string, domain?: string): void => {
    setCookie(name, '', -1, profile, path, domain);
};

/**
 * 쿠키 가져오기
 * @param {string} name
 */
export const getCookie = (name: string): string | null => {
    if ( !name.trim() ) {
        console.error('name is empty.');
        return null;
    }

    const nameEQ = name + "=";

    const ca = document.cookie.split(';');

    for(let c_raw of ca) {
        let c = c_raw;

        while ( c.startsWith(' ') ) {
            c = c.substring(1, c.length);
        }

        if ( c.startsWith(nameEQ) ) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }

    return null;
};

/**
 * Object 쿠키 생성
 * @param {string} name 
 * @param {object} value 
 * @param {number} days 
 * @param {string} profile 
 * @param {undefined|string} path 
 * @param {undefined|string} domain 
 */
export const setCookieObject = (name: string, value: object, days: number, profile: string, path?: string, domain?: string): void => {
    if ( Object.keys(value).length === 0 && value.constructor === Object ) {
        console.error('value is empty.');
        return;
    }

    try {
        const cookieValue = JSON.stringify(value);
        setCookie(name, cookieValue, days, profile, path, domain);
    } catch (error) {
        console.error("JSON 문자열 변환 실패:", error);  
    }
};

/**
 * Array 쿠키 생성
 * @param {string} name 
 * @param {Array<*>} value 
 * @param {number} days 
 * @param {string} profile 
 * @param {undefined|string} path 
 * @param {undefined|string} domain 
 */
export const setCookieArray = (name: string, value: any[], days: number, profile: string, path?: string, domain?: string): void => {
    if ( Object.keys(value).length === 0 && value.constructor === Array ) {
        console.error('value is empty.');
        return;
    }

    try {
        const cookieValue = JSON.stringify(value);
        setCookie(name, cookieValue, days, profile, path, domain);
    } catch (error) {
        console.error("JSON 문자열 변환 실패:", error);  
    }
};

/**
 * Object, Array 쿠키 가져오기
 * @param {string} name 
 * @returns 
 */
export const getCookieData = (name: string): string | null => {
    const cookieValue: string | null = getCookie(name);

    try {
        if ( cookieValue ) {
            return JSON.parse(cookieValue);
        }
    } catch (error) {
        console.error("JSON 파싱 실패:", error);  
    }

    return null;
};