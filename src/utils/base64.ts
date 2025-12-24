/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

/**
 * 순수 아스키 문자열 Base64 인코딩
 * @param {string} str 
 * @returns 
 */
export const encodeBase64 = (str: string): string => {
    if ( !str?.trim() ) {
        return '';
    }

    return btoa(str);
};

/**
 * 순수 아스키 문자열 Base64 디코딩
 * @param {string} str 
 * @returns 
 */
export const decodeBase64 = (str: string): string => {
    if ( !str?.trim() ) {
        return '';
    }

    return atob(str);        
};

/**
 * 유니코드 (한글 포함) Base64 인코딩
 * @param {string} str 
 * @returns 
 */
export const encodeUnicodeBase64 = (str: string): string => {
    if ( !str?.trim() ) {
        return '';
    }

    // 유니코드를 UTF-8 URL 인코딩 (퍼센트 인코딩) -> 이스케이프 시퀀스 -> 이진 문자열 -> Base64
    return btoa(
        encodeURIComponent(str).replaceAll(/%([0-9A-F]{2})/g, (match, p1: string) => {
            return String.fromCodePoint(Number.parseInt(p1, 16));
        })
    )
};

/**
 * 유니코드 (한글 포함) Base64 디코딩
 * @param {string} str 
 */
export const decodeUnicodeBase64 = (str: string): string => {
    if ( !str?.trim() ) {
        return '';
    }

    try {
        // Base64 -> 이진 문자열 -> 각 문자를 %XX 형태의 퍼센트 인코딩으로 변환 -> URI 디코딩
        const binaryString = atob(str);
        const percentEncoded = Array.from(binaryString)
            .map((c) => {
                // 문자의 유니코드 번호를 16진수 문자열로 변환하고 2자리로 맞춤
                const code = c.codePointAt(0) ?? 0;
                return '%' + code.toString(16).padStart(2, '0');
            }).join('');

            return decodeURIComponent(percentEncoded);
    } catch (error) {
        console.error('Base64 decoding failed:', error);
        return '';
    }
};

/**
 * Blob 데이터를 Base64 인코딩
 * - 모바일 웹뷰에서 파일 다운로드 처리로 인터페이스로 전달
 * @param {Blob} blob 
 * @returns 
 */
export const blobToEncodeBase64 = (blob: Blob): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            console.log('reader.result:', reader.result);
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(blob);
    });
};