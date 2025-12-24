/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */


/**
 * 지연 시키기
 * @param {number} sec 
 * @returns 
 */
export const sleep = (sec: number): void => {
    if ( typeof sec !== 'number' ) {
        console.error('`sec` must be a number.')
        return;
    }

    let start = Date.now(),
    now = start;

    while ( now - start < sec * 1000 ) {
        now = Date.now();
    }
}