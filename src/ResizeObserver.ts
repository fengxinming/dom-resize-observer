import ResizeObserverSPI from './ResizeObserverSPI';
import IResizeObserver, { IResizeObserverCallback, IResizeObserverEntry } from './typings';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ResizeObserverImpl implements IResizeObserver {
  private readonly observer_: ResizeObserverSPI;

  constructor(callback: IResizeObserverCallback) {
    if (!(this instanceof ResizeObserverImpl)) {
      throw new TypeError('Cannot call a class as a function.');
    }
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    }

    this.observer_ = new ResizeObserverSPI((entries: IResizeObserverEntry[]) => {
      callback.call(this, entries, this);
    });
  }
  observe(target: Element): void {
    return this.observer_.observe(target);
  }
  unobserve(target: Element): void {
    return this.observer_.unobserve(target);
  }
  disconnect(): void {
    return this.observer_.disconnect();
  }
}

export default ResizeObserverImpl;
