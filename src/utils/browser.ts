/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

/**
 * UserAgent에서 브라우저 식별
 * @returns 
 */
export const getBrowser = (): string => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent == null) {
        return "Unknown";
    }

    const browserMap = [
        { name: "Samsung Internet", keywords: ["samsungbrowser"] },
        { name: "Whale", keywords: ["whale"] },
        { name: "Microsoft Edge", keywords: ["edge"] },
        { name: "Opera", keywords: ["opr", "opera"] },
        { name: "Chrome", keywords: ["chrome"] },
        { name: "Firefox", keywords: ["firefox"] },
        { name: "Safari", keywords: ["safari"] },
        { name: "Internet Explorer", keywords: ["msie", "trident"] }
    ];

    for (const browser of browserMap) {
        for (const keyword of browser.keywords) {
            if (userAgent.includes(keyword)) {
                if (browser.name === "Safari" && userAgent.includes("chrome")) {
                    continue; // Chrome이 포함되어 있으면 Safari로 간주하지 않음
                }
                return browser.name;
            }
        }
    }

    return "Other";
};