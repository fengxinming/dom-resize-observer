
import { isUndefined } from 'celia';
import ResizeObserverPolyfill from './ResizeObserver';
import global from './shims/global';

// 全局 ResizeObserver 存在就直接返回
const NativeResizeObserver = global.ResizeObserver;
export default !isUndefined(NativeResizeObserver)
  ? NativeResizeObserver
  : ResizeObserverPolyfill;
