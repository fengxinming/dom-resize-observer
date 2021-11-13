import { isUndefined } from 'celia';

/**
 * 返回正确的 global
 */
export default (() => {
  if (!isUndefined(window) && window.Math === Math) {
    return window;
  }

  if (!isUndefined(global) && global.Math === Math) {
    return global;
  }

  if (!isUndefined(self) && self.Math === Math) {
    return self;
  }

  return Function('return this')();
})();
