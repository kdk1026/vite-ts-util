/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

/**
 * 동적으로 외부 JS 파일을 로드하는 함수
 * @param {string} url 
 * @param {undefined|Function} callback
 */
export const loadExternalJs = (url: string, callback?: () => void): void | null => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${url}"]`);

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.async = true;

        if (callback) {
            script.onload = callback;
        }

        document.head.appendChild(script);
    } else if (callback) {
        callback();
    }
};