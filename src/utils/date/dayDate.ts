/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.1
 * @description Moment.js와 거의 동일한 API를 사용하는 Day.js 사용
 * @description
    Moment.js와 달리 변경이 불가능(immutable)하기 때문에
    이미 변수에 Day.js 객체의 날짜를 메소드로 변경할 경우 변수에 재할당해주어야 한다.

    ```
        // Moment.js
        const dateWithMoment = moment('2023-11-02');
        dateWithMoment.add(7, 'day'); // 7일 추가
        console.log(dateWithMoment.formet('YYYY-MM-DD'); // '2023-11-09'
                    
        // Day.js
        let dateWithDay = dayjs('2023-11-02');
        dateWithDay.add(7, 'day') // 7일 추가
        console.log(dateWithDay.format('YYYY-MM-DD')) // '2023-11-02' 그대로 출력
        dateWithDay = dateWithDay.add(7, 'day') // 7일 추가 + 재할당
        console.log(dateWithDay.format('YYYY-MM-DD')) // '2023-11-09'
    ```
 */

import dayjs, { type OpUnitType } from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const FORMAT = {
    YYYYMMDD : 'YYYYMMDD',
    YYYYMMDDHHMMSS : 'YYYYMMDDHHmmss'
};

/**
 * 현재 날짜 및 시간 반환
 */
const Today = {
    /**
     * 현재 날짜를 yyyyMMdd 형식의 String 타입으로 반환
     * @returns 
     */
    getTodayString : function(): string {
        return dayjs().format(FORMAT.YYYYMMDD);
    },
    /**
     * 현재 날짜를 해당 포맷의 String 타입로 반환
     * @param {string} dateFromat 
     * @returns 
     */
    getTodayStringFormatted : function(dateFromat: string): string {
        return dayjs().format(dateFromat);
    },
    /**
     * 현재 시간을 HHmmss 형식의 String 타입으로 반환
     * @returns 
     */
    getCurrentTime : function(): string {
        return dayjs().format('HHmmss');
    },
    /**
     * 현재 연도 반환
     * @returns 
     */
    getYear : function(): string {
        return dayjs().format('YYYY');
    },
    /**
     * 현재 월 반환
     * @returns 
     */
    getMonthValue : function(): string {
        return dayjs().format('M');
    },
    /**
     * 현재 일 반환
     * @returns 
     */
    getDayOfMonth : function(): string {
        return dayjs().format('D');
    },
    /**
     * 현재 시간 반환
     * @returns 
     */
    getHour : function(): string {
        return dayjs().format('HH');
    },
    /**
     * 현재 분 반환
     * @returns 
     */
    getMinute : function(): string {
        return dayjs().format('mm');
    }
};

/**
 * String 타입 형식의 포맷 변환
 */
const StringFormat = {
    /**
     * yyyyMMdd 형식의 String 타입을 해당 포맷의 String 타입으로 반환
     * @param {string} strDate 
     * @param {string} dateFormat 
     * @returns 
     */
    getStringDate : function(strDate: string, dateFormat: string): string {
        return dayjs(strDate, "YYYYMMDD", true).format(dateFormat);
    },
    /**
     * yyyyMMddHHmmss 형식의 String 타입을 해당 포맷의 String 타입으로 반환
     * @param {string} strDate 
     * @param {string} dateFormat 
     * @returns 
     */
    getStringDateTime : function(strDate: string, dateFormat: string): string {
        return dayjs(strDate, "YYYYMMDDHHmmss", true).format(dateFormat);
    }
};

/**
 * 타입 변환
 */
const Convert = {
    /**
     * yyyyMMdd(HHmmss) 형식의 String 타입을 Date 타입으로 반환
     * @param {string} strDate 
     * @returns 
     */
    getStringToDate : function(strDate: string): Date {
        if (strDate.length === 14) {
            return dayjs(strDate, "YYYYMMDDHHmmss", true).toDate();
        } else {
            return dayjs(strDate, "YYYYMMDD", true).toDate();
        }
    },
    /**
     * Date 타입 객체를 yyyyMMdd 형식의 String 타입으로 반환
     * @param {Date} date 
     * @returns 
     */
    getDateToString : function(date: Date): string {
        return dayjs(date).format('YYYYMMDD');
    },
    /**
     * Date 타입 객체를 해당 포맷의 String 타입으로 반환
     * @param {Date} date 
     * @param {string} dateFormat 
     * @returns 
     */
    getDateToFormattedString : function(date: Date, dateFormat: string): string {
        return dayjs(date).format(dateFormat);
    }
};

