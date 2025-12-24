/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.12.24
 * @version 1.0
 */

interface MyData {
    id: number;
    data: any;
}

const database: string = 'myDatabase';
const objectStoreName: string = 'myObjectStore';

const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        // IndexedDB 열기/생성
        const request: IDBOpenDBRequest = indexedDB.open(database, 1);

        // 데이터베이스 버전 업데이트 시 실행
        request.onupgradeneeded = function(event: IDBVersionChangeEvent) {
            const db = (event.target as IDBOpenDBRequest).result;
            if ( !db.objectStoreNames.contains(objectStoreName) ) {
                db.createObjectStore(objectStoreName, { keyPath: "id" });
            }
        };

        // 데이터베이스 열기 성공 시 실행
        request.onsuccess = function(event: Event) {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        // 데이터베이스 열기 실패 시 실행
        request.onerror = function(event: Event) {
            const error = (event.target as IDBOpenDBRequest).error;
            reject(new Error(error?.message || "데이터베이스를 여는 중 알 수 없는 오류가 발생했습니다."));
        };
    });
};

export const addDbData = async (data: any): Promise<void> => {
    if (!data) {
        console.log("데이터가 제공되지 않았습니다.");
        return;
    }

    try {
        const db = await openDatabase();
        const transaction = db.transaction([objectStoreName], "readwrite");
        const objectStore = transaction.objectStore(objectStoreName);

        const request = objectStore.put({ id: 1, data: data });

        request.onsuccess = () => {
            console.log("데이터가 성공적으로 추가/업데이트되었습니다.");
        };

        request.onerror = (event: Event) => {
            console.log("데이터 추가 실패:", (event.target as IDBRequest).error);
        };
    } catch (error) {
        console.log("데이터베이스 열기 실패:", error);
    }
};

export const getDbData = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        openDatabase()
            .then(db => {
                const transaction = db.transaction([objectStoreName], "readonly");
                const objectStore = transaction.objectStore(objectStoreName);
                const request = objectStore.get(1);

                request.onsuccess = function(event: Event) {
                    const result = (event.target as IDBRequest<MyData>).result;
                    resolve(result ? result.data : "");
                };

                request.onerror = function(event: Event) {
                    console.log("데이터 가져오기 실패:", (event.target as IDBRequest).error);
                    resolve("");
                };
            })
            .catch(error => {
                console.log("데이터베이스 열기 실패:", error);
                reject(error);
            });
    });
};

export const removeDbData = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        openDatabase()
            .then(db => {
                const transaction = db.transaction([objectStoreName], "readwrite");
                const objectStore = transaction.objectStore(objectStoreName);
                const request = objectStore.clear();
    
                request.onsuccess = function() {
                    console.log("IndexedDB 데이터가 성공적으로 삭제되었습니다.");
                    resolve(true);
                };
    
                request.onerror = function(event: Event) {
                    console.log("IndexedDB 데이터 삭제 실패:", (event.target as IDBRequest).error);
                    resolve(false);
                };
            })
            .catch(error => {
                console.log("데이터베이스 열기 실패:", error);
                reject(error);
            });
    });
};

export const removeDatabase = (): void => {
    let deleteRequest: IDBOpenDBRequest = indexedDB.deleteDatabase(database);

    deleteRequest.onsuccess = function() {
        console.log("데이터베이스가 성공적으로 삭제되었습니다.");
    };

    deleteRequest.onerror = function(event: Event) {
        console.log("데이터베이스 삭제 실패:", (event.target as IDBOpenDBRequest).error);
    };

    deleteRequest.onblocked = function() {
        console.log("데이터베이스 삭제가 블록되었습니다. 모든 연결을 닫아야 합니다.");
    };
};
