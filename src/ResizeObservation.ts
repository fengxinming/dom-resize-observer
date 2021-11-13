import { createRectInit, getContentRect, IRect } from './utils/geometry';

export default class ResizeObservation {
  target: Element;

  /**
   * 变化后的宽度
   */
  broadcastWidth = 0;

  /**
   * 变化后的高度
   */
  broadcastHeight = 0;

  /**
   * 坐标和宽高
   */
  private contentRect_ = createRectInit(0, 0, 0, 0);

  constructor(target: Element) {
    this.target = target;
  }

  /**
   * 宽高是否变化
   */
  isActive(): boolean {
    const rect = getContentRect(this.target);

    this.contentRect_ = rect;

    return (
      rect.width !== this.broadcastWidth
          || rect.height !== this.broadcastHeight
    );
  }

  /**
   * 改变后的宽高和坐标
   */
  broadcastRect(): IRect {
    const rect = this.contentRect_;

    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;

    return rect;
  }
}
