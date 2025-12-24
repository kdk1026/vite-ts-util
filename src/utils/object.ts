/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

/**
 * 객체나 배열을 얕은 복사
 * - 값 자체가 복사되는 것이 아니라 해당 값을 가리키는 참조 값이 복사
 * @param {object} source 
 * @param {object} target 
 * @returns 
 */
export const shallowCopy = (source: object, target: object = {}): object => {
    return Object.assign(target, source);
};

/**
 * 객체나 배열을 깊은 복사
 * @param {T} source 
 */
export const deepCopy = <T extends Record<string, any>>(source: T): T => {
    const target: any = Array.isArray(source) ? [] : {};

    for (const key in source) {
        if ( Object.hasOwn(source as object, key) ) {
            target[key] = deepCopy((source as any)[key]);
        }
    }

    return target as T;
};

/**
 * 두 객체를 병합
 * - source 객체의 속성을 target 객체에 깊게 병합
 * @param {T} target 
 * @param {S} source
 * @returns 
 */
export const deepMerge = <T extends Record<string, any>, S extends Record<string, any>>(
    target: T,
    source: S
): T & S => {
    const isObject = (obj: any): obj is Record<string, any> => 
        obj !== null && typeof obj === 'object' && !Array.isArray(obj);

    if ( !isObject(target) || !isObject(source) ) {
        console.warn('Target or Source must be an object (excluding null and arrays)');
        return target as T & S;
    }

    const output = { ...target } as T & S;

    for (const key in source) {
        if ( Object.hasOwn(source, key) ) {
            const sourceValue = source[key];
            const targetValue = (output as any)[key];

            if ( isObject(sourceValue) ) {
                (output as any)[key] = deepMerge(
                    isObject(targetValue) ? targetValue : {},
                    sourceValue
                );
            }  else if ( Array.isArray(sourceValue) ) {
                (output as any)[key] = sourceValue.map((item: any) => {
                    if ( isObject(item) ) return deepMerge({}, item);
                    if ( Array.isArray(item) ) return [...item];
                    return item;
                });
            } else {
                (output as any)[key] = sourceValue;
            }
        }
    }
    
    return output;
};