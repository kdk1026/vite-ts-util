/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 * 
 * 일반 브라우저가 아니기 때문에 다른 동작이나 동작을 안하는 이슈가 있음
 */

const isFullUrl = (targetUrl: string): boolean => {
    return /^https?:\/\//.test(targetUrl);
};

export const Kakaotalk = {
    /**
     * 카카오톡 인앱 브라우저 여부
     * @returns 
     */
    isKakaotalkInAppBrowser : (): boolean => {
        const userAgent = navigator.userAgent.toLowerCase();
        return userAgent.includes('kakaotalk');
    },

    /**
     * 카카오 인앱 브라우저면 외부 브라우저로 열기, 아니면 그냥 열기
     * - FrontEnd 에서는 index.html에서 로드 하자마자 외부 브라우저로 열게끔 가능 (window.onload | window.addEventListener('load')
     * @param {string} targetUrl 
     * @param {boolean} isLoad
     */
    openInExternalBrowserIfKakao : (targetUrl: string, isLoad: boolean): void => {
        if ( !targetUrl?.trim() ) {
            console.error('targetUrl is empty.');
            return;
        }

        if ( Kakaotalk.isKakaotalkInAppBrowser() ) {
            let linkUrl;

            if ( isFullUrl(targetUrl) ) {
                linkUrl = targetUrl;
            } else {
                linkUrl = `${window.location.protocol}://${window.location.host}${targetUrl}`;
            }

            window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(linkUrl)}`;
        } else if ( !isLoad ) {
                window.location.href = targetUrl;
            }
    },

    /**
     * 카카오 인앱 브라우저면 외부 브라우저로 열기, 아니면 그냥 열기
     * @param {string} targetUrl 
     * @param {useNavigate} navigate
     */
    openInExternalBrowserIfKakaoReact : (targetUrl: string, navigate: any): void => {
        if ( targetUrl?.trim() ) {
            console.error('targetUrl is empty or null.');
            return;
        }

        if ( !navigate ) {
            console.error('useNavigate required.');
            return;
        }

        if ( Kakaotalk.isKakaotalkInAppBrowser() ) {
            let linkUrl;

            if ( isFullUrl(targetUrl) ) {
                linkUrl = targetUrl;
            } else {
                linkUrl = `${window.location.protocol}://${window.location.host}${targetUrl}`;
            }

            window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(linkUrl)}`;
        } else {
            navigate(targetUrl, { replace: true });
        }
    },

    /**
     * 카카오 인앱 브라우저면 외부 브라우저로 열기, 아니면 그냥 열기
     * @param {string} targetUrl 
     * @param {useRouter} router
     */
    openInExternalBrowserIfKakaoVue : (targetUrl: string, router: any): void => {
        if ( !targetUrl?.trim() ) {
            console.error('targetUrl is empty or null.');
            return;
        }

        if ( !router ) {
            console.error('useRouter required.');
            return;
        }

        if ( Kakaotalk.isKakaotalkInAppBrowser() ) {
            let linkUrl;

            if ( isFullUrl(targetUrl) ) {
                linkUrl = targetUrl;
            } else {
                linkUrl = `${window.location.protocol}://${window.location.host}${targetUrl}`;
            }

            window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(linkUrl)}`;
        } else {
            router({ path: targetUrl, replace: true });
        }
    }
};

export const Line = {
    /**
     * 라인 인앱 브라우저 여부
     * @returns 
     */
    isLineInAppBrowser : (): boolean => {
        const userAgent = navigator.userAgent.toLowerCase();
        return userAgent.includes('line');
    },

    /**
     * 라인 인앱 브라우저면 외부 브라우저로 열기, 아니면 그냥 열기
     * - FrontEnd 에서는 index.html에서 로드 하자마자 외부 브라우저로 열게끔 가능 (window.onload | window.addEventListener('load')
     * @param {string} targetUrl
     * @param {boolean} isLoad 
     */
    openInExternalBrowserIfLine : (targetUrl: string, isLoad: boolean): void => {
        if ( !targetUrl?.trim() ) {
            console.error('targetUrl is empty or null.');
            return;
        }

        if ( Line.isLineInAppBrowser() ) {
            let linkUrl;

            if ( isFullUrl(targetUrl) ) {
                linkUrl = targetUrl;
            } else {
                linkUrl = `${window.location.protocol}://${window.location.host}${targetUrl}`;
            }

            if ( linkUrl.includes('?') ) {
                linkUrl += '&openExternalBrowser=1';
            } else {
                linkUrl += '?openExternalBrowser=1';
            }

            window.location.href = linkUrl;
        }  else if ( !isLoad ) {
                window.location.href = targetUrl;
            }
    },

    /**
     * 라인 인앱 브라우저면 외부 브라우저로 열기, 아니면 그냥 열기
     * @param {string} targetUrl 
     * @param {useNavigate} navigate
     */
    openInExternalBrowserIfLineReact : (targetUrl: string, navigate: any): void => {
        if ( !targetUrl?.trim() ) {
            console.error('targetUrl is empty or null.');
            return;
        }

        if ( !navigate ) {
            console.error('useNavigate required.');
            return;
        }

        if ( Line.isLineInAppBrowser() ) {
            let linkUrl;

            if ( isFullUrl(targetUrl) ) {
                linkUrl = targetUrl;
            } else {
                linkUrl = `${window.location.protocol}://${window.location.host}${targetUrl}`;
            }

            if ( linkUrl.includes('?') ) {
                linkUrl += '&openExternalBrowser=1';
            } else {
                linkUrl += '?openExternalBrowser=1';
            }

            window.location.href = linkUrl;
        }  else {
            navigate(targetUrl, { replace: true });
        }
    },

    /**
     * 라인 인앱 브라우저면 외부 브라우저로 열기, 아니면 그냥 열기
     * @param {string} targetUrl 
     * @param {useRouter} router
     */
    openInExternalBrowserIfLineVue : (targetUrl: string, router: any): void => {
        if ( !targetUrl?.trim() ) {
            console.error('targetUrl is empty or null.');
            return;
        }

        if ( !router ) {
            console.error('useRouter required.');
            return;
        }

        if ( Line.isLineInAppBrowser() ) {
            let linkUrl;

            if ( isFullUrl(targetUrl) ) {
                linkUrl = targetUrl;
            } else {
                linkUrl = `${window.location.protocol}://${window.location.host}${targetUrl}`;
            }

            if ( linkUrl.includes('?') ) {
                linkUrl += '&openExternalBrowser=1';
            } else {
                linkUrl += '?openExternalBrowser=1';
            }

            window.location.href = linkUrl;
        }  else {
            router({ path: targetUrl, replace: true });
        }
    }
};

