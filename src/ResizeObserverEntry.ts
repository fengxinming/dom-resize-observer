import { IDOMRectReadOnly, IResizeObserverEntry } from './typings';
import defineConfigurable from './utils/defineConfigurable';
import { createReadOnlyRect, IRect } from './utils/geometry';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ResizeObserverEntryImpl implements IResizeObserverEntry {
  readonly target!: Element;
  readonly contentRect!: DOMRectReadOnly | IDOMRectReadOnly;

  constructor(target: Element, rectInit: IRect) {
    defineConfigurable(this, {
      target,
      contentRect: createReadOnlyRect(rectInit)
    });
  }
}
