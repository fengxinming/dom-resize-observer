import global from '../shims/global';

export interface DefaultView extends Window {
  SVGGraphicsElement: SVGGraphicsElement['constructor'];
  SVGElement: SVGElement['constructor'];
  Element: Element['constructor'];
}

export default function getWindowOf(target: Element): DefaultView {
  const ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
  return ownerGlobal || global;
}
