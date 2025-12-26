/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 * @description 매개변수 3개부터는 RORO 패턴 적용
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

export interface MyLocaleData {
    chrctrCode: string,
    chrctrNm: string
}

interface GetLocaleObjectOptions {
    localeCode: string;
    defaultString: string;
    localeData: MyLocaleData[];
}

/**
 * 로케일 데이터에서 로케일 값 가져오기
 * * @param {object} options
 * @param {blank|string} options.localeCode 
 * @param {string} options.defaultString 
 * @param {MyLocaleData[]} options.localeData
 * @returns 
 */
export const getLocaleData = ({localeCode = '', defaultString, localeData}: GetLocaleObjectOptions = {} as GetLocaleObjectOptions): string | undefined => {
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