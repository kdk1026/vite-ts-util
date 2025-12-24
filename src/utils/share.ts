/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

export const share = (title?: string, text?: string): void => {
    const currentURL = window.location.href;
    if ( !currentURL.startsWith('https://') && !currentURL.includes('localhost') && !currentURL.includes('127.0.0.1') ) {
        alert('URL은 localhost, 127.0.0.1 또는 HTTPS여야 합니다.');
        return;
    }

    if ( navigator.share ) {
        // 크롬 최신 PC 버전 지원
        navigator.share({
            title: title || '',
            text: text || '',
            url: window.location.href
        })
        .then(() => {
            console.log('콘텐츠가 성공적으로 공유되었습니다.');
        })
        .catch((error) => {
            if (error.name === 'AbortError') {
                console.log('사용자가 공유를 취소했습니다.');
            } else {
                console.error('콘텐츠 공유 중 오류 발생: ' + error);
            }
        });
    } else {
        alert('이 브라우저는 Web Share API를 지원하지 않습니다.');
        // 클립보드 복사 수행으로 대체 등 상황에 맞게 처리
    }
};

export const shareResult = (title?: string, text?: string): string | undefined => {
    const currentURL = window.location.href;
    if ( !currentURL.startsWith('https://') && !currentURL.includes('localhost') && !currentURL.includes('127.0.0.1') ) {
        alert('URL은 localhost, 127.0.0.1 또는 HTTPS여야 합니다.');
        return;
    }

    if ( navigator.share ) {
        // 크롬 최신 PC 버전 지원
        navigator.share({
            title: title || '',
            text: text || '',
            url: window.location.href
        })
        .then(() => {
            return 'shareSuccess';
        })
        .catch((error) => {
            if (error.name === 'AbortError') {
                console.log('사용자가 공유를 취소했습니다.');
            } else {
                console.error('콘텐츠 공유 중 오류 발생: ' + error);
                return 'shareFail';
            }
        });
    } else {
        alert('이 브라우저는 Web Share API를 지원하지 않습니다.');
        // 클립보드 복사 수행으로 대체 등 상황에 맞게 처리
    }
};

export const copyToClipboard = (title?: string, text?: string): void => {
    const currentURL = window.location.href;
    if ( !currentURL.startsWith('https://') && !currentURL.includes('localhost') && !currentURL.includes('127.0.0.1') ) {
        alert('URL은 localhost, 127.0.0.1 또는 HTTPS여야 합니다.');
        return;
    }

    let clipboardContent = window.location.href;
    if (title) clipboardContent = `${title}\n${clipboardContent}`;
    if (text) clipboardContent = `${text}\n${clipboardContent}`;

    navigator.clipboard.writeText(clipboardContent)
    .then(() => {
        alert('클립보드에 링크가 복사되었습니다.');
    })
    .catch((error) => {
        console.error('클립보드 복사 중 오류 발생: ' + error);
    });
};

export const copyToClipboardResult = async (title?: string, text?: string): Promise<string> => {
    const currentURL = window.location.href;
    if ( !currentURL.startsWith('https://') && !currentURL.includes('localhost') && !currentURL.includes('127.0.0.1') ) {
        alert('URL은 localhost, 127.0.0.1 또는 HTTPS여야 합니다.');
    }

    let clipboardContent = window.location.href;
    if (title) clipboardContent = `${title}\n${clipboardContent}`;
    if (text) clipboardContent = `${text}\n${clipboardContent}`;

    try {
        await navigator.clipboard.writeText(clipboardContent);
        return 'clipboardSuccess';
    } catch (error) {
        console.error('클립보드 복사 중 오류 발생: ' + error);
        return 'clipboardFail';
    }
};