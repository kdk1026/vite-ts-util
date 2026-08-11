/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2026.08.11
 * @version 1.0
 */

/**
 * 주소에서 시/도 추출
 * @param {string} addr 
 * @returns 
 */
export const extractSido = (addr: string): string | null => {
    if ( !addr?.trim() ) {
        console.warn('Invalid input addr');
        return null;
    }

	const tokens = addr.trim().split(' ');

    if (tokens.length < 1) return '';

    return tokens[0];
};

/**
 * 주소에서 시/군/구 추출
 * @param {string} addr 
 * @returns 
 */
export const extractSigungu = (addr: string): string | null => {
    if ( !addr?.trim() ) {
        console.warn('Invalid input addr');
        return null;
    }

	const tokens = addr.trim().split(' ');
    
	if (tokens.length < 2) return '';
	
	if ( tokens[1].endsWith('시') && tokens[2]?.endsWith('구') ) {
		return `${tokens[1]} ${tokens[2]}`;
	}
	
	return tokens[1];
};

/**
 * 주소에서 도로명 주소 추출
 * @param {string} addr 
 * @returns 
 */
export const extractRoadAddress = (addr: string): string | null => {
    if ( !addr?.trim() ) {
        console.warn('Invalid input addr');
        return null;
    }

    // 건물번호 제외 시 = ?(?:\s+\d+(?:-\d+)?) 제거
    const regex = /[^대로길\s\d]+(?:대로|로|길)(?:\s+(?:[^길\s\d]+길(?:\s+\d+(?:-\d+)?)?|\d+(?:-\d+)?))?/;
    const match = regex.exec(addr);

    return match ? match[0] : null;
};