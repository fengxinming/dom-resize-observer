import global from './global';

type RAF = (cb: FrameRequestCallback) => number;

const raf: RAF = typeof requestAnimationFrame === 'function'
  ? requestAnimationFrame.bind(global)
  : (callback: FrameRequestCallback) => setTimeout(() => callback(Date.now()), 1000 / 60) as unknown as number;

export default raf;
