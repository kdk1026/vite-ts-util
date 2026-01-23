import { Convert, GetTimeInterval } from "../date/dayDate";

/**
 * 액세스 토큰의 만료가 임박했는지 확인 (예: 5분 이내)
 * @param {number} exp 
 * @param {undefined|number} thresholdMinutes
 * @returns 
 */
export const isTokenExpiringSoon = (exp: number, thresholdMinutes: number = 5): boolean => {
	if (exp == 0) {
        return true;
    }
	
    const expDate = new Date(exp * 1000);
    const expString = Convert.getDateToFormattedString(expDate, "YYYYMMDDHHmmss");
    const diffMinute = GetTimeInterval.intervalMinutes(expString);
    return diffMinute <= thresholdMinutes;
};