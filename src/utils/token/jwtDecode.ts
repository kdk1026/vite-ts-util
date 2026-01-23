import { jwtDecode } from "jwt-decode";

interface MyTokenPayload {
    email: string;
    iat: number;
    exp: number;
}

export const jwtDecodeUtil = {
    /**
     * JWT 토큰에서 페이로드를 추출
     * @param {string} token 
     * @returns 
     */
    getPayload: (token: string): MyTokenPayload | null => {
        if ( !token?.trim() ) {
            console.error('token is empty.');
            return null;
        }

        try {
            return jwtDecode<MyTokenPayload>(token);
        } catch (error) {
            console.error("JWT 디코딩 실패:", error);
            return null;
        }
    }
};