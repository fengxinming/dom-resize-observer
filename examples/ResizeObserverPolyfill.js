(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("tslib")) : typeof define === "function" && define.amd ? define(["tslib"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.ResizeObserverPolyfill = factory(global2.tslib));
})(this, function(tslib) {
  "use strict";
  const defineConfigurable = function(target, props) {
    for (var key in props) {
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
  const global$1 = function() {
    if (typeof window !== "undefined" && window.Math === Math) {
      return window;
    }
    if (typeof global !== "undefined" && global.Math === Math) {
      return global;
    }
    if (typeof self !== "undefined" && self.Math === Math) {
      return self;
    }
    return Function("return this")();
  }();
  function getWindowOf(target) {
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    return ownerGlobal || global$1;
  }
  var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
  function createRectInit(x, y, width, height) {
    return { x, y, width, height };
  }
  function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
  }
  var emptyRect = createRectInit(0, 0, 0, 0);
  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function(size, position) {
      var value = styles["border-".concat(position, "-width")];
      return size + toFloat(value);
    }, 0);
  }
  function getPaddings(styles) {
    var e_1, _a;
    var positions = ["top", "right", "bottom", "left"];
    var paddings = {};
    try {
      for (var positions_1 = tslib.__values(positions), positions_1_1 = positions_1.next(); !positions_1_1.done; positions_1_1 = positions_1.next()) {
        var position = positions_1_1.value;
        var value = styles["padding-".concat(position)];
        paddings[position] = toFloat(value);
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (positions_1_1 && !positions_1_1.done && (_a = positions_1.return))
          _a.call(positions_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
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
    if (styles.boxSizing === "border-box") {
      if (Math.round(width + horizPad) !== clientWidth) {
        width -= getBordersSize(styles, "left", "right") + horizPad;
      }
      if (Math.round(height + vertPad) !== clientHeight) {
        height -= getBordersSize(styles, "top", "bottom") + vertPad;
      }
    }
    if (!isDocumentElement(target)) {
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
  var isSVGGraphicsElement = function() {
    if (typeof SVGGraphicsElement !== "undefined") {
      return function(target) {
        return target instanceof getWindowOf(target).SVGGraphicsElement;
      };
    }
    return function(target) {
      return target instanceof getWindowOf(target).SVGElement && typeof target === "function";
    };
  }();
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
    var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    defineConfigurable(rect, {
      x,
      y,
      width,
      height,
      top: y,
      right: x + width,
      bottom: height + y,
      left: x
    });
    return rect;
  }
  var ResizeObservation = (
    /** @class */
    function() {
      function ResizeObservation2(target) {
        this.broadcastWidth = 0;
        this.broadcastHeight = 0;
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
      }
      ResizeObservation2.prototype.isActive = function() {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
      };
      ResizeObservation2.prototype.broadcastRect = function() {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
      };
      return ResizeObservation2;
    }()
  );
  var raf = typeof requestAnimationFrame === "function" ? requestAnimationFrame.bind(global$1) : function(callback) {
    return setTimeout(function() {
      return callback(Date.now());
    }, 1e3 / 60);
  };
  var trailingTimeout = 2;
  function throttle(callback, delay) {
    var leadingCall = false;
    var trailingCall = false;
    var lastCallTime = 0;
    function resolvePending() {
      if (leadingCall) {
        leadingCall = false;
        callback();
      }
      if (trailingCall) {
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
      } else {
        leadingCall = true;
        trailingCall = false;
        setTimeout(timeoutCallback, delay);
      }
      lastCallTime = timeStamp;
    }
    return proxy;
  }
  var REFRESH_DELAY = 20;
  var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
  var mutationObserverSupported = typeof MutationObserver !== "undefined";
  var ResizeObserverController = (
    /** @class */
    function() {
      function ResizeObserverController2() {
        this.connected_ = false;
        this.mutationEventsAdded_ = false;
        this.mutationsObserver_ = null;
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
      }
      ResizeObserverController2.prototype.addObserver = function(observer) {
        if (!~this.observers_.indexOf(observer)) {
          this.observers_.push(observer);
        }
        if (!this.connected_) {
          this.connect_();
        }
      };
      ResizeObserverController2.prototype.removeObserver = function(observer) {
        var observers = this.observers_;
        var index2 = observers.indexOf(observer);
        if (~index2) {
          observers.splice(index2, 1);
        }
        if (!observers.length && this.connected_) {
          this.disconnect_();
        }
      };
      ResizeObserverController2.prototype.refresh = function() {
        var activeObservers = this.observers_.filter(function(observer) {
          return observer.gatherActive();
        });
        activeObservers.forEach(function(observer) {
          observer.broadcastActive();
        });
        if (activeObservers.length > 0) {
          this.refresh();
        }
      };
      ResizeObserverController2.prototype.connect_ = function() {
        if (!isBrowser || this.connected_) {
          return;
        }
        document.addEventListener("transitionend", this.onTransitionEnd_);
        window.addEventListener("resize", this.refresh);
        if (mutationObserverSupported) {
          this.mutationsObserver_ = new MutationObserver(this.refresh);
          this.mutationsObserver_.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          });
        } else {
          document.addEventListener("DOMSubtreeModified", this.refresh);
          this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
      };
      ResizeObserverController2.prototype.disconnect_ = function() {
        if (!isBrowser || !this.connected_) {
          return;
        }
        document.removeEventListener("transitionend", this.onTransitionEnd_);
        window.removeEventListener("resize", this.refresh);
        if (this.mutationsObserver_) {
          this.mutationsObserver_.disconnect();
        } else if (this.mutationEventsAdded_) {
          document.removeEventListener("DOMSubtreeModified", this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
      };
      ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
        var isReflowProperty = transitionKeys.some(function(key) {
          return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
          this.refresh();
        }
      };
      return ResizeObserverController2;
    }()
  );
  var ResizeObserverEntryImpl = (
    /** @class */
    /* @__PURE__ */ function() {
      function ResizeObserverEntryImpl2(target, rectInit) {
        defineConfigurable(this, {
          target,
          contentRect: createReadOnlyRect(rectInit)
        });
      }
      return ResizeObserverEntryImpl2;
    }()
  );
  function findIndex(arr, key) {
    var result = -1;
    arr.forEach(function(entry, index2) {
      if (entry[0] === key) {
        result = index2;
        return false;
      }
    });
    return result;
  }
  var MapShim = (
    /** @class */
    function() {
      function MapShim2() {
        this.entries_ = [];
      }
      Object.defineProperty(MapShim2.prototype, "size", {
        get: function() {
          return this.entries_.length;
        },
        enumerable: false,
        configurable: true
      });
      MapShim2.prototype.clear = function() {
        this.entries_.splice(0);
      };
      MapShim2.prototype.delete = function(key) {
        var entries_ = this.entries_;
        var index2 = findIndex(entries_, key);
        if (~index2) {
          return !!entries_.splice(index2, 1)[0];
        }
        return false;
      };
      MapShim2.prototype.forEach = function(callbackfn, thisArg) {
        var _this = this;
        var entries_ = this.entries_;
        entries_.forEach(function(entry) {
          if (thisArg) {
            callbackfn.call(thisArg, entry[1], entry[0], _this);
          } else {
            callbackfn(entry[1], entry[0], _this);
          }
        });
      };
      MapShim2.prototype.get = function(key) {
        var entries_ = this.entries_;
        var index2 = findIndex(entries_, key);
        var entry = entries_[index2];
        return entry && entry[1];
      };
      MapShim2.prototype.has = function(key) {
        return !!~findIndex(this.entries_, key);
      };
      MapShim2.prototype.set = function(key, value) {
        var entries_ = this.entries_;
        var index2 = findIndex(entries_, key);
        if (~index2) {
          entries_[index2][1] = value;
        } else {
          entries_.push([key, value]);
        }
        return this;
      };
      return MapShim2;
    }()
  );
  const Map$1 = typeof Map !== "undefined" ? Map : MapShim;
  var ResizeObserverSPI = (
    /** @class */
    function() {
      function ResizeObserverSPI2(callback) {
        this.activeObservations_ = [];
        this.observations_ = new Map$1();
        if (typeof callback !== "function") {
          throw new TypeError("The callback provided as parameter 1 is not a function.");
        }
        this.callback_ = callback;
        this.controller_ = new ResizeObserverController();
      }
      ResizeObserverSPI2.prototype.observe = function(target) {
        if (!this.checkTarget_(target, arguments.length)) {
          return;
        }
        var observations = this.observations_;
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        this.controller_.refresh();
      };
      ResizeObserverSPI2.prototype.unobserve = function(target) {
        if (!this.checkTarget_(target, arguments.length)) {
          return;
        }
        var observations = this.observations_;
        observations.delete(target);
        if (!observations.size) {
          this.controller_.removeObserver(this);
        }
      };
      ResizeObserverSPI2.prototype.disconnect = function() {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
      };
      ResizeObserverSPI2.prototype.gatherActive = function() {
        this.clearActive();
        var activeObservations = this.activeObservations_;
        this.observations_.forEach(function(observation) {
          if (observation.isActive()) {
            activeObservations.push(observation);
          }
        });
        return activeObservations.length > 0;
      };
      ResizeObserverSPI2.prototype.broadcastActive = function() {
        if (!this.hasActive()) {
          return;
        }
        this.callback_(this.activeObservations_.map(function(observation) {
          return new ResizeObserverEntryImpl(observation.target, observation.broadcastRect());
        }));
        this.clearActive();
      };
      ResizeObserverSPI2.prototype.clearActive = function() {
        this.activeObservations_.splice(0);
      };
      ResizeObserverSPI2.prototype.hasActive = function() {
        return this.activeObservations_.length > 0;
      };
      ResizeObserverSPI2.prototype.checkTarget_ = function(target, argsLength) {
        if (!argsLength) {
          throw new TypeError("1 argument required, but only 0 present.");
        }
        if (typeof Element === "undefined" || !(Element instanceof Object)) {
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
      return ResizeObserverSPI2;
    }()
  );
  var ResizeObserverImpl = (
    /** @class */
    function() {
      function ResizeObserverImpl2(callback) {
        var _this = this;
        if (!(this instanceof ResizeObserverImpl2)) {
          throw new TypeError("Cannot call a class as a function.");
        }
        if (!arguments.length) {
          throw new TypeError("1 argument required, but only 0 present.");
        }
        this.observer_ = new ResizeObserverSPI(function(entries) {
          callback.call(_this, entries, _this);
        });
      }
      ResizeObserverImpl2.prototype.observe = function(target) {
        return this.observer_.observe(target);
      };
      ResizeObserverImpl2.prototype.unobserve = function(target) {
        return this.observer_.unobserve(target);
      };
      ResizeObserverImpl2.prototype.disconnect = function() {
        return this.observer_.disconnect();
      };
      return ResizeObserverImpl2;
    }()
  );
  var NativeResizeObserver = global$1.ResizeObserver;
  const index = typeof NativeResizeObserver !== "undefined" ? NativeResizeObserver : ResizeObserverImpl;
  return index;
});