/**
 * 이전/이후 날짜 반환
 */
const CalcDate = {
    /**
     * 현재 날짜의 이전/이후 날짜를 yyyyMMdd 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환
     * @param {number} days 
     * @returns 
     */
    plusMinusDay : function(days: number): string {
        return dayjs().add(days, 'days').format(FORMAT.YYYYMMDD);
    },
    /**
     * yyyyMMdd 형식의 String 타입 날짜의 이전/이후 날짜를 yyyyMMdd 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환
     * @param {string} strDate 
     * @param {number} days 
     * @returns 
     */
    plusMinusDayFrom : function(strDate: string, days: number): string {
        return dayjs(strDate, "YYYYMMDD", true).add(days, 'days').format(FORMAT.YYYYMMDD);
    },
    /**
     * 현재 날짜의 이전/이후 날짜를 yyyyMMdd 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환
     * @param {number} months 
     * @returns 
     */
    plusMinusMonth : function(months: number): string {
        return dayjs().add(months, 'months').format(FORMAT.YYYYMMDD);
    },
    /**
     * 현재 날짜의 이전/이후 날짜를 해당 포맷 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환
     * @param {number} months 
     * @param {string} dateForamt 
     * @returns 
     */
    plusMinusMonthFormatted : function(months: number, dateForamt: string): string {
        return dayjs().add(months, 'months').format(dateForamt);
    },
    /**
     * yyyyMMdd 형식의 String 타입 날짜의 이전/이후 날짜를 yyyyMMdd 형식의 String 타입으로 반환
     *    - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환
     * @param {string} strDate 
     * @param {number} months 
     * @returns 
     */
    plusMinusMonthString : function(strDate: string, months: number): string {
        return dayjs(strDate, "YYYYMMDD", true).add(months, 'months').format(FORMAT.YYYYMMDD);
    },
    /**
     * 해당 포맷 형식의 String 타입 날짜의 이전/이후 날짜를 해당 포맷 형식의 String 타입으로 반환
     *    - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환
     * @param {string} strDate 
     * @param {number} months 
     * @param {string} dateForamt 
     * @returns 
     */
    plusMinusMonthFromFormatted : function(strDate: string, months: number, dateForamt: string): string {
        return dayjs(strDate, [dateForamt], true).add(months, 'months').format(dateForamt);
    },
    /**
     * 현재 날짜의 이전/이후 날짜를 yyyyMMdd 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환
     * @param {number} years 
     * @returns 
     */
    plusMinusYear : function(years: number): string {
        return dayjs().add(years, 'years').format(FORMAT.YYYYMMDD);
    },
    /**
     * 현재 날짜의 이전/이후 날짜를 해당 포맷 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환
     * @param {number} years 
     * @param {string} dateForamt 
     * @returns 
     */
    plusMinusYearFormatted : function(years: number, dateForamt: string): string {
        return dayjs().add(years, 'years').format(dateForamt);
    },
    /**
     * yyyyMMdd 형식의 String 타입 날짜의 이전/이후 날짜를 yyyyMMdd 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환 
     * @param {string} strDate 
     * @param {number} years 
     * @returns 
     */
    plusMinusYearFrom : function(strDate: string, years: number) {
        return dayjs(strDate, "YYYYMMDD", true).add(years, 'years').format(FORMAT.YYYYMMDD);
    },
    /**
     * 해당 포맷 형식의 String 타입 날짜의 이전/이후 날짜를 해당 포맷 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환 
     * @param {string} strDate 
     * @param {number} years 
     * @param {string} dateForamt 
     * @returns 
     */
    plusMinusYearFromFormatted : function(strDate: string, years: number, dateForamt: string): string {
        return dayjs(strDate, [dateForamt], true).add(years, 'years').format(dateForamt);
    }
};

