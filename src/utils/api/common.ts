/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2026.10.16
 * @version 1.0
 */

/**
 * 서버의 현재 날짜와 시간을 가져오는 함수
 * @returns {Promise<object>}
 * @example
 * getServerTime().then((data) => {
 *   console.log(data);
 * });
 */
export const getServerTime = async (): Promise<object> => {
    // API URL을 설정
    const apiUrl = '';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('서버 시간을 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        return {};
    }
};

/*
    // 인터셉터 사용을 위해 axios를 사용하는 서비스

    //- 현재 로그인한 사용자의 프로필 정보를 가져오는 함수
    getUserProfile(accessToken)

    //- Access Token 만료 시, 재발급하는 함수
    refreshToken()

    //- 공통 코드 목록을 조회하는 함수
    getCommonCodes(groupCode)

    //- 공통 코드를 조회하는 함수
    getCommonCode(groupCode, code)

    //- 전역 설정값을 가져오는 함수
    getAppConfig()
*/