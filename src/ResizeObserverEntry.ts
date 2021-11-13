import { createReadOnlyRect, IRect } from './utils/geometry.js';
import defineConfigurable from './utils/defineConfigurable.js';
import { IDOMRectReadOnly, IResizeObserverEntry } from '~/types/index.js';

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
