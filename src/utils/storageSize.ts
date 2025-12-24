/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

/**
 * sessionStorage 사용량
 */
export const getSessionStorageSize = (): void => {
    let total = 0;
    for (let key in sessionStorage) {
        if (Object.hasOwn(sessionStorage, key)) {
            total += sessionStorage[key].length * 2; // UTF-16 문자의 바이트 수
        }
    }
    console.log(`세션 스토리지 사용량: ${readableFileSize(total)}`);
}

const readableFileSize = (size: number): string => {
    if (size == 0) return '0';
    const arrDataUnits = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Number(Math.floor(Math.log(size) / Math.log(1024)));
    return Math.round(size / Math.pow(1024, i)) + ' ' + arrDataUnits[i];
}