/**
 * 이전/이후 시간각반환
 */
const CalcTime = {
    /**
     * 현재 날짜의 이전/이후 날짜를 yyyyMMddHHmmss 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환 
     * @param {number} hours 
     * @returns 
     */
    plusMinusHour : function(hours: number): string {
        return dayjs().add(hours, 'hours').format(FORMAT.YYYYMMDDHHMMSS);
    },
    /**
     * yyyyMMddHHmmss 형식의 String 타입 날짜의 이전/이후 날짜를 yyyyMMddHHmmss 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환 
     * @param {string} strDate 
     * @param {number} hours 
     * @returns 
     */
    plusMinusHourFrom : function(strDate: string, hours: number): string {
        return dayjs(strDate, "YYYYMMDDHHmmss", true).add(hours, 'hours').format(FORMAT.YYYYMMDDHHMMSS);
    },
    /**
     * 현재 날짜의 이전/이후 날짜를 yyyyMMddHHmmss 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환 
     * @param {number} minutes 
     * @returns 
     */
    plusMinusMinute : function(minutes: number): string {
        return dayjs().add(minutes, 'minutes').format(FORMAT.YYYYMMDDHHMMSS);
    },
    /**
     * yyyyMMddHHmmss 형식의 String 타입 날짜의 이전/이후 날짜를 yyyyMMddHHmmss 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환 
     * @param {string} strDate 
     * @param {number} hours 
     * @returns 
     */
    plusMinusMinuteFrom : function(strDate: string, minutes: number): string {
        return dayjs(strDate, "YYYYMMDDHHmmss", true).add(minutes, 'minutes').format(FORMAT.YYYYMMDDHHMMSS);
    },
    /**
     * 현재 날짜의 이전/이후 날짜를 yyyyMMddHHmmss 형식의 String 타입으로 반환
     *   - 인자 값이 음수 인 경우, 이전 날짜 반환
     *   - 인자 값이 양수 인 경우, 이후 날짜 반환 
     * @param {number} seconds 
     * @returns 
     */
    plusMinusSecond : function(seconds: number): string {
        return dayjs().add(seconds, 'seconds').format(FORMAT.YYYYMMDDHHMMSS);
    }
};

/**
 * 기간 간격 구하기
 */
const GetDateInterval = {
    /**
     * 기준 날짜와 현재 날짜의 차이를 구하는 공통 내부 함수
     * @param {string} strFixDate (YYYYMMDD)
     * @param {string} unit ('year', 'month', 'day')
     * @returns {number}
     */
    _getDiff: function(strFixDate: string, unit: OpUnitType): number {
        const fixDate = dayjs(strFixDate, "YYYYMMDD").startOf('day');
        const targetDate = dayjs().startOf('day');
        
        // diff(비교대상, 단위, 소수점포함여부)
        // fixDate가 미래면 양수, 과거면 음수 반환
        return fixDate.diff(targetDate, unit);
    },
    /**
     * 현재 날짜와 년 간격 구하기
     *   - 0:같다, 양수:크다, 음수:작다
     * @param {string} strFixDate (YYYYMMDD)
     * @returns 
     */
    intervalYears : function(strFixDate: string): number {
        return this._getDiff(strFixDate, 'year');
    },
    /**
     * 현재 날짜와 월 간격 구하기
     *   - 0:같다, 양수:크다, 음수:작다
     * @param {string} strFixDate 
     * @returns 
     */
    intervalMonths : function(strFixDate: string): number {
        return this._getDiff(strFixDate, 'month');
    },
    /**
     * 현재 날짜와 일자 간격 구하기
     *   - 0:같다, 양수:크다, 음수:작다
     * @param {string} strFixDate 
     * @returns 
     */
    intervalDays : function(strFixDate: string): number {
        return this._getDiff(strFixDate, 'day');
    }
};

/**
 * 시간 간격 구하기
 */
