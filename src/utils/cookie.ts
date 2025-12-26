/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 * @description 매개변수 3개부터는 RORO 패턴 적용
 */

interface SetCookieOptions {
    name: string;
    value: string;
    days: number;
    profile: string;
    path?: string;
    domain?: string
}

/**
 * 쿠키 생성
 * * @param {object} options
 * @param {string} options.name 
 * @param {string} options.value 
 * @param {number} options.days 
 * @param {string} options.profile 
 * @param {undefined|string} options.path 
 * @param {undefined|string} options.domain 
 */
export const setCookie = ({name, value, days, profile, path = '', domain = ''}: SetCookieOptions = {} as SetCookieOptions): void => {
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

interface RemoveCookieOptions {
    name: string;
    profile: string;
    path?: string;
    domain?: string
}

/**
 * 쿠키 삭제
 * * @param {object} options
 * @param {string} options.name
 * @param {string} options.profile
 * @param {undefined|null|string} options.path 
 * @param {undefined|null|string} options.domain 
 */
export const removeCookie = ({name, profile, path = '', domain = ''}: RemoveCookieOptions = {} as RemoveCookieOptions): void => {
    setCookie({
        name: name, 
        value: '', 
        days: -1, 
        profile: profile, 
        path: path, 
        domain: domain
    });
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

interface SetCookieObjectOptions {
    name: string;
    value: object;
    days: number;
    profile: string;
    path?: string;
    domain?: string
}

/**
 * Object 쿠키 생성
 * * @param {object} options
 * @param {string} options.name 
 * @param {object} options.value 
 * @param {number} options.days 
 * @param {string} options.profile 
 * @param {undefined|null|string} options.path 
 * @param {undefined|null|string} options.domain 
 */
export const setCookieObject = ({name, value, days, profile, path = '', domain = ''}: SetCookieObjectOptions = {} as SetCookieObjectOptions): void => {
    if ( Object.keys(value).length === 0 && value.constructor === Object ) {
        console.error('value is empty.');
        return;
    }

    try {
        const cookieValue = JSON.stringify(value);
        setCookie({
            name: name, 
            value: cookieValue, 
            days: days, 
            profile: profile, 
            path: path, 
            domain: domain
        });
    } catch (error) {
        console.error("JSON 문자열 변환 실패:", error);  
    }
};

interface SetCookieArrayOptions {
    name: string;
    value: any[];
    days: number;
    profile: string;
    path?: string;
    domain?: string
}

/**
 * Array 쿠키 생성
 * * @param {object} options
 * @param {string} options.name 
 * @param {Array<*>} options.value 
 * @param {number} options.days 
 * @param {string} options.profile 
 * @param {undefined|null|string} options.path 
 * @param {undefined|null|string} options.domain 
 */
export const setCookieArray = ({name, value, days, profile, path = '', domain = ''}: SetCookieArrayOptions = {} as SetCookieArrayOptions): void => {
    if ( Object.keys(value).length === 0 && value.constructor === Array ) {
        console.error('value is empty.');
        return;
    }

    try {
        const cookieValue = JSON.stringify(value);
        setCookie({
            name: name, 
            value: cookieValue, 
            days: days, 
            profile: profile, 
            path: path, 
            domain: domain
        });
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