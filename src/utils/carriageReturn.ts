/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

const escapeHtml = (unsafe: string): string => {
    return unsafe
        .replaceAll('&', "&amp;")
        .replaceAll('<', "&lt;")
        .replaceAll('>', "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll('\'', "&#039;");
};

export const changeBrTag = (content: string): string => {
    if (typeof content !== 'string' || !content.trim()) {
        return '';
    }

    /*
        \r\n    윈도우
        \r      구형 Mac (9버전 이하)
        \n      유닉스, 리눅스, 최신 Mac
    */
    const safeContent = escapeHtml(content);
    return safeContent.replaceAll(/(\r\n|\r|\n)/g, '<br />');
};