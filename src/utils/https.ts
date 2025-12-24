/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

import axios, { Axios, AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { getToken, setToken } from "./token";
import { getCookie } from "./cookie";

const setApiUrl = (): string => {
    const profile = import.meta.env.VITE_PROFILE;
    
    if ( profile === 'local' ) {
        const hostname = window.location.hostname;
        if ( hostname === 'localhost' ) {
            return import.meta.env.VITE_API_URL;    
        } else {
            return (import.meta.env.VITE_API_URL).replace('localhost', hostname);
        }
    } else {
        return import.meta.env.VITE_API_URL;
    }
};

const apiUrl: string = setApiUrl();

const instance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    timeout: 5000
});

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken: string | null = getToken();
        if ( accessToken ) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // 메인에서 CSRF 토큰 생성 API를 요청
        const csrfToken: string | null = getCookie('XSRF-TOKEN');
        if ( csrfToken ) {
            config.headers['X-CSRF-TOKEN'] = csrfToken;
        }

        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const headers = response.headers;

        const accessToken = headers['accessToken'];
        if ( typeof accessToken === 'string' ) {
            setToken(accessToken);
        }

        return response;
    },
    async (error: AxiosError) => {
        onErrorCase(error);

        throw error;
    }
);

const onErrorCase = (error: AxiosError): void => {
    if ( error.code === 'ERR_NETWORK' ) {
        onError(999, `에러가 발생했습니다. ${error.message}`);
    }

    if ( error.code === 'ECONNABORTED' ) {
        onError(998, `요청이 만료되었습니다. ${error.message}`);
    }

    if ( error.response ) {
        const { status, statusText } = error.response;
        console.log(statusText);
    
        switch (status) {
            case 400:
                alert("잘못된 요청입니다.");
                onError(status, "잘못된 요청입니다.");
                break;
            case 401:
                alert("인증 실패입니다.");
                onError(status, "인증 실패입니다.");
                break;
            case 403:
                alert("권한이 없습니다.");
                onError(status, "권한이 없습니다.");
                break;
            case 404:
                alert("찾을 수 없는 URL 입니다.");
                onError(status, "찾을 수 없는 URL 입니다.");
                break;
            case 500:
                alert("서버에 문제가 발생했습니다.");
                onError(status, "서버에 문제가 발생했습니다.");
                break;
            default:
                alert(`문제가 발생했습니다. ${error.message}`);
                onError(status, `문제가 발생했습니다. ${error.message}`);
        }
    }
};

interface ApiCustomError {
    status: number;
    message: string;
}

const onError = (status: number, message: string): never => {
    const error: ApiCustomError = { status, message };
    throw error;
};

export default instance;