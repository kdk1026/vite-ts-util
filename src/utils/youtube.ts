/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

/**
 * 유튜브 동영상 ID 추출
 * @param {string} url 
 * @returns 
 */
export const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/;

    const match = new RegExp(regex).exec(url);
    return match ? match[1] : null;
};

/**
 * 유튜브 URL을 iframe으로 재생 가능한 Embed URL로 변환
 * @param {string} shareUrl 
 * @returns 
 */
export const convertToEmbedUrl = (shareUrl: string): string | null => {
    const youtebeId = extractYouTubeId(shareUrl);

    return youtebeId ? `https://www.youtube.com/embed/${youtebeId}` : null;
};