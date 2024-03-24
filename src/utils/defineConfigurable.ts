export default (target: any, props: any) => {
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      Object.defineProperty(target, key, {
        value: props[key],
        enumerable: false,
        writable: false,
        configurable: true
      });
    }
  }
  return target;
};
