declare global {
    interface Window {
        daum: any;
    }
}

interface PostcodeData {
    zonecode: string;
    roadAddress: string;
    jibunAddress: string;
}

/**
 * 다음 주소 API
 * @returns
 * @example
 * const result = await openDaumPostcode();
 */
export const openDaumPostcode = (): Promise<PostcodeData> => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        new window.daum.Postcode({
            oncomplete: function(data: any) {
                resolve({
                    zonecode: data.zonecode,
                    roadAddress: data.roadAddress,
                    jibunAddress: data.jibunAddress,
                });
            }
        }).open();
    });
}