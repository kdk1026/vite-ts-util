/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 * @description
 * - html-entities 설치하여 decode 사용 권장
 * - 설치 불가능할 경우, 케이스 추가해서 사용
 */

const replacements = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#39;': "'",
    '&#x2F;': '/'
} as const;

/**
 * HTML Unescape 처리
 * @param {string} val 
 * @returns 
 */
export const unescapeHtml = (val: string): string => {
    const pattern = /&amp;|&lt;|&gt;|&quot;|&#x27;|&#39;|&#x2F;/g;

    return val.replaceAll(pattern, (entity) => {
        return replacements[entity as keyof typeof replacements];
    });
};