const GetTimeInterval = {
/**
     * 공통 차이 계산 로직 (내부 함수)
     * @param {string} strFixDate (YYYYMMDDHHmmss)
     * @param {string} unit ('hour', 'minute', 'second')
     */
    _getDiff: function(strFixDate: string, unit: OpUnitType): number {
        const fixDate = dayjs(strFixDate, "YYYYMMDDHHmmss", true);
        const targetDate = dayjs();

        if (!fixDate.isValid()) {
            console.error("Invalid Date Format");
            return Number.NaN;
        }

        // diff는 기본적으로 소수점을 버린 정수를 반환합니다.
        // 미래면 양수, 과거면 음수를 반환합니다.
        const result = fixDate.diff(targetDate, unit);
        
        // -0 문제를 방지하기 위한 처리
        return result === 0 ? 0 : result;
    },
    /**
     * 현재 날짜와 시간 간격 구하기
     *   - 0:같다, 양수:크다, 음수:작다
     * @param {string} strFixDate 
     * @returns 
     */
    intervalHours : function(strFixDate: string): number {
        return this._getDiff(strFixDate, 'hour');
    },
    /**
     * 현재 날짜와 분 간격 구하기
     *   - 0:같다, 양수:크다, 음수:작다
     * @param {string} strFixDate 
     * @returns 
     */
    intervalMinutes : function(strFixDate: string): number {
        return this._getDiff(strFixDate, 'minute');
    },
    /**
     * 현재 날짜와 초 간격 구하기
     *   - 0:같다, 양수:크다, 음수:작다
     * @param {string} strFixDate 
     * @returns 
     */
    intervalSeconds : function(strFixDate: string): number {
        return this._getDiff(strFixDate, 'second');
    }
};

/**
 * 요일 구하기
 */
const GetDayOfWeek = {
    /**
     * 현재 날짜의 요일 구하기
     * @returns 
     */
    getDayOfWeek : function(): number {
        return dayjs().day();
    },
    /**
     * yyyyMMdd 형식의 String 타입 날짜의 요일 구하기
     * @param {string} strDate 
     * @returns 
     */
    getDayOfWeekFromDate : function(strDate: string): number {
        return dayjs(strDate, "YYYYMMDD", true).day();
    },
    /**
     * 현재 날짜의 1일의 요일 반환
     * @returns 
     */
    getWeekStartDay : function(): number {
        return dayjs().date(1).day();
    },
    /**
     * yyyyMMdd 형식의 String 타입에 해당하는 1일의 요일 반환
     * @param {string} strDate 
     * @returns 
     */
    getWeekStartDayFromDate : function(strDate: string): number {
        return dayjs(strDate, "YYYYMMDD", true).date(1).day();
    },
    /**
     * 현재 날짜의 로케일 요일 구하기
     *   - Locale 목록 : https://github.com/iamkun/dayjs/tree/dev/src/locale
     * @param {string} locale 
     * @returns 
     */
    getTodayDayOfWeekLocale : function(locale: string): string {
        return dayjs().locale(locale).format('dd');
    },
    /**
     * yyyyMMdd 형식의 String 타입 날짜의 한글 요일 구하기
     * @param {string} strDate 
     * @param {string} locale 
     * @returns 
     */
    getDayOfWeekFromDateLocale : function(strDate: string, locale: string): string {
        return dayjs(strDate, "YYYYMMDD", true).locale(locale).format('dd');
    }
};

/**
 * 마지막 일자 반환
 */
const GetDayOfMonth = {
    /**
     * 현재 날짜의 마지막 일자를 반환
     * @returns 
     */
    getEndOfCurrentMonth : function(): number {
        return dayjs().daysInMonth();
    },
    /**
     * 현재 날짜의 마지막 일자를 yyyyMMdd 형식으로 반환
     */
    getEndOfCurrentMonthString: function(): string {
        return dayjs().endOf('month').format('YYYYMMDD');
    },
    /**
     * yyyyMMdd 형식의 String 타입에 해당하는 월의 마지막 일자를 반환
     * - Java 와 다르게 인자가 달라도 함수명은 구분해야 함
     * @param {string} strDate 
     * @returns 
     */
    getEndOfMonthFromDate : function(strDate: string): number {
        return dayjs(strDate, "YYYYMMDD", true).daysInMonth();
    },
    /**
     * yyyyMMdd 형식의 String 타입에 해당하는 월의 마지막 일자를 yyyyMMdd 형식으로 반환
     * - Java 와 다르게 인자가 달라도 함수명은 구분해야 함
     * @param {string} strDate 
     * @returns 
     */
    getEndOfMonthStringFromDate: function(strDate: string): string {
        const daysInMonth = dayjs(strDate, "YYYYMMDD", true).daysInMonth();
        const lastDay = dayjs(strDate, "YYYYMMDD", true).date(daysInMonth);
        return lastDay.format('YYYYMMDD');
    }
};

