/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.10.26
 * @version 1.0
 */

type SSEHandler<T = any> = (data: T) => void;

/**
 * 사용 예시
 * const client = new SSEClient('http://localhost:8080/sse/subscribe?id=user123');
 * client.connect();
 * client.on('notification', (data) => {
 *  console.log('notification received:', data);
 * });
 */
export class SSEClient {
  private readonly url: string;
  private eventSource: EventSource | null = null;
  private readonly listeners: Map<string, SSEHandler> = new Map();

  constructor(url: string) {
    this.url = url;
  }

  public connect(): EventSource {
    this.eventSource = new EventSource(this.url);

    // 기본 'message' 이벤트 처리
    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const handler = this.listeners.get("message");
        if ( handler ) {
          handler(data);
        }
      } catch (e) {
        console.error(`Failed to parse SSE data: ${e}`, event.data);
      }
    };

    return this.eventSource;
  }

  // 사용자 정의 이벤트 리스너 등록
  public onn<T = any>(eventName: string, handler: SSEHandler<T>): void {
    if (eventName === "message") {
      this.listeners.set("message", handler);
    }

    if (this.eventSource) {
      this.eventSource.addEventListener(eventName, (event: Event) => {
        const messageEvent = event as MessageEvent;
        try {
          // 데이터 파싱 처리
          const data: T = JSON.parse(messageEvent.data);
          handler(data);
        } catch (e) {
          console.info(`Failed JSON parse: ${e}`);
          // JSON이 아닌 경우 원본 데이터를 T 타입으로 간주하여 전달
          handler(messageEvent.data as unknown as T);
        }
      });
    }
  }

  public close(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
