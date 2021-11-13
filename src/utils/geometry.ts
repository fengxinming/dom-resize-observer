import { isUndefined, isFunction } from 'celia';
import { IDOMRectReadOnly } from '~/types/index.js';
import defineConfigurable from './defineConfigurable.js';
import getWindowOf from './getWindowOf.js';
import { isBrowser } from './isBrowser.js';

interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IPosition {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

function createRectInit(
  x: number,
  y: number,
  width: number,
  height: number
): IRect {
  return { x, y, width, height };
}

function isDocumentElement(target: Element) {
  return target === getWindowOf(target).document.documentElement;
}

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const emptyRect = createRectInit(0, 0, 0, 0);

function toFloat(value: any): number {
  return parseFloat(value) || 0;
}

function getBordersSize(styles: any, ...positions: string[]): number {
  return positions.reduce((size, position) => {
    const value = styles[`border-${position}-width`];

    return size + toFloat(value);
  }, 0);
}

function getPaddings(styles: any): IPosition {
  const positions = ['top', 'right', 'bottom', 'left'];
  const paddings = {} as any;

  for (const position of positions) {
    const value = styles[`padding-${position}`];
    paddings[position] = toFloat(value);
  }

  return paddings as IPosition;
}

function getSVGContentRect(target: SVGGraphicsElement): IRect {
  const bbox = target.getBBox();

  return createRectInit(0, 0, bbox.width, bbox.height);
}

function getHTMLElementContentRect(target: Element) {
  const { clientWidth, clientHeight } = target;

  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }

  const styles = getWindowOf(target).getComputedStyle(target);
  const paddings = getPaddings(styles);
  const horizPad = paddings.left + paddings.right;
  const vertPad = paddings.top + paddings.bottom;

  let width = toFloat(styles.width);
  let height = toFloat(styles.height);

  if (styles.boxSizing === 'border-box') {
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, 'left', 'right') + horizPad;
    }

    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
    }
  }

  // 是 element 元素才处理
  if (!isDocumentElement(target)) {
    // 在一些浏览器上，宽高包含滚动条的宽度
    const vertScrollbar = Math.round(width + horizPad) - clientWidth;
    const horizScrollbar = Math.round(height + vertPad) - clientHeight;

    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }

    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }

  return createRectInit(paddings.left, paddings.top, width, height);
}

const isSVGGraphicsElement = (() => {
  if (!isUndefined(SVGGraphicsElement)) {
    return (target: any) => target instanceof getWindowOf(target).SVGGraphicsElement;
  }

  return (target: Element) => (
    target instanceof getWindowOf(target).SVGElement
        && isFunction(target as any['getBBox'])
  );
})();

function getContentRect(target: Element) {
  if (!isBrowser) {
    return emptyRect;
  }

  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target as SVGGraphicsElement);
  }

  return getHTMLElementContentRect(target);
}

function createReadOnlyRect({ x, y, width, height }: IRect): DOMRectReadOnly | IDOMRectReadOnly {
  const Constr = !isUndefined(DOMRectReadOnly) ? DOMRectReadOnly : Object;
  const rect = Object.create(Constr.prototype);

  defineConfigurable(rect, {
    x, y, width, height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  });

  return rect;
}

export {
  IRect, createRectInit, getContentRect, createReadOnlyRect
};
