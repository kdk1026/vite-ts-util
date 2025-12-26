/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 * @description 매개변수 3개부터는 RORO 패턴 적용
 */

export interface TimerLabel {
    min: string;
    sec: string;
}

export interface TickPayload {
    minutes: number;
    seconds: number;
    label: TimerLabel;
}

export const SUPPORTED_LANGS = {
    KO: 'ko',
    EN: 'en',
    JA: 'ja',
    ZH: 'zh'
} as const;
export type SupportedLang = typeof SUPPORTED_LANGS[keyof typeof SUPPORTED_LANGS];

interface TimerOptions {
    totalSeconds: number;
    lang: SupportedLang;
    onTick: (data: TickPayload) => void;
    onEnd: () => void;
}


/**
 * 타이머
 * * @param {object} options
 * @param {number} options.totalSeconds 
 * @param {SupportedLang} options.lang 
 * @param {(data: TickPayload) => void} options.onTick 
 * @param {() => void} options.onEnd
 * 
 * @example
 *  timer({
 *      totalSeconds: 1800,
 *      lang: SUPPORTED_LANGS.KO,
 *      onTick: ({ minutes, seconds, label }) => {
 *          console.log(`남은 시간: ${minutes}${label.min} ${seconds}${label.sec}`);
 *      },
 *      onEnd: () => {
 *          console.log('타이머 종료');
 *      }
 *  });
 */
export const timer = ({totalSeconds, lang, onTick, onEnd}: TimerOptions = {} as TimerOptions): void => {
    const localeLabels: Record<SupportedLang, TimerLabel> = {
        ko: { min: '분', sec: '초' },
        en: { min: 'min', sec: 'sec' },
        ja: { min: '分', sec: '秒' },
        zh: { min: '分钟', sec: '秒钟' }
    };

    const intervalId = setInterval(() => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // 숫자만 전달하고, 포맷은 외부에서 처리
        onTick({ minutes, seconds, label: localeLabels[lang] });

        totalSeconds--;

        if ( totalSeconds < 0 ) {
            clearInterval(intervalId);
            onEnd();
        }
    }, 1000);
};