/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.10.26
 * @version 1.0
 */

type SSEHandler<T = any> = (data: T) => void;
type SSEErrorHandler = (error: Error, rawData?: string) => void;

/**
 * 사용 예시
 * interface MyData { message: string; id: number; }
 * const client = new SSEClient('http://localhost:8080/sse/subscribe?id=user123');
 * client.connect();
 * client.on<MyData>('notification', (data) => {
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

  public connect(): void {
    if (this.eventSource) return;

    this.eventSource = new EventSource(this.url);

    // 기본 'message' 이벤트 처리
    this.eventSource.onmessage = (event: MessageEvent) => {
      this.executeHandler('message', event.data);
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE Connection Error:', error);
    };
  }

  /**
   * 사용자 정의 이벤트 리스너 등록
   * @param eventName 
   * @param handler 
   */
  public on<T = any>(eventName: string, handler: SSEHandler<T>): void {
    this.listeners.set(eventName, handler);

    if (this.eventSource) {
      this.eventSource.addEventListener(eventName, (event: Event) => {
        const messageEvent = event as MessageEvent;
        this.executeHandler(eventName, messageEvent.data);
      });
    }
  }

  private onErrorHandler?: SSEErrorHandler;

  public onError(handler: SSEErrorHandler): void {
    this.onErrorHandler = handler;
  }

  private executeHandler(eventName: string, rawData: any): void {
    const handler = this.listeners.get(eventName);
    if (!handler) return;

    try {
      const parsedData = JSON.parse(rawData);
      handler(parsedData);
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Unknown parsing error');

      if ( this.onErrorHandler ) {
        this.onErrorHandler(error, rawData);
      }
    }
  }

  public close(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
