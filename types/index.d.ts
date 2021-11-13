export interface IDOMRectReadOnly {
  readonly bottom: number;
  readonly height: number;
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly width: number;
  readonly x: number;
  readonly y: number;
  // toJSON(): any;
}

export interface IResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly | IDOMRectReadOnly;
}

export interface IResizeObserverSPI {
  observe(target: Element): void;

  unobserve(target: Element): void;

  disconnect(): void;

  gatherActive(): void;

  broadcastActive(): void;

  clearActive(): void;

  hasActive(): boolean;
}

export type IResizeObserverCallback = (entries: IResizeObserverEntry[], observer: IResizeObserver) => void;

declare class IResizeObserver {
  constructor(callback: IResizeObserverCallback);

  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

export default IResizeObserver;
