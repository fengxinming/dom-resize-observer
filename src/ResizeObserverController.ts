
import { IResizeObserverSPI } from './typings';
import { isBrowser } from './utils/isBrowser';
import throttle from './utils/throttle';

const REFRESH_DELAY = 20;
const transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
const mutationObserverSupported = typeof MutationObserver !== 'undefined';

export default class ResizeObserverController {
  /**
   * 是否已添加DOM监听
   *
   * @private {boolean}
   */
  connected_ = false;

  /**
   * 是否已订阅 mutation 事件
   */
  mutationEventsAdded_ = false;

  /**
   * mutationsObserver 实例
   */
  mutationsObserver_: MutationObserver | null = null;

  /**
   * 观察者集合
   */
  observers_: IResizeObserverSPI[] = [];

  constructor() {
    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
  }

  /**
   * 添加观察者
   */
  addObserver(observer: IResizeObserverSPI): void {
    if (!~this.observers_.indexOf(observer)) {
      this.observers_.push(observer);
    }

    // 开始监听 el 变化
    if (!this.connected_) {
      this.connect_();
    }
  }

  /**
   * 移除观察者
   */
  removeObserver(observer: IResizeObserverSPI) {
    const observers = this.observers_;
    const index = observers.indexOf(observer);

    if (~index) {
      observers.splice(index, 1);
    }

    if (!observers.length && this.connected_) {
      this.disconnect_();
    }
  }

  /**
   * 更新 observer 并通知触发回调
   */
  refresh() {
    const activeObservers = this.observers_.filter((observer) => {
      return observer.gatherActive();
    });

    activeObservers.forEach((observer) => {
      observer.broadcastActive();
    });

    if (activeObservers.length > 0) {
      this.refresh();
    }
  }

  /**
   * 初始化 DOM 监听
   */
  private connect_(): void {
    if (!isBrowser || this.connected_) {
      return;
    }

    // css transition 事件结束后触发
    document.addEventListener('transitionend', this.onTransitionEnd_);

    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
      this.mutationsObserver_ = new MutationObserver(this.refresh);

      this.mutationsObserver_.observe(document, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    }
    else {
      // DOM 子元素修改时触发
      document.addEventListener('DOMSubtreeModified', this.refresh);

      this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
  }

  /**
   * 移除 DOM 监听
   */
  private disconnect_(): void {
    if (!isBrowser || !this.connected_) {
      return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
      this.mutationsObserver_.disconnect();
    }
    else if (this.mutationEventsAdded_) {
      document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
  }

  /**
   * "Transitionend" 事件处理
   */
  private onTransitionEnd_({ propertyName = '' }: TransitionEvent): void {
    const isReflowProperty = transitionKeys.some((key) => {
      return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
      this.refresh();
    }
  }
}
