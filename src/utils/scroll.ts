/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2026.09.01
 * @version 1.0
 */

/**
 * 특정 좌표로 스크롤 이동
 * @param {number} topPosition
 */
export const scrollTo = (topPosition: number) => {
    setTimeout(() => {
        window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
        });
    }, 500);
};

/**
 * 특정 HTML 요소 위치로 스크롤 이동
 * @param {HTMLElement} targetElement
 * @returns 
 */
export const scrollToTarget = (targetElement: HTMLElement) => {
    setTimeout(() => {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }, 500);
};


/**
 * 스크롤 페이징 처리
 * @param {null|HTMLElement} targetElement 
 * * @param {object} param
 * @param {number} param.page
 * @param {number} param.countPerPage
 * @param {boolean} param.isEnd
 * @param {Function} targetFunction 
 * @returns
 * @example
 * document.addEventListener('DOMContentLoaded', () => {
 *  scrollPaging(document.querySelector('.observer_target'), param, fetchMoreData);
 * });
 * 
 * function fetchMoreData() {
 *  try {
 *      if (param.isEnd) return;
 *      
 *      const response = await fetch(`/api/items?page=${page}&size=${countPerPage}`);
 *      const data = await response.json();
 * 
 *      if (data.length < countPerPage) {
 *          param.isEnd = true;
 *      }
 * 
 *      renderItems(data);
 *      param.page ++;
 *  } catch (error) {
 *    console.error(`데이터를 불러오지 못했습니다. ${error}`);
 *  }
 */
export const scrollPaging = (targetElement: null|HTMLElement, param: object, targetFunction: Function) => {
    if ( targetElement === null ) {
        const div = document.createElement('div');
        div.classList.add('observer_target');
        document.body.appendChild(div);
        targetElement = div;
    }

    if ( !('isEnd' in param) || typeof param.isEnd !== 'boolean' ) {
        console.error('`param` must contain a boolean property `isEnd`.');
        return;
    }

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (param.isEnd) {
                observer.unobserve(targetElement);
                return;
            }

            if (entry.isIntersecting) {
                targetFunction();
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: '0px 0px 200px 0px',    // 바닥에 닿기 200px 전에 미리 로드 시작
        threshold: 0.1
    });

    observer.observe(targetElement);

    return observer;
};