/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
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

/**
 * 타이머
 * - 사용 예시
 *  timer(1800, SUPPORTED_LANGS.KO,
 *      ({ minutes, seconds, label }: TickPayload): => {
 *          console.log(`남은 시간: ${minutes}${label.min} ${seconds}${label.sec}`);
 *      },
 *      () => {
 *          console.log('타이머 종료');
 *      }
 *  );
 * @param {number} totalSeconds 
 * @param {SupportedLang} lang 
 * @param {(data: TickPayload) => void} onTick 
 * @param {() => void} onEnd 
 */
export const timer = (
    totalSeconds: number, 
    lang: SupportedLang, 
    onTick: (data: TickPayload) => void, 
    onEnd: () => void
): void => {
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