/**
 * 返回正确的 global
 */
export default (() => {
  if (typeof window !== 'undefined' && window.Math === Math) {
    return window;
  }

  if (typeof global !== 'undefined' && global.Math === Math) {
    return global;
  }

  if (typeof self !== 'undefined' && self.Math === Math) {
    return self;
  }

  return Function('return this')();
})();
