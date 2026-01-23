import Cookies from "js-cookie";

const DEFAULT_OPTIONS: Cookies.CookieAttributes = {
    path: "/",
    secure: import.meta.env.VITE_PROFILE !== "local",
};

export const cookieUtil = {
    /**
     * 쿠키 저장
     * @param {string} name 
     * @param {string} value 
     * @param {undefined|null|object} options 
     * @returns 
     */
    set: (name: string, value: string, options?: Cookies.CookieAttributes) => {
        if ( !name.trim() ) {
            console.error('name is empty or null.');
            return;
        }

        if ( !value.trim() ) {
            console.error('value is empty or null.');
            return;
        }

        Cookies.set(name, value, { ...DEFAULT_OPTIONS, ...options });
    },

    /**
     * 쿠키 읽기
     * @param {string} name 
     * @returns 
     */
    get: (name: string) => {
        if ( !name.trim() ) {
            console.error('name is empty or null.');
            return;
        }

        return Cookies.get(name);
    },

    /**
     * 쿠키 삭제
     * @param {string} name 
     * @param {undefined|null|object} options 
     */
    remove: (name: string, options?: Cookies.CookieAttributes) => {
        if ( !name.trim() ) {
            console.error('name is empty or null.');
            return;
        }

        Cookies.remove(name, { ...DEFAULT_OPTIONS, ...options });
    },

    /**
     * JSON 데이터 저장 (객체/배열)
     * @param {string} name 
     * @param {object|any[]} value 
     * @param {undefined|null|object} options 
     */
    setJSON: (name: string, value: object|any[], options?: Cookies.CookieAttributes, ) => {
        if ( !name.trim() ) {
            console.error('name is empty or null.');
            return;
        }

        const isEmpty = value && Object.keys(value).length === 0;
        if (!value || isEmpty) {
            console.warn('value is empty ({} or []). storage skipped.');
            return;
        }

        Cookies.set(name, JSON.stringify(value), {
            ...DEFAULT_OPTIONS,
            ...options,
        });
    },

    /**
     * JSON 데이터 읽기
     * @param {string} name 
     * @returns 
     */
    getJSON: (name: string) => {
        if ( !name.trim() ) {
            console.error('name is empty or null.');
            return;
        }

        const value = Cookies.get(name);
        return value ? JSON.parse(value) : null;
    },
};
