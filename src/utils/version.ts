/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

/**
 * 두 버전 문자열을 비교
 * @param {string} currentVersion - 비교 대상 현재 버전 (예: "1.2.3")
 * @param {string} minimumVersion - 비교 기준 최소 버전 (예: "1.2.0")
 * @returns {number} 현재 버전과 최소 버전의 비교 결과
 * 
 * 1: currentVersion > minimumVersion (더 높음)
 * -1: currentVersion < minimumVersion (더 낮음)
 * 0: currentVersion = minimumVersion (같음)
 */
export const compareVersion = (currentVersion: string, minimumVersion: string): number | undefined => {
    if ( !currentVersion.trim() ) {
        console.error('currentVersion is empty or null.');
        return;
    }

    if ( !minimumVersion.trim() ) {
        console.error('minimumVersion is empty or null.');
        return;
    }

    const a = currentVersion.split('.').map(Number);
    const b = minimumVersion.split('.').map(Number);

    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const num1 = a[i] || 0;
        const num2 = b[i] || 0;
        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
    }

    return 0;
};