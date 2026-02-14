/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2026.01.23
 * @version 1.0
 */

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
    set: (name: string, value: string, options?: Cookies.CookieAttributes): void => {
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
    get: (name: string): string | undefined => {
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
    remove: (name: string, options?: Cookies.CookieAttributes): void => {
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
    setJSON: (name: string, value: object|any[], options?: Cookies.CookieAttributes): void => {
        if ( !name.trim() ) {
            console.error('name is empty or null.');
            return;
        }

        const isEmpty = value && Object.keys(value).length === 0;
        if (!value || isEmpty) {
            console.warn('value is empty ({} or []). storage skipped.');
            return;
        }

        try {
            Cookies.set(name, JSON.stringify(value), {
                ...DEFAULT_OPTIONS,
                ...options,
            });
        } catch (error) {
            console.error("JSON 문자열 변환 실패:", error);  
        }
    },

    /**
     * JSON 데이터 읽기
     * @param {string} name 
     * @returns 
     */
    getJSON: (name: string): string | undefined | null => {
        if ( !name.trim() ) {
            console.error('name is empty or null.');
            return;
        }

        const value = Cookies.get(name);

        try {
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error("JSON 문자열 변환 실패:", error);  
            return null;
        }
    },
};
