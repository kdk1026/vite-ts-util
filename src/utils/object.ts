/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

/**
 * 객체나 배열을 얕은 복사
 * - target 에 복사 및 병합
 * @param {object} source 
 * @param {undefined|null|object} target 
 * @returns 
 */
export const shallowCopy = (source: object, target?: object | null): object => {
    if ( !target ) {
        return { ...source };
    }

    return Object.assign(target, source);
};

/**
 * 객체나 배열을 얕은 복사하여 새로운 객체 생성
 * - key가 중복될 경우, 가장 마지막에 쓴 값이 이전 값을 덮어씀
 * - 전통적인 방식과 동일
 *      Object.assign({}, source, target);
 * @param {object} source 
 * @param {undefined|null|object} source2 
 * @returns 
 */
export const shallowClone = (source: object, source2?: object | null): object => {
    return {...source, ...source2};
};

/**
 * 객체나 배열을 깊은 복사
 * - 전통적인 방식의 단점을 개선
 * - 전통적인 방식의 단점 : 객체 내부에 함수(Function), Symbol, undefined가 
 *      포함되어 있으면 복사되지 않고 누락되며 성능도 느림
 *      JSON.parse(JSON.stringify(original));
 * @param {object} source 
 */
export const deepCopy = <T>(source: T): T => {
    return structuredClone(source);
};

/**
 * 두 객체를 병합
 * - source 객체의 속성을 target 객체에 깊게 병합
 * - target 객체의 내부를 비움
 * @param {object} source
 * @param {Record<keyof any, any>} target 
 * @returns 
 */
export const deepClone = (source: object, target: Record<keyof any, any>): object => {
    for ( const key in target ) {
        if ( Object.hasOwn(target, key) ) {
            delete (target as any)[key];
        }
    }

    const clonedSource = structuredClone(source);
    Object.assign(target, clonedSource);

    return target;
};

/**
 * 두 객체를 병합
 * - source 객체의 속성을 target 객체에 깊게 병합
 * - target 객체의 내부 유지
 * @param {Record<keyof any, any>} source
 * @param {Record<keyof any, any>} target 
 * @returns 
 */
export const deepCloneKeeping = (source: Record<keyof any, any>, target: Record<keyof any, any>): object => {
    for ( const key in source ) {
        if ( Object.hasOwn(source, key) ) {
            if ( typeof source[key] === 'object' && source[key] !== null ) {
                // source[key]가 객체인 경우, 재귀적으로 깊은 복사 진행
                if ( !target[key] || typeof target[key] !== 'object' ) {
                    // target에 해당 키가 없거나 객체가 아니라면 새 객체/배열 생성
                    target[key] = Array.isArray(source[key]) ? [] : {};
                }
                deepCloneKeeping(source[key], target[key]);
            } else {
                target[key] = source[key];
            }
        }
    }

    return target;
};