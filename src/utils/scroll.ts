/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2026.09.01
 * @version 1.0
 */

/**
 * 특정 좌표로 스크롤 이동
 * @param {number} topPosition
 */
export const scrollTo = (topPosition: number) => {
    setTimeout(() => {
        window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
        });
    }, 500);
};

/**
 * 특정 HTML 요소 위치로 스크롤 이동
 * @param {HTMLElement} targetElement
 * @returns 
 */
export const scrollToTarget = (targetElement: HTMLElement) => {
    setTimeout(() => {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }, 500);
};