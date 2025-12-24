/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

/**
 * 동적으로 추가해야 할 경우
 */
export const loadExternalJs = (): void => {
    const scriptJquery = document.createElement('script');
    scriptJquery.src = `https://code.jquery.com/jquery-1.12.4.min.js`;
    scriptJquery.async = true;

    document.body.appendChild(scriptJquery);
};