export const Telegram = {
    /**
     * 텔레그램 인앱 브라우저 여부
     * - window.TelegramWebviewProxy = iOS
     * - window.TelegramWebview = Android
     * @returns 
     */
    isTelegramInAppBrowser : (): boolean => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isTelegramUA = userAgent.includes('telegram');
        const hasTelegramObject = !!(window as any).Telegram?.WebApp;

        return isTelegramUA || hasTelegramObject;
    },

    /**
     * 텔레그램 인앱 브라우저면 얼랏, 아니면 그냥 열기
     * - FrontEnd 에서는 index.html에서 로드 하자마자 얼랏 띄우게끔 가능 (window.onload | window.addEventListener('load')
     * @param {string} targetUrl 
     * @param {boolean} isLoad 
     */
    openInExternalBrowserIfTelegram : (targetUrl: string, isLoad: boolean): void => {
        if ( !targetUrl?.trim() ) {
            console.error('targetUrl is empty or null.');
            return;
        }

        if ( Telegram.isTelegramInAppBrowser() ) {
            // 외부 브라우저로 열기 제공 안함, 앱 설정으로 가능
            alert('설정 > 데이터 및 저장공간 > 기타에서 "링크 열기"를 선택해 원하는 브라우저를 지정해 주세요.');
        }  else if ( !isLoad ) {
                window.location.href = targetUrl;
            }
    },
};