/**
 * Unix Timestamp
 */
const UnixTimestamp = {
    /**
     * milliseconds
     * @returns 
     */
    currentMillis : function(): number {
        return dayjs().valueOf();
    },
    /**
     * milliseconds to Date
     * @param {number} mills 
     * @returns 
     */
    millsToDate : function(mills: number): Date {
        return dayjs(mills).toDate();
    },
    /**
     * current Unix Timestamp
     *   - https://www.epochconverter.com/
     * @returns 
     */
    getUnixTimestamp : function(): number {
        return dayjs().unix();
    },
    /**
     * timestamp to Date
     * @param {number} timestamp 
     * @returns 
     */
    timestampToDate : function(timestamp: number): Date {
        return dayjs(timestamp * 1000).toDate();
    }
};

/**
 * Check
 */
/**
 * Check
 */
const Check = {
    /**
     * 해당 날짜가 월의 마지막에 속하는지 체크
     * @param {string} strDate 
     * @returns 
     */
    isLastWeekOfMonth : function(strDate: string): boolean {
        const date = dayjs(strDate, "YYYYMMDD", true);
        if ( !date.isValid() ) return false;

        const startOfLastWeek = date.endOf('month').startOf('week');
        return date.isSameOrAfter(startOfLastWeek, 'day');
    },
    /**
     * 해당 날짜가 월의 첫째주에 속하는지 체크
     * @param {string} strDate 
     * @returns 
     */
    isFistWeekOfMonth : function(strDate: string): boolean {
        const date = dayjs(strDate, "YYYYMMDD", true);
        if ( !date.isValid() ) return false;

        const endOfFirstWeek = date.startOf('month').endOf('week');
        return date.isSameOrBefore(endOfFirstWeek, 'day');
    }
};

/**
 * 날짜 설정
 * - 이후 다음 함수를 사용하여 String 타입으로 변환
 * - Convert.getDateToString(date), Convert.getDateToStringFormat(date, dateFormat)
 */
const SetDate = {
    /**
     * 연, 월, 일로 Date 객체 구하기
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @returns 
     */
    getDateByYearMonthDay : function(year: number, month: number, day: number): Date {
        const momentObj = dayjs().year(year).month(month).date(day);
        return momentObj.toDate();
    },
    /**
     * 연, 월, 일, 시로 Date 객체 구하기
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @param {number} hour 
     * @returns 
     */
    getDateByYearMonthDayHour : function(year: number, month: number, day: number, hour: number): Date {
        const momentObj = dayjs().year(year).month(month).date(day).hour(hour);
        return momentObj.toDate();
    },
    /**
     * 연, 월, 일, 시, 분으로 Date 객체 구하기
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @param {number} hour 
     * @param {number} minute 
     * @returns 
     */
    getDateByYearMonthDayHourMinute : function(year: number, month: number, day: number, hour: number, minute: number): Date {
        const momentObj = dayjs().year(year).month(month).date(day).hour(hour).minute(minute);
        return momentObj.toDate();
    },
    /**
     * 연, 월, 일, 시, 분, 초로 Date 객체 구하기
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @param {number} hour 
     * @param {number} minute 
     * @param {number} second 
     * @returns 
     */
    getDateByYearMonthDayHourMinuteSecond : function(year: number, month: number, day: number, hour: number, minute: number, second: number): Date {
        const momentObj = dayjs().year(year).month(month).date(day).hour(hour).minute(minute).second(second);
        return momentObj.toDate();
    }
};

export {Today, StringFormat, Convert, CalcDate, CalcTime, GetDateInterval, GetTimeInterval, GetDayOfWeek, GetDayOfMonth, UnixTimestamp, Check, SetDate}