(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ResizeObserverPolyfill = factory());
})(this, (function () { 'use strict';

  var celia = {};

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function isNil$9 (value) {
    /* eslint eqeqeq: 0 */
    return value == null;
  }

  var isNil_1 = isNil$9;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var ref$4 = Object.prototype;
  var hasOwnProperty = ref$4.hasOwnProperty;

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

  var _createHasOwn$3 = createHasOwn;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _createHasOwn$2 = _createHasOwn$3;

  function _forOwn$5(object, iterator) {
    var hasOwn = _createHasOwn$2(object);
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

  var _forOwn_1 = _forOwn$5;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _forOwn$4 = _forOwn_1;


  /**
   * 遍历object可中途打断
   *
   * @param {object} object
   * @param {function} iterator
   * @returns 是否遍历过
   */
  function forOwn$5(object, iterator) {
    if (object == null) {
      return false;
    }

    return _forOwn$4(object, iterator);
  }


  forOwn$5.each = _forOwn$4;

  var forOwn_1$1 = forOwn$5;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isNil$8 = isNil_1;
  var forOwn$4 = forOwn_1$1;



  function _assign$2 (target) {
    var arguments$1 = arguments;

    if (isNil$8(target)) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    var nextSource;
    for (var i = 1, len = arguments.length; i < len; i++) {
      // eslint-disable-next-line prefer-rest-params
      nextSource = arguments$1[i];
      forOwn$4(nextSource, function (nextVal, nextKey) {
        to[nextKey] = nextVal;
      });
    }
    return to;
  }

  var _assign_1 = _assign$2;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function isFunction$4 (value) {
    return typeof value === 'function';
  }

  var isFunction_1$1 = isFunction$4;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function isNumber$7(value) {
    // eslint-disable-next-line no-self-compare
    return typeof value === 'number' && value === value;
  }

  var isNumber_1 = isNumber$7;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isFunction$3 = isFunction_1$1;
  var isNumber$6 = isNumber_1;

  function isArrayLike$5(value) {
    return !!value && isNumber$6(value.length) && !isFunction$3(value);
  }

  var isArrayLike_1 = isArrayLike$5;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function _loop$3(start, end, iterator) {
    for (var i = 0; start < end; i++, start++) {
      iterator(start, i);
    }
  }

  var _loop_1 = _loop$3;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isArrayLike$4 = isArrayLike_1;
  var _loop$2 = _loop_1;



  function append(arr, obj) {
    arr[arr.length] = obj;
  }

  function flatten(arr, result, depth) {
    _loop$2(0, arr.length, function (n) {
      n = arr[n];
      if (depth > 0) {
        if (isArrayLike$4(n)) {
          flatten(n, result, --depth);
        }
        else {
          append(result, n);
        }
      }
      else if (isArrayLike$4(n)) {
        _loop$2(0, n.length, function (m) {
          m = n[m];
          append(result, m);
        });
      }
      else {
        append(result, n);
      }
    });
    return result;
  }

  var _flat$2 = flatten;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function _forEach$3(value, start, end, iterator) {
    var ret = start < end;
    for (; start < end; start++) {
      if (iterator(value[start], start, value) === false) {
        break;
      }
    }

    return ret;
  }

  var _forEach_1 = _forEach$3;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function _forNumber$3(value, start, end, iterator) {
    var ret = start <= end;
    for (var i = 0; start <= end; i++, start++) {
      if (iterator(start, i, value) === false) {
        break;
      }
    }

    return ret;
  }

  var _forNumber_1 = _forNumber$3;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function isString$5 (value) {
    return typeof value === 'string';
  }

  var isString_1 = isString$5;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var ore = {
    PROP_NAME_RE: /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    ESCAPE_CHAR_RE: /\\(\\)?/g,
    IS_DEEP_PROP_RE: /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
  };

  var _oRE$3 = ore;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isNil$7 = isNil_1;
  var isString$4 = isString_1;
  var _oRE$2 = _oRE$3;

  var PROP_NAME_RE$1 = _oRE$2.PROP_NAME_RE;
  var ESCAPE_CHAR_RE$1 = _oRE$2.ESCAPE_CHAR_RE;
  var IS_DEEP_PROP_RE$1 = _oRE$2.IS_DEEP_PROP_RE;

  function get$2 (object, path) {
    if (!isString$4(path) || !IS_DEEP_PROP_RE$1.test(path)) {
      return object[path];
    }

    var part;
    PROP_NAME_RE$1.lastIndex = 0;
    while (!isNil$7(object) && (part = PROP_NAME_RE$1.exec(path))) {
      var match = part[0];
      var number = part[1];
      var quote = part[2];
      var subString = part[3];
      var prop = quote ? subString.replace(ESCAPE_CHAR_RE$1, '$1') : number || match;
      object = object[prop];
    }
    return object;
  }

  var _get$2 = get$2;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isNumber$5 = isNumber_1;

  function _isInteger$2(value) {
    return isNumber$5(value)
      && isFinite(value)
      // eslint-disable-next-line no-bitwise
      && (value >> 0) === value;
  }

  var _isInteger_1 = _isInteger$2;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function _isNaN$3(value) {
    // eslint-disable-next-line no-self-compare
    return value !== value && typeof value === 'number';
  }

  var _isNaN_1$1 = _isNaN$3;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _isInteger$1 = _isInteger_1;


  var isInteger$2 = Number.isInteger || _isInteger$1;

  var isInteger_1 = isInteger$2;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isNumber$4 = isNumber_1;
  var isInteger$1 = isInteger_1;


  var abs = Math.abs;
  var pow = Math.pow;

  /**
   * 精确到小数点几位
   *
   * 参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round
   *
   * @param {string} method
   * @param {number} number
   * @param {number} decimals
   * @returns {number}
   */
  function _precise$4(method, number, decimals) {
    if (!isNumber$4(number)) {
      return 0;
    }

    if (!decimals) {
      return Math[method](number);
    }
    else if (!isInteger$1(decimals)) {
      return number;
    }

    // 负数四舍五入
    var isMinusRounding = method === 'round' && number < 0;
    if (isMinusRounding) {
      number = abs(number);
    }

    var power = pow(10, decimals);
    // 小数点后最多能正常显示15位
    var ret = Math[method]((number * power).toPrecision(15)) / power;

    if (isMinusRounding) {
      ret = -ret;
    }

    return ret;
  }

  var _precise_1 = _precise$4;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function removeAt$2 (elems, index) {
    var ret = elems.splice(index, 1);
    return ret.length ? ret[0] : null;
  }

  var _removeAt$3 = removeAt$2;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function _to$1(start, end, callback) {
    for (var i = 0; start <= end; i++, start++) {
      callback(start, i, end);
    }
  }

  var _to_1 = _to$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function transform$2 (each, value, iterater, accumulator) {
    each(value, function (val, index, object) {
      return iterater(accumulator, val, index, object);
    });
    return accumulator;
  }

  var _transform$2 = transform$2;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _flat$1 = _flat$2;





  function flat$1 (arr, depth) {
    if (arr) {
      return arr.flat
        ? arr.flat(depth || 1)
        : _flat$1(arr, [], depth || 1);
    }
    return [];
  }

  var flat_1 = flat$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var max = Math.max;
  var min$1 = Math.min;

  function transIndex$3(fromIndex, length) {
    return fromIndex
      ? fromIndex < 0
        ? max(0, length + fromIndex)
        : min$1(fromIndex, length - 1)
      : 0;
  }

  var transIndex_1 = transIndex$3;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isFunction$2 = isFunction_1$1;
  var isArrayLike$3 = isArrayLike_1;
  var isNumber$3 = isNumber_1;
  var transIndex$2 = transIndex_1;
  var _forEach$2 = _forEach_1;
  var _forNumber$2 = _forNumber_1;

  var min = Math.min;
  function forEach$1(value, start, end, iterator) {
    if (isArrayLike$3(value)) {
      var len = value.length;
      if (isFunction$2(start)) {
        return _forEach$2(value, 0, len, start);
      }
      if (isFunction$2(end)) {
        return _forEach$2(value, isNumber$3(start) ? transIndex$2(start, len) : 0, len, end);
      }
      if (isFunction$2(iterator)) {
        return _forEach$2(
          value,
          isNumber$3(start) ? transIndex$2(start, len) : 0,
          isNumber$3(end) ? min(end, len) : len,
          iterator
        );
      }
    }
    else if (isNumber$3(value)) {
      if (isFunction$2(start)) {
        return _forNumber$2(value, 1, value, start);
      }
      if (isFunction$2(end)) {
        return _forNumber$2(value, isNumber$3(start) ? start : 1, value, end);
      }
      if (isFunction$2(iterator)) {
        return _forNumber$2(value, isNumber$3(start) ? start : 1, isNumber$3(end) ? min(end, value) : value, iterator);
      }
    }

    return false;
  }


  forEach$1.each = _forEach$2;
  forEach$1.loop = _forNumber$2;

  var forEach_1$1 = forEach$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _removeAt$2 = _removeAt$3;

  var isArray$5 = Array.isArray;

  function remove$1 (elems, value) {
    if (isArray$5(elems)) {
      var index = elems.indexOf(value);
      if (index > -1) {
        return _removeAt$2(elems, index);
      }
    }
    return null;
  }

  var remove_1 = remove$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _removeAt$1 = _removeAt$3;

  var isArray$4 = Array.isArray;

  function removeAt$1 (elems, index) {
    if (isArray$4(elems)) {
      return _removeAt$1(elems, index);
    }
    return null;
  }

  var removeAt_1 = removeAt$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var PROTOCOL = /^([a-z][a-z\d+\-.]*:)?\/\//i;

  function isAbsoluteURL$1 (url) {
    return PROTOCOL.test(url);
  }

  var isAbsoluteURL_1 = isAbsoluteURL$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var ref$3 = Object.prototype;
  var toString$4 = ref$3.toString;

  function isAsyncFunction$1 (value) {
    return toString$4.call(value) === '[object AsyncFunction]';
  }

  var isAsyncFunction_1 = isAsyncFunction$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function isBoolean$1 (value) {
    return typeof value === 'boolean';
  }

  var isBoolean_1 = isBoolean$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function isDate$3 (value) {
    return value instanceof Date;
  }

  var isDate_1 = isDate$3;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var ref$2 = Object.prototype;
  var toString$3 = ref$2.toString;

  function isError$1(err) {
    return toString$3.call(err).indexOf('Error') > -1;
  }

  var isError_1 = isError$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var FALSY = ['false', 'null', 'undefined', '0'];

  function isFalsy$1(bool) {
    return !bool || FALSY.indexOf(bool) !== -1;
  }

  var isFalsy_1 = isFalsy$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isDate$2 = isDate_1;

  function isValidDate$2 (date) {
    return isDate$2(date) && date.toString() !== 'Invalid Date';
  }

  var isValidDate_1 = isValidDate$2;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isNumber$2 = isNumber_1;
  var isValidDate$1 = isValidDate_1;


  function isLeapYear$1(year) {
    if (isValidDate$1(year)) {
      year = year.getFullYear();
    }
    else if (!isNumber$2(year)) {
      return false;
    }
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  var isLeapYear_1 = isLeapYear$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _isNaN$1$1 = _isNaN_1$1;

  var _isNaN$2 = Number.isNaN || _isNaN$1$1;

  var _isNaN_1 = _isNaN$2;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function isObject$5 (value) {
    return value !== null && typeof value === 'object';
  }

  var isObject_1 = isObject$5;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var ref$1 = Object.prototype;
  var toString$2 = ref$1.toString;

  function isObjectLike(value) {
    return !!value && toString$2.call(value) === '[object Object]';
  }

  /**
   * 判断是否是一个普通对象，兼容ie9+
   *
   * @param {any} value
   * @returns {boolean}
   */
  function isPlainObject$1(value) {
    if (!isObjectLike(value)) {
      return false;
    }

    var prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
  }

  var isPlainObject_1 = isPlainObject$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isFunction$1 = isFunction_1$1;

  function isPromiseLike$1 (value) {
    return !!value
      && isFunction$1(value.then)
      && isFunction$1(value['catch']);
  }

  var isPromiseLike_1 = isPromiseLike$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function isRegExp$2 (value) {
    return value instanceof RegExp;
  }

  var isRegExp_1 = isRegExp$2;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function isUndefined$1 (value) {
    return typeof value === 'undefined';
  }

  var isUndefined_1$1 = isUndefined$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function isWindow$1 (elem) {
    return !!elem && elem === elem.window;
  }

  var isWindow_1 = isWindow$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _precise$3 = _precise_1;




  function round$5(number, decimals) {
    return _precise$3('ceil', number, decimals);
  }

  var ceil$1 = round$5;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _precise$2 = _precise_1;




  function round$4(number, decimals) {
    return _precise$2('floor', number, decimals);
  }

  var floor$1 = round$4;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _precise$1 = _precise_1;




  function round$3(number, decimals) {
    return _precise$1('round', number, decimals);
  }

  var round_1 = round$3;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _assign$1 = _assign_1;





  var assign$3 = Object.assign || _assign$1;

  var assign_1 = assign$3;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isNil$6 = isNil_1;
  var isObject$4 = isObject_1;
  var forOwn$3 = forOwn_1$1;



  function assign$2(target, nextSource) {
    var copy;
    if (isNil$6(nextSource)) {
      return;
    }
    forOwn$3(nextSource, function (nextVal, nextKey) {
      copy = target[nextKey];
      if (isObject$4(copy) && isObject$4(nextVal)) {
        assign$2(copy, nextVal);
      }
      else {
        target[nextKey] = nextVal;
      }
    });
  }

  function deepAssign$1 (target) {
    var arguments$1 = arguments;

    if (isNil$6(target)) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    var nextSource;

    for (var i = 1, len = arguments.length; i < len; i++) {
      // eslint-disable-next-line prefer-rest-params
      nextSource = arguments$1[i];
      assign$2(to, nextSource);
    }
    return to;
  }

  var deepAssign_1 = deepAssign$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _createHasOwn$1 = _createHasOwn$3;

  var isArray$3 = Array.isArray;

  function del(obj, k) {
    try {
      delete obj[k];
    }
    catch (e) {}
  }

  /**
   * 清空对象的自身非原型链属性
   *
   * @param {object} obj
   * @param {Array=} exclude
   * @returns {object}
   */
  function emptyOwn$1(object, exclude) {
    if (object == null) {
      return object;
    }

    var callback = isArray$3(exclude) && exclude.length
      ? function (k, obj) {
        if (exclude.indexOf(k) === -1) {
          del(obj, k);
        }
      }
      : function (k, obj) {
        del(obj, k);
      };

    var hasOwn = _createHasOwn$1(object);

    for (var key in object) {
      if (hasOwn(object, key)) {
        callback(key, object);
      }
    }
    return object;
  }

  var emptyOwn_1 = emptyOwn$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isNil$5 = isNil_1;
  var _get$1 = _get$2;



  function get$1 (object, path, defaultValue) {
    var result = isNil$5(object) ? undefined : _get$1(object, path);
    return result === undefined ? defaultValue : result;
  }

  var get_1 = get$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isObject$3 = isObject_1;
  var assign$1 = assign_1;
  var forOwn$2 = forOwn_1$1;





  var isArray$2 = Array.isArray;

  function copy(value) {
    return isObject$3(value) ? assign$1({}, value) : value;
  }

  function copyDeep(value) {
    var target = value;
    if (isArray$2(value)) {
      target = [];
      value.forEach(function (val, i) {
        target[i] = copyDeep(val);
      });
    }
    else if (isObject$3(value)) {
      target = {};
      forOwn$2(value, function (val, key) {
        target[key] = copyDeep(val);
      });
    }
    return target;
  }

  function looseClone$1 (value, deep) {
    return deep ? copyDeep(value) : copy(value);
  }

  var looseClone_1 = looseClone$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _forOwn$3 = _forOwn_1;


  var isArray$1 = Array.isArray;

  /**
   * 浅拷贝对象并排除指定属性
   *
   * @param {object} object
   * @param {Array=} exclude
   * @returns {object}
   */
  function objectWithoutProperties$1(object, exclude) {
    var target = {};
    if (object == null) {
      return target;
    }

    var callback = isArray$1(exclude) && exclude.length
      ? function (val, k) {
        if (exclude.indexOf(k) === -1) {
          target[k] = val;
        }
      }
      : function (val, k) {
        target[k] = val;
      };

    _forOwn$3(object, callback);
    return target;
  }

  var objectWithoutProperties_1 = objectWithoutProperties$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isNil$4 = isNil_1;
  var isString$3 = isString_1;
  var _oRE$1 = _oRE$3;

  var PROP_NAME_RE = _oRE$1.PROP_NAME_RE;
  var ESCAPE_CHAR_RE = _oRE$1.ESCAPE_CHAR_RE;
  var IS_DEEP_PROP_RE = _oRE$1.IS_DEEP_PROP_RE;

  function set$1 (object, path, value) {
    var target = object;

    if (isNil$4(target)) {
      return object;
    }

    if (!isString$3(path) || !IS_DEEP_PROP_RE.test(path)) {
      target[path] = value;
      return object;
    }

    var part;
    var queue = [];
    var i = 0;
    var key;

    PROP_NAME_RE.lastIndex = 0;
    while ((part = PROP_NAME_RE.exec(path))) {
      var match = part[0];
      var number = part[1];
      var quote = part[2];
      var subString = part[3];
      var obj = (void 0);
      if (quote) {
        key = subString.replace(ESCAPE_CHAR_RE, '$1');
        obj = target[key];
        if (isNil$4(obj)) {
          obj = {};
          target[key] = obj;
        }
      }
      else if (number) {
        obj = target[key = number];
        if (isNil$4(obj)) {
          obj = [];
          target[number] = obj;
        }
      }
      else {
        obj = target[key = match];
        if (isNil$4(obj)) {
          obj = {};
          target[match] = obj;
        }
      }
      target = obj;
      queue[i++] = obj;
    }

    target = queue[i - 2];
    target[key] = value;

    return object;
  }

  var set_1 = set$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _transform$1 = _transform$2;
  var forOwn$1 = forOwn_1$1;



  function transform$1 (value, iterater, accumulator) {
    return _transform$1(forOwn$1, value, iterater, accumulator);
  }

  var transform_1 = transform$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var UID_PROPERTY = "__CUID__" + (Math.random().toString(36).slice(2));
  var uidCounter = 0;

  function uid$2 (obj) {
    var uid = obj[UID_PROPERTY];
    if (!uid) {
      uid = ++uidCounter;
      Object.defineProperty(obj, UID_PROPERTY, {
        configurable: true,
        value: uidCounter
      });
    }
    return uid;
  }

  var uid_1 = uid$2;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function assert$1 (condition, msg) {
    if (!condition) {
      throw new Error(msg);
    }
  }

  var assert_1 = assert$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var round$2 = round_1;





  var KB = 1024;
  var MB = KB * 1024;
  var GB = MB * 1024;
  var TB = GB * 1024;

  function defaultFormatter(num, unit) {
    return (num + " " + unit);
  }

  function byteSizeConvert$1(value, decimals, custom) {
    var bytes = +value;

    var val;
    var unit;
    if (bytes >= TB) {
      val = round$2(bytes / TB, decimals);
      unit = 'TB';
    }
    else if (bytes >= GB) {
      val = round$2(bytes / GB, decimals);
      unit = 'GB';
    }
    else if (bytes >= MB) {
      val = round$2(bytes / MB, decimals);
      unit = 'MB';
    }
    else if (bytes >= KB) {
      val = round$2(bytes / KB, decimals);
      unit = 'KB';
    }
    else if (bytes > 0) {
      val = bytes;
      unit = 'B';
    }
    else {
      val = 0;
      unit = 'B';
    }

    if (!custom) {
      custom = defaultFormatter;
    }

    return custom(val, unit, value);
  }

  byteSizeConvert$1.KB = KB;
  byteSizeConvert$1.MB = MB;
  byteSizeConvert$1.GB = GB;
  byteSizeConvert$1.TB = TB;

  var byteSizeConvert_1 = byteSizeConvert$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function callAsync$1(fn) {
    return Promise.resolve().then(fn);
  }

  var callAsync_1 = callAsync$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function debounce$1 (fn, wait) {
    var timeout = null;

    function cancel() {
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }
    }

    function debounce() {
      cancel();
      timeout = setTimeout(fn, wait);
    }

    debounce.cancel = cancel;
    return debounce;
  }

  var debounce_1 = debounce$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isNil$3 = isNil_1;
  var isArrayLike$2 = isArrayLike_1;
  var isNumber$1 = isNumber_1;
  var _forEach$1 = _forEach_1;
  var _forOwn$2 = _forOwn_1;
  var _forNumber$1 = _forNumber_1;



  function each$2 (value, cb) {
    if (isArrayLike$2(value)) {
      _forEach$1(value, 0, value.length, cb);
    }
    else if (isNumber$1(value)) {
      _forNumber$1(value, 1, value, cb);
    }
    else if (!isNil$3(value)) {
      _forOwn$2(value, cb);
    }
  }

  var each_1 = each$2;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isObject$2 = isObject_1;
  var uid$1 = uid_1;

  function easyHash$1 (value) {
    return isObject$2(value)
      ? ("o" + (uid$1(value)))
      : (typeof value)[0] + value;
  }

  var easyHash_1 = easyHash$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isObject$1 = isObject_1;
  var isDate$1 = isDate_1;
  var isRegExp$1 = isRegExp_1;

  var isArray = Array.isArray;
  var keys = Object.keys;
  function looseEqual$1(a, b) {
    if (a === b) {
      return true;
    }

    if (!isObject$1(a) || !isObject$1(b)) {
      return false;
    }

    // 判断是否是数组
    if (isArray(a) && isArray(b)) {
      return a.length === b.length && a.every(function (e, i) {
        return looseEqual$1(e, b[i]);
      });
    }

    // 判断日期
    if (isDate$1(a) && isDate$1(b)) {
      return Number(a) === Number(b);
    }

    // 正则
    if (isRegExp$1(a) && isRegExp$1(b)) {
      return a.toString() === b.toString();
    }

    // 对象
    var keysA = keys(a);
    var keysB = keys(b);
    return keysA.length === keysB.length && keysA.every(function (key) {
      return looseEqual$1(a[key], b[key]);
    });
  }

  var looseEqual_1 = looseEqual$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var each$1 = each_1;
  var isNil$2 = isNil_1;








  function map$1 (elems, callback) {
    var ret = [];
    each$1(elems, function (elem, key) {
      elem = callback(elem, key);
      if (!isNil$2(elem)) {
        ret[ret.length] = elem;
      }
    });
    return ret;
  }

  var map_1 = map$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var round$1 = round_1;





  var MBPS = 8 * 1024 * 1024;

  function mbpsConvert$1(bytes, decimals) {
    return round$1(+bytes / MBPS, decimals || 2);
  }

  mbpsConvert$1.MBPS = MBPS;

  var mbpsConvert_1 = mbpsConvert$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function noop$2(val) {
    return val;
  }

  var noop_1 = noop$2;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _forOwn$1 = _forOwn_1;


  function openLink$1(url, attrs) {
    if ( attrs === void 0 ) attrs = { target: '_blank' };

    var link = document.body.appendChild(document.createElement('a'));
    var span = link.appendChild(document.createElement('span'));
    link.setAttribute('href', url);
    _forOwn$1(attrs, function (val, key) {
      link.setAttribute(key, val);
    });
    span.click();
    setTimeout(function () {
      document.body.removeChild(link);
    });
  }

  var openLink_1 = openLink$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function page$1(list, current, pageSize) {
    var total;
    if (list && (total = list.length)) {
      return {
        current: current,
        pageSize: pageSize,
        total: total,
        list: total > pageSize
          ? list.slice((current - 1) * pageSize, current * pageSize)
          : list
      };
    }
    return { current: current, pageSize: pageSize, total: 0, list: [] };
  }

  var page_1 = page$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function runQueue$1(queue, next, cb) {
    var step = function (index) {
      var fn;
      if (index >= queue.length) {
        cb();
      }
      else if ((fn = queue[index])) {
        next(fn, function () {
          step(index + 1);
        });
      }
      else {
        step(index + 1);
      }
    };
    step(0);
  }

  var runQueue_1 = runQueue$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  function sleep$1 (ms) {
    return ms
      ? new Promise(function (resolve) {
        setTimeout(resolve, ms);
      })
      : Promise.resolve();
  }

  var sleep_1 = sleep$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var ref = Object.prototype;
  var toString$1 = ref.toString;

  function toString$1$1 (value) {
    return toString$1.call(value);
  }

  var toString_1 = toString$1$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isArrayLike$1 = isArrayLike_1;
  var transIndex$1 = transIndex_1;



  function valueAt$1(value, index) {
    if (isArrayLike$1(value)) {
      return value[transIndex$1(index, value.length)];
    }
    else if (value != null) {
      return value[index];
    }
    return null;
  }

  var valueAt_1 = valueAt$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var noop$1 = noop_1;

  var warn$1 = console.warn
    ? console.warn.bind(console)
    : noop$1;

  var warn_1 = warn$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isString$2 = isString_1;

  var DASH_ALPHA_REGEX = /[-_. ]+([a-z])/g;
  var cache$1 = Object.create(null);

  function camelize$1 (value) {
    if (isString$2(value)) {
      var hit = cache$1[value];
      return hit
        || (cache$1[value] = value.replace(DASH_ALPHA_REGEX, function (val, letter) { return letter.toUpperCase(); }));
    }
    return value;
  }

  var camelize_1 = camelize$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var isString$1 = isString_1;

  var cache = Object.create(null);

  function capitalize$1 (value) {
    if (isString$1(value)) {
      var hit = cache[value];
      // eslint-disable-next-line no-return-assign
      return hit || (cache[value] = value.charAt(0).toUpperCase() + value.slice(1));
    }
    return value;
  }

  var capitalize_1 = capitalize$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  var _loop$1 = _loop_1;
  var isNil$1 = isNil_1;

  function pathJoin$1 (basePath) {
    var len = arguments.length;
    if (!len || isNil$1(basePath)) {
      return '.';
    }

    var str = '';
    // eslint-disable-next-line prefer-rest-params
    var args = arguments;
    _loop$1(1, len, function (arg) {
      arg = args[arg];
      if (arg) {
        str += '/';
        str += arg;
      }
    });

    if (str) {
      basePath = basePath.replace(/\/+$/, '') + str.replace(/\/+/g, '/');
    }
    return basePath;
  }

  var pathJoin_1 = pathJoin$1;

  /* celia.js v8.0.4 (c) 2018-2021 Jesse Feng Released under the MIT License. */

  Object.defineProperty(celia, '__esModule', { value: true });

  var _assign = _assign_1;
  var _createHasOwn = _createHasOwn$3;
  var _flat = _flat$2;
  var _forEach = _forEach_1;
  var _forNumber = _forNumber_1;
  var _forOwn = _forOwn_1;
  var _get = _get$2;
  var _isInteger = _isInteger_1;
  var _isNaN = _isNaN_1$1;
  var _loop = _loop_1;
  var _oRE = _oRE$3;
  var _precise = _precise_1;
  var _removeAt = _removeAt$3;
  var _to = _to_1;
  var _transform = _transform$2;
  var flat = flat_1;
  var forEach = forEach_1$1;
  var remove = remove_1;
  var removeAt = removeAt_1;
  var isAbsoluteURL = isAbsoluteURL_1;
  var isArrayLike = isArrayLike_1;
  var isAsyncFunction = isAsyncFunction_1;
  var isBoolean = isBoolean_1;
  var isDate = isDate_1;
  var isError = isError_1;
  var isFalsy = isFalsy_1;
  var isFunction = isFunction_1$1;
  var isInteger = isInteger_1;
  var isLeapYear = isLeapYear_1;
  var _isNaN$1 = _isNaN_1;
  var isNil = isNil_1;
  var isNumber = isNumber_1;
  var isObject = isObject_1;
  var isPlainObject = isPlainObject_1;
  var isPromiseLike = isPromiseLike_1;
  var isRegExp = isRegExp_1;
  var isString = isString_1;
  var isUndefined = isUndefined_1$1;
  var isValidDate = isValidDate_1;
  var isWindow = isWindow_1;
  var ceil = ceil$1;
  var floor = floor$1;
  var round = round_1;
  var assign = assign_1;
  var deepAssign = deepAssign_1;
  var emptyOwn = emptyOwn_1;
  var forOwn = forOwn_1$1;
  var get = get_1;
  var looseClone = looseClone_1;
  var objectWithoutProperties = objectWithoutProperties_1;
  var set = set_1;
  var transform = transform_1;
  var uid = uid_1;
  var assert = assert_1;
  var byteSizeConvert = byteSizeConvert_1;
  var callAsync = callAsync_1;
  var debounce = debounce_1;
  var each = each_1;
  var easyHash = easyHash_1;
  var looseEqual = looseEqual_1;
  var map = map_1;
  var mbpsConvert = mbpsConvert_1;
  var noop = noop_1;
  var openLink = openLink_1;
  var page = page_1;
  var runQueue = runQueue_1;
  var sleep = sleep_1;
  var toString = toString_1;
  var transIndex = transIndex_1;
  var valueAt = valueAt_1;
  var warn = warn_1;
  var camelize = camelize_1;
  var capitalize = capitalize_1;
  var pathJoin = pathJoin_1;



  celia._assign = _assign;
  celia._createHasOwn = _createHasOwn;
  celia._flat = _flat;
  celia._forEach = _forEach;
  celia._forNumber = _forNumber;
  celia._forOwn = _forOwn;
  celia._get = _get;
  celia._isInteger = _isInteger;
  celia._isNaN = _isNaN;
  celia._loop = _loop;
  celia._oRE = _oRE;
  celia._precise = _precise;
  celia._removeAt = _removeAt;
  celia._to = _to;
  celia._transform = _transform;
  celia.flat = flat;
  var forEach_1 = celia.forEach = forEach;
  celia.remove = remove;
  celia.removeAt = removeAt;
  celia.isAbsoluteURL = isAbsoluteURL;
  celia.isArrayLike = isArrayLike;
  celia.isAsyncFunction = isAsyncFunction;
  celia.isBoolean = isBoolean;
  celia.isDate = isDate;
  celia.isError = isError;
  celia.isFalsy = isFalsy;
  var isFunction_1 = celia.isFunction = isFunction;
  celia.isInteger = isInteger;
  celia.isLeapYear = isLeapYear;
  celia.isNaN = _isNaN$1;
  celia.isNil = isNil;
  celia.isNumber = isNumber;
  celia.isObject = isObject;
  celia.isPlainObject = isPlainObject;
  celia.isPromiseLike = isPromiseLike;
  celia.isRegExp = isRegExp;
  celia.isString = isString;
  var isUndefined_1 = celia.isUndefined = isUndefined;
  celia.isValidDate = isValidDate;
  celia.isWindow = isWindow;
  celia.ceil = ceil;
  celia.floor = floor;
  celia.round = round;
  celia.assign = assign;
  celia.deepAssign = deepAssign;
  celia.emptyOwn = emptyOwn;
  var forOwn_1 = celia.forOwn = forOwn;
  celia.get = get;
  celia.looseClone = looseClone;
  celia.objectWithoutProperties = objectWithoutProperties;
  celia.set = set;
  celia.transform = transform;
  celia.uid = uid;
  celia.assert = assert;
  celia.byteSizeConvert = byteSizeConvert;
  celia.callAsync = callAsync;
  celia.debounce = debounce;
  celia.each = each;
  celia.easyHash = easyHash;
  celia.looseEqual = looseEqual;
  celia.map = map;
  celia.mbpsConvert = mbpsConvert;
  celia.noop = noop;
  celia.openLink = openLink;
  celia.page = page;
  celia.runQueue = runQueue;
  celia.sleep = sleep;
  celia.toString = toString;
  celia.transIndex = transIndex;
  celia.valueAt = valueAt;
  celia.warn = warn;
  celia.camelize = camelize;
  celia.capitalize = capitalize;
  celia.pathJoin = pathJoin;

  function findIndex(arr, key) {
      var result = -1;
      forEach_1(arr, function (entry, index) {
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
          forEach_1(entries_, function (entry) {
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
  var Map$1 = !isUndefined_1(Map)
      ? Map
      : MapShim;

  var defineConfigurable = (function (target, props) {
      forOwn_1(props, function (val, key) {
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
      if (!isUndefined_1(window) && window.Math === Math) {
          return window;
      }
      if (!isUndefined_1(global) && global.Math === Math) {
          return global;
      }
      if (!isUndefined_1(self) && self.Math === Math) {
          return self;
      }
      return Function('return this')();
  })();

  function getWindowOf(target) {
      var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
      return ownerGlobal || global$1;
  }

  var isBrowser = !isUndefined_1(window) && !isUndefined_1(document) && window.document === document;

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
      if (!isUndefined_1(SVGGraphicsElement)) {
          return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
      }
      return function (target) { return (target instanceof getWindowOf(target).SVGElement
          && isFunction_1(target)); };
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
      var Constr = !isUndefined_1(DOMRectReadOnly) ? DOMRectReadOnly : Object;
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

  var raf = isFunction_1(requestAnimationFrame)
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
  var mutationObserverSupported = !isUndefined_1(MutationObserver);
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
          if (!isFunction_1(callback)) {
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
          if (isUndefined_1(Element) || !(Element instanceof Object)) {
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

  return ResizeObserverImpl;

}));
