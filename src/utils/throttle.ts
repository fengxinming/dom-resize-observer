import raf from '../shims/requestAnimationFrame';

type ThrottleCallback = () => void;

// 节流时间毫秒
const trailingTimeout = 2;

export default function (callback: ThrottleCallback, delay: number) {
  let leadingCall = false;
  let trailingCall = false;
  let lastCallTime = 0;
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;

      callback();
    }

    if (trailingCall) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      proxy();
    }
  }

  function timeoutCallback() {
    raf(resolvePending);
  }

  function proxy() {
    const timeStamp = Date.now();

    if (leadingCall) {
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      trailingCall = true;
    }
    else {
      leadingCall = true;
      trailingCall = false;

      setTimeout(timeoutCallback, delay);
    }

    lastCallTime = timeStamp;
  }

  return proxy;
}
