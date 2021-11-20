(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DomResizeObserver = factory());
})(this, (function () { 'use strict';

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */
  var ref = Object.prototype;
  var hasOwnProperty = ref.hasOwnProperty;

  function checkOwnProperty(object, key) {
    // eslint-disable-next-line no-prototype-builtins
    return object.hasOwnProperty(key);
  }

  function checkOwnProperty2(object, key) {
    return hasOwnProperty.call(object, key);
  }

  function createHasOwn(object) {
    return object.hasOwnProperty ? checkOwnProperty : checkOwnProperty2;
  }

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function _forOwn(object, iterator) {
    var hasOwn = createHasOwn(object);
    var ret = false;

    for (var key in object) {
      if (hasOwn(object, key)) {
        ret = true;
        if (iterator(object[key], key, object) === false) {
          break;
        }
      }
    }

    return ret;
  }

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  /**
   * 遍历object可中途打断
   *
   * @param {object} object
   * @param {function} iterator
   * @returns 是否遍历过
   */
  function forOwn(object, iterator) {
    if (object == null) {
      return false;
    }

    return _forOwn(object, iterator);
  }


  forOwn.each = _forOwn;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */
  function isFunction (value) {
    return typeof value === 'function';
  }

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */
  function isNumber(value) {
    // eslint-disable-next-line no-self-compare
    return typeof value === 'number' && value === value;
  }

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function isArrayLike(value) {
    return !!value && isNumber(value.length) && !isFunction(value);
  }

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */
  function _forEach(value, start, end, iterator) {
    var ret = start < end;
    for (; start < end; start++) {
      if (iterator(value[start], start, value) === false) {
        break;
      }
    }

    return ret;
  }

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */
  function _forNumber(value, start, end, iterator) {
    var ret = start <= end;
    for (var i = 0; start <= end; i++, start++) {
      if (iterator(start, i, value) === false) {
        break;
      }
    }

    return ret;
  }

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */
  var max = Math.max;
  var min$1 = Math.min;

  function transIndex(fromIndex, length) {
    return fromIndex
      ? fromIndex < 0
        ? max(0, length + fromIndex)
        : min$1(fromIndex, length - 1)
      : 0;
  }

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var min = Math.min;
  function forEach(value, start, end, iterator) {
    if (isArrayLike(value)) {
      var len = value.length;
      if (isFunction(start)) {
        return _forEach(value, 0, len, start);
      }
      if (isFunction(end)) {
        return _forEach(value, isNumber(start) ? transIndex(start, len) : 0, len, end);
      }
      if (isFunction(iterator)) {
        return _forEach(
          value,
          isNumber(start) ? transIndex(start, len) : 0,
          isNumber(end) ? min(end, len) : len,
          iterator
        );
      }
    }
    else if (isNumber(value)) {
      if (isFunction(start)) {
        return _forNumber(value, 1, value, start);
      }
      if (isFunction(end)) {
        return _forNumber(value, isNumber(start) ? start : 1, value, end);
      }
      if (isFunction(iterator)) {
        return _forNumber(value, isNumber(start) ? start : 1, isNumber(end) ? min(end, value) : value, iterator);
      }
    }

    return false;
  }


  forEach.each = _forEach;
  forEach.loop = _forNumber;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */
  function isUndefined (value) {
    return typeof value === 'undefined';
  }

  function findIndex(arr, key) {
      var result = -1;
      forEach(arr, function (entry, index) {
          if (entry[0] === key) {
              result = index;
              return false;
          }
      });
      return result;
  }
  var MapShim = /** @class */ (function () {
      function MapShim() {
          this.entries_ = [];
      }
      Object.defineProperty(MapShim.prototype, "size", {
          get: function () {
              return this.entries_.length;
          },
          enumerable: false,
          configurable: true
      });
      MapShim.prototype.clear = function () {
          this.entries_.splice(0);
      };
      MapShim.prototype.delete = function (key) {
          var entries_ = this.entries_;
          var index = findIndex(entries_, key);
          if (~index) {
              return !!entries_.splice(index, 1)[0];
          }
          return false;
      };
      MapShim.prototype.forEach = function (callbackfn, thisArg) {
          var _this = this;
          var entries_ = this.entries_;
          forEach(entries_, function (entry) {
              if (thisArg) {
                  callbackfn.call(thisArg, entry[1], entry[0], _this);
              }
              else {
                  callbackfn(entry[1], entry[0], _this);
              }
          });
      };
      MapShim.prototype.get = function (key) {
          var entries_ = this.entries_;
          var index = findIndex(entries_, key);
          var entry = entries_[index];
          return entry && entry[1];
      };
      MapShim.prototype.has = function (key) {
          return !!~findIndex(this.entries_, key);
      };
      MapShim.prototype.set = function (key, value) {
          var entries_ = this.entries_;
          var index = findIndex(entries_, key);
          if (~index) {
              entries_[index][1] = value;
          }
          else {
              entries_.push([key, value]);
          }
          return this;
      };
      return MapShim;
  }());
  var Map$1 = !isUndefined(Map)
      ? Map
      : MapShim;

  var defineConfigurable = (function (target, props) {
      forOwn(props, function (val, key) {
          Object.defineProperty(target, key, {
              value: val,
              enumerable: false,
              writable: false,
              configurable: true
          });
      });
      return target;
  });

  /**
   * 返回正确的 global
   */
  var global$1 = (function () {
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

  function getWindowOf(target) {
      var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
      return ownerGlobal || global$1;
  }

  var isBrowser = !isUndefined(window) && !isUndefined(document) && window.document === document;

  function createRectInit(x, y, width, height) {
      return { x: x, y: y, width: width, height: height };
  }
  function isDocumentElement(target) {
      return target === getWindowOf(target).document.documentElement;
  }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  var emptyRect = createRectInit(0, 0, 0, 0);
  function toFloat(value) {
      return parseFloat(value) || 0;
  }
  function getBordersSize(styles) {
      var positions = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          positions[_i - 1] = arguments[_i];
      }
      return positions.reduce(function (size, position) {
          var value = styles["border-" + position + "-width"];
          return size + toFloat(value);
      }, 0);
  }
  function getPaddings(styles) {
      var positions = ['top', 'right', 'bottom', 'left'];
      var paddings = {};
      for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
          var position = positions_1[_i];
          var value = styles["padding-" + position];
          paddings[position] = toFloat(value);
      }
      return paddings;
  }
  function getSVGContentRect(target) {
      var bbox = target.getBBox();
      return createRectInit(0, 0, bbox.width, bbox.height);
  }
  function getHTMLElementContentRect(target) {
      var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
      if (!clientWidth && !clientHeight) {
          return emptyRect;
      }
      var styles = getWindowOf(target).getComputedStyle(target);
      var paddings = getPaddings(styles);
      var horizPad = paddings.left + paddings.right;
      var vertPad = paddings.top + paddings.bottom;
      var width = toFloat(styles.width);
      var height = toFloat(styles.height);
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
          var vertScrollbar = Math.round(width + horizPad) - clientWidth;
          var horizScrollbar = Math.round(height + vertPad) - clientHeight;
          if (Math.abs(vertScrollbar) !== 1) {
              width -= vertScrollbar;
          }
          if (Math.abs(horizScrollbar) !== 1) {
              height -= horizScrollbar;
          }
      }
      return createRectInit(paddings.left, paddings.top, width, height);
  }
  var isSVGGraphicsElement = (function () {
      if (!isUndefined(SVGGraphicsElement)) {
          return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
      }
      return function (target) { return (target instanceof getWindowOf(target).SVGElement
          && isFunction(target)); };
  })();
  function getContentRect(target) {
      if (!isBrowser) {
          return emptyRect;
      }
      if (isSVGGraphicsElement(target)) {
          return getSVGContentRect(target);
      }
      return getHTMLElementContentRect(target);
  }
  function createReadOnlyRect(_a) {
      var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
      var Constr = !isUndefined(DOMRectReadOnly) ? DOMRectReadOnly : Object;
      var rect = Object.create(Constr.prototype);
      defineConfigurable(rect, {
          x: x,
          y: y,
          width: width,
          height: height,
          top: y,
          right: x + width,
          bottom: height + y,
          left: x
      });
      return rect;
  }

  var ResizeObservation = /** @class */ (function () {
      function ResizeObservation(target) {
          /**
           * 变化后的宽度
           */
          this.broadcastWidth = 0;
          /**
           * 变化后的高度
           */
          this.broadcastHeight = 0;
          /**
           * 坐标和宽高
           */
          this.contentRect_ = createRectInit(0, 0, 0, 0);
          this.target = target;
      }
      /**
       * 宽高是否变化
       */
      ResizeObservation.prototype.isActive = function () {
          var rect = getContentRect(this.target);
          this.contentRect_ = rect;
          return (rect.width !== this.broadcastWidth
              || rect.height !== this.broadcastHeight);
      };
      /**
       * 改变后的宽高和坐标
       */
      ResizeObservation.prototype.broadcastRect = function () {
          var rect = this.contentRect_;
          this.broadcastWidth = rect.width;
          this.broadcastHeight = rect.height;
          return rect;
      };
      return ResizeObservation;
  }());

  var raf = isFunction(requestAnimationFrame)
      ? requestAnimationFrame.bind(global$1)
      : function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };

  // 节流时间毫秒
  var trailingTimeout = 2;
  function throttle (callback, delay) {
      var leadingCall = false;
      var trailingCall = false;
      var lastCallTime = 0;
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
          var timeStamp = Date.now();
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

  var REFRESH_DELAY = 20;
  var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
  var mutationObserverSupported = !isUndefined(MutationObserver);
  var ResizeObserverController = /** @class */ (function () {
      function ResizeObserverController() {
          /**
           * 是否已添加DOM监听
           *
           * @private {boolean}
           */
          this.connected_ = false;
          /**
           * 是否已订阅 mutation 事件
           */
          this.mutationEventsAdded_ = false;
          /**
           * mutationsObserver 实例
           */
          this.mutationsObserver_ = null;
          /**
           * 观察者集合
           */
          this.observers_ = [];
          this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
          this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
      }
      /**
       * 添加观察者
       */
      ResizeObserverController.prototype.addObserver = function (observer) {
          if (!~this.observers_.indexOf(observer)) {
              this.observers_.push(observer);
          }
          // 开始监听 el 变化
          if (!this.connected_) {
              this.connect_();
          }
      };
      /**
       * 移除观察者
       */
      ResizeObserverController.prototype.removeObserver = function (observer) {
          var observers = this.observers_;
          var index = observers.indexOf(observer);
          if (~index) {
              observers.splice(index, 1);
          }
          if (!observers.length && this.connected_) {
              this.disconnect_();
          }
      };
      /**
       * 更新 observer 并通知触发回调
       */
      ResizeObserverController.prototype.refresh = function () {
          var activeObservers = this.observers_.filter(function (observer) {
              return observer.gatherActive();
          });
          activeObservers.forEach(function (observer) {
              observer.broadcastActive();
          });
          if (activeObservers.length > 0) {
              this.refresh();
          }
      };
      /**
       * 初始化 DOM 监听
       */
      ResizeObserverController.prototype.connect_ = function () {
          if (!isBrowser || this.connected_) {
              return;
          }
          // css transition 事件结束后触发
          document.addEventListener('transitionend', this.onTransitionEnd_);
          window.addEventListener('resize', this.refresh);
          if (mutationObserverSupported) {
              this.mutationsObserver_ = new MutationObserver(this.refresh);
              this.mutationsObserver_.observe(document, {
                  attributes: true,
                  childList: true,
                  characterData: true,
                  subtree: true
              });
          }
          else {
              // DOM 子元素修改时触发
              document.addEventListener('DOMSubtreeModified', this.refresh);
              this.mutationEventsAdded_ = true;
          }
          this.connected_ = true;
      };
      /**
       * 移除 DOM 监听
       */
      ResizeObserverController.prototype.disconnect_ = function () {
          if (!isBrowser || !this.connected_) {
              return;
          }
          document.removeEventListener('transitionend', this.onTransitionEnd_);
          window.removeEventListener('resize', this.refresh);
          if (this.mutationsObserver_) {
              this.mutationsObserver_.disconnect();
          }
          else if (this.mutationEventsAdded_) {
              document.removeEventListener('DOMSubtreeModified', this.refresh);
          }
          this.mutationsObserver_ = null;
          this.mutationEventsAdded_ = false;
          this.connected_ = false;
      };
      /**
       * "Transitionend" 事件处理
       */
      ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
          var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
          var isReflowProperty = transitionKeys.some(function (key) {
              return !!~propertyName.indexOf(key);
          });
          if (isReflowProperty) {
              this.refresh();
          }
      };
      return ResizeObserverController;
  }());

  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  var ResizeObserverEntryImpl = /** @class */ (function () {
      function ResizeObserverEntryImpl(target, rectInit) {
          defineConfigurable(this, {
              target: target,
              contentRect: createReadOnlyRect(rectInit)
          });
      }
      return ResizeObserverEntryImpl;
  }());

  var ResizeObserverSPI = /** @class */ (function () {
      function ResizeObserverSPI(callback) {
          /**
           * 已变化的观察结果
           */
          this.activeObservations_ = [];
          /**
           * 观察结果
           */
          this.observations_ = new Map$1();
          if (!isFunction(callback)) {
              throw new TypeError('The callback provided as parameter 1 is not a function.');
          }
          this.callback_ = callback;
          this.controller_ = new ResizeObserverController();
      }
      /**
       * 开始监听 target
       */
      ResizeObserverSPI.prototype.observe = function (target) {
          if (!this.checkTarget_(target, arguments.length)) {
              return;
          }
          var observations = this.observations_;
          observations.set(target, new ResizeObservation(target));
          this.controller_.addObserver(this);
          this.controller_.refresh();
      };
      /**
       * 停止监听 target
       */
      ResizeObserverSPI.prototype.unobserve = function (target) {
          if (!this.checkTarget_(target, arguments.length)) {
              return;
          }
          var observations = this.observations_;
          observations.delete(target);
          if (!observations.size) {
              this.controller_.removeObserver(this);
          }
      };
      /**
       * 停止所有的监听
       */
      ResizeObserverSPI.prototype.disconnect = function () {
          this.clearActive();
          this.observations_.clear();
          this.controller_.removeObserver(this);
      };
      /**
       * 收集已改变的监听实例
       */
      ResizeObserverSPI.prototype.gatherActive = function () {
          this.clearActive();
          var activeObservations = this.activeObservations_;
          this.observations_.forEach(function (observation) {
              if (observation.isActive()) {
                  activeObservations.push(observation);
              }
          });
          return activeObservations.length > 0;
      };
      /**
       * 触发回调
       */
      ResizeObserverSPI.prototype.broadcastActive = function () {
          if (!this.hasActive()) {
              return;
          }
          this.callback_(this.activeObservations_.map(function (observation) {
              return new ResizeObserverEntryImpl(observation.target, observation.broadcastRect());
          }));
          this.clearActive();
      };
      /**
       * 清空已改变的监听实例
       */
      ResizeObserverSPI.prototype.clearActive = function () {
          this.activeObservations_.splice(0);
      };
      /**
       * 是否还有已改变的实例
       */
      ResizeObserverSPI.prototype.hasActive = function () {
          return this.activeObservations_.length > 0;
      };
      /**
       * 检查target
       */
      ResizeObserverSPI.prototype.checkTarget_ = function (target, argsLength) {
          if (!argsLength) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          if (isUndefined(Element) || !(Element instanceof Object)) {
              return false;
          }
          if (!(target instanceof getWindowOf(target).Element)) {
              throw new TypeError('parameter 1 is not of type "Element".');
          }
          if (this.observations_.has(target)) {
              return false;
          }
          return true;
      };
      return ResizeObserverSPI;
  }());

  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  var ResizeObserverImpl = /** @class */ (function () {
      function ResizeObserverImpl(callback) {
          var _this = this;
          if (!(this instanceof ResizeObserverImpl)) {
              throw new TypeError('Cannot call a class as a function.');
          }
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          this.observer_ = new ResizeObserverSPI(function (entries) {
              callback.call(_this, entries, _this);
          });
      }
      ResizeObserverImpl.prototype.observe = function (target) {
          return this.observer_.observe(target);
      };
      ResizeObserverImpl.prototype.unobserve = function (target) {
          return this.observer_.unobserve(target);
      };
      ResizeObserverImpl.prototype.disconnect = function () {
          return this.observer_.disconnect();
      };
      return ResizeObserverImpl;
  }());

  // 全局 ResizeObserver 存在就直接返回
  var NativeResizeObserver = global$1.ResizeObserver;
  var index = !isUndefined(NativeResizeObserver)
      ? NativeResizeObserver
      : ResizeObserverImpl;

  return index;

}));
