import { forOwn } from 'celia';

export default (target: any, props: any) => {
  forOwn(props, (val: any, key: string) => {
    Object.defineProperty(target, key, {
      value: val,
      enumerable: false,
      writable: false,
      configurable: true
    });
  });
  return target;
};
