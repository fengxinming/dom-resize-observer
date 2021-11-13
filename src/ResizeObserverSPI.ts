import { isFunction, isUndefined } from 'celia';
import { IResizeObserverEntry, IResizeObserverSPI } from '~/types';
import Map from './shims/Map';
import ResizeObservation from './ResizeObservation';
import ResizeObserverController from './ResizeObserverController';
import ResizeObserverEntry from './ResizeObserverEntry';
import getWindowOf from './utils/getWindowOf';

export type ResizeObserverSPICallback = (entries: IResizeObserverEntry[]) => void;

export default class ResizeObserverSPI implements IResizeObserverSPI {
  /**
   * 已变化的观察结果
   */
  private readonly activeObservations_: ResizeObservation[] = [];

  /**
   * resize 回调
   */
  private readonly callback_: ResizeObserverSPICallback;

  /**
   * ResizeObserverController 实例
   */
  private readonly controller_: ResizeObserverController;

  /**
   * 观察结果
   */
  private readonly observations_ = new Map();

  constructor(callback: ResizeObserverSPICallback) {
    if (!isFunction(callback)) {
      throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = new ResizeObserverController();
  }

  /**
   * 开始监听 target
   */
  observe(target: Element): void {
    if (!this.checkTarget_(target, arguments.length)) {
      return;
    }

    const observations = this.observations_;

    observations.set(target, new ResizeObservation(target));

    this.controller_.addObserver(this);

    this.controller_.refresh();
  }

  /**
   * 停止监听 target
   */
  unobserve(target: Element): void {
    if (!this.checkTarget_(target, arguments.length)) {
      return;
    }

    const observations = this.observations_;
    observations.delete(target);

    if (!observations.size) {
      this.controller_.removeObserver(this);
    }
  }

  /**
   * 停止所有的监听
   */
  disconnect(): void {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
  }

  /**
   * 收集已改变的监听实例
   */
  gatherActive(): boolean {
    this.clearActive();

    const activeObservations = this.activeObservations_;
    this.observations_.forEach((observation) => {
      if (observation.isActive()) {
        activeObservations.push(observation);
      }
    });

    return activeObservations.length > 0;
  }

  /**
   * 触发回调
   */
  broadcastActive(): void {
    if (!this.hasActive()) {
      return;
    }

    this.callback_(this.activeObservations_.map((observation) => {
      return new ResizeObserverEntry(
        observation.target,
        observation.broadcastRect()
      );
    }));
    this.clearActive();
  }

  /**
   * 清空已改变的监听实例
   */
  clearActive(): void {
    this.activeObservations_.splice(0);
  }

  /**
   * 是否还有已改变的实例
   */
  hasActive(): boolean {
    return this.activeObservations_.length > 0;
  }

  /**
   * 检查target
   */
  private checkTarget_(target: Element, argsLength: number): boolean {
    if (!argsLength) {
      throw new TypeError('1 argument required, but only 0 present.');
    }

    if (isUndefined(Element) || !(Element instanceof Object)) {
      return false;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    if (this.observations_.has(target)) {
      return false;
    }

    return true;
  }
}
