/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

import { decode } from "html-entities";
import DOMPurify from 'dompurify';

/**
 * 세션 스토리지 로케일 데이터에서 로케일 값 가져오기
 * @param {blank|string} localeCode 
 * @param {string} defaultString 
 * @returns 
 */
export const getLocaleStorage = (localeCode: string, defaultString: string): string | undefined => {
    const LOCALE_DATA_STORAGE_KEY = import.meta.env.VITE_LOCALE_DATA_STORAGE_KEY;

    if ( !localeCode ) {
        return defaultString;
    }

    try {
        const storageLocaleData = sessionStorage.getItem(LOCALE_DATA_STORAGE_KEY);
        if ( !storageLocaleData ) {
            return defaultString;
        }

        const localeData = JSON.parse(storageLocaleData);
        if ( !localeData ) {
            return defaultString;
        }

        if ( !Array.isArray(localeData) ) {
            return defaultString;
        }

        const filteredData = localeData.filter((item) => item.chrctrCode === localeCode);
        if ( filteredData.length === 0 ) {
            return defaultString;
        }

        const decodeChrctrNm = decode(filteredData[0].chrctrNm);
        return DOMPurify.sanitize(decodeChrctrNm);
    } catch (e) {
        console.error('Invalid JSON string', e);
    }
};

interface MyLocaleData {
    chrctrCode: string,
    chrctrNm: string
}

/**
 * 로케일 데이터에서 로케일 값 가져오기
 * @param {blank|string} localeCode 
 * @param {string} defaultString 
 * @param {MyLocaleData[]} localeData
 * @returns 
 */
export const getLocaleRedux = (localeCode: string, defaultString: string, localeData: MyLocaleData[]): string | undefined => {
    if ( !localeCode || !localeData ) {
        return defaultString;
    }

    if ( !Array.isArray(localeData) ) {
        return defaultString;
    }

    const filteredData = localeData.filter((item) => item.chrctrCode === localeCode);
    if ( filteredData.length === 0 ) {
        return defaultString;
    }

    const decodeChrctrNm = decode(filteredData[0].chrctrNm);
    return DOMPurify.sanitize(decodeChrctrNm);
};