import require$$1$1, { createRequire } from 'module';
import os from 'os';
import require$$0$2 from 'assert';
import require$$2 from 'events';
import require$$0$3 from 'yoga-layout-prebuilt';
import require$$1 from 'tty';
import require$$0$4 from 'stream';
import require$$0$5 from 'fs';
import require$$2$1 from 'process';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

(
			true
				? createRequire(import.meta.url)
				: require
		);

var react = {exports: {}};

var react_production_min = {};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

var objectAssign;
var hasRequiredObjectAssign;

function requireObjectAssign () {
	if (hasRequiredObjectAssign) return objectAssign;
	hasRequiredObjectAssign = 1;
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};
	return objectAssign;
}

/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReact_production_min;

function requireReact_production_min () {
	if (hasRequiredReact_production_min) return react_production_min;
	hasRequiredReact_production_min = 1;
var l=requireObjectAssign(),n=60103,p=60106;react_production_min.Fragment=60107;react_production_min.StrictMode=60108;react_production_min.Profiler=60114;var q=60109,r=60110,t=60112;react_production_min.Suspense=60113;var u=60115,v=60116;
	if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;n=w("react.element");p=w("react.portal");react_production_min.Fragment=w("react.fragment");react_production_min.StrictMode=w("react.strict_mode");react_production_min.Profiler=w("react.profiler");q=w("react.provider");r=w("react.context");t=w("react.forward_ref");react_production_min.Suspense=w("react.suspense");u=w("react.memo");v=w("react.lazy");}var x="function"===typeof Symbol&&Symbol.iterator;
	function y(a){if(null===a||"object"!==typeof a)return null;a=x&&a[x]||a["@@iterator"];return "function"===typeof a?a:null}function z(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
	var A={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B={};function C(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}C.prototype.isReactComponent={};C.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z(85));this.updater.enqueueSetState(this,a,b,"setState");};C.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};
	function D(){}D.prototype=C.prototype;function E(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}var F=E.prototype=new D;F.constructor=E;l(F,C.prototype);F.isPureReactComponent=!0;var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
	function J(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H.call(b,e)&&!I.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f;}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return {$$typeof:n,type:a,key:k,ref:h,props:d,_owner:G.current}}
	function K(a,b){return {$$typeof:n,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L(a){return "object"===typeof a&&null!==a&&a.$$typeof===n}function escape(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var M=/\/+/g;function N(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
	function O(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n:case p:h=!0;}}if(h)return h=a,d=d(h),a=""===e?"."+N(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M,"$&/")+"/"),O(d,b,c,"",function(a){return a})):null!=d&&(L(d)&&(d=K(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
	0;g<a.length;g++){k=a[g];var f=e+N(k,g);h+=O(k,b,c,f,d);}else if(f=y(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N(k,g++),h+=O(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P(a,b,c){if(null==a)return a;var e=[],d=0;O(a,e,"","",function(a){return b.call(c,a,d++)});return e}
	function Q(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b);},function(b){0===a._status&&(a._status=2,a._result=b);});}if(1===a._status)return a._result;throw a._result;}var R={current:null};function S(){var a=R.current;if(null===a)throw Error(z(321));return a}var T={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G,IsSomeRendererActing:{current:!1},assign:l};
	react_production_min.Children={map:P,forEach:function(a,b,c){P(a,function(){b.apply(this,arguments);},c);},count:function(a){var b=0;P(a,function(){b++;});return b},toArray:function(a){return P(a,function(a){return a})||[]},only:function(a){if(!L(a))throw Error(z(143));return a}};react_production_min.Component=C;react_production_min.PureComponent=E;react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T;
	react_production_min.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z(267,a));var e=l({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H.call(b,f)&&!I.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g;}return {$$typeof:n,type:a.type,
	key:d,ref:k,props:e,_owner:h}};react_production_min.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q,_context:a};return a.Consumer=a};react_production_min.createElement=J;react_production_min.createFactory=function(a){var b=J.bind(null,a);b.type=a;return b};react_production_min.createRef=function(){return {current:null}};react_production_min.forwardRef=function(a){return {$$typeof:t,render:a}};react_production_min.isValidElement=L;
	react_production_min.lazy=function(a){return {$$typeof:v,_payload:{_status:-1,_result:a},_init:Q}};react_production_min.memo=function(a,b){return {$$typeof:u,type:a,compare:void 0===b?null:b}};react_production_min.useCallback=function(a,b){return S().useCallback(a,b)};react_production_min.useContext=function(a,b){return S().useContext(a,b)};react_production_min.useDebugValue=function(){};react_production_min.useEffect=function(a,b){return S().useEffect(a,b)};react_production_min.useImperativeHandle=function(a,b,c){return S().useImperativeHandle(a,b,c)};
	react_production_min.useLayoutEffect=function(a,b){return S().useLayoutEffect(a,b)};react_production_min.useMemo=function(a,b){return S().useMemo(a,b)};react_production_min.useReducer=function(a,b,c){return S().useReducer(a,b,c)};react_production_min.useRef=function(a){return S().useRef(a)};react_production_min.useState=function(a){return S().useState(a)};react_production_min.version="17.0.2";
	return react_production_min;
}

var hasRequiredReact;

function requireReact () {
	if (hasRequiredReact) return react.exports;
	hasRequiredReact = 1;
	(function (module) {

		{
		  module.exports = requireReact_production_min();
		}
} (react));
	return react.exports;
}

var reactExports = requireReact();

const e=Symbol(),t=Symbol(),r=Symbol(),n=Object.getPrototypeOf,o=new WeakMap,s=e=>e&&(o.has(e)?o.get(e):n(e)===Object.prototype||n(e)===Array.prototype),c=e=>"object"==typeof e&&null!==e,l=(n,o)=>{let s=!1;const c=(e,t)=>{if(!s){let r=e.a.get(n);r||(r=new Set,e.a.set(n,r)),r.add(t);}},l={f:o,get(e,t){return t===r?n:(c(this,t),i(e[t],this.a,this.c))},has(e,r){return r===t?(s=!0,this.a.delete(n),!0):(c(this,r),r in e)},ownKeys(t){return c(this,e),Reflect.ownKeys(t)}};return o&&(l.set=l.deleteProperty=()=>!1),l},i=(e,t,o)=>{if(!s(e))return e;const c=e[r]||e,i=(e=>Object.isFrozen(e)||Object.values(Object.getOwnPropertyDescriptors(e)).some(e=>!e.writable))(c);let u=o&&o.get(c);return u&&u.f===i||(u=l(c,i),u.p=new Proxy(i?(e=>{if(Array.isArray(e))return Array.from(e);const t=Object.getOwnPropertyDescriptors(e);return Object.values(t).forEach(e=>{e.configurable=!0;}),Object.create(n(e),t)})(c):c,u),o&&o.set(c,u)),u.a=t,u.c=o,u.p},u=(e,t)=>{const r=Reflect.ownKeys(e),n=Reflect.ownKeys(t);return r.length!==n.length||r.some((e,t)=>e!==n[t])},a=(t,r,n,o)=>{if(Object.is(t,r))return !1;if(!c(t)||!c(r))return !0;const s=n.get(t);if(!s)return !0;if(o){const e=o.get(t);if(e&&e.n===r)return e.g;o.set(t,{n:r,g:!1});}let l=null;for(const c of s){const s=c===e?u(t,r):a(t[c],r[c],n,o);if(!0!==s&&!1!==s||(l=s),l)break}return null===l&&(l=!0),o&&o.set(t,{n:r,g:l}),l},y=e=>s(e)&&e[r]||null,b=(e,t=!0)=>{o.set(e,t);},g=(e,t)=>{const r=[],n=(e,o)=>{const s=t.get(e);s?s.forEach(t=>{n(e[t],o?[...o,t]:[t]);}):o&&r.push(o);};return n(e),r};

const VERSION = Symbol();
const LISTENERS = Symbol();
const SNAPSHOT = Symbol();
const HANDLER = Symbol();
const PROMISE_RESULT = Symbol();
const PROMISE_ERROR = Symbol();
const refSet = /* @__PURE__ */ new WeakSet();
const isObject = (x) => typeof x === "object" && x !== null;
const canProxy = (x) => isObject(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer);
const proxyCache = /* @__PURE__ */ new WeakMap();
let globalVersion = 1;
const snapshotCache = /* @__PURE__ */ new WeakMap();
const proxy = (initialObject = {}) => {
  if (!isObject(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = globalVersion;
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion) => {
    if (!nextVersion) {
      nextVersion = ++globalVersion;
    }
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  const propListeners = /* @__PURE__ */ new Map();
  const getPropListener = (prop) => {
    let propListener = propListeners.get(prop);
    if (!propListener) {
      propListener = (op, nextVersion) => {
        const newOp = [...op];
        newOp[1] = [prop, ...newOp[1]];
        notifyUpdate(newOp, nextVersion);
      };
      propListeners.set(prop, propListener);
    }
    return propListener;
  };
  const popPropListener = (prop) => {
    const propListener = propListeners.get(prop);
    propListeners.delete(prop);
    return propListener;
  };
  const createSnapshot = (target, receiver) => {
    const cache = snapshotCache.get(receiver);
    if ((cache == null ? void 0 : cache[0]) === version) {
      return cache[1];
    }
    const snapshot2 = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
    b(snapshot2, true);
    snapshotCache.set(receiver, [version, snapshot2]);
    Reflect.ownKeys(target).forEach((key) => {
      const value = Reflect.get(target, key, receiver);
      if (refSet.has(value)) {
        b(value, false);
        snapshot2[key] = value;
      } else if (value instanceof Promise) {
        if (PROMISE_RESULT in value) {
          snapshot2[key] = value[PROMISE_RESULT];
        } else {
          const errorOrPromise = value[PROMISE_ERROR] || value;
          Object.defineProperty(snapshot2, key, {
            get() {
              if (PROMISE_RESULT in value) {
                return value[PROMISE_RESULT];
              }
              throw errorOrPromise;
            }
          });
        }
      } else if (value == null ? void 0 : value[LISTENERS]) {
        snapshot2[key] = value[SNAPSHOT];
      } else {
        snapshot2[key] = value;
      }
    });
    Object.freeze(snapshot2);
    return snapshot2;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    get(target, prop, receiver) {
      if (prop === VERSION) {
        return version;
      }
      if (prop === LISTENERS) {
        return listeners;
      }
      if (prop === SNAPSHOT) {
        return createSnapshot(target, receiver);
      }
      if (prop === HANDLER) {
        return handler;
      }
      return Reflect.get(target, prop, receiver);
    },
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      const childListeners = prevValue == null ? void 0 : prevValue[LISTENERS];
      if (childListeners) {
        childListeners.delete(popPropListener(prop));
      }
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    is: Object.is,
    canProxy,
    set(target, prop, value, receiver) {
      var _a;
      const prevValue = Reflect.get(target, prop, receiver);
      if (this.is(prevValue, value)) {
        return true;
      }
      const childListeners = prevValue == null ? void 0 : prevValue[LISTENERS];
      if (childListeners) {
        childListeners.delete(popPropListener(prop));
      }
      if (isObject(value)) {
        value = y(value) || value;
      }
      let nextValue;
      if ((_a = Object.getOwnPropertyDescriptor(target, prop)) == null ? void 0 : _a.set) {
        nextValue = value;
      } else if (value instanceof Promise) {
        nextValue = value.then((v) => {
          nextValue[PROMISE_RESULT] = v;
          notifyUpdate(["resolve", [prop], v]);
          return v;
        }).catch((e) => {
          nextValue[PROMISE_ERROR] = e;
          notifyUpdate(["reject", [prop], e]);
        });
      } else if (value == null ? void 0 : value[LISTENERS]) {
        nextValue = value;
        nextValue[LISTENERS].add(getPropListener(prop));
      } else if (this.canProxy(value)) {
        nextValue = proxy(value);
        nextValue[LISTENERS].add(getPropListener(prop));
      } else {
        nextValue = value;
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = new Proxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(initialObject, key);
    if (desc.get || desc.set) {
      Object.defineProperty(baseObject, key, desc);
    } else {
      proxyObject[key] = initialObject[key];
    }
  });
  return proxyObject;
};
const getVersion = (proxyObject) => isObject(proxyObject) ? proxyObject[VERSION] : void 0;
const subscribe = (proxyObject, callback, notifyInSync) => {
  if (typeof process === "object" && "production" !== "production" && !(proxyObject == null ? void 0 : proxyObject[LISTENERS])) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        callback(ops.splice(0));
      });
    }
  };
  proxyObject[LISTENERS].add(listener);
  return () => {
    proxyObject[LISTENERS].delete(listener);
  };
};
const snapshot = (proxyObject) => {
  if (typeof process === "object" && "production" !== "production" && !(proxyObject == null ? void 0 : proxyObject[SNAPSHOT])) {
    console.warn("Please use proxy object");
  }
  return proxyObject[SNAPSHOT];
};

const TARGET = "_uMS_T";
const GET_VERSION = "_uMS_V";
const createMutableSource = (target, getVersion) => ({
  [TARGET]: target,
  [GET_VERSION]: getVersion
});
const useMutableSource = (source, getSnapshot, subscribe) => {
  const lastVersion = reactExports.useRef();
  const currentVersion = source[GET_VERSION](source[TARGET]);
  const [state, setState] = reactExports.useState(() => [
    source,
    getSnapshot,
    subscribe,
    currentVersion,
    getSnapshot(source[TARGET])
  ]);
  let currentSnapshot = state[4];
  if (state[0] !== source || state[1] !== getSnapshot || state[2] !== subscribe) {
    currentSnapshot = getSnapshot(source[TARGET]);
    setState([
      source,
      getSnapshot,
      subscribe,
      currentVersion,
      currentSnapshot
    ]);
  } else if (currentVersion !== state[3] && currentVersion !== lastVersion.current) {
    currentSnapshot = getSnapshot(source[TARGET]);
    if (!Object.is(currentSnapshot, state[4])) {
      setState([
        source,
        getSnapshot,
        subscribe,
        currentVersion,
        currentSnapshot
      ]);
    }
  }
  reactExports.useEffect(() => {
    let didUnsubscribe = false;
    const checkForUpdates = () => {
      if (didUnsubscribe) {
        return;
      }
      try {
        const nextSnapshot = getSnapshot(source[TARGET]);
        const nextVersion = source[GET_VERSION](source[TARGET]);
        lastVersion.current = nextVersion;
        setState((prev) => {
          if (prev[0] !== source || prev[1] !== getSnapshot || prev[2] !== subscribe) {
            return prev;
          }
          if (Object.is(prev[4], nextSnapshot)) {
            return prev;
          }
          return [
            prev[0],
            prev[1],
            prev[2],
            nextVersion,
            nextSnapshot
          ];
        });
      } catch (e) {
        setState((prev) => [...prev]);
      }
    };
    const unsubscribe = subscribe(source[TARGET], checkForUpdates);
    checkForUpdates();
    return () => {
      didUnsubscribe = true;
      unsubscribe();
    };
  }, [source, getSnapshot, subscribe]);
  return currentSnapshot;
};

const isSSR = typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
const useIsomorphicLayoutEffect = isSSR ? reactExports.useEffect : reactExports.useLayoutEffect;
const useAffectedDebugValue = (state, affected) => {
  const pathList = reactExports.useRef();
  reactExports.useEffect(() => {
    pathList.current = g(state, affected);
  });
  reactExports.useDebugValue(pathList.current);
};
const mutableSourceCache = /* @__PURE__ */ new WeakMap();
const getMutableSource = (proxyObject) => {
  if (!mutableSourceCache.has(proxyObject)) {
    mutableSourceCache.set(proxyObject, createMutableSource(proxyObject, getVersion));
  }
  return mutableSourceCache.get(proxyObject);
};
const useSnapshot = (proxyObject, options) => {
  const forceUpdate = reactExports.useReducer((c) => c + 1, 0)[1];
  const affected = /* @__PURE__ */ new WeakMap();
  const lastAffected = reactExports.useRef();
  const prevSnapshot = reactExports.useRef();
  const lastSnapshot = reactExports.useRef();
  useIsomorphicLayoutEffect(() => {
    lastSnapshot.current = prevSnapshot.current = snapshot(proxyObject);
  }, [proxyObject]);
  useIsomorphicLayoutEffect(() => {
    lastAffected.current = affected;
    if (prevSnapshot.current !== lastSnapshot.current && a(prevSnapshot.current, lastSnapshot.current, affected, /* @__PURE__ */ new WeakMap())) {
      prevSnapshot.current = lastSnapshot.current;
      forceUpdate();
    }
  });
  const notifyInSync = options == null ? void 0 : options.sync;
  const sub = reactExports.useCallback((proxyObject2, cb) => subscribe(proxyObject2, () => {
    const nextSnapshot = snapshot(proxyObject2);
    lastSnapshot.current = nextSnapshot;
    try {
      if (lastAffected.current && !a(prevSnapshot.current, nextSnapshot, lastAffected.current, /* @__PURE__ */ new WeakMap())) {
        return;
      }
    } catch (e) {
    }
    prevSnapshot.current = nextSnapshot;
    cb();
  }, notifyInSync), [notifyInSync]);
  const currSnapshot = useMutableSource(getMutableSource(proxyObject), snapshot, sub);
  if (typeof process === "object" && "production" !== "production") {
    useAffectedDebugValue(currSnapshot, affected);
  }
  const proxyCache = reactExports.useMemo(() => /* @__PURE__ */ new WeakMap(), []);
  return i(currSnapshot, affected, proxyCache);
};

function indentString$1(string, count = 1, options = {}) {
	const {
		indent = ' ',
		includeEmptyLines = false
	} = options;

	if (typeof string !== 'string') {
		throw new TypeError(
			`Expected \`input\` to be a \`string\`, got \`${typeof string}\``
		);
	}

	if (typeof count !== 'number') {
		throw new TypeError(
			`Expected \`count\` to be a \`number\`, got \`${typeof count}\``
		);
	}

	if (count < 0) {
		throw new RangeError(
			`Expected \`count\` to be at least 0, got \`${count}\``
		);
	}

	if (typeof indent !== 'string') {
		throw new TypeError(
			`Expected \`options.indent\` to be a \`string\`, got \`${typeof indent}\``
		);
	}

	if (count === 0) {
		return string;
	}

	const regex = includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;

	return string.replace(regex, indent.repeat(count));
}

function escapeStringRegexp$1(string) {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	// Escape characters with special meaning either inside or outside character sets.
	// Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
	return string
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d');
}

const extractPathRegex = /\s+at.*[(\s](.*)\)?/;
const pathRegex = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
const homeDir = typeof os.homedir === 'undefined' ? '' : os.homedir().replace(/\\/g, '/');

function cleanStack(stack, {pretty = false, basePath} = {}) {
	const basePathRegex = basePath && new RegExp(`(at | \\()${escapeStringRegexp$1(basePath.replace(/\\/g, '/'))}`, 'g');

	if (typeof stack !== 'string') {
		return undefined;
	}

	return stack.replace(/\\/g, '/')
		.split('\n')
		.filter(line => {
			const pathMatches = line.match(extractPathRegex);
			if (pathMatches === null || !pathMatches[1]) {
				return true;
			}

			const match = pathMatches[1];

			// Electron
			if (
				match.includes('.app/Contents/Resources/electron.asar') ||
				match.includes('.app/Contents/Resources/default_app.asar')
			) {
				return false;
			}

			return !pathRegex.test(match);
		})
		.filter(line => line.trim() !== '')
		.map(line => {
			if (basePathRegex) {
				line = line.replace(basePathRegex, '$1');
			}

			if (pretty) {
				line = line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDir, '~')));
			}

			return line;
		})
		.join('\n');
}

const cleanInternalStack = stack => stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, '');

class AggregateError extends Error {
	#errors;

	name = 'AggregateError';

	constructor(errors) {
		if (!Array.isArray(errors)) {
			throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
		}

		errors = errors.map(error => {
			if (error instanceof Error) {
				return error;
			}

			if (error !== null && typeof error === 'object') {
				// Handle plain error objects with message property and/or possibly other metadata
				return Object.assign(new Error(error.message), error);
			}

			return new Error(error);
		});

		let message = errors
			.map(error => {
				// The `stack` property is not standardized, so we can't assume it exists
				return typeof error.stack === 'string' ? cleanInternalStack(cleanStack(error.stack)) : String(error);
			})
			.join('\n');
		message = '\n' + indentString$1(message, 4);
		super(message);

		this.#errors = errors;
	}

	get errors() {
		return this.#errors.slice();
	}
}

async function pMap(
	iterable,
	mapper,
	{
		concurrency = Number.POSITIVE_INFINITY,
		stopOnError = true
	} = {}
) {
	return new Promise((resolve, reject_) => { // eslint-disable-line promise/param-names
		if (iterable[Symbol.iterator] === undefined && iterable[Symbol.asyncIterator] === undefined) {
			throw new TypeError(`Expected \`input\` to be either an \`Iterable\` or \`AsyncIterable\`, got (${typeof iterable})`);
		}

		if (typeof mapper !== 'function') {
			throw new TypeError('Mapper function is required');
		}

		if (!((Number.isSafeInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency >= 1)) {
			throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${concurrency}\` (${typeof concurrency})`);
		}

		const result = [];
		const errors = [];
		const skippedIndexesMap = new Map();
		let isRejected = false;
		let isResolved = false;
		let isIterableDone = false;
		let resolvingCount = 0;
		let currentIndex = 0;
		const iterator = iterable[Symbol.iterator] === undefined ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();

		const reject = reason => {
			isRejected = true;
			isResolved = true;
			reject_(reason);
		};

		const next = async () => {
			if (isResolved) {
				return;
			}

			const nextItem = await iterator.next();

			const index = currentIndex;
			currentIndex++;

			// Note: `iterator.next()` can be called many times in parallel.
			// This can cause multiple calls to this `next()` function to
			// receive a `nextItem` with `done === true`.
			// The shutdown logic that rejects/resolves must be protected
			// so it runs only one time as the `skippedIndex` logic is
			// non-idempotent.
			if (nextItem.done) {
				isIterableDone = true;

				if (resolvingCount === 0 && !isResolved) {
					if (!stopOnError && errors.length > 0) {
						reject(new AggregateError(errors));
						return;
					}

					isResolved = true;

					if (!skippedIndexesMap.size) {
						resolve(result);
						return;
					}

					const pureResult = [];

					// Support multiple `pMapSkip`'s.
					for (const [index, value] of result.entries()) {
						if (skippedIndexesMap.get(index) === pMapSkip) {
							continue;
						}

						pureResult.push(value);
					}

					resolve(pureResult);
				}

				return;
			}

			resolvingCount++;

			// Intentionally detached
			(async () => {
				try {
					const element = await nextItem.value;

					if (isResolved) {
						return;
					}

					const value = await mapper(element, index);

					// Use Map to stage the index of the element.
					if (value === pMapSkip) {
						skippedIndexesMap.set(index, value);
					}

					result[index] = value;

					resolvingCount--;
					await next();
				} catch (error) {
					if (stopOnError) {
						reject(error);
					} else {
						errors.push(error);
						resolvingCount--;

						// In that case we can't really continue regardless of `stopOnError` state
						// since an iterable is likely to continue throwing after it throws once.
						// If we continue calling `next()` indefinitely we will likely end up
						// in an infinite loop of failed iteration.
						try {
							await next();
						} catch (error) {
							reject(error);
						}
					}
				}
			})();
		};

		// Create the concurrent runners in a detached (non-awaited)
		// promise. We need this so we can await the `next()` calls
		// to stop creating runners before hitting the concurrency limit
		// if the iterable has already been marked as done.
		// NOTE: We *must* do this for async iterators otherwise we'll spin up
		// infinite `next()` calls by default and never start the event loop.
		(async () => {
			for (let index = 0; index < concurrency; index++) {
				try {
					// eslint-disable-next-line no-await-in-loop
					await next();
				} catch (error) {
					reject(error);
					break;
				}

				if (isIterableDone || isRejected) {
					break;
				}
			}
		})();
	});
}

const pMapSkip = Symbol('skip');

function arrayAdd(array, element) {
  const index = array.push(element) - 1;
  return array[index];
}
function arrayRemove(array, element) {
  const index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
}

var build$1 = {};

var render = {};

var ink = {};

var lodash = {exports: {}};

/**
 *
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

var hasRequiredLodash;

function requireLodash () {
	if (hasRequiredLodash) return lodash.exports;
	hasRequiredLodash = 1;
	(function (module, exports) {
(function() {

		  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
		  var undefined$1;

		  /** Used as the semantic version number. */
		  var VERSION = '4.17.21';

		  /** Used as the size to enable large array optimizations. */
		  var LARGE_ARRAY_SIZE = 200;

		  /** Error message constants. */
		  var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
		      FUNC_ERROR_TEXT = 'Expected a function',
		      INVALID_TEMPL_VAR_ERROR_TEXT = 'Invalid `variable` option passed into `_.template`';

		  /** Used to stand-in for `undefined` hash values. */
		  var HASH_UNDEFINED = '__lodash_hash_undefined__';

		  /** Used as the maximum memoize cache size. */
		  var MAX_MEMOIZE_SIZE = 500;

		  /** Used as the internal argument placeholder. */
		  var PLACEHOLDER = '__lodash_placeholder__';

		  /** Used to compose bitmasks for cloning. */
		  var CLONE_DEEP_FLAG = 1,
		      CLONE_FLAT_FLAG = 2,
		      CLONE_SYMBOLS_FLAG = 4;

		  /** Used to compose bitmasks for value comparisons. */
		  var COMPARE_PARTIAL_FLAG = 1,
		      COMPARE_UNORDERED_FLAG = 2;

		  /** Used to compose bitmasks for function metadata. */
		  var WRAP_BIND_FLAG = 1,
		      WRAP_BIND_KEY_FLAG = 2,
		      WRAP_CURRY_BOUND_FLAG = 4,
		      WRAP_CURRY_FLAG = 8,
		      WRAP_CURRY_RIGHT_FLAG = 16,
		      WRAP_PARTIAL_FLAG = 32,
		      WRAP_PARTIAL_RIGHT_FLAG = 64,
		      WRAP_ARY_FLAG = 128,
		      WRAP_REARG_FLAG = 256,
		      WRAP_FLIP_FLAG = 512;

		  /** Used as default options for `_.truncate`. */
		  var DEFAULT_TRUNC_LENGTH = 30,
		      DEFAULT_TRUNC_OMISSION = '...';

		  /** Used to detect hot functions by number of calls within a span of milliseconds. */
		  var HOT_COUNT = 800,
		      HOT_SPAN = 16;

		  /** Used to indicate the type of lazy iteratees. */
		  var LAZY_FILTER_FLAG = 1,
		      LAZY_MAP_FLAG = 2,
		      LAZY_WHILE_FLAG = 3;

		  /** Used as references for various `Number` constants. */
		  var INFINITY = 1 / 0,
		      MAX_SAFE_INTEGER = 9007199254740991,
		      MAX_INTEGER = 1.7976931348623157e+308,
		      NAN = 0 / 0;

		  /** Used as references for the maximum length and index of an array. */
		  var MAX_ARRAY_LENGTH = 4294967295,
		      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
		      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

		  /** Used to associate wrap methods with their bit flags. */
		  var wrapFlags = [
		    ['ary', WRAP_ARY_FLAG],
		    ['bind', WRAP_BIND_FLAG],
		    ['bindKey', WRAP_BIND_KEY_FLAG],
		    ['curry', WRAP_CURRY_FLAG],
		    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
		    ['flip', WRAP_FLIP_FLAG],
		    ['partial', WRAP_PARTIAL_FLAG],
		    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
		    ['rearg', WRAP_REARG_FLAG]
		  ];

		  /** `Object#toString` result references. */
		  var argsTag = '[object Arguments]',
		      arrayTag = '[object Array]',
		      asyncTag = '[object AsyncFunction]',
		      boolTag = '[object Boolean]',
		      dateTag = '[object Date]',
		      domExcTag = '[object DOMException]',
		      errorTag = '[object Error]',
		      funcTag = '[object Function]',
		      genTag = '[object GeneratorFunction]',
		      mapTag = '[object Map]',
		      numberTag = '[object Number]',
		      nullTag = '[object Null]',
		      objectTag = '[object Object]',
		      promiseTag = '[object Promise]',
		      proxyTag = '[object Proxy]',
		      regexpTag = '[object RegExp]',
		      setTag = '[object Set]',
		      stringTag = '[object String]',
		      symbolTag = '[object Symbol]',
		      undefinedTag = '[object Undefined]',
		      weakMapTag = '[object WeakMap]',
		      weakSetTag = '[object WeakSet]';

		  var arrayBufferTag = '[object ArrayBuffer]',
		      dataViewTag = '[object DataView]',
		      float32Tag = '[object Float32Array]',
		      float64Tag = '[object Float64Array]',
		      int8Tag = '[object Int8Array]',
		      int16Tag = '[object Int16Array]',
		      int32Tag = '[object Int32Array]',
		      uint8Tag = '[object Uint8Array]',
		      uint8ClampedTag = '[object Uint8ClampedArray]',
		      uint16Tag = '[object Uint16Array]',
		      uint32Tag = '[object Uint32Array]';

		  /** Used to match empty string literals in compiled template source. */
		  var reEmptyStringLeading = /\b__p \+= '';/g,
		      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
		      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

		  /** Used to match HTML entities and HTML characters. */
		  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
		      reUnescapedHtml = /[&<>"']/g,
		      reHasEscapedHtml = RegExp(reEscapedHtml.source),
		      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

		  /** Used to match template delimiters. */
		  var reEscape = /<%-([\s\S]+?)%>/g,
		      reEvaluate = /<%([\s\S]+?)%>/g,
		      reInterpolate = /<%=([\s\S]+?)%>/g;

		  /** Used to match property names within property paths. */
		  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
		      reIsPlainProp = /^\w*$/,
		      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

		  /**
		   * Used to match `RegExp`
		   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
		   */
		  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
		      reHasRegExpChar = RegExp(reRegExpChar.source);

		  /** Used to match leading whitespace. */
		  var reTrimStart = /^\s+/;

		  /** Used to match a single whitespace character. */
		  var reWhitespace = /\s/;

		  /** Used to match wrap detail comments. */
		  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
		      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
		      reSplitDetails = /,? & /;

		  /** Used to match words composed of alphanumeric characters. */
		  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

		  /**
		   * Used to validate the `validate` option in `_.template` variable.
		   *
		   * Forbids characters which could potentially change the meaning of the function argument definition:
		   * - "()," (modification of function parameters)
		   * - "=" (default value)
		   * - "[]{}" (destructuring of function parameters)
		   * - "/" (beginning of a comment)
		   * - whitespace
		   */
		  var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;

		  /** Used to match backslashes in property paths. */
		  var reEscapeChar = /\\(\\)?/g;

		  /**
		   * Used to match
		   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
		   */
		  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

		  /** Used to match `RegExp` flags from their coerced string values. */
		  var reFlags = /\w*$/;

		  /** Used to detect bad signed hexadecimal string values. */
		  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

		  /** Used to detect binary string values. */
		  var reIsBinary = /^0b[01]+$/i;

		  /** Used to detect host constructors (Safari). */
		  var reIsHostCtor = /^\[object .+?Constructor\]$/;

		  /** Used to detect octal string values. */
		  var reIsOctal = /^0o[0-7]+$/i;

		  /** Used to detect unsigned integer values. */
		  var reIsUint = /^(?:0|[1-9]\d*)$/;

		  /** Used to match Latin Unicode letters (excluding mathematical operators). */
		  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

		  /** Used to ensure capturing order of template delimiters. */
		  var reNoMatch = /($^)/;

		  /** Used to match unescaped characters in compiled string literals. */
		  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

		  /** Used to compose unicode character classes. */
		  var rsAstralRange = '\\ud800-\\udfff',
		      rsComboMarksRange = '\\u0300-\\u036f',
		      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
		      rsComboSymbolsRange = '\\u20d0-\\u20ff',
		      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
		      rsDingbatRange = '\\u2700-\\u27bf',
		      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
		      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
		      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
		      rsPunctuationRange = '\\u2000-\\u206f',
		      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
		      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
		      rsVarRange = '\\ufe0e\\ufe0f',
		      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

		  /** Used to compose unicode capture groups. */
		  var rsApos = "['\u2019]",
		      rsAstral = '[' + rsAstralRange + ']',
		      rsBreak = '[' + rsBreakRange + ']',
		      rsCombo = '[' + rsComboRange + ']',
		      rsDigits = '\\d+',
		      rsDingbat = '[' + rsDingbatRange + ']',
		      rsLower = '[' + rsLowerRange + ']',
		      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
		      rsFitz = '\\ud83c[\\udffb-\\udfff]',
		      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
		      rsNonAstral = '[^' + rsAstralRange + ']',
		      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
		      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
		      rsUpper = '[' + rsUpperRange + ']',
		      rsZWJ = '\\u200d';

		  /** Used to compose unicode regexes. */
		  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
		      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
		      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
		      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
		      reOptMod = rsModifier + '?',
		      rsOptVar = '[' + rsVarRange + ']?',
		      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
		      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
		      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
		      rsSeq = rsOptVar + reOptMod + rsOptJoin,
		      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
		      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

		  /** Used to match apostrophes. */
		  var reApos = RegExp(rsApos, 'g');

		  /**
		   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
		   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
		   */
		  var reComboMark = RegExp(rsCombo, 'g');

		  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
		  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

		  /** Used to match complex or compound words. */
		  var reUnicodeWord = RegExp([
		    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
		    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
		    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
		    rsUpper + '+' + rsOptContrUpper,
		    rsOrdUpper,
		    rsOrdLower,
		    rsDigits,
		    rsEmoji
		  ].join('|'), 'g');

		  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
		  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

		  /** Used to detect strings that need a more robust regexp to match words. */
		  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

		  /** Used to assign default `context` object properties. */
		  var contextProps = [
		    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
		    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
		    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
		    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
		    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
		  ];

		  /** Used to make template sourceURLs easier to identify. */
		  var templateCounter = -1;

		  /** Used to identify `toStringTag` values of typed arrays. */
		  var typedArrayTags = {};
		  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
		  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
		  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
		  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
		  typedArrayTags[uint32Tag] = true;
		  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
		  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
		  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
		  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
		  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
		  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
		  typedArrayTags[setTag] = typedArrayTags[stringTag] =
		  typedArrayTags[weakMapTag] = false;

		  /** Used to identify `toStringTag` values supported by `_.clone`. */
		  var cloneableTags = {};
		  cloneableTags[argsTag] = cloneableTags[arrayTag] =
		  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
		  cloneableTags[boolTag] = cloneableTags[dateTag] =
		  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
		  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
		  cloneableTags[int32Tag] = cloneableTags[mapTag] =
		  cloneableTags[numberTag] = cloneableTags[objectTag] =
		  cloneableTags[regexpTag] = cloneableTags[setTag] =
		  cloneableTags[stringTag] = cloneableTags[symbolTag] =
		  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
		  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
		  cloneableTags[errorTag] = cloneableTags[funcTag] =
		  cloneableTags[weakMapTag] = false;

		  /** Used to map Latin Unicode letters to basic Latin letters. */
		  var deburredLetters = {
		    // Latin-1 Supplement block.
		    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
		    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
		    '\xc7': 'C',  '\xe7': 'c',
		    '\xd0': 'D',  '\xf0': 'd',
		    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
		    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
		    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
		    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
		    '\xd1': 'N',  '\xf1': 'n',
		    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
		    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
		    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
		    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
		    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
		    '\xc6': 'Ae', '\xe6': 'ae',
		    '\xde': 'Th', '\xfe': 'th',
		    '\xdf': 'ss',
		    // Latin Extended-A block.
		    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
		    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
		    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
		    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
		    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
		    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
		    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
		    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
		    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
		    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
		    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
		    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
		    '\u0134': 'J',  '\u0135': 'j',
		    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
		    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
		    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
		    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
		    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
		    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
		    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
		    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
		    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
		    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
		    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
		    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
		    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
		    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
		    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
		    '\u0174': 'W',  '\u0175': 'w',
		    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
		    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
		    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
		    '\u0132': 'IJ', '\u0133': 'ij',
		    '\u0152': 'Oe', '\u0153': 'oe',
		    '\u0149': "'n", '\u017f': 's'
		  };

		  /** Used to map characters to HTML entities. */
		  var htmlEscapes = {
		    '&': '&amp;',
		    '<': '&lt;',
		    '>': '&gt;',
		    '"': '&quot;',
		    "'": '&#39;'
		  };

		  /** Used to map HTML entities to characters. */
		  var htmlUnescapes = {
		    '&amp;': '&',
		    '&lt;': '<',
		    '&gt;': '>',
		    '&quot;': '"',
		    '&#39;': "'"
		  };

		  /** Used to escape characters for inclusion in compiled string literals. */
		  var stringEscapes = {
		    '\\': '\\',
		    "'": "'",
		    '\n': 'n',
		    '\r': 'r',
		    '\u2028': 'u2028',
		    '\u2029': 'u2029'
		  };

		  /** Built-in method references without a dependency on `root`. */
		  var freeParseFloat = parseFloat,
		      freeParseInt = parseInt;

		  /** Detect free variable `global` from Node.js. */
		  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

		  /** Detect free variable `self`. */
		  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

		  /** Used as a reference to the global object. */
		  var root = freeGlobal || freeSelf || Function('return this')();

		  /** Detect free variable `exports`. */
		  var freeExports = exports && !exports.nodeType && exports;

		  /** Detect free variable `module`. */
		  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

		  /** Detect the popular CommonJS extension `module.exports`. */
		  var moduleExports = freeModule && freeModule.exports === freeExports;

		  /** Detect free variable `process` from Node.js. */
		  var freeProcess = moduleExports && freeGlobal.process;

		  /** Used to access faster Node.js helpers. */
		  var nodeUtil = (function() {
		    try {
		      // Use `util.types` for Node.js 10+.
		      var types = freeModule && freeModule.require && freeModule.require('util').types;

		      if (types) {
		        return types;
		      }

		      // Legacy `process.binding('util')` for Node.js < 10.
		      return freeProcess && freeProcess.binding && freeProcess.binding('util');
		    } catch (e) {}
		  }());

		  /* Node.js helper references. */
		  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
		      nodeIsDate = nodeUtil && nodeUtil.isDate,
		      nodeIsMap = nodeUtil && nodeUtil.isMap,
		      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
		      nodeIsSet = nodeUtil && nodeUtil.isSet,
		      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

		  /*--------------------------------------------------------------------------*/

		  /**
		   * A faster alternative to `Function#apply`, this function invokes `func`
		   * with the `this` binding of `thisArg` and the arguments of `args`.
		   *
		   * @private
		   * @param {Function} func The function to invoke.
		   * @param {*} thisArg The `this` binding of `func`.
		   * @param {Array} args The arguments to invoke `func` with.
		   * @returns {*} Returns the result of `func`.
		   */
		  function apply(func, thisArg, args) {
		    switch (args.length) {
		      case 0: return func.call(thisArg);
		      case 1: return func.call(thisArg, args[0]);
		      case 2: return func.call(thisArg, args[0], args[1]);
		      case 3: return func.call(thisArg, args[0], args[1], args[2]);
		    }
		    return func.apply(thisArg, args);
		  }

		  /**
		   * A specialized version of `baseAggregator` for arrays.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} setter The function to set `accumulator` values.
		   * @param {Function} iteratee The iteratee to transform keys.
		   * @param {Object} accumulator The initial aggregated object.
		   * @returns {Function} Returns `accumulator`.
		   */
		  function arrayAggregator(array, setter, iteratee, accumulator) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      var value = array[index];
		      setter(accumulator, value, iteratee(value), array);
		    }
		    return accumulator;
		  }

		  /**
		   * A specialized version of `_.forEach` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {Array} Returns `array`.
		   */
		  function arrayEach(array, iteratee) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      if (iteratee(array[index], index, array) === false) {
		        break;
		      }
		    }
		    return array;
		  }

		  /**
		   * A specialized version of `_.forEachRight` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {Array} Returns `array`.
		   */
		  function arrayEachRight(array, iteratee) {
		    var length = array == null ? 0 : array.length;

		    while (length--) {
		      if (iteratee(array[length], length, array) === false) {
		        break;
		      }
		    }
		    return array;
		  }

		  /**
		   * A specialized version of `_.every` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} predicate The function invoked per iteration.
		   * @returns {boolean} Returns `true` if all elements pass the predicate check,
		   *  else `false`.
		   */
		  function arrayEvery(array, predicate) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      if (!predicate(array[index], index, array)) {
		        return false;
		      }
		    }
		    return true;
		  }

		  /**
		   * A specialized version of `_.filter` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} predicate The function invoked per iteration.
		   * @returns {Array} Returns the new filtered array.
		   */
		  function arrayFilter(array, predicate) {
		    var index = -1,
		        length = array == null ? 0 : array.length,
		        resIndex = 0,
		        result = [];

		    while (++index < length) {
		      var value = array[index];
		      if (predicate(value, index, array)) {
		        result[resIndex++] = value;
		      }
		    }
		    return result;
		  }

		  /**
		   * A specialized version of `_.includes` for arrays without support for
		   * specifying an index to search from.
		   *
		   * @private
		   * @param {Array} [array] The array to inspect.
		   * @param {*} target The value to search for.
		   * @returns {boolean} Returns `true` if `target` is found, else `false`.
		   */
		  function arrayIncludes(array, value) {
		    var length = array == null ? 0 : array.length;
		    return !!length && baseIndexOf(array, value, 0) > -1;
		  }

		  /**
		   * This function is like `arrayIncludes` except that it accepts a comparator.
		   *
		   * @private
		   * @param {Array} [array] The array to inspect.
		   * @param {*} target The value to search for.
		   * @param {Function} comparator The comparator invoked per element.
		   * @returns {boolean} Returns `true` if `target` is found, else `false`.
		   */
		  function arrayIncludesWith(array, value, comparator) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      if (comparator(value, array[index])) {
		        return true;
		      }
		    }
		    return false;
		  }

		  /**
		   * A specialized version of `_.map` for arrays without support for iteratee
		   * shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {Array} Returns the new mapped array.
		   */
		  function arrayMap(array, iteratee) {
		    var index = -1,
		        length = array == null ? 0 : array.length,
		        result = Array(length);

		    while (++index < length) {
		      result[index] = iteratee(array[index], index, array);
		    }
		    return result;
		  }

		  /**
		   * Appends the elements of `values` to `array`.
		   *
		   * @private
		   * @param {Array} array The array to modify.
		   * @param {Array} values The values to append.
		   * @returns {Array} Returns `array`.
		   */
		  function arrayPush(array, values) {
		    var index = -1,
		        length = values.length,
		        offset = array.length;

		    while (++index < length) {
		      array[offset + index] = values[index];
		    }
		    return array;
		  }

		  /**
		   * A specialized version of `_.reduce` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @param {*} [accumulator] The initial value.
		   * @param {boolean} [initAccum] Specify using the first element of `array` as
		   *  the initial value.
		   * @returns {*} Returns the accumulated value.
		   */
		  function arrayReduce(array, iteratee, accumulator, initAccum) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    if (initAccum && length) {
		      accumulator = array[++index];
		    }
		    while (++index < length) {
		      accumulator = iteratee(accumulator, array[index], index, array);
		    }
		    return accumulator;
		  }

		  /**
		   * A specialized version of `_.reduceRight` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @param {*} [accumulator] The initial value.
		   * @param {boolean} [initAccum] Specify using the last element of `array` as
		   *  the initial value.
		   * @returns {*} Returns the accumulated value.
		   */
		  function arrayReduceRight(array, iteratee, accumulator, initAccum) {
		    var length = array == null ? 0 : array.length;
		    if (initAccum && length) {
		      accumulator = array[--length];
		    }
		    while (length--) {
		      accumulator = iteratee(accumulator, array[length], length, array);
		    }
		    return accumulator;
		  }

		  /**
		   * A specialized version of `_.some` for arrays without support for iteratee
		   * shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} predicate The function invoked per iteration.
		   * @returns {boolean} Returns `true` if any element passes the predicate check,
		   *  else `false`.
		   */
		  function arraySome(array, predicate) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      if (predicate(array[index], index, array)) {
		        return true;
		      }
		    }
		    return false;
		  }

		  /**
		   * Gets the size of an ASCII `string`.
		   *
		   * @private
		   * @param {string} string The string inspect.
		   * @returns {number} Returns the string size.
		   */
		  var asciiSize = baseProperty('length');

		  /**
		   * Converts an ASCII `string` to an array.
		   *
		   * @private
		   * @param {string} string The string to convert.
		   * @returns {Array} Returns the converted array.
		   */
		  function asciiToArray(string) {
		    return string.split('');
		  }

		  /**
		   * Splits an ASCII `string` into an array of its words.
		   *
		   * @private
		   * @param {string} The string to inspect.
		   * @returns {Array} Returns the words of `string`.
		   */
		  function asciiWords(string) {
		    return string.match(reAsciiWord) || [];
		  }

		  /**
		   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
		   * without support for iteratee shorthands, which iterates over `collection`
		   * using `eachFunc`.
		   *
		   * @private
		   * @param {Array|Object} collection The collection to inspect.
		   * @param {Function} predicate The function invoked per iteration.
		   * @param {Function} eachFunc The function to iterate over `collection`.
		   * @returns {*} Returns the found element or its key, else `undefined`.
		   */
		  function baseFindKey(collection, predicate, eachFunc) {
		    var result;
		    eachFunc(collection, function(value, key, collection) {
		      if (predicate(value, key, collection)) {
		        result = key;
		        return false;
		      }
		    });
		    return result;
		  }

		  /**
		   * The base implementation of `_.findIndex` and `_.findLastIndex` without
		   * support for iteratee shorthands.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {Function} predicate The function invoked per iteration.
		   * @param {number} fromIndex The index to search from.
		   * @param {boolean} [fromRight] Specify iterating from right to left.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function baseFindIndex(array, predicate, fromIndex, fromRight) {
		    var length = array.length,
		        index = fromIndex + (fromRight ? 1 : -1);

		    while ((fromRight ? index-- : ++index < length)) {
		      if (predicate(array[index], index, array)) {
		        return index;
		      }
		    }
		    return -1;
		  }

		  /**
		   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} value The value to search for.
		   * @param {number} fromIndex The index to search from.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function baseIndexOf(array, value, fromIndex) {
		    return value === value
		      ? strictIndexOf(array, value, fromIndex)
		      : baseFindIndex(array, baseIsNaN, fromIndex);
		  }

		  /**
		   * This function is like `baseIndexOf` except that it accepts a comparator.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} value The value to search for.
		   * @param {number} fromIndex The index to search from.
		   * @param {Function} comparator The comparator invoked per element.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function baseIndexOfWith(array, value, fromIndex, comparator) {
		    var index = fromIndex - 1,
		        length = array.length;

		    while (++index < length) {
		      if (comparator(array[index], value)) {
		        return index;
		      }
		    }
		    return -1;
		  }

		  /**
		   * The base implementation of `_.isNaN` without support for number objects.
		   *
		   * @private
		   * @param {*} value The value to check.
		   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
		   */
		  function baseIsNaN(value) {
		    return value !== value;
		  }

		  /**
		   * The base implementation of `_.mean` and `_.meanBy` without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} array The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {number} Returns the mean.
		   */
		  function baseMean(array, iteratee) {
		    var length = array == null ? 0 : array.length;
		    return length ? (baseSum(array, iteratee) / length) : NAN;
		  }

		  /**
		   * The base implementation of `_.property` without support for deep paths.
		   *
		   * @private
		   * @param {string} key The key of the property to get.
		   * @returns {Function} Returns the new accessor function.
		   */
		  function baseProperty(key) {
		    return function(object) {
		      return object == null ? undefined$1 : object[key];
		    };
		  }

		  /**
		   * The base implementation of `_.propertyOf` without support for deep paths.
		   *
		   * @private
		   * @param {Object} object The object to query.
		   * @returns {Function} Returns the new accessor function.
		   */
		  function basePropertyOf(object) {
		    return function(key) {
		      return object == null ? undefined$1 : object[key];
		    };
		  }

		  /**
		   * The base implementation of `_.reduce` and `_.reduceRight`, without support
		   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
		   *
		   * @private
		   * @param {Array|Object} collection The collection to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @param {*} accumulator The initial value.
		   * @param {boolean} initAccum Specify using the first or last element of
		   *  `collection` as the initial value.
		   * @param {Function} eachFunc The function to iterate over `collection`.
		   * @returns {*} Returns the accumulated value.
		   */
		  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
		    eachFunc(collection, function(value, index, collection) {
		      accumulator = initAccum
		        ? (initAccum = false, value)
		        : iteratee(accumulator, value, index, collection);
		    });
		    return accumulator;
		  }

		  /**
		   * The base implementation of `_.sortBy` which uses `comparer` to define the
		   * sort order of `array` and replaces criteria objects with their corresponding
		   * values.
		   *
		   * @private
		   * @param {Array} array The array to sort.
		   * @param {Function} comparer The function to define sort order.
		   * @returns {Array} Returns `array`.
		   */
		  function baseSortBy(array, comparer) {
		    var length = array.length;

		    array.sort(comparer);
		    while (length--) {
		      array[length] = array[length].value;
		    }
		    return array;
		  }

		  /**
		   * The base implementation of `_.sum` and `_.sumBy` without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} array The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {number} Returns the sum.
		   */
		  function baseSum(array, iteratee) {
		    var result,
		        index = -1,
		        length = array.length;

		    while (++index < length) {
		      var current = iteratee(array[index]);
		      if (current !== undefined$1) {
		        result = result === undefined$1 ? current : (result + current);
		      }
		    }
		    return result;
		  }

		  /**
		   * The base implementation of `_.times` without support for iteratee shorthands
		   * or max array length checks.
		   *
		   * @private
		   * @param {number} n The number of times to invoke `iteratee`.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {Array} Returns the array of results.
		   */
		  function baseTimes(n, iteratee) {
		    var index = -1,
		        result = Array(n);

		    while (++index < n) {
		      result[index] = iteratee(index);
		    }
		    return result;
		  }

		  /**
		   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
		   * of key-value pairs for `object` corresponding to the property names of `props`.
		   *
		   * @private
		   * @param {Object} object The object to query.
		   * @param {Array} props The property names to get values for.
		   * @returns {Object} Returns the key-value pairs.
		   */
		  function baseToPairs(object, props) {
		    return arrayMap(props, function(key) {
		      return [key, object[key]];
		    });
		  }

		  /**
		   * The base implementation of `_.trim`.
		   *
		   * @private
		   * @param {string} string The string to trim.
		   * @returns {string} Returns the trimmed string.
		   */
		  function baseTrim(string) {
		    return string
		      ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
		      : string;
		  }

		  /**
		   * The base implementation of `_.unary` without support for storing metadata.
		   *
		   * @private
		   * @param {Function} func The function to cap arguments for.
		   * @returns {Function} Returns the new capped function.
		   */
		  function baseUnary(func) {
		    return function(value) {
		      return func(value);
		    };
		  }

		  /**
		   * The base implementation of `_.values` and `_.valuesIn` which creates an
		   * array of `object` property values corresponding to the property names
		   * of `props`.
		   *
		   * @private
		   * @param {Object} object The object to query.
		   * @param {Array} props The property names to get values for.
		   * @returns {Object} Returns the array of property values.
		   */
		  function baseValues(object, props) {
		    return arrayMap(props, function(key) {
		      return object[key];
		    });
		  }

		  /**
		   * Checks if a `cache` value for `key` exists.
		   *
		   * @private
		   * @param {Object} cache The cache to query.
		   * @param {string} key The key of the entry to check.
		   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		   */
		  function cacheHas(cache, key) {
		    return cache.has(key);
		  }

		  /**
		   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
		   * that is not found in the character symbols.
		   *
		   * @private
		   * @param {Array} strSymbols The string symbols to inspect.
		   * @param {Array} chrSymbols The character symbols to find.
		   * @returns {number} Returns the index of the first unmatched string symbol.
		   */
		  function charsStartIndex(strSymbols, chrSymbols) {
		    var index = -1,
		        length = strSymbols.length;

		    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
		    return index;
		  }

		  /**
		   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
		   * that is not found in the character symbols.
		   *
		   * @private
		   * @param {Array} strSymbols The string symbols to inspect.
		   * @param {Array} chrSymbols The character symbols to find.
		   * @returns {number} Returns the index of the last unmatched string symbol.
		   */
		  function charsEndIndex(strSymbols, chrSymbols) {
		    var index = strSymbols.length;

		    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
		    return index;
		  }

		  /**
		   * Gets the number of `placeholder` occurrences in `array`.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} placeholder The placeholder to search for.
		   * @returns {number} Returns the placeholder count.
		   */
		  function countHolders(array, placeholder) {
		    var length = array.length,
		        result = 0;

		    while (length--) {
		      if (array[length] === placeholder) {
		        ++result;
		      }
		    }
		    return result;
		  }

		  /**
		   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
		   * letters to basic Latin letters.
		   *
		   * @private
		   * @param {string} letter The matched letter to deburr.
		   * @returns {string} Returns the deburred letter.
		   */
		  var deburrLetter = basePropertyOf(deburredLetters);

		  /**
		   * Used by `_.escape` to convert characters to HTML entities.
		   *
		   * @private
		   * @param {string} chr The matched character to escape.
		   * @returns {string} Returns the escaped character.
		   */
		  var escapeHtmlChar = basePropertyOf(htmlEscapes);

		  /**
		   * Used by `_.template` to escape characters for inclusion in compiled string literals.
		   *
		   * @private
		   * @param {string} chr The matched character to escape.
		   * @returns {string} Returns the escaped character.
		   */
		  function escapeStringChar(chr) {
		    return '\\' + stringEscapes[chr];
		  }

		  /**
		   * Gets the value at `key` of `object`.
		   *
		   * @private
		   * @param {Object} [object] The object to query.
		   * @param {string} key The key of the property to get.
		   * @returns {*} Returns the property value.
		   */
		  function getValue(object, key) {
		    return object == null ? undefined$1 : object[key];
		  }

		  /**
		   * Checks if `string` contains Unicode symbols.
		   *
		   * @private
		   * @param {string} string The string to inspect.
		   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
		   */
		  function hasUnicode(string) {
		    return reHasUnicode.test(string);
		  }

		  /**
		   * Checks if `string` contains a word composed of Unicode symbols.
		   *
		   * @private
		   * @param {string} string The string to inspect.
		   * @returns {boolean} Returns `true` if a word is found, else `false`.
		   */
		  function hasUnicodeWord(string) {
		    return reHasUnicodeWord.test(string);
		  }

		  /**
		   * Converts `iterator` to an array.
		   *
		   * @private
		   * @param {Object} iterator The iterator to convert.
		   * @returns {Array} Returns the converted array.
		   */
		  function iteratorToArray(iterator) {
		    var data,
		        result = [];

		    while (!(data = iterator.next()).done) {
		      result.push(data.value);
		    }
		    return result;
		  }

		  /**
		   * Converts `map` to its key-value pairs.
		   *
		   * @private
		   * @param {Object} map The map to convert.
		   * @returns {Array} Returns the key-value pairs.
		   */
		  function mapToArray(map) {
		    var index = -1,
		        result = Array(map.size);

		    map.forEach(function(value, key) {
		      result[++index] = [key, value];
		    });
		    return result;
		  }

		  /**
		   * Creates a unary function that invokes `func` with its argument transformed.
		   *
		   * @private
		   * @param {Function} func The function to wrap.
		   * @param {Function} transform The argument transform.
		   * @returns {Function} Returns the new function.
		   */
		  function overArg(func, transform) {
		    return function(arg) {
		      return func(transform(arg));
		    };
		  }

		  /**
		   * Replaces all `placeholder` elements in `array` with an internal placeholder
		   * and returns an array of their indexes.
		   *
		   * @private
		   * @param {Array} array The array to modify.
		   * @param {*} placeholder The placeholder to replace.
		   * @returns {Array} Returns the new array of placeholder indexes.
		   */
		  function replaceHolders(array, placeholder) {
		    var index = -1,
		        length = array.length,
		        resIndex = 0,
		        result = [];

		    while (++index < length) {
		      var value = array[index];
		      if (value === placeholder || value === PLACEHOLDER) {
		        array[index] = PLACEHOLDER;
		        result[resIndex++] = index;
		      }
		    }
		    return result;
		  }

		  /**
		   * Converts `set` to an array of its values.
		   *
		   * @private
		   * @param {Object} set The set to convert.
		   * @returns {Array} Returns the values.
		   */
		  function setToArray(set) {
		    var index = -1,
		        result = Array(set.size);

		    set.forEach(function(value) {
		      result[++index] = value;
		    });
		    return result;
		  }

		  /**
		   * Converts `set` to its value-value pairs.
		   *
		   * @private
		   * @param {Object} set The set to convert.
		   * @returns {Array} Returns the value-value pairs.
		   */
		  function setToPairs(set) {
		    var index = -1,
		        result = Array(set.size);

		    set.forEach(function(value) {
		      result[++index] = [value, value];
		    });
		    return result;
		  }

		  /**
		   * A specialized version of `_.indexOf` which performs strict equality
		   * comparisons of values, i.e. `===`.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} value The value to search for.
		   * @param {number} fromIndex The index to search from.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function strictIndexOf(array, value, fromIndex) {
		    var index = fromIndex - 1,
		        length = array.length;

		    while (++index < length) {
		      if (array[index] === value) {
		        return index;
		      }
		    }
		    return -1;
		  }

		  /**
		   * A specialized version of `_.lastIndexOf` which performs strict equality
		   * comparisons of values, i.e. `===`.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} value The value to search for.
		   * @param {number} fromIndex The index to search from.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function strictLastIndexOf(array, value, fromIndex) {
		    var index = fromIndex + 1;
		    while (index--) {
		      if (array[index] === value) {
		        return index;
		      }
		    }
		    return index;
		  }

		  /**
		   * Gets the number of symbols in `string`.
		   *
		   * @private
		   * @param {string} string The string to inspect.
		   * @returns {number} Returns the string size.
		   */
		  function stringSize(string) {
		    return hasUnicode(string)
		      ? unicodeSize(string)
		      : asciiSize(string);
		  }

		  /**
		   * Converts `string` to an array.
		   *
		   * @private
		   * @param {string} string The string to convert.
		   * @returns {Array} Returns the converted array.
		   */
		  function stringToArray(string) {
		    return hasUnicode(string)
		      ? unicodeToArray(string)
		      : asciiToArray(string);
		  }

		  /**
		   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
		   * character of `string`.
		   *
		   * @private
		   * @param {string} string The string to inspect.
		   * @returns {number} Returns the index of the last non-whitespace character.
		   */
		  function trimmedEndIndex(string) {
		    var index = string.length;

		    while (index-- && reWhitespace.test(string.charAt(index))) {}
		    return index;
		  }

		  /**
		   * Used by `_.unescape` to convert HTML entities to characters.
		   *
		   * @private
		   * @param {string} chr The matched character to unescape.
		   * @returns {string} Returns the unescaped character.
		   */
		  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

		  /**
		   * Gets the size of a Unicode `string`.
		   *
		   * @private
		   * @param {string} string The string inspect.
		   * @returns {number} Returns the string size.
		   */
		  function unicodeSize(string) {
		    var result = reUnicode.lastIndex = 0;
		    while (reUnicode.test(string)) {
		      ++result;
		    }
		    return result;
		  }

		  /**
		   * Converts a Unicode `string` to an array.
		   *
		   * @private
		   * @param {string} string The string to convert.
		   * @returns {Array} Returns the converted array.
		   */
		  function unicodeToArray(string) {
		    return string.match(reUnicode) || [];
		  }

		  /**
		   * Splits a Unicode `string` into an array of its words.
		   *
		   * @private
		   * @param {string} The string to inspect.
		   * @returns {Array} Returns the words of `string`.
		   */
		  function unicodeWords(string) {
		    return string.match(reUnicodeWord) || [];
		  }

		  /*--------------------------------------------------------------------------*/

		  /**
		   * Create a new pristine `lodash` function using the `context` object.
		   *
		   * @static
		   * @memberOf _
		   * @since 1.1.0
		   * @category Util
		   * @param {Object} [context=root] The context object.
		   * @returns {Function} Returns a new `lodash` function.
		   * @example
		   *
		   * _.mixin({ 'foo': _.constant('foo') });
		   *
		   * var lodash = _.runInContext();
		   * lodash.mixin({ 'bar': lodash.constant('bar') });
		   *
		   * _.isFunction(_.foo);
		   * // => true
		   * _.isFunction(_.bar);
		   * // => false
		   *
		   * lodash.isFunction(lodash.foo);
		   * // => false
		   * lodash.isFunction(lodash.bar);
		   * // => true
		   *
		   * // Create a suped-up `defer` in Node.js.
		   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
		   */
		  var runInContext = (function runInContext(context) {
		    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

		    /** Built-in constructor references. */
		    var Array = context.Array,
		        Date = context.Date,
		        Error = context.Error,
		        Function = context.Function,
		        Math = context.Math,
		        Object = context.Object,
		        RegExp = context.RegExp,
		        String = context.String,
		        TypeError = context.TypeError;

		    /** Used for built-in method references. */
		    var arrayProto = Array.prototype,
		        funcProto = Function.prototype,
		        objectProto = Object.prototype;

		    /** Used to detect overreaching core-js shims. */
		    var coreJsData = context['__core-js_shared__'];

		    /** Used to resolve the decompiled source of functions. */
		    var funcToString = funcProto.toString;

		    /** Used to check objects for own properties. */
		    var hasOwnProperty = objectProto.hasOwnProperty;

		    /** Used to generate unique IDs. */
		    var idCounter = 0;

		    /** Used to detect methods masquerading as native. */
		    var maskSrcKey = (function() {
		      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
		      return uid ? ('Symbol(src)_1.' + uid) : '';
		    }());

		    /**
		     * Used to resolve the
		     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
		     * of values.
		     */
		    var nativeObjectToString = objectProto.toString;

		    /** Used to infer the `Object` constructor. */
		    var objectCtorString = funcToString.call(Object);

		    /** Used to restore the original `_` reference in `_.noConflict`. */
		    var oldDash = root._;

		    /** Used to detect if a method is native. */
		    var reIsNative = RegExp('^' +
		      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
		      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
		    );

		    /** Built-in value references. */
		    var Buffer = moduleExports ? context.Buffer : undefined$1,
		        Symbol = context.Symbol,
		        Uint8Array = context.Uint8Array,
		        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1,
		        getPrototype = overArg(Object.getPrototypeOf, Object),
		        objectCreate = Object.create,
		        propertyIsEnumerable = objectProto.propertyIsEnumerable,
		        splice = arrayProto.splice,
		        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined$1,
		        symIterator = Symbol ? Symbol.iterator : undefined$1,
		        symToStringTag = Symbol ? Symbol.toStringTag : undefined$1;

		    var defineProperty = (function() {
		      try {
		        var func = getNative(Object, 'defineProperty');
		        func({}, '', {});
		        return func;
		      } catch (e) {}
		    }());

		    /** Mocked built-ins. */
		    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
		        ctxNow = Date && Date.now !== root.Date.now && Date.now,
		        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

		    /* Built-in method references for those with the same name as other `lodash` methods. */
		    var nativeCeil = Math.ceil,
		        nativeFloor = Math.floor,
		        nativeGetSymbols = Object.getOwnPropertySymbols,
		        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1,
		        nativeIsFinite = context.isFinite,
		        nativeJoin = arrayProto.join,
		        nativeKeys = overArg(Object.keys, Object),
		        nativeMax = Math.max,
		        nativeMin = Math.min,
		        nativeNow = Date.now,
		        nativeParseInt = context.parseInt,
		        nativeRandom = Math.random,
		        nativeReverse = arrayProto.reverse;

		    /* Built-in method references that are verified to be native. */
		    var DataView = getNative(context, 'DataView'),
		        Map = getNative(context, 'Map'),
		        Promise = getNative(context, 'Promise'),
		        Set = getNative(context, 'Set'),
		        WeakMap = getNative(context, 'WeakMap'),
		        nativeCreate = getNative(Object, 'create');

		    /** Used to store function metadata. */
		    var metaMap = WeakMap && new WeakMap;

		    /** Used to lookup unminified function names. */
		    var realNames = {};

		    /** Used to detect maps, sets, and weakmaps. */
		    var dataViewCtorString = toSource(DataView),
		        mapCtorString = toSource(Map),
		        promiseCtorString = toSource(Promise),
		        setCtorString = toSource(Set),
		        weakMapCtorString = toSource(WeakMap);

		    /** Used to convert symbols to primitives and strings. */
		    var symbolProto = Symbol ? Symbol.prototype : undefined$1,
		        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1,
		        symbolToString = symbolProto ? symbolProto.toString : undefined$1;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a `lodash` object which wraps `value` to enable implicit method
		     * chain sequences. Methods that operate on and return arrays, collections,
		     * and functions can be chained together. Methods that retrieve a single value
		     * or may return a primitive value will automatically end the chain sequence
		     * and return the unwrapped value. Otherwise, the value must be unwrapped
		     * with `_#value`.
		     *
		     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
		     * enabled using `_.chain`.
		     *
		     * The execution of chained methods is lazy, that is, it's deferred until
		     * `_#value` is implicitly or explicitly called.
		     *
		     * Lazy evaluation allows several methods to support shortcut fusion.
		     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
		     * the creation of intermediate arrays and can greatly reduce the number of
		     * iteratee executions. Sections of a chain sequence qualify for shortcut
		     * fusion if the section is applied to an array and iteratees accept only
		     * one argument. The heuristic for whether a section qualifies for shortcut
		     * fusion is subject to change.
		     *
		     * Chaining is supported in custom builds as long as the `_#value` method is
		     * directly or indirectly included in the build.
		     *
		     * In addition to lodash methods, wrappers have `Array` and `String` methods.
		     *
		     * The wrapper `Array` methods are:
		     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
		     *
		     * The wrapper `String` methods are:
		     * `replace` and `split`
		     *
		     * The wrapper methods that support shortcut fusion are:
		     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
		     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
		     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
		     *
		     * The chainable wrapper methods are:
		     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
		     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
		     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
		     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
		     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
		     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
		     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
		     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
		     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
		     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
		     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
		     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
		     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
		     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
		     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
		     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
		     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
		     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
		     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
		     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
		     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
		     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
		     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
		     * `zipObject`, `zipObjectDeep`, and `zipWith`
		     *
		     * The wrapper methods that are **not** chainable by default are:
		     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
		     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
		     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
		     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
		     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
		     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
		     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
		     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
		     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
		     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
		     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
		     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
		     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
		     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
		     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
		     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
		     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
		     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
		     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
		     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
		     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
		     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
		     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
		     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
		     * `upperFirst`, `value`, and `words`
		     *
		     * @name _
		     * @constructor
		     * @category Seq
		     * @param {*} value The value to wrap in a `lodash` instance.
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var wrapped = _([1, 2, 3]);
		     *
		     * // Returns an unwrapped value.
		     * wrapped.reduce(_.add);
		     * // => 6
		     *
		     * // Returns a wrapped value.
		     * var squares = wrapped.map(square);
		     *
		     * _.isArray(squares);
		     * // => false
		     *
		     * _.isArray(squares.value());
		     * // => true
		     */
		    function lodash(value) {
		      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
		        if (value instanceof LodashWrapper) {
		          return value;
		        }
		        if (hasOwnProperty.call(value, '__wrapped__')) {
		          return wrapperClone(value);
		        }
		      }
		      return new LodashWrapper(value);
		    }

		    /**
		     * The base implementation of `_.create` without support for assigning
		     * properties to the created object.
		     *
		     * @private
		     * @param {Object} proto The object to inherit from.
		     * @returns {Object} Returns the new object.
		     */
		    var baseCreate = (function() {
		      function object() {}
		      return function(proto) {
		        if (!isObject(proto)) {
		          return {};
		        }
		        if (objectCreate) {
		          return objectCreate(proto);
		        }
		        object.prototype = proto;
		        var result = new object;
		        object.prototype = undefined$1;
		        return result;
		      };
		    }());

		    /**
		     * The function whose prototype chain sequence wrappers inherit from.
		     *
		     * @private
		     */
		    function baseLodash() {
		      // No operation performed.
		    }

		    /**
		     * The base constructor for creating `lodash` wrapper objects.
		     *
		     * @private
		     * @param {*} value The value to wrap.
		     * @param {boolean} [chainAll] Enable explicit method chain sequences.
		     */
		    function LodashWrapper(value, chainAll) {
		      this.__wrapped__ = value;
		      this.__actions__ = [];
		      this.__chain__ = !!chainAll;
		      this.__index__ = 0;
		      this.__values__ = undefined$1;
		    }

		    /**
		     * By default, the template delimiters used by lodash are like those in
		     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
		     * following template settings to use alternative delimiters.
		     *
		     * @static
		     * @memberOf _
		     * @type {Object}
		     */
		    lodash.templateSettings = {

		      /**
		       * Used to detect `data` property values to be HTML-escaped.
		       *
		       * @memberOf _.templateSettings
		       * @type {RegExp}
		       */
		      'escape': reEscape,

		      /**
		       * Used to detect code to be evaluated.
		       *
		       * @memberOf _.templateSettings
		       * @type {RegExp}
		       */
		      'evaluate': reEvaluate,

		      /**
		       * Used to detect `data` property values to inject.
		       *
		       * @memberOf _.templateSettings
		       * @type {RegExp}
		       */
		      'interpolate': reInterpolate,

		      /**
		       * Used to reference the data object in the template text.
		       *
		       * @memberOf _.templateSettings
		       * @type {string}
		       */
		      'variable': '',

		      /**
		       * Used to import variables into the compiled template.
		       *
		       * @memberOf _.templateSettings
		       * @type {Object}
		       */
		      'imports': {

		        /**
		         * A reference to the `lodash` function.
		         *
		         * @memberOf _.templateSettings.imports
		         * @type {Function}
		         */
		        '_': lodash
		      }
		    };

		    // Ensure wrappers are instances of `baseLodash`.
		    lodash.prototype = baseLodash.prototype;
		    lodash.prototype.constructor = lodash;

		    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
		    LodashWrapper.prototype.constructor = LodashWrapper;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
		     *
		     * @private
		     * @constructor
		     * @param {*} value The value to wrap.
		     */
		    function LazyWrapper(value) {
		      this.__wrapped__ = value;
		      this.__actions__ = [];
		      this.__dir__ = 1;
		      this.__filtered__ = false;
		      this.__iteratees__ = [];
		      this.__takeCount__ = MAX_ARRAY_LENGTH;
		      this.__views__ = [];
		    }

		    /**
		     * Creates a clone of the lazy wrapper object.
		     *
		     * @private
		     * @name clone
		     * @memberOf LazyWrapper
		     * @returns {Object} Returns the cloned `LazyWrapper` object.
		     */
		    function lazyClone() {
		      var result = new LazyWrapper(this.__wrapped__);
		      result.__actions__ = copyArray(this.__actions__);
		      result.__dir__ = this.__dir__;
		      result.__filtered__ = this.__filtered__;
		      result.__iteratees__ = copyArray(this.__iteratees__);
		      result.__takeCount__ = this.__takeCount__;
		      result.__views__ = copyArray(this.__views__);
		      return result;
		    }

		    /**
		     * Reverses the direction of lazy iteration.
		     *
		     * @private
		     * @name reverse
		     * @memberOf LazyWrapper
		     * @returns {Object} Returns the new reversed `LazyWrapper` object.
		     */
		    function lazyReverse() {
		      if (this.__filtered__) {
		        var result = new LazyWrapper(this);
		        result.__dir__ = -1;
		        result.__filtered__ = true;
		      } else {
		        result = this.clone();
		        result.__dir__ *= -1;
		      }
		      return result;
		    }

		    /**
		     * Extracts the unwrapped value from its lazy wrapper.
		     *
		     * @private
		     * @name value
		     * @memberOf LazyWrapper
		     * @returns {*} Returns the unwrapped value.
		     */
		    function lazyValue() {
		      var array = this.__wrapped__.value(),
		          dir = this.__dir__,
		          isArr = isArray(array),
		          isRight = dir < 0,
		          arrLength = isArr ? array.length : 0,
		          view = getView(0, arrLength, this.__views__),
		          start = view.start,
		          end = view.end,
		          length = end - start,
		          index = isRight ? end : (start - 1),
		          iteratees = this.__iteratees__,
		          iterLength = iteratees.length,
		          resIndex = 0,
		          takeCount = nativeMin(length, this.__takeCount__);

		      if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
		        return baseWrapperValue(array, this.__actions__);
		      }
		      var result = [];

		      outer:
		      while (length-- && resIndex < takeCount) {
		        index += dir;

		        var iterIndex = -1,
		            value = array[index];

		        while (++iterIndex < iterLength) {
		          var data = iteratees[iterIndex],
		              iteratee = data.iteratee,
		              type = data.type,
		              computed = iteratee(value);

		          if (type == LAZY_MAP_FLAG) {
		            value = computed;
		          } else if (!computed) {
		            if (type == LAZY_FILTER_FLAG) {
		              continue outer;
		            } else {
		              break outer;
		            }
		          }
		        }
		        result[resIndex++] = value;
		      }
		      return result;
		    }

		    // Ensure `LazyWrapper` is an instance of `baseLodash`.
		    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
		    LazyWrapper.prototype.constructor = LazyWrapper;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a hash object.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [entries] The key-value pairs to cache.
		     */
		    function Hash(entries) {
		      var index = -1,
		          length = entries == null ? 0 : entries.length;

		      this.clear();
		      while (++index < length) {
		        var entry = entries[index];
		        this.set(entry[0], entry[1]);
		      }
		    }

		    /**
		     * Removes all key-value entries from the hash.
		     *
		     * @private
		     * @name clear
		     * @memberOf Hash
		     */
		    function hashClear() {
		      this.__data__ = nativeCreate ? nativeCreate(null) : {};
		      this.size = 0;
		    }

		    /**
		     * Removes `key` and its value from the hash.
		     *
		     * @private
		     * @name delete
		     * @memberOf Hash
		     * @param {Object} hash The hash to modify.
		     * @param {string} key The key of the value to remove.
		     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		     */
		    function hashDelete(key) {
		      var result = this.has(key) && delete this.__data__[key];
		      this.size -= result ? 1 : 0;
		      return result;
		    }

		    /**
		     * Gets the hash value for `key`.
		     *
		     * @private
		     * @name get
		     * @memberOf Hash
		     * @param {string} key The key of the value to get.
		     * @returns {*} Returns the entry value.
		     */
		    function hashGet(key) {
		      var data = this.__data__;
		      if (nativeCreate) {
		        var result = data[key];
		        return result === HASH_UNDEFINED ? undefined$1 : result;
		      }
		      return hasOwnProperty.call(data, key) ? data[key] : undefined$1;
		    }

		    /**
		     * Checks if a hash value for `key` exists.
		     *
		     * @private
		     * @name has
		     * @memberOf Hash
		     * @param {string} key The key of the entry to check.
		     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		     */
		    function hashHas(key) {
		      var data = this.__data__;
		      return nativeCreate ? (data[key] !== undefined$1) : hasOwnProperty.call(data, key);
		    }

		    /**
		     * Sets the hash `key` to `value`.
		     *
		     * @private
		     * @name set
		     * @memberOf Hash
		     * @param {string} key The key of the value to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns the hash instance.
		     */
		    function hashSet(key, value) {
		      var data = this.__data__;
		      this.size += this.has(key) ? 0 : 1;
		      data[key] = (nativeCreate && value === undefined$1) ? HASH_UNDEFINED : value;
		      return this;
		    }

		    // Add methods to `Hash`.
		    Hash.prototype.clear = hashClear;
		    Hash.prototype['delete'] = hashDelete;
		    Hash.prototype.get = hashGet;
		    Hash.prototype.has = hashHas;
		    Hash.prototype.set = hashSet;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates an list cache object.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [entries] The key-value pairs to cache.
		     */
		    function ListCache(entries) {
		      var index = -1,
		          length = entries == null ? 0 : entries.length;

		      this.clear();
		      while (++index < length) {
		        var entry = entries[index];
		        this.set(entry[0], entry[1]);
		      }
		    }

		    /**
		     * Removes all key-value entries from the list cache.
		     *
		     * @private
		     * @name clear
		     * @memberOf ListCache
		     */
		    function listCacheClear() {
		      this.__data__ = [];
		      this.size = 0;
		    }

		    /**
		     * Removes `key` and its value from the list cache.
		     *
		     * @private
		     * @name delete
		     * @memberOf ListCache
		     * @param {string} key The key of the value to remove.
		     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		     */
		    function listCacheDelete(key) {
		      var data = this.__data__,
		          index = assocIndexOf(data, key);

		      if (index < 0) {
		        return false;
		      }
		      var lastIndex = data.length - 1;
		      if (index == lastIndex) {
		        data.pop();
		      } else {
		        splice.call(data, index, 1);
		      }
		      --this.size;
		      return true;
		    }

		    /**
		     * Gets the list cache value for `key`.
		     *
		     * @private
		     * @name get
		     * @memberOf ListCache
		     * @param {string} key The key of the value to get.
		     * @returns {*} Returns the entry value.
		     */
		    function listCacheGet(key) {
		      var data = this.__data__,
		          index = assocIndexOf(data, key);

		      return index < 0 ? undefined$1 : data[index][1];
		    }

		    /**
		     * Checks if a list cache value for `key` exists.
		     *
		     * @private
		     * @name has
		     * @memberOf ListCache
		     * @param {string} key The key of the entry to check.
		     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		     */
		    function listCacheHas(key) {
		      return assocIndexOf(this.__data__, key) > -1;
		    }

		    /**
		     * Sets the list cache `key` to `value`.
		     *
		     * @private
		     * @name set
		     * @memberOf ListCache
		     * @param {string} key The key of the value to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns the list cache instance.
		     */
		    function listCacheSet(key, value) {
		      var data = this.__data__,
		          index = assocIndexOf(data, key);

		      if (index < 0) {
		        ++this.size;
		        data.push([key, value]);
		      } else {
		        data[index][1] = value;
		      }
		      return this;
		    }

		    // Add methods to `ListCache`.
		    ListCache.prototype.clear = listCacheClear;
		    ListCache.prototype['delete'] = listCacheDelete;
		    ListCache.prototype.get = listCacheGet;
		    ListCache.prototype.has = listCacheHas;
		    ListCache.prototype.set = listCacheSet;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a map cache object to store key-value pairs.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [entries] The key-value pairs to cache.
		     */
		    function MapCache(entries) {
		      var index = -1,
		          length = entries == null ? 0 : entries.length;

		      this.clear();
		      while (++index < length) {
		        var entry = entries[index];
		        this.set(entry[0], entry[1]);
		      }
		    }

		    /**
		     * Removes all key-value entries from the map.
		     *
		     * @private
		     * @name clear
		     * @memberOf MapCache
		     */
		    function mapCacheClear() {
		      this.size = 0;
		      this.__data__ = {
		        'hash': new Hash,
		        'map': new (Map || ListCache),
		        'string': new Hash
		      };
		    }

		    /**
		     * Removes `key` and its value from the map.
		     *
		     * @private
		     * @name delete
		     * @memberOf MapCache
		     * @param {string} key The key of the value to remove.
		     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		     */
		    function mapCacheDelete(key) {
		      var result = getMapData(this, key)['delete'](key);
		      this.size -= result ? 1 : 0;
		      return result;
		    }

		    /**
		     * Gets the map value for `key`.
		     *
		     * @private
		     * @name get
		     * @memberOf MapCache
		     * @param {string} key The key of the value to get.
		     * @returns {*} Returns the entry value.
		     */
		    function mapCacheGet(key) {
		      return getMapData(this, key).get(key);
		    }

		    /**
		     * Checks if a map value for `key` exists.
		     *
		     * @private
		     * @name has
		     * @memberOf MapCache
		     * @param {string} key The key of the entry to check.
		     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		     */
		    function mapCacheHas(key) {
		      return getMapData(this, key).has(key);
		    }

		    /**
		     * Sets the map `key` to `value`.
		     *
		     * @private
		     * @name set
		     * @memberOf MapCache
		     * @param {string} key The key of the value to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns the map cache instance.
		     */
		    function mapCacheSet(key, value) {
		      var data = getMapData(this, key),
		          size = data.size;

		      data.set(key, value);
		      this.size += data.size == size ? 0 : 1;
		      return this;
		    }

		    // Add methods to `MapCache`.
		    MapCache.prototype.clear = mapCacheClear;
		    MapCache.prototype['delete'] = mapCacheDelete;
		    MapCache.prototype.get = mapCacheGet;
		    MapCache.prototype.has = mapCacheHas;
		    MapCache.prototype.set = mapCacheSet;

		    /*------------------------------------------------------------------------*/

		    /**
		     *
		     * Creates an array cache object to store unique values.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [values] The values to cache.
		     */
		    function SetCache(values) {
		      var index = -1,
		          length = values == null ? 0 : values.length;

		      this.__data__ = new MapCache;
		      while (++index < length) {
		        this.add(values[index]);
		      }
		    }

		    /**
		     * Adds `value` to the array cache.
		     *
		     * @private
		     * @name add
		     * @memberOf SetCache
		     * @alias push
		     * @param {*} value The value to cache.
		     * @returns {Object} Returns the cache instance.
		     */
		    function setCacheAdd(value) {
		      this.__data__.set(value, HASH_UNDEFINED);
		      return this;
		    }

		    /**
		     * Checks if `value` is in the array cache.
		     *
		     * @private
		     * @name has
		     * @memberOf SetCache
		     * @param {*} value The value to search for.
		     * @returns {number} Returns `true` if `value` is found, else `false`.
		     */
		    function setCacheHas(value) {
		      return this.__data__.has(value);
		    }

		    // Add methods to `SetCache`.
		    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
		    SetCache.prototype.has = setCacheHas;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a stack cache object to store key-value pairs.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [entries] The key-value pairs to cache.
		     */
		    function Stack(entries) {
		      var data = this.__data__ = new ListCache(entries);
		      this.size = data.size;
		    }

		    /**
		     * Removes all key-value entries from the stack.
		     *
		     * @private
		     * @name clear
		     * @memberOf Stack
		     */
		    function stackClear() {
		      this.__data__ = new ListCache;
		      this.size = 0;
		    }

		    /**
		     * Removes `key` and its value from the stack.
		     *
		     * @private
		     * @name delete
		     * @memberOf Stack
		     * @param {string} key The key of the value to remove.
		     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		     */
		    function stackDelete(key) {
		      var data = this.__data__,
		          result = data['delete'](key);

		      this.size = data.size;
		      return result;
		    }

		    /**
		     * Gets the stack value for `key`.
		     *
		     * @private
		     * @name get
		     * @memberOf Stack
		     * @param {string} key The key of the value to get.
		     * @returns {*} Returns the entry value.
		     */
		    function stackGet(key) {
		      return this.__data__.get(key);
		    }

		    /**
		     * Checks if a stack value for `key` exists.
		     *
		     * @private
		     * @name has
		     * @memberOf Stack
		     * @param {string} key The key of the entry to check.
		     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		     */
		    function stackHas(key) {
		      return this.__data__.has(key);
		    }

		    /**
		     * Sets the stack `key` to `value`.
		     *
		     * @private
		     * @name set
		     * @memberOf Stack
		     * @param {string} key The key of the value to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns the stack cache instance.
		     */
		    function stackSet(key, value) {
		      var data = this.__data__;
		      if (data instanceof ListCache) {
		        var pairs = data.__data__;
		        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
		          pairs.push([key, value]);
		          this.size = ++data.size;
		          return this;
		        }
		        data = this.__data__ = new MapCache(pairs);
		      }
		      data.set(key, value);
		      this.size = data.size;
		      return this;
		    }

		    // Add methods to `Stack`.
		    Stack.prototype.clear = stackClear;
		    Stack.prototype['delete'] = stackDelete;
		    Stack.prototype.get = stackGet;
		    Stack.prototype.has = stackHas;
		    Stack.prototype.set = stackSet;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates an array of the enumerable property names of the array-like `value`.
		     *
		     * @private
		     * @param {*} value The value to query.
		     * @param {boolean} inherited Specify returning inherited property names.
		     * @returns {Array} Returns the array of property names.
		     */
		    function arrayLikeKeys(value, inherited) {
		      var isArr = isArray(value),
		          isArg = !isArr && isArguments(value),
		          isBuff = !isArr && !isArg && isBuffer(value),
		          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
		          skipIndexes = isArr || isArg || isBuff || isType,
		          result = skipIndexes ? baseTimes(value.length, String) : [],
		          length = result.length;

		      for (var key in value) {
		        if ((inherited || hasOwnProperty.call(value, key)) &&
		            !(skipIndexes && (
		               // Safari 9 has enumerable `arguments.length` in strict mode.
		               key == 'length' ||
		               // Node.js 0.10 has enumerable non-index properties on buffers.
		               (isBuff && (key == 'offset' || key == 'parent')) ||
		               // PhantomJS 2 has enumerable non-index properties on typed arrays.
		               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
		               // Skip index properties.
		               isIndex(key, length)
		            ))) {
		          result.push(key);
		        }
		      }
		      return result;
		    }

		    /**
		     * A specialized version of `_.sample` for arrays.
		     *
		     * @private
		     * @param {Array} array The array to sample.
		     * @returns {*} Returns the random element.
		     */
		    function arraySample(array) {
		      var length = array.length;
		      return length ? array[baseRandom(0, length - 1)] : undefined$1;
		    }

		    /**
		     * A specialized version of `_.sampleSize` for arrays.
		     *
		     * @private
		     * @param {Array} array The array to sample.
		     * @param {number} n The number of elements to sample.
		     * @returns {Array} Returns the random elements.
		     */
		    function arraySampleSize(array, n) {
		      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
		    }

		    /**
		     * A specialized version of `_.shuffle` for arrays.
		     *
		     * @private
		     * @param {Array} array The array to shuffle.
		     * @returns {Array} Returns the new shuffled array.
		     */
		    function arrayShuffle(array) {
		      return shuffleSelf(copyArray(array));
		    }

		    /**
		     * This function is like `assignValue` except that it doesn't assign
		     * `undefined` values.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {string} key The key of the property to assign.
		     * @param {*} value The value to assign.
		     */
		    function assignMergeValue(object, key, value) {
		      if ((value !== undefined$1 && !eq(object[key], value)) ||
		          (value === undefined$1 && !(key in object))) {
		        baseAssignValue(object, key, value);
		      }
		    }

		    /**
		     * Assigns `value` to `key` of `object` if the existing value is not equivalent
		     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {string} key The key of the property to assign.
		     * @param {*} value The value to assign.
		     */
		    function assignValue(object, key, value) {
		      var objValue = object[key];
		      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
		          (value === undefined$1 && !(key in object))) {
		        baseAssignValue(object, key, value);
		      }
		    }

		    /**
		     * Gets the index at which the `key` is found in `array` of key-value pairs.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {*} key The key to search for.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     */
		    function assocIndexOf(array, key) {
		      var length = array.length;
		      while (length--) {
		        if (eq(array[length][0], key)) {
		          return length;
		        }
		      }
		      return -1;
		    }

		    /**
		     * Aggregates elements of `collection` on `accumulator` with keys transformed
		     * by `iteratee` and values set by `setter`.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} setter The function to set `accumulator` values.
		     * @param {Function} iteratee The iteratee to transform keys.
		     * @param {Object} accumulator The initial aggregated object.
		     * @returns {Function} Returns `accumulator`.
		     */
		    function baseAggregator(collection, setter, iteratee, accumulator) {
		      baseEach(collection, function(value, key, collection) {
		        setter(accumulator, value, iteratee(value), collection);
		      });
		      return accumulator;
		    }

		    /**
		     * The base implementation of `_.assign` without support for multiple sources
		     * or `customizer` functions.
		     *
		     * @private
		     * @param {Object} object The destination object.
		     * @param {Object} source The source object.
		     * @returns {Object} Returns `object`.
		     */
		    function baseAssign(object, source) {
		      return object && copyObject(source, keys(source), object);
		    }

		    /**
		     * The base implementation of `_.assignIn` without support for multiple sources
		     * or `customizer` functions.
		     *
		     * @private
		     * @param {Object} object The destination object.
		     * @param {Object} source The source object.
		     * @returns {Object} Returns `object`.
		     */
		    function baseAssignIn(object, source) {
		      return object && copyObject(source, keysIn(source), object);
		    }

		    /**
		     * The base implementation of `assignValue` and `assignMergeValue` without
		     * value checks.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {string} key The key of the property to assign.
		     * @param {*} value The value to assign.
		     */
		    function baseAssignValue(object, key, value) {
		      if (key == '__proto__' && defineProperty) {
		        defineProperty(object, key, {
		          'configurable': true,
		          'enumerable': true,
		          'value': value,
		          'writable': true
		        });
		      } else {
		        object[key] = value;
		      }
		    }

		    /**
		     * The base implementation of `_.at` without support for individual paths.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {string[]} paths The property paths to pick.
		     * @returns {Array} Returns the picked elements.
		     */
		    function baseAt(object, paths) {
		      var index = -1,
		          length = paths.length,
		          result = Array(length),
		          skip = object == null;

		      while (++index < length) {
		        result[index] = skip ? undefined$1 : get(object, paths[index]);
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.clamp` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {number} number The number to clamp.
		     * @param {number} [lower] The lower bound.
		     * @param {number} upper The upper bound.
		     * @returns {number} Returns the clamped number.
		     */
		    function baseClamp(number, lower, upper) {
		      if (number === number) {
		        if (upper !== undefined$1) {
		          number = number <= upper ? number : upper;
		        }
		        if (lower !== undefined$1) {
		          number = number >= lower ? number : lower;
		        }
		      }
		      return number;
		    }

		    /**
		     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
		     * traversed objects.
		     *
		     * @private
		     * @param {*} value The value to clone.
		     * @param {boolean} bitmask The bitmask flags.
		     *  1 - Deep clone
		     *  2 - Flatten inherited properties
		     *  4 - Clone symbols
		     * @param {Function} [customizer] The function to customize cloning.
		     * @param {string} [key] The key of `value`.
		     * @param {Object} [object] The parent object of `value`.
		     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
		     * @returns {*} Returns the cloned value.
		     */
		    function baseClone(value, bitmask, customizer, key, object, stack) {
		      var result,
		          isDeep = bitmask & CLONE_DEEP_FLAG,
		          isFlat = bitmask & CLONE_FLAT_FLAG,
		          isFull = bitmask & CLONE_SYMBOLS_FLAG;

		      if (customizer) {
		        result = object ? customizer(value, key, object, stack) : customizer(value);
		      }
		      if (result !== undefined$1) {
		        return result;
		      }
		      if (!isObject(value)) {
		        return value;
		      }
		      var isArr = isArray(value);
		      if (isArr) {
		        result = initCloneArray(value);
		        if (!isDeep) {
		          return copyArray(value, result);
		        }
		      } else {
		        var tag = getTag(value),
		            isFunc = tag == funcTag || tag == genTag;

		        if (isBuffer(value)) {
		          return cloneBuffer(value, isDeep);
		        }
		        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
		          result = (isFlat || isFunc) ? {} : initCloneObject(value);
		          if (!isDeep) {
		            return isFlat
		              ? copySymbolsIn(value, baseAssignIn(result, value))
		              : copySymbols(value, baseAssign(result, value));
		          }
		        } else {
		          if (!cloneableTags[tag]) {
		            return object ? value : {};
		          }
		          result = initCloneByTag(value, tag, isDeep);
		        }
		      }
		      // Check for circular references and return its corresponding clone.
		      stack || (stack = new Stack);
		      var stacked = stack.get(value);
		      if (stacked) {
		        return stacked;
		      }
		      stack.set(value, result);

		      if (isSet(value)) {
		        value.forEach(function(subValue) {
		          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
		        });
		      } else if (isMap(value)) {
		        value.forEach(function(subValue, key) {
		          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
		        });
		      }

		      var keysFunc = isFull
		        ? (isFlat ? getAllKeysIn : getAllKeys)
		        : (isFlat ? keysIn : keys);

		      var props = isArr ? undefined$1 : keysFunc(value);
		      arrayEach(props || value, function(subValue, key) {
		        if (props) {
		          key = subValue;
		          subValue = value[key];
		        }
		        // Recursively populate clone (susceptible to call stack limits).
		        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
		      });
		      return result;
		    }

		    /**
		     * The base implementation of `_.conforms` which doesn't clone `source`.
		     *
		     * @private
		     * @param {Object} source The object of property predicates to conform to.
		     * @returns {Function} Returns the new spec function.
		     */
		    function baseConforms(source) {
		      var props = keys(source);
		      return function(object) {
		        return baseConformsTo(object, source, props);
		      };
		    }

		    /**
		     * The base implementation of `_.conformsTo` which accepts `props` to check.
		     *
		     * @private
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property predicates to conform to.
		     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
		     */
		    function baseConformsTo(object, source, props) {
		      var length = props.length;
		      if (object == null) {
		        return !length;
		      }
		      object = Object(object);
		      while (length--) {
		        var key = props[length],
		            predicate = source[key],
		            value = object[key];

		        if ((value === undefined$1 && !(key in object)) || !predicate(value)) {
		          return false;
		        }
		      }
		      return true;
		    }

		    /**
		     * The base implementation of `_.delay` and `_.defer` which accepts `args`
		     * to provide to `func`.
		     *
		     * @private
		     * @param {Function} func The function to delay.
		     * @param {number} wait The number of milliseconds to delay invocation.
		     * @param {Array} args The arguments to provide to `func`.
		     * @returns {number|Object} Returns the timer id or timeout object.
		     */
		    function baseDelay(func, wait, args) {
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      return setTimeout(function() { func.apply(undefined$1, args); }, wait);
		    }

		    /**
		     * The base implementation of methods like `_.difference` without support
		     * for excluding multiple arrays or iteratee shorthands.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {Array} values The values to exclude.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     */
		    function baseDifference(array, values, iteratee, comparator) {
		      var index = -1,
		          includes = arrayIncludes,
		          isCommon = true,
		          length = array.length,
		          result = [],
		          valuesLength = values.length;

		      if (!length) {
		        return result;
		      }
		      if (iteratee) {
		        values = arrayMap(values, baseUnary(iteratee));
		      }
		      if (comparator) {
		        includes = arrayIncludesWith;
		        isCommon = false;
		      }
		      else if (values.length >= LARGE_ARRAY_SIZE) {
		        includes = cacheHas;
		        isCommon = false;
		        values = new SetCache(values);
		      }
		      outer:
		      while (++index < length) {
		        var value = array[index],
		            computed = iteratee == null ? value : iteratee(value);

		        value = (comparator || value !== 0) ? value : 0;
		        if (isCommon && computed === computed) {
		          var valuesIndex = valuesLength;
		          while (valuesIndex--) {
		            if (values[valuesIndex] === computed) {
		              continue outer;
		            }
		          }
		          result.push(value);
		        }
		        else if (!includes(values, computed, comparator)) {
		          result.push(value);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.forEach` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Array|Object} Returns `collection`.
		     */
		    var baseEach = createBaseEach(baseForOwn);

		    /**
		     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Array|Object} Returns `collection`.
		     */
		    var baseEachRight = createBaseEach(baseForOwnRight, true);

		    /**
		     * The base implementation of `_.every` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} predicate The function invoked per iteration.
		     * @returns {boolean} Returns `true` if all elements pass the predicate check,
		     *  else `false`
		     */
		    function baseEvery(collection, predicate) {
		      var result = true;
		      baseEach(collection, function(value, index, collection) {
		        result = !!predicate(value, index, collection);
		        return result;
		      });
		      return result;
		    }

		    /**
		     * The base implementation of methods like `_.max` and `_.min` which accepts a
		     * `comparator` to determine the extremum value.
		     *
		     * @private
		     * @param {Array} array The array to iterate over.
		     * @param {Function} iteratee The iteratee invoked per iteration.
		     * @param {Function} comparator The comparator used to compare values.
		     * @returns {*} Returns the extremum value.
		     */
		    function baseExtremum(array, iteratee, comparator) {
		      var index = -1,
		          length = array.length;

		      while (++index < length) {
		        var value = array[index],
		            current = iteratee(value);

		        if (current != null && (computed === undefined$1
		              ? (current === current && !isSymbol(current))
		              : comparator(current, computed)
		            )) {
		          var computed = current,
		              result = value;
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.fill` without an iteratee call guard.
		     *
		     * @private
		     * @param {Array} array The array to fill.
		     * @param {*} value The value to fill `array` with.
		     * @param {number} [start=0] The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns `array`.
		     */
		    function baseFill(array, value, start, end) {
		      var length = array.length;

		      start = toInteger(start);
		      if (start < 0) {
		        start = -start > length ? 0 : (length + start);
		      }
		      end = (end === undefined$1 || end > length) ? length : toInteger(end);
		      if (end < 0) {
		        end += length;
		      }
		      end = start > end ? 0 : toLength(end);
		      while (start < end) {
		        array[start++] = value;
		      }
		      return array;
		    }

		    /**
		     * The base implementation of `_.filter` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} predicate The function invoked per iteration.
		     * @returns {Array} Returns the new filtered array.
		     */
		    function baseFilter(collection, predicate) {
		      var result = [];
		      baseEach(collection, function(value, index, collection) {
		        if (predicate(value, index, collection)) {
		          result.push(value);
		        }
		      });
		      return result;
		    }

		    /**
		     * The base implementation of `_.flatten` with support for restricting flattening.
		     *
		     * @private
		     * @param {Array} array The array to flatten.
		     * @param {number} depth The maximum recursion depth.
		     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
		     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
		     * @param {Array} [result=[]] The initial result value.
		     * @returns {Array} Returns the new flattened array.
		     */
		    function baseFlatten(array, depth, predicate, isStrict, result) {
		      var index = -1,
		          length = array.length;

		      predicate || (predicate = isFlattenable);
		      result || (result = []);

		      while (++index < length) {
		        var value = array[index];
		        if (depth > 0 && predicate(value)) {
		          if (depth > 1) {
		            // Recursively flatten arrays (susceptible to call stack limits).
		            baseFlatten(value, depth - 1, predicate, isStrict, result);
		          } else {
		            arrayPush(result, value);
		          }
		        } else if (!isStrict) {
		          result[result.length] = value;
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `baseForOwn` which iterates over `object`
		     * properties returned by `keysFunc` and invokes `iteratee` for each property.
		     * Iteratee functions may exit iteration early by explicitly returning `false`.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @param {Function} keysFunc The function to get the keys of `object`.
		     * @returns {Object} Returns `object`.
		     */
		    var baseFor = createBaseFor();

		    /**
		     * This function is like `baseFor` except that it iterates over properties
		     * in the opposite order.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @param {Function} keysFunc The function to get the keys of `object`.
		     * @returns {Object} Returns `object`.
		     */
		    var baseForRight = createBaseFor(true);

		    /**
		     * The base implementation of `_.forOwn` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     */
		    function baseForOwn(object, iteratee) {
		      return object && baseFor(object, iteratee, keys);
		    }

		    /**
		     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     */
		    function baseForOwnRight(object, iteratee) {
		      return object && baseForRight(object, iteratee, keys);
		    }

		    /**
		     * The base implementation of `_.functions` which creates an array of
		     * `object` function property names filtered from `props`.
		     *
		     * @private
		     * @param {Object} object The object to inspect.
		     * @param {Array} props The property names to filter.
		     * @returns {Array} Returns the function names.
		     */
		    function baseFunctions(object, props) {
		      return arrayFilter(props, function(key) {
		        return isFunction(object[key]);
		      });
		    }

		    /**
		     * The base implementation of `_.get` without support for default values.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the property to get.
		     * @returns {*} Returns the resolved value.
		     */
		    function baseGet(object, path) {
		      path = castPath(path, object);

		      var index = 0,
		          length = path.length;

		      while (object != null && index < length) {
		        object = object[toKey(path[index++])];
		      }
		      return (index && index == length) ? object : undefined$1;
		    }

		    /**
		     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
		     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
		     * symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Function} keysFunc The function to get the keys of `object`.
		     * @param {Function} symbolsFunc The function to get the symbols of `object`.
		     * @returns {Array} Returns the array of property names and symbols.
		     */
		    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
		      var result = keysFunc(object);
		      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
		    }

		    /**
		     * The base implementation of `getTag` without fallbacks for buggy environments.
		     *
		     * @private
		     * @param {*} value The value to query.
		     * @returns {string} Returns the `toStringTag`.
		     */
		    function baseGetTag(value) {
		      if (value == null) {
		        return value === undefined$1 ? undefinedTag : nullTag;
		      }
		      return (symToStringTag && symToStringTag in Object(value))
		        ? getRawTag(value)
		        : objectToString(value);
		    }

		    /**
		     * The base implementation of `_.gt` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is greater than `other`,
		     *  else `false`.
		     */
		    function baseGt(value, other) {
		      return value > other;
		    }

		    /**
		     * The base implementation of `_.has` without support for deep paths.
		     *
		     * @private
		     * @param {Object} [object] The object to query.
		     * @param {Array|string} key The key to check.
		     * @returns {boolean} Returns `true` if `key` exists, else `false`.
		     */
		    function baseHas(object, key) {
		      return object != null && hasOwnProperty.call(object, key);
		    }

		    /**
		     * The base implementation of `_.hasIn` without support for deep paths.
		     *
		     * @private
		     * @param {Object} [object] The object to query.
		     * @param {Array|string} key The key to check.
		     * @returns {boolean} Returns `true` if `key` exists, else `false`.
		     */
		    function baseHasIn(object, key) {
		      return object != null && key in Object(object);
		    }

		    /**
		     * The base implementation of `_.inRange` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {number} number The number to check.
		     * @param {number} start The start of the range.
		     * @param {number} end The end of the range.
		     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
		     */
		    function baseInRange(number, start, end) {
		      return number >= nativeMin(start, end) && number < nativeMax(start, end);
		    }

		    /**
		     * The base implementation of methods like `_.intersection`, without support
		     * for iteratee shorthands, that accepts an array of arrays to inspect.
		     *
		     * @private
		     * @param {Array} arrays The arrays to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of shared values.
		     */
		    function baseIntersection(arrays, iteratee, comparator) {
		      var includes = comparator ? arrayIncludesWith : arrayIncludes,
		          length = arrays[0].length,
		          othLength = arrays.length,
		          othIndex = othLength,
		          caches = Array(othLength),
		          maxLength = Infinity,
		          result = [];

		      while (othIndex--) {
		        var array = arrays[othIndex];
		        if (othIndex && iteratee) {
		          array = arrayMap(array, baseUnary(iteratee));
		        }
		        maxLength = nativeMin(array.length, maxLength);
		        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
		          ? new SetCache(othIndex && array)
		          : undefined$1;
		      }
		      array = arrays[0];

		      var index = -1,
		          seen = caches[0];

		      outer:
		      while (++index < length && result.length < maxLength) {
		        var value = array[index],
		            computed = iteratee ? iteratee(value) : value;

		        value = (comparator || value !== 0) ? value : 0;
		        if (!(seen
		              ? cacheHas(seen, computed)
		              : includes(result, computed, comparator)
		            )) {
		          othIndex = othLength;
		          while (--othIndex) {
		            var cache = caches[othIndex];
		            if (!(cache
		                  ? cacheHas(cache, computed)
		                  : includes(arrays[othIndex], computed, comparator))
		                ) {
		              continue outer;
		            }
		          }
		          if (seen) {
		            seen.push(computed);
		          }
		          result.push(value);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.invert` and `_.invertBy` which inverts
		     * `object` with values transformed by `iteratee` and set by `setter`.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} setter The function to set `accumulator` values.
		     * @param {Function} iteratee The iteratee to transform values.
		     * @param {Object} accumulator The initial inverted object.
		     * @returns {Function} Returns `accumulator`.
		     */
		    function baseInverter(object, setter, iteratee, accumulator) {
		      baseForOwn(object, function(value, key, object) {
		        setter(accumulator, iteratee(value), key, object);
		      });
		      return accumulator;
		    }

		    /**
		     * The base implementation of `_.invoke` without support for individual
		     * method arguments.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the method to invoke.
		     * @param {Array} args The arguments to invoke the method with.
		     * @returns {*} Returns the result of the invoked method.
		     */
		    function baseInvoke(object, path, args) {
		      path = castPath(path, object);
		      object = parent(object, path);
		      var func = object == null ? object : object[toKey(last(path))];
		      return func == null ? undefined$1 : apply(func, object, args);
		    }

		    /**
		     * The base implementation of `_.isArguments`.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
		     */
		    function baseIsArguments(value) {
		      return isObjectLike(value) && baseGetTag(value) == argsTag;
		    }

		    /**
		     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
		     */
		    function baseIsArrayBuffer(value) {
		      return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
		    }

		    /**
		     * The base implementation of `_.isDate` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
		     */
		    function baseIsDate(value) {
		      return isObjectLike(value) && baseGetTag(value) == dateTag;
		    }

		    /**
		     * The base implementation of `_.isEqual` which supports partial comparisons
		     * and tracks traversed objects.
		     *
		     * @private
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @param {boolean} bitmask The bitmask flags.
		     *  1 - Unordered comparison
		     *  2 - Partial comparison
		     * @param {Function} [customizer] The function to customize comparisons.
		     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
		     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		     */
		    function baseIsEqual(value, other, bitmask, customizer, stack) {
		      if (value === other) {
		        return true;
		      }
		      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
		        return value !== value && other !== other;
		      }
		      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
		    }

		    /**
		     * A specialized version of `baseIsEqual` for arrays and objects which performs
		     * deep comparisons and tracks traversed objects enabling objects with circular
		     * references to be compared.
		     *
		     * @private
		     * @param {Object} object The object to compare.
		     * @param {Object} other The other object to compare.
		     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
		     * @param {Function} customizer The function to customize comparisons.
		     * @param {Function} equalFunc The function to determine equivalents of values.
		     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
		     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
		     */
		    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
		      var objIsArr = isArray(object),
		          othIsArr = isArray(other),
		          objTag = objIsArr ? arrayTag : getTag(object),
		          othTag = othIsArr ? arrayTag : getTag(other);

		      objTag = objTag == argsTag ? objectTag : objTag;
		      othTag = othTag == argsTag ? objectTag : othTag;

		      var objIsObj = objTag == objectTag,
		          othIsObj = othTag == objectTag,
		          isSameTag = objTag == othTag;

		      if (isSameTag && isBuffer(object)) {
		        if (!isBuffer(other)) {
		          return false;
		        }
		        objIsArr = true;
		        objIsObj = false;
		      }
		      if (isSameTag && !objIsObj) {
		        stack || (stack = new Stack);
		        return (objIsArr || isTypedArray(object))
		          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
		          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
		      }
		      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
		        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
		            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

		        if (objIsWrapped || othIsWrapped) {
		          var objUnwrapped = objIsWrapped ? object.value() : object,
		              othUnwrapped = othIsWrapped ? other.value() : other;

		          stack || (stack = new Stack);
		          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
		        }
		      }
		      if (!isSameTag) {
		        return false;
		      }
		      stack || (stack = new Stack);
		      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
		    }

		    /**
		     * The base implementation of `_.isMap` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
		     */
		    function baseIsMap(value) {
		      return isObjectLike(value) && getTag(value) == mapTag;
		    }

		    /**
		     * The base implementation of `_.isMatch` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property values to match.
		     * @param {Array} matchData The property names, values, and compare flags to match.
		     * @param {Function} [customizer] The function to customize comparisons.
		     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
		     */
		    function baseIsMatch(object, source, matchData, customizer) {
		      var index = matchData.length,
		          length = index,
		          noCustomizer = !customizer;

		      if (object == null) {
		        return !length;
		      }
		      object = Object(object);
		      while (index--) {
		        var data = matchData[index];
		        if ((noCustomizer && data[2])
		              ? data[1] !== object[data[0]]
		              : !(data[0] in object)
		            ) {
		          return false;
		        }
		      }
		      while (++index < length) {
		        data = matchData[index];
		        var key = data[0],
		            objValue = object[key],
		            srcValue = data[1];

		        if (noCustomizer && data[2]) {
		          if (objValue === undefined$1 && !(key in object)) {
		            return false;
		          }
		        } else {
		          var stack = new Stack;
		          if (customizer) {
		            var result = customizer(objValue, srcValue, key, object, source, stack);
		          }
		          if (!(result === undefined$1
		                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
		                : result
		              )) {
		            return false;
		          }
		        }
		      }
		      return true;
		    }

		    /**
		     * The base implementation of `_.isNative` without bad shim checks.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a native function,
		     *  else `false`.
		     */
		    function baseIsNative(value) {
		      if (!isObject(value) || isMasked(value)) {
		        return false;
		      }
		      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
		      return pattern.test(toSource(value));
		    }

		    /**
		     * The base implementation of `_.isRegExp` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
		     */
		    function baseIsRegExp(value) {
		      return isObjectLike(value) && baseGetTag(value) == regexpTag;
		    }

		    /**
		     * The base implementation of `_.isSet` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
		     */
		    function baseIsSet(value) {
		      return isObjectLike(value) && getTag(value) == setTag;
		    }

		    /**
		     * The base implementation of `_.isTypedArray` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
		     */
		    function baseIsTypedArray(value) {
		      return isObjectLike(value) &&
		        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
		    }

		    /**
		     * The base implementation of `_.iteratee`.
		     *
		     * @private
		     * @param {*} [value=_.identity] The value to convert to an iteratee.
		     * @returns {Function} Returns the iteratee.
		     */
		    function baseIteratee(value) {
		      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
		      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
		      if (typeof value == 'function') {
		        return value;
		      }
		      if (value == null) {
		        return identity;
		      }
		      if (typeof value == 'object') {
		        return isArray(value)
		          ? baseMatchesProperty(value[0], value[1])
		          : baseMatches(value);
		      }
		      return property(value);
		    }

		    /**
		     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     */
		    function baseKeys(object) {
		      if (!isPrototype(object)) {
		        return nativeKeys(object);
		      }
		      var result = [];
		      for (var key in Object(object)) {
		        if (hasOwnProperty.call(object, key) && key != 'constructor') {
		          result.push(key);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     */
		    function baseKeysIn(object) {
		      if (!isObject(object)) {
		        return nativeKeysIn(object);
		      }
		      var isProto = isPrototype(object),
		          result = [];

		      for (var key in object) {
		        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
		          result.push(key);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.lt` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is less than `other`,
		     *  else `false`.
		     */
		    function baseLt(value, other) {
		      return value < other;
		    }

		    /**
		     * The base implementation of `_.map` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Array} Returns the new mapped array.
		     */
		    function baseMap(collection, iteratee) {
		      var index = -1,
		          result = isArrayLike(collection) ? Array(collection.length) : [];

		      baseEach(collection, function(value, key, collection) {
		        result[++index] = iteratee(value, key, collection);
		      });
		      return result;
		    }

		    /**
		     * The base implementation of `_.matches` which doesn't clone `source`.
		     *
		     * @private
		     * @param {Object} source The object of property values to match.
		     * @returns {Function} Returns the new spec function.
		     */
		    function baseMatches(source) {
		      var matchData = getMatchData(source);
		      if (matchData.length == 1 && matchData[0][2]) {
		        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
		      }
		      return function(object) {
		        return object === source || baseIsMatch(object, source, matchData);
		      };
		    }

		    /**
		     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
		     *
		     * @private
		     * @param {string} path The path of the property to get.
		     * @param {*} srcValue The value to match.
		     * @returns {Function} Returns the new spec function.
		     */
		    function baseMatchesProperty(path, srcValue) {
		      if (isKey(path) && isStrictComparable(srcValue)) {
		        return matchesStrictComparable(toKey(path), srcValue);
		      }
		      return function(object) {
		        var objValue = get(object, path);
		        return (objValue === undefined$1 && objValue === srcValue)
		          ? hasIn(object, path)
		          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
		      };
		    }

		    /**
		     * The base implementation of `_.merge` without support for multiple sources.
		     *
		     * @private
		     * @param {Object} object The destination object.
		     * @param {Object} source The source object.
		     * @param {number} srcIndex The index of `source`.
		     * @param {Function} [customizer] The function to customize merged values.
		     * @param {Object} [stack] Tracks traversed source values and their merged
		     *  counterparts.
		     */
		    function baseMerge(object, source, srcIndex, customizer, stack) {
		      if (object === source) {
		        return;
		      }
		      baseFor(source, function(srcValue, key) {
		        stack || (stack = new Stack);
		        if (isObject(srcValue)) {
		          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
		        }
		        else {
		          var newValue = customizer
		            ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
		            : undefined$1;

		          if (newValue === undefined$1) {
		            newValue = srcValue;
		          }
		          assignMergeValue(object, key, newValue);
		        }
		      }, keysIn);
		    }

		    /**
		     * A specialized version of `baseMerge` for arrays and objects which performs
		     * deep merges and tracks traversed objects enabling objects with circular
		     * references to be merged.
		     *
		     * @private
		     * @param {Object} object The destination object.
		     * @param {Object} source The source object.
		     * @param {string} key The key of the value to merge.
		     * @param {number} srcIndex The index of `source`.
		     * @param {Function} mergeFunc The function to merge values.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @param {Object} [stack] Tracks traversed source values and their merged
		     *  counterparts.
		     */
		    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
		      var objValue = safeGet(object, key),
		          srcValue = safeGet(source, key),
		          stacked = stack.get(srcValue);

		      if (stacked) {
		        assignMergeValue(object, key, stacked);
		        return;
		      }
		      var newValue = customizer
		        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
		        : undefined$1;

		      var isCommon = newValue === undefined$1;

		      if (isCommon) {
		        var isArr = isArray(srcValue),
		            isBuff = !isArr && isBuffer(srcValue),
		            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

		        newValue = srcValue;
		        if (isArr || isBuff || isTyped) {
		          if (isArray(objValue)) {
		            newValue = objValue;
		          }
		          else if (isArrayLikeObject(objValue)) {
		            newValue = copyArray(objValue);
		          }
		          else if (isBuff) {
		            isCommon = false;
		            newValue = cloneBuffer(srcValue, true);
		          }
		          else if (isTyped) {
		            isCommon = false;
		            newValue = cloneTypedArray(srcValue, true);
		          }
		          else {
		            newValue = [];
		          }
		        }
		        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
		          newValue = objValue;
		          if (isArguments(objValue)) {
		            newValue = toPlainObject(objValue);
		          }
		          else if (!isObject(objValue) || isFunction(objValue)) {
		            newValue = initCloneObject(srcValue);
		          }
		        }
		        else {
		          isCommon = false;
		        }
		      }
		      if (isCommon) {
		        // Recursively merge objects and arrays (susceptible to call stack limits).
		        stack.set(srcValue, newValue);
		        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
		        stack['delete'](srcValue);
		      }
		      assignMergeValue(object, key, newValue);
		    }

		    /**
		     * The base implementation of `_.nth` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {Array} array The array to query.
		     * @param {number} n The index of the element to return.
		     * @returns {*} Returns the nth element of `array`.
		     */
		    function baseNth(array, n) {
		      var length = array.length;
		      if (!length) {
		        return;
		      }
		      n += n < 0 ? length : 0;
		      return isIndex(n, length) ? array[n] : undefined$1;
		    }

		    /**
		     * The base implementation of `_.orderBy` without param guards.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
		     * @param {string[]} orders The sort orders of `iteratees`.
		     * @returns {Array} Returns the new sorted array.
		     */
		    function baseOrderBy(collection, iteratees, orders) {
		      if (iteratees.length) {
		        iteratees = arrayMap(iteratees, function(iteratee) {
		          if (isArray(iteratee)) {
		            return function(value) {
		              return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
		            }
		          }
		          return iteratee;
		        });
		      } else {
		        iteratees = [identity];
		      }

		      var index = -1;
		      iteratees = arrayMap(iteratees, baseUnary(getIteratee()));

		      var result = baseMap(collection, function(value, key, collection) {
		        var criteria = arrayMap(iteratees, function(iteratee) {
		          return iteratee(value);
		        });
		        return { 'criteria': criteria, 'index': ++index, 'value': value };
		      });

		      return baseSortBy(result, function(object, other) {
		        return compareMultiple(object, other, orders);
		      });
		    }

		    /**
		     * The base implementation of `_.pick` without support for individual
		     * property identifiers.
		     *
		     * @private
		     * @param {Object} object The source object.
		     * @param {string[]} paths The property paths to pick.
		     * @returns {Object} Returns the new object.
		     */
		    function basePick(object, paths) {
		      return basePickBy(object, paths, function(value, path) {
		        return hasIn(object, path);
		      });
		    }

		    /**
		     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Object} object The source object.
		     * @param {string[]} paths The property paths to pick.
		     * @param {Function} predicate The function invoked per property.
		     * @returns {Object} Returns the new object.
		     */
		    function basePickBy(object, paths, predicate) {
		      var index = -1,
		          length = paths.length,
		          result = {};

		      while (++index < length) {
		        var path = paths[index],
		            value = baseGet(object, path);

		        if (predicate(value, path)) {
		          baseSet(result, castPath(path, object), value);
		        }
		      }
		      return result;
		    }

		    /**
		     * A specialized version of `baseProperty` which supports deep paths.
		     *
		     * @private
		     * @param {Array|string} path The path of the property to get.
		     * @returns {Function} Returns the new accessor function.
		     */
		    function basePropertyDeep(path) {
		      return function(object) {
		        return baseGet(object, path);
		      };
		    }

		    /**
		     * The base implementation of `_.pullAllBy` without support for iteratee
		     * shorthands.
		     *
		     * @private
		     * @param {Array} array The array to modify.
		     * @param {Array} values The values to remove.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns `array`.
		     */
		    function basePullAll(array, values, iteratee, comparator) {
		      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
		          index = -1,
		          length = values.length,
		          seen = array;

		      if (array === values) {
		        values = copyArray(values);
		      }
		      if (iteratee) {
		        seen = arrayMap(array, baseUnary(iteratee));
		      }
		      while (++index < length) {
		        var fromIndex = 0,
		            value = values[index],
		            computed = iteratee ? iteratee(value) : value;

		        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
		          if (seen !== array) {
		            splice.call(seen, fromIndex, 1);
		          }
		          splice.call(array, fromIndex, 1);
		        }
		      }
		      return array;
		    }

		    /**
		     * The base implementation of `_.pullAt` without support for individual
		     * indexes or capturing the removed elements.
		     *
		     * @private
		     * @param {Array} array The array to modify.
		     * @param {number[]} indexes The indexes of elements to remove.
		     * @returns {Array} Returns `array`.
		     */
		    function basePullAt(array, indexes) {
		      var length = array ? indexes.length : 0,
		          lastIndex = length - 1;

		      while (length--) {
		        var index = indexes[length];
		        if (length == lastIndex || index !== previous) {
		          var previous = index;
		          if (isIndex(index)) {
		            splice.call(array, index, 1);
		          } else {
		            baseUnset(array, index);
		          }
		        }
		      }
		      return array;
		    }

		    /**
		     * The base implementation of `_.random` without support for returning
		     * floating-point numbers.
		     *
		     * @private
		     * @param {number} lower The lower bound.
		     * @param {number} upper The upper bound.
		     * @returns {number} Returns the random number.
		     */
		    function baseRandom(lower, upper) {
		      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
		    }

		    /**
		     * The base implementation of `_.range` and `_.rangeRight` which doesn't
		     * coerce arguments.
		     *
		     * @private
		     * @param {number} start The start of the range.
		     * @param {number} end The end of the range.
		     * @param {number} step The value to increment or decrement by.
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Array} Returns the range of numbers.
		     */
		    function baseRange(start, end, step, fromRight) {
		      var index = -1,
		          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
		          result = Array(length);

		      while (length--) {
		        result[fromRight ? length : ++index] = start;
		        start += step;
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.repeat` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {string} string The string to repeat.
		     * @param {number} n The number of times to repeat the string.
		     * @returns {string} Returns the repeated string.
		     */
		    function baseRepeat(string, n) {
		      var result = '';
		      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
		        return result;
		      }
		      // Leverage the exponentiation by squaring algorithm for a faster repeat.
		      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
		      do {
		        if (n % 2) {
		          result += string;
		        }
		        n = nativeFloor(n / 2);
		        if (n) {
		          string += string;
		        }
		      } while (n);

		      return result;
		    }

		    /**
		     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
		     *
		     * @private
		     * @param {Function} func The function to apply a rest parameter to.
		     * @param {number} [start=func.length-1] The start position of the rest parameter.
		     * @returns {Function} Returns the new function.
		     */
		    function baseRest(func, start) {
		      return setToString(overRest(func, start, identity), func + '');
		    }

		    /**
		     * The base implementation of `_.sample`.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to sample.
		     * @returns {*} Returns the random element.
		     */
		    function baseSample(collection) {
		      return arraySample(values(collection));
		    }

		    /**
		     * The base implementation of `_.sampleSize` without param guards.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to sample.
		     * @param {number} n The number of elements to sample.
		     * @returns {Array} Returns the random elements.
		     */
		    function baseSampleSize(collection, n) {
		      var array = values(collection);
		      return shuffleSelf(array, baseClamp(n, 0, array.length));
		    }

		    /**
		     * The base implementation of `_.set`.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {*} value The value to set.
		     * @param {Function} [customizer] The function to customize path creation.
		     * @returns {Object} Returns `object`.
		     */
		    function baseSet(object, path, value, customizer) {
		      if (!isObject(object)) {
		        return object;
		      }
		      path = castPath(path, object);

		      var index = -1,
		          length = path.length,
		          lastIndex = length - 1,
		          nested = object;

		      while (nested != null && ++index < length) {
		        var key = toKey(path[index]),
		            newValue = value;

		        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
		          return object;
		        }

		        if (index != lastIndex) {
		          var objValue = nested[key];
		          newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
		          if (newValue === undefined$1) {
		            newValue = isObject(objValue)
		              ? objValue
		              : (isIndex(path[index + 1]) ? [] : {});
		          }
		        }
		        assignValue(nested, key, newValue);
		        nested = nested[key];
		      }
		      return object;
		    }

		    /**
		     * The base implementation of `setData` without support for hot loop shorting.
		     *
		     * @private
		     * @param {Function} func The function to associate metadata with.
		     * @param {*} data The metadata.
		     * @returns {Function} Returns `func`.
		     */
		    var baseSetData = !metaMap ? identity : function(func, data) {
		      metaMap.set(func, data);
		      return func;
		    };

		    /**
		     * The base implementation of `setToString` without support for hot loop shorting.
		     *
		     * @private
		     * @param {Function} func The function to modify.
		     * @param {Function} string The `toString` result.
		     * @returns {Function} Returns `func`.
		     */
		    var baseSetToString = !defineProperty ? identity : function(func, string) {
		      return defineProperty(func, 'toString', {
		        'configurable': true,
		        'enumerable': false,
		        'value': constant(string),
		        'writable': true
		      });
		    };

		    /**
		     * The base implementation of `_.shuffle`.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to shuffle.
		     * @returns {Array} Returns the new shuffled array.
		     */
		    function baseShuffle(collection) {
		      return shuffleSelf(values(collection));
		    }

		    /**
		     * The base implementation of `_.slice` without an iteratee call guard.
		     *
		     * @private
		     * @param {Array} array The array to slice.
		     * @param {number} [start=0] The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns the slice of `array`.
		     */
		    function baseSlice(array, start, end) {
		      var index = -1,
		          length = array.length;

		      if (start < 0) {
		        start = -start > length ? 0 : (length + start);
		      }
		      end = end > length ? length : end;
		      if (end < 0) {
		        end += length;
		      }
		      length = start > end ? 0 : ((end - start) >>> 0);
		      start >>>= 0;

		      var result = Array(length);
		      while (++index < length) {
		        result[index] = array[index + start];
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.some` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} predicate The function invoked per iteration.
		     * @returns {boolean} Returns `true` if any element passes the predicate check,
		     *  else `false`.
		     */
		    function baseSome(collection, predicate) {
		      var result;

		      baseEach(collection, function(value, index, collection) {
		        result = predicate(value, index, collection);
		        return !result;
		      });
		      return !!result;
		    }

		    /**
		     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
		     * performs a binary search of `array` to determine the index at which `value`
		     * should be inserted into `array` in order to maintain its sort order.
		     *
		     * @private
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @param {boolean} [retHighest] Specify returning the highest qualified index.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     */
		    function baseSortedIndex(array, value, retHighest) {
		      var low = 0,
		          high = array == null ? low : array.length;

		      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
		        while (low < high) {
		          var mid = (low + high) >>> 1,
		              computed = array[mid];

		          if (computed !== null && !isSymbol(computed) &&
		              (retHighest ? (computed <= value) : (computed < value))) {
		            low = mid + 1;
		          } else {
		            high = mid;
		          }
		        }
		        return high;
		      }
		      return baseSortedIndexBy(array, value, identity, retHighest);
		    }

		    /**
		     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
		     * which invokes `iteratee` for `value` and each element of `array` to compute
		     * their sort ranking. The iteratee is invoked with one argument; (value).
		     *
		     * @private
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @param {Function} iteratee The iteratee invoked per element.
		     * @param {boolean} [retHighest] Specify returning the highest qualified index.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     */
		    function baseSortedIndexBy(array, value, iteratee, retHighest) {
		      var low = 0,
		          high = array == null ? 0 : array.length;
		      if (high === 0) {
		        return 0;
		      }

		      value = iteratee(value);
		      var valIsNaN = value !== value,
		          valIsNull = value === null,
		          valIsSymbol = isSymbol(value),
		          valIsUndefined = value === undefined$1;

		      while (low < high) {
		        var mid = nativeFloor((low + high) / 2),
		            computed = iteratee(array[mid]),
		            othIsDefined = computed !== undefined$1,
		            othIsNull = computed === null,
		            othIsReflexive = computed === computed,
		            othIsSymbol = isSymbol(computed);

		        if (valIsNaN) {
		          var setLow = retHighest || othIsReflexive;
		        } else if (valIsUndefined) {
		          setLow = othIsReflexive && (retHighest || othIsDefined);
		        } else if (valIsNull) {
		          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
		        } else if (valIsSymbol) {
		          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
		        } else if (othIsNull || othIsSymbol) {
		          setLow = false;
		        } else {
		          setLow = retHighest ? (computed <= value) : (computed < value);
		        }
		        if (setLow) {
		          low = mid + 1;
		        } else {
		          high = mid;
		        }
		      }
		      return nativeMin(high, MAX_ARRAY_INDEX);
		    }

		    /**
		     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
		     * support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     */
		    function baseSortedUniq(array, iteratee) {
		      var index = -1,
		          length = array.length,
		          resIndex = 0,
		          result = [];

		      while (++index < length) {
		        var value = array[index],
		            computed = iteratee ? iteratee(value) : value;

		        if (!index || !eq(computed, seen)) {
		          var seen = computed;
		          result[resIndex++] = value === 0 ? 0 : value;
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.toNumber` which doesn't ensure correct
		     * conversions of binary, hexadecimal, or octal string values.
		     *
		     * @private
		     * @param {*} value The value to process.
		     * @returns {number} Returns the number.
		     */
		    function baseToNumber(value) {
		      if (typeof value == 'number') {
		        return value;
		      }
		      if (isSymbol(value)) {
		        return NAN;
		      }
		      return +value;
		    }

		    /**
		     * The base implementation of `_.toString` which doesn't convert nullish
		     * values to empty strings.
		     *
		     * @private
		     * @param {*} value The value to process.
		     * @returns {string} Returns the string.
		     */
		    function baseToString(value) {
		      // Exit early for strings to avoid a performance hit in some environments.
		      if (typeof value == 'string') {
		        return value;
		      }
		      if (isArray(value)) {
		        // Recursively convert values (susceptible to call stack limits).
		        return arrayMap(value, baseToString) + '';
		      }
		      if (isSymbol(value)) {
		        return symbolToString ? symbolToString.call(value) : '';
		      }
		      var result = (value + '');
		      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
		    }

		    /**
		     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     */
		    function baseUniq(array, iteratee, comparator) {
		      var index = -1,
		          includes = arrayIncludes,
		          length = array.length,
		          isCommon = true,
		          result = [],
		          seen = result;

		      if (comparator) {
		        isCommon = false;
		        includes = arrayIncludesWith;
		      }
		      else if (length >= LARGE_ARRAY_SIZE) {
		        var set = iteratee ? null : createSet(array);
		        if (set) {
		          return setToArray(set);
		        }
		        isCommon = false;
		        includes = cacheHas;
		        seen = new SetCache;
		      }
		      else {
		        seen = iteratee ? [] : result;
		      }
		      outer:
		      while (++index < length) {
		        var value = array[index],
		            computed = iteratee ? iteratee(value) : value;

		        value = (comparator || value !== 0) ? value : 0;
		        if (isCommon && computed === computed) {
		          var seenIndex = seen.length;
		          while (seenIndex--) {
		            if (seen[seenIndex] === computed) {
		              continue outer;
		            }
		          }
		          if (iteratee) {
		            seen.push(computed);
		          }
		          result.push(value);
		        }
		        else if (!includes(seen, computed, comparator)) {
		          if (seen !== result) {
		            seen.push(computed);
		          }
		          result.push(value);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.unset`.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The property path to unset.
		     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
		     */
		    function baseUnset(object, path) {
		      path = castPath(path, object);
		      object = parent(object, path);
		      return object == null || delete object[toKey(last(path))];
		    }

		    /**
		     * The base implementation of `_.update`.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to update.
		     * @param {Function} updater The function to produce the updated value.
		     * @param {Function} [customizer] The function to customize path creation.
		     * @returns {Object} Returns `object`.
		     */
		    function baseUpdate(object, path, updater, customizer) {
		      return baseSet(object, path, updater(baseGet(object, path)), customizer);
		    }

		    /**
		     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
		     * without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array} array The array to query.
		     * @param {Function} predicate The function invoked per iteration.
		     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Array} Returns the slice of `array`.
		     */
		    function baseWhile(array, predicate, isDrop, fromRight) {
		      var length = array.length,
		          index = fromRight ? length : -1;

		      while ((fromRight ? index-- : ++index < length) &&
		        predicate(array[index], index, array)) {}

		      return isDrop
		        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
		        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
		    }

		    /**
		     * The base implementation of `wrapperValue` which returns the result of
		     * performing a sequence of actions on the unwrapped `value`, where each
		     * successive action is supplied the return value of the previous.
		     *
		     * @private
		     * @param {*} value The unwrapped value.
		     * @param {Array} actions Actions to perform to resolve the unwrapped value.
		     * @returns {*} Returns the resolved value.
		     */
		    function baseWrapperValue(value, actions) {
		      var result = value;
		      if (result instanceof LazyWrapper) {
		        result = result.value();
		      }
		      return arrayReduce(actions, function(result, action) {
		        return action.func.apply(action.thisArg, arrayPush([result], action.args));
		      }, result);
		    }

		    /**
		     * The base implementation of methods like `_.xor`, without support for
		     * iteratee shorthands, that accepts an array of arrays to inspect.
		     *
		     * @private
		     * @param {Array} arrays The arrays to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of values.
		     */
		    function baseXor(arrays, iteratee, comparator) {
		      var length = arrays.length;
		      if (length < 2) {
		        return length ? baseUniq(arrays[0]) : [];
		      }
		      var index = -1,
		          result = Array(length);

		      while (++index < length) {
		        var array = arrays[index],
		            othIndex = -1;

		        while (++othIndex < length) {
		          if (othIndex != index) {
		            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
		          }
		        }
		      }
		      return baseUniq(baseFlatten(result, 1), iteratee, comparator);
		    }

		    /**
		     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
		     *
		     * @private
		     * @param {Array} props The property identifiers.
		     * @param {Array} values The property values.
		     * @param {Function} assignFunc The function to assign values.
		     * @returns {Object} Returns the new object.
		     */
		    function baseZipObject(props, values, assignFunc) {
		      var index = -1,
		          length = props.length,
		          valsLength = values.length,
		          result = {};

		      while (++index < length) {
		        var value = index < valsLength ? values[index] : undefined$1;
		        assignFunc(result, props[index], value);
		      }
		      return result;
		    }

		    /**
		     * Casts `value` to an empty array if it's not an array like object.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @returns {Array|Object} Returns the cast array-like object.
		     */
		    function castArrayLikeObject(value) {
		      return isArrayLikeObject(value) ? value : [];
		    }

		    /**
		     * Casts `value` to `identity` if it's not a function.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @returns {Function} Returns cast function.
		     */
		    function castFunction(value) {
		      return typeof value == 'function' ? value : identity;
		    }

		    /**
		     * Casts `value` to a path array if it's not one.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @param {Object} [object] The object to query keys on.
		     * @returns {Array} Returns the cast property path array.
		     */
		    function castPath(value, object) {
		      if (isArray(value)) {
		        return value;
		      }
		      return isKey(value, object) ? [value] : stringToPath(toString(value));
		    }

		    /**
		     * A `baseRest` alias which can be replaced with `identity` by module
		     * replacement plugins.
		     *
		     * @private
		     * @type {Function}
		     * @param {Function} func The function to apply a rest parameter to.
		     * @returns {Function} Returns the new function.
		     */
		    var castRest = baseRest;

		    /**
		     * Casts `array` to a slice if it's needed.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {number} start The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns the cast slice.
		     */
		    function castSlice(array, start, end) {
		      var length = array.length;
		      end = end === undefined$1 ? length : end;
		      return (!start && end >= length) ? array : baseSlice(array, start, end);
		    }

		    /**
		     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
		     *
		     * @private
		     * @param {number|Object} id The timer id or timeout object of the timer to clear.
		     */
		    var clearTimeout = ctxClearTimeout || function(id) {
		      return root.clearTimeout(id);
		    };

		    /**
		     * Creates a clone of  `buffer`.
		     *
		     * @private
		     * @param {Buffer} buffer The buffer to clone.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Buffer} Returns the cloned buffer.
		     */
		    function cloneBuffer(buffer, isDeep) {
		      if (isDeep) {
		        return buffer.slice();
		      }
		      var length = buffer.length,
		          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

		      buffer.copy(result);
		      return result;
		    }

		    /**
		     * Creates a clone of `arrayBuffer`.
		     *
		     * @private
		     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
		     * @returns {ArrayBuffer} Returns the cloned array buffer.
		     */
		    function cloneArrayBuffer(arrayBuffer) {
		      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
		      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
		      return result;
		    }

		    /**
		     * Creates a clone of `dataView`.
		     *
		     * @private
		     * @param {Object} dataView The data view to clone.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Object} Returns the cloned data view.
		     */
		    function cloneDataView(dataView, isDeep) {
		      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
		      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
		    }

		    /**
		     * Creates a clone of `regexp`.
		     *
		     * @private
		     * @param {Object} regexp The regexp to clone.
		     * @returns {Object} Returns the cloned regexp.
		     */
		    function cloneRegExp(regexp) {
		      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
		      result.lastIndex = regexp.lastIndex;
		      return result;
		    }

		    /**
		     * Creates a clone of the `symbol` object.
		     *
		     * @private
		     * @param {Object} symbol The symbol object to clone.
		     * @returns {Object} Returns the cloned symbol object.
		     */
		    function cloneSymbol(symbol) {
		      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
		    }

		    /**
		     * Creates a clone of `typedArray`.
		     *
		     * @private
		     * @param {Object} typedArray The typed array to clone.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Object} Returns the cloned typed array.
		     */
		    function cloneTypedArray(typedArray, isDeep) {
		      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
		      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
		    }

		    /**
		     * Compares values to sort them in ascending order.
		     *
		     * @private
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {number} Returns the sort order indicator for `value`.
		     */
		    function compareAscending(value, other) {
		      if (value !== other) {
		        var valIsDefined = value !== undefined$1,
		            valIsNull = value === null,
		            valIsReflexive = value === value,
		            valIsSymbol = isSymbol(value);

		        var othIsDefined = other !== undefined$1,
		            othIsNull = other === null,
		            othIsReflexive = other === other,
		            othIsSymbol = isSymbol(other);

		        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
		            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
		            (valIsNull && othIsDefined && othIsReflexive) ||
		            (!valIsDefined && othIsReflexive) ||
		            !valIsReflexive) {
		          return 1;
		        }
		        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
		            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
		            (othIsNull && valIsDefined && valIsReflexive) ||
		            (!othIsDefined && valIsReflexive) ||
		            !othIsReflexive) {
		          return -1;
		        }
		      }
		      return 0;
		    }

		    /**
		     * Used by `_.orderBy` to compare multiple properties of a value to another
		     * and stable sort them.
		     *
		     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
		     * specify an order of "desc" for descending or "asc" for ascending sort order
		     * of corresponding values.
		     *
		     * @private
		     * @param {Object} object The object to compare.
		     * @param {Object} other The other object to compare.
		     * @param {boolean[]|string[]} orders The order to sort by for each property.
		     * @returns {number} Returns the sort order indicator for `object`.
		     */
		    function compareMultiple(object, other, orders) {
		      var index = -1,
		          objCriteria = object.criteria,
		          othCriteria = other.criteria,
		          length = objCriteria.length,
		          ordersLength = orders.length;

		      while (++index < length) {
		        var result = compareAscending(objCriteria[index], othCriteria[index]);
		        if (result) {
		          if (index >= ordersLength) {
		            return result;
		          }
		          var order = orders[index];
		          return result * (order == 'desc' ? -1 : 1);
		        }
		      }
		      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
		      // that causes it, under certain circumstances, to provide the same value for
		      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
		      // for more details.
		      //
		      // This also ensures a stable sort in V8 and other engines.
		      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
		      return object.index - other.index;
		    }

		    /**
		     * Creates an array that is the composition of partially applied arguments,
		     * placeholders, and provided arguments into a single array of arguments.
		     *
		     * @private
		     * @param {Array} args The provided arguments.
		     * @param {Array} partials The arguments to prepend to those provided.
		     * @param {Array} holders The `partials` placeholder indexes.
		     * @params {boolean} [isCurried] Specify composing for a curried function.
		     * @returns {Array} Returns the new array of composed arguments.
		     */
		    function composeArgs(args, partials, holders, isCurried) {
		      var argsIndex = -1,
		          argsLength = args.length,
		          holdersLength = holders.length,
		          leftIndex = -1,
		          leftLength = partials.length,
		          rangeLength = nativeMax(argsLength - holdersLength, 0),
		          result = Array(leftLength + rangeLength),
		          isUncurried = !isCurried;

		      while (++leftIndex < leftLength) {
		        result[leftIndex] = partials[leftIndex];
		      }
		      while (++argsIndex < holdersLength) {
		        if (isUncurried || argsIndex < argsLength) {
		          result[holders[argsIndex]] = args[argsIndex];
		        }
		      }
		      while (rangeLength--) {
		        result[leftIndex++] = args[argsIndex++];
		      }
		      return result;
		    }

		    /**
		     * This function is like `composeArgs` except that the arguments composition
		     * is tailored for `_.partialRight`.
		     *
		     * @private
		     * @param {Array} args The provided arguments.
		     * @param {Array} partials The arguments to append to those provided.
		     * @param {Array} holders The `partials` placeholder indexes.
		     * @params {boolean} [isCurried] Specify composing for a curried function.
		     * @returns {Array} Returns the new array of composed arguments.
		     */
		    function composeArgsRight(args, partials, holders, isCurried) {
		      var argsIndex = -1,
		          argsLength = args.length,
		          holdersIndex = -1,
		          holdersLength = holders.length,
		          rightIndex = -1,
		          rightLength = partials.length,
		          rangeLength = nativeMax(argsLength - holdersLength, 0),
		          result = Array(rangeLength + rightLength),
		          isUncurried = !isCurried;

		      while (++argsIndex < rangeLength) {
		        result[argsIndex] = args[argsIndex];
		      }
		      var offset = argsIndex;
		      while (++rightIndex < rightLength) {
		        result[offset + rightIndex] = partials[rightIndex];
		      }
		      while (++holdersIndex < holdersLength) {
		        if (isUncurried || argsIndex < argsLength) {
		          result[offset + holders[holdersIndex]] = args[argsIndex++];
		        }
		      }
		      return result;
		    }

		    /**
		     * Copies the values of `source` to `array`.
		     *
		     * @private
		     * @param {Array} source The array to copy values from.
		     * @param {Array} [array=[]] The array to copy values to.
		     * @returns {Array} Returns `array`.
		     */
		    function copyArray(source, array) {
		      var index = -1,
		          length = source.length;

		      array || (array = Array(length));
		      while (++index < length) {
		        array[index] = source[index];
		      }
		      return array;
		    }

		    /**
		     * Copies properties of `source` to `object`.
		     *
		     * @private
		     * @param {Object} source The object to copy properties from.
		     * @param {Array} props The property identifiers to copy.
		     * @param {Object} [object={}] The object to copy properties to.
		     * @param {Function} [customizer] The function to customize copied values.
		     * @returns {Object} Returns `object`.
		     */
		    function copyObject(source, props, object, customizer) {
		      var isNew = !object;
		      object || (object = {});

		      var index = -1,
		          length = props.length;

		      while (++index < length) {
		        var key = props[index];

		        var newValue = customizer
		          ? customizer(object[key], source[key], key, object, source)
		          : undefined$1;

		        if (newValue === undefined$1) {
		          newValue = source[key];
		        }
		        if (isNew) {
		          baseAssignValue(object, key, newValue);
		        } else {
		          assignValue(object, key, newValue);
		        }
		      }
		      return object;
		    }

		    /**
		     * Copies own symbols of `source` to `object`.
		     *
		     * @private
		     * @param {Object} source The object to copy symbols from.
		     * @param {Object} [object={}] The object to copy symbols to.
		     * @returns {Object} Returns `object`.
		     */
		    function copySymbols(source, object) {
		      return copyObject(source, getSymbols(source), object);
		    }

		    /**
		     * Copies own and inherited symbols of `source` to `object`.
		     *
		     * @private
		     * @param {Object} source The object to copy symbols from.
		     * @param {Object} [object={}] The object to copy symbols to.
		     * @returns {Object} Returns `object`.
		     */
		    function copySymbolsIn(source, object) {
		      return copyObject(source, getSymbolsIn(source), object);
		    }

		    /**
		     * Creates a function like `_.groupBy`.
		     *
		     * @private
		     * @param {Function} setter The function to set accumulator values.
		     * @param {Function} [initializer] The accumulator object initializer.
		     * @returns {Function} Returns the new aggregator function.
		     */
		    function createAggregator(setter, initializer) {
		      return function(collection, iteratee) {
		        var func = isArray(collection) ? arrayAggregator : baseAggregator,
		            accumulator = initializer ? initializer() : {};

		        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
		      };
		    }

		    /**
		     * Creates a function like `_.assign`.
		     *
		     * @private
		     * @param {Function} assigner The function to assign values.
		     * @returns {Function} Returns the new assigner function.
		     */
		    function createAssigner(assigner) {
		      return baseRest(function(object, sources) {
		        var index = -1,
		            length = sources.length,
		            customizer = length > 1 ? sources[length - 1] : undefined$1,
		            guard = length > 2 ? sources[2] : undefined$1;

		        customizer = (assigner.length > 3 && typeof customizer == 'function')
		          ? (length--, customizer)
		          : undefined$1;

		        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
		          customizer = length < 3 ? undefined$1 : customizer;
		          length = 1;
		        }
		        object = Object(object);
		        while (++index < length) {
		          var source = sources[index];
		          if (source) {
		            assigner(object, source, index, customizer);
		          }
		        }
		        return object;
		      });
		    }

		    /**
		     * Creates a `baseEach` or `baseEachRight` function.
		     *
		     * @private
		     * @param {Function} eachFunc The function to iterate over a collection.
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Function} Returns the new base function.
		     */
		    function createBaseEach(eachFunc, fromRight) {
		      return function(collection, iteratee) {
		        if (collection == null) {
		          return collection;
		        }
		        if (!isArrayLike(collection)) {
		          return eachFunc(collection, iteratee);
		        }
		        var length = collection.length,
		            index = fromRight ? length : -1,
		            iterable = Object(collection);

		        while ((fromRight ? index-- : ++index < length)) {
		          if (iteratee(iterable[index], index, iterable) === false) {
		            break;
		          }
		        }
		        return collection;
		      };
		    }

		    /**
		     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
		     *
		     * @private
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Function} Returns the new base function.
		     */
		    function createBaseFor(fromRight) {
		      return function(object, iteratee, keysFunc) {
		        var index = -1,
		            iterable = Object(object),
		            props = keysFunc(object),
		            length = props.length;

		        while (length--) {
		          var key = props[fromRight ? length : ++index];
		          if (iteratee(iterable[key], key, iterable) === false) {
		            break;
		          }
		        }
		        return object;
		      };
		    }

		    /**
		     * Creates a function that wraps `func` to invoke it with the optional `this`
		     * binding of `thisArg`.
		     *
		     * @private
		     * @param {Function} func The function to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {*} [thisArg] The `this` binding of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createBind(func, bitmask, thisArg) {
		      var isBind = bitmask & WRAP_BIND_FLAG,
		          Ctor = createCtor(func);

		      function wrapper() {
		        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
		        return fn.apply(isBind ? thisArg : this, arguments);
		      }
		      return wrapper;
		    }

		    /**
		     * Creates a function like `_.lowerFirst`.
		     *
		     * @private
		     * @param {string} methodName The name of the `String` case method to use.
		     * @returns {Function} Returns the new case function.
		     */
		    function createCaseFirst(methodName) {
		      return function(string) {
		        string = toString(string);

		        var strSymbols = hasUnicode(string)
		          ? stringToArray(string)
		          : undefined$1;

		        var chr = strSymbols
		          ? strSymbols[0]
		          : string.charAt(0);

		        var trailing = strSymbols
		          ? castSlice(strSymbols, 1).join('')
		          : string.slice(1);

		        return chr[methodName]() + trailing;
		      };
		    }

		    /**
		     * Creates a function like `_.camelCase`.
		     *
		     * @private
		     * @param {Function} callback The function to combine each word.
		     * @returns {Function} Returns the new compounder function.
		     */
		    function createCompounder(callback) {
		      return function(string) {
		        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
		      };
		    }

		    /**
		     * Creates a function that produces an instance of `Ctor` regardless of
		     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
		     *
		     * @private
		     * @param {Function} Ctor The constructor to wrap.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createCtor(Ctor) {
		      return function() {
		        // Use a `switch` statement to work with class constructors. See
		        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
		        // for more details.
		        var args = arguments;
		        switch (args.length) {
		          case 0: return new Ctor;
		          case 1: return new Ctor(args[0]);
		          case 2: return new Ctor(args[0], args[1]);
		          case 3: return new Ctor(args[0], args[1], args[2]);
		          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
		          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
		          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
		          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
		        }
		        var thisBinding = baseCreate(Ctor.prototype),
		            result = Ctor.apply(thisBinding, args);

		        // Mimic the constructor's `return` behavior.
		        // See https://es5.github.io/#x13.2.2 for more details.
		        return isObject(result) ? result : thisBinding;
		      };
		    }

		    /**
		     * Creates a function that wraps `func` to enable currying.
		     *
		     * @private
		     * @param {Function} func The function to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {number} arity The arity of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createCurry(func, bitmask, arity) {
		      var Ctor = createCtor(func);

		      function wrapper() {
		        var length = arguments.length,
		            args = Array(length),
		            index = length,
		            placeholder = getHolder(wrapper);

		        while (index--) {
		          args[index] = arguments[index];
		        }
		        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
		          ? []
		          : replaceHolders(args, placeholder);

		        length -= holders.length;
		        if (length < arity) {
		          return createRecurry(
		            func, bitmask, createHybrid, wrapper.placeholder, undefined$1,
		            args, holders, undefined$1, undefined$1, arity - length);
		        }
		        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
		        return apply(fn, this, args);
		      }
		      return wrapper;
		    }

		    /**
		     * Creates a `_.find` or `_.findLast` function.
		     *
		     * @private
		     * @param {Function} findIndexFunc The function to find the collection index.
		     * @returns {Function} Returns the new find function.
		     */
		    function createFind(findIndexFunc) {
		      return function(collection, predicate, fromIndex) {
		        var iterable = Object(collection);
		        if (!isArrayLike(collection)) {
		          var iteratee = getIteratee(predicate, 3);
		          collection = keys(collection);
		          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
		        }
		        var index = findIndexFunc(collection, predicate, fromIndex);
		        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined$1;
		      };
		    }

		    /**
		     * Creates a `_.flow` or `_.flowRight` function.
		     *
		     * @private
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Function} Returns the new flow function.
		     */
		    function createFlow(fromRight) {
		      return flatRest(function(funcs) {
		        var length = funcs.length,
		            index = length,
		            prereq = LodashWrapper.prototype.thru;

		        if (fromRight) {
		          funcs.reverse();
		        }
		        while (index--) {
		          var func = funcs[index];
		          if (typeof func != 'function') {
		            throw new TypeError(FUNC_ERROR_TEXT);
		          }
		          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
		            var wrapper = new LodashWrapper([], true);
		          }
		        }
		        index = wrapper ? index : length;
		        while (++index < length) {
		          func = funcs[index];

		          var funcName = getFuncName(func),
		              data = funcName == 'wrapper' ? getData(func) : undefined$1;

		          if (data && isLaziable(data[0]) &&
		                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
		                !data[4].length && data[9] == 1
		              ) {
		            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
		          } else {
		            wrapper = (func.length == 1 && isLaziable(func))
		              ? wrapper[funcName]()
		              : wrapper.thru(func);
		          }
		        }
		        return function() {
		          var args = arguments,
		              value = args[0];

		          if (wrapper && args.length == 1 && isArray(value)) {
		            return wrapper.plant(value).value();
		          }
		          var index = 0,
		              result = length ? funcs[index].apply(this, args) : value;

		          while (++index < length) {
		            result = funcs[index].call(this, result);
		          }
		          return result;
		        };
		      });
		    }

		    /**
		     * Creates a function that wraps `func` to invoke it with optional `this`
		     * binding of `thisArg`, partial application, and currying.
		     *
		     * @private
		     * @param {Function|string} func The function or method name to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {*} [thisArg] The `this` binding of `func`.
		     * @param {Array} [partials] The arguments to prepend to those provided to
		     *  the new function.
		     * @param {Array} [holders] The `partials` placeholder indexes.
		     * @param {Array} [partialsRight] The arguments to append to those provided
		     *  to the new function.
		     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
		     * @param {Array} [argPos] The argument positions of the new function.
		     * @param {number} [ary] The arity cap of `func`.
		     * @param {number} [arity] The arity of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
		      var isAry = bitmask & WRAP_ARY_FLAG,
		          isBind = bitmask & WRAP_BIND_FLAG,
		          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
		          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
		          isFlip = bitmask & WRAP_FLIP_FLAG,
		          Ctor = isBindKey ? undefined$1 : createCtor(func);

		      function wrapper() {
		        var length = arguments.length,
		            args = Array(length),
		            index = length;

		        while (index--) {
		          args[index] = arguments[index];
		        }
		        if (isCurried) {
		          var placeholder = getHolder(wrapper),
		              holdersCount = countHolders(args, placeholder);
		        }
		        if (partials) {
		          args = composeArgs(args, partials, holders, isCurried);
		        }
		        if (partialsRight) {
		          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
		        }
		        length -= holdersCount;
		        if (isCurried && length < arity) {
		          var newHolders = replaceHolders(args, placeholder);
		          return createRecurry(
		            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
		            args, newHolders, argPos, ary, arity - length
		          );
		        }
		        var thisBinding = isBind ? thisArg : this,
		            fn = isBindKey ? thisBinding[func] : func;

		        length = args.length;
		        if (argPos) {
		          args = reorder(args, argPos);
		        } else if (isFlip && length > 1) {
		          args.reverse();
		        }
		        if (isAry && ary < length) {
		          args.length = ary;
		        }
		        if (this && this !== root && this instanceof wrapper) {
		          fn = Ctor || createCtor(fn);
		        }
		        return fn.apply(thisBinding, args);
		      }
		      return wrapper;
		    }

		    /**
		     * Creates a function like `_.invertBy`.
		     *
		     * @private
		     * @param {Function} setter The function to set accumulator values.
		     * @param {Function} toIteratee The function to resolve iteratees.
		     * @returns {Function} Returns the new inverter function.
		     */
		    function createInverter(setter, toIteratee) {
		      return function(object, iteratee) {
		        return baseInverter(object, setter, toIteratee(iteratee), {});
		      };
		    }

		    /**
		     * Creates a function that performs a mathematical operation on two values.
		     *
		     * @private
		     * @param {Function} operator The function to perform the operation.
		     * @param {number} [defaultValue] The value used for `undefined` arguments.
		     * @returns {Function} Returns the new mathematical operation function.
		     */
		    function createMathOperation(operator, defaultValue) {
		      return function(value, other) {
		        var result;
		        if (value === undefined$1 && other === undefined$1) {
		          return defaultValue;
		        }
		        if (value !== undefined$1) {
		          result = value;
		        }
		        if (other !== undefined$1) {
		          if (result === undefined$1) {
		            return other;
		          }
		          if (typeof value == 'string' || typeof other == 'string') {
		            value = baseToString(value);
		            other = baseToString(other);
		          } else {
		            value = baseToNumber(value);
		            other = baseToNumber(other);
		          }
		          result = operator(value, other);
		        }
		        return result;
		      };
		    }

		    /**
		     * Creates a function like `_.over`.
		     *
		     * @private
		     * @param {Function} arrayFunc The function to iterate over iteratees.
		     * @returns {Function} Returns the new over function.
		     */
		    function createOver(arrayFunc) {
		      return flatRest(function(iteratees) {
		        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
		        return baseRest(function(args) {
		          var thisArg = this;
		          return arrayFunc(iteratees, function(iteratee) {
		            return apply(iteratee, thisArg, args);
		          });
		        });
		      });
		    }

		    /**
		     * Creates the padding for `string` based on `length`. The `chars` string
		     * is truncated if the number of characters exceeds `length`.
		     *
		     * @private
		     * @param {number} length The padding length.
		     * @param {string} [chars=' '] The string used as padding.
		     * @returns {string} Returns the padding for `string`.
		     */
		    function createPadding(length, chars) {
		      chars = chars === undefined$1 ? ' ' : baseToString(chars);

		      var charsLength = chars.length;
		      if (charsLength < 2) {
		        return charsLength ? baseRepeat(chars, length) : chars;
		      }
		      var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
		      return hasUnicode(chars)
		        ? castSlice(stringToArray(result), 0, length).join('')
		        : result.slice(0, length);
		    }

		    /**
		     * Creates a function that wraps `func` to invoke it with the `this` binding
		     * of `thisArg` and `partials` prepended to the arguments it receives.
		     *
		     * @private
		     * @param {Function} func The function to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {*} thisArg The `this` binding of `func`.
		     * @param {Array} partials The arguments to prepend to those provided to
		     *  the new function.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createPartial(func, bitmask, thisArg, partials) {
		      var isBind = bitmask & WRAP_BIND_FLAG,
		          Ctor = createCtor(func);

		      function wrapper() {
		        var argsIndex = -1,
		            argsLength = arguments.length,
		            leftIndex = -1,
		            leftLength = partials.length,
		            args = Array(leftLength + argsLength),
		            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

		        while (++leftIndex < leftLength) {
		          args[leftIndex] = partials[leftIndex];
		        }
		        while (argsLength--) {
		          args[leftIndex++] = arguments[++argsIndex];
		        }
		        return apply(fn, isBind ? thisArg : this, args);
		      }
		      return wrapper;
		    }

		    /**
		     * Creates a `_.range` or `_.rangeRight` function.
		     *
		     * @private
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Function} Returns the new range function.
		     */
		    function createRange(fromRight) {
		      return function(start, end, step) {
		        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
		          end = step = undefined$1;
		        }
		        // Ensure the sign of `-0` is preserved.
		        start = toFinite(start);
		        if (end === undefined$1) {
		          end = start;
		          start = 0;
		        } else {
		          end = toFinite(end);
		        }
		        step = step === undefined$1 ? (start < end ? 1 : -1) : toFinite(step);
		        return baseRange(start, end, step, fromRight);
		      };
		    }

		    /**
		     * Creates a function that performs a relational operation on two values.
		     *
		     * @private
		     * @param {Function} operator The function to perform the operation.
		     * @returns {Function} Returns the new relational operation function.
		     */
		    function createRelationalOperation(operator) {
		      return function(value, other) {
		        if (!(typeof value == 'string' && typeof other == 'string')) {
		          value = toNumber(value);
		          other = toNumber(other);
		        }
		        return operator(value, other);
		      };
		    }

		    /**
		     * Creates a function that wraps `func` to continue currying.
		     *
		     * @private
		     * @param {Function} func The function to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {Function} wrapFunc The function to create the `func` wrapper.
		     * @param {*} placeholder The placeholder value.
		     * @param {*} [thisArg] The `this` binding of `func`.
		     * @param {Array} [partials] The arguments to prepend to those provided to
		     *  the new function.
		     * @param {Array} [holders] The `partials` placeholder indexes.
		     * @param {Array} [argPos] The argument positions of the new function.
		     * @param {number} [ary] The arity cap of `func`.
		     * @param {number} [arity] The arity of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
		      var isCurry = bitmask & WRAP_CURRY_FLAG,
		          newHolders = isCurry ? holders : undefined$1,
		          newHoldersRight = isCurry ? undefined$1 : holders,
		          newPartials = isCurry ? partials : undefined$1,
		          newPartialsRight = isCurry ? undefined$1 : partials;

		      bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
		      bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

		      if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
		        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
		      }
		      var newData = [
		        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
		        newHoldersRight, argPos, ary, arity
		      ];

		      var result = wrapFunc.apply(undefined$1, newData);
		      if (isLaziable(func)) {
		        setData(result, newData);
		      }
		      result.placeholder = placeholder;
		      return setWrapToString(result, func, bitmask);
		    }

		    /**
		     * Creates a function like `_.round`.
		     *
		     * @private
		     * @param {string} methodName The name of the `Math` method to use when rounding.
		     * @returns {Function} Returns the new round function.
		     */
		    function createRound(methodName) {
		      var func = Math[methodName];
		      return function(number, precision) {
		        number = toNumber(number);
		        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
		        if (precision && nativeIsFinite(number)) {
		          // Shift with exponential notation to avoid floating-point issues.
		          // See [MDN](https://mdn.io/round#Examples) for more details.
		          var pair = (toString(number) + 'e').split('e'),
		              value = func(pair[0] + 'e' + (+pair[1] + precision));

		          pair = (toString(value) + 'e').split('e');
		          return +(pair[0] + 'e' + (+pair[1] - precision));
		        }
		        return func(number);
		      };
		    }

		    /**
		     * Creates a set object of `values`.
		     *
		     * @private
		     * @param {Array} values The values to add to the set.
		     * @returns {Object} Returns the new set.
		     */
		    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
		      return new Set(values);
		    };

		    /**
		     * Creates a `_.toPairs` or `_.toPairsIn` function.
		     *
		     * @private
		     * @param {Function} keysFunc The function to get the keys of a given object.
		     * @returns {Function} Returns the new pairs function.
		     */
		    function createToPairs(keysFunc) {
		      return function(object) {
		        var tag = getTag(object);
		        if (tag == mapTag) {
		          return mapToArray(object);
		        }
		        if (tag == setTag) {
		          return setToPairs(object);
		        }
		        return baseToPairs(object, keysFunc(object));
		      };
		    }

		    /**
		     * Creates a function that either curries or invokes `func` with optional
		     * `this` binding and partially applied arguments.
		     *
		     * @private
		     * @param {Function|string} func The function or method name to wrap.
		     * @param {number} bitmask The bitmask flags.
		     *    1 - `_.bind`
		     *    2 - `_.bindKey`
		     *    4 - `_.curry` or `_.curryRight` of a bound function
		     *    8 - `_.curry`
		     *   16 - `_.curryRight`
		     *   32 - `_.partial`
		     *   64 - `_.partialRight`
		     *  128 - `_.rearg`
		     *  256 - `_.ary`
		     *  512 - `_.flip`
		     * @param {*} [thisArg] The `this` binding of `func`.
		     * @param {Array} [partials] The arguments to be partially applied.
		     * @param {Array} [holders] The `partials` placeholder indexes.
		     * @param {Array} [argPos] The argument positions of the new function.
		     * @param {number} [ary] The arity cap of `func`.
		     * @param {number} [arity] The arity of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
		      var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
		      if (!isBindKey && typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      var length = partials ? partials.length : 0;
		      if (!length) {
		        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
		        partials = holders = undefined$1;
		      }
		      ary = ary === undefined$1 ? ary : nativeMax(toInteger(ary), 0);
		      arity = arity === undefined$1 ? arity : toInteger(arity);
		      length -= holders ? holders.length : 0;

		      if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
		        var partialsRight = partials,
		            holdersRight = holders;

		        partials = holders = undefined$1;
		      }
		      var data = isBindKey ? undefined$1 : getData(func);

		      var newData = [
		        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
		        argPos, ary, arity
		      ];

		      if (data) {
		        mergeData(newData, data);
		      }
		      func = newData[0];
		      bitmask = newData[1];
		      thisArg = newData[2];
		      partials = newData[3];
		      holders = newData[4];
		      arity = newData[9] = newData[9] === undefined$1
		        ? (isBindKey ? 0 : func.length)
		        : nativeMax(newData[9] - length, 0);

		      if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
		        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
		      }
		      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
		        var result = createBind(func, bitmask, thisArg);
		      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
		        result = createCurry(func, bitmask, arity);
		      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
		        result = createPartial(func, bitmask, thisArg, partials);
		      } else {
		        result = createHybrid.apply(undefined$1, newData);
		      }
		      var setter = data ? baseSetData : setData;
		      return setWrapToString(setter(result, newData), func, bitmask);
		    }

		    /**
		     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
		     * of source objects to the destination object for all destination properties
		     * that resolve to `undefined`.
		     *
		     * @private
		     * @param {*} objValue The destination value.
		     * @param {*} srcValue The source value.
		     * @param {string} key The key of the property to assign.
		     * @param {Object} object The parent object of `objValue`.
		     * @returns {*} Returns the value to assign.
		     */
		    function customDefaultsAssignIn(objValue, srcValue, key, object) {
		      if (objValue === undefined$1 ||
		          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
		        return srcValue;
		      }
		      return objValue;
		    }

		    /**
		     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
		     * objects into destination objects that are passed thru.
		     *
		     * @private
		     * @param {*} objValue The destination value.
		     * @param {*} srcValue The source value.
		     * @param {string} key The key of the property to merge.
		     * @param {Object} object The parent object of `objValue`.
		     * @param {Object} source The parent object of `srcValue`.
		     * @param {Object} [stack] Tracks traversed source values and their merged
		     *  counterparts.
		     * @returns {*} Returns the value to assign.
		     */
		    function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
		      if (isObject(objValue) && isObject(srcValue)) {
		        // Recursively merge objects and arrays (susceptible to call stack limits).
		        stack.set(srcValue, objValue);
		        baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
		        stack['delete'](srcValue);
		      }
		      return objValue;
		    }

		    /**
		     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
		     * objects.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @param {string} key The key of the property to inspect.
		     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
		     */
		    function customOmitClone(value) {
		      return isPlainObject(value) ? undefined$1 : value;
		    }

		    /**
		     * A specialized version of `baseIsEqualDeep` for arrays with support for
		     * partial deep comparisons.
		     *
		     * @private
		     * @param {Array} array The array to compare.
		     * @param {Array} other The other array to compare.
		     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
		     * @param {Function} customizer The function to customize comparisons.
		     * @param {Function} equalFunc The function to determine equivalents of values.
		     * @param {Object} stack Tracks traversed `array` and `other` objects.
		     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
		     */
		    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
		      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
		          arrLength = array.length,
		          othLength = other.length;

		      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
		        return false;
		      }
		      // Check that cyclic values are equal.
		      var arrStacked = stack.get(array);
		      var othStacked = stack.get(other);
		      if (arrStacked && othStacked) {
		        return arrStacked == other && othStacked == array;
		      }
		      var index = -1,
		          result = true,
		          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined$1;

		      stack.set(array, other);
		      stack.set(other, array);

		      // Ignore non-index properties.
		      while (++index < arrLength) {
		        var arrValue = array[index],
		            othValue = other[index];

		        if (customizer) {
		          var compared = isPartial
		            ? customizer(othValue, arrValue, index, other, array, stack)
		            : customizer(arrValue, othValue, index, array, other, stack);
		        }
		        if (compared !== undefined$1) {
		          if (compared) {
		            continue;
		          }
		          result = false;
		          break;
		        }
		        // Recursively compare arrays (susceptible to call stack limits).
		        if (seen) {
		          if (!arraySome(other, function(othValue, othIndex) {
		                if (!cacheHas(seen, othIndex) &&
		                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
		                  return seen.push(othIndex);
		                }
		              })) {
		            result = false;
		            break;
		          }
		        } else if (!(
		              arrValue === othValue ||
		                equalFunc(arrValue, othValue, bitmask, customizer, stack)
		            )) {
		          result = false;
		          break;
		        }
		      }
		      stack['delete'](array);
		      stack['delete'](other);
		      return result;
		    }

		    /**
		     * A specialized version of `baseIsEqualDeep` for comparing objects of
		     * the same `toStringTag`.
		     *
		     * **Note:** This function only supports comparing values with tags of
		     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
		     *
		     * @private
		     * @param {Object} object The object to compare.
		     * @param {Object} other The other object to compare.
		     * @param {string} tag The `toStringTag` of the objects to compare.
		     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
		     * @param {Function} customizer The function to customize comparisons.
		     * @param {Function} equalFunc The function to determine equivalents of values.
		     * @param {Object} stack Tracks traversed `object` and `other` objects.
		     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
		     */
		    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
		      switch (tag) {
		        case dataViewTag:
		          if ((object.byteLength != other.byteLength) ||
		              (object.byteOffset != other.byteOffset)) {
		            return false;
		          }
		          object = object.buffer;
		          other = other.buffer;

		        case arrayBufferTag:
		          if ((object.byteLength != other.byteLength) ||
		              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
		            return false;
		          }
		          return true;

		        case boolTag:
		        case dateTag:
		        case numberTag:
		          // Coerce booleans to `1` or `0` and dates to milliseconds.
		          // Invalid dates are coerced to `NaN`.
		          return eq(+object, +other);

		        case errorTag:
		          return object.name == other.name && object.message == other.message;

		        case regexpTag:
		        case stringTag:
		          // Coerce regexes to strings and treat strings, primitives and objects,
		          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
		          // for more details.
		          return object == (other + '');

		        case mapTag:
		          var convert = mapToArray;

		        case setTag:
		          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
		          convert || (convert = setToArray);

		          if (object.size != other.size && !isPartial) {
		            return false;
		          }
		          // Assume cyclic values are equal.
		          var stacked = stack.get(object);
		          if (stacked) {
		            return stacked == other;
		          }
		          bitmask |= COMPARE_UNORDERED_FLAG;

		          // Recursively compare objects (susceptible to call stack limits).
		          stack.set(object, other);
		          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
		          stack['delete'](object);
		          return result;

		        case symbolTag:
		          if (symbolValueOf) {
		            return symbolValueOf.call(object) == symbolValueOf.call(other);
		          }
		      }
		      return false;
		    }

		    /**
		     * A specialized version of `baseIsEqualDeep` for objects with support for
		     * partial deep comparisons.
		     *
		     * @private
		     * @param {Object} object The object to compare.
		     * @param {Object} other The other object to compare.
		     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
		     * @param {Function} customizer The function to customize comparisons.
		     * @param {Function} equalFunc The function to determine equivalents of values.
		     * @param {Object} stack Tracks traversed `object` and `other` objects.
		     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
		     */
		    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
		      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
		          objProps = getAllKeys(object),
		          objLength = objProps.length,
		          othProps = getAllKeys(other),
		          othLength = othProps.length;

		      if (objLength != othLength && !isPartial) {
		        return false;
		      }
		      var index = objLength;
		      while (index--) {
		        var key = objProps[index];
		        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
		          return false;
		        }
		      }
		      // Check that cyclic values are equal.
		      var objStacked = stack.get(object);
		      var othStacked = stack.get(other);
		      if (objStacked && othStacked) {
		        return objStacked == other && othStacked == object;
		      }
		      var result = true;
		      stack.set(object, other);
		      stack.set(other, object);

		      var skipCtor = isPartial;
		      while (++index < objLength) {
		        key = objProps[index];
		        var objValue = object[key],
		            othValue = other[key];

		        if (customizer) {
		          var compared = isPartial
		            ? customizer(othValue, objValue, key, other, object, stack)
		            : customizer(objValue, othValue, key, object, other, stack);
		        }
		        // Recursively compare objects (susceptible to call stack limits).
		        if (!(compared === undefined$1
		              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
		              : compared
		            )) {
		          result = false;
		          break;
		        }
		        skipCtor || (skipCtor = key == 'constructor');
		      }
		      if (result && !skipCtor) {
		        var objCtor = object.constructor,
		            othCtor = other.constructor;

		        // Non `Object` object instances with different constructors are not equal.
		        if (objCtor != othCtor &&
		            ('constructor' in object && 'constructor' in other) &&
		            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
		              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
		          result = false;
		        }
		      }
		      stack['delete'](object);
		      stack['delete'](other);
		      return result;
		    }

		    /**
		     * A specialized version of `baseRest` which flattens the rest array.
		     *
		     * @private
		     * @param {Function} func The function to apply a rest parameter to.
		     * @returns {Function} Returns the new function.
		     */
		    function flatRest(func) {
		      return setToString(overRest(func, undefined$1, flatten), func + '');
		    }

		    /**
		     * Creates an array of own enumerable property names and symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names and symbols.
		     */
		    function getAllKeys(object) {
		      return baseGetAllKeys(object, keys, getSymbols);
		    }

		    /**
		     * Creates an array of own and inherited enumerable property names and
		     * symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names and symbols.
		     */
		    function getAllKeysIn(object) {
		      return baseGetAllKeys(object, keysIn, getSymbolsIn);
		    }

		    /**
		     * Gets metadata for `func`.
		     *
		     * @private
		     * @param {Function} func The function to query.
		     * @returns {*} Returns the metadata for `func`.
		     */
		    var getData = !metaMap ? noop : function(func) {
		      return metaMap.get(func);
		    };

		    /**
		     * Gets the name of `func`.
		     *
		     * @private
		     * @param {Function} func The function to query.
		     * @returns {string} Returns the function name.
		     */
		    function getFuncName(func) {
		      var result = (func.name + ''),
		          array = realNames[result],
		          length = hasOwnProperty.call(realNames, result) ? array.length : 0;

		      while (length--) {
		        var data = array[length],
		            otherFunc = data.func;
		        if (otherFunc == null || otherFunc == func) {
		          return data.name;
		        }
		      }
		      return result;
		    }

		    /**
		     * Gets the argument placeholder value for `func`.
		     *
		     * @private
		     * @param {Function} func The function to inspect.
		     * @returns {*} Returns the placeholder value.
		     */
		    function getHolder(func) {
		      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
		      return object.placeholder;
		    }

		    /**
		     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
		     * this function returns the custom method, otherwise it returns `baseIteratee`.
		     * If arguments are provided, the chosen function is invoked with them and
		     * its result is returned.
		     *
		     * @private
		     * @param {*} [value] The value to convert to an iteratee.
		     * @param {number} [arity] The arity of the created iteratee.
		     * @returns {Function} Returns the chosen function or its result.
		     */
		    function getIteratee() {
		      var result = lodash.iteratee || iteratee;
		      result = result === iteratee ? baseIteratee : result;
		      return arguments.length ? result(arguments[0], arguments[1]) : result;
		    }

		    /**
		     * Gets the data for `map`.
		     *
		     * @private
		     * @param {Object} map The map to query.
		     * @param {string} key The reference key.
		     * @returns {*} Returns the map data.
		     */
		    function getMapData(map, key) {
		      var data = map.__data__;
		      return isKeyable(key)
		        ? data[typeof key == 'string' ? 'string' : 'hash']
		        : data.map;
		    }

		    /**
		     * Gets the property names, values, and compare flags of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the match data of `object`.
		     */
		    function getMatchData(object) {
		      var result = keys(object),
		          length = result.length;

		      while (length--) {
		        var key = result[length],
		            value = object[key];

		        result[length] = [key, value, isStrictComparable(value)];
		      }
		      return result;
		    }

		    /**
		     * Gets the native function at `key` of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {string} key The key of the method to get.
		     * @returns {*} Returns the function if it's native, else `undefined`.
		     */
		    function getNative(object, key) {
		      var value = getValue(object, key);
		      return baseIsNative(value) ? value : undefined$1;
		    }

		    /**
		     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
		     *
		     * @private
		     * @param {*} value The value to query.
		     * @returns {string} Returns the raw `toStringTag`.
		     */
		    function getRawTag(value) {
		      var isOwn = hasOwnProperty.call(value, symToStringTag),
		          tag = value[symToStringTag];

		      try {
		        value[symToStringTag] = undefined$1;
		        var unmasked = true;
		      } catch (e) {}

		      var result = nativeObjectToString.call(value);
		      if (unmasked) {
		        if (isOwn) {
		          value[symToStringTag] = tag;
		        } else {
		          delete value[symToStringTag];
		        }
		      }
		      return result;
		    }

		    /**
		     * Creates an array of the own enumerable symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of symbols.
		     */
		    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
		      if (object == null) {
		        return [];
		      }
		      object = Object(object);
		      return arrayFilter(nativeGetSymbols(object), function(symbol) {
		        return propertyIsEnumerable.call(object, symbol);
		      });
		    };

		    /**
		     * Creates an array of the own and inherited enumerable symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of symbols.
		     */
		    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
		      var result = [];
		      while (object) {
		        arrayPush(result, getSymbols(object));
		        object = getPrototype(object);
		      }
		      return result;
		    };

		    /**
		     * Gets the `toStringTag` of `value`.
		     *
		     * @private
		     * @param {*} value The value to query.
		     * @returns {string} Returns the `toStringTag`.
		     */
		    var getTag = baseGetTag;

		    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
		    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
		        (Map && getTag(new Map) != mapTag) ||
		        (Promise && getTag(Promise.resolve()) != promiseTag) ||
		        (Set && getTag(new Set) != setTag) ||
		        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
		      getTag = function(value) {
		        var result = baseGetTag(value),
		            Ctor = result == objectTag ? value.constructor : undefined$1,
		            ctorString = Ctor ? toSource(Ctor) : '';

		        if (ctorString) {
		          switch (ctorString) {
		            case dataViewCtorString: return dataViewTag;
		            case mapCtorString: return mapTag;
		            case promiseCtorString: return promiseTag;
		            case setCtorString: return setTag;
		            case weakMapCtorString: return weakMapTag;
		          }
		        }
		        return result;
		      };
		    }

		    /**
		     * Gets the view, applying any `transforms` to the `start` and `end` positions.
		     *
		     * @private
		     * @param {number} start The start of the view.
		     * @param {number} end The end of the view.
		     * @param {Array} transforms The transformations to apply to the view.
		     * @returns {Object} Returns an object containing the `start` and `end`
		     *  positions of the view.
		     */
		    function getView(start, end, transforms) {
		      var index = -1,
		          length = transforms.length;

		      while (++index < length) {
		        var data = transforms[index],
		            size = data.size;

		        switch (data.type) {
		          case 'drop':      start += size; break;
		          case 'dropRight': end -= size; break;
		          case 'take':      end = nativeMin(end, start + size); break;
		          case 'takeRight': start = nativeMax(start, end - size); break;
		        }
		      }
		      return { 'start': start, 'end': end };
		    }

		    /**
		     * Extracts wrapper details from the `source` body comment.
		     *
		     * @private
		     * @param {string} source The source to inspect.
		     * @returns {Array} Returns the wrapper details.
		     */
		    function getWrapDetails(source) {
		      var match = source.match(reWrapDetails);
		      return match ? match[1].split(reSplitDetails) : [];
		    }

		    /**
		     * Checks if `path` exists on `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path to check.
		     * @param {Function} hasFunc The function to check properties.
		     * @returns {boolean} Returns `true` if `path` exists, else `false`.
		     */
		    function hasPath(object, path, hasFunc) {
		      path = castPath(path, object);

		      var index = -1,
		          length = path.length,
		          result = false;

		      while (++index < length) {
		        var key = toKey(path[index]);
		        if (!(result = object != null && hasFunc(object, key))) {
		          break;
		        }
		        object = object[key];
		      }
		      if (result || ++index != length) {
		        return result;
		      }
		      length = object == null ? 0 : object.length;
		      return !!length && isLength(length) && isIndex(key, length) &&
		        (isArray(object) || isArguments(object));
		    }

		    /**
		     * Initializes an array clone.
		     *
		     * @private
		     * @param {Array} array The array to clone.
		     * @returns {Array} Returns the initialized clone.
		     */
		    function initCloneArray(array) {
		      var length = array.length,
		          result = new array.constructor(length);

		      // Add properties assigned by `RegExp#exec`.
		      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
		        result.index = array.index;
		        result.input = array.input;
		      }
		      return result;
		    }

		    /**
		     * Initializes an object clone.
		     *
		     * @private
		     * @param {Object} object The object to clone.
		     * @returns {Object} Returns the initialized clone.
		     */
		    function initCloneObject(object) {
		      return (typeof object.constructor == 'function' && !isPrototype(object))
		        ? baseCreate(getPrototype(object))
		        : {};
		    }

		    /**
		     * Initializes an object clone based on its `toStringTag`.
		     *
		     * **Note:** This function only supports cloning values with tags of
		     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
		     *
		     * @private
		     * @param {Object} object The object to clone.
		     * @param {string} tag The `toStringTag` of the object to clone.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Object} Returns the initialized clone.
		     */
		    function initCloneByTag(object, tag, isDeep) {
		      var Ctor = object.constructor;
		      switch (tag) {
		        case arrayBufferTag:
		          return cloneArrayBuffer(object);

		        case boolTag:
		        case dateTag:
		          return new Ctor(+object);

		        case dataViewTag:
		          return cloneDataView(object, isDeep);

		        case float32Tag: case float64Tag:
		        case int8Tag: case int16Tag: case int32Tag:
		        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
		          return cloneTypedArray(object, isDeep);

		        case mapTag:
		          return new Ctor;

		        case numberTag:
		        case stringTag:
		          return new Ctor(object);

		        case regexpTag:
		          return cloneRegExp(object);

		        case setTag:
		          return new Ctor;

		        case symbolTag:
		          return cloneSymbol(object);
		      }
		    }

		    /**
		     * Inserts wrapper `details` in a comment at the top of the `source` body.
		     *
		     * @private
		     * @param {string} source The source to modify.
		     * @returns {Array} details The details to insert.
		     * @returns {string} Returns the modified source.
		     */
		    function insertWrapDetails(source, details) {
		      var length = details.length;
		      if (!length) {
		        return source;
		      }
		      var lastIndex = length - 1;
		      details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
		      details = details.join(length > 2 ? ', ' : ' ');
		      return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
		    }

		    /**
		     * Checks if `value` is a flattenable `arguments` object or array.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
		     */
		    function isFlattenable(value) {
		      return isArray(value) || isArguments(value) ||
		        !!(spreadableSymbol && value && value[spreadableSymbol]);
		    }

		    /**
		     * Checks if `value` is a valid array-like index.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
		     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
		     */
		    function isIndex(value, length) {
		      var type = typeof value;
		      length = length == null ? MAX_SAFE_INTEGER : length;

		      return !!length &&
		        (type == 'number' ||
		          (type != 'symbol' && reIsUint.test(value))) &&
		            (value > -1 && value % 1 == 0 && value < length);
		    }

		    /**
		     * Checks if the given arguments are from an iteratee call.
		     *
		     * @private
		     * @param {*} value The potential iteratee value argument.
		     * @param {*} index The potential iteratee index or key argument.
		     * @param {*} object The potential iteratee object argument.
		     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
		     *  else `false`.
		     */
		    function isIterateeCall(value, index, object) {
		      if (!isObject(object)) {
		        return false;
		      }
		      var type = typeof index;
		      if (type == 'number'
		            ? (isArrayLike(object) && isIndex(index, object.length))
		            : (type == 'string' && index in object)
		          ) {
		        return eq(object[index], value);
		      }
		      return false;
		    }

		    /**
		     * Checks if `value` is a property name and not a property path.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @param {Object} [object] The object to query keys on.
		     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
		     */
		    function isKey(value, object) {
		      if (isArray(value)) {
		        return false;
		      }
		      var type = typeof value;
		      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
		          value == null || isSymbol(value)) {
		        return true;
		      }
		      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
		        (object != null && value in Object(object));
		    }

		    /**
		     * Checks if `value` is suitable for use as unique object key.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
		     */
		    function isKeyable(value) {
		      var type = typeof value;
		      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
		        ? (value !== '__proto__')
		        : (value === null);
		    }

		    /**
		     * Checks if `func` has a lazy counterpart.
		     *
		     * @private
		     * @param {Function} func The function to check.
		     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
		     *  else `false`.
		     */
		    function isLaziable(func) {
		      var funcName = getFuncName(func),
		          other = lodash[funcName];

		      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
		        return false;
		      }
		      if (func === other) {
		        return true;
		      }
		      var data = getData(other);
		      return !!data && func === data[0];
		    }

		    /**
		     * Checks if `func` has its source masked.
		     *
		     * @private
		     * @param {Function} func The function to check.
		     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
		     */
		    function isMasked(func) {
		      return !!maskSrcKey && (maskSrcKey in func);
		    }

		    /**
		     * Checks if `func` is capable of being masked.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
		     */
		    var isMaskable = coreJsData ? isFunction : stubFalse;

		    /**
		     * Checks if `value` is likely a prototype object.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
		     */
		    function isPrototype(value) {
		      var Ctor = value && value.constructor,
		          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

		      return value === proto;
		    }

		    /**
		     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` if suitable for strict
		     *  equality comparisons, else `false`.
		     */
		    function isStrictComparable(value) {
		      return value === value && !isObject(value);
		    }

		    /**
		     * A specialized version of `matchesProperty` for source values suitable
		     * for strict equality comparisons, i.e. `===`.
		     *
		     * @private
		     * @param {string} key The key of the property to get.
		     * @param {*} srcValue The value to match.
		     * @returns {Function} Returns the new spec function.
		     */
		    function matchesStrictComparable(key, srcValue) {
		      return function(object) {
		        if (object == null) {
		          return false;
		        }
		        return object[key] === srcValue &&
		          (srcValue !== undefined$1 || (key in Object(object)));
		      };
		    }

		    /**
		     * A specialized version of `_.memoize` which clears the memoized function's
		     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
		     *
		     * @private
		     * @param {Function} func The function to have its output memoized.
		     * @returns {Function} Returns the new memoized function.
		     */
		    function memoizeCapped(func) {
		      var result = memoize(func, function(key) {
		        if (cache.size === MAX_MEMOIZE_SIZE) {
		          cache.clear();
		        }
		        return key;
		      });

		      var cache = result.cache;
		      return result;
		    }

		    /**
		     * Merges the function metadata of `source` into `data`.
		     *
		     * Merging metadata reduces the number of wrappers used to invoke a function.
		     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
		     * may be applied regardless of execution order. Methods like `_.ary` and
		     * `_.rearg` modify function arguments, making the order in which they are
		     * executed important, preventing the merging of metadata. However, we make
		     * an exception for a safe combined case where curried functions have `_.ary`
		     * and or `_.rearg` applied.
		     *
		     * @private
		     * @param {Array} data The destination metadata.
		     * @param {Array} source The source metadata.
		     * @returns {Array} Returns `data`.
		     */
		    function mergeData(data, source) {
		      var bitmask = data[1],
		          srcBitmask = source[1],
		          newBitmask = bitmask | srcBitmask,
		          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

		      var isCombo =
		        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
		        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
		        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

		      // Exit early if metadata can't be merged.
		      if (!(isCommon || isCombo)) {
		        return data;
		      }
		      // Use source `thisArg` if available.
		      if (srcBitmask & WRAP_BIND_FLAG) {
		        data[2] = source[2];
		        // Set when currying a bound function.
		        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
		      }
		      // Compose partial arguments.
		      var value = source[3];
		      if (value) {
		        var partials = data[3];
		        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
		        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
		      }
		      // Compose partial right arguments.
		      value = source[5];
		      if (value) {
		        partials = data[5];
		        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
		        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
		      }
		      // Use source `argPos` if available.
		      value = source[7];
		      if (value) {
		        data[7] = value;
		      }
		      // Use source `ary` if it's smaller.
		      if (srcBitmask & WRAP_ARY_FLAG) {
		        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
		      }
		      // Use source `arity` if one is not provided.
		      if (data[9] == null) {
		        data[9] = source[9];
		      }
		      // Use source `func` and merge bitmasks.
		      data[0] = source[0];
		      data[1] = newBitmask;

		      return data;
		    }

		    /**
		     * This function is like
		     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
		     * except that it includes inherited enumerable properties.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     */
		    function nativeKeysIn(object) {
		      var result = [];
		      if (object != null) {
		        for (var key in Object(object)) {
		          result.push(key);
		        }
		      }
		      return result;
		    }

		    /**
		     * Converts `value` to a string using `Object.prototype.toString`.
		     *
		     * @private
		     * @param {*} value The value to convert.
		     * @returns {string} Returns the converted string.
		     */
		    function objectToString(value) {
		      return nativeObjectToString.call(value);
		    }

		    /**
		     * A specialized version of `baseRest` which transforms the rest array.
		     *
		     * @private
		     * @param {Function} func The function to apply a rest parameter to.
		     * @param {number} [start=func.length-1] The start position of the rest parameter.
		     * @param {Function} transform The rest array transform.
		     * @returns {Function} Returns the new function.
		     */
		    function overRest(func, start, transform) {
		      start = nativeMax(start === undefined$1 ? (func.length - 1) : start, 0);
		      return function() {
		        var args = arguments,
		            index = -1,
		            length = nativeMax(args.length - start, 0),
		            array = Array(length);

		        while (++index < length) {
		          array[index] = args[start + index];
		        }
		        index = -1;
		        var otherArgs = Array(start + 1);
		        while (++index < start) {
		          otherArgs[index] = args[index];
		        }
		        otherArgs[start] = transform(array);
		        return apply(func, this, otherArgs);
		      };
		    }

		    /**
		     * Gets the parent value at `path` of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Array} path The path to get the parent value of.
		     * @returns {*} Returns the parent value.
		     */
		    function parent(object, path) {
		      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
		    }

		    /**
		     * Reorder `array` according to the specified indexes where the element at
		     * the first index is assigned as the first element, the element at
		     * the second index is assigned as the second element, and so on.
		     *
		     * @private
		     * @param {Array} array The array to reorder.
		     * @param {Array} indexes The arranged array indexes.
		     * @returns {Array} Returns `array`.
		     */
		    function reorder(array, indexes) {
		      var arrLength = array.length,
		          length = nativeMin(indexes.length, arrLength),
		          oldArray = copyArray(array);

		      while (length--) {
		        var index = indexes[length];
		        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
		      }
		      return array;
		    }

		    /**
		     * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {string} key The key of the property to get.
		     * @returns {*} Returns the property value.
		     */
		    function safeGet(object, key) {
		      if (key === 'constructor' && typeof object[key] === 'function') {
		        return;
		      }

		      if (key == '__proto__') {
		        return;
		      }

		      return object[key];
		    }

		    /**
		     * Sets metadata for `func`.
		     *
		     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
		     * period of time, it will trip its breaker and transition to an identity
		     * function to avoid garbage collection pauses in V8. See
		     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
		     * for more details.
		     *
		     * @private
		     * @param {Function} func The function to associate metadata with.
		     * @param {*} data The metadata.
		     * @returns {Function} Returns `func`.
		     */
		    var setData = shortOut(baseSetData);

		    /**
		     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
		     *
		     * @private
		     * @param {Function} func The function to delay.
		     * @param {number} wait The number of milliseconds to delay invocation.
		     * @returns {number|Object} Returns the timer id or timeout object.
		     */
		    var setTimeout = ctxSetTimeout || function(func, wait) {
		      return root.setTimeout(func, wait);
		    };

		    /**
		     * Sets the `toString` method of `func` to return `string`.
		     *
		     * @private
		     * @param {Function} func The function to modify.
		     * @param {Function} string The `toString` result.
		     * @returns {Function} Returns `func`.
		     */
		    var setToString = shortOut(baseSetToString);

		    /**
		     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
		     * with wrapper details in a comment at the top of the source body.
		     *
		     * @private
		     * @param {Function} wrapper The function to modify.
		     * @param {Function} reference The reference function.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @returns {Function} Returns `wrapper`.
		     */
		    function setWrapToString(wrapper, reference, bitmask) {
		      var source = (reference + '');
		      return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
		    }

		    /**
		     * Creates a function that'll short out and invoke `identity` instead
		     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
		     * milliseconds.
		     *
		     * @private
		     * @param {Function} func The function to restrict.
		     * @returns {Function} Returns the new shortable function.
		     */
		    function shortOut(func) {
		      var count = 0,
		          lastCalled = 0;

		      return function() {
		        var stamp = nativeNow(),
		            remaining = HOT_SPAN - (stamp - lastCalled);

		        lastCalled = stamp;
		        if (remaining > 0) {
		          if (++count >= HOT_COUNT) {
		            return arguments[0];
		          }
		        } else {
		          count = 0;
		        }
		        return func.apply(undefined$1, arguments);
		      };
		    }

		    /**
		     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
		     *
		     * @private
		     * @param {Array} array The array to shuffle.
		     * @param {number} [size=array.length] The size of `array`.
		     * @returns {Array} Returns `array`.
		     */
		    function shuffleSelf(array, size) {
		      var index = -1,
		          length = array.length,
		          lastIndex = length - 1;

		      size = size === undefined$1 ? length : size;
		      while (++index < size) {
		        var rand = baseRandom(index, lastIndex),
		            value = array[rand];

		        array[rand] = array[index];
		        array[index] = value;
		      }
		      array.length = size;
		      return array;
		    }

		    /**
		     * Converts `string` to a property path array.
		     *
		     * @private
		     * @param {string} string The string to convert.
		     * @returns {Array} Returns the property path array.
		     */
		    var stringToPath = memoizeCapped(function(string) {
		      var result = [];
		      if (string.charCodeAt(0) === 46 /* . */) {
		        result.push('');
		      }
		      string.replace(rePropName, function(match, number, quote, subString) {
		        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
		      });
		      return result;
		    });

		    /**
		     * Converts `value` to a string key if it's not a string or symbol.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @returns {string|symbol} Returns the key.
		     */
		    function toKey(value) {
		      if (typeof value == 'string' || isSymbol(value)) {
		        return value;
		      }
		      var result = (value + '');
		      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
		    }

		    /**
		     * Converts `func` to its source code.
		     *
		     * @private
		     * @param {Function} func The function to convert.
		     * @returns {string} Returns the source code.
		     */
		    function toSource(func) {
		      if (func != null) {
		        try {
		          return funcToString.call(func);
		        } catch (e) {}
		        try {
		          return (func + '');
		        } catch (e) {}
		      }
		      return '';
		    }

		    /**
		     * Updates wrapper `details` based on `bitmask` flags.
		     *
		     * @private
		     * @returns {Array} details The details to modify.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @returns {Array} Returns `details`.
		     */
		    function updateWrapDetails(details, bitmask) {
		      arrayEach(wrapFlags, function(pair) {
		        var value = '_.' + pair[0];
		        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
		          details.push(value);
		        }
		      });
		      return details.sort();
		    }

		    /**
		     * Creates a clone of `wrapper`.
		     *
		     * @private
		     * @param {Object} wrapper The wrapper to clone.
		     * @returns {Object} Returns the cloned wrapper.
		     */
		    function wrapperClone(wrapper) {
		      if (wrapper instanceof LazyWrapper) {
		        return wrapper.clone();
		      }
		      var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
		      result.__actions__ = copyArray(wrapper.__actions__);
		      result.__index__  = wrapper.__index__;
		      result.__values__ = wrapper.__values__;
		      return result;
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates an array of elements split into groups the length of `size`.
		     * If `array` can't be split evenly, the final chunk will be the remaining
		     * elements.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to process.
		     * @param {number} [size=1] The length of each chunk
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the new array of chunks.
		     * @example
		     *
		     * _.chunk(['a', 'b', 'c', 'd'], 2);
		     * // => [['a', 'b'], ['c', 'd']]
		     *
		     * _.chunk(['a', 'b', 'c', 'd'], 3);
		     * // => [['a', 'b', 'c'], ['d']]
		     */
		    function chunk(array, size, guard) {
		      if ((guard ? isIterateeCall(array, size, guard) : size === undefined$1)) {
		        size = 1;
		      } else {
		        size = nativeMax(toInteger(size), 0);
		      }
		      var length = array == null ? 0 : array.length;
		      if (!length || size < 1) {
		        return [];
		      }
		      var index = 0,
		          resIndex = 0,
		          result = Array(nativeCeil(length / size));

		      while (index < length) {
		        result[resIndex++] = baseSlice(array, index, (index += size));
		      }
		      return result;
		    }

		    /**
		     * Creates an array with all falsey values removed. The values `false`, `null`,
		     * `0`, `""`, `undefined`, and `NaN` are falsey.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to compact.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * _.compact([0, 1, false, 2, '', 3]);
		     * // => [1, 2, 3]
		     */
		    function compact(array) {
		      var index = -1,
		          length = array == null ? 0 : array.length,
		          resIndex = 0,
		          result = [];

		      while (++index < length) {
		        var value = array[index];
		        if (value) {
		          result[resIndex++] = value;
		        }
		      }
		      return result;
		    }

		    /**
		     * Creates a new array concatenating `array` with any additional arrays
		     * and/or values.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to concatenate.
		     * @param {...*} [values] The values to concatenate.
		     * @returns {Array} Returns the new concatenated array.
		     * @example
		     *
		     * var array = [1];
		     * var other = _.concat(array, 2, [3], [[4]]);
		     *
		     * console.log(other);
		     * // => [1, 2, 3, [4]]
		     *
		     * console.log(array);
		     * // => [1]
		     */
		    function concat() {
		      var length = arguments.length;
		      if (!length) {
		        return [];
		      }
		      var args = Array(length - 1),
		          array = arguments[0],
		          index = length;

		      while (index--) {
		        args[index - 1] = arguments[index];
		      }
		      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
		    }

		    /**
		     * Creates an array of `array` values not included in the other given arrays
		     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons. The order and references of result values are
		     * determined by the first array.
		     *
		     * **Note:** Unlike `_.pullAll`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {...Array} [values] The values to exclude.
		     * @returns {Array} Returns the new array of filtered values.
		     * @see _.without, _.xor
		     * @example
		     *
		     * _.difference([2, 1], [2, 3]);
		     * // => [1]
		     */
		    var difference = baseRest(function(array, values) {
		      return isArrayLikeObject(array)
		        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
		        : [];
		    });

		    /**
		     * This method is like `_.difference` except that it accepts `iteratee` which
		     * is invoked for each element of `array` and `values` to generate the criterion
		     * by which they're compared. The order and references of result values are
		     * determined by the first array. The iteratee is invoked with one argument:
		     * (value).
		     *
		     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {...Array} [values] The values to exclude.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
		     * // => [1.2]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
		     * // => [{ 'x': 2 }]
		     */
		    var differenceBy = baseRest(function(array, values) {
		      var iteratee = last(values);
		      if (isArrayLikeObject(iteratee)) {
		        iteratee = undefined$1;
		      }
		      return isArrayLikeObject(array)
		        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
		        : [];
		    });

		    /**
		     * This method is like `_.difference` except that it accepts `comparator`
		     * which is invoked to compare elements of `array` to `values`. The order and
		     * references of result values are determined by the first array. The comparator
		     * is invoked with two arguments: (arrVal, othVal).
		     *
		     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {...Array} [values] The values to exclude.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		     *
		     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
		     * // => [{ 'x': 2, 'y': 1 }]
		     */
		    var differenceWith = baseRest(function(array, values) {
		      var comparator = last(values);
		      if (isArrayLikeObject(comparator)) {
		        comparator = undefined$1;
		      }
		      return isArrayLikeObject(array)
		        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined$1, comparator)
		        : [];
		    });

		    /**
		     * Creates a slice of `array` with `n` elements dropped from the beginning.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.5.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=1] The number of elements to drop.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.drop([1, 2, 3]);
		     * // => [2, 3]
		     *
		     * _.drop([1, 2, 3], 2);
		     * // => [3]
		     *
		     * _.drop([1, 2, 3], 5);
		     * // => []
		     *
		     * _.drop([1, 2, 3], 0);
		     * // => [1, 2, 3]
		     */
		    function drop(array, n, guard) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      n = (guard || n === undefined$1) ? 1 : toInteger(n);
		      return baseSlice(array, n < 0 ? 0 : n, length);
		    }

		    /**
		     * Creates a slice of `array` with `n` elements dropped from the end.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=1] The number of elements to drop.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.dropRight([1, 2, 3]);
		     * // => [1, 2]
		     *
		     * _.dropRight([1, 2, 3], 2);
		     * // => [1]
		     *
		     * _.dropRight([1, 2, 3], 5);
		     * // => []
		     *
		     * _.dropRight([1, 2, 3], 0);
		     * // => [1, 2, 3]
		     */
		    function dropRight(array, n, guard) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      n = (guard || n === undefined$1) ? 1 : toInteger(n);
		      n = length - n;
		      return baseSlice(array, 0, n < 0 ? 0 : n);
		    }

		    /**
		     * Creates a slice of `array` excluding elements dropped from the end.
		     * Elements are dropped until `predicate` returns falsey. The predicate is
		     * invoked with three arguments: (value, index, array).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': true },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': false }
		     * ];
		     *
		     * _.dropRightWhile(users, function(o) { return !o.active; });
		     * // => objects for ['barney']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
		     * // => objects for ['barney', 'fred']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.dropRightWhile(users, ['active', false]);
		     * // => objects for ['barney']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.dropRightWhile(users, 'active');
		     * // => objects for ['barney', 'fred', 'pebbles']
		     */
		    function dropRightWhile(array, predicate) {
		      return (array && array.length)
		        ? baseWhile(array, getIteratee(predicate, 3), true, true)
		        : [];
		    }

		    /**
		     * Creates a slice of `array` excluding elements dropped from the beginning.
		     * Elements are dropped until `predicate` returns falsey. The predicate is
		     * invoked with three arguments: (value, index, array).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': false },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': true }
		     * ];
		     *
		     * _.dropWhile(users, function(o) { return !o.active; });
		     * // => objects for ['pebbles']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.dropWhile(users, { 'user': 'barney', 'active': false });
		     * // => objects for ['fred', 'pebbles']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.dropWhile(users, ['active', false]);
		     * // => objects for ['pebbles']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.dropWhile(users, 'active');
		     * // => objects for ['barney', 'fred', 'pebbles']
		     */
		    function dropWhile(array, predicate) {
		      return (array && array.length)
		        ? baseWhile(array, getIteratee(predicate, 3), true)
		        : [];
		    }

		    /**
		     * Fills elements of `array` with `value` from `start` up to, but not
		     * including, `end`.
		     *
		     * **Note:** This method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.2.0
		     * @category Array
		     * @param {Array} array The array to fill.
		     * @param {*} value The value to fill `array` with.
		     * @param {number} [start=0] The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = [1, 2, 3];
		     *
		     * _.fill(array, 'a');
		     * console.log(array);
		     * // => ['a', 'a', 'a']
		     *
		     * _.fill(Array(3), 2);
		     * // => [2, 2, 2]
		     *
		     * _.fill([4, 6, 8, 10], '*', 1, 3);
		     * // => [4, '*', '*', 10]
		     */
		    function fill(array, value, start, end) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
		        start = 0;
		        end = length;
		      }
		      return baseFill(array, value, start, end);
		    }

		    /**
		     * This method is like `_.find` except that it returns the index of the first
		     * element `predicate` returns truthy for instead of the element itself.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param {number} [fromIndex=0] The index to search from.
		     * @returns {number} Returns the index of the found element, else `-1`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': false },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': true }
		     * ];
		     *
		     * _.findIndex(users, function(o) { return o.user == 'barney'; });
		     * // => 0
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.findIndex(users, { 'user': 'fred', 'active': false });
		     * // => 1
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.findIndex(users, ['active', false]);
		     * // => 0
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.findIndex(users, 'active');
		     * // => 2
		     */
		    function findIndex(array, predicate, fromIndex) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return -1;
		      }
		      var index = fromIndex == null ? 0 : toInteger(fromIndex);
		      if (index < 0) {
		        index = nativeMax(length + index, 0);
		      }
		      return baseFindIndex(array, getIteratee(predicate, 3), index);
		    }

		    /**
		     * This method is like `_.findIndex` except that it iterates over elements
		     * of `collection` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param {number} [fromIndex=array.length-1] The index to search from.
		     * @returns {number} Returns the index of the found element, else `-1`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': true },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': false }
		     * ];
		     *
		     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
		     * // => 2
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
		     * // => 0
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.findLastIndex(users, ['active', false]);
		     * // => 2
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.findLastIndex(users, 'active');
		     * // => 0
		     */
		    function findLastIndex(array, predicate, fromIndex) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return -1;
		      }
		      var index = length - 1;
		      if (fromIndex !== undefined$1) {
		        index = toInteger(fromIndex);
		        index = fromIndex < 0
		          ? nativeMax(length + index, 0)
		          : nativeMin(index, length - 1);
		      }
		      return baseFindIndex(array, getIteratee(predicate, 3), index, true);
		    }

		    /**
		     * Flattens `array` a single level deep.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to flatten.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * _.flatten([1, [2, [3, [4]], 5]]);
		     * // => [1, 2, [3, [4]], 5]
		     */
		    function flatten(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? baseFlatten(array, 1) : [];
		    }

		    /**
		     * Recursively flattens `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to flatten.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * _.flattenDeep([1, [2, [3, [4]], 5]]);
		     * // => [1, 2, 3, 4, 5]
		     */
		    function flattenDeep(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? baseFlatten(array, INFINITY) : [];
		    }

		    /**
		     * Recursively flatten `array` up to `depth` times.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.4.0
		     * @category Array
		     * @param {Array} array The array to flatten.
		     * @param {number} [depth=1] The maximum recursion depth.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * var array = [1, [2, [3, [4]], 5]];
		     *
		     * _.flattenDepth(array, 1);
		     * // => [1, 2, [3, [4]], 5]
		     *
		     * _.flattenDepth(array, 2);
		     * // => [1, 2, 3, [4], 5]
		     */
		    function flattenDepth(array, depth) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      depth = depth === undefined$1 ? 1 : toInteger(depth);
		      return baseFlatten(array, depth);
		    }

		    /**
		     * The inverse of `_.toPairs`; this method returns an object composed
		     * from key-value `pairs`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} pairs The key-value pairs.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * _.fromPairs([['a', 1], ['b', 2]]);
		     * // => { 'a': 1, 'b': 2 }
		     */
		    function fromPairs(pairs) {
		      var index = -1,
		          length = pairs == null ? 0 : pairs.length,
		          result = {};

		      while (++index < length) {
		        var pair = pairs[index];
		        result[pair[0]] = pair[1];
		      }
		      return result;
		    }

		    /**
		     * Gets the first element of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @alias first
		     * @category Array
		     * @param {Array} array The array to query.
		     * @returns {*} Returns the first element of `array`.
		     * @example
		     *
		     * _.head([1, 2, 3]);
		     * // => 1
		     *
		     * _.head([]);
		     * // => undefined
		     */
		    function head(array) {
		      return (array && array.length) ? array[0] : undefined$1;
		    }

		    /**
		     * Gets the index at which the first occurrence of `value` is found in `array`
		     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons. If `fromIndex` is negative, it's used as the
		     * offset from the end of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {*} value The value to search for.
		     * @param {number} [fromIndex=0] The index to search from.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     * @example
		     *
		     * _.indexOf([1, 2, 1, 2], 2);
		     * // => 1
		     *
		     * // Search from the `fromIndex`.
		     * _.indexOf([1, 2, 1, 2], 2, 2);
		     * // => 3
		     */
		    function indexOf(array, value, fromIndex) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return -1;
		      }
		      var index = fromIndex == null ? 0 : toInteger(fromIndex);
		      if (index < 0) {
		        index = nativeMax(length + index, 0);
		      }
		      return baseIndexOf(array, value, index);
		    }

		    /**
		     * Gets all but the last element of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.initial([1, 2, 3]);
		     * // => [1, 2]
		     */
		    function initial(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? baseSlice(array, 0, -1) : [];
		    }

		    /**
		     * Creates an array of unique values that are included in all given arrays
		     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons. The order and references of result values are
		     * determined by the first array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @returns {Array} Returns the new array of intersecting values.
		     * @example
		     *
		     * _.intersection([2, 1], [2, 3]);
		     * // => [2]
		     */
		    var intersection = baseRest(function(arrays) {
		      var mapped = arrayMap(arrays, castArrayLikeObject);
		      return (mapped.length && mapped[0] === arrays[0])
		        ? baseIntersection(mapped)
		        : [];
		    });

		    /**
		     * This method is like `_.intersection` except that it accepts `iteratee`
		     * which is invoked for each element of each `arrays` to generate the criterion
		     * by which they're compared. The order and references of result values are
		     * determined by the first array. The iteratee is invoked with one argument:
		     * (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new array of intersecting values.
		     * @example
		     *
		     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
		     * // => [2.1]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
		     * // => [{ 'x': 1 }]
		     */
		    var intersectionBy = baseRest(function(arrays) {
		      var iteratee = last(arrays),
		          mapped = arrayMap(arrays, castArrayLikeObject);

		      if (iteratee === last(mapped)) {
		        iteratee = undefined$1;
		      } else {
		        mapped.pop();
		      }
		      return (mapped.length && mapped[0] === arrays[0])
		        ? baseIntersection(mapped, getIteratee(iteratee, 2))
		        : [];
		    });

		    /**
		     * This method is like `_.intersection` except that it accepts `comparator`
		     * which is invoked to compare elements of `arrays`. The order and references
		     * of result values are determined by the first array. The comparator is
		     * invoked with two arguments: (arrVal, othVal).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of intersecting values.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
		     *
		     * _.intersectionWith(objects, others, _.isEqual);
		     * // => [{ 'x': 1, 'y': 2 }]
		     */
		    var intersectionWith = baseRest(function(arrays) {
		      var comparator = last(arrays),
		          mapped = arrayMap(arrays, castArrayLikeObject);

		      comparator = typeof comparator == 'function' ? comparator : undefined$1;
		      if (comparator) {
		        mapped.pop();
		      }
		      return (mapped.length && mapped[0] === arrays[0])
		        ? baseIntersection(mapped, undefined$1, comparator)
		        : [];
		    });

		    /**
		     * Converts all elements in `array` into a string separated by `separator`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to convert.
		     * @param {string} [separator=','] The element separator.
		     * @returns {string} Returns the joined string.
		     * @example
		     *
		     * _.join(['a', 'b', 'c'], '~');
		     * // => 'a~b~c'
		     */
		    function join(array, separator) {
		      return array == null ? '' : nativeJoin.call(array, separator);
		    }

		    /**
		     * Gets the last element of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @returns {*} Returns the last element of `array`.
		     * @example
		     *
		     * _.last([1, 2, 3]);
		     * // => 3
		     */
		    function last(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? array[length - 1] : undefined$1;
		    }

		    /**
		     * This method is like `_.indexOf` except that it iterates over elements of
		     * `array` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {*} value The value to search for.
		     * @param {number} [fromIndex=array.length-1] The index to search from.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     * @example
		     *
		     * _.lastIndexOf([1, 2, 1, 2], 2);
		     * // => 3
		     *
		     * // Search from the `fromIndex`.
		     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
		     * // => 1
		     */
		    function lastIndexOf(array, value, fromIndex) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return -1;
		      }
		      var index = length;
		      if (fromIndex !== undefined$1) {
		        index = toInteger(fromIndex);
		        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
		      }
		      return value === value
		        ? strictLastIndexOf(array, value, index)
		        : baseFindIndex(array, baseIsNaN, index, true);
		    }

		    /**
		     * Gets the element at index `n` of `array`. If `n` is negative, the nth
		     * element from the end is returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.11.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=0] The index of the element to return.
		     * @returns {*} Returns the nth element of `array`.
		     * @example
		     *
		     * var array = ['a', 'b', 'c', 'd'];
		     *
		     * _.nth(array, 1);
		     * // => 'b'
		     *
		     * _.nth(array, -2);
		     * // => 'c';
		     */
		    function nth(array, n) {
		      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined$1;
		    }

		    /**
		     * Removes all given values from `array` using
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons.
		     *
		     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
		     * to remove elements from an array by predicate.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {...*} [values] The values to remove.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
		     *
		     * _.pull(array, 'a', 'c');
		     * console.log(array);
		     * // => ['b', 'b']
		     */
		    var pull = baseRest(pullAll);

		    /**
		     * This method is like `_.pull` except that it accepts an array of values to remove.
		     *
		     * **Note:** Unlike `_.difference`, this method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {Array} values The values to remove.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
		     *
		     * _.pullAll(array, ['a', 'c']);
		     * console.log(array);
		     * // => ['b', 'b']
		     */
		    function pullAll(array, values) {
		      return (array && array.length && values && values.length)
		        ? basePullAll(array, values)
		        : array;
		    }

		    /**
		     * This method is like `_.pullAll` except that it accepts `iteratee` which is
		     * invoked for each element of `array` and `values` to generate the criterion
		     * by which they're compared. The iteratee is invoked with one argument: (value).
		     *
		     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {Array} values The values to remove.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
		     *
		     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
		     * console.log(array);
		     * // => [{ 'x': 2 }]
		     */
		    function pullAllBy(array, values, iteratee) {
		      return (array && array.length && values && values.length)
		        ? basePullAll(array, values, getIteratee(iteratee, 2))
		        : array;
		    }

		    /**
		     * This method is like `_.pullAll` except that it accepts `comparator` which
		     * is invoked to compare elements of `array` to `values`. The comparator is
		     * invoked with two arguments: (arrVal, othVal).
		     *
		     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.6.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {Array} values The values to remove.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
		     *
		     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
		     * console.log(array);
		     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
		     */
		    function pullAllWith(array, values, comparator) {
		      return (array && array.length && values && values.length)
		        ? basePullAll(array, values, undefined$1, comparator)
		        : array;
		    }

		    /**
		     * Removes elements from `array` corresponding to `indexes` and returns an
		     * array of removed elements.
		     *
		     * **Note:** Unlike `_.at`, this method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
		     * @returns {Array} Returns the new array of removed elements.
		     * @example
		     *
		     * var array = ['a', 'b', 'c', 'd'];
		     * var pulled = _.pullAt(array, [1, 3]);
		     *
		     * console.log(array);
		     * // => ['a', 'c']
		     *
		     * console.log(pulled);
		     * // => ['b', 'd']
		     */
		    var pullAt = flatRest(function(array, indexes) {
		      var length = array == null ? 0 : array.length,
		          result = baseAt(array, indexes);

		      basePullAt(array, arrayMap(indexes, function(index) {
		        return isIndex(index, length) ? +index : index;
		      }).sort(compareAscending));

		      return result;
		    });

		    /**
		     * Removes all elements from `array` that `predicate` returns truthy for
		     * and returns an array of the removed elements. The predicate is invoked
		     * with three arguments: (value, index, array).
		     *
		     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
		     * to pull elements from an array by value.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new array of removed elements.
		     * @example
		     *
		     * var array = [1, 2, 3, 4];
		     * var evens = _.remove(array, function(n) {
		     *   return n % 2 == 0;
		     * });
		     *
		     * console.log(array);
		     * // => [1, 3]
		     *
		     * console.log(evens);
		     * // => [2, 4]
		     */
		    function remove(array, predicate) {
		      var result = [];
		      if (!(array && array.length)) {
		        return result;
		      }
		      var index = -1,
		          indexes = [],
		          length = array.length;

		      predicate = getIteratee(predicate, 3);
		      while (++index < length) {
		        var value = array[index];
		        if (predicate(value, index, array)) {
		          result.push(value);
		          indexes.push(index);
		        }
		      }
		      basePullAt(array, indexes);
		      return result;
		    }

		    /**
		     * Reverses `array` so that the first element becomes the last, the second
		     * element becomes the second to last, and so on.
		     *
		     * **Note:** This method mutates `array` and is based on
		     * [`Array#reverse`](https://mdn.io/Array/reverse).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = [1, 2, 3];
		     *
		     * _.reverse(array);
		     * // => [3, 2, 1]
		     *
		     * console.log(array);
		     * // => [3, 2, 1]
		     */
		    function reverse(array) {
		      return array == null ? array : nativeReverse.call(array);
		    }

		    /**
		     * Creates a slice of `array` from `start` up to, but not including, `end`.
		     *
		     * **Note:** This method is used instead of
		     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
		     * returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to slice.
		     * @param {number} [start=0] The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns the slice of `array`.
		     */
		    function slice(array, start, end) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
		        start = 0;
		        end = length;
		      }
		      else {
		        start = start == null ? 0 : toInteger(start);
		        end = end === undefined$1 ? length : toInteger(end);
		      }
		      return baseSlice(array, start, end);
		    }

		    /**
		     * Uses a binary search to determine the lowest index at which `value`
		     * should be inserted into `array` in order to maintain its sort order.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     * @example
		     *
		     * _.sortedIndex([30, 50], 40);
		     * // => 1
		     */
		    function sortedIndex(array, value) {
		      return baseSortedIndex(array, value);
		    }

		    /**
		     * This method is like `_.sortedIndex` except that it accepts `iteratee`
		     * which is invoked for `value` and each element of `array` to compute their
		     * sort ranking. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     * @example
		     *
		     * var objects = [{ 'x': 4 }, { 'x': 5 }];
		     *
		     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
		     * // => 0
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
		     * // => 0
		     */
		    function sortedIndexBy(array, value, iteratee) {
		      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
		    }

		    /**
		     * This method is like `_.indexOf` except that it performs a binary
		     * search on a sorted `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {*} value The value to search for.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     * @example
		     *
		     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
		     * // => 1
		     */
		    function sortedIndexOf(array, value) {
		      var length = array == null ? 0 : array.length;
		      if (length) {
		        var index = baseSortedIndex(array, value);
		        if (index < length && eq(array[index], value)) {
		          return index;
		        }
		      }
		      return -1;
		    }

		    /**
		     * This method is like `_.sortedIndex` except that it returns the highest
		     * index at which `value` should be inserted into `array` in order to
		     * maintain its sort order.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     * @example
		     *
		     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
		     * // => 4
		     */
		    function sortedLastIndex(array, value) {
		      return baseSortedIndex(array, value, true);
		    }

		    /**
		     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
		     * which is invoked for `value` and each element of `array` to compute their
		     * sort ranking. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     * @example
		     *
		     * var objects = [{ 'x': 4 }, { 'x': 5 }];
		     *
		     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
		     * // => 1
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
		     * // => 1
		     */
		    function sortedLastIndexBy(array, value, iteratee) {
		      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
		    }

		    /**
		     * This method is like `_.lastIndexOf` except that it performs a binary
		     * search on a sorted `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {*} value The value to search for.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     * @example
		     *
		     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
		     * // => 3
		     */
		    function sortedLastIndexOf(array, value) {
		      var length = array == null ? 0 : array.length;
		      if (length) {
		        var index = baseSortedIndex(array, value, true) - 1;
		        if (eq(array[index], value)) {
		          return index;
		        }
		      }
		      return -1;
		    }

		    /**
		     * This method is like `_.uniq` except that it's designed and optimized
		     * for sorted arrays.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * _.sortedUniq([1, 1, 2]);
		     * // => [1, 2]
		     */
		    function sortedUniq(array) {
		      return (array && array.length)
		        ? baseSortedUniq(array)
		        : [];
		    }

		    /**
		     * This method is like `_.uniqBy` except that it's designed and optimized
		     * for sorted arrays.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
		     * // => [1.1, 2.3]
		     */
		    function sortedUniqBy(array, iteratee) {
		      return (array && array.length)
		        ? baseSortedUniq(array, getIteratee(iteratee, 2))
		        : [];
		    }

		    /**
		     * Gets all but the first element of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.tail([1, 2, 3]);
		     * // => [2, 3]
		     */
		    function tail(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? baseSlice(array, 1, length) : [];
		    }

		    /**
		     * Creates a slice of `array` with `n` elements taken from the beginning.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=1] The number of elements to take.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.take([1, 2, 3]);
		     * // => [1]
		     *
		     * _.take([1, 2, 3], 2);
		     * // => [1, 2]
		     *
		     * _.take([1, 2, 3], 5);
		     * // => [1, 2, 3]
		     *
		     * _.take([1, 2, 3], 0);
		     * // => []
		     */
		    function take(array, n, guard) {
		      if (!(array && array.length)) {
		        return [];
		      }
		      n = (guard || n === undefined$1) ? 1 : toInteger(n);
		      return baseSlice(array, 0, n < 0 ? 0 : n);
		    }

		    /**
		     * Creates a slice of `array` with `n` elements taken from the end.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=1] The number of elements to take.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.takeRight([1, 2, 3]);
		     * // => [3]
		     *
		     * _.takeRight([1, 2, 3], 2);
		     * // => [2, 3]
		     *
		     * _.takeRight([1, 2, 3], 5);
		     * // => [1, 2, 3]
		     *
		     * _.takeRight([1, 2, 3], 0);
		     * // => []
		     */
		    function takeRight(array, n, guard) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      n = (guard || n === undefined$1) ? 1 : toInteger(n);
		      n = length - n;
		      return baseSlice(array, n < 0 ? 0 : n, length);
		    }

		    /**
		     * Creates a slice of `array` with elements taken from the end. Elements are
		     * taken until `predicate` returns falsey. The predicate is invoked with
		     * three arguments: (value, index, array).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': true },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': false }
		     * ];
		     *
		     * _.takeRightWhile(users, function(o) { return !o.active; });
		     * // => objects for ['fred', 'pebbles']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
		     * // => objects for ['pebbles']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.takeRightWhile(users, ['active', false]);
		     * // => objects for ['fred', 'pebbles']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.takeRightWhile(users, 'active');
		     * // => []
		     */
		    function takeRightWhile(array, predicate) {
		      return (array && array.length)
		        ? baseWhile(array, getIteratee(predicate, 3), false, true)
		        : [];
		    }

		    /**
		     * Creates a slice of `array` with elements taken from the beginning. Elements
		     * are taken until `predicate` returns falsey. The predicate is invoked with
		     * three arguments: (value, index, array).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': false },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': true }
		     * ];
		     *
		     * _.takeWhile(users, function(o) { return !o.active; });
		     * // => objects for ['barney', 'fred']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.takeWhile(users, { 'user': 'barney', 'active': false });
		     * // => objects for ['barney']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.takeWhile(users, ['active', false]);
		     * // => objects for ['barney', 'fred']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.takeWhile(users, 'active');
		     * // => []
		     */
		    function takeWhile(array, predicate) {
		      return (array && array.length)
		        ? baseWhile(array, getIteratee(predicate, 3))
		        : [];
		    }

		    /**
		     * Creates an array of unique values, in order, from all given arrays using
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @returns {Array} Returns the new array of combined values.
		     * @example
		     *
		     * _.union([2], [1, 2]);
		     * // => [2, 1]
		     */
		    var union = baseRest(function(arrays) {
		      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
		    });

		    /**
		     * This method is like `_.union` except that it accepts `iteratee` which is
		     * invoked for each element of each `arrays` to generate the criterion by
		     * which uniqueness is computed. Result values are chosen from the first
		     * array in which the value occurs. The iteratee is invoked with one argument:
		     * (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new array of combined values.
		     * @example
		     *
		     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
		     * // => [2.1, 1.2]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
		     * // => [{ 'x': 1 }, { 'x': 2 }]
		     */
		    var unionBy = baseRest(function(arrays) {
		      var iteratee = last(arrays);
		      if (isArrayLikeObject(iteratee)) {
		        iteratee = undefined$1;
		      }
		      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
		    });

		    /**
		     * This method is like `_.union` except that it accepts `comparator` which
		     * is invoked to compare elements of `arrays`. Result values are chosen from
		     * the first array in which the value occurs. The comparator is invoked
		     * with two arguments: (arrVal, othVal).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of combined values.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
		     *
		     * _.unionWith(objects, others, _.isEqual);
		     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
		     */
		    var unionWith = baseRest(function(arrays) {
		      var comparator = last(arrays);
		      comparator = typeof comparator == 'function' ? comparator : undefined$1;
		      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
		    });

		    /**
		     * Creates a duplicate-free version of an array, using
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons, in which only the first occurrence of each element
		     * is kept. The order of result values is determined by the order they occur
		     * in the array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * _.uniq([2, 1, 2]);
		     * // => [2, 1]
		     */
		    function uniq(array) {
		      return (array && array.length) ? baseUniq(array) : [];
		    }

		    /**
		     * This method is like `_.uniq` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the criterion by which
		     * uniqueness is computed. The order of result values is determined by the
		     * order they occur in the array. The iteratee is invoked with one argument:
		     * (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
		     * // => [2.1, 1.2]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
		     * // => [{ 'x': 1 }, { 'x': 2 }]
		     */
		    function uniqBy(array, iteratee) {
		      return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
		    }

		    /**
		     * This method is like `_.uniq` except that it accepts `comparator` which
		     * is invoked to compare elements of `array`. The order of result values is
		     * determined by the order they occur in the array.The comparator is invoked
		     * with two arguments: (arrVal, othVal).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
		     *
		     * _.uniqWith(objects, _.isEqual);
		     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
		     */
		    function uniqWith(array, comparator) {
		      comparator = typeof comparator == 'function' ? comparator : undefined$1;
		      return (array && array.length) ? baseUniq(array, undefined$1, comparator) : [];
		    }

		    /**
		     * This method is like `_.zip` except that it accepts an array of grouped
		     * elements and creates an array regrouping the elements to their pre-zip
		     * configuration.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.2.0
		     * @category Array
		     * @param {Array} array The array of grouped elements to process.
		     * @returns {Array} Returns the new array of regrouped elements.
		     * @example
		     *
		     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
		     * // => [['a', 1, true], ['b', 2, false]]
		     *
		     * _.unzip(zipped);
		     * // => [['a', 'b'], [1, 2], [true, false]]
		     */
		    function unzip(array) {
		      if (!(array && array.length)) {
		        return [];
		      }
		      var length = 0;
		      array = arrayFilter(array, function(group) {
		        if (isArrayLikeObject(group)) {
		          length = nativeMax(group.length, length);
		          return true;
		        }
		      });
		      return baseTimes(length, function(index) {
		        return arrayMap(array, baseProperty(index));
		      });
		    }

		    /**
		     * This method is like `_.unzip` except that it accepts `iteratee` to specify
		     * how regrouped values should be combined. The iteratee is invoked with the
		     * elements of each group: (...group).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.8.0
		     * @category Array
		     * @param {Array} array The array of grouped elements to process.
		     * @param {Function} [iteratee=_.identity] The function to combine
		     *  regrouped values.
		     * @returns {Array} Returns the new array of regrouped elements.
		     * @example
		     *
		     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
		     * // => [[1, 10, 100], [2, 20, 200]]
		     *
		     * _.unzipWith(zipped, _.add);
		     * // => [3, 30, 300]
		     */
		    function unzipWith(array, iteratee) {
		      if (!(array && array.length)) {
		        return [];
		      }
		      var result = unzip(array);
		      if (iteratee == null) {
		        return result;
		      }
		      return arrayMap(result, function(group) {
		        return apply(iteratee, undefined$1, group);
		      });
		    }

		    /**
		     * Creates an array excluding all given values using
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons.
		     *
		     * **Note:** Unlike `_.pull`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {...*} [values] The values to exclude.
		     * @returns {Array} Returns the new array of filtered values.
		     * @see _.difference, _.xor
		     * @example
		     *
		     * _.without([2, 1, 2, 3], 1, 2);
		     * // => [3]
		     */
		    var without = baseRest(function(array, values) {
		      return isArrayLikeObject(array)
		        ? baseDifference(array, values)
		        : [];
		    });

		    /**
		     * Creates an array of unique values that is the
		     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
		     * of the given arrays. The order of result values is determined by the order
		     * they occur in the arrays.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @returns {Array} Returns the new array of filtered values.
		     * @see _.difference, _.without
		     * @example
		     *
		     * _.xor([2, 1], [2, 3]);
		     * // => [1, 3]
		     */
		    var xor = baseRest(function(arrays) {
		      return baseXor(arrayFilter(arrays, isArrayLikeObject));
		    });

		    /**
		     * This method is like `_.xor` except that it accepts `iteratee` which is
		     * invoked for each element of each `arrays` to generate the criterion by
		     * which by which they're compared. The order of result values is determined
		     * by the order they occur in the arrays. The iteratee is invoked with one
		     * argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
		     * // => [1.2, 3.4]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
		     * // => [{ 'x': 2 }]
		     */
		    var xorBy = baseRest(function(arrays) {
		      var iteratee = last(arrays);
		      if (isArrayLikeObject(iteratee)) {
		        iteratee = undefined$1;
		      }
		      return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
		    });

		    /**
		     * This method is like `_.xor` except that it accepts `comparator` which is
		     * invoked to compare elements of `arrays`. The order of result values is
		     * determined by the order they occur in the arrays. The comparator is invoked
		     * with two arguments: (arrVal, othVal).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
		     *
		     * _.xorWith(objects, others, _.isEqual);
		     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
		     */
		    var xorWith = baseRest(function(arrays) {
		      var comparator = last(arrays);
		      comparator = typeof comparator == 'function' ? comparator : undefined$1;
		      return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
		    });

		    /**
		     * Creates an array of grouped elements, the first of which contains the
		     * first elements of the given arrays, the second of which contains the
		     * second elements of the given arrays, and so on.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to process.
		     * @returns {Array} Returns the new array of grouped elements.
		     * @example
		     *
		     * _.zip(['a', 'b'], [1, 2], [true, false]);
		     * // => [['a', 1, true], ['b', 2, false]]
		     */
		    var zip = baseRest(unzip);

		    /**
		     * This method is like `_.fromPairs` except that it accepts two arrays,
		     * one of property identifiers and one of corresponding values.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.4.0
		     * @category Array
		     * @param {Array} [props=[]] The property identifiers.
		     * @param {Array} [values=[]] The property values.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * _.zipObject(['a', 'b'], [1, 2]);
		     * // => { 'a': 1, 'b': 2 }
		     */
		    function zipObject(props, values) {
		      return baseZipObject(props || [], values || [], assignValue);
		    }

		    /**
		     * This method is like `_.zipObject` except that it supports property paths.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.1.0
		     * @category Array
		     * @param {Array} [props=[]] The property identifiers.
		     * @param {Array} [values=[]] The property values.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
		     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
		     */
		    function zipObjectDeep(props, values) {
		      return baseZipObject(props || [], values || [], baseSet);
		    }

		    /**
		     * This method is like `_.zip` except that it accepts `iteratee` to specify
		     * how grouped values should be combined. The iteratee is invoked with the
		     * elements of each group: (...group).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.8.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to process.
		     * @param {Function} [iteratee=_.identity] The function to combine
		     *  grouped values.
		     * @returns {Array} Returns the new array of grouped elements.
		     * @example
		     *
		     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
		     *   return a + b + c;
		     * });
		     * // => [111, 222]
		     */
		    var zipWith = baseRest(function(arrays) {
		      var length = arrays.length,
		          iteratee = length > 1 ? arrays[length - 1] : undefined$1;

		      iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined$1;
		      return unzipWith(arrays, iteratee);
		    });

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
		     * chain sequences enabled. The result of such sequences must be unwrapped
		     * with `_#value`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.3.0
		     * @category Seq
		     * @param {*} value The value to wrap.
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'age': 36 },
		     *   { 'user': 'fred',    'age': 40 },
		     *   { 'user': 'pebbles', 'age': 1 }
		     * ];
		     *
		     * var youngest = _
		     *   .chain(users)
		     *   .sortBy('age')
		     *   .map(function(o) {
		     *     return o.user + ' is ' + o.age;
		     *   })
		     *   .head()
		     *   .value();
		     * // => 'pebbles is 1'
		     */
		    function chain(value) {
		      var result = lodash(value);
		      result.__chain__ = true;
		      return result;
		    }

		    /**
		     * This method invokes `interceptor` and returns `value`. The interceptor
		     * is invoked with one argument; (value). The purpose of this method is to
		     * "tap into" a method chain sequence in order to modify intermediate results.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Seq
		     * @param {*} value The value to provide to `interceptor`.
		     * @param {Function} interceptor The function to invoke.
		     * @returns {*} Returns `value`.
		     * @example
		     *
		     * _([1, 2, 3])
		     *  .tap(function(array) {
		     *    // Mutate input array.
		     *    array.pop();
		     *  })
		     *  .reverse()
		     *  .value();
		     * // => [2, 1]
		     */
		    function tap(value, interceptor) {
		      interceptor(value);
		      return value;
		    }

		    /**
		     * This method is like `_.tap` except that it returns the result of `interceptor`.
		     * The purpose of this method is to "pass thru" values replacing intermediate
		     * results in a method chain sequence.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Seq
		     * @param {*} value The value to provide to `interceptor`.
		     * @param {Function} interceptor The function to invoke.
		     * @returns {*} Returns the result of `interceptor`.
		     * @example
		     *
		     * _('  abc  ')
		     *  .chain()
		     *  .trim()
		     *  .thru(function(value) {
		     *    return [value];
		     *  })
		     *  .value();
		     * // => ['abc']
		     */
		    function thru(value, interceptor) {
		      return interceptor(value);
		    }

		    /**
		     * This method is the wrapper version of `_.at`.
		     *
		     * @name at
		     * @memberOf _
		     * @since 1.0.0
		     * @category Seq
		     * @param {...(string|string[])} [paths] The property paths to pick.
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
		     *
		     * _(object).at(['a[0].b.c', 'a[1]']).value();
		     * // => [3, 4]
		     */
		    var wrapperAt = flatRest(function(paths) {
		      var length = paths.length,
		          start = length ? paths[0] : 0,
		          value = this.__wrapped__,
		          interceptor = function(object) { return baseAt(object, paths); };

		      if (length > 1 || this.__actions__.length ||
		          !(value instanceof LazyWrapper) || !isIndex(start)) {
		        return this.thru(interceptor);
		      }
		      value = value.slice(start, +start + (length ? 1 : 0));
		      value.__actions__.push({
		        'func': thru,
		        'args': [interceptor],
		        'thisArg': undefined$1
		      });
		      return new LodashWrapper(value, this.__chain__).thru(function(array) {
		        if (length && !array.length) {
		          array.push(undefined$1);
		        }
		        return array;
		      });
		    });

		    /**
		     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
		     *
		     * @name chain
		     * @memberOf _
		     * @since 0.1.0
		     * @category Seq
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36 },
		     *   { 'user': 'fred',   'age': 40 }
		     * ];
		     *
		     * // A sequence without explicit chaining.
		     * _(users).head();
		     * // => { 'user': 'barney', 'age': 36 }
		     *
		     * // A sequence with explicit chaining.
		     * _(users)
		     *   .chain()
		     *   .head()
		     *   .pick('user')
		     *   .value();
		     * // => { 'user': 'barney' }
		     */
		    function wrapperChain() {
		      return chain(this);
		    }

		    /**
		     * Executes the chain sequence and returns the wrapped result.
		     *
		     * @name commit
		     * @memberOf _
		     * @since 3.2.0
		     * @category Seq
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var array = [1, 2];
		     * var wrapped = _(array).push(3);
		     *
		     * console.log(array);
		     * // => [1, 2]
		     *
		     * wrapped = wrapped.commit();
		     * console.log(array);
		     * // => [1, 2, 3]
		     *
		     * wrapped.last();
		     * // => 3
		     *
		     * console.log(array);
		     * // => [1, 2, 3]
		     */
		    function wrapperCommit() {
		      return new LodashWrapper(this.value(), this.__chain__);
		    }

		    /**
		     * Gets the next value on a wrapped object following the
		     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
		     *
		     * @name next
		     * @memberOf _
		     * @since 4.0.0
		     * @category Seq
		     * @returns {Object} Returns the next iterator value.
		     * @example
		     *
		     * var wrapped = _([1, 2]);
		     *
		     * wrapped.next();
		     * // => { 'done': false, 'value': 1 }
		     *
		     * wrapped.next();
		     * // => { 'done': false, 'value': 2 }
		     *
		     * wrapped.next();
		     * // => { 'done': true, 'value': undefined }
		     */
		    function wrapperNext() {
		      if (this.__values__ === undefined$1) {
		        this.__values__ = toArray(this.value());
		      }
		      var done = this.__index__ >= this.__values__.length,
		          value = done ? undefined$1 : this.__values__[this.__index__++];

		      return { 'done': done, 'value': value };
		    }

		    /**
		     * Enables the wrapper to be iterable.
		     *
		     * @name Symbol.iterator
		     * @memberOf _
		     * @since 4.0.0
		     * @category Seq
		     * @returns {Object} Returns the wrapper object.
		     * @example
		     *
		     * var wrapped = _([1, 2]);
		     *
		     * wrapped[Symbol.iterator]() === wrapped;
		     * // => true
		     *
		     * Array.from(wrapped);
		     * // => [1, 2]
		     */
		    function wrapperToIterator() {
		      return this;
		    }

		    /**
		     * Creates a clone of the chain sequence planting `value` as the wrapped value.
		     *
		     * @name plant
		     * @memberOf _
		     * @since 3.2.0
		     * @category Seq
		     * @param {*} value The value to plant.
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var wrapped = _([1, 2]).map(square);
		     * var other = wrapped.plant([3, 4]);
		     *
		     * other.value();
		     * // => [9, 16]
		     *
		     * wrapped.value();
		     * // => [1, 4]
		     */
		    function wrapperPlant(value) {
		      var result,
		          parent = this;

		      while (parent instanceof baseLodash) {
		        var clone = wrapperClone(parent);
		        clone.__index__ = 0;
		        clone.__values__ = undefined$1;
		        if (result) {
		          previous.__wrapped__ = clone;
		        } else {
		          result = clone;
		        }
		        var previous = clone;
		        parent = parent.__wrapped__;
		      }
		      previous.__wrapped__ = value;
		      return result;
		    }

		    /**
		     * This method is the wrapper version of `_.reverse`.
		     *
		     * **Note:** This method mutates the wrapped array.
		     *
		     * @name reverse
		     * @memberOf _
		     * @since 0.1.0
		     * @category Seq
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var array = [1, 2, 3];
		     *
		     * _(array).reverse().value()
		     * // => [3, 2, 1]
		     *
		     * console.log(array);
		     * // => [3, 2, 1]
		     */
		    function wrapperReverse() {
		      var value = this.__wrapped__;
		      if (value instanceof LazyWrapper) {
		        var wrapped = value;
		        if (this.__actions__.length) {
		          wrapped = new LazyWrapper(this);
		        }
		        wrapped = wrapped.reverse();
		        wrapped.__actions__.push({
		          'func': thru,
		          'args': [reverse],
		          'thisArg': undefined$1
		        });
		        return new LodashWrapper(wrapped, this.__chain__);
		      }
		      return this.thru(reverse);
		    }

		    /**
		     * Executes the chain sequence to resolve the unwrapped value.
		     *
		     * @name value
		     * @memberOf _
		     * @since 0.1.0
		     * @alias toJSON, valueOf
		     * @category Seq
		     * @returns {*} Returns the resolved unwrapped value.
		     * @example
		     *
		     * _([1, 2, 3]).value();
		     * // => [1, 2, 3]
		     */
		    function wrapperValue() {
		      return baseWrapperValue(this.__wrapped__, this.__actions__);
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates an object composed of keys generated from the results of running
		     * each element of `collection` thru `iteratee`. The corresponding value of
		     * each key is the number of times the key was returned by `iteratee`. The
		     * iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.5.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
		     * @returns {Object} Returns the composed aggregate object.
		     * @example
		     *
		     * _.countBy([6.1, 4.2, 6.3], Math.floor);
		     * // => { '4': 1, '6': 2 }
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.countBy(['one', 'two', 'three'], 'length');
		     * // => { '3': 2, '5': 1 }
		     */
		    var countBy = createAggregator(function(result, value, key) {
		      if (hasOwnProperty.call(result, key)) {
		        ++result[key];
		      } else {
		        baseAssignValue(result, key, 1);
		      }
		    });

		    /**
		     * Checks if `predicate` returns truthy for **all** elements of `collection`.
		     * Iteration is stopped once `predicate` returns falsey. The predicate is
		     * invoked with three arguments: (value, index|key, collection).
		     *
		     * **Note:** This method returns `true` for
		     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
		     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
		     * elements of empty collections.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {boolean} Returns `true` if all elements pass the predicate check,
		     *  else `false`.
		     * @example
		     *
		     * _.every([true, 1, null, 'yes'], Boolean);
		     * // => false
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36, 'active': false },
		     *   { 'user': 'fred',   'age': 40, 'active': false }
		     * ];
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.every(users, { 'user': 'barney', 'active': false });
		     * // => false
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.every(users, ['active', false]);
		     * // => true
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.every(users, 'active');
		     * // => false
		     */
		    function every(collection, predicate, guard) {
		      var func = isArray(collection) ? arrayEvery : baseEvery;
		      if (guard && isIterateeCall(collection, predicate, guard)) {
		        predicate = undefined$1;
		      }
		      return func(collection, getIteratee(predicate, 3));
		    }

		    /**
		     * Iterates over elements of `collection`, returning an array of all elements
		     * `predicate` returns truthy for. The predicate is invoked with three
		     * arguments: (value, index|key, collection).
		     *
		     * **Note:** Unlike `_.remove`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new filtered array.
		     * @see _.reject
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36, 'active': true },
		     *   { 'user': 'fred',   'age': 40, 'active': false }
		     * ];
		     *
		     * _.filter(users, function(o) { return !o.active; });
		     * // => objects for ['fred']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.filter(users, { 'age': 36, 'active': true });
		     * // => objects for ['barney']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.filter(users, ['active', false]);
		     * // => objects for ['fred']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.filter(users, 'active');
		     * // => objects for ['barney']
		     *
		     * // Combining several predicates using `_.overEvery` or `_.overSome`.
		     * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
		     * // => objects for ['fred', 'barney']
		     */
		    function filter(collection, predicate) {
		      var func = isArray(collection) ? arrayFilter : baseFilter;
		      return func(collection, getIteratee(predicate, 3));
		    }

		    /**
		     * Iterates over elements of `collection`, returning the first element
		     * `predicate` returns truthy for. The predicate is invoked with three
		     * arguments: (value, index|key, collection).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param {number} [fromIndex=0] The index to search from.
		     * @returns {*} Returns the matched element, else `undefined`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'age': 36, 'active': true },
		     *   { 'user': 'fred',    'age': 40, 'active': false },
		     *   { 'user': 'pebbles', 'age': 1,  'active': true }
		     * ];
		     *
		     * _.find(users, function(o) { return o.age < 40; });
		     * // => object for 'barney'
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.find(users, { 'age': 1, 'active': true });
		     * // => object for 'pebbles'
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.find(users, ['active', false]);
		     * // => object for 'fred'
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.find(users, 'active');
		     * // => object for 'barney'
		     */
		    var find = createFind(findIndex);

		    /**
		     * This method is like `_.find` except that it iterates over elements of
		     * `collection` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param {number} [fromIndex=collection.length-1] The index to search from.
		     * @returns {*} Returns the matched element, else `undefined`.
		     * @example
		     *
		     * _.findLast([1, 2, 3, 4], function(n) {
		     *   return n % 2 == 1;
		     * });
		     * // => 3
		     */
		    var findLast = createFind(findLastIndex);

		    /**
		     * Creates a flattened array of values by running each element in `collection`
		     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
		     * with three arguments: (value, index|key, collection).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * function duplicate(n) {
		     *   return [n, n];
		     * }
		     *
		     * _.flatMap([1, 2], duplicate);
		     * // => [1, 1, 2, 2]
		     */
		    function flatMap(collection, iteratee) {
		      return baseFlatten(map(collection, iteratee), 1);
		    }

		    /**
		     * This method is like `_.flatMap` except that it recursively flattens the
		     * mapped results.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * function duplicate(n) {
		     *   return [[[n, n]]];
		     * }
		     *
		     * _.flatMapDeep([1, 2], duplicate);
		     * // => [1, 1, 2, 2]
		     */
		    function flatMapDeep(collection, iteratee) {
		      return baseFlatten(map(collection, iteratee), INFINITY);
		    }

		    /**
		     * This method is like `_.flatMap` except that it recursively flattens the
		     * mapped results up to `depth` times.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @param {number} [depth=1] The maximum recursion depth.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * function duplicate(n) {
		     *   return [[[n, n]]];
		     * }
		     *
		     * _.flatMapDepth([1, 2], duplicate, 2);
		     * // => [[1, 1], [2, 2]]
		     */
		    function flatMapDepth(collection, iteratee, depth) {
		      depth = depth === undefined$1 ? 1 : toInteger(depth);
		      return baseFlatten(map(collection, iteratee), depth);
		    }

		    /**
		     * Iterates over elements of `collection` and invokes `iteratee` for each element.
		     * The iteratee is invoked with three arguments: (value, index|key, collection).
		     * Iteratee functions may exit iteration early by explicitly returning `false`.
		     *
		     * **Note:** As with other "Collections" methods, objects with a "length"
		     * property are iterated like arrays. To avoid this behavior use `_.forIn`
		     * or `_.forOwn` for object iteration.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @alias each
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array|Object} Returns `collection`.
		     * @see _.forEachRight
		     * @example
		     *
		     * _.forEach([1, 2], function(value) {
		     *   console.log(value);
		     * });
		     * // => Logs `1` then `2`.
		     *
		     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
		     */
		    function forEach(collection, iteratee) {
		      var func = isArray(collection) ? arrayEach : baseEach;
		      return func(collection, getIteratee(iteratee, 3));
		    }

		    /**
		     * This method is like `_.forEach` except that it iterates over elements of
		     * `collection` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @alias eachRight
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array|Object} Returns `collection`.
		     * @see _.forEach
		     * @example
		     *
		     * _.forEachRight([1, 2], function(value) {
		     *   console.log(value);
		     * });
		     * // => Logs `2` then `1`.
		     */
		    function forEachRight(collection, iteratee) {
		      var func = isArray(collection) ? arrayEachRight : baseEachRight;
		      return func(collection, getIteratee(iteratee, 3));
		    }

		    /**
		     * Creates an object composed of keys generated from the results of running
		     * each element of `collection` thru `iteratee`. The order of grouped values
		     * is determined by the order they occur in `collection`. The corresponding
		     * value of each key is an array of elements responsible for generating the
		     * key. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
		     * @returns {Object} Returns the composed aggregate object.
		     * @example
		     *
		     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
		     * // => { '4': [4.2], '6': [6.1, 6.3] }
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.groupBy(['one', 'two', 'three'], 'length');
		     * // => { '3': ['one', 'two'], '5': ['three'] }
		     */
		    var groupBy = createAggregator(function(result, value, key) {
		      if (hasOwnProperty.call(result, key)) {
		        result[key].push(value);
		      } else {
		        baseAssignValue(result, key, [value]);
		      }
		    });

		    /**
		     * Checks if `value` is in `collection`. If `collection` is a string, it's
		     * checked for a substring of `value`, otherwise
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * is used for equality comparisons. If `fromIndex` is negative, it's used as
		     * the offset from the end of `collection`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object|string} collection The collection to inspect.
		     * @param {*} value The value to search for.
		     * @param {number} [fromIndex=0] The index to search from.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
		     * @returns {boolean} Returns `true` if `value` is found, else `false`.
		     * @example
		     *
		     * _.includes([1, 2, 3], 1);
		     * // => true
		     *
		     * _.includes([1, 2, 3], 1, 2);
		     * // => false
		     *
		     * _.includes({ 'a': 1, 'b': 2 }, 1);
		     * // => true
		     *
		     * _.includes('abcd', 'bc');
		     * // => true
		     */
		    function includes(collection, value, fromIndex, guard) {
		      collection = isArrayLike(collection) ? collection : values(collection);
		      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

		      var length = collection.length;
		      if (fromIndex < 0) {
		        fromIndex = nativeMax(length + fromIndex, 0);
		      }
		      return isString(collection)
		        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
		        : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
		    }

		    /**
		     * Invokes the method at `path` of each element in `collection`, returning
		     * an array of the results of each invoked method. Any additional arguments
		     * are provided to each invoked method. If `path` is a function, it's invoked
		     * for, and `this` bound to, each element in `collection`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Array|Function|string} path The path of the method to invoke or
		     *  the function invoked per iteration.
		     * @param {...*} [args] The arguments to invoke each method with.
		     * @returns {Array} Returns the array of results.
		     * @example
		     *
		     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
		     * // => [[1, 5, 7], [1, 2, 3]]
		     *
		     * _.invokeMap([123, 456], String.prototype.split, '');
		     * // => [['1', '2', '3'], ['4', '5', '6']]
		     */
		    var invokeMap = baseRest(function(collection, path, args) {
		      var index = -1,
		          isFunc = typeof path == 'function',
		          result = isArrayLike(collection) ? Array(collection.length) : [];

		      baseEach(collection, function(value) {
		        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
		      });
		      return result;
		    });

		    /**
		     * Creates an object composed of keys generated from the results of running
		     * each element of `collection` thru `iteratee`. The corresponding value of
		     * each key is the last element responsible for generating the key. The
		     * iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
		     * @returns {Object} Returns the composed aggregate object.
		     * @example
		     *
		     * var array = [
		     *   { 'dir': 'left', 'code': 97 },
		     *   { 'dir': 'right', 'code': 100 }
		     * ];
		     *
		     * _.keyBy(array, function(o) {
		     *   return String.fromCharCode(o.code);
		     * });
		     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
		     *
		     * _.keyBy(array, 'dir');
		     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
		     */
		    var keyBy = createAggregator(function(result, value, key) {
		      baseAssignValue(result, key, value);
		    });

		    /**
		     * Creates an array of values by running each element in `collection` thru
		     * `iteratee`. The iteratee is invoked with three arguments:
		     * (value, index|key, collection).
		     *
		     * Many lodash methods are guarded to work as iteratees for methods like
		     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
		     *
		     * The guarded methods are:
		     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
		     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
		     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
		     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new mapped array.
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * _.map([4, 8], square);
		     * // => [16, 64]
		     *
		     * _.map({ 'a': 4, 'b': 8 }, square);
		     * // => [16, 64] (iteration order is not guaranteed)
		     *
		     * var users = [
		     *   { 'user': 'barney' },
		     *   { 'user': 'fred' }
		     * ];
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.map(users, 'user');
		     * // => ['barney', 'fred']
		     */
		    function map(collection, iteratee) {
		      var func = isArray(collection) ? arrayMap : baseMap;
		      return func(collection, getIteratee(iteratee, 3));
		    }

		    /**
		     * This method is like `_.sortBy` except that it allows specifying the sort
		     * orders of the iteratees to sort by. If `orders` is unspecified, all values
		     * are sorted in ascending order. Otherwise, specify an order of "desc" for
		     * descending or "asc" for ascending sort order of corresponding values.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
		     *  The iteratees to sort by.
		     * @param {string[]} [orders] The sort orders of `iteratees`.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
		     * @returns {Array} Returns the new sorted array.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'fred',   'age': 48 },
		     *   { 'user': 'barney', 'age': 34 },
		     *   { 'user': 'fred',   'age': 40 },
		     *   { 'user': 'barney', 'age': 36 }
		     * ];
		     *
		     * // Sort by `user` in ascending order and by `age` in descending order.
		     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
		     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
		     */
		    function orderBy(collection, iteratees, orders, guard) {
		      if (collection == null) {
		        return [];
		      }
		      if (!isArray(iteratees)) {
		        iteratees = iteratees == null ? [] : [iteratees];
		      }
		      orders = guard ? undefined$1 : orders;
		      if (!isArray(orders)) {
		        orders = orders == null ? [] : [orders];
		      }
		      return baseOrderBy(collection, iteratees, orders);
		    }

		    /**
		     * Creates an array of elements split into two groups, the first of which
		     * contains elements `predicate` returns truthy for, the second of which
		     * contains elements `predicate` returns falsey for. The predicate is
		     * invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the array of grouped elements.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'age': 36, 'active': false },
		     *   { 'user': 'fred',    'age': 40, 'active': true },
		     *   { 'user': 'pebbles', 'age': 1,  'active': false }
		     * ];
		     *
		     * _.partition(users, function(o) { return o.active; });
		     * // => objects for [['fred'], ['barney', 'pebbles']]
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.partition(users, { 'age': 1, 'active': false });
		     * // => objects for [['pebbles'], ['barney', 'fred']]
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.partition(users, ['active', false]);
		     * // => objects for [['barney', 'pebbles'], ['fred']]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.partition(users, 'active');
		     * // => objects for [['fred'], ['barney', 'pebbles']]
		     */
		    var partition = createAggregator(function(result, value, key) {
		      result[key ? 0 : 1].push(value);
		    }, function() { return [[], []]; });

		    /**
		     * Reduces `collection` to a value which is the accumulated result of running
		     * each element in `collection` thru `iteratee`, where each successive
		     * invocation is supplied the return value of the previous. If `accumulator`
		     * is not given, the first element of `collection` is used as the initial
		     * value. The iteratee is invoked with four arguments:
		     * (accumulator, value, index|key, collection).
		     *
		     * Many lodash methods are guarded to work as iteratees for methods like
		     * `_.reduce`, `_.reduceRight`, and `_.transform`.
		     *
		     * The guarded methods are:
		     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
		     * and `sortBy`
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @param {*} [accumulator] The initial value.
		     * @returns {*} Returns the accumulated value.
		     * @see _.reduceRight
		     * @example
		     *
		     * _.reduce([1, 2], function(sum, n) {
		     *   return sum + n;
		     * }, 0);
		     * // => 3
		     *
		     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
		     *   (result[value] || (result[value] = [])).push(key);
		     *   return result;
		     * }, {});
		     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
		     */
		    function reduce(collection, iteratee, accumulator) {
		      var func = isArray(collection) ? arrayReduce : baseReduce,
		          initAccum = arguments.length < 3;

		      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
		    }

		    /**
		     * This method is like `_.reduce` except that it iterates over elements of
		     * `collection` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @param {*} [accumulator] The initial value.
		     * @returns {*} Returns the accumulated value.
		     * @see _.reduce
		     * @example
		     *
		     * var array = [[0, 1], [2, 3], [4, 5]];
		     *
		     * _.reduceRight(array, function(flattened, other) {
		     *   return flattened.concat(other);
		     * }, []);
		     * // => [4, 5, 2, 3, 0, 1]
		     */
		    function reduceRight(collection, iteratee, accumulator) {
		      var func = isArray(collection) ? arrayReduceRight : baseReduce,
		          initAccum = arguments.length < 3;

		      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
		    }

		    /**
		     * The opposite of `_.filter`; this method returns the elements of `collection`
		     * that `predicate` does **not** return truthy for.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new filtered array.
		     * @see _.filter
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36, 'active': false },
		     *   { 'user': 'fred',   'age': 40, 'active': true }
		     * ];
		     *
		     * _.reject(users, function(o) { return !o.active; });
		     * // => objects for ['fred']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.reject(users, { 'age': 40, 'active': true });
		     * // => objects for ['barney']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.reject(users, ['active', false]);
		     * // => objects for ['fred']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.reject(users, 'active');
		     * // => objects for ['barney']
		     */
		    function reject(collection, predicate) {
		      var func = isArray(collection) ? arrayFilter : baseFilter;
		      return func(collection, negate(getIteratee(predicate, 3)));
		    }

		    /**
		     * Gets a random element from `collection`.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to sample.
		     * @returns {*} Returns the random element.
		     * @example
		     *
		     * _.sample([1, 2, 3, 4]);
		     * // => 2
		     */
		    function sample(collection) {
		      var func = isArray(collection) ? arraySample : baseSample;
		      return func(collection);
		    }

		    /**
		     * Gets `n` random elements at unique keys from `collection` up to the
		     * size of `collection`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to sample.
		     * @param {number} [n=1] The number of elements to sample.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the random elements.
		     * @example
		     *
		     * _.sampleSize([1, 2, 3], 2);
		     * // => [3, 1]
		     *
		     * _.sampleSize([1, 2, 3], 4);
		     * // => [2, 3, 1]
		     */
		    function sampleSize(collection, n, guard) {
		      if ((guard ? isIterateeCall(collection, n, guard) : n === undefined$1)) {
		        n = 1;
		      } else {
		        n = toInteger(n);
		      }
		      var func = isArray(collection) ? arraySampleSize : baseSampleSize;
		      return func(collection, n);
		    }

		    /**
		     * Creates an array of shuffled values, using a version of the
		     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to shuffle.
		     * @returns {Array} Returns the new shuffled array.
		     * @example
		     *
		     * _.shuffle([1, 2, 3, 4]);
		     * // => [4, 1, 3, 2]
		     */
		    function shuffle(collection) {
		      var func = isArray(collection) ? arrayShuffle : baseShuffle;
		      return func(collection);
		    }

		    /**
		     * Gets the size of `collection` by returning its length for array-like
		     * values or the number of own enumerable string keyed properties for objects.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object|string} collection The collection to inspect.
		     * @returns {number} Returns the collection size.
		     * @example
		     *
		     * _.size([1, 2, 3]);
		     * // => 3
		     *
		     * _.size({ 'a': 1, 'b': 2 });
		     * // => 2
		     *
		     * _.size('pebbles');
		     * // => 7
		     */
		    function size(collection) {
		      if (collection == null) {
		        return 0;
		      }
		      if (isArrayLike(collection)) {
		        return isString(collection) ? stringSize(collection) : collection.length;
		      }
		      var tag = getTag(collection);
		      if (tag == mapTag || tag == setTag) {
		        return collection.size;
		      }
		      return baseKeys(collection).length;
		    }

		    /**
		     * Checks if `predicate` returns truthy for **any** element of `collection`.
		     * Iteration is stopped once `predicate` returns truthy. The predicate is
		     * invoked with three arguments: (value, index|key, collection).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {boolean} Returns `true` if any element passes the predicate check,
		     *  else `false`.
		     * @example
		     *
		     * _.some([null, 0, 'yes', false], Boolean);
		     * // => true
		     *
		     * var users = [
		     *   { 'user': 'barney', 'active': true },
		     *   { 'user': 'fred',   'active': false }
		     * ];
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.some(users, { 'user': 'barney', 'active': false });
		     * // => false
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.some(users, ['active', false]);
		     * // => true
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.some(users, 'active');
		     * // => true
		     */
		    function some(collection, predicate, guard) {
		      var func = isArray(collection) ? arraySome : baseSome;
		      if (guard && isIterateeCall(collection, predicate, guard)) {
		        predicate = undefined$1;
		      }
		      return func(collection, getIteratee(predicate, 3));
		    }

		    /**
		     * Creates an array of elements, sorted in ascending order by the results of
		     * running each element in a collection thru each iteratee. This method
		     * performs a stable sort, that is, it preserves the original sort order of
		     * equal elements. The iteratees are invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {...(Function|Function[])} [iteratees=[_.identity]]
		     *  The iteratees to sort by.
		     * @returns {Array} Returns the new sorted array.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'fred',   'age': 48 },
		     *   { 'user': 'barney', 'age': 36 },
		     *   { 'user': 'fred',   'age': 30 },
		     *   { 'user': 'barney', 'age': 34 }
		     * ];
		     *
		     * _.sortBy(users, [function(o) { return o.user; }]);
		     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
		     *
		     * _.sortBy(users, ['user', 'age']);
		     * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
		     */
		    var sortBy = baseRest(function(collection, iteratees) {
		      if (collection == null) {
		        return [];
		      }
		      var length = iteratees.length;
		      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
		        iteratees = [];
		      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
		        iteratees = [iteratees[0]];
		      }
		      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
		    });

		    /*------------------------------------------------------------------------*/

		    /**
		     * Gets the timestamp of the number of milliseconds that have elapsed since
		     * the Unix epoch (1 January 1970 00:00:00 UTC).
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Date
		     * @returns {number} Returns the timestamp.
		     * @example
		     *
		     * _.defer(function(stamp) {
		     *   console.log(_.now() - stamp);
		     * }, _.now());
		     * // => Logs the number of milliseconds it took for the deferred invocation.
		     */
		    var now = ctxNow || function() {
		      return root.Date.now();
		    };

		    /*------------------------------------------------------------------------*/

		    /**
		     * The opposite of `_.before`; this method creates a function that invokes
		     * `func` once it's called `n` or more times.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {number} n The number of calls before `func` is invoked.
		     * @param {Function} func The function to restrict.
		     * @returns {Function} Returns the new restricted function.
		     * @example
		     *
		     * var saves = ['profile', 'settings'];
		     *
		     * var done = _.after(saves.length, function() {
		     *   console.log('done saving!');
		     * });
		     *
		     * _.forEach(saves, function(type) {
		     *   asyncSave({ 'type': type, 'complete': done });
		     * });
		     * // => Logs 'done saving!' after the two async saves have completed.
		     */
		    function after(n, func) {
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      n = toInteger(n);
		      return function() {
		        if (--n < 1) {
		          return func.apply(this, arguments);
		        }
		      };
		    }

		    /**
		     * Creates a function that invokes `func`, with up to `n` arguments,
		     * ignoring any additional arguments.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {Function} func The function to cap arguments for.
		     * @param {number} [n=func.length] The arity cap.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Function} Returns the new capped function.
		     * @example
		     *
		     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
		     * // => [6, 8, 10]
		     */
		    function ary(func, n, guard) {
		      n = guard ? undefined$1 : n;
		      n = (func && n == null) ? func.length : n;
		      return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
		    }

		    /**
		     * Creates a function that invokes `func`, with the `this` binding and arguments
		     * of the created function, while it's called less than `n` times. Subsequent
		     * calls to the created function return the result of the last `func` invocation.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {number} n The number of calls at which `func` is no longer invoked.
		     * @param {Function} func The function to restrict.
		     * @returns {Function} Returns the new restricted function.
		     * @example
		     *
		     * jQuery(element).on('click', _.before(5, addContactToList));
		     * // => Allows adding up to 4 contacts to the list.
		     */
		    function before(n, func) {
		      var result;
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      n = toInteger(n);
		      return function() {
		        if (--n > 0) {
		          result = func.apply(this, arguments);
		        }
		        if (n <= 1) {
		          func = undefined$1;
		        }
		        return result;
		      };
		    }

		    /**
		     * Creates a function that invokes `func` with the `this` binding of `thisArg`
		     * and `partials` prepended to the arguments it receives.
		     *
		     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
		     * may be used as a placeholder for partially applied arguments.
		     *
		     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
		     * property of bound functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to bind.
		     * @param {*} thisArg The `this` binding of `func`.
		     * @param {...*} [partials] The arguments to be partially applied.
		     * @returns {Function} Returns the new bound function.
		     * @example
		     *
		     * function greet(greeting, punctuation) {
		     *   return greeting + ' ' + this.user + punctuation;
		     * }
		     *
		     * var object = { 'user': 'fred' };
		     *
		     * var bound = _.bind(greet, object, 'hi');
		     * bound('!');
		     * // => 'hi fred!'
		     *
		     * // Bound with placeholders.
		     * var bound = _.bind(greet, object, _, '!');
		     * bound('hi');
		     * // => 'hi fred!'
		     */
		    var bind = baseRest(function(func, thisArg, partials) {
		      var bitmask = WRAP_BIND_FLAG;
		      if (partials.length) {
		        var holders = replaceHolders(partials, getHolder(bind));
		        bitmask |= WRAP_PARTIAL_FLAG;
		      }
		      return createWrap(func, bitmask, thisArg, partials, holders);
		    });

		    /**
		     * Creates a function that invokes the method at `object[key]` with `partials`
		     * prepended to the arguments it receives.
		     *
		     * This method differs from `_.bind` by allowing bound functions to reference
		     * methods that may be redefined or don't yet exist. See
		     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
		     * for more details.
		     *
		     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
		     * builds, may be used as a placeholder for partially applied arguments.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.10.0
		     * @category Function
		     * @param {Object} object The object to invoke the method on.
		     * @param {string} key The key of the method.
		     * @param {...*} [partials] The arguments to be partially applied.
		     * @returns {Function} Returns the new bound function.
		     * @example
		     *
		     * var object = {
		     *   'user': 'fred',
		     *   'greet': function(greeting, punctuation) {
		     *     return greeting + ' ' + this.user + punctuation;
		     *   }
		     * };
		     *
		     * var bound = _.bindKey(object, 'greet', 'hi');
		     * bound('!');
		     * // => 'hi fred!'
		     *
		     * object.greet = function(greeting, punctuation) {
		     *   return greeting + 'ya ' + this.user + punctuation;
		     * };
		     *
		     * bound('!');
		     * // => 'hiya fred!'
		     *
		     * // Bound with placeholders.
		     * var bound = _.bindKey(object, 'greet', _, '!');
		     * bound('hi');
		     * // => 'hiya fred!'
		     */
		    var bindKey = baseRest(function(object, key, partials) {
		      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
		      if (partials.length) {
		        var holders = replaceHolders(partials, getHolder(bindKey));
		        bitmask |= WRAP_PARTIAL_FLAG;
		      }
		      return createWrap(key, bitmask, object, partials, holders);
		    });

		    /**
		     * Creates a function that accepts arguments of `func` and either invokes
		     * `func` returning its result, if at least `arity` number of arguments have
		     * been provided, or returns a function that accepts the remaining `func`
		     * arguments, and so on. The arity of `func` may be specified if `func.length`
		     * is not sufficient.
		     *
		     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
		     * may be used as a placeholder for provided arguments.
		     *
		     * **Note:** This method doesn't set the "length" property of curried functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Function
		     * @param {Function} func The function to curry.
		     * @param {number} [arity=func.length] The arity of `func`.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Function} Returns the new curried function.
		     * @example
		     *
		     * var abc = function(a, b, c) {
		     *   return [a, b, c];
		     * };
		     *
		     * var curried = _.curry(abc);
		     *
		     * curried(1)(2)(3);
		     * // => [1, 2, 3]
		     *
		     * curried(1, 2)(3);
		     * // => [1, 2, 3]
		     *
		     * curried(1, 2, 3);
		     * // => [1, 2, 3]
		     *
		     * // Curried with placeholders.
		     * curried(1)(_, 3)(2);
		     * // => [1, 2, 3]
		     */
		    function curry(func, arity, guard) {
		      arity = guard ? undefined$1 : arity;
		      var result = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
		      result.placeholder = curry.placeholder;
		      return result;
		    }

		    /**
		     * This method is like `_.curry` except that arguments are applied to `func`
		     * in the manner of `_.partialRight` instead of `_.partial`.
		     *
		     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
		     * builds, may be used as a placeholder for provided arguments.
		     *
		     * **Note:** This method doesn't set the "length" property of curried functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {Function} func The function to curry.
		     * @param {number} [arity=func.length] The arity of `func`.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Function} Returns the new curried function.
		     * @example
		     *
		     * var abc = function(a, b, c) {
		     *   return [a, b, c];
		     * };
		     *
		     * var curried = _.curryRight(abc);
		     *
		     * curried(3)(2)(1);
		     * // => [1, 2, 3]
		     *
		     * curried(2, 3)(1);
		     * // => [1, 2, 3]
		     *
		     * curried(1, 2, 3);
		     * // => [1, 2, 3]
		     *
		     * // Curried with placeholders.
		     * curried(3)(1, _)(2);
		     * // => [1, 2, 3]
		     */
		    function curryRight(func, arity, guard) {
		      arity = guard ? undefined$1 : arity;
		      var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
		      result.placeholder = curryRight.placeholder;
		      return result;
		    }

		    /**
		     * Creates a debounced function that delays invoking `func` until after `wait`
		     * milliseconds have elapsed since the last time the debounced function was
		     * invoked. The debounced function comes with a `cancel` method to cancel
		     * delayed `func` invocations and a `flush` method to immediately invoke them.
		     * Provide `options` to indicate whether `func` should be invoked on the
		     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
		     * with the last arguments provided to the debounced function. Subsequent
		     * calls to the debounced function return the result of the last `func`
		     * invocation.
		     *
		     * **Note:** If `leading` and `trailing` options are `true`, `func` is
		     * invoked on the trailing edge of the timeout only if the debounced function
		     * is invoked more than once during the `wait` timeout.
		     *
		     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
		     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
		     *
		     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
		     * for details over the differences between `_.debounce` and `_.throttle`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to debounce.
		     * @param {number} [wait=0] The number of milliseconds to delay.
		     * @param {Object} [options={}] The options object.
		     * @param {boolean} [options.leading=false]
		     *  Specify invoking on the leading edge of the timeout.
		     * @param {number} [options.maxWait]
		     *  The maximum time `func` is allowed to be delayed before it's invoked.
		     * @param {boolean} [options.trailing=true]
		     *  Specify invoking on the trailing edge of the timeout.
		     * @returns {Function} Returns the new debounced function.
		     * @example
		     *
		     * // Avoid costly calculations while the window size is in flux.
		     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
		     *
		     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
		     * jQuery(element).on('click', _.debounce(sendMail, 300, {
		     *   'leading': true,
		     *   'trailing': false
		     * }));
		     *
		     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
		     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
		     * var source = new EventSource('/stream');
		     * jQuery(source).on('message', debounced);
		     *
		     * // Cancel the trailing debounced invocation.
		     * jQuery(window).on('popstate', debounced.cancel);
		     */
		    function debounce(func, wait, options) {
		      var lastArgs,
		          lastThis,
		          maxWait,
		          result,
		          timerId,
		          lastCallTime,
		          lastInvokeTime = 0,
		          leading = false,
		          maxing = false,
		          trailing = true;

		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      wait = toNumber(wait) || 0;
		      if (isObject(options)) {
		        leading = !!options.leading;
		        maxing = 'maxWait' in options;
		        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
		        trailing = 'trailing' in options ? !!options.trailing : trailing;
		      }

		      function invokeFunc(time) {
		        var args = lastArgs,
		            thisArg = lastThis;

		        lastArgs = lastThis = undefined$1;
		        lastInvokeTime = time;
		        result = func.apply(thisArg, args);
		        return result;
		      }

		      function leadingEdge(time) {
		        // Reset any `maxWait` timer.
		        lastInvokeTime = time;
		        // Start the timer for the trailing edge.
		        timerId = setTimeout(timerExpired, wait);
		        // Invoke the leading edge.
		        return leading ? invokeFunc(time) : result;
		      }

		      function remainingWait(time) {
		        var timeSinceLastCall = time - lastCallTime,
		            timeSinceLastInvoke = time - lastInvokeTime,
		            timeWaiting = wait - timeSinceLastCall;

		        return maxing
		          ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
		          : timeWaiting;
		      }

		      function shouldInvoke(time) {
		        var timeSinceLastCall = time - lastCallTime,
		            timeSinceLastInvoke = time - lastInvokeTime;

		        // Either this is the first call, activity has stopped and we're at the
		        // trailing edge, the system time has gone backwards and we're treating
		        // it as the trailing edge, or we've hit the `maxWait` limit.
		        return (lastCallTime === undefined$1 || (timeSinceLastCall >= wait) ||
		          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
		      }

		      function timerExpired() {
		        var time = now();
		        if (shouldInvoke(time)) {
		          return trailingEdge(time);
		        }
		        // Restart the timer.
		        timerId = setTimeout(timerExpired, remainingWait(time));
		      }

		      function trailingEdge(time) {
		        timerId = undefined$1;

		        // Only invoke if we have `lastArgs` which means `func` has been
		        // debounced at least once.
		        if (trailing && lastArgs) {
		          return invokeFunc(time);
		        }
		        lastArgs = lastThis = undefined$1;
		        return result;
		      }

		      function cancel() {
		        if (timerId !== undefined$1) {
		          clearTimeout(timerId);
		        }
		        lastInvokeTime = 0;
		        lastArgs = lastCallTime = lastThis = timerId = undefined$1;
		      }

		      function flush() {
		        return timerId === undefined$1 ? result : trailingEdge(now());
		      }

		      function debounced() {
		        var time = now(),
		            isInvoking = shouldInvoke(time);

		        lastArgs = arguments;
		        lastThis = this;
		        lastCallTime = time;

		        if (isInvoking) {
		          if (timerId === undefined$1) {
		            return leadingEdge(lastCallTime);
		          }
		          if (maxing) {
		            // Handle invocations in a tight loop.
		            clearTimeout(timerId);
		            timerId = setTimeout(timerExpired, wait);
		            return invokeFunc(lastCallTime);
		          }
		        }
		        if (timerId === undefined$1) {
		          timerId = setTimeout(timerExpired, wait);
		        }
		        return result;
		      }
		      debounced.cancel = cancel;
		      debounced.flush = flush;
		      return debounced;
		    }

		    /**
		     * Defers invoking the `func` until the current call stack has cleared. Any
		     * additional arguments are provided to `func` when it's invoked.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to defer.
		     * @param {...*} [args] The arguments to invoke `func` with.
		     * @returns {number} Returns the timer id.
		     * @example
		     *
		     * _.defer(function(text) {
		     *   console.log(text);
		     * }, 'deferred');
		     * // => Logs 'deferred' after one millisecond.
		     */
		    var defer = baseRest(function(func, args) {
		      return baseDelay(func, 1, args);
		    });

		    /**
		     * Invokes `func` after `wait` milliseconds. Any additional arguments are
		     * provided to `func` when it's invoked.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to delay.
		     * @param {number} wait The number of milliseconds to delay invocation.
		     * @param {...*} [args] The arguments to invoke `func` with.
		     * @returns {number} Returns the timer id.
		     * @example
		     *
		     * _.delay(function(text) {
		     *   console.log(text);
		     * }, 1000, 'later');
		     * // => Logs 'later' after one second.
		     */
		    var delay = baseRest(function(func, wait, args) {
		      return baseDelay(func, toNumber(wait) || 0, args);
		    });

		    /**
		     * Creates a function that invokes `func` with arguments reversed.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Function
		     * @param {Function} func The function to flip arguments for.
		     * @returns {Function} Returns the new flipped function.
		     * @example
		     *
		     * var flipped = _.flip(function() {
		     *   return _.toArray(arguments);
		     * });
		     *
		     * flipped('a', 'b', 'c', 'd');
		     * // => ['d', 'c', 'b', 'a']
		     */
		    function flip(func) {
		      return createWrap(func, WRAP_FLIP_FLAG);
		    }

		    /**
		     * Creates a function that memoizes the result of `func`. If `resolver` is
		     * provided, it determines the cache key for storing the result based on the
		     * arguments provided to the memoized function. By default, the first argument
		     * provided to the memoized function is used as the map cache key. The `func`
		     * is invoked with the `this` binding of the memoized function.
		     *
		     * **Note:** The cache is exposed as the `cache` property on the memoized
		     * function. Its creation may be customized by replacing the `_.memoize.Cache`
		     * constructor with one whose instances implement the
		     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
		     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to have its output memoized.
		     * @param {Function} [resolver] The function to resolve the cache key.
		     * @returns {Function} Returns the new memoized function.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2 };
		     * var other = { 'c': 3, 'd': 4 };
		     *
		     * var values = _.memoize(_.values);
		     * values(object);
		     * // => [1, 2]
		     *
		     * values(other);
		     * // => [3, 4]
		     *
		     * object.a = 2;
		     * values(object);
		     * // => [1, 2]
		     *
		     * // Modify the result cache.
		     * values.cache.set(object, ['a', 'b']);
		     * values(object);
		     * // => ['a', 'b']
		     *
		     * // Replace `_.memoize.Cache`.
		     * _.memoize.Cache = WeakMap;
		     */
		    function memoize(func, resolver) {
		      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      var memoized = function() {
		        var args = arguments,
		            key = resolver ? resolver.apply(this, args) : args[0],
		            cache = memoized.cache;

		        if (cache.has(key)) {
		          return cache.get(key);
		        }
		        var result = func.apply(this, args);
		        memoized.cache = cache.set(key, result) || cache;
		        return result;
		      };
		      memoized.cache = new (memoize.Cache || MapCache);
		      return memoized;
		    }

		    // Expose `MapCache`.
		    memoize.Cache = MapCache;

		    /**
		     * Creates a function that negates the result of the predicate `func`. The
		     * `func` predicate is invoked with the `this` binding and arguments of the
		     * created function.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {Function} predicate The predicate to negate.
		     * @returns {Function} Returns the new negated function.
		     * @example
		     *
		     * function isEven(n) {
		     *   return n % 2 == 0;
		     * }
		     *
		     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
		     * // => [1, 3, 5]
		     */
		    function negate(predicate) {
		      if (typeof predicate != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      return function() {
		        var args = arguments;
		        switch (args.length) {
		          case 0: return !predicate.call(this);
		          case 1: return !predicate.call(this, args[0]);
		          case 2: return !predicate.call(this, args[0], args[1]);
		          case 3: return !predicate.call(this, args[0], args[1], args[2]);
		        }
		        return !predicate.apply(this, args);
		      };
		    }

		    /**
		     * Creates a function that is restricted to invoking `func` once. Repeat calls
		     * to the function return the value of the first invocation. The `func` is
		     * invoked with the `this` binding and arguments of the created function.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to restrict.
		     * @returns {Function} Returns the new restricted function.
		     * @example
		     *
		     * var initialize = _.once(createApplication);
		     * initialize();
		     * initialize();
		     * // => `createApplication` is invoked once
		     */
		    function once(func) {
		      return before(2, func);
		    }

		    /**
		     * Creates a function that invokes `func` with its arguments transformed.
		     *
		     * @static
		     * @since 4.0.0
		     * @memberOf _
		     * @category Function
		     * @param {Function} func The function to wrap.
		     * @param {...(Function|Function[])} [transforms=[_.identity]]
		     *  The argument transforms.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * function doubled(n) {
		     *   return n * 2;
		     * }
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var func = _.overArgs(function(x, y) {
		     *   return [x, y];
		     * }, [square, doubled]);
		     *
		     * func(9, 3);
		     * // => [81, 6]
		     *
		     * func(10, 5);
		     * // => [100, 10]
		     */
		    var overArgs = castRest(function(func, transforms) {
		      transforms = (transforms.length == 1 && isArray(transforms[0]))
		        ? arrayMap(transforms[0], baseUnary(getIteratee()))
		        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

		      var funcsLength = transforms.length;
		      return baseRest(function(args) {
		        var index = -1,
		            length = nativeMin(args.length, funcsLength);

		        while (++index < length) {
		          args[index] = transforms[index].call(this, args[index]);
		        }
		        return apply(func, this, args);
		      });
		    });

		    /**
		     * Creates a function that invokes `func` with `partials` prepended to the
		     * arguments it receives. This method is like `_.bind` except it does **not**
		     * alter the `this` binding.
		     *
		     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
		     * builds, may be used as a placeholder for partially applied arguments.
		     *
		     * **Note:** This method doesn't set the "length" property of partially
		     * applied functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.2.0
		     * @category Function
		     * @param {Function} func The function to partially apply arguments to.
		     * @param {...*} [partials] The arguments to be partially applied.
		     * @returns {Function} Returns the new partially applied function.
		     * @example
		     *
		     * function greet(greeting, name) {
		     *   return greeting + ' ' + name;
		     * }
		     *
		     * var sayHelloTo = _.partial(greet, 'hello');
		     * sayHelloTo('fred');
		     * // => 'hello fred'
		     *
		     * // Partially applied with placeholders.
		     * var greetFred = _.partial(greet, _, 'fred');
		     * greetFred('hi');
		     * // => 'hi fred'
		     */
		    var partial = baseRest(function(func, partials) {
		      var holders = replaceHolders(partials, getHolder(partial));
		      return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
		    });

		    /**
		     * This method is like `_.partial` except that partially applied arguments
		     * are appended to the arguments it receives.
		     *
		     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
		     * builds, may be used as a placeholder for partially applied arguments.
		     *
		     * **Note:** This method doesn't set the "length" property of partially
		     * applied functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.0.0
		     * @category Function
		     * @param {Function} func The function to partially apply arguments to.
		     * @param {...*} [partials] The arguments to be partially applied.
		     * @returns {Function} Returns the new partially applied function.
		     * @example
		     *
		     * function greet(greeting, name) {
		     *   return greeting + ' ' + name;
		     * }
		     *
		     * var greetFred = _.partialRight(greet, 'fred');
		     * greetFred('hi');
		     * // => 'hi fred'
		     *
		     * // Partially applied with placeholders.
		     * var sayHelloTo = _.partialRight(greet, 'hello', _);
		     * sayHelloTo('fred');
		     * // => 'hello fred'
		     */
		    var partialRight = baseRest(function(func, partials) {
		      var holders = replaceHolders(partials, getHolder(partialRight));
		      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
		    });

		    /**
		     * Creates a function that invokes `func` with arguments arranged according
		     * to the specified `indexes` where the argument value at the first index is
		     * provided as the first argument, the argument value at the second index is
		     * provided as the second argument, and so on.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {Function} func The function to rearrange arguments for.
		     * @param {...(number|number[])} indexes The arranged argument indexes.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var rearged = _.rearg(function(a, b, c) {
		     *   return [a, b, c];
		     * }, [2, 0, 1]);
		     *
		     * rearged('b', 'c', 'a')
		     * // => ['a', 'b', 'c']
		     */
		    var rearg = flatRest(function(func, indexes) {
		      return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
		    });

		    /**
		     * Creates a function that invokes `func` with the `this` binding of the
		     * created function and arguments from `start` and beyond provided as
		     * an array.
		     *
		     * **Note:** This method is based on the
		     * [rest parameter](https://mdn.io/rest_parameters).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Function
		     * @param {Function} func The function to apply a rest parameter to.
		     * @param {number} [start=func.length-1] The start position of the rest parameter.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var say = _.rest(function(what, names) {
		     *   return what + ' ' + _.initial(names).join(', ') +
		     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
		     * });
		     *
		     * say('hello', 'fred', 'barney', 'pebbles');
		     * // => 'hello fred, barney, & pebbles'
		     */
		    function rest(func, start) {
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      start = start === undefined$1 ? start : toInteger(start);
		      return baseRest(func, start);
		    }

		    /**
		     * Creates a function that invokes `func` with the `this` binding of the
		     * create function and an array of arguments much like
		     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
		     *
		     * **Note:** This method is based on the
		     * [spread operator](https://mdn.io/spread_operator).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.2.0
		     * @category Function
		     * @param {Function} func The function to spread arguments over.
		     * @param {number} [start=0] The start position of the spread.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var say = _.spread(function(who, what) {
		     *   return who + ' says ' + what;
		     * });
		     *
		     * say(['fred', 'hello']);
		     * // => 'fred says hello'
		     *
		     * var numbers = Promise.all([
		     *   Promise.resolve(40),
		     *   Promise.resolve(36)
		     * ]);
		     *
		     * numbers.then(_.spread(function(x, y) {
		     *   return x + y;
		     * }));
		     * // => a Promise of 76
		     */
		    function spread(func, start) {
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      start = start == null ? 0 : nativeMax(toInteger(start), 0);
		      return baseRest(function(args) {
		        var array = args[start],
		            otherArgs = castSlice(args, 0, start);

		        if (array) {
		          arrayPush(otherArgs, array);
		        }
		        return apply(func, this, otherArgs);
		      });
		    }

		    /**
		     * Creates a throttled function that only invokes `func` at most once per
		     * every `wait` milliseconds. The throttled function comes with a `cancel`
		     * method to cancel delayed `func` invocations and a `flush` method to
		     * immediately invoke them. Provide `options` to indicate whether `func`
		     * should be invoked on the leading and/or trailing edge of the `wait`
		     * timeout. The `func` is invoked with the last arguments provided to the
		     * throttled function. Subsequent calls to the throttled function return the
		     * result of the last `func` invocation.
		     *
		     * **Note:** If `leading` and `trailing` options are `true`, `func` is
		     * invoked on the trailing edge of the timeout only if the throttled function
		     * is invoked more than once during the `wait` timeout.
		     *
		     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
		     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
		     *
		     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
		     * for details over the differences between `_.throttle` and `_.debounce`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to throttle.
		     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
		     * @param {Object} [options={}] The options object.
		     * @param {boolean} [options.leading=true]
		     *  Specify invoking on the leading edge of the timeout.
		     * @param {boolean} [options.trailing=true]
		     *  Specify invoking on the trailing edge of the timeout.
		     * @returns {Function} Returns the new throttled function.
		     * @example
		     *
		     * // Avoid excessively updating the position while scrolling.
		     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
		     *
		     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
		     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
		     * jQuery(element).on('click', throttled);
		     *
		     * // Cancel the trailing throttled invocation.
		     * jQuery(window).on('popstate', throttled.cancel);
		     */
		    function throttle(func, wait, options) {
		      var leading = true,
		          trailing = true;

		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      if (isObject(options)) {
		        leading = 'leading' in options ? !!options.leading : leading;
		        trailing = 'trailing' in options ? !!options.trailing : trailing;
		      }
		      return debounce(func, wait, {
		        'leading': leading,
		        'maxWait': wait,
		        'trailing': trailing
		      });
		    }

		    /**
		     * Creates a function that accepts up to one argument, ignoring any
		     * additional arguments.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Function
		     * @param {Function} func The function to cap arguments for.
		     * @returns {Function} Returns the new capped function.
		     * @example
		     *
		     * _.map(['6', '8', '10'], _.unary(parseInt));
		     * // => [6, 8, 10]
		     */
		    function unary(func) {
		      return ary(func, 1);
		    }

		    /**
		     * Creates a function that provides `value` to `wrapper` as its first
		     * argument. Any additional arguments provided to the function are appended
		     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
		     * binding of the created function.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {*} value The value to wrap.
		     * @param {Function} [wrapper=identity] The wrapper function.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var p = _.wrap(_.escape, function(func, text) {
		     *   return '<p>' + func(text) + '</p>';
		     * });
		     *
		     * p('fred, barney, & pebbles');
		     * // => '<p>fred, barney, &amp; pebbles</p>'
		     */
		    function wrap(value, wrapper) {
		      return partial(castFunction(wrapper), value);
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Casts `value` as an array if it's not one.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.4.0
		     * @category Lang
		     * @param {*} value The value to inspect.
		     * @returns {Array} Returns the cast array.
		     * @example
		     *
		     * _.castArray(1);
		     * // => [1]
		     *
		     * _.castArray({ 'a': 1 });
		     * // => [{ 'a': 1 }]
		     *
		     * _.castArray('abc');
		     * // => ['abc']
		     *
		     * _.castArray(null);
		     * // => [null]
		     *
		     * _.castArray(undefined);
		     * // => [undefined]
		     *
		     * _.castArray();
		     * // => []
		     *
		     * var array = [1, 2, 3];
		     * console.log(_.castArray(array) === array);
		     * // => true
		     */
		    function castArray() {
		      if (!arguments.length) {
		        return [];
		      }
		      var value = arguments[0];
		      return isArray(value) ? value : [value];
		    }

		    /**
		     * Creates a shallow clone of `value`.
		     *
		     * **Note:** This method is loosely based on the
		     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
		     * and supports cloning arrays, array buffers, booleans, date objects, maps,
		     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
		     * arrays. The own enumerable properties of `arguments` objects are cloned
		     * as plain objects. An empty object is returned for uncloneable values such
		     * as error objects, functions, DOM nodes, and WeakMaps.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to clone.
		     * @returns {*} Returns the cloned value.
		     * @see _.cloneDeep
		     * @example
		     *
		     * var objects = [{ 'a': 1 }, { 'b': 2 }];
		     *
		     * var shallow = _.clone(objects);
		     * console.log(shallow[0] === objects[0]);
		     * // => true
		     */
		    function clone(value) {
		      return baseClone(value, CLONE_SYMBOLS_FLAG);
		    }

		    /**
		     * This method is like `_.clone` except that it accepts `customizer` which
		     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
		     * cloning is handled by the method instead. The `customizer` is invoked with
		     * up to four arguments; (value [, index|key, object, stack]).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to clone.
		     * @param {Function} [customizer] The function to customize cloning.
		     * @returns {*} Returns the cloned value.
		     * @see _.cloneDeepWith
		     * @example
		     *
		     * function customizer(value) {
		     *   if (_.isElement(value)) {
		     *     return value.cloneNode(false);
		     *   }
		     * }
		     *
		     * var el = _.cloneWith(document.body, customizer);
		     *
		     * console.log(el === document.body);
		     * // => false
		     * console.log(el.nodeName);
		     * // => 'BODY'
		     * console.log(el.childNodes.length);
		     * // => 0
		     */
		    function cloneWith(value, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined$1;
		      return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
		    }

		    /**
		     * This method is like `_.clone` except that it recursively clones `value`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.0.0
		     * @category Lang
		     * @param {*} value The value to recursively clone.
		     * @returns {*} Returns the deep cloned value.
		     * @see _.clone
		     * @example
		     *
		     * var objects = [{ 'a': 1 }, { 'b': 2 }];
		     *
		     * var deep = _.cloneDeep(objects);
		     * console.log(deep[0] === objects[0]);
		     * // => false
		     */
		    function cloneDeep(value) {
		      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
		    }

		    /**
		     * This method is like `_.cloneWith` except that it recursively clones `value`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to recursively clone.
		     * @param {Function} [customizer] The function to customize cloning.
		     * @returns {*} Returns the deep cloned value.
		     * @see _.cloneWith
		     * @example
		     *
		     * function customizer(value) {
		     *   if (_.isElement(value)) {
		     *     return value.cloneNode(true);
		     *   }
		     * }
		     *
		     * var el = _.cloneDeepWith(document.body, customizer);
		     *
		     * console.log(el === document.body);
		     * // => false
		     * console.log(el.nodeName);
		     * // => 'BODY'
		     * console.log(el.childNodes.length);
		     * // => 20
		     */
		    function cloneDeepWith(value, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined$1;
		      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
		    }

		    /**
		     * Checks if `object` conforms to `source` by invoking the predicate
		     * properties of `source` with the corresponding property values of `object`.
		     *
		     * **Note:** This method is equivalent to `_.conforms` when `source` is
		     * partially applied.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.14.0
		     * @category Lang
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property predicates to conform to.
		     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2 };
		     *
		     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
		     * // => true
		     *
		     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
		     * // => false
		     */
		    function conformsTo(object, source) {
		      return source == null || baseConformsTo(object, source, keys(source));
		    }

		    /**
		     * Performs a
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * comparison between two values to determine if they are equivalent.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		     * @example
		     *
		     * var object = { 'a': 1 };
		     * var other = { 'a': 1 };
		     *
		     * _.eq(object, object);
		     * // => true
		     *
		     * _.eq(object, other);
		     * // => false
		     *
		     * _.eq('a', 'a');
		     * // => true
		     *
		     * _.eq('a', Object('a'));
		     * // => false
		     *
		     * _.eq(NaN, NaN);
		     * // => true
		     */
		    function eq(value, other) {
		      return value === other || (value !== value && other !== other);
		    }

		    /**
		     * Checks if `value` is greater than `other`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.9.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is greater than `other`,
		     *  else `false`.
		     * @see _.lt
		     * @example
		     *
		     * _.gt(3, 1);
		     * // => true
		     *
		     * _.gt(3, 3);
		     * // => false
		     *
		     * _.gt(1, 3);
		     * // => false
		     */
		    var gt = createRelationalOperation(baseGt);

		    /**
		     * Checks if `value` is greater than or equal to `other`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.9.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is greater than or equal to
		     *  `other`, else `false`.
		     * @see _.lte
		     * @example
		     *
		     * _.gte(3, 1);
		     * // => true
		     *
		     * _.gte(3, 3);
		     * // => true
		     *
		     * _.gte(1, 3);
		     * // => false
		     */
		    var gte = createRelationalOperation(function(value, other) {
		      return value >= other;
		    });

		    /**
		     * Checks if `value` is likely an `arguments` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
		     *  else `false`.
		     * @example
		     *
		     * _.isArguments(function() { return arguments; }());
		     * // => true
		     *
		     * _.isArguments([1, 2, 3]);
		     * // => false
		     */
		    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
		      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
		        !propertyIsEnumerable.call(value, 'callee');
		    };

		    /**
		     * Checks if `value` is classified as an `Array` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
		     * @example
		     *
		     * _.isArray([1, 2, 3]);
		     * // => true
		     *
		     * _.isArray(document.body.children);
		     * // => false
		     *
		     * _.isArray('abc');
		     * // => false
		     *
		     * _.isArray(_.noop);
		     * // => false
		     */
		    var isArray = Array.isArray;

		    /**
		     * Checks if `value` is classified as an `ArrayBuffer` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
		     * @example
		     *
		     * _.isArrayBuffer(new ArrayBuffer(2));
		     * // => true
		     *
		     * _.isArrayBuffer(new Array(2));
		     * // => false
		     */
		    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

		    /**
		     * Checks if `value` is array-like. A value is considered array-like if it's
		     * not a function and has a `value.length` that's an integer greater than or
		     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
		     * @example
		     *
		     * _.isArrayLike([1, 2, 3]);
		     * // => true
		     *
		     * _.isArrayLike(document.body.children);
		     * // => true
		     *
		     * _.isArrayLike('abc');
		     * // => true
		     *
		     * _.isArrayLike(_.noop);
		     * // => false
		     */
		    function isArrayLike(value) {
		      return value != null && isLength(value.length) && !isFunction(value);
		    }

		    /**
		     * This method is like `_.isArrayLike` except that it also checks if `value`
		     * is an object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an array-like object,
		     *  else `false`.
		     * @example
		     *
		     * _.isArrayLikeObject([1, 2, 3]);
		     * // => true
		     *
		     * _.isArrayLikeObject(document.body.children);
		     * // => true
		     *
		     * _.isArrayLikeObject('abc');
		     * // => false
		     *
		     * _.isArrayLikeObject(_.noop);
		     * // => false
		     */
		    function isArrayLikeObject(value) {
		      return isObjectLike(value) && isArrayLike(value);
		    }

		    /**
		     * Checks if `value` is classified as a boolean primitive or object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
		     * @example
		     *
		     * _.isBoolean(false);
		     * // => true
		     *
		     * _.isBoolean(null);
		     * // => false
		     */
		    function isBoolean(value) {
		      return value === true || value === false ||
		        (isObjectLike(value) && baseGetTag(value) == boolTag);
		    }

		    /**
		     * Checks if `value` is a buffer.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
		     * @example
		     *
		     * _.isBuffer(new Buffer(2));
		     * // => true
		     *
		     * _.isBuffer(new Uint8Array(2));
		     * // => false
		     */
		    var isBuffer = nativeIsBuffer || stubFalse;

		    /**
		     * Checks if `value` is classified as a `Date` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
		     * @example
		     *
		     * _.isDate(new Date);
		     * // => true
		     *
		     * _.isDate('Mon April 23 2012');
		     * // => false
		     */
		    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

		    /**
		     * Checks if `value` is likely a DOM element.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
		     * @example
		     *
		     * _.isElement(document.body);
		     * // => true
		     *
		     * _.isElement('<body>');
		     * // => false
		     */
		    function isElement(value) {
		      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
		    }

		    /**
		     * Checks if `value` is an empty object, collection, map, or set.
		     *
		     * Objects are considered empty if they have no own enumerable string keyed
		     * properties.
		     *
		     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
		     * jQuery-like collections are considered empty if they have a `length` of `0`.
		     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
		     * @example
		     *
		     * _.isEmpty(null);
		     * // => true
		     *
		     * _.isEmpty(true);
		     * // => true
		     *
		     * _.isEmpty(1);
		     * // => true
		     *
		     * _.isEmpty([1, 2, 3]);
		     * // => false
		     *
		     * _.isEmpty({ 'a': 1 });
		     * // => false
		     */
		    function isEmpty(value) {
		      if (value == null) {
		        return true;
		      }
		      if (isArrayLike(value) &&
		          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
		            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
		        return !value.length;
		      }
		      var tag = getTag(value);
		      if (tag == mapTag || tag == setTag) {
		        return !value.size;
		      }
		      if (isPrototype(value)) {
		        return !baseKeys(value).length;
		      }
		      for (var key in value) {
		        if (hasOwnProperty.call(value, key)) {
		          return false;
		        }
		      }
		      return true;
		    }

		    /**
		     * Performs a deep comparison between two values to determine if they are
		     * equivalent.
		     *
		     * **Note:** This method supports comparing arrays, array buffers, booleans,
		     * date objects, error objects, maps, numbers, `Object` objects, regexes,
		     * sets, strings, symbols, and typed arrays. `Object` objects are compared
		     * by their own, not inherited, enumerable properties. Functions and DOM
		     * nodes are compared by strict equality, i.e. `===`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		     * @example
		     *
		     * var object = { 'a': 1 };
		     * var other = { 'a': 1 };
		     *
		     * _.isEqual(object, other);
		     * // => true
		     *
		     * object === other;
		     * // => false
		     */
		    function isEqual(value, other) {
		      return baseIsEqual(value, other);
		    }

		    /**
		     * This method is like `_.isEqual` except that it accepts `customizer` which
		     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
		     * are handled by the method instead. The `customizer` is invoked with up to
		     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @param {Function} [customizer] The function to customize comparisons.
		     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		     * @example
		     *
		     * function isGreeting(value) {
		     *   return /^h(?:i|ello)$/.test(value);
		     * }
		     *
		     * function customizer(objValue, othValue) {
		     *   if (isGreeting(objValue) && isGreeting(othValue)) {
		     *     return true;
		     *   }
		     * }
		     *
		     * var array = ['hello', 'goodbye'];
		     * var other = ['hi', 'goodbye'];
		     *
		     * _.isEqualWith(array, other, customizer);
		     * // => true
		     */
		    function isEqualWith(value, other, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined$1;
		      var result = customizer ? customizer(value, other) : undefined$1;
		      return result === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result;
		    }

		    /**
		     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
		     * `SyntaxError`, `TypeError`, or `URIError` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
		     * @example
		     *
		     * _.isError(new Error);
		     * // => true
		     *
		     * _.isError(Error);
		     * // => false
		     */
		    function isError(value) {
		      if (!isObjectLike(value)) {
		        return false;
		      }
		      var tag = baseGetTag(value);
		      return tag == errorTag || tag == domExcTag ||
		        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
		    }

		    /**
		     * Checks if `value` is a finite primitive number.
		     *
		     * **Note:** This method is based on
		     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
		     * @example
		     *
		     * _.isFinite(3);
		     * // => true
		     *
		     * _.isFinite(Number.MIN_VALUE);
		     * // => true
		     *
		     * _.isFinite(Infinity);
		     * // => false
		     *
		     * _.isFinite('3');
		     * // => false
		     */
		    function isFinite(value) {
		      return typeof value == 'number' && nativeIsFinite(value);
		    }

		    /**
		     * Checks if `value` is classified as a `Function` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
		     * @example
		     *
		     * _.isFunction(_);
		     * // => true
		     *
		     * _.isFunction(/abc/);
		     * // => false
		     */
		    function isFunction(value) {
		      if (!isObject(value)) {
		        return false;
		      }
		      // The use of `Object#toString` avoids issues with the `typeof` operator
		      // in Safari 9 which returns 'object' for typed arrays and other constructors.
		      var tag = baseGetTag(value);
		      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
		    }

		    /**
		     * Checks if `value` is an integer.
		     *
		     * **Note:** This method is based on
		     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
		     * @example
		     *
		     * _.isInteger(3);
		     * // => true
		     *
		     * _.isInteger(Number.MIN_VALUE);
		     * // => false
		     *
		     * _.isInteger(Infinity);
		     * // => false
		     *
		     * _.isInteger('3');
		     * // => false
		     */
		    function isInteger(value) {
		      return typeof value == 'number' && value == toInteger(value);
		    }

		    /**
		     * Checks if `value` is a valid array-like length.
		     *
		     * **Note:** This method is loosely based on
		     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
		     * @example
		     *
		     * _.isLength(3);
		     * // => true
		     *
		     * _.isLength(Number.MIN_VALUE);
		     * // => false
		     *
		     * _.isLength(Infinity);
		     * // => false
		     *
		     * _.isLength('3');
		     * // => false
		     */
		    function isLength(value) {
		      return typeof value == 'number' &&
		        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
		    }

		    /**
		     * Checks if `value` is the
		     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
		     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
		     * @example
		     *
		     * _.isObject({});
		     * // => true
		     *
		     * _.isObject([1, 2, 3]);
		     * // => true
		     *
		     * _.isObject(_.noop);
		     * // => true
		     *
		     * _.isObject(null);
		     * // => false
		     */
		    function isObject(value) {
		      var type = typeof value;
		      return value != null && (type == 'object' || type == 'function');
		    }

		    /**
		     * Checks if `value` is object-like. A value is object-like if it's not `null`
		     * and has a `typeof` result of "object".
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
		     * @example
		     *
		     * _.isObjectLike({});
		     * // => true
		     *
		     * _.isObjectLike([1, 2, 3]);
		     * // => true
		     *
		     * _.isObjectLike(_.noop);
		     * // => false
		     *
		     * _.isObjectLike(null);
		     * // => false
		     */
		    function isObjectLike(value) {
		      return value != null && typeof value == 'object';
		    }

		    /**
		     * Checks if `value` is classified as a `Map` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
		     * @example
		     *
		     * _.isMap(new Map);
		     * // => true
		     *
		     * _.isMap(new WeakMap);
		     * // => false
		     */
		    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

		    /**
		     * Performs a partial deep comparison between `object` and `source` to
		     * determine if `object` contains equivalent property values.
		     *
		     * **Note:** This method is equivalent to `_.matches` when `source` is
		     * partially applied.
		     *
		     * Partial comparisons will match empty array and empty object `source`
		     * values against any array or object value, respectively. See `_.isEqual`
		     * for a list of supported value comparisons.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property values to match.
		     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2 };
		     *
		     * _.isMatch(object, { 'b': 2 });
		     * // => true
		     *
		     * _.isMatch(object, { 'b': 1 });
		     * // => false
		     */
		    function isMatch(object, source) {
		      return object === source || baseIsMatch(object, source, getMatchData(source));
		    }

		    /**
		     * This method is like `_.isMatch` except that it accepts `customizer` which
		     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
		     * are handled by the method instead. The `customizer` is invoked with five
		     * arguments: (objValue, srcValue, index|key, object, source).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property values to match.
		     * @param {Function} [customizer] The function to customize comparisons.
		     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
		     * @example
		     *
		     * function isGreeting(value) {
		     *   return /^h(?:i|ello)$/.test(value);
		     * }
		     *
		     * function customizer(objValue, srcValue) {
		     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
		     *     return true;
		     *   }
		     * }
		     *
		     * var object = { 'greeting': 'hello' };
		     * var source = { 'greeting': 'hi' };
		     *
		     * _.isMatchWith(object, source, customizer);
		     * // => true
		     */
		    function isMatchWith(object, source, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined$1;
		      return baseIsMatch(object, source, getMatchData(source), customizer);
		    }

		    /**
		     * Checks if `value` is `NaN`.
		     *
		     * **Note:** This method is based on
		     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
		     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
		     * `undefined` and other non-number values.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
		     * @example
		     *
		     * _.isNaN(NaN);
		     * // => true
		     *
		     * _.isNaN(new Number(NaN));
		     * // => true
		     *
		     * isNaN(undefined);
		     * // => true
		     *
		     * _.isNaN(undefined);
		     * // => false
		     */
		    function isNaN(value) {
		      // An `NaN` primitive is the only value that is not equal to itself.
		      // Perform the `toStringTag` check first to avoid errors with some
		      // ActiveX objects in IE.
		      return isNumber(value) && value != +value;
		    }

		    /**
		     * Checks if `value` is a pristine native function.
		     *
		     * **Note:** This method can't reliably detect native functions in the presence
		     * of the core-js package because core-js circumvents this kind of detection.
		     * Despite multiple requests, the core-js maintainer has made it clear: any
		     * attempt to fix the detection will be obstructed. As a result, we're left
		     * with little choice but to throw an error. Unfortunately, this also affects
		     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
		     * which rely on core-js.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a native function,
		     *  else `false`.
		     * @example
		     *
		     * _.isNative(Array.prototype.push);
		     * // => true
		     *
		     * _.isNative(_);
		     * // => false
		     */
		    function isNative(value) {
		      if (isMaskable(value)) {
		        throw new Error(CORE_ERROR_TEXT);
		      }
		      return baseIsNative(value);
		    }

		    /**
		     * Checks if `value` is `null`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
		     * @example
		     *
		     * _.isNull(null);
		     * // => true
		     *
		     * _.isNull(void 0);
		     * // => false
		     */
		    function isNull(value) {
		      return value === null;
		    }

		    /**
		     * Checks if `value` is `null` or `undefined`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
		     * @example
		     *
		     * _.isNil(null);
		     * // => true
		     *
		     * _.isNil(void 0);
		     * // => true
		     *
		     * _.isNil(NaN);
		     * // => false
		     */
		    function isNil(value) {
		      return value == null;
		    }

		    /**
		     * Checks if `value` is classified as a `Number` primitive or object.
		     *
		     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
		     * classified as numbers, use the `_.isFinite` method.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
		     * @example
		     *
		     * _.isNumber(3);
		     * // => true
		     *
		     * _.isNumber(Number.MIN_VALUE);
		     * // => true
		     *
		     * _.isNumber(Infinity);
		     * // => true
		     *
		     * _.isNumber('3');
		     * // => false
		     */
		    function isNumber(value) {
		      return typeof value == 'number' ||
		        (isObjectLike(value) && baseGetTag(value) == numberTag);
		    }

		    /**
		     * Checks if `value` is a plain object, that is, an object created by the
		     * `Object` constructor or one with a `[[Prototype]]` of `null`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.8.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     * }
		     *
		     * _.isPlainObject(new Foo);
		     * // => false
		     *
		     * _.isPlainObject([1, 2, 3]);
		     * // => false
		     *
		     * _.isPlainObject({ 'x': 0, 'y': 0 });
		     * // => true
		     *
		     * _.isPlainObject(Object.create(null));
		     * // => true
		     */
		    function isPlainObject(value) {
		      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
		        return false;
		      }
		      var proto = getPrototype(value);
		      if (proto === null) {
		        return true;
		      }
		      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
		      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
		        funcToString.call(Ctor) == objectCtorString;
		    }

		    /**
		     * Checks if `value` is classified as a `RegExp` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
		     * @example
		     *
		     * _.isRegExp(/abc/);
		     * // => true
		     *
		     * _.isRegExp('/abc/');
		     * // => false
		     */
		    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

		    /**
		     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
		     * double precision number which isn't the result of a rounded unsafe integer.
		     *
		     * **Note:** This method is based on
		     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
		     * @example
		     *
		     * _.isSafeInteger(3);
		     * // => true
		     *
		     * _.isSafeInteger(Number.MIN_VALUE);
		     * // => false
		     *
		     * _.isSafeInteger(Infinity);
		     * // => false
		     *
		     * _.isSafeInteger('3');
		     * // => false
		     */
		    function isSafeInteger(value) {
		      return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
		    }

		    /**
		     * Checks if `value` is classified as a `Set` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
		     * @example
		     *
		     * _.isSet(new Set);
		     * // => true
		     *
		     * _.isSet(new WeakSet);
		     * // => false
		     */
		    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

		    /**
		     * Checks if `value` is classified as a `String` primitive or object.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
		     * @example
		     *
		     * _.isString('abc');
		     * // => true
		     *
		     * _.isString(1);
		     * // => false
		     */
		    function isString(value) {
		      return typeof value == 'string' ||
		        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
		    }

		    /**
		     * Checks if `value` is classified as a `Symbol` primitive or object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
		     * @example
		     *
		     * _.isSymbol(Symbol.iterator);
		     * // => true
		     *
		     * _.isSymbol('abc');
		     * // => false
		     */
		    function isSymbol(value) {
		      return typeof value == 'symbol' ||
		        (isObjectLike(value) && baseGetTag(value) == symbolTag);
		    }

		    /**
		     * Checks if `value` is classified as a typed array.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
		     * @example
		     *
		     * _.isTypedArray(new Uint8Array);
		     * // => true
		     *
		     * _.isTypedArray([]);
		     * // => false
		     */
		    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

		    /**
		     * Checks if `value` is `undefined`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
		     * @example
		     *
		     * _.isUndefined(void 0);
		     * // => true
		     *
		     * _.isUndefined(null);
		     * // => false
		     */
		    function isUndefined(value) {
		      return value === undefined$1;
		    }

		    /**
		     * Checks if `value` is classified as a `WeakMap` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
		     * @example
		     *
		     * _.isWeakMap(new WeakMap);
		     * // => true
		     *
		     * _.isWeakMap(new Map);
		     * // => false
		     */
		    function isWeakMap(value) {
		      return isObjectLike(value) && getTag(value) == weakMapTag;
		    }

		    /**
		     * Checks if `value` is classified as a `WeakSet` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
		     * @example
		     *
		     * _.isWeakSet(new WeakSet);
		     * // => true
		     *
		     * _.isWeakSet(new Set);
		     * // => false
		     */
		    function isWeakSet(value) {
		      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
		    }

		    /**
		     * Checks if `value` is less than `other`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.9.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is less than `other`,
		     *  else `false`.
		     * @see _.gt
		     * @example
		     *
		     * _.lt(1, 3);
		     * // => true
		     *
		     * _.lt(3, 3);
		     * // => false
		     *
		     * _.lt(3, 1);
		     * // => false
		     */
		    var lt = createRelationalOperation(baseLt);

		    /**
		     * Checks if `value` is less than or equal to `other`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.9.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is less than or equal to
		     *  `other`, else `false`.
		     * @see _.gte
		     * @example
		     *
		     * _.lte(1, 3);
		     * // => true
		     *
		     * _.lte(3, 3);
		     * // => true
		     *
		     * _.lte(3, 1);
		     * // => false
		     */
		    var lte = createRelationalOperation(function(value, other) {
		      return value <= other;
		    });

		    /**
		     * Converts `value` to an array.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {Array} Returns the converted array.
		     * @example
		     *
		     * _.toArray({ 'a': 1, 'b': 2 });
		     * // => [1, 2]
		     *
		     * _.toArray('abc');
		     * // => ['a', 'b', 'c']
		     *
		     * _.toArray(1);
		     * // => []
		     *
		     * _.toArray(null);
		     * // => []
		     */
		    function toArray(value) {
		      if (!value) {
		        return [];
		      }
		      if (isArrayLike(value)) {
		        return isString(value) ? stringToArray(value) : copyArray(value);
		      }
		      if (symIterator && value[symIterator]) {
		        return iteratorToArray(value[symIterator]());
		      }
		      var tag = getTag(value),
		          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

		      return func(value);
		    }

		    /**
		     * Converts `value` to a finite number.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.12.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {number} Returns the converted number.
		     * @example
		     *
		     * _.toFinite(3.2);
		     * // => 3.2
		     *
		     * _.toFinite(Number.MIN_VALUE);
		     * // => 5e-324
		     *
		     * _.toFinite(Infinity);
		     * // => 1.7976931348623157e+308
		     *
		     * _.toFinite('3.2');
		     * // => 3.2
		     */
		    function toFinite(value) {
		      if (!value) {
		        return value === 0 ? value : 0;
		      }
		      value = toNumber(value);
		      if (value === INFINITY || value === -INFINITY) {
		        var sign = (value < 0 ? -1 : 1);
		        return sign * MAX_INTEGER;
		      }
		      return value === value ? value : 0;
		    }

		    /**
		     * Converts `value` to an integer.
		     *
		     * **Note:** This method is loosely based on
		     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {number} Returns the converted integer.
		     * @example
		     *
		     * _.toInteger(3.2);
		     * // => 3
		     *
		     * _.toInteger(Number.MIN_VALUE);
		     * // => 0
		     *
		     * _.toInteger(Infinity);
		     * // => 1.7976931348623157e+308
		     *
		     * _.toInteger('3.2');
		     * // => 3
		     */
		    function toInteger(value) {
		      var result = toFinite(value),
		          remainder = result % 1;

		      return result === result ? (remainder ? result - remainder : result) : 0;
		    }

		    /**
		     * Converts `value` to an integer suitable for use as the length of an
		     * array-like object.
		     *
		     * **Note:** This method is based on
		     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {number} Returns the converted integer.
		     * @example
		     *
		     * _.toLength(3.2);
		     * // => 3
		     *
		     * _.toLength(Number.MIN_VALUE);
		     * // => 0
		     *
		     * _.toLength(Infinity);
		     * // => 4294967295
		     *
		     * _.toLength('3.2');
		     * // => 3
		     */
		    function toLength(value) {
		      return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
		    }

		    /**
		     * Converts `value` to a number.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to process.
		     * @returns {number} Returns the number.
		     * @example
		     *
		     * _.toNumber(3.2);
		     * // => 3.2
		     *
		     * _.toNumber(Number.MIN_VALUE);
		     * // => 5e-324
		     *
		     * _.toNumber(Infinity);
		     * // => Infinity
		     *
		     * _.toNumber('3.2');
		     * // => 3.2
		     */
		    function toNumber(value) {
		      if (typeof value == 'number') {
		        return value;
		      }
		      if (isSymbol(value)) {
		        return NAN;
		      }
		      if (isObject(value)) {
		        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
		        value = isObject(other) ? (other + '') : other;
		      }
		      if (typeof value != 'string') {
		        return value === 0 ? value : +value;
		      }
		      value = baseTrim(value);
		      var isBinary = reIsBinary.test(value);
		      return (isBinary || reIsOctal.test(value))
		        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
		        : (reIsBadHex.test(value) ? NAN : +value);
		    }

		    /**
		     * Converts `value` to a plain object flattening inherited enumerable string
		     * keyed properties of `value` to own properties of the plain object.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {Object} Returns the converted plain object.
		     * @example
		     *
		     * function Foo() {
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.assign({ 'a': 1 }, new Foo);
		     * // => { 'a': 1, 'b': 2 }
		     *
		     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
		     * // => { 'a': 1, 'b': 2, 'c': 3 }
		     */
		    function toPlainObject(value) {
		      return copyObject(value, keysIn(value));
		    }

		    /**
		     * Converts `value` to a safe integer. A safe integer can be compared and
		     * represented correctly.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {number} Returns the converted integer.
		     * @example
		     *
		     * _.toSafeInteger(3.2);
		     * // => 3
		     *
		     * _.toSafeInteger(Number.MIN_VALUE);
		     * // => 0
		     *
		     * _.toSafeInteger(Infinity);
		     * // => 9007199254740991
		     *
		     * _.toSafeInteger('3.2');
		     * // => 3
		     */
		    function toSafeInteger(value) {
		      return value
		        ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
		        : (value === 0 ? value : 0);
		    }

		    /**
		     * Converts `value` to a string. An empty string is returned for `null`
		     * and `undefined` values. The sign of `-0` is preserved.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {string} Returns the converted string.
		     * @example
		     *
		     * _.toString(null);
		     * // => ''
		     *
		     * _.toString(-0);
		     * // => '-0'
		     *
		     * _.toString([1, 2, 3]);
		     * // => '1,2,3'
		     */
		    function toString(value) {
		      return value == null ? '' : baseToString(value);
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Assigns own enumerable string keyed properties of source objects to the
		     * destination object. Source objects are applied from left to right.
		     * Subsequent sources overwrite property assignments of previous sources.
		     *
		     * **Note:** This method mutates `object` and is loosely based on
		     * [`Object.assign`](https://mdn.io/Object/assign).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.10.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @see _.assignIn
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     * }
		     *
		     * function Bar() {
		     *   this.c = 3;
		     * }
		     *
		     * Foo.prototype.b = 2;
		     * Bar.prototype.d = 4;
		     *
		     * _.assign({ 'a': 0 }, new Foo, new Bar);
		     * // => { 'a': 1, 'c': 3 }
		     */
		    var assign = createAssigner(function(object, source) {
		      if (isPrototype(source) || isArrayLike(source)) {
		        copyObject(source, keys(source), object);
		        return;
		      }
		      for (var key in source) {
		        if (hasOwnProperty.call(source, key)) {
		          assignValue(object, key, source[key]);
		        }
		      }
		    });

		    /**
		     * This method is like `_.assign` except that it iterates over own and
		     * inherited source properties.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @alias extend
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @see _.assign
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     * }
		     *
		     * function Bar() {
		     *   this.c = 3;
		     * }
		     *
		     * Foo.prototype.b = 2;
		     * Bar.prototype.d = 4;
		     *
		     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
		     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
		     */
		    var assignIn = createAssigner(function(object, source) {
		      copyObject(source, keysIn(source), object);
		    });

		    /**
		     * This method is like `_.assignIn` except that it accepts `customizer`
		     * which is invoked to produce the assigned values. If `customizer` returns
		     * `undefined`, assignment is handled by the method instead. The `customizer`
		     * is invoked with five arguments: (objValue, srcValue, key, object, source).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @alias extendWith
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} sources The source objects.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @see _.assignWith
		     * @example
		     *
		     * function customizer(objValue, srcValue) {
		     *   return _.isUndefined(objValue) ? srcValue : objValue;
		     * }
		     *
		     * var defaults = _.partialRight(_.assignInWith, customizer);
		     *
		     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
		     * // => { 'a': 1, 'b': 2 }
		     */
		    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
		      copyObject(source, keysIn(source), object, customizer);
		    });

		    /**
		     * This method is like `_.assign` except that it accepts `customizer`
		     * which is invoked to produce the assigned values. If `customizer` returns
		     * `undefined`, assignment is handled by the method instead. The `customizer`
		     * is invoked with five arguments: (objValue, srcValue, key, object, source).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} sources The source objects.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @see _.assignInWith
		     * @example
		     *
		     * function customizer(objValue, srcValue) {
		     *   return _.isUndefined(objValue) ? srcValue : objValue;
		     * }
		     *
		     * var defaults = _.partialRight(_.assignWith, customizer);
		     *
		     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
		     * // => { 'a': 1, 'b': 2 }
		     */
		    var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
		      copyObject(source, keys(source), object, customizer);
		    });

		    /**
		     * Creates an array of values corresponding to `paths` of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.0.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {...(string|string[])} [paths] The property paths to pick.
		     * @returns {Array} Returns the picked values.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
		     *
		     * _.at(object, ['a[0].b.c', 'a[1]']);
		     * // => [3, 4]
		     */
		    var at = flatRest(baseAt);

		    /**
		     * Creates an object that inherits from the `prototype` object. If a
		     * `properties` object is given, its own enumerable string keyed properties
		     * are assigned to the created object.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.3.0
		     * @category Object
		     * @param {Object} prototype The object to inherit from.
		     * @param {Object} [properties] The properties to assign to the object.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * function Shape() {
		     *   this.x = 0;
		     *   this.y = 0;
		     * }
		     *
		     * function Circle() {
		     *   Shape.call(this);
		     * }
		     *
		     * Circle.prototype = _.create(Shape.prototype, {
		     *   'constructor': Circle
		     * });
		     *
		     * var circle = new Circle;
		     * circle instanceof Circle;
		     * // => true
		     *
		     * circle instanceof Shape;
		     * // => true
		     */
		    function create(prototype, properties) {
		      var result = baseCreate(prototype);
		      return properties == null ? result : baseAssign(result, properties);
		    }

		    /**
		     * Assigns own and inherited enumerable string keyed properties of source
		     * objects to the destination object for all destination properties that
		     * resolve to `undefined`. Source objects are applied from left to right.
		     * Once a property is set, additional values of the same property are ignored.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @see _.defaultsDeep
		     * @example
		     *
		     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
		     * // => { 'a': 1, 'b': 2 }
		     */
		    var defaults = baseRest(function(object, sources) {
		      object = Object(object);

		      var index = -1;
		      var length = sources.length;
		      var guard = length > 2 ? sources[2] : undefined$1;

		      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
		        length = 1;
		      }

		      while (++index < length) {
		        var source = sources[index];
		        var props = keysIn(source);
		        var propsIndex = -1;
		        var propsLength = props.length;

		        while (++propsIndex < propsLength) {
		          var key = props[propsIndex];
		          var value = object[key];

		          if (value === undefined$1 ||
		              (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
		            object[key] = source[key];
		          }
		        }
		      }

		      return object;
		    });

		    /**
		     * This method is like `_.defaults` except that it recursively assigns
		     * default properties.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.10.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @see _.defaults
		     * @example
		     *
		     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
		     * // => { 'a': { 'b': 2, 'c': 3 } }
		     */
		    var defaultsDeep = baseRest(function(args) {
		      args.push(undefined$1, customDefaultsMerge);
		      return apply(mergeWith, undefined$1, args);
		    });

		    /**
		     * This method is like `_.find` except that it returns the key of the first
		     * element `predicate` returns truthy for instead of the element itself.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.1.0
		     * @category Object
		     * @param {Object} object The object to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {string|undefined} Returns the key of the matched element,
		     *  else `undefined`.
		     * @example
		     *
		     * var users = {
		     *   'barney':  { 'age': 36, 'active': true },
		     *   'fred':    { 'age': 40, 'active': false },
		     *   'pebbles': { 'age': 1,  'active': true }
		     * };
		     *
		     * _.findKey(users, function(o) { return o.age < 40; });
		     * // => 'barney' (iteration order is not guaranteed)
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.findKey(users, { 'age': 1, 'active': true });
		     * // => 'pebbles'
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.findKey(users, ['active', false]);
		     * // => 'fred'
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.findKey(users, 'active');
		     * // => 'barney'
		     */
		    function findKey(object, predicate) {
		      return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
		    }

		    /**
		     * This method is like `_.findKey` except that it iterates over elements of
		     * a collection in the opposite order.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Object
		     * @param {Object} object The object to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {string|undefined} Returns the key of the matched element,
		     *  else `undefined`.
		     * @example
		     *
		     * var users = {
		     *   'barney':  { 'age': 36, 'active': true },
		     *   'fred':    { 'age': 40, 'active': false },
		     *   'pebbles': { 'age': 1,  'active': true }
		     * };
		     *
		     * _.findLastKey(users, function(o) { return o.age < 40; });
		     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.findLastKey(users, { 'age': 36, 'active': true });
		     * // => 'barney'
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.findLastKey(users, ['active', false]);
		     * // => 'fred'
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.findLastKey(users, 'active');
		     * // => 'pebbles'
		     */
		    function findLastKey(object, predicate) {
		      return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
		    }

		    /**
		     * Iterates over own and inherited enumerable string keyed properties of an
		     * object and invokes `iteratee` for each property. The iteratee is invoked
		     * with three arguments: (value, key, object). Iteratee functions may exit
		     * iteration early by explicitly returning `false`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.3.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     * @see _.forInRight
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.forIn(new Foo, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
		     */
		    function forIn(object, iteratee) {
		      return object == null
		        ? object
		        : baseFor(object, getIteratee(iteratee, 3), keysIn);
		    }

		    /**
		     * This method is like `_.forIn` except that it iterates over properties of
		     * `object` in the opposite order.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     * @see _.forIn
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.forInRight(new Foo, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
		     */
		    function forInRight(object, iteratee) {
		      return object == null
		        ? object
		        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
		    }

		    /**
		     * Iterates over own enumerable string keyed properties of an object and
		     * invokes `iteratee` for each property. The iteratee is invoked with three
		     * arguments: (value, key, object). Iteratee functions may exit iteration
		     * early by explicitly returning `false`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.3.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     * @see _.forOwnRight
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.forOwn(new Foo, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
		     */
		    function forOwn(object, iteratee) {
		      return object && baseForOwn(object, getIteratee(iteratee, 3));
		    }

		    /**
		     * This method is like `_.forOwn` except that it iterates over properties of
		     * `object` in the opposite order.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     * @see _.forOwn
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.forOwnRight(new Foo, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
		     */
		    function forOwnRight(object, iteratee) {
		      return object && baseForOwnRight(object, getIteratee(iteratee, 3));
		    }

		    /**
		     * Creates an array of function property names from own enumerable properties
		     * of `object`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to inspect.
		     * @returns {Array} Returns the function names.
		     * @see _.functionsIn
		     * @example
		     *
		     * function Foo() {
		     *   this.a = _.constant('a');
		     *   this.b = _.constant('b');
		     * }
		     *
		     * Foo.prototype.c = _.constant('c');
		     *
		     * _.functions(new Foo);
		     * // => ['a', 'b']
		     */
		    function functions(object) {
		      return object == null ? [] : baseFunctions(object, keys(object));
		    }

		    /**
		     * Creates an array of function property names from own and inherited
		     * enumerable properties of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to inspect.
		     * @returns {Array} Returns the function names.
		     * @see _.functions
		     * @example
		     *
		     * function Foo() {
		     *   this.a = _.constant('a');
		     *   this.b = _.constant('b');
		     * }
		     *
		     * Foo.prototype.c = _.constant('c');
		     *
		     * _.functionsIn(new Foo);
		     * // => ['a', 'b', 'c']
		     */
		    function functionsIn(object) {
		      return object == null ? [] : baseFunctions(object, keysIn(object));
		    }

		    /**
		     * Gets the value at `path` of `object`. If the resolved value is
		     * `undefined`, the `defaultValue` is returned in its place.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.7.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the property to get.
		     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
		     * @returns {*} Returns the resolved value.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
		     *
		     * _.get(object, 'a[0].b.c');
		     * // => 3
		     *
		     * _.get(object, ['a', '0', 'b', 'c']);
		     * // => 3
		     *
		     * _.get(object, 'a.b.c', 'default');
		     * // => 'default'
		     */
		    function get(object, path, defaultValue) {
		      var result = object == null ? undefined$1 : baseGet(object, path);
		      return result === undefined$1 ? defaultValue : result;
		    }

		    /**
		     * Checks if `path` is a direct property of `object`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path to check.
		     * @returns {boolean} Returns `true` if `path` exists, else `false`.
		     * @example
		     *
		     * var object = { 'a': { 'b': 2 } };
		     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
		     *
		     * _.has(object, 'a');
		     * // => true
		     *
		     * _.has(object, 'a.b');
		     * // => true
		     *
		     * _.has(object, ['a', 'b']);
		     * // => true
		     *
		     * _.has(other, 'a');
		     * // => false
		     */
		    function has(object, path) {
		      return object != null && hasPath(object, path, baseHas);
		    }

		    /**
		     * Checks if `path` is a direct or inherited property of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path to check.
		     * @returns {boolean} Returns `true` if `path` exists, else `false`.
		     * @example
		     *
		     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
		     *
		     * _.hasIn(object, 'a');
		     * // => true
		     *
		     * _.hasIn(object, 'a.b');
		     * // => true
		     *
		     * _.hasIn(object, ['a', 'b']);
		     * // => true
		     *
		     * _.hasIn(object, 'b');
		     * // => false
		     */
		    function hasIn(object, path) {
		      return object != null && hasPath(object, path, baseHasIn);
		    }

		    /**
		     * Creates an object composed of the inverted keys and values of `object`.
		     * If `object` contains duplicate values, subsequent values overwrite
		     * property assignments of previous values.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.7.0
		     * @category Object
		     * @param {Object} object The object to invert.
		     * @returns {Object} Returns the new inverted object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2, 'c': 1 };
		     *
		     * _.invert(object);
		     * // => { '1': 'c', '2': 'b' }
		     */
		    var invert = createInverter(function(result, value, key) {
		      if (value != null &&
		          typeof value.toString != 'function') {
		        value = nativeObjectToString.call(value);
		      }

		      result[value] = key;
		    }, constant(identity));

		    /**
		     * This method is like `_.invert` except that the inverted object is generated
		     * from the results of running each element of `object` thru `iteratee`. The
		     * corresponding inverted value of each inverted key is an array of keys
		     * responsible for generating the inverted value. The iteratee is invoked
		     * with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.1.0
		     * @category Object
		     * @param {Object} object The object to invert.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Object} Returns the new inverted object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2, 'c': 1 };
		     *
		     * _.invertBy(object);
		     * // => { '1': ['a', 'c'], '2': ['b'] }
		     *
		     * _.invertBy(object, function(value) {
		     *   return 'group' + value;
		     * });
		     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
		     */
		    var invertBy = createInverter(function(result, value, key) {
		      if (value != null &&
		          typeof value.toString != 'function') {
		        value = nativeObjectToString.call(value);
		      }

		      if (hasOwnProperty.call(result, value)) {
		        result[value].push(key);
		      } else {
		        result[value] = [key];
		      }
		    }, getIteratee);

		    /**
		     * Invokes the method at `path` of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the method to invoke.
		     * @param {...*} [args] The arguments to invoke the method with.
		     * @returns {*} Returns the result of the invoked method.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
		     *
		     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
		     * // => [2, 3]
		     */
		    var invoke = baseRest(baseInvoke);

		    /**
		     * Creates an array of the own enumerable property names of `object`.
		     *
		     * **Note:** Non-object values are coerced to objects. See the
		     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
		     * for more details.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.keys(new Foo);
		     * // => ['a', 'b'] (iteration order is not guaranteed)
		     *
		     * _.keys('hi');
		     * // => ['0', '1']
		     */
		    function keys(object) {
		      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
		    }

		    /**
		     * Creates an array of the own and inherited enumerable property names of `object`.
		     *
		     * **Note:** Non-object values are coerced to objects.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.keysIn(new Foo);
		     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
		     */
		    function keysIn(object) {
		      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
		    }

		    /**
		     * The opposite of `_.mapValues`; this method creates an object with the
		     * same values as `object` and keys generated by running each own enumerable
		     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
		     * with three arguments: (value, key, object).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.8.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns the new mapped object.
		     * @see _.mapValues
		     * @example
		     *
		     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
		     *   return key + value;
		     * });
		     * // => { 'a1': 1, 'b2': 2 }
		     */
		    function mapKeys(object, iteratee) {
		      var result = {};
		      iteratee = getIteratee(iteratee, 3);

		      baseForOwn(object, function(value, key, object) {
		        baseAssignValue(result, iteratee(value, key, object), value);
		      });
		      return result;
		    }

		    /**
		     * Creates an object with the same keys as `object` and values generated
		     * by running each own enumerable string keyed property of `object` thru
		     * `iteratee`. The iteratee is invoked with three arguments:
		     * (value, key, object).
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns the new mapped object.
		     * @see _.mapKeys
		     * @example
		     *
		     * var users = {
		     *   'fred':    { 'user': 'fred',    'age': 40 },
		     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
		     * };
		     *
		     * _.mapValues(users, function(o) { return o.age; });
		     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.mapValues(users, 'age');
		     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
		     */
		    function mapValues(object, iteratee) {
		      var result = {};
		      iteratee = getIteratee(iteratee, 3);

		      baseForOwn(object, function(value, key, object) {
		        baseAssignValue(result, key, iteratee(value, key, object));
		      });
		      return result;
		    }

		    /**
		     * This method is like `_.assign` except that it recursively merges own and
		     * inherited enumerable string keyed properties of source objects into the
		     * destination object. Source properties that resolve to `undefined` are
		     * skipped if a destination value exists. Array and plain object properties
		     * are merged recursively. Other objects and value types are overridden by
		     * assignment. Source objects are applied from left to right. Subsequent
		     * sources overwrite property assignments of previous sources.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.5.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = {
		     *   'a': [{ 'b': 2 }, { 'd': 4 }]
		     * };
		     *
		     * var other = {
		     *   'a': [{ 'c': 3 }, { 'e': 5 }]
		     * };
		     *
		     * _.merge(object, other);
		     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
		     */
		    var merge = createAssigner(function(object, source, srcIndex) {
		      baseMerge(object, source, srcIndex);
		    });

		    /**
		     * This method is like `_.merge` except that it accepts `customizer` which
		     * is invoked to produce the merged values of the destination and source
		     * properties. If `customizer` returns `undefined`, merging is handled by the
		     * method instead. The `customizer` is invoked with six arguments:
		     * (objValue, srcValue, key, object, source, stack).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} sources The source objects.
		     * @param {Function} customizer The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * function customizer(objValue, srcValue) {
		     *   if (_.isArray(objValue)) {
		     *     return objValue.concat(srcValue);
		     *   }
		     * }
		     *
		     * var object = { 'a': [1], 'b': [2] };
		     * var other = { 'a': [3], 'b': [4] };
		     *
		     * _.mergeWith(object, other, customizer);
		     * // => { 'a': [1, 3], 'b': [2, 4] }
		     */
		    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
		      baseMerge(object, source, srcIndex, customizer);
		    });

		    /**
		     * The opposite of `_.pick`; this method creates an object composed of the
		     * own and inherited enumerable property paths of `object` that are not omitted.
		     *
		     * **Note:** This method is considerably slower than `_.pick`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The source object.
		     * @param {...(string|string[])} [paths] The property paths to omit.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': '2', 'c': 3 };
		     *
		     * _.omit(object, ['a', 'c']);
		     * // => { 'b': '2' }
		     */
		    var omit = flatRest(function(object, paths) {
		      var result = {};
		      if (object == null) {
		        return result;
		      }
		      var isDeep = false;
		      paths = arrayMap(paths, function(path) {
		        path = castPath(path, object);
		        isDeep || (isDeep = path.length > 1);
		        return path;
		      });
		      copyObject(object, getAllKeysIn(object), result);
		      if (isDeep) {
		        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
		      }
		      var length = paths.length;
		      while (length--) {
		        baseUnset(result, paths[length]);
		      }
		      return result;
		    });

		    /**
		     * The opposite of `_.pickBy`; this method creates an object composed of
		     * the own and inherited enumerable string keyed properties of `object` that
		     * `predicate` doesn't return truthy for. The predicate is invoked with two
		     * arguments: (value, key).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The source object.
		     * @param {Function} [predicate=_.identity] The function invoked per property.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': '2', 'c': 3 };
		     *
		     * _.omitBy(object, _.isNumber);
		     * // => { 'b': '2' }
		     */
		    function omitBy(object, predicate) {
		      return pickBy(object, negate(getIteratee(predicate)));
		    }

		    /**
		     * Creates an object composed of the picked `object` properties.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The source object.
		     * @param {...(string|string[])} [paths] The property paths to pick.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': '2', 'c': 3 };
		     *
		     * _.pick(object, ['a', 'c']);
		     * // => { 'a': 1, 'c': 3 }
		     */
		    var pick = flatRest(function(object, paths) {
		      return object == null ? {} : basePick(object, paths);
		    });

		    /**
		     * Creates an object composed of the `object` properties `predicate` returns
		     * truthy for. The predicate is invoked with two arguments: (value, key).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The source object.
		     * @param {Function} [predicate=_.identity] The function invoked per property.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': '2', 'c': 3 };
		     *
		     * _.pickBy(object, _.isNumber);
		     * // => { 'a': 1, 'c': 3 }
		     */
		    function pickBy(object, predicate) {
		      if (object == null) {
		        return {};
		      }
		      var props = arrayMap(getAllKeysIn(object), function(prop) {
		        return [prop];
		      });
		      predicate = getIteratee(predicate);
		      return basePickBy(object, props, function(value, path) {
		        return predicate(value, path[0]);
		      });
		    }

		    /**
		     * This method is like `_.get` except that if the resolved value is a
		     * function it's invoked with the `this` binding of its parent object and
		     * its result is returned.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the property to resolve.
		     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
		     * @returns {*} Returns the resolved value.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
		     *
		     * _.result(object, 'a[0].b.c1');
		     * // => 3
		     *
		     * _.result(object, 'a[0].b.c2');
		     * // => 4
		     *
		     * _.result(object, 'a[0].b.c3', 'default');
		     * // => 'default'
		     *
		     * _.result(object, 'a[0].b.c3', _.constant('default'));
		     * // => 'default'
		     */
		    function result(object, path, defaultValue) {
		      path = castPath(path, object);

		      var index = -1,
		          length = path.length;

		      // Ensure the loop is entered when path is empty.
		      if (!length) {
		        length = 1;
		        object = undefined$1;
		      }
		      while (++index < length) {
		        var value = object == null ? undefined$1 : object[toKey(path[index])];
		        if (value === undefined$1) {
		          index = length;
		          value = defaultValue;
		        }
		        object = isFunction(value) ? value.call(object) : value;
		      }
		      return object;
		    }

		    /**
		     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
		     * it's created. Arrays are created for missing index properties while objects
		     * are created for all other missing properties. Use `_.setWith` to customize
		     * `path` creation.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.7.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
		     *
		     * _.set(object, 'a[0].b.c', 4);
		     * console.log(object.a[0].b.c);
		     * // => 4
		     *
		     * _.set(object, ['x', '0', 'y', 'z'], 5);
		     * console.log(object.x[0].y.z);
		     * // => 5
		     */
		    function set(object, path, value) {
		      return object == null ? object : baseSet(object, path, value);
		    }

		    /**
		     * This method is like `_.set` except that it accepts `customizer` which is
		     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
		     * path creation is handled by the method instead. The `customizer` is invoked
		     * with three arguments: (nsValue, key, nsObject).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {*} value The value to set.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = {};
		     *
		     * _.setWith(object, '[0][1]', 'a', Object);
		     * // => { '0': { '1': 'a' } }
		     */
		    function setWith(object, path, value, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined$1;
		      return object == null ? object : baseSet(object, path, value, customizer);
		    }

		    /**
		     * Creates an array of own enumerable string keyed-value pairs for `object`
		     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
		     * entries are returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @alias entries
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the key-value pairs.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.toPairs(new Foo);
		     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
		     */
		    var toPairs = createToPairs(keys);

		    /**
		     * Creates an array of own and inherited enumerable string keyed-value pairs
		     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
		     * or set, its entries are returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @alias entriesIn
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the key-value pairs.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.toPairsIn(new Foo);
		     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
		     */
		    var toPairsIn = createToPairs(keysIn);

		    /**
		     * An alternative to `_.reduce`; this method transforms `object` to a new
		     * `accumulator` object which is the result of running each of its own
		     * enumerable string keyed properties thru `iteratee`, with each invocation
		     * potentially mutating the `accumulator` object. If `accumulator` is not
		     * provided, a new object with the same `[[Prototype]]` will be used. The
		     * iteratee is invoked with four arguments: (accumulator, value, key, object).
		     * Iteratee functions may exit iteration early by explicitly returning `false`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.3.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @param {*} [accumulator] The custom accumulator value.
		     * @returns {*} Returns the accumulated value.
		     * @example
		     *
		     * _.transform([2, 3, 4], function(result, n) {
		     *   result.push(n *= n);
		     *   return n % 2 == 0;
		     * }, []);
		     * // => [4, 9]
		     *
		     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
		     *   (result[value] || (result[value] = [])).push(key);
		     * }, {});
		     * // => { '1': ['a', 'c'], '2': ['b'] }
		     */
		    function transform(object, iteratee, accumulator) {
		      var isArr = isArray(object),
		          isArrLike = isArr || isBuffer(object) || isTypedArray(object);

		      iteratee = getIteratee(iteratee, 4);
		      if (accumulator == null) {
		        var Ctor = object && object.constructor;
		        if (isArrLike) {
		          accumulator = isArr ? new Ctor : [];
		        }
		        else if (isObject(object)) {
		          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
		        }
		        else {
		          accumulator = {};
		        }
		      }
		      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
		        return iteratee(accumulator, value, index, object);
		      });
		      return accumulator;
		    }

		    /**
		     * Removes the property at `path` of `object`.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to unset.
		     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
		     * _.unset(object, 'a[0].b.c');
		     * // => true
		     *
		     * console.log(object);
		     * // => { 'a': [{ 'b': {} }] };
		     *
		     * _.unset(object, ['a', '0', 'b', 'c']);
		     * // => true
		     *
		     * console.log(object);
		     * // => { 'a': [{ 'b': {} }] };
		     */
		    function unset(object, path) {
		      return object == null ? true : baseUnset(object, path);
		    }

		    /**
		     * This method is like `_.set` except that accepts `updater` to produce the
		     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
		     * is invoked with one argument: (value).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.6.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {Function} updater The function to produce the updated value.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
		     *
		     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
		     * console.log(object.a[0].b.c);
		     * // => 9
		     *
		     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
		     * console.log(object.x[0].y.z);
		     * // => 0
		     */
		    function update(object, path, updater) {
		      return object == null ? object : baseUpdate(object, path, castFunction(updater));
		    }

		    /**
		     * This method is like `_.update` except that it accepts `customizer` which is
		     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
		     * path creation is handled by the method instead. The `customizer` is invoked
		     * with three arguments: (nsValue, key, nsObject).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.6.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {Function} updater The function to produce the updated value.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = {};
		     *
		     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
		     * // => { '0': { '1': 'a' } }
		     */
		    function updateWith(object, path, updater, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined$1;
		      return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
		    }

		    /**
		     * Creates an array of the own enumerable string keyed property values of `object`.
		     *
		     * **Note:** Non-object values are coerced to objects.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property values.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.values(new Foo);
		     * // => [1, 2] (iteration order is not guaranteed)
		     *
		     * _.values('hi');
		     * // => ['h', 'i']
		     */
		    function values(object) {
		      return object == null ? [] : baseValues(object, keys(object));
		    }

		    /**
		     * Creates an array of the own and inherited enumerable string keyed property
		     * values of `object`.
		     *
		     * **Note:** Non-object values are coerced to objects.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property values.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.valuesIn(new Foo);
		     * // => [1, 2, 3] (iteration order is not guaranteed)
		     */
		    function valuesIn(object) {
		      return object == null ? [] : baseValues(object, keysIn(object));
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Clamps `number` within the inclusive `lower` and `upper` bounds.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Number
		     * @param {number} number The number to clamp.
		     * @param {number} [lower] The lower bound.
		     * @param {number} upper The upper bound.
		     * @returns {number} Returns the clamped number.
		     * @example
		     *
		     * _.clamp(-10, -5, 5);
		     * // => -5
		     *
		     * _.clamp(10, -5, 5);
		     * // => 5
		     */
		    function clamp(number, lower, upper) {
		      if (upper === undefined$1) {
		        upper = lower;
		        lower = undefined$1;
		      }
		      if (upper !== undefined$1) {
		        upper = toNumber(upper);
		        upper = upper === upper ? upper : 0;
		      }
		      if (lower !== undefined$1) {
		        lower = toNumber(lower);
		        lower = lower === lower ? lower : 0;
		      }
		      return baseClamp(toNumber(number), lower, upper);
		    }

		    /**
		     * Checks if `n` is between `start` and up to, but not including, `end`. If
		     * `end` is not specified, it's set to `start` with `start` then set to `0`.
		     * If `start` is greater than `end` the params are swapped to support
		     * negative ranges.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.3.0
		     * @category Number
		     * @param {number} number The number to check.
		     * @param {number} [start=0] The start of the range.
		     * @param {number} end The end of the range.
		     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
		     * @see _.range, _.rangeRight
		     * @example
		     *
		     * _.inRange(3, 2, 4);
		     * // => true
		     *
		     * _.inRange(4, 8);
		     * // => true
		     *
		     * _.inRange(4, 2);
		     * // => false
		     *
		     * _.inRange(2, 2);
		     * // => false
		     *
		     * _.inRange(1.2, 2);
		     * // => true
		     *
		     * _.inRange(5.2, 4);
		     * // => false
		     *
		     * _.inRange(-3, -2, -6);
		     * // => true
		     */
		    function inRange(number, start, end) {
		      start = toFinite(start);
		      if (end === undefined$1) {
		        end = start;
		        start = 0;
		      } else {
		        end = toFinite(end);
		      }
		      number = toNumber(number);
		      return baseInRange(number, start, end);
		    }

		    /**
		     * Produces a random number between the inclusive `lower` and `upper` bounds.
		     * If only one argument is provided a number between `0` and the given number
		     * is returned. If `floating` is `true`, or either `lower` or `upper` are
		     * floats, a floating-point number is returned instead of an integer.
		     *
		     * **Note:** JavaScript follows the IEEE-754 standard for resolving
		     * floating-point values which can produce unexpected results.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.7.0
		     * @category Number
		     * @param {number} [lower=0] The lower bound.
		     * @param {number} [upper=1] The upper bound.
		     * @param {boolean} [floating] Specify returning a floating-point number.
		     * @returns {number} Returns the random number.
		     * @example
		     *
		     * _.random(0, 5);
		     * // => an integer between 0 and 5
		     *
		     * _.random(5);
		     * // => also an integer between 0 and 5
		     *
		     * _.random(5, true);
		     * // => a floating-point number between 0 and 5
		     *
		     * _.random(1.2, 5.2);
		     * // => a floating-point number between 1.2 and 5.2
		     */
		    function random(lower, upper, floating) {
		      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
		        upper = floating = undefined$1;
		      }
		      if (floating === undefined$1) {
		        if (typeof upper == 'boolean') {
		          floating = upper;
		          upper = undefined$1;
		        }
		        else if (typeof lower == 'boolean') {
		          floating = lower;
		          lower = undefined$1;
		        }
		      }
		      if (lower === undefined$1 && upper === undefined$1) {
		        lower = 0;
		        upper = 1;
		      }
		      else {
		        lower = toFinite(lower);
		        if (upper === undefined$1) {
		          upper = lower;
		          lower = 0;
		        } else {
		          upper = toFinite(upper);
		        }
		      }
		      if (lower > upper) {
		        var temp = lower;
		        lower = upper;
		        upper = temp;
		      }
		      if (floating || lower % 1 || upper % 1) {
		        var rand = nativeRandom();
		        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
		      }
		      return baseRandom(lower, upper);
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the camel cased string.
		     * @example
		     *
		     * _.camelCase('Foo Bar');
		     * // => 'fooBar'
		     *
		     * _.camelCase('--foo-bar--');
		     * // => 'fooBar'
		     *
		     * _.camelCase('__FOO_BAR__');
		     * // => 'fooBar'
		     */
		    var camelCase = createCompounder(function(result, word, index) {
		      word = word.toLowerCase();
		      return result + (index ? capitalize(word) : word);
		    });

		    /**
		     * Converts the first character of `string` to upper case and the remaining
		     * to lower case.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to capitalize.
		     * @returns {string} Returns the capitalized string.
		     * @example
		     *
		     * _.capitalize('FRED');
		     * // => 'Fred'
		     */
		    function capitalize(string) {
		      return upperFirst(toString(string).toLowerCase());
		    }

		    /**
		     * Deburrs `string` by converting
		     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
		     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
		     * letters to basic Latin letters and removing
		     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to deburr.
		     * @returns {string} Returns the deburred string.
		     * @example
		     *
		     * _.deburr('déjà vu');
		     * // => 'deja vu'
		     */
		    function deburr(string) {
		      string = toString(string);
		      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
		    }

		    /**
		     * Checks if `string` ends with the given target string.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to inspect.
		     * @param {string} [target] The string to search for.
		     * @param {number} [position=string.length] The position to search up to.
		     * @returns {boolean} Returns `true` if `string` ends with `target`,
		     *  else `false`.
		     * @example
		     *
		     * _.endsWith('abc', 'c');
		     * // => true
		     *
		     * _.endsWith('abc', 'b');
		     * // => false
		     *
		     * _.endsWith('abc', 'b', 2);
		     * // => true
		     */
		    function endsWith(string, target, position) {
		      string = toString(string);
		      target = baseToString(target);

		      var length = string.length;
		      position = position === undefined$1
		        ? length
		        : baseClamp(toInteger(position), 0, length);

		      var end = position;
		      position -= target.length;
		      return position >= 0 && string.slice(position, end) == target;
		    }

		    /**
		     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
		     * corresponding HTML entities.
		     *
		     * **Note:** No other characters are escaped. To escape additional
		     * characters use a third-party library like [_he_](https://mths.be/he).
		     *
		     * Though the ">" character is escaped for symmetry, characters like
		     * ">" and "/" don't need escaping in HTML and have no special meaning
		     * unless they're part of a tag or unquoted attribute value. See
		     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
		     * (under "semi-related fun fact") for more details.
		     *
		     * When working with HTML you should always
		     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
		     * XSS vectors.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category String
		     * @param {string} [string=''] The string to escape.
		     * @returns {string} Returns the escaped string.
		     * @example
		     *
		     * _.escape('fred, barney, & pebbles');
		     * // => 'fred, barney, &amp; pebbles'
		     */
		    function escape(string) {
		      string = toString(string);
		      return (string && reHasUnescapedHtml.test(string))
		        ? string.replace(reUnescapedHtml, escapeHtmlChar)
		        : string;
		    }

		    /**
		     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
		     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to escape.
		     * @returns {string} Returns the escaped string.
		     * @example
		     *
		     * _.escapeRegExp('[lodash](https://lodash.com/)');
		     * // => '\[lodash\]\(https://lodash\.com/\)'
		     */
		    function escapeRegExp(string) {
		      string = toString(string);
		      return (string && reHasRegExpChar.test(string))
		        ? string.replace(reRegExpChar, '\\$&')
		        : string;
		    }

		    /**
		     * Converts `string` to
		     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the kebab cased string.
		     * @example
		     *
		     * _.kebabCase('Foo Bar');
		     * // => 'foo-bar'
		     *
		     * _.kebabCase('fooBar');
		     * // => 'foo-bar'
		     *
		     * _.kebabCase('__FOO_BAR__');
		     * // => 'foo-bar'
		     */
		    var kebabCase = createCompounder(function(result, word, index) {
		      return result + (index ? '-' : '') + word.toLowerCase();
		    });

		    /**
		     * Converts `string`, as space separated words, to lower case.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the lower cased string.
		     * @example
		     *
		     * _.lowerCase('--Foo-Bar--');
		     * // => 'foo bar'
		     *
		     * _.lowerCase('fooBar');
		     * // => 'foo bar'
		     *
		     * _.lowerCase('__FOO_BAR__');
		     * // => 'foo bar'
		     */
		    var lowerCase = createCompounder(function(result, word, index) {
		      return result + (index ? ' ' : '') + word.toLowerCase();
		    });

		    /**
		     * Converts the first character of `string` to lower case.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the converted string.
		     * @example
		     *
		     * _.lowerFirst('Fred');
		     * // => 'fred'
		     *
		     * _.lowerFirst('FRED');
		     * // => 'fRED'
		     */
		    var lowerFirst = createCaseFirst('toLowerCase');

		    /**
		     * Pads `string` on the left and right sides if it's shorter than `length`.
		     * Padding characters are truncated if they can't be evenly divided by `length`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to pad.
		     * @param {number} [length=0] The padding length.
		     * @param {string} [chars=' '] The string used as padding.
		     * @returns {string} Returns the padded string.
		     * @example
		     *
		     * _.pad('abc', 8);
		     * // => '  abc   '
		     *
		     * _.pad('abc', 8, '_-');
		     * // => '_-abc_-_'
		     *
		     * _.pad('abc', 3);
		     * // => 'abc'
		     */
		    function pad(string, length, chars) {
		      string = toString(string);
		      length = toInteger(length);

		      var strLength = length ? stringSize(string) : 0;
		      if (!length || strLength >= length) {
		        return string;
		      }
		      var mid = (length - strLength) / 2;
		      return (
		        createPadding(nativeFloor(mid), chars) +
		        string +
		        createPadding(nativeCeil(mid), chars)
		      );
		    }

		    /**
		     * Pads `string` on the right side if it's shorter than `length`. Padding
		     * characters are truncated if they exceed `length`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to pad.
		     * @param {number} [length=0] The padding length.
		     * @param {string} [chars=' '] The string used as padding.
		     * @returns {string} Returns the padded string.
		     * @example
		     *
		     * _.padEnd('abc', 6);
		     * // => 'abc   '
		     *
		     * _.padEnd('abc', 6, '_-');
		     * // => 'abc_-_'
		     *
		     * _.padEnd('abc', 3);
		     * // => 'abc'
		     */
		    function padEnd(string, length, chars) {
		      string = toString(string);
		      length = toInteger(length);

		      var strLength = length ? stringSize(string) : 0;
		      return (length && strLength < length)
		        ? (string + createPadding(length - strLength, chars))
		        : string;
		    }

		    /**
		     * Pads `string` on the left side if it's shorter than `length`. Padding
		     * characters are truncated if they exceed `length`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to pad.
		     * @param {number} [length=0] The padding length.
		     * @param {string} [chars=' '] The string used as padding.
		     * @returns {string} Returns the padded string.
		     * @example
		     *
		     * _.padStart('abc', 6);
		     * // => '   abc'
		     *
		     * _.padStart('abc', 6, '_-');
		     * // => '_-_abc'
		     *
		     * _.padStart('abc', 3);
		     * // => 'abc'
		     */
		    function padStart(string, length, chars) {
		      string = toString(string);
		      length = toInteger(length);

		      var strLength = length ? stringSize(string) : 0;
		      return (length && strLength < length)
		        ? (createPadding(length - strLength, chars) + string)
		        : string;
		    }

		    /**
		     * Converts `string` to an integer of the specified radix. If `radix` is
		     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
		     * hexadecimal, in which case a `radix` of `16` is used.
		     *
		     * **Note:** This method aligns with the
		     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.1.0
		     * @category String
		     * @param {string} string The string to convert.
		     * @param {number} [radix=10] The radix to interpret `value` by.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {number} Returns the converted integer.
		     * @example
		     *
		     * _.parseInt('08');
		     * // => 8
		     *
		     * _.map(['6', '08', '10'], _.parseInt);
		     * // => [6, 8, 10]
		     */
		    function parseInt(string, radix, guard) {
		      if (guard || radix == null) {
		        radix = 0;
		      } else if (radix) {
		        radix = +radix;
		      }
		      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
		    }

		    /**
		     * Repeats the given string `n` times.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to repeat.
		     * @param {number} [n=1] The number of times to repeat the string.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {string} Returns the repeated string.
		     * @example
		     *
		     * _.repeat('*', 3);
		     * // => '***'
		     *
		     * _.repeat('abc', 2);
		     * // => 'abcabc'
		     *
		     * _.repeat('abc', 0);
		     * // => ''
		     */
		    function repeat(string, n, guard) {
		      if ((guard ? isIterateeCall(string, n, guard) : n === undefined$1)) {
		        n = 1;
		      } else {
		        n = toInteger(n);
		      }
		      return baseRepeat(toString(string), n);
		    }

		    /**
		     * Replaces matches for `pattern` in `string` with `replacement`.
		     *
		     * **Note:** This method is based on
		     * [`String#replace`](https://mdn.io/String/replace).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to modify.
		     * @param {RegExp|string} pattern The pattern to replace.
		     * @param {Function|string} replacement The match replacement.
		     * @returns {string} Returns the modified string.
		     * @example
		     *
		     * _.replace('Hi Fred', 'Fred', 'Barney');
		     * // => 'Hi Barney'
		     */
		    function replace() {
		      var args = arguments,
		          string = toString(args[0]);

		      return args.length < 3 ? string : string.replace(args[1], args[2]);
		    }

		    /**
		     * Converts `string` to
		     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the snake cased string.
		     * @example
		     *
		     * _.snakeCase('Foo Bar');
		     * // => 'foo_bar'
		     *
		     * _.snakeCase('fooBar');
		     * // => 'foo_bar'
		     *
		     * _.snakeCase('--FOO-BAR--');
		     * // => 'foo_bar'
		     */
		    var snakeCase = createCompounder(function(result, word, index) {
		      return result + (index ? '_' : '') + word.toLowerCase();
		    });

		    /**
		     * Splits `string` by `separator`.
		     *
		     * **Note:** This method is based on
		     * [`String#split`](https://mdn.io/String/split).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to split.
		     * @param {RegExp|string} separator The separator pattern to split by.
		     * @param {number} [limit] The length to truncate results to.
		     * @returns {Array} Returns the string segments.
		     * @example
		     *
		     * _.split('a-b-c', '-', 2);
		     * // => ['a', 'b']
		     */
		    function split(string, separator, limit) {
		      if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
		        separator = limit = undefined$1;
		      }
		      limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
		      if (!limit) {
		        return [];
		      }
		      string = toString(string);
		      if (string && (
		            typeof separator == 'string' ||
		            (separator != null && !isRegExp(separator))
		          )) {
		        separator = baseToString(separator);
		        if (!separator && hasUnicode(string)) {
		          return castSlice(stringToArray(string), 0, limit);
		        }
		      }
		      return string.split(separator, limit);
		    }

		    /**
		     * Converts `string` to
		     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.1.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the start cased string.
		     * @example
		     *
		     * _.startCase('--foo-bar--');
		     * // => 'Foo Bar'
		     *
		     * _.startCase('fooBar');
		     * // => 'Foo Bar'
		     *
		     * _.startCase('__FOO_BAR__');
		     * // => 'FOO BAR'
		     */
		    var startCase = createCompounder(function(result, word, index) {
		      return result + (index ? ' ' : '') + upperFirst(word);
		    });

		    /**
		     * Checks if `string` starts with the given target string.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to inspect.
		     * @param {string} [target] The string to search for.
		     * @param {number} [position=0] The position to search from.
		     * @returns {boolean} Returns `true` if `string` starts with `target`,
		     *  else `false`.
		     * @example
		     *
		     * _.startsWith('abc', 'a');
		     * // => true
		     *
		     * _.startsWith('abc', 'b');
		     * // => false
		     *
		     * _.startsWith('abc', 'b', 1);
		     * // => true
		     */
		    function startsWith(string, target, position) {
		      string = toString(string);
		      position = position == null
		        ? 0
		        : baseClamp(toInteger(position), 0, string.length);

		      target = baseToString(target);
		      return string.slice(position, position + target.length) == target;
		    }

		    /**
		     * Creates a compiled template function that can interpolate data properties
		     * in "interpolate" delimiters, HTML-escape interpolated data properties in
		     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
		     * properties may be accessed as free variables in the template. If a setting
		     * object is given, it takes precedence over `_.templateSettings` values.
		     *
		     * **Note:** In the development build `_.template` utilizes
		     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
		     * for easier debugging.
		     *
		     * For more information on precompiling templates see
		     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
		     *
		     * For more information on Chrome extension sandboxes see
		     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category String
		     * @param {string} [string=''] The template string.
		     * @param {Object} [options={}] The options object.
		     * @param {RegExp} [options.escape=_.templateSettings.escape]
		     *  The HTML "escape" delimiter.
		     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
		     *  The "evaluate" delimiter.
		     * @param {Object} [options.imports=_.templateSettings.imports]
		     *  An object to import into the template as free variables.
		     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
		     *  The "interpolate" delimiter.
		     * @param {string} [options.sourceURL='lodash.templateSources[n]']
		     *  The sourceURL of the compiled template.
		     * @param {string} [options.variable='obj']
		     *  The data object variable name.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Function} Returns the compiled template function.
		     * @example
		     *
		     * // Use the "interpolate" delimiter to create a compiled template.
		     * var compiled = _.template('hello <%= user %>!');
		     * compiled({ 'user': 'fred' });
		     * // => 'hello fred!'
		     *
		     * // Use the HTML "escape" delimiter to escape data property values.
		     * var compiled = _.template('<b><%- value %></b>');
		     * compiled({ 'value': '<script>' });
		     * // => '<b>&lt;script&gt;</b>'
		     *
		     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
		     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
		     * compiled({ 'users': ['fred', 'barney'] });
		     * // => '<li>fred</li><li>barney</li>'
		     *
		     * // Use the internal `print` function in "evaluate" delimiters.
		     * var compiled = _.template('<% print("hello " + user); %>!');
		     * compiled({ 'user': 'barney' });
		     * // => 'hello barney!'
		     *
		     * // Use the ES template literal delimiter as an "interpolate" delimiter.
		     * // Disable support by replacing the "interpolate" delimiter.
		     * var compiled = _.template('hello ${ user }!');
		     * compiled({ 'user': 'pebbles' });
		     * // => 'hello pebbles!'
		     *
		     * // Use backslashes to treat delimiters as plain text.
		     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
		     * compiled({ 'value': 'ignored' });
		     * // => '<%- value %>'
		     *
		     * // Use the `imports` option to import `jQuery` as `jq`.
		     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
		     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
		     * compiled({ 'users': ['fred', 'barney'] });
		     * // => '<li>fred</li><li>barney</li>'
		     *
		     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
		     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
		     * compiled(data);
		     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
		     *
		     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
		     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
		     * compiled.source;
		     * // => function(data) {
		     * //   var __t, __p = '';
		     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
		     * //   return __p;
		     * // }
		     *
		     * // Use custom template delimiters.
		     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
		     * var compiled = _.template('hello {{ user }}!');
		     * compiled({ 'user': 'mustache' });
		     * // => 'hello mustache!'
		     *
		     * // Use the `source` property to inline compiled templates for meaningful
		     * // line numbers in error messages and stack traces.
		     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
		     *   var JST = {\
		     *     "main": ' + _.template(mainText).source + '\
		     *   };\
		     * ');
		     */
		    function template(string, options, guard) {
		      // Based on John Resig's `tmpl` implementation
		      // (http://ejohn.org/blog/javascript-micro-templating/)
		      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
		      var settings = lodash.templateSettings;

		      if (guard && isIterateeCall(string, options, guard)) {
		        options = undefined$1;
		      }
		      string = toString(string);
		      options = assignInWith({}, options, settings, customDefaultsAssignIn);

		      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
		          importsKeys = keys(imports),
		          importsValues = baseValues(imports, importsKeys);

		      var isEscaping,
		          isEvaluating,
		          index = 0,
		          interpolate = options.interpolate || reNoMatch,
		          source = "__p += '";

		      // Compile the regexp to match each delimiter.
		      var reDelimiters = RegExp(
		        (options.escape || reNoMatch).source + '|' +
		        interpolate.source + '|' +
		        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
		        (options.evaluate || reNoMatch).source + '|$'
		      , 'g');

		      // Use a sourceURL for easier debugging.
		      // The sourceURL gets injected into the source that's eval-ed, so be careful
		      // to normalize all kinds of whitespace, so e.g. newlines (and unicode versions of it) can't sneak in
		      // and escape the comment, thus injecting code that gets evaled.
		      var sourceURL = '//# sourceURL=' +
		        (hasOwnProperty.call(options, 'sourceURL')
		          ? (options.sourceURL + '').replace(/\s/g, ' ')
		          : ('lodash.templateSources[' + (++templateCounter) + ']')
		        ) + '\n';

		      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
		        interpolateValue || (interpolateValue = esTemplateValue);

		        // Escape characters that can't be included in string literals.
		        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

		        // Replace delimiters with snippets.
		        if (escapeValue) {
		          isEscaping = true;
		          source += "' +\n__e(" + escapeValue + ") +\n'";
		        }
		        if (evaluateValue) {
		          isEvaluating = true;
		          source += "';\n" + evaluateValue + ";\n__p += '";
		        }
		        if (interpolateValue) {
		          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
		        }
		        index = offset + match.length;

		        // The JS engine embedded in Adobe products needs `match` returned in
		        // order to produce the correct `offset` value.
		        return match;
		      });

		      source += "';\n";

		      // If `variable` is not specified wrap a with-statement around the generated
		      // code to add the data object to the top of the scope chain.
		      var variable = hasOwnProperty.call(options, 'variable') && options.variable;
		      if (!variable) {
		        source = 'with (obj) {\n' + source + '\n}\n';
		      }
		      // Throw an error if a forbidden character was found in `variable`, to prevent
		      // potential command injection attacks.
		      else if (reForbiddenIdentifierChars.test(variable)) {
		        throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
		      }

		      // Cleanup code by stripping empty strings.
		      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
		        .replace(reEmptyStringMiddle, '$1')
		        .replace(reEmptyStringTrailing, '$1;');

		      // Frame code as the function body.
		      source = 'function(' + (variable || 'obj') + ') {\n' +
		        (variable
		          ? ''
		          : 'obj || (obj = {});\n'
		        ) +
		        "var __t, __p = ''" +
		        (isEscaping
		           ? ', __e = _.escape'
		           : ''
		        ) +
		        (isEvaluating
		          ? ', __j = Array.prototype.join;\n' +
		            "function print() { __p += __j.call(arguments, '') }\n"
		          : ';\n'
		        ) +
		        source +
		        'return __p\n}';

		      var result = attempt(function() {
		        return Function(importsKeys, sourceURL + 'return ' + source)
		          .apply(undefined$1, importsValues);
		      });

		      // Provide the compiled function's source by its `toString` method or
		      // the `source` property as a convenience for inlining compiled templates.
		      result.source = source;
		      if (isError(result)) {
		        throw result;
		      }
		      return result;
		    }

		    /**
		     * Converts `string`, as a whole, to lower case just like
		     * [String#toLowerCase](https://mdn.io/toLowerCase).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the lower cased string.
		     * @example
		     *
		     * _.toLower('--Foo-Bar--');
		     * // => '--foo-bar--'
		     *
		     * _.toLower('fooBar');
		     * // => 'foobar'
		     *
		     * _.toLower('__FOO_BAR__');
		     * // => '__foo_bar__'
		     */
		    function toLower(value) {
		      return toString(value).toLowerCase();
		    }

		    /**
		     * Converts `string`, as a whole, to upper case just like
		     * [String#toUpperCase](https://mdn.io/toUpperCase).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the upper cased string.
		     * @example
		     *
		     * _.toUpper('--foo-bar--');
		     * // => '--FOO-BAR--'
		     *
		     * _.toUpper('fooBar');
		     * // => 'FOOBAR'
		     *
		     * _.toUpper('__foo_bar__');
		     * // => '__FOO_BAR__'
		     */
		    function toUpper(value) {
		      return toString(value).toUpperCase();
		    }

		    /**
		     * Removes leading and trailing whitespace or specified characters from `string`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to trim.
		     * @param {string} [chars=whitespace] The characters to trim.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {string} Returns the trimmed string.
		     * @example
		     *
		     * _.trim('  abc  ');
		     * // => 'abc'
		     *
		     * _.trim('-_-abc-_-', '_-');
		     * // => 'abc'
		     *
		     * _.map(['  foo  ', '  bar  '], _.trim);
		     * // => ['foo', 'bar']
		     */
		    function trim(string, chars, guard) {
		      string = toString(string);
		      if (string && (guard || chars === undefined$1)) {
		        return baseTrim(string);
		      }
		      if (!string || !(chars = baseToString(chars))) {
		        return string;
		      }
		      var strSymbols = stringToArray(string),
		          chrSymbols = stringToArray(chars),
		          start = charsStartIndex(strSymbols, chrSymbols),
		          end = charsEndIndex(strSymbols, chrSymbols) + 1;

		      return castSlice(strSymbols, start, end).join('');
		    }

		    /**
		     * Removes trailing whitespace or specified characters from `string`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to trim.
		     * @param {string} [chars=whitespace] The characters to trim.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {string} Returns the trimmed string.
		     * @example
		     *
		     * _.trimEnd('  abc  ');
		     * // => '  abc'
		     *
		     * _.trimEnd('-_-abc-_-', '_-');
		     * // => '-_-abc'
		     */
		    function trimEnd(string, chars, guard) {
		      string = toString(string);
		      if (string && (guard || chars === undefined$1)) {
		        return string.slice(0, trimmedEndIndex(string) + 1);
		      }
		      if (!string || !(chars = baseToString(chars))) {
		        return string;
		      }
		      var strSymbols = stringToArray(string),
		          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

		      return castSlice(strSymbols, 0, end).join('');
		    }

		    /**
		     * Removes leading whitespace or specified characters from `string`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to trim.
		     * @param {string} [chars=whitespace] The characters to trim.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {string} Returns the trimmed string.
		     * @example
		     *
		     * _.trimStart('  abc  ');
		     * // => 'abc  '
		     *
		     * _.trimStart('-_-abc-_-', '_-');
		     * // => 'abc-_-'
		     */
		    function trimStart(string, chars, guard) {
		      string = toString(string);
		      if (string && (guard || chars === undefined$1)) {
		        return string.replace(reTrimStart, '');
		      }
		      if (!string || !(chars = baseToString(chars))) {
		        return string;
		      }
		      var strSymbols = stringToArray(string),
		          start = charsStartIndex(strSymbols, stringToArray(chars));

		      return castSlice(strSymbols, start).join('');
		    }

		    /**
		     * Truncates `string` if it's longer than the given maximum string length.
		     * The last characters of the truncated string are replaced with the omission
		     * string which defaults to "...".
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to truncate.
		     * @param {Object} [options={}] The options object.
		     * @param {number} [options.length=30] The maximum string length.
		     * @param {string} [options.omission='...'] The string to indicate text is omitted.
		     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
		     * @returns {string} Returns the truncated string.
		     * @example
		     *
		     * _.truncate('hi-diddly-ho there, neighborino');
		     * // => 'hi-diddly-ho there, neighbo...'
		     *
		     * _.truncate('hi-diddly-ho there, neighborino', {
		     *   'length': 24,
		     *   'separator': ' '
		     * });
		     * // => 'hi-diddly-ho there,...'
		     *
		     * _.truncate('hi-diddly-ho there, neighborino', {
		     *   'length': 24,
		     *   'separator': /,? +/
		     * });
		     * // => 'hi-diddly-ho there...'
		     *
		     * _.truncate('hi-diddly-ho there, neighborino', {
		     *   'omission': ' [...]'
		     * });
		     * // => 'hi-diddly-ho there, neig [...]'
		     */
		    function truncate(string, options) {
		      var length = DEFAULT_TRUNC_LENGTH,
		          omission = DEFAULT_TRUNC_OMISSION;

		      if (isObject(options)) {
		        var separator = 'separator' in options ? options.separator : separator;
		        length = 'length' in options ? toInteger(options.length) : length;
		        omission = 'omission' in options ? baseToString(options.omission) : omission;
		      }
		      string = toString(string);

		      var strLength = string.length;
		      if (hasUnicode(string)) {
		        var strSymbols = stringToArray(string);
		        strLength = strSymbols.length;
		      }
		      if (length >= strLength) {
		        return string;
		      }
		      var end = length - stringSize(omission);
		      if (end < 1) {
		        return omission;
		      }
		      var result = strSymbols
		        ? castSlice(strSymbols, 0, end).join('')
		        : string.slice(0, end);

		      if (separator === undefined$1) {
		        return result + omission;
		      }
		      if (strSymbols) {
		        end += (result.length - end);
		      }
		      if (isRegExp(separator)) {
		        if (string.slice(end).search(separator)) {
		          var match,
		              substring = result;

		          if (!separator.global) {
		            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
		          }
		          separator.lastIndex = 0;
		          while ((match = separator.exec(substring))) {
		            var newEnd = match.index;
		          }
		          result = result.slice(0, newEnd === undefined$1 ? end : newEnd);
		        }
		      } else if (string.indexOf(baseToString(separator), end) != end) {
		        var index = result.lastIndexOf(separator);
		        if (index > -1) {
		          result = result.slice(0, index);
		        }
		      }
		      return result + omission;
		    }

		    /**
		     * The inverse of `_.escape`; this method converts the HTML entities
		     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
		     * their corresponding characters.
		     *
		     * **Note:** No other HTML entities are unescaped. To unescape additional
		     * HTML entities use a third-party library like [_he_](https://mths.be/he).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.6.0
		     * @category String
		     * @param {string} [string=''] The string to unescape.
		     * @returns {string} Returns the unescaped string.
		     * @example
		     *
		     * _.unescape('fred, barney, &amp; pebbles');
		     * // => 'fred, barney, & pebbles'
		     */
		    function unescape(string) {
		      string = toString(string);
		      return (string && reHasEscapedHtml.test(string))
		        ? string.replace(reEscapedHtml, unescapeHtmlChar)
		        : string;
		    }

		    /**
		     * Converts `string`, as space separated words, to upper case.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the upper cased string.
		     * @example
		     *
		     * _.upperCase('--foo-bar');
		     * // => 'FOO BAR'
		     *
		     * _.upperCase('fooBar');
		     * // => 'FOO BAR'
		     *
		     * _.upperCase('__foo_bar__');
		     * // => 'FOO BAR'
		     */
		    var upperCase = createCompounder(function(result, word, index) {
		      return result + (index ? ' ' : '') + word.toUpperCase();
		    });

		    /**
		     * Converts the first character of `string` to upper case.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the converted string.
		     * @example
		     *
		     * _.upperFirst('fred');
		     * // => 'Fred'
		     *
		     * _.upperFirst('FRED');
		     * // => 'FRED'
		     */
		    var upperFirst = createCaseFirst('toUpperCase');

		    /**
		     * Splits `string` into an array of its words.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to inspect.
		     * @param {RegExp|string} [pattern] The pattern to match words.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the words of `string`.
		     * @example
		     *
		     * _.words('fred, barney, & pebbles');
		     * // => ['fred', 'barney', 'pebbles']
		     *
		     * _.words('fred, barney, & pebbles', /[^, ]+/g);
		     * // => ['fred', 'barney', '&', 'pebbles']
		     */
		    function words(string, pattern, guard) {
		      string = toString(string);
		      pattern = guard ? undefined$1 : pattern;

		      if (pattern === undefined$1) {
		        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
		      }
		      return string.match(pattern) || [];
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Attempts to invoke `func`, returning either the result or the caught error
		     * object. Any additional arguments are provided to `func` when it's invoked.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Util
		     * @param {Function} func The function to attempt.
		     * @param {...*} [args] The arguments to invoke `func` with.
		     * @returns {*} Returns the `func` result or error object.
		     * @example
		     *
		     * // Avoid throwing errors for invalid selectors.
		     * var elements = _.attempt(function(selector) {
		     *   return document.querySelectorAll(selector);
		     * }, '>_>');
		     *
		     * if (_.isError(elements)) {
		     *   elements = [];
		     * }
		     */
		    var attempt = baseRest(function(func, args) {
		      try {
		        return apply(func, undefined$1, args);
		      } catch (e) {
		        return isError(e) ? e : new Error(e);
		      }
		    });

		    /**
		     * Binds methods of an object to the object itself, overwriting the existing
		     * method.
		     *
		     * **Note:** This method doesn't set the "length" property of bound functions.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {Object} object The object to bind and assign the bound methods to.
		     * @param {...(string|string[])} methodNames The object method names to bind.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var view = {
		     *   'label': 'docs',
		     *   'click': function() {
		     *     console.log('clicked ' + this.label);
		     *   }
		     * };
		     *
		     * _.bindAll(view, ['click']);
		     * jQuery(element).on('click', view.click);
		     * // => Logs 'clicked docs' when clicked.
		     */
		    var bindAll = flatRest(function(object, methodNames) {
		      arrayEach(methodNames, function(key) {
		        key = toKey(key);
		        baseAssignValue(object, key, bind(object[key], object));
		      });
		      return object;
		    });

		    /**
		     * Creates a function that iterates over `pairs` and invokes the corresponding
		     * function of the first predicate to return truthy. The predicate-function
		     * pairs are invoked with the `this` binding and arguments of the created
		     * function.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {Array} pairs The predicate-function pairs.
		     * @returns {Function} Returns the new composite function.
		     * @example
		     *
		     * var func = _.cond([
		     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
		     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
		     *   [_.stubTrue,                      _.constant('no match')]
		     * ]);
		     *
		     * func({ 'a': 1, 'b': 2 });
		     * // => 'matches A'
		     *
		     * func({ 'a': 0, 'b': 1 });
		     * // => 'matches B'
		     *
		     * func({ 'a': '1', 'b': '2' });
		     * // => 'no match'
		     */
		    function cond(pairs) {
		      var length = pairs == null ? 0 : pairs.length,
		          toIteratee = getIteratee();

		      pairs = !length ? [] : arrayMap(pairs, function(pair) {
		        if (typeof pair[1] != 'function') {
		          throw new TypeError(FUNC_ERROR_TEXT);
		        }
		        return [toIteratee(pair[0]), pair[1]];
		      });

		      return baseRest(function(args) {
		        var index = -1;
		        while (++index < length) {
		          var pair = pairs[index];
		          if (apply(pair[0], this, args)) {
		            return apply(pair[1], this, args);
		          }
		        }
		      });
		    }

		    /**
		     * Creates a function that invokes the predicate properties of `source` with
		     * the corresponding property values of a given object, returning `true` if
		     * all predicates return truthy, else `false`.
		     *
		     * **Note:** The created function is equivalent to `_.conformsTo` with
		     * `source` partially applied.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {Object} source The object of property predicates to conform to.
		     * @returns {Function} Returns the new spec function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': 2, 'b': 1 },
		     *   { 'a': 1, 'b': 2 }
		     * ];
		     *
		     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
		     * // => [{ 'a': 1, 'b': 2 }]
		     */
		    function conforms(source) {
		      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
		    }

		    /**
		     * Creates a function that returns `value`.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Util
		     * @param {*} value The value to return from the new function.
		     * @returns {Function} Returns the new constant function.
		     * @example
		     *
		     * var objects = _.times(2, _.constant({ 'a': 1 }));
		     *
		     * console.log(objects);
		     * // => [{ 'a': 1 }, { 'a': 1 }]
		     *
		     * console.log(objects[0] === objects[1]);
		     * // => true
		     */
		    function constant(value) {
		      return function() {
		        return value;
		      };
		    }

		    /**
		     * Checks `value` to determine whether a default value should be returned in
		     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
		     * or `undefined`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.14.0
		     * @category Util
		     * @param {*} value The value to check.
		     * @param {*} defaultValue The default value.
		     * @returns {*} Returns the resolved value.
		     * @example
		     *
		     * _.defaultTo(1, 10);
		     * // => 1
		     *
		     * _.defaultTo(undefined, 10);
		     * // => 10
		     */
		    function defaultTo(value, defaultValue) {
		      return (value == null || value !== value) ? defaultValue : value;
		    }

		    /**
		     * Creates a function that returns the result of invoking the given functions
		     * with the `this` binding of the created function, where each successive
		     * invocation is supplied the return value of the previous.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Util
		     * @param {...(Function|Function[])} [funcs] The functions to invoke.
		     * @returns {Function} Returns the new composite function.
		     * @see _.flowRight
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var addSquare = _.flow([_.add, square]);
		     * addSquare(1, 2);
		     * // => 9
		     */
		    var flow = createFlow();

		    /**
		     * This method is like `_.flow` except that it creates a function that
		     * invokes the given functions from right to left.
		     *
		     * @static
		     * @since 3.0.0
		     * @memberOf _
		     * @category Util
		     * @param {...(Function|Function[])} [funcs] The functions to invoke.
		     * @returns {Function} Returns the new composite function.
		     * @see _.flow
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var addSquare = _.flowRight([square, _.add]);
		     * addSquare(1, 2);
		     * // => 9
		     */
		    var flowRight = createFlow(true);

		    /**
		     * This method returns the first argument it receives.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {*} value Any value.
		     * @returns {*} Returns `value`.
		     * @example
		     *
		     * var object = { 'a': 1 };
		     *
		     * console.log(_.identity(object) === object);
		     * // => true
		     */
		    function identity(value) {
		      return value;
		    }

		    /**
		     * Creates a function that invokes `func` with the arguments of the created
		     * function. If `func` is a property name, the created function returns the
		     * property value for a given element. If `func` is an array or object, the
		     * created function returns `true` for elements that contain the equivalent
		     * source properties, otherwise it returns `false`.
		     *
		     * @static
		     * @since 4.0.0
		     * @memberOf _
		     * @category Util
		     * @param {*} [func=_.identity] The value to convert to a callback.
		     * @returns {Function} Returns the callback.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36, 'active': true },
		     *   { 'user': 'fred',   'age': 40, 'active': false }
		     * ];
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
		     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.filter(users, _.iteratee(['user', 'fred']));
		     * // => [{ 'user': 'fred', 'age': 40 }]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.map(users, _.iteratee('user'));
		     * // => ['barney', 'fred']
		     *
		     * // Create custom iteratee shorthands.
		     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
		     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
		     *     return func.test(string);
		     *   };
		     * });
		     *
		     * _.filter(['abc', 'def'], /ef/);
		     * // => ['def']
		     */
		    function iteratee(func) {
		      return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
		    }

		    /**
		     * Creates a function that performs a partial deep comparison between a given
		     * object and `source`, returning `true` if the given object has equivalent
		     * property values, else `false`.
		     *
		     * **Note:** The created function is equivalent to `_.isMatch` with `source`
		     * partially applied.
		     *
		     * Partial comparisons will match empty array and empty object `source`
		     * values against any array or object value, respectively. See `_.isEqual`
		     * for a list of supported value comparisons.
		     *
		     * **Note:** Multiple values can be checked by combining several matchers
		     * using `_.overSome`
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Util
		     * @param {Object} source The object of property values to match.
		     * @returns {Function} Returns the new spec function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': 1, 'b': 2, 'c': 3 },
		     *   { 'a': 4, 'b': 5, 'c': 6 }
		     * ];
		     *
		     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
		     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
		     *
		     * // Checking for several possible values
		     * _.filter(objects, _.overSome([_.matches({ 'a': 1 }), _.matches({ 'a': 4 })]));
		     * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
		     */
		    function matches(source) {
		      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
		    }

		    /**
		     * Creates a function that performs a partial deep comparison between the
		     * value at `path` of a given object to `srcValue`, returning `true` if the
		     * object value is equivalent, else `false`.
		     *
		     * **Note:** Partial comparisons will match empty array and empty object
		     * `srcValue` values against any array or object value, respectively. See
		     * `_.isEqual` for a list of supported value comparisons.
		     *
		     * **Note:** Multiple values can be checked by combining several matchers
		     * using `_.overSome`
		     *
		     * @static
		     * @memberOf _
		     * @since 3.2.0
		     * @category Util
		     * @param {Array|string} path The path of the property to get.
		     * @param {*} srcValue The value to match.
		     * @returns {Function} Returns the new spec function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': 1, 'b': 2, 'c': 3 },
		     *   { 'a': 4, 'b': 5, 'c': 6 }
		     * ];
		     *
		     * _.find(objects, _.matchesProperty('a', 4));
		     * // => { 'a': 4, 'b': 5, 'c': 6 }
		     *
		     * // Checking for several possible values
		     * _.filter(objects, _.overSome([_.matchesProperty('a', 1), _.matchesProperty('a', 4)]));
		     * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
		     */
		    function matchesProperty(path, srcValue) {
		      return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
		    }

		    /**
		     * Creates a function that invokes the method at `path` of a given object.
		     * Any additional arguments are provided to the invoked method.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.7.0
		     * @category Util
		     * @param {Array|string} path The path of the method to invoke.
		     * @param {...*} [args] The arguments to invoke the method with.
		     * @returns {Function} Returns the new invoker function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': { 'b': _.constant(2) } },
		     *   { 'a': { 'b': _.constant(1) } }
		     * ];
		     *
		     * _.map(objects, _.method('a.b'));
		     * // => [2, 1]
		     *
		     * _.map(objects, _.method(['a', 'b']));
		     * // => [2, 1]
		     */
		    var method = baseRest(function(path, args) {
		      return function(object) {
		        return baseInvoke(object, path, args);
		      };
		    });

		    /**
		     * The opposite of `_.method`; this method creates a function that invokes
		     * the method at a given path of `object`. Any additional arguments are
		     * provided to the invoked method.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.7.0
		     * @category Util
		     * @param {Object} object The object to query.
		     * @param {...*} [args] The arguments to invoke the method with.
		     * @returns {Function} Returns the new invoker function.
		     * @example
		     *
		     * var array = _.times(3, _.constant),
		     *     object = { 'a': array, 'b': array, 'c': array };
		     *
		     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
		     * // => [2, 0]
		     *
		     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
		     * // => [2, 0]
		     */
		    var methodOf = baseRest(function(object, args) {
		      return function(path) {
		        return baseInvoke(object, path, args);
		      };
		    });

		    /**
		     * Adds all own enumerable string keyed function properties of a source
		     * object to the destination object. If `object` is a function, then methods
		     * are added to its prototype as well.
		     *
		     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
		     * avoid conflicts caused by modifying the original.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {Function|Object} [object=lodash] The destination object.
		     * @param {Object} source The object of functions to add.
		     * @param {Object} [options={}] The options object.
		     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
		     * @returns {Function|Object} Returns `object`.
		     * @example
		     *
		     * function vowels(string) {
		     *   return _.filter(string, function(v) {
		     *     return /[aeiou]/i.test(v);
		     *   });
		     * }
		     *
		     * _.mixin({ 'vowels': vowels });
		     * _.vowels('fred');
		     * // => ['e']
		     *
		     * _('fred').vowels().value();
		     * // => ['e']
		     *
		     * _.mixin({ 'vowels': vowels }, { 'chain': false });
		     * _('fred').vowels();
		     * // => ['e']
		     */
		    function mixin(object, source, options) {
		      var props = keys(source),
		          methodNames = baseFunctions(source, props);

		      if (options == null &&
		          !(isObject(source) && (methodNames.length || !props.length))) {
		        options = source;
		        source = object;
		        object = this;
		        methodNames = baseFunctions(source, keys(source));
		      }
		      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
		          isFunc = isFunction(object);

		      arrayEach(methodNames, function(methodName) {
		        var func = source[methodName];
		        object[methodName] = func;
		        if (isFunc) {
		          object.prototype[methodName] = function() {
		            var chainAll = this.__chain__;
		            if (chain || chainAll) {
		              var result = object(this.__wrapped__),
		                  actions = result.__actions__ = copyArray(this.__actions__);

		              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
		              result.__chain__ = chainAll;
		              return result;
		            }
		            return func.apply(object, arrayPush([this.value()], arguments));
		          };
		        }
		      });

		      return object;
		    }

		    /**
		     * Reverts the `_` variable to its previous value and returns a reference to
		     * the `lodash` function.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @returns {Function} Returns the `lodash` function.
		     * @example
		     *
		     * var lodash = _.noConflict();
		     */
		    function noConflict() {
		      if (root._ === this) {
		        root._ = oldDash;
		      }
		      return this;
		    }

		    /**
		     * This method returns `undefined`.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.3.0
		     * @category Util
		     * @example
		     *
		     * _.times(2, _.noop);
		     * // => [undefined, undefined]
		     */
		    function noop() {
		      // No operation performed.
		    }

		    /**
		     * Creates a function that gets the argument at index `n`. If `n` is negative,
		     * the nth argument from the end is returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {number} [n=0] The index of the argument to return.
		     * @returns {Function} Returns the new pass-thru function.
		     * @example
		     *
		     * var func = _.nthArg(1);
		     * func('a', 'b', 'c', 'd');
		     * // => 'b'
		     *
		     * var func = _.nthArg(-2);
		     * func('a', 'b', 'c', 'd');
		     * // => 'c'
		     */
		    function nthArg(n) {
		      n = toInteger(n);
		      return baseRest(function(args) {
		        return baseNth(args, n);
		      });
		    }

		    /**
		     * Creates a function that invokes `iteratees` with the arguments it receives
		     * and returns their results.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {...(Function|Function[])} [iteratees=[_.identity]]
		     *  The iteratees to invoke.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var func = _.over([Math.max, Math.min]);
		     *
		     * func(1, 2, 3, 4);
		     * // => [4, 1]
		     */
		    var over = createOver(arrayMap);

		    /**
		     * Creates a function that checks if **all** of the `predicates` return
		     * truthy when invoked with the arguments it receives.
		     *
		     * Following shorthands are possible for providing predicates.
		     * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
		     * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {...(Function|Function[])} [predicates=[_.identity]]
		     *  The predicates to check.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var func = _.overEvery([Boolean, isFinite]);
		     *
		     * func('1');
		     * // => true
		     *
		     * func(null);
		     * // => false
		     *
		     * func(NaN);
		     * // => false
		     */
		    var overEvery = createOver(arrayEvery);

		    /**
		     * Creates a function that checks if **any** of the `predicates` return
		     * truthy when invoked with the arguments it receives.
		     *
		     * Following shorthands are possible for providing predicates.
		     * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
		     * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {...(Function|Function[])} [predicates=[_.identity]]
		     *  The predicates to check.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var func = _.overSome([Boolean, isFinite]);
		     *
		     * func('1');
		     * // => true
		     *
		     * func(null);
		     * // => true
		     *
		     * func(NaN);
		     * // => false
		     *
		     * var matchesFunc = _.overSome([{ 'a': 1 }, { 'a': 2 }])
		     * var matchesPropertyFunc = _.overSome([['a', 1], ['a', 2]])
		     */
		    var overSome = createOver(arraySome);

		    /**
		     * Creates a function that returns the value at `path` of a given object.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Util
		     * @param {Array|string} path The path of the property to get.
		     * @returns {Function} Returns the new accessor function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': { 'b': 2 } },
		     *   { 'a': { 'b': 1 } }
		     * ];
		     *
		     * _.map(objects, _.property('a.b'));
		     * // => [2, 1]
		     *
		     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
		     * // => [1, 2]
		     */
		    function property(path) {
		      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
		    }

		    /**
		     * The opposite of `_.property`; this method creates a function that returns
		     * the value at a given path of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Util
		     * @param {Object} object The object to query.
		     * @returns {Function} Returns the new accessor function.
		     * @example
		     *
		     * var array = [0, 1, 2],
		     *     object = { 'a': array, 'b': array, 'c': array };
		     *
		     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
		     * // => [2, 0]
		     *
		     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
		     * // => [2, 0]
		     */
		    function propertyOf(object) {
		      return function(path) {
		        return object == null ? undefined$1 : baseGet(object, path);
		      };
		    }

		    /**
		     * Creates an array of numbers (positive and/or negative) progressing from
		     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
		     * `start` is specified without an `end` or `step`. If `end` is not specified,
		     * it's set to `start` with `start` then set to `0`.
		     *
		     * **Note:** JavaScript follows the IEEE-754 standard for resolving
		     * floating-point values which can produce unexpected results.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {number} [start=0] The start of the range.
		     * @param {number} end The end of the range.
		     * @param {number} [step=1] The value to increment or decrement by.
		     * @returns {Array} Returns the range of numbers.
		     * @see _.inRange, _.rangeRight
		     * @example
		     *
		     * _.range(4);
		     * // => [0, 1, 2, 3]
		     *
		     * _.range(-4);
		     * // => [0, -1, -2, -3]
		     *
		     * _.range(1, 5);
		     * // => [1, 2, 3, 4]
		     *
		     * _.range(0, 20, 5);
		     * // => [0, 5, 10, 15]
		     *
		     * _.range(0, -4, -1);
		     * // => [0, -1, -2, -3]
		     *
		     * _.range(1, 4, 0);
		     * // => [1, 1, 1]
		     *
		     * _.range(0);
		     * // => []
		     */
		    var range = createRange();

		    /**
		     * This method is like `_.range` except that it populates values in
		     * descending order.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {number} [start=0] The start of the range.
		     * @param {number} end The end of the range.
		     * @param {number} [step=1] The value to increment or decrement by.
		     * @returns {Array} Returns the range of numbers.
		     * @see _.inRange, _.range
		     * @example
		     *
		     * _.rangeRight(4);
		     * // => [3, 2, 1, 0]
		     *
		     * _.rangeRight(-4);
		     * // => [-3, -2, -1, 0]
		     *
		     * _.rangeRight(1, 5);
		     * // => [4, 3, 2, 1]
		     *
		     * _.rangeRight(0, 20, 5);
		     * // => [15, 10, 5, 0]
		     *
		     * _.rangeRight(0, -4, -1);
		     * // => [-3, -2, -1, 0]
		     *
		     * _.rangeRight(1, 4, 0);
		     * // => [1, 1, 1]
		     *
		     * _.rangeRight(0);
		     * // => []
		     */
		    var rangeRight = createRange(true);

		    /**
		     * This method returns a new empty array.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {Array} Returns the new empty array.
		     * @example
		     *
		     * var arrays = _.times(2, _.stubArray);
		     *
		     * console.log(arrays);
		     * // => [[], []]
		     *
		     * console.log(arrays[0] === arrays[1]);
		     * // => false
		     */
		    function stubArray() {
		      return [];
		    }

		    /**
		     * This method returns `false`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {boolean} Returns `false`.
		     * @example
		     *
		     * _.times(2, _.stubFalse);
		     * // => [false, false]
		     */
		    function stubFalse() {
		      return false;
		    }

		    /**
		     * This method returns a new empty object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {Object} Returns the new empty object.
		     * @example
		     *
		     * var objects = _.times(2, _.stubObject);
		     *
		     * console.log(objects);
		     * // => [{}, {}]
		     *
		     * console.log(objects[0] === objects[1]);
		     * // => false
		     */
		    function stubObject() {
		      return {};
		    }

		    /**
		     * This method returns an empty string.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {string} Returns the empty string.
		     * @example
		     *
		     * _.times(2, _.stubString);
		     * // => ['', '']
		     */
		    function stubString() {
		      return '';
		    }

		    /**
		     * This method returns `true`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {boolean} Returns `true`.
		     * @example
		     *
		     * _.times(2, _.stubTrue);
		     * // => [true, true]
		     */
		    function stubTrue() {
		      return true;
		    }

		    /**
		     * Invokes the iteratee `n` times, returning an array of the results of
		     * each invocation. The iteratee is invoked with one argument; (index).
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {number} n The number of times to invoke `iteratee`.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the array of results.
		     * @example
		     *
		     * _.times(3, String);
		     * // => ['0', '1', '2']
		     *
		     *  _.times(4, _.constant(0));
		     * // => [0, 0, 0, 0]
		     */
		    function times(n, iteratee) {
		      n = toInteger(n);
		      if (n < 1 || n > MAX_SAFE_INTEGER) {
		        return [];
		      }
		      var index = MAX_ARRAY_LENGTH,
		          length = nativeMin(n, MAX_ARRAY_LENGTH);

		      iteratee = getIteratee(iteratee);
		      n -= MAX_ARRAY_LENGTH;

		      var result = baseTimes(length, iteratee);
		      while (++index < n) {
		        iteratee(index);
		      }
		      return result;
		    }

		    /**
		     * Converts `value` to a property path array.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {*} value The value to convert.
		     * @returns {Array} Returns the new property path array.
		     * @example
		     *
		     * _.toPath('a.b.c');
		     * // => ['a', 'b', 'c']
		     *
		     * _.toPath('a[0].b.c');
		     * // => ['a', '0', 'b', 'c']
		     */
		    function toPath(value) {
		      if (isArray(value)) {
		        return arrayMap(value, toKey);
		      }
		      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
		    }

		    /**
		     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {string} [prefix=''] The value to prefix the ID with.
		     * @returns {string} Returns the unique ID.
		     * @example
		     *
		     * _.uniqueId('contact_');
		     * // => 'contact_104'
		     *
		     * _.uniqueId();
		     * // => '105'
		     */
		    function uniqueId(prefix) {
		      var id = ++idCounter;
		      return toString(prefix) + id;
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Adds two numbers.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.4.0
		     * @category Math
		     * @param {number} augend The first number in an addition.
		     * @param {number} addend The second number in an addition.
		     * @returns {number} Returns the total.
		     * @example
		     *
		     * _.add(6, 4);
		     * // => 10
		     */
		    var add = createMathOperation(function(augend, addend) {
		      return augend + addend;
		    }, 0);

		    /**
		     * Computes `number` rounded up to `precision`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.10.0
		     * @category Math
		     * @param {number} number The number to round up.
		     * @param {number} [precision=0] The precision to round up to.
		     * @returns {number} Returns the rounded up number.
		     * @example
		     *
		     * _.ceil(4.006);
		     * // => 5
		     *
		     * _.ceil(6.004, 2);
		     * // => 6.01
		     *
		     * _.ceil(6040, -2);
		     * // => 6100
		     */
		    var ceil = createRound('ceil');

		    /**
		     * Divide two numbers.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Math
		     * @param {number} dividend The first number in a division.
		     * @param {number} divisor The second number in a division.
		     * @returns {number} Returns the quotient.
		     * @example
		     *
		     * _.divide(6, 4);
		     * // => 1.5
		     */
		    var divide = createMathOperation(function(dividend, divisor) {
		      return dividend / divisor;
		    }, 1);

		    /**
		     * Computes `number` rounded down to `precision`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.10.0
		     * @category Math
		     * @param {number} number The number to round down.
		     * @param {number} [precision=0] The precision to round down to.
		     * @returns {number} Returns the rounded down number.
		     * @example
		     *
		     * _.floor(4.006);
		     * // => 4
		     *
		     * _.floor(0.046, 2);
		     * // => 0.04
		     *
		     * _.floor(4060, -2);
		     * // => 4000
		     */
		    var floor = createRound('floor');

		    /**
		     * Computes the maximum value of `array`. If `array` is empty or falsey,
		     * `undefined` is returned.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @returns {*} Returns the maximum value.
		     * @example
		     *
		     * _.max([4, 2, 8, 6]);
		     * // => 8
		     *
		     * _.max([]);
		     * // => undefined
		     */
		    function max(array) {
		      return (array && array.length)
		        ? baseExtremum(array, identity, baseGt)
		        : undefined$1;
		    }

		    /**
		     * This method is like `_.max` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the criterion by which
		     * the value is ranked. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {*} Returns the maximum value.
		     * @example
		     *
		     * var objects = [{ 'n': 1 }, { 'n': 2 }];
		     *
		     * _.maxBy(objects, function(o) { return o.n; });
		     * // => { 'n': 2 }
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.maxBy(objects, 'n');
		     * // => { 'n': 2 }
		     */
		    function maxBy(array, iteratee) {
		      return (array && array.length)
		        ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
		        : undefined$1;
		    }

		    /**
		     * Computes the mean of the values in `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @returns {number} Returns the mean.
		     * @example
		     *
		     * _.mean([4, 2, 8, 6]);
		     * // => 5
		     */
		    function mean(array) {
		      return baseMean(array, identity);
		    }

		    /**
		     * This method is like `_.mean` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the value to be averaged.
		     * The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {number} Returns the mean.
		     * @example
		     *
		     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
		     *
		     * _.meanBy(objects, function(o) { return o.n; });
		     * // => 5
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.meanBy(objects, 'n');
		     * // => 5
		     */
		    function meanBy(array, iteratee) {
		      return baseMean(array, getIteratee(iteratee, 2));
		    }

		    /**
		     * Computes the minimum value of `array`. If `array` is empty or falsey,
		     * `undefined` is returned.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @returns {*} Returns the minimum value.
		     * @example
		     *
		     * _.min([4, 2, 8, 6]);
		     * // => 2
		     *
		     * _.min([]);
		     * // => undefined
		     */
		    function min(array) {
		      return (array && array.length)
		        ? baseExtremum(array, identity, baseLt)
		        : undefined$1;
		    }

		    /**
		     * This method is like `_.min` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the criterion by which
		     * the value is ranked. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {*} Returns the minimum value.
		     * @example
		     *
		     * var objects = [{ 'n': 1 }, { 'n': 2 }];
		     *
		     * _.minBy(objects, function(o) { return o.n; });
		     * // => { 'n': 1 }
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.minBy(objects, 'n');
		     * // => { 'n': 1 }
		     */
		    function minBy(array, iteratee) {
		      return (array && array.length)
		        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
		        : undefined$1;
		    }

		    /**
		     * Multiply two numbers.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Math
		     * @param {number} multiplier The first number in a multiplication.
		     * @param {number} multiplicand The second number in a multiplication.
		     * @returns {number} Returns the product.
		     * @example
		     *
		     * _.multiply(6, 4);
		     * // => 24
		     */
		    var multiply = createMathOperation(function(multiplier, multiplicand) {
		      return multiplier * multiplicand;
		    }, 1);

		    /**
		     * Computes `number` rounded to `precision`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.10.0
		     * @category Math
		     * @param {number} number The number to round.
		     * @param {number} [precision=0] The precision to round to.
		     * @returns {number} Returns the rounded number.
		     * @example
		     *
		     * _.round(4.006);
		     * // => 4
		     *
		     * _.round(4.006, 2);
		     * // => 4.01
		     *
		     * _.round(4060, -2);
		     * // => 4100
		     */
		    var round = createRound('round');

		    /**
		     * Subtract two numbers.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {number} minuend The first number in a subtraction.
		     * @param {number} subtrahend The second number in a subtraction.
		     * @returns {number} Returns the difference.
		     * @example
		     *
		     * _.subtract(6, 4);
		     * // => 2
		     */
		    var subtract = createMathOperation(function(minuend, subtrahend) {
		      return minuend - subtrahend;
		    }, 0);

		    /**
		     * Computes the sum of the values in `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.4.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @returns {number} Returns the sum.
		     * @example
		     *
		     * _.sum([4, 2, 8, 6]);
		     * // => 20
		     */
		    function sum(array) {
		      return (array && array.length)
		        ? baseSum(array, identity)
		        : 0;
		    }

		    /**
		     * This method is like `_.sum` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the value to be summed.
		     * The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {number} Returns the sum.
		     * @example
		     *
		     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
		     *
		     * _.sumBy(objects, function(o) { return o.n; });
		     * // => 20
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.sumBy(objects, 'n');
		     * // => 20
		     */
		    function sumBy(array, iteratee) {
		      return (array && array.length)
		        ? baseSum(array, getIteratee(iteratee, 2))
		        : 0;
		    }

		    /*------------------------------------------------------------------------*/

		    // Add methods that return wrapped values in chain sequences.
		    lodash.after = after;
		    lodash.ary = ary;
		    lodash.assign = assign;
		    lodash.assignIn = assignIn;
		    lodash.assignInWith = assignInWith;
		    lodash.assignWith = assignWith;
		    lodash.at = at;
		    lodash.before = before;
		    lodash.bind = bind;
		    lodash.bindAll = bindAll;
		    lodash.bindKey = bindKey;
		    lodash.castArray = castArray;
		    lodash.chain = chain;
		    lodash.chunk = chunk;
		    lodash.compact = compact;
		    lodash.concat = concat;
		    lodash.cond = cond;
		    lodash.conforms = conforms;
		    lodash.constant = constant;
		    lodash.countBy = countBy;
		    lodash.create = create;
		    lodash.curry = curry;
		    lodash.curryRight = curryRight;
		    lodash.debounce = debounce;
		    lodash.defaults = defaults;
		    lodash.defaultsDeep = defaultsDeep;
		    lodash.defer = defer;
		    lodash.delay = delay;
		    lodash.difference = difference;
		    lodash.differenceBy = differenceBy;
		    lodash.differenceWith = differenceWith;
		    lodash.drop = drop;
		    lodash.dropRight = dropRight;
		    lodash.dropRightWhile = dropRightWhile;
		    lodash.dropWhile = dropWhile;
		    lodash.fill = fill;
		    lodash.filter = filter;
		    lodash.flatMap = flatMap;
		    lodash.flatMapDeep = flatMapDeep;
		    lodash.flatMapDepth = flatMapDepth;
		    lodash.flatten = flatten;
		    lodash.flattenDeep = flattenDeep;
		    lodash.flattenDepth = flattenDepth;
		    lodash.flip = flip;
		    lodash.flow = flow;
		    lodash.flowRight = flowRight;
		    lodash.fromPairs = fromPairs;
		    lodash.functions = functions;
		    lodash.functionsIn = functionsIn;
		    lodash.groupBy = groupBy;
		    lodash.initial = initial;
		    lodash.intersection = intersection;
		    lodash.intersectionBy = intersectionBy;
		    lodash.intersectionWith = intersectionWith;
		    lodash.invert = invert;
		    lodash.invertBy = invertBy;
		    lodash.invokeMap = invokeMap;
		    lodash.iteratee = iteratee;
		    lodash.keyBy = keyBy;
		    lodash.keys = keys;
		    lodash.keysIn = keysIn;
		    lodash.map = map;
		    lodash.mapKeys = mapKeys;
		    lodash.mapValues = mapValues;
		    lodash.matches = matches;
		    lodash.matchesProperty = matchesProperty;
		    lodash.memoize = memoize;
		    lodash.merge = merge;
		    lodash.mergeWith = mergeWith;
		    lodash.method = method;
		    lodash.methodOf = methodOf;
		    lodash.mixin = mixin;
		    lodash.negate = negate;
		    lodash.nthArg = nthArg;
		    lodash.omit = omit;
		    lodash.omitBy = omitBy;
		    lodash.once = once;
		    lodash.orderBy = orderBy;
		    lodash.over = over;
		    lodash.overArgs = overArgs;
		    lodash.overEvery = overEvery;
		    lodash.overSome = overSome;
		    lodash.partial = partial;
		    lodash.partialRight = partialRight;
		    lodash.partition = partition;
		    lodash.pick = pick;
		    lodash.pickBy = pickBy;
		    lodash.property = property;
		    lodash.propertyOf = propertyOf;
		    lodash.pull = pull;
		    lodash.pullAll = pullAll;
		    lodash.pullAllBy = pullAllBy;
		    lodash.pullAllWith = pullAllWith;
		    lodash.pullAt = pullAt;
		    lodash.range = range;
		    lodash.rangeRight = rangeRight;
		    lodash.rearg = rearg;
		    lodash.reject = reject;
		    lodash.remove = remove;
		    lodash.rest = rest;
		    lodash.reverse = reverse;
		    lodash.sampleSize = sampleSize;
		    lodash.set = set;
		    lodash.setWith = setWith;
		    lodash.shuffle = shuffle;
		    lodash.slice = slice;
		    lodash.sortBy = sortBy;
		    lodash.sortedUniq = sortedUniq;
		    lodash.sortedUniqBy = sortedUniqBy;
		    lodash.split = split;
		    lodash.spread = spread;
		    lodash.tail = tail;
		    lodash.take = take;
		    lodash.takeRight = takeRight;
		    lodash.takeRightWhile = takeRightWhile;
		    lodash.takeWhile = takeWhile;
		    lodash.tap = tap;
		    lodash.throttle = throttle;
		    lodash.thru = thru;
		    lodash.toArray = toArray;
		    lodash.toPairs = toPairs;
		    lodash.toPairsIn = toPairsIn;
		    lodash.toPath = toPath;
		    lodash.toPlainObject = toPlainObject;
		    lodash.transform = transform;
		    lodash.unary = unary;
		    lodash.union = union;
		    lodash.unionBy = unionBy;
		    lodash.unionWith = unionWith;
		    lodash.uniq = uniq;
		    lodash.uniqBy = uniqBy;
		    lodash.uniqWith = uniqWith;
		    lodash.unset = unset;
		    lodash.unzip = unzip;
		    lodash.unzipWith = unzipWith;
		    lodash.update = update;
		    lodash.updateWith = updateWith;
		    lodash.values = values;
		    lodash.valuesIn = valuesIn;
		    lodash.without = without;
		    lodash.words = words;
		    lodash.wrap = wrap;
		    lodash.xor = xor;
		    lodash.xorBy = xorBy;
		    lodash.xorWith = xorWith;
		    lodash.zip = zip;
		    lodash.zipObject = zipObject;
		    lodash.zipObjectDeep = zipObjectDeep;
		    lodash.zipWith = zipWith;

		    // Add aliases.
		    lodash.entries = toPairs;
		    lodash.entriesIn = toPairsIn;
		    lodash.extend = assignIn;
		    lodash.extendWith = assignInWith;

		    // Add methods to `lodash.prototype`.
		    mixin(lodash, lodash);

		    /*------------------------------------------------------------------------*/

		    // Add methods that return unwrapped values in chain sequences.
		    lodash.add = add;
		    lodash.attempt = attempt;
		    lodash.camelCase = camelCase;
		    lodash.capitalize = capitalize;
		    lodash.ceil = ceil;
		    lodash.clamp = clamp;
		    lodash.clone = clone;
		    lodash.cloneDeep = cloneDeep;
		    lodash.cloneDeepWith = cloneDeepWith;
		    lodash.cloneWith = cloneWith;
		    lodash.conformsTo = conformsTo;
		    lodash.deburr = deburr;
		    lodash.defaultTo = defaultTo;
		    lodash.divide = divide;
		    lodash.endsWith = endsWith;
		    lodash.eq = eq;
		    lodash.escape = escape;
		    lodash.escapeRegExp = escapeRegExp;
		    lodash.every = every;
		    lodash.find = find;
		    lodash.findIndex = findIndex;
		    lodash.findKey = findKey;
		    lodash.findLast = findLast;
		    lodash.findLastIndex = findLastIndex;
		    lodash.findLastKey = findLastKey;
		    lodash.floor = floor;
		    lodash.forEach = forEach;
		    lodash.forEachRight = forEachRight;
		    lodash.forIn = forIn;
		    lodash.forInRight = forInRight;
		    lodash.forOwn = forOwn;
		    lodash.forOwnRight = forOwnRight;
		    lodash.get = get;
		    lodash.gt = gt;
		    lodash.gte = gte;
		    lodash.has = has;
		    lodash.hasIn = hasIn;
		    lodash.head = head;
		    lodash.identity = identity;
		    lodash.includes = includes;
		    lodash.indexOf = indexOf;
		    lodash.inRange = inRange;
		    lodash.invoke = invoke;
		    lodash.isArguments = isArguments;
		    lodash.isArray = isArray;
		    lodash.isArrayBuffer = isArrayBuffer;
		    lodash.isArrayLike = isArrayLike;
		    lodash.isArrayLikeObject = isArrayLikeObject;
		    lodash.isBoolean = isBoolean;
		    lodash.isBuffer = isBuffer;
		    lodash.isDate = isDate;
		    lodash.isElement = isElement;
		    lodash.isEmpty = isEmpty;
		    lodash.isEqual = isEqual;
		    lodash.isEqualWith = isEqualWith;
		    lodash.isError = isError;
		    lodash.isFinite = isFinite;
		    lodash.isFunction = isFunction;
		    lodash.isInteger = isInteger;
		    lodash.isLength = isLength;
		    lodash.isMap = isMap;
		    lodash.isMatch = isMatch;
		    lodash.isMatchWith = isMatchWith;
		    lodash.isNaN = isNaN;
		    lodash.isNative = isNative;
		    lodash.isNil = isNil;
		    lodash.isNull = isNull;
		    lodash.isNumber = isNumber;
		    lodash.isObject = isObject;
		    lodash.isObjectLike = isObjectLike;
		    lodash.isPlainObject = isPlainObject;
		    lodash.isRegExp = isRegExp;
		    lodash.isSafeInteger = isSafeInteger;
		    lodash.isSet = isSet;
		    lodash.isString = isString;
		    lodash.isSymbol = isSymbol;
		    lodash.isTypedArray = isTypedArray;
		    lodash.isUndefined = isUndefined;
		    lodash.isWeakMap = isWeakMap;
		    lodash.isWeakSet = isWeakSet;
		    lodash.join = join;
		    lodash.kebabCase = kebabCase;
		    lodash.last = last;
		    lodash.lastIndexOf = lastIndexOf;
		    lodash.lowerCase = lowerCase;
		    lodash.lowerFirst = lowerFirst;
		    lodash.lt = lt;
		    lodash.lte = lte;
		    lodash.max = max;
		    lodash.maxBy = maxBy;
		    lodash.mean = mean;
		    lodash.meanBy = meanBy;
		    lodash.min = min;
		    lodash.minBy = minBy;
		    lodash.stubArray = stubArray;
		    lodash.stubFalse = stubFalse;
		    lodash.stubObject = stubObject;
		    lodash.stubString = stubString;
		    lodash.stubTrue = stubTrue;
		    lodash.multiply = multiply;
		    lodash.nth = nth;
		    lodash.noConflict = noConflict;
		    lodash.noop = noop;
		    lodash.now = now;
		    lodash.pad = pad;
		    lodash.padEnd = padEnd;
		    lodash.padStart = padStart;
		    lodash.parseInt = parseInt;
		    lodash.random = random;
		    lodash.reduce = reduce;
		    lodash.reduceRight = reduceRight;
		    lodash.repeat = repeat;
		    lodash.replace = replace;
		    lodash.result = result;
		    lodash.round = round;
		    lodash.runInContext = runInContext;
		    lodash.sample = sample;
		    lodash.size = size;
		    lodash.snakeCase = snakeCase;
		    lodash.some = some;
		    lodash.sortedIndex = sortedIndex;
		    lodash.sortedIndexBy = sortedIndexBy;
		    lodash.sortedIndexOf = sortedIndexOf;
		    lodash.sortedLastIndex = sortedLastIndex;
		    lodash.sortedLastIndexBy = sortedLastIndexBy;
		    lodash.sortedLastIndexOf = sortedLastIndexOf;
		    lodash.startCase = startCase;
		    lodash.startsWith = startsWith;
		    lodash.subtract = subtract;
		    lodash.sum = sum;
		    lodash.sumBy = sumBy;
		    lodash.template = template;
		    lodash.times = times;
		    lodash.toFinite = toFinite;
		    lodash.toInteger = toInteger;
		    lodash.toLength = toLength;
		    lodash.toLower = toLower;
		    lodash.toNumber = toNumber;
		    lodash.toSafeInteger = toSafeInteger;
		    lodash.toString = toString;
		    lodash.toUpper = toUpper;
		    lodash.trim = trim;
		    lodash.trimEnd = trimEnd;
		    lodash.trimStart = trimStart;
		    lodash.truncate = truncate;
		    lodash.unescape = unescape;
		    lodash.uniqueId = uniqueId;
		    lodash.upperCase = upperCase;
		    lodash.upperFirst = upperFirst;

		    // Add aliases.
		    lodash.each = forEach;
		    lodash.eachRight = forEachRight;
		    lodash.first = head;

		    mixin(lodash, (function() {
		      var source = {};
		      baseForOwn(lodash, function(func, methodName) {
		        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
		          source[methodName] = func;
		        }
		      });
		      return source;
		    }()), { 'chain': false });

		    /*------------------------------------------------------------------------*/

		    /**
		     * The semantic version number.
		     *
		     * @static
		     * @memberOf _
		     * @type {string}
		     */
		    lodash.VERSION = VERSION;

		    // Assign default placeholders.
		    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
		      lodash[methodName].placeholder = lodash;
		    });

		    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
		    arrayEach(['drop', 'take'], function(methodName, index) {
		      LazyWrapper.prototype[methodName] = function(n) {
		        n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);

		        var result = (this.__filtered__ && !index)
		          ? new LazyWrapper(this)
		          : this.clone();

		        if (result.__filtered__) {
		          result.__takeCount__ = nativeMin(n, result.__takeCount__);
		        } else {
		          result.__views__.push({
		            'size': nativeMin(n, MAX_ARRAY_LENGTH),
		            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
		          });
		        }
		        return result;
		      };

		      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
		        return this.reverse()[methodName](n).reverse();
		      };
		    });

		    // Add `LazyWrapper` methods that accept an `iteratee` value.
		    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
		      var type = index + 1,
		          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

		      LazyWrapper.prototype[methodName] = function(iteratee) {
		        var result = this.clone();
		        result.__iteratees__.push({
		          'iteratee': getIteratee(iteratee, 3),
		          'type': type
		        });
		        result.__filtered__ = result.__filtered__ || isFilter;
		        return result;
		      };
		    });

		    // Add `LazyWrapper` methods for `_.head` and `_.last`.
		    arrayEach(['head', 'last'], function(methodName, index) {
		      var takeName = 'take' + (index ? 'Right' : '');

		      LazyWrapper.prototype[methodName] = function() {
		        return this[takeName](1).value()[0];
		      };
		    });

		    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
		    arrayEach(['initial', 'tail'], function(methodName, index) {
		      var dropName = 'drop' + (index ? '' : 'Right');

		      LazyWrapper.prototype[methodName] = function() {
		        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
		      };
		    });

		    LazyWrapper.prototype.compact = function() {
		      return this.filter(identity);
		    };

		    LazyWrapper.prototype.find = function(predicate) {
		      return this.filter(predicate).head();
		    };

		    LazyWrapper.prototype.findLast = function(predicate) {
		      return this.reverse().find(predicate);
		    };

		    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
		      if (typeof path == 'function') {
		        return new LazyWrapper(this);
		      }
		      return this.map(function(value) {
		        return baseInvoke(value, path, args);
		      });
		    });

		    LazyWrapper.prototype.reject = function(predicate) {
		      return this.filter(negate(getIteratee(predicate)));
		    };

		    LazyWrapper.prototype.slice = function(start, end) {
		      start = toInteger(start);

		      var result = this;
		      if (result.__filtered__ && (start > 0 || end < 0)) {
		        return new LazyWrapper(result);
		      }
		      if (start < 0) {
		        result = result.takeRight(-start);
		      } else if (start) {
		        result = result.drop(start);
		      }
		      if (end !== undefined$1) {
		        end = toInteger(end);
		        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
		      }
		      return result;
		    };

		    LazyWrapper.prototype.takeRightWhile = function(predicate) {
		      return this.reverse().takeWhile(predicate).reverse();
		    };

		    LazyWrapper.prototype.toArray = function() {
		      return this.take(MAX_ARRAY_LENGTH);
		    };

		    // Add `LazyWrapper` methods to `lodash.prototype`.
		    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
		      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
		          isTaker = /^(?:head|last)$/.test(methodName),
		          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
		          retUnwrapped = isTaker || /^find/.test(methodName);

		      if (!lodashFunc) {
		        return;
		      }
		      lodash.prototype[methodName] = function() {
		        var value = this.__wrapped__,
		            args = isTaker ? [1] : arguments,
		            isLazy = value instanceof LazyWrapper,
		            iteratee = args[0],
		            useLazy = isLazy || isArray(value);

		        var interceptor = function(value) {
		          var result = lodashFunc.apply(lodash, arrayPush([value], args));
		          return (isTaker && chainAll) ? result[0] : result;
		        };

		        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
		          // Avoid lazy use if the iteratee has a "length" value other than `1`.
		          isLazy = useLazy = false;
		        }
		        var chainAll = this.__chain__,
		            isHybrid = !!this.__actions__.length,
		            isUnwrapped = retUnwrapped && !chainAll,
		            onlyLazy = isLazy && !isHybrid;

		        if (!retUnwrapped && useLazy) {
		          value = onlyLazy ? value : new LazyWrapper(this);
		          var result = func.apply(value, args);
		          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined$1 });
		          return new LodashWrapper(result, chainAll);
		        }
		        if (isUnwrapped && onlyLazy) {
		          return func.apply(this, args);
		        }
		        result = this.thru(interceptor);
		        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
		      };
		    });

		    // Add `Array` methods to `lodash.prototype`.
		    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
		      var func = arrayProto[methodName],
		          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
		          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

		      lodash.prototype[methodName] = function() {
		        var args = arguments;
		        if (retUnwrapped && !this.__chain__) {
		          var value = this.value();
		          return func.apply(isArray(value) ? value : [], args);
		        }
		        return this[chainName](function(value) {
		          return func.apply(isArray(value) ? value : [], args);
		        });
		      };
		    });

		    // Map minified method names to their real names.
		    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
		      var lodashFunc = lodash[methodName];
		      if (lodashFunc) {
		        var key = lodashFunc.name + '';
		        if (!hasOwnProperty.call(realNames, key)) {
		          realNames[key] = [];
		        }
		        realNames[key].push({ 'name': methodName, 'func': lodashFunc });
		      }
		    });

		    realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
		      'name': 'wrapper',
		      'func': undefined$1
		    }];

		    // Add methods to `LazyWrapper`.
		    LazyWrapper.prototype.clone = lazyClone;
		    LazyWrapper.prototype.reverse = lazyReverse;
		    LazyWrapper.prototype.value = lazyValue;

		    // Add chain sequence methods to the `lodash` wrapper.
		    lodash.prototype.at = wrapperAt;
		    lodash.prototype.chain = wrapperChain;
		    lodash.prototype.commit = wrapperCommit;
		    lodash.prototype.next = wrapperNext;
		    lodash.prototype.plant = wrapperPlant;
		    lodash.prototype.reverse = wrapperReverse;
		    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

		    // Add lazy aliases.
		    lodash.prototype.first = lodash.prototype.head;

		    if (symIterator) {
		      lodash.prototype[symIterator] = wrapperToIterator;
		    }
		    return lodash;
		  });

		  /*--------------------------------------------------------------------------*/

		  // Export lodash.
		  var _ = runInContext();

		  // Some AMD build optimizers, like r.js, check for condition patterns like:
		  if (freeModule) {
		    // Export for Node.js.
		    (freeModule.exports = _)._ = _;
		    // Export for CommonJS support.
		    freeExports._ = _;
		  }
		  else {
		    // Export to the global object.
		    root._ = _;
		  }
		}.call(commonjsGlobal));
} (lodash, lodash.exports));
	return lodash.exports;
}

var logUpdate = {};

var ansiEscapes = {exports: {}};

var hasRequiredAnsiEscapes;

function requireAnsiEscapes () {
	if (hasRequiredAnsiEscapes) return ansiEscapes.exports;
	hasRequiredAnsiEscapes = 1;
	(function (module) {
		const ansiEscapes = module.exports;
		// TODO: remove this in the next major version
		module.exports.default = ansiEscapes;

		const ESC = '\u001B[';
		const OSC = '\u001B]';
		const BEL = '\u0007';
		const SEP = ';';
		const isTerminalApp = process.env.TERM_PROGRAM === 'Apple_Terminal';

		ansiEscapes.cursorTo = (x, y) => {
			if (typeof x !== 'number') {
				throw new TypeError('The `x` argument is required');
			}

			if (typeof y !== 'number') {
				return ESC + (x + 1) + 'G';
			}

			return ESC + (y + 1) + ';' + (x + 1) + 'H';
		};

		ansiEscapes.cursorMove = (x, y) => {
			if (typeof x !== 'number') {
				throw new TypeError('The `x` argument is required');
			}

			let ret = '';

			if (x < 0) {
				ret += ESC + (-x) + 'D';
			} else if (x > 0) {
				ret += ESC + x + 'C';
			}

			if (y < 0) {
				ret += ESC + (-y) + 'A';
			} else if (y > 0) {
				ret += ESC + y + 'B';
			}

			return ret;
		};

		ansiEscapes.cursorUp = (count = 1) => ESC + count + 'A';
		ansiEscapes.cursorDown = (count = 1) => ESC + count + 'B';
		ansiEscapes.cursorForward = (count = 1) => ESC + count + 'C';
		ansiEscapes.cursorBackward = (count = 1) => ESC + count + 'D';

		ansiEscapes.cursorLeft = ESC + 'G';
		ansiEscapes.cursorSavePosition = isTerminalApp ? '\u001B7' : ESC + 's';
		ansiEscapes.cursorRestorePosition = isTerminalApp ? '\u001B8' : ESC + 'u';
		ansiEscapes.cursorGetPosition = ESC + '6n';
		ansiEscapes.cursorNextLine = ESC + 'E';
		ansiEscapes.cursorPrevLine = ESC + 'F';
		ansiEscapes.cursorHide = ESC + '?25l';
		ansiEscapes.cursorShow = ESC + '?25h';

		ansiEscapes.eraseLines = count => {
			let clear = '';

			for (let i = 0; i < count; i++) {
				clear += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : '');
			}

			if (count) {
				clear += ansiEscapes.cursorLeft;
			}

			return clear;
		};

		ansiEscapes.eraseEndLine = ESC + 'K';
		ansiEscapes.eraseStartLine = ESC + '1K';
		ansiEscapes.eraseLine = ESC + '2K';
		ansiEscapes.eraseDown = ESC + 'J';
		ansiEscapes.eraseUp = ESC + '1J';
		ansiEscapes.eraseScreen = ESC + '2J';
		ansiEscapes.scrollUp = ESC + 'S';
		ansiEscapes.scrollDown = ESC + 'T';

		ansiEscapes.clearScreen = '\u001Bc';

		ansiEscapes.clearTerminal = process.platform === 'win32' ?
			`${ansiEscapes.eraseScreen}${ESC}0f` :
			// 1. Erases the screen (Only done in case `2` is not supported)
			// 2. Erases the whole screen including scrollback buffer
			// 3. Moves cursor to the top-left position
			// More info: https://www.real-world-systems.com/docs/ANSIcode.html
			`${ansiEscapes.eraseScreen}${ESC}3J${ESC}H`;

		ansiEscapes.beep = BEL;

		ansiEscapes.link = (text, url) => {
			return [
				OSC,
				'8',
				SEP,
				SEP,
				url,
				BEL,
				text,
				OSC,
				'8',
				SEP,
				SEP,
				BEL
			].join('');
		};

		ansiEscapes.image = (buffer, options = {}) => {
			let ret = `${OSC}1337;File=inline=1`;

			if (options.width) {
				ret += `;width=${options.width}`;
			}

			if (options.height) {
				ret += `;height=${options.height}`;
			}

			if (options.preserveAspectRatio === false) {
				ret += ';preserveAspectRatio=0';
			}

			return ret + ':' + buffer.toString('base64') + BEL;
		};

		ansiEscapes.iTerm = {
			setCwd: (cwd = process.cwd()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,

			annotation: (message, options = {}) => {
				let ret = `${OSC}1337;`;

				const hasX = typeof options.x !== 'undefined';
				const hasY = typeof options.y !== 'undefined';
				if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== 'undefined')) {
					throw new Error('`x`, `y` and `length` must be defined when `x` or `y` is defined');
				}

				message = message.replace(/\|/g, '');

				ret += options.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation=';

				if (options.length > 0) {
					ret +=
							(hasX ?
								[message, options.length, options.x, options.y] :
								[options.length, message]).join('|');
				} else {
					ret += message;
				}

				return ret + BEL;
			}
		};
} (ansiEscapes));
	return ansiEscapes.exports;
}

var cliCursor = {};

var onetime = {exports: {}};

var mimicFn = {exports: {}};

var hasRequiredMimicFn;

function requireMimicFn () {
	if (hasRequiredMimicFn) return mimicFn.exports;
	hasRequiredMimicFn = 1;

	const mimicFn$1 = (to, from) => {
		for (const prop of Reflect.ownKeys(from)) {
			Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
		}

		return to;
	};

	mimicFn.exports = mimicFn$1;
	// TODO: Remove this for the next major release
	mimicFn.exports.default = mimicFn$1;
	return mimicFn.exports;
}

var hasRequiredOnetime;

function requireOnetime () {
	if (hasRequiredOnetime) return onetime.exports;
	hasRequiredOnetime = 1;
	const mimicFn = requireMimicFn();

	const calledFunctions = new WeakMap();

	const onetime$1 = (function_, options = {}) => {
		if (typeof function_ !== 'function') {
			throw new TypeError('Expected a function');
		}

		let returnValue;
		let callCount = 0;
		const functionName = function_.displayName || function_.name || '<anonymous>';

		const onetime = function (...arguments_) {
			calledFunctions.set(onetime, ++callCount);

			if (callCount === 1) {
				returnValue = function_.apply(this, arguments_);
				function_ = null;
			} else if (options.throw === true) {
				throw new Error(`Function \`${functionName}\` can only be called once`);
			}

			return returnValue;
		};

		mimicFn(onetime, function_);
		calledFunctions.set(onetime, callCount);

		return onetime;
	};

	onetime.exports = onetime$1;
	// TODO: Remove this for the next major release
	onetime.exports.default = onetime$1;

	onetime.exports.callCount = function_ => {
		if (!calledFunctions.has(function_)) {
			throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
		}

		return calledFunctions.get(function_);
	};
	return onetime.exports;
}

var signalExit = {exports: {}};

var signals = {exports: {}};

var hasRequiredSignals;

function requireSignals () {
	if (hasRequiredSignals) return signals.exports;
	hasRequiredSignals = 1;
	(function (module) {
		// This is not the set of all possible signals.
		//
		// It IS, however, the set of all signals that trigger
		// an exit on either Linux or BSD systems.  Linux is a
		// superset of the signal names supported on BSD, and
		// the unknown signals just fail to register, so we can
		// catch that easily enough.
		//
		// Don't bother with SIGKILL.  It's uncatchable, which
		// means that we can't fire any callbacks anyway.
		//
		// If a user does happen to register a handler on a non-
		// fatal signal like SIGWINCH or something, and then
		// exit, it'll end up firing `process.emit('exit')`, so
		// the handler will be fired anyway.
		//
		// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
		// artificially, inherently leave the process in a
		// state from which it is not safe to try and enter JS
		// listeners.
		module.exports = [
		  'SIGABRT',
		  'SIGALRM',
		  'SIGHUP',
		  'SIGINT',
		  'SIGTERM'
		];

		if (process.platform !== 'win32') {
		  module.exports.push(
		    'SIGVTALRM',
		    'SIGXCPU',
		    'SIGXFSZ',
		    'SIGUSR2',
		    'SIGTRAP',
		    'SIGSYS',
		    'SIGQUIT',
		    'SIGIOT'
		    // should detect profiler and enable/disable accordingly.
		    // see #21
		    // 'SIGPROF'
		  );
		}

		if (process.platform === 'linux') {
		  module.exports.push(
		    'SIGIO',
		    'SIGPOLL',
		    'SIGPWR',
		    'SIGSTKFLT',
		    'SIGUNUSED'
		  );
		}
} (signals));
	return signals.exports;
}

var hasRequiredSignalExit;

function requireSignalExit () {
	if (hasRequiredSignalExit) return signalExit.exports;
	hasRequiredSignalExit = 1;
	// Note: since nyc uses this module to output coverage, any lines
	// that are in the direct sync flow of nyc's outputCoverage are
	// ignored, since we can never get coverage for them.
	// grab a reference to node's real process object right away
	var process = commonjsGlobal.process;

	const processOk = function (process) {
	  return process &&
	    typeof process === 'object' &&
	    typeof process.removeListener === 'function' &&
	    typeof process.emit === 'function' &&
	    typeof process.reallyExit === 'function' &&
	    typeof process.listeners === 'function' &&
	    typeof process.kill === 'function' &&
	    typeof process.pid === 'number' &&
	    typeof process.on === 'function'
	};

	// some kind of non-node environment, just no-op
	/* istanbul ignore if */
	if (!processOk(process)) {
	  signalExit.exports = function () {
	    return function () {}
	  };
	} else {
	  var assert = require$$0$2;
	  var signals = requireSignals();
	  var isWin = /^win/i.test(process.platform);

	  var EE = require$$2;
	  /* istanbul ignore if */
	  if (typeof EE !== 'function') {
	    EE = EE.EventEmitter;
	  }

	  var emitter;
	  if (process.__signal_exit_emitter__) {
	    emitter = process.__signal_exit_emitter__;
	  } else {
	    emitter = process.__signal_exit_emitter__ = new EE();
	    emitter.count = 0;
	    emitter.emitted = {};
	  }

	  // Because this emitter is a global, we have to check to see if a
	  // previous version of this library failed to enable infinite listeners.
	  // I know what you're about to say.  But literally everything about
	  // signal-exit is a compromise with evil.  Get used to it.
	  if (!emitter.infinite) {
	    emitter.setMaxListeners(Infinity);
	    emitter.infinite = true;
	  }

	  signalExit.exports = function (cb, opts) {
	    /* istanbul ignore if */
	    if (!processOk(commonjsGlobal.process)) {
	      return function () {}
	    }
	    assert.equal(typeof cb, 'function', 'a callback must be provided for exit handler');

	    if (loaded === false) {
	      load();
	    }

	    var ev = 'exit';
	    if (opts && opts.alwaysLast) {
	      ev = 'afterexit';
	    }

	    var remove = function () {
	      emitter.removeListener(ev, cb);
	      if (emitter.listeners('exit').length === 0 &&
	          emitter.listeners('afterexit').length === 0) {
	        unload();
	      }
	    };
	    emitter.on(ev, cb);

	    return remove
	  };

	  var unload = function unload () {
	    if (!loaded || !processOk(commonjsGlobal.process)) {
	      return
	    }
	    loaded = false;

	    signals.forEach(function (sig) {
	      try {
	        process.removeListener(sig, sigListeners[sig]);
	      } catch (er) {}
	    });
	    process.emit = originalProcessEmit;
	    process.reallyExit = originalProcessReallyExit;
	    emitter.count -= 1;
	  };
	  signalExit.exports.unload = unload;

	  var emit = function emit (event, code, signal) {
	    /* istanbul ignore if */
	    if (emitter.emitted[event]) {
	      return
	    }
	    emitter.emitted[event] = true;
	    emitter.emit(event, code, signal);
	  };

	  // { <signal>: <listener fn>, ... }
	  var sigListeners = {};
	  signals.forEach(function (sig) {
	    sigListeners[sig] = function listener () {
	      /* istanbul ignore if */
	      if (!processOk(commonjsGlobal.process)) {
	        return
	      }
	      // If there are no other listeners, an exit is coming!
	      // Simplest way: remove us and then re-send the signal.
	      // We know that this will kill the process, so we can
	      // safely emit now.
	      var listeners = process.listeners(sig);
	      if (listeners.length === emitter.count) {
	        unload();
	        emit('exit', null, sig);
	        /* istanbul ignore next */
	        emit('afterexit', null, sig);
	        /* istanbul ignore next */
	        if (isWin && sig === 'SIGHUP') {
	          // "SIGHUP" throws an `ENOSYS` error on Windows,
	          // so use a supported signal instead
	          sig = 'SIGINT';
	        }
	        /* istanbul ignore next */
	        process.kill(process.pid, sig);
	      }
	    };
	  });

	  signalExit.exports.signals = function () {
	    return signals
	  };

	  var loaded = false;

	  var load = function load () {
	    if (loaded || !processOk(commonjsGlobal.process)) {
	      return
	    }
	    loaded = true;

	    // This is the number of onSignalExit's that are in play.
	    // It's important so that we can count the correct number of
	    // listeners on signals, and don't wait for the other one to
	    // handle it instead of us.
	    emitter.count += 1;

	    signals = signals.filter(function (sig) {
	      try {
	        process.on(sig, sigListeners[sig]);
	        return true
	      } catch (er) {
	        return false
	      }
	    });

	    process.emit = processEmit;
	    process.reallyExit = processReallyExit;
	  };
	  signalExit.exports.load = load;

	  var originalProcessReallyExit = process.reallyExit;
	  var processReallyExit = function processReallyExit (code) {
	    /* istanbul ignore if */
	    if (!processOk(commonjsGlobal.process)) {
	      return
	    }
	    process.exitCode = code || /* istanbul ignore next */ 0;
	    emit('exit', process.exitCode, null);
	    /* istanbul ignore next */
	    emit('afterexit', process.exitCode, null);
	    /* istanbul ignore next */
	    originalProcessReallyExit.call(process, process.exitCode);
	  };

	  var originalProcessEmit = process.emit;
	  var processEmit = function processEmit (ev, arg) {
	    if (ev === 'exit' && processOk(commonjsGlobal.process)) {
	      /* istanbul ignore else */
	      if (arg !== undefined) {
	        process.exitCode = arg;
	      }
	      var ret = originalProcessEmit.apply(this, arguments);
	      /* istanbul ignore next */
	      emit('exit', process.exitCode, null);
	      /* istanbul ignore next */
	      emit('afterexit', process.exitCode, null);
	      /* istanbul ignore next */
	      return ret
	    } else {
	      return originalProcessEmit.apply(this, arguments)
	    }
	  };
	}
	return signalExit.exports;
}

var restoreCursor;
var hasRequiredRestoreCursor;

function requireRestoreCursor () {
	if (hasRequiredRestoreCursor) return restoreCursor;
	hasRequiredRestoreCursor = 1;
	const onetime = requireOnetime();
	const signalExit = requireSignalExit();

	restoreCursor = onetime(() => {
		signalExit(() => {
			process.stderr.write('\u001B[?25h');
		}, {alwaysLast: true});
	});
	return restoreCursor;
}

var hasRequiredCliCursor;

function requireCliCursor () {
	if (hasRequiredCliCursor) return cliCursor;
	hasRequiredCliCursor = 1;
	(function (exports) {
		const restoreCursor = requireRestoreCursor();

		let isHidden = false;

		exports.show = (writableStream = process.stderr) => {
			if (!writableStream.isTTY) {
				return;
			}

			isHidden = false;
			writableStream.write('\u001B[?25h');
		};

		exports.hide = (writableStream = process.stderr) => {
			if (!writableStream.isTTY) {
				return;
			}

			restoreCursor();
			isHidden = true;
			writableStream.write('\u001B[?25l');
		};

		exports.toggle = (force, writableStream) => {
			if (force !== undefined) {
				isHidden = force;
			}

			if (isHidden) {
				exports.show(writableStream);
			} else {
				exports.hide(writableStream);
			}
		};
} (cliCursor));
	return cliCursor;
}

var hasRequiredLogUpdate;

function requireLogUpdate () {
	if (hasRequiredLogUpdate) return logUpdate;
	hasRequiredLogUpdate = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(logUpdate, "__esModule", { value: true });
	const ansi_escapes_1 = __importDefault(requireAnsiEscapes());
	const cli_cursor_1 = __importDefault(requireCliCursor());
	const create = (stream, { showCursor = false } = {}) => {
	    let previousLineCount = 0;
	    let previousOutput = '';
	    let hasHiddenCursor = false;
	    const render = (str) => {
	        if (!showCursor && !hasHiddenCursor) {
	            cli_cursor_1.default.hide();
	            hasHiddenCursor = true;
	        }
	        const output = str + '\n';
	        if (output === previousOutput) {
	            return;
	        }
	        previousOutput = output;
	        stream.write(ansi_escapes_1.default.eraseLines(previousLineCount) + output);
	        previousLineCount = output.split('\n').length;
	    };
	    render.clear = () => {
	        stream.write(ansi_escapes_1.default.eraseLines(previousLineCount));
	        previousOutput = '';
	        previousLineCount = 0;
	    };
	    render.done = () => {
	        previousOutput = '';
	        previousLineCount = 0;
	        if (!showCursor) {
	            cli_cursor_1.default.show();
	            hasHiddenCursor = false;
	        }
	    };
	    return render;
	};
	logUpdate.default = { create };
	
	return logUpdate;
}

var ciInfo = {};

var require$$0$1 = [
	{
		name: "AppVeyor",
		constant: "APPVEYOR",
		env: "APPVEYOR",
		pr: "APPVEYOR_PULL_REQUEST_NUMBER"
	},
	{
		name: "Azure Pipelines",
		constant: "AZURE_PIPELINES",
		env: "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI",
		pr: "SYSTEM_PULLREQUEST_PULLREQUESTID"
	},
	{
		name: "Bamboo",
		constant: "BAMBOO",
		env: "bamboo_planKey"
	},
	{
		name: "Bitbucket Pipelines",
		constant: "BITBUCKET",
		env: "BITBUCKET_COMMIT",
		pr: "BITBUCKET_PR_ID"
	},
	{
		name: "Bitrise",
		constant: "BITRISE",
		env: "BITRISE_IO",
		pr: "BITRISE_PULL_REQUEST"
	},
	{
		name: "Buddy",
		constant: "BUDDY",
		env: "BUDDY_WORKSPACE_ID",
		pr: "BUDDY_EXECUTION_PULL_REQUEST_ID"
	},
	{
		name: "Buildkite",
		constant: "BUILDKITE",
		env: "BUILDKITE",
		pr: {
			env: "BUILDKITE_PULL_REQUEST",
			ne: "false"
		}
	},
	{
		name: "CircleCI",
		constant: "CIRCLE",
		env: "CIRCLECI",
		pr: "CIRCLE_PULL_REQUEST"
	},
	{
		name: "Cirrus CI",
		constant: "CIRRUS",
		env: "CIRRUS_CI",
		pr: "CIRRUS_PR"
	},
	{
		name: "AWS CodeBuild",
		constant: "CODEBUILD",
		env: "CODEBUILD_BUILD_ARN"
	},
	{
		name: "Codeship",
		constant: "CODESHIP",
		env: {
			CI_NAME: "codeship"
		}
	},
	{
		name: "Drone",
		constant: "DRONE",
		env: "DRONE",
		pr: {
			DRONE_BUILD_EVENT: "pull_request"
		}
	},
	{
		name: "dsari",
		constant: "DSARI",
		env: "DSARI"
	},
	{
		name: "GitLab CI",
		constant: "GITLAB",
		env: "GITLAB_CI"
	},
	{
		name: "GoCD",
		constant: "GOCD",
		env: "GO_PIPELINE_LABEL"
	},
	{
		name: "Hudson",
		constant: "HUDSON",
		env: "HUDSON_URL"
	},
	{
		name: "Jenkins",
		constant: "JENKINS",
		env: [
			"JENKINS_URL",
			"BUILD_ID"
		],
		pr: {
			any: [
				"ghprbPullId",
				"CHANGE_ID"
			]
		}
	},
	{
		name: "Magnum CI",
		constant: "MAGNUM",
		env: "MAGNUM"
	},
	{
		name: "Netlify CI",
		constant: "NETLIFY",
		env: "NETLIFY_BUILD_BASE",
		pr: {
			env: "PULL_REQUEST",
			ne: "false"
		}
	},
	{
		name: "Sail CI",
		constant: "SAIL",
		env: "SAILCI",
		pr: "SAIL_PULL_REQUEST_NUMBER"
	},
	{
		name: "Semaphore",
		constant: "SEMAPHORE",
		env: "SEMAPHORE",
		pr: "PULL_REQUEST_NUMBER"
	},
	{
		name: "Shippable",
		constant: "SHIPPABLE",
		env: "SHIPPABLE",
		pr: {
			IS_PULL_REQUEST: "true"
		}
	},
	{
		name: "Solano CI",
		constant: "SOLANO",
		env: "TDDIUM",
		pr: "TDDIUM_PR_ID"
	},
	{
		name: "Strider CD",
		constant: "STRIDER",
		env: "STRIDER"
	},
	{
		name: "TaskCluster",
		constant: "TASKCLUSTER",
		env: [
			"TASK_ID",
			"RUN_ID"
		]
	},
	{
		name: "TeamCity",
		constant: "TEAMCITY",
		env: "TEAMCITY_VERSION"
	},
	{
		name: "Travis CI",
		constant: "TRAVIS",
		env: "TRAVIS",
		pr: {
			env: "TRAVIS_PULL_REQUEST",
			ne: "false"
		}
	}
];

var hasRequiredCiInfo;

function requireCiInfo () {
	if (hasRequiredCiInfo) return ciInfo;
	hasRequiredCiInfo = 1;
	(function (exports) {

		var vendors = require$$0$1;

		var env = process.env;

		// Used for testing only
		Object.defineProperty(exports, '_vendors', {
		  value: vendors.map(function (v) { return v.constant })
		});

		exports.name = null;
		exports.isPR = null;

		vendors.forEach(function (vendor) {
		  var envs = Array.isArray(vendor.env) ? vendor.env : [vendor.env];
		  var isCI = envs.every(function (obj) {
		    return checkEnv(obj)
		  });

		  exports[vendor.constant] = isCI;

		  if (isCI) {
		    exports.name = vendor.name;

		    switch (typeof vendor.pr) {
		      case 'string':
		        // "pr": "CIRRUS_PR"
		        exports.isPR = !!env[vendor.pr];
		        break
		      case 'object':
		        if ('env' in vendor.pr) {
		          // "pr": { "env": "BUILDKITE_PULL_REQUEST", "ne": "false" }
		          exports.isPR = vendor.pr.env in env && env[vendor.pr.env] !== vendor.pr.ne;
		        } else if ('any' in vendor.pr) {
		          // "pr": { "any": ["ghprbPullId", "CHANGE_ID"] }
		          exports.isPR = vendor.pr.any.some(function (key) {
		            return !!env[key]
		          });
		        } else {
		          // "pr": { "DRONE_BUILD_EVENT": "pull_request" }
		          exports.isPR = checkEnv(vendor.pr);
		        }
		        break
		      default:
		        // PR detection not supported for this vendor
		        exports.isPR = null;
		    }
		  }
		});

		exports.isCI = !!(
		  env.CI || // Travis CI, CircleCI, Cirrus CI, Gitlab CI, Appveyor, CodeShip, dsari
		  env.CONTINUOUS_INTEGRATION || // Travis CI, Cirrus CI
		  env.BUILD_NUMBER || // Jenkins, TeamCity
		  env.RUN_ID || // TaskCluster, dsari
		  exports.name ||
		  false
		);

		function checkEnv (obj) {
		  if (typeof obj === 'string') return !!env[obj]
		  return Object.keys(obj).every(function (k) {
		    return env[k] === obj[k]
		  })
		}
} (ciInfo));
	return ciInfo;
}

var isCi;
var hasRequiredIsCi;

function requireIsCi () {
	if (hasRequiredIsCi) return isCi;
	hasRequiredIsCi = 1;

	isCi = requireCiInfo().isCI;
	return isCi;
}

var autoBind;
var hasRequiredAutoBind;

function requireAutoBind () {
	if (hasRequiredAutoBind) return autoBind;
	hasRequiredAutoBind = 1;

	// Gets all non-builtin properties up the prototype chain
	const getAllProperties = object => {
		const properties = new Set();

		do {
			for (const key of Reflect.ownKeys(object)) {
				properties.add([object, key]);
			}
		} while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);

		return properties;
	};

	autoBind = (self, {include, exclude} = {}) => {
		const filter = key => {
			const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);

			if (include) {
				return include.some(match);
			}

			if (exclude) {
				return !exclude.some(match);
			}

			return true;
		};

		for (const [object, key] of getAllProperties(self.constructor.prototype)) {
			if (key === 'constructor' || !filter(key)) {
				continue;
			}

			const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
			if (descriptor && typeof descriptor.value === 'function') {
				self[key] = self[key].bind(self);
			}
		}

		return self;
	};
	return autoBind;
}

var reconciler = {};

var scheduler = {exports: {}};

var scheduler_production_min = {};

/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredScheduler_production_min;

function requireScheduler_production_min () {
	if (hasRequiredScheduler_production_min) return scheduler_production_min;
	hasRequiredScheduler_production_min = 1;
	(function (exports) {
var f,g,h,k;if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()};}else {var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q};}
		if("undefined"===typeof window||"function"!==typeof MessageChannel){var t=null,u=null,w=function(){if(null!==t)try{var a=exports.unstable_now();t(!0,a);t=null;}catch(b){throw setTimeout(w,0),b;}};f=function(a){null!==t?setTimeout(f,0,a):(t=a,setTimeout(w,0));};g=function(a,b){u=setTimeout(a,b);};h=function(){clearTimeout(u);};exports.unstable_shouldYield=function(){return !1};k=exports.unstable_forceFrameRate=function(){};}else {var x=window.setTimeout,y=window.clearTimeout;if("undefined"!==typeof console){var z=
		window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");"function"!==typeof z&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");}var A=!1,B=null,C=-1,D=5,E=0;exports.unstable_shouldYield=function(){return exports.unstable_now()>=
		E};k=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<a?Math.floor(1E3/a):5;};var F=new MessageChannel,G=F.port2;F.port1.onmessage=function(){if(null!==B){var a=exports.unstable_now();E=a+D;try{B(!0,a)?G.postMessage(null):(A=!1,B=null);}catch(b){throw G.postMessage(null),b;}}else A=!1;};f=function(a){B=a;A||(A=!0,G.postMessage(null));};g=function(a,b){C=
		x(function(){a(exports.unstable_now());},b);};h=function(){y(C);C=-1;};}function H(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<I(e,b))a[d]=b,a[c]=e,c=d;else break a}}function J(a){a=a[0];return void 0===a?null:a}
		function K(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>I(n,c))void 0!==r&&0>I(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>I(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function I(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var L=[],M=[],N=1,O=null,P=3,Q=!1,R=!1,S=!1;
		function T(a){for(var b=J(M);null!==b;){if(null===b.callback)K(M);else if(b.startTime<=a)K(M),b.sortIndex=b.expirationTime,H(L,b);else break;b=J(M);}}function U(a){S=!1;T(a);if(!R)if(null!==J(L))R=!0,f(V);else {var b=J(M);null!==b&&g(U,b.startTime-a);}}
		function V(a,b){R=!1;S&&(S=!1,h());Q=!0;var c=P;try{T(b);for(O=J(L);null!==O&&(!(O.expirationTime>b)||a&&!exports.unstable_shouldYield());){var d=O.callback;if("function"===typeof d){O.callback=null;P=O.priorityLevel;var e=d(O.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?O.callback=e:O===J(L)&&K(L);T(b);}else K(L);O=J(L);}if(null!==O)var m=!0;else {var n=J(M);null!==n&&g(U,n.startTime-b);m=!1;}return m}finally{O=null,P=c,Q=!1;}}var W=k;exports.unstable_IdlePriority=5;
		exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null;};exports.unstable_continueExecution=function(){R||Q||(R=!0,f(V));};exports.unstable_getCurrentPriorityLevel=function(){return P};exports.unstable_getFirstCallbackNode=function(){return J(L)};
		exports.unstable_next=function(a){switch(P){case 1:case 2:case 3:var b=3;break;default:b=P;}var c=P;P=b;try{return a()}finally{P=c;}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=W;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3;}var c=P;P=a;try{return b()}finally{P=c;}};
		exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3;}e=c+e;a={id:N++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,H(M,a),null===J(L)&&a===J(M)&&(S?h():S=!0,g(U,c-d))):(a.sortIndex=e,H(L,a),R||Q||(R=!0,f(V)));return a};
		exports.unstable_wrapCallback=function(a){var b=P;return function(){var c=P;P=b;try{return a.apply(this,arguments)}finally{P=c;}}};
} (scheduler_production_min));
	return scheduler_production_min;
}

var hasRequiredScheduler;

function requireScheduler () {
	if (hasRequiredScheduler) return scheduler.exports;
	hasRequiredScheduler = 1;
	(function (module) {

		{
		  module.exports = requireScheduler_production_min();
		}
} (scheduler));
	return scheduler.exports;
}

var reactReconciler = {exports: {}};

var reactReconciler_production_min = {exports: {}};

/** @license React v0.26.2
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactReconciler_production_min;

function requireReactReconciler_production_min () {
	if (hasRequiredReactReconciler_production_min) return reactReconciler_production_min.exports;
	hasRequiredReactReconciler_production_min = 1;
	(function (module) {
		module.exports = function $$$reconciler($$$hostConfig) {
		    var exports = {};
var aa=requireObjectAssign(),ba=requireReact(),m=requireScheduler();function q(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
		var ca=ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,da=60103,ea=60106,fa=60107,ha=60108,ia=60114,ja=60109,ka=60110,la=60112,ma=60113,na=60120,oa=60115,pa=60116,qa=60121,ra=60129,sa=60130,ta=60131;
		if("function"===typeof Symbol&&Symbol.for){var r=Symbol.for;da=r("react.element");ea=r("react.portal");fa=r("react.fragment");ha=r("react.strict_mode");ia=r("react.profiler");ja=r("react.provider");ka=r("react.context");la=r("react.forward_ref");ma=r("react.suspense");na=r("react.suspense_list");oa=r("react.memo");pa=r("react.lazy");qa=r("react.block");r("react.scope");ra=r("react.debug_trace_mode");sa=r("react.offscreen");ta=r("react.legacy_hidden");}var ua="function"===typeof Symbol&&Symbol.iterator;
		function va(a){if(null===a||"object"!==typeof a)return null;a=ua&&a[ua]||a["@@iterator"];return "function"===typeof a?a:null}
		function wa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case fa:return "Fragment";case ea:return "Portal";case ia:return "Profiler";case ha:return "StrictMode";case ma:return "Suspense";case na:return "SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case ka:return (a.displayName||"Context")+".Consumer";case ja:return (a._context.displayName||"Context")+".Provider";case la:var b=a.render;b=b.displayName||b.name||"";
		return a.displayName||(""!==b?"ForwardRef("+b+")":"ForwardRef");case oa:return wa(a.type);case qa:return wa(a._render);case pa:b=a._payload;a=a._init;try{return wa(a(b))}catch(c){}}return null}function xa(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else {a=b;do b=a,0!==(b.flags&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function ya(a){if(xa(a)!==a)throw Error(q(188));}
		function za(a){var b=a.alternate;if(!b){b=xa(a);if(null===b)throw Error(q(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return ya(e),a;if(f===d)return ya(e),b;f=f.sibling;}throw Error(q(188));}if(c.return!==d.return)c=e,d=f;else {for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling;}if(!g){for(h=f.child;h;){if(h===
		c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling;}if(!g)throw Error(q(189));}}if(c.alternate!==d)throw Error(q(190));}if(3!==c.tag)throw Error(q(188));return c.stateNode.current===c?a:b}function Aa(a){a=za(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else {if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return null}
		function Ba(a){a=za(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child&&4!==b.tag)b.child.return=b,b=b.child;else {if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return null}function Ca(a,b){for(var c=a.alternate;null!==b;){if(b===a||b===c)return !0;b=b.return;}return !1}
		var Da=$$$hostConfig.getPublicInstance,Ea=$$$hostConfig.getRootHostContext,Fa=$$$hostConfig.getChildHostContext,Ga=$$$hostConfig.prepareForCommit,Ha=$$$hostConfig.resetAfterCommit,Ia=$$$hostConfig.createInstance,Ja=$$$hostConfig.appendInitialChild,Ka=$$$hostConfig.finalizeInitialChildren,La=$$$hostConfig.prepareUpdate,Ma=$$$hostConfig.shouldSetTextContent,Na=$$$hostConfig.createTextInstance,Pa=$$$hostConfig.scheduleTimeout,Qa=$$$hostConfig.cancelTimeout,Ra=$$$hostConfig.noTimeout,Sa=$$$hostConfig.isPrimaryRenderer,
		Ta=$$$hostConfig.supportsMutation,Ua=$$$hostConfig.supportsPersistence,Va=$$$hostConfig.supportsHydration,Wa=$$$hostConfig.getInstanceFromNode,Xa=$$$hostConfig.makeOpaqueHydratingObject,Ya=$$$hostConfig.makeClientId,Za=$$$hostConfig.beforeActiveInstanceBlur,$a=$$$hostConfig.afterActiveInstanceBlur,ab=$$$hostConfig.preparePortalMount,bb=$$$hostConfig.supportsTestSelectors,cb=$$$hostConfig.findFiberRoot,db=$$$hostConfig.getBoundingRect,eb=$$$hostConfig.getTextContent,fb=$$$hostConfig.isHiddenSubtree,
		gb=$$$hostConfig.matchAccessibilityRole,hb=$$$hostConfig.setFocusIfFocusable,ib=$$$hostConfig.setupIntersectionObserver,jb=$$$hostConfig.appendChild,kb=$$$hostConfig.appendChildToContainer,lb=$$$hostConfig.commitTextUpdate,mb=$$$hostConfig.commitMount,nb=$$$hostConfig.commitUpdate,ob=$$$hostConfig.insertBefore,pb=$$$hostConfig.insertInContainerBefore,qb=$$$hostConfig.removeChild,rb=$$$hostConfig.removeChildFromContainer,sb=$$$hostConfig.resetTextContent,tb=$$$hostConfig.hideInstance,ub=$$$hostConfig.hideTextInstance,
		vb=$$$hostConfig.unhideInstance,wb=$$$hostConfig.unhideTextInstance,xb=$$$hostConfig.clearContainer,yb=$$$hostConfig.cloneInstance,zb=$$$hostConfig.createContainerChildSet,Ab=$$$hostConfig.appendChildToContainerChildSet,Bb=$$$hostConfig.finalizeContainerChildren,Cb=$$$hostConfig.replaceContainerChildren,Db=$$$hostConfig.cloneHiddenInstance,Eb=$$$hostConfig.cloneHiddenTextInstance,Fb=$$$hostConfig.canHydrateInstance,Gb=$$$hostConfig.canHydrateTextInstance,Hb=$$$hostConfig.isSuspenseInstancePending,
		Ib=$$$hostConfig.isSuspenseInstanceFallback,Jb=$$$hostConfig.getNextHydratableSibling,Kb=$$$hostConfig.getFirstHydratableChild,Lb=$$$hostConfig.hydrateInstance,Mb=$$$hostConfig.hydrateTextInstance,Nb=$$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance,Ob=$$$hostConfig.commitHydratedContainer,Pb=$$$hostConfig.commitHydratedSuspenseInstance,Qb;function Rb(a){if(void 0===Qb)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);Qb=b&&b[1]||"";}return "\n"+Qb+a}var Sb=!1;
		function Tb(a,b){if(!a||Sb)return "";Sb=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[]);}catch(k){var d=k;}Reflect.construct(a,[],b);}else {try{b.call();}catch(k){d=k;}a.call(b.prototype);}else {try{throw Error();}catch(k){d=k;}a();}}catch(k){if(k&&d&&"string"===typeof k.stack){for(var e=k.stack.split("\n"),
		f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h])return "\n"+e[g].replace(" at new "," at ");while(1<=g&&0<=h)}break}}}finally{Sb=!1,Error.prepareStackTrace=c;}return (a=a?a.displayName||a.name:"")?Rb(a):""}var Ub=[],Vb=-1;function Wb(a){return {current:a}}function z(a){0>Vb||(a.current=Ub[Vb],Ub[Vb]=null,Vb--);}function A(a,b){Vb++;Ub[Vb]=a.current;a.current=b;}
		var Xb={},B=Wb(Xb),D=Wb(!1),Yb=Xb;function Zb(a,b){var c=a.type.contextTypes;if(!c)return Xb;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function E(a){a=a.childContextTypes;return null!==a&&void 0!==a}function $b(){z(D);z(B);}
		function ac(a,b,c){if(B.current!==Xb)throw Error(q(168));A(B,b);A(D,c);}function bc(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(q(108,wa(b)||"Unknown",e));return aa({},c,d)}function cc(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Xb;Yb=B.current;A(B,a);A(D,D.current);return !0}
		function dc(a,b,c){var d=a.stateNode;if(!d)throw Error(q(169));c?(a=bc(a,b,Yb),d.__reactInternalMemoizedMergedChildContext=a,z(D),z(B),A(B,a)):z(D);A(D,c);}var ec=null,fc=null,gc=m.unstable_now;gc();var hc=0,F=8;
		function ic(a){if(0!==(1&a))return F=15,1;if(0!==(2&a))return F=14,2;if(0!==(4&a))return F=13,4;var b=24&a;if(0!==b)return F=12,b;if(0!==(a&32))return F=11,32;b=192&a;if(0!==b)return F=10,b;if(0!==(a&256))return F=9,256;b=3584&a;if(0!==b)return F=8,b;if(0!==(a&4096))return F=7,4096;b=4186112&a;if(0!==b)return F=6,b;b=62914560&a;if(0!==b)return F=5,b;if(a&67108864)return F=4,67108864;if(0!==(a&134217728))return F=3,134217728;b=805306368&a;if(0!==b)return F=2,b;if(0!==(1073741824&a))return F=1,1073741824;
		F=8;return a}function jc(a){switch(a){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}function kc(a){switch(a){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(q(358,a));}}
		function lc(a,b){var c=a.pendingLanes;if(0===c)return F=0;var d=0,e=0,f=a.expiredLanes,g=a.suspendedLanes,h=a.pingedLanes;if(0!==f)d=f,e=F=15;else if(f=c&134217727,0!==f){var k=f&~g;0!==k?(d=ic(k),e=F):(h&=f,0!==h&&(d=ic(h),e=F));}else f=c&~g,0!==f?(d=ic(f),e=F):0!==h&&(d=ic(h),e=F);if(0===d)return 0;d=31-mc(d);d=c&((0>d?0:1<<d)<<1)-1;if(0!==b&&b!==d&&0===(b&g)){ic(b);if(e<=F)return b;F=e;}b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-mc(b),e=1<<c,d|=a[c],b&=~e;return d}
		function nc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function oc(a,b){switch(a){case 15:return 1;case 14:return 2;case 12:return a=pc(24&~b),0===a?oc(10,b):a;case 10:return a=pc(192&~b),0===a?oc(8,b):a;case 8:return a=pc(3584&~b),0===a&&(a=pc(4186112&~b),0===a&&(a=512)),a;case 2:return b=pc(805306368&~b),0===b&&(b=268435456),b}throw Error(q(358,a));}function pc(a){return a&-a}function qc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
		function rc(a,b,c){a.pendingLanes|=b;var d=b-1;a.suspendedLanes&=d;a.pingedLanes&=d;a=a.eventTimes;b=31-mc(b);a[b]=c;}var mc=Math.clz32?Math.clz32:sc,tc=Math.log,uc=Math.LN2;function sc(a){return 0===a?32:31-(tc(a)/uc|0)|0}
		var vc=m.unstable_runWithPriority,wc=m.unstable_scheduleCallback,xc=m.unstable_cancelCallback,yc=m.unstable_shouldYield,zc=m.unstable_requestPaint,Ac=m.unstable_now,Bc=m.unstable_getCurrentPriorityLevel,Cc=m.unstable_ImmediatePriority,Dc=m.unstable_UserBlockingPriority,Ec=m.unstable_NormalPriority,Fc=m.unstable_LowPriority,Gc=m.unstable_IdlePriority,Hc={},Ic=void 0!==zc?zc:function(){},Jc=null,Kc=null,Lc=!1,Mc=Ac(),G=1E4>Mc?Ac:function(){return Ac()-Mc};
		function Nc(){switch(Bc()){case Cc:return 99;case Dc:return 98;case Ec:return 97;case Fc:return 96;case Gc:return 95;default:throw Error(q(332));}}function Oc(a){switch(a){case 99:return Cc;case 98:return Dc;case 97:return Ec;case 96:return Fc;case 95:return Gc;default:throw Error(q(332));}}function Pc(a,b){a=Oc(a);return vc(a,b)}function Qc(a,b,c){a=Oc(a);return wc(a,b,c)}function H(){if(null!==Kc){var a=Kc;Kc=null;xc(a);}Rc();}
		function Rc(){if(!Lc&&null!==Jc){Lc=!0;var a=0;try{var b=Jc;Pc(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});Jc=null;}catch(c){throw null!==Jc&&(Jc=Jc.slice(a+1)),wc(Cc,H),c;}finally{Lc=!1;}}}var Sc=ca.ReactCurrentBatchConfig;function Tc(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var I="function"===typeof Object.is?Object.is:Tc,Uc=Object.prototype.hasOwnProperty;
		function Vc(a,b){if(I(a,b))return !0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return !1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return !1;for(d=0;d<c.length;d++)if(!Uc.call(b,c[d])||!I(a[c[d]],b[c[d]]))return !1;return !0}
		function Wc(a){switch(a.tag){case 5:return Rb(a.type);case 16:return Rb("Lazy");case 13:return Rb("Suspense");case 19:return Rb("SuspenseList");case 0:case 2:case 15:return a=Tb(a.type,!1),a;case 11:return a=Tb(a.type.render,!1),a;case 22:return a=Tb(a.type._render,!1),a;case 1:return a=Tb(a.type,!0),a;default:return ""}}function Xc(a,b){if(a&&a.defaultProps){b=aa({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var Yc=Wb(null),Zc=null,$c=null,ad=null;
		function bd(){ad=$c=Zc=null;}function cd(a,b){a=a.type._context;Sa?(A(Yc,a._currentValue),a._currentValue=b):(A(Yc,a._currentValue2),a._currentValue2=b);}function dd(a){var b=Yc.current;z(Yc);a=a.type._context;Sa?a._currentValue=b:a._currentValue2=b;}function ed(a,b){for(;null!==a;){var c=a.alternate;if((a.childLanes&b)===b)if(null===c||(c.childLanes&b)===b)break;else c.childLanes|=b;else a.childLanes|=b,null!==c&&(c.childLanes|=b);a=a.return;}}
		function fd(a,b){Zc=a;ad=$c=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(gd=!0),a.firstContext=null);}function J(a,b){if(ad!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)ad=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===$c){if(null===Zc)throw Error(q(308));$c=b;Zc.dependencies={lanes:0,firstContext:b,responders:null};}else $c=$c.next=b;}return Sa?a._currentValue:a._currentValue2}var hd=!1;
		function id(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null};}function jd(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects});}function kd(a,b){return {eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
		function md(a,b){a=a.updateQueue;if(null!==a){a=a.shared;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b;}}
		function nd(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next;}while(null!==c);null===f?e=f=b:f=f.next=b;}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
		b;c.lastBaseUpdate=b;}
		function od(a,b,c,d){var e=a.updateQueue;hd=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var n=a.alternate;if(null!==n){n=n.updateQueue;var t=n.lastBaseUpdate;t!==g&&(null===t?n.firstBaseUpdate=l:t.next=l,n.lastBaseUpdate=k);}}if(null!==f){t=e.baseState;g=0;n=l=k=null;do{h=f.lane;var p=f.eventTime;if((d&h)===h){null!==n&&(n=n.next={eventTime:p,lane:0,tag:f.tag,payload:f.payload,callback:f.callback,
		next:null});a:{var y=a,x=f;h=b;p=c;switch(x.tag){case 1:y=x.payload;if("function"===typeof y){t=y.call(p,t,h);break a}t=y;break a;case 3:y.flags=y.flags&-4097|64;case 0:y=x.payload;h="function"===typeof y?y.call(p,t,h):y;if(null===h||void 0===h)break a;t=aa({},t,h);break a;case 2:hd=!0;}}null!==f.callback&&(a.flags|=32,h=e.effects,null===h?e.effects=[f]:h.push(f));}else p={eventTime:p,lane:h,tag:f.tag,payload:f.payload,callback:f.callback,next:null},null===n?(l=n=p,k=t):n=n.next=p,g|=h;f=f.next;if(null===
		f)if(h=e.shared.pending,null===h)break;else f=h.next,h.next=null,e.lastBaseUpdate=h,e.shared.pending=null;}while(1);null===n&&(k=t);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=n;pd|=g;a.lanes=g;a.memoizedState=t;}}function qd(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(q(191,e));e.call(d);}}}var rd=(new ba.Component).refs;
		function sd(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:aa({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c);}
		var vd={isMounted:function(a){return (a=a._reactInternals)?xa(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=K(),e=td(a),f=kd(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);md(a,f);ud(a,e,d);},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=K(),e=td(a),f=kd(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);md(a,f);ud(a,e,d);},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=K(),d=td(a),e=kd(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=
		b);md(a,e);ud(a,d,c);}};function wd(a,b,c,d,e,f,g){a=a.stateNode;return "function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Vc(c,d)||!Vc(e,f):!0}
		function xd(a,b,c){var d=!1,e=Xb;var f=b.contextType;"object"===typeof f&&null!==f?f=J(f):(e=E(b)?Yb:B.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Zb(a,e):Xb);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=vd;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
		function yd(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&vd.enqueueReplaceState(b,b.state,null);}
		function zd(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=rd;id(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=J(f):(f=E(b)?Yb:B.current,e.context=Zb(a,f));od(a,c,e,d);e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(sd(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||
		(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&vd.enqueueReplaceState(e,e.state,null),od(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4);}var Ad=Array.isArray;
		function Bd(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(q(309));var d=c.stateNode;}if(!d)throw Error(q(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===rd&&(b=d.refs={});null===a?delete b[e]:b[e]=a;};b._stringRef=e;return b}if("string"!==typeof a)throw Error(q(284));if(!c._owner)throw Error(q(290,a));}return a}
		function Cd(a,b){if("textarea"!==a.type)throw Error(q(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b));}
		function Dd(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.flags=8;}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Ed(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags=2,
		c):d;b.flags=2;return c}function g(b){a&&null===b.alternate&&(b.flags=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Fd(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props),d.ref=Bd(a,b,c),d.return=a,d;d=Gd(c.type,c.key,c.props,null,a.mode,d);d.ref=Bd(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
		Hd(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function n(a,b,c,d,f){if(null===b||7!==b.tag)return b=Id(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function t(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Fd(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case da:return c=Gd(b.type,b.key,b.props,null,a.mode,c),c.ref=Bd(a,null,b),c.return=a,c;case ea:return b=Hd(b,a.mode,c),b.return=a,b}if(Ad(b)||va(b))return b=Id(b,
		a.mode,c,null),b.return=a,b;Cd(a,b);}return null}function p(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case da:return c.key===e?c.type===fa?n(a,b,c.props.children,d,e):k(a,b,c,d):null;case ea:return c.key===e?l(a,b,c,d):null}if(Ad(c)||va(c))return null!==e?null:n(a,b,c,d,null);Cd(a,c);}return null}function y(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||
		null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case da:return a=a.get(null===d.key?c:d.key)||null,d.type===fa?n(b,a,d.props.children,e,d.key):k(b,a,d,e);case ea:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Ad(d)||va(d))return a=a.get(c)||null,n(b,a,d,e,null);Cd(b,d);}return null}function x(e,g,h,k){for(var l=null,v=null,u=g,C=g=0,n=null;null!==u&&C<h.length;C++){u.index>C?(n=u,u=null):n=u.sibling;var w=p(e,u,h[C],k);if(null===w){null===u&&(u=n);break}a&&u&&null===
		w.alternate&&b(e,u);g=f(w,g,C);null===v?l=w:v.sibling=w;v=w;u=n;}if(C===h.length)return c(e,u),l;if(null===u){for(;C<h.length;C++)u=t(e,h[C],k),null!==u&&(g=f(u,g,C),null===v?l=u:v.sibling=u,v=u);return l}for(u=d(e,u);C<h.length;C++)n=y(u,e,C,h[C],k),null!==n&&(a&&null!==n.alternate&&u.delete(null===n.key?C:n.key),g=f(n,g,C),null===v?l=n:v.sibling=n,v=n);a&&u.forEach(function(a){return b(e,a)});return l}function Y(e,g,h,k){var l=va(h);if("function"!==typeof l)throw Error(q(150));h=l.call(h);if(null==
		h)throw Error(q(151));for(var u=l=null,v=g,n=g=0,C=null,w=h.next();null!==v&&!w.done;n++,w=h.next()){v.index>n?(C=v,v=null):C=v.sibling;var x=p(e,v,w.value,k);if(null===x){null===v&&(v=C);break}a&&v&&null===x.alternate&&b(e,v);g=f(x,g,n);null===u?l=x:u.sibling=x;u=x;v=C;}if(w.done)return c(e,v),l;if(null===v){for(;!w.done;n++,w=h.next())w=t(e,w.value,k),null!==w&&(g=f(w,g,n),null===u?l=w:u.sibling=w,u=w);return l}for(v=d(e,v);!w.done;n++,w=h.next())w=y(v,e,n,w.value,k),null!==w&&(a&&null!==w.alternate&&
		v.delete(null===w.key?n:w.key),g=f(w,g,n),null===u?l=w:u.sibling=w,u=w);a&&v.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===fa&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case da:a:{l=f.key;for(k=d;null!==k;){if(k.key===l){switch(k.tag){case 7:if(f.type===fa){c(a,k.sibling);d=e(k,f.props.children);d.return=a;a=d;break a}break;default:if(k.elementType===f.type){c(a,k.sibling);
		d=e(k,f.props);d.ref=Bd(a,k,f);d.return=a;a=d;break a}}c(a,k);break}else b(a,k);k=k.sibling;}f.type===fa?(d=Id(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Gd(f.type,f.key,f.props,null,a.mode,h),h.ref=Bd(a,d,f),h.return=a,a=h);}return g(a);case ea:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else {c(a,d);break}else b(a,d);d=d.sibling;}d=
		Hd(f,a.mode,h);d.return=a;a=d;}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Fd(f,a.mode,h),d.return=a,a=d),g(a);if(Ad(f))return x(a,d,f,h);if(va(f))return Y(a,d,f,h);l&&Cd(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 22:case 0:case 11:case 15:throw Error(q(152,wa(a.type)||"Component"));}return c(a,d)}}var Jd=Dd(!0),Kd=Dd(!1),Ld={},L=Wb(Ld),Md=Wb(Ld),Nd=Wb(Ld);
		function Od(a){if(a===Ld)throw Error(q(174));return a}function Pd(a,b){A(Nd,b);A(Md,a);A(L,Ld);a=Ea(b);z(L);A(L,a);}function Qd(){z(L);z(Md);z(Nd);}function Rd(a){var b=Od(Nd.current),c=Od(L.current);b=Fa(c,a.type,b);c!==b&&(A(Md,a),A(L,b));}function Sd(a){Md.current===a&&(z(L),z(Md));}var M=Wb(0);
		function Td(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||Hb(c)||Ib(c)))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}return null}var Ud=null,Vd=null,Wd=!1;
		function Xd(a,b){var c=Yd(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.flags=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c;}function Zd(a,b){switch(a.tag){case 5:return b=Fb(b,a.type,a.pendingProps),null!==b?(a.stateNode=b,!0):!1;case 6:return b=Gb(b,a.pendingProps),null!==b?(a.stateNode=b,!0):!1;case 13:return !1;default:return !1}}
		function $d(a){if(Wd){var b=Vd;if(b){var c=b;if(!Zd(a,b)){b=Jb(c);if(!b||!Zd(a,b)){a.flags=a.flags&-1025|2;Wd=!1;Ud=a;return}Xd(Ud,c);}Ud=a;Vd=Kb(b);}else a.flags=a.flags&-1025|2,Wd=!1,Ud=a;}}function ae(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;Ud=a;}
		function be(a){if(!Va||a!==Ud)return !1;if(!Wd)return ae(a),Wd=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!Ma(b,a.memoizedProps))for(b=Vd;b;)Xd(a,b),b=Jb(b);ae(a);if(13===a.tag){if(!Va)throw Error(q(316));a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(q(317));Vd=Nb(a);}else Vd=Ud?Jb(a.stateNode):null;return !0}function ce(){Va&&(Vd=Ud=null,Wd=!1);}var de=[];
		function ee(){for(var a=0;a<de.length;a++){var b=de[a];Sa?b._workInProgressVersionPrimary=null:b._workInProgressVersionSecondary=null;}de.length=0;}var fe=ca.ReactCurrentDispatcher,ge=ca.ReactCurrentBatchConfig,he=0,N=null,O=null,P=null,ie=!1,je=!1;function Q(){throw Error(q(321));}function ke(a,b){if(null===b)return !1;for(var c=0;c<b.length&&c<a.length;c++)if(!I(a[c],b[c]))return !1;return !0}
		function le(a,b,c,d,e,f){he=f;N=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;fe.current=null===a||null===a.memoizedState?me:ne;a=c(d,e);if(je){f=0;do{je=!1;if(!(25>f))throw Error(q(301));f+=1;P=O=null;b.updateQueue=null;fe.current=oe;a=c(d,e);}while(je)}fe.current=pe;b=null!==O&&null!==O.next;he=0;P=O=N=null;ie=!1;if(b)throw Error(q(300));return a}function qe(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===P?N.memoizedState=P=a:P=P.next=a;return P}
		function re(){if(null===O){var a=N.alternate;a=null!==a?a.memoizedState:null;}else a=O.next;var b=null===P?N.memoizedState:P.next;if(null!==b)P=b,O=a;else {if(null===a)throw Error(q(310));O=a;a={memoizedState:O.memoizedState,baseState:O.baseState,baseQueue:O.baseQueue,queue:O.queue,next:null};null===P?N.memoizedState=P=a:P=P.next=a;}return P}function se(a,b){return "function"===typeof b?b(a):b}
		function te(a){var b=re(),c=b.queue;if(null===c)throw Error(q(311));c.lastRenderedReducer=a;var d=O,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g;}d.baseQueue=e=f;c.pending=null;}if(null!==e){e=e.next;d=d.baseState;var h=g=f=null,k=e;do{var l=k.lane;if((he&l)===l)null!==h&&(h=h.next={lane:0,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null}),d=k.eagerReducer===a?k.eagerState:a(d,k.action);else {var n={lane:l,action:k.action,eagerReducer:k.eagerReducer,
		eagerState:k.eagerState,next:null};null===h?(g=h=n,f=d):h=h.next=n;N.lanes|=l;pd|=l;}k=k.next;}while(null!==k&&k!==e);null===h?f=d:h.next=g;I(d,b.memoizedState)||(gd=!0);b.memoizedState=d;b.baseState=f;b.baseQueue=h;c.lastRenderedState=d;}return [b.memoizedState,c.dispatch]}
		function ue(a){var b=re(),c=b.queue;if(null===c)throw Error(q(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);I(f,b.memoizedState)||(gd=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f;}return [f,d]}
		function ve(a,b,c){var d=b._getVersion;d=d(b._source);var e=Sa?b._workInProgressVersionPrimary:b._workInProgressVersionSecondary;if(null!==e)a=e===d;else if(a=a.mutableReadLanes,a=(he&a)===a)Sa?b._workInProgressVersionPrimary=d:b._workInProgressVersionSecondary=d,de.push(b);if(a)return c(b._source);de.push(b);throw Error(q(350));}
		function we(a,b,c,d){var e=R;if(null===e)throw Error(q(349));var f=b._getVersion,g=f(b._source),h=fe.current,k=h.useState(function(){return ve(e,b,c)}),l=k[1],n=k[0];k=P;var t=a.memoizedState,p=t.refs,y=p.getSnapshot,x=t.source;t=t.subscribe;var Y=N;a.memoizedState={refs:p,source:b,subscribe:d};h.useEffect(function(){p.getSnapshot=c;p.setSnapshot=l;var a=f(b._source);if(!I(g,a)){a=c(b._source);I(n,a)||(l(a),a=td(Y),e.mutableReadLanes|=a&e.pendingLanes);a=e.mutableReadLanes;e.entangledLanes|=a;for(var d=
		e.entanglements,h=a;0<h;){var k=31-mc(h),t=1<<k;d[k]|=a;h&=~t;}}},[c,b,d]);h.useEffect(function(){return d(b._source,function(){var a=p.getSnapshot,c=p.setSnapshot;try{c(a(b._source));var d=td(Y);e.mutableReadLanes|=d&e.pendingLanes;}catch(Oa){c(function(){throw Oa;});}})},[b,d]);I(y,c)&&I(x,b)&&I(t,d)||(a={pending:null,dispatch:null,lastRenderedReducer:se,lastRenderedState:n},a.dispatch=l=xe.bind(null,N,a),k.queue=a,k.baseQueue=null,n=ve(e,b,c),k.memoizedState=k.baseState=n);return n}
		function ye(a,b,c){var d=re();return we(d,a,b,c)}function ze(a){var b=qe();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={pending:null,dispatch:null,lastRenderedReducer:se,lastRenderedState:a};a=a.dispatch=xe.bind(null,N,a);return [b.memoizedState,a]}
		function Ae(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=N.updateQueue;null===b?(b={lastEffect:null},N.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Be(a){var b=qe();a={current:a};return b.memoizedState=a}function Ce(){return re().memoizedState}function De(a,b,c,d){var e=qe();N.flags|=a;e.memoizedState=Ae(1|b,c,void 0,void 0===d?null:d);}
		function Ee(a,b,c,d){var e=re();d=void 0===d?null:d;var f=void 0;if(null!==O){var g=O.memoizedState;f=g.destroy;if(null!==d&&ke(d,g.deps)){Ae(b,c,f,d);return}}N.flags|=a;e.memoizedState=Ae(1|b,c,f,d);}function Fe(a,b){return De(516,4,a,b)}function Ge(a,b){return Ee(516,4,a,b)}function He(a,b){return Ee(4,2,a,b)}function Ie(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null);};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null;}}
		function Je(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Ee(4,2,Ie.bind(null,b,a),c)}function Ke(){}function Le(a,b){var c=re();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&ke(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function Me(a,b){var c=re();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&ke(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}
		function Ne(a,b){var c=Nc();Pc(98>c?98:c,function(){a(!0);});Pc(97<c?97:c,function(){var c=ge.transition;ge.transition=1;try{a(!1),b();}finally{ge.transition=c;}});}
		function xe(a,b,c){var d=K(),e=td(a),f={lane:e,action:c,eagerReducer:null,eagerState:null,next:null},g=b.pending;null===g?f.next=f:(f.next=g.next,g.next=f);b.pending=f;g=a.alternate;if(a===N||null!==g&&g===N)je=ie=!0;else {if(0===a.lanes&&(null===g||0===g.lanes)&&(g=b.lastRenderedReducer,null!==g))try{var h=b.lastRenderedState,k=g(h,c);f.eagerReducer=g;f.eagerState=k;if(I(k,h))return}catch(l){}finally{}ud(a,e,d);}}
		var pe={readContext:J,useCallback:Q,useContext:Q,useEffect:Q,useImperativeHandle:Q,useLayoutEffect:Q,useMemo:Q,useReducer:Q,useRef:Q,useState:Q,useDebugValue:Q,useDeferredValue:Q,useTransition:Q,useMutableSource:Q,useOpaqueIdentifier:Q,unstable_isNewReconciler:!1},me={readContext:J,useCallback:function(a,b){qe().memoizedState=[a,void 0===b?null:b];return a},useContext:J,useEffect:Fe,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return De(4,2,Ie.bind(null,b,a),c)},useLayoutEffect:function(a,
		b){return De(4,2,a,b)},useMemo:function(a,b){var c=qe();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=qe();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={pending:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=xe.bind(null,N,a);return [d.memoizedState,a]},useRef:Be,useState:ze,useDebugValue:Ke,useDeferredValue:function(a){var b=ze(a),c=b[0],d=b[1];Fe(function(){var b=ge.transition;ge.transition=1;try{d(a);}finally{ge.transition=
		b;}},[a]);return c},useTransition:function(){var a=ze(!1),b=a[0];a=Ne.bind(null,a[1]);Be(a);return [a,b]},useMutableSource:function(a,b,c){var d=qe();d.memoizedState={refs:{getSnapshot:b,setSnapshot:null},source:a,subscribe:c};return we(d,a,b,c)},useOpaqueIdentifier:function(){if(Wd){var a=!1,b=Xa(function(){a||(a=!0,c(Ya()));throw Error(q(355));}),c=ze(b)[1];0===(N.mode&2)&&(N.flags|=516,Ae(5,function(){c(Ya());},void 0,null));return b}b=Ya();ze(b);return b},unstable_isNewReconciler:!1},ne={readContext:J,
		useCallback:Le,useContext:J,useEffect:Ge,useImperativeHandle:Je,useLayoutEffect:He,useMemo:Me,useReducer:te,useRef:Ce,useState:function(){return te(se)},useDebugValue:Ke,useDeferredValue:function(a){var b=te(se),c=b[0],d=b[1];Ge(function(){var b=ge.transition;ge.transition=1;try{d(a);}finally{ge.transition=b;}},[a]);return c},useTransition:function(){var a=te(se)[0];return [Ce().current,a]},useMutableSource:ye,useOpaqueIdentifier:function(){return te(se)[0]},unstable_isNewReconciler:!1},oe={readContext:J,
		useCallback:Le,useContext:J,useEffect:Ge,useImperativeHandle:Je,useLayoutEffect:He,useMemo:Me,useReducer:ue,useRef:Ce,useState:function(){return ue(se)},useDebugValue:Ke,useDeferredValue:function(a){var b=ue(se),c=b[0],d=b[1];Ge(function(){var b=ge.transition;ge.transition=1;try{d(a);}finally{ge.transition=b;}},[a]);return c},useTransition:function(){var a=ue(se)[0];return [Ce().current,a]},useMutableSource:ye,useOpaqueIdentifier:function(){return ue(se)[0]},unstable_isNewReconciler:!1},Oe=ca.ReactCurrentOwner,
		gd=!1;function S(a,b,c,d){b.child=null===a?Kd(b,null,c,d):Jd(b,a.child,c,d);}function Pe(a,b,c,d,e){c=c.render;var f=b.ref;fd(b,e);d=le(a,b,c,d,f,e);if(null!==a&&!gd)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,Re(a,b,e);b.flags|=1;S(a,b,d,e);return b.child}
		function Se(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!Te(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,Ue(a,b,g,d,e,f);a=Gd(c.type,null,d,b,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(0===(e&f)&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:Vc,c(e,d)&&a.ref===b.ref))return Re(a,b,f);b.flags|=1;a=Ed(g,d);a.ref=b.ref;a.return=b;return b.child=a}
		function Ue(a,b,c,d,e,f){if(null!==a&&Vc(a.memoizedProps,d)&&a.ref===b.ref)if(gd=!1,0!==(f&e))0!==(a.flags&16384)&&(gd=!0);else return b.lanes=a.lanes,Re(a,b,f);return Ve(a,b,c,d,f)}
		function We(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode||"unstable-defer-without-hiding"===d.mode)if(0===(b.mode&4))b.memoizedState={baseLanes:0},Xe(b,c);else if(0!==(c&1073741824))b.memoizedState={baseLanes:0},Xe(b,null!==f?f.baseLanes:c);else return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a},Xe(b,a),null;else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,Xe(b,d);S(a,b,e,c);return b.child}
		function Ye(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=128;}function Ve(a,b,c,d,e){var f=E(c)?Yb:B.current;f=Zb(b,f);fd(b,e);c=le(a,b,c,d,f,e);if(null!==a&&!gd)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,Re(a,b,e);b.flags|=1;S(a,b,c,e);return b.child}
		function Ze(a,b,c,d,e){if(E(c)){var f=!0;cc(b);}else f=!1;fd(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),xd(b,c,d),zd(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=J(l):(l=E(c)?Yb:B.current,l=Zb(b,l));var n=c.getDerivedStateFromProps,t="function"===typeof n||"function"===typeof g.getSnapshotBeforeUpdate;t||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==
		typeof g.componentWillReceiveProps||(h!==d||k!==l)&&yd(b,g,d,l);hd=!1;var p=b.memoizedState;g.state=p;od(b,d,g,e);k=b.memoizedState;h!==d||p!==k||D.current||hd?("function"===typeof n&&(sd(b,c,n,d),k=b.memoizedState),(h=hd||wd(b,c,h,d,p,k,l))?(t||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&
		(b.flags|=4)):("function"===typeof g.componentDidMount&&(b.flags|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4),d=!1);}else {g=b.stateNode;jd(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:Xc(b.type,h);g.props=l;t=b.pendingProps;p=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=J(k):(k=E(c)?Yb:B.current,k=Zb(b,k));var y=c.getDerivedStateFromProps;(n="function"===typeof y||"function"===typeof g.getSnapshotBeforeUpdate)||
		"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==t||p!==k)&&yd(b,g,d,k);hd=!1;p=b.memoizedState;g.state=p;od(b,d,g,e);var x=b.memoizedState;h!==t||p!==x||D.current||hd?("function"===typeof y&&(sd(b,c,y,d),x=b.memoizedState),(l=hd||wd(b,c,l,d,p,x,k))?(n||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&
		g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&p===a.memoizedState||
		(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),d=!1);}return $e(a,b,c,d,f,e)}function $e(a,b,c,d,e,f){Ye(a,b);var g=0!==(b.flags&64);if(!d&&!g)return e&&dc(b,c,!1),Re(a,b,f);d=b.stateNode;Oe.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Jd(b,a.child,null,f),b.child=Jd(b,null,h,f)):S(a,b,h,f);b.memoizedState=d.state;e&&dc(b,c,!0);return b.child}
		function af(a){var b=a.stateNode;b.pendingContext?ac(a,b.pendingContext,b.pendingContext!==b.context):b.context&&ac(a,b.context,!1);Pd(a,b.containerInfo);}var bf={dehydrated:null,retryLane:0};
		function cf(a,b,c){var d=b.pendingProps,e=M.current,f=!1,g;(g=0!==(b.flags&64))||(g=null!==a&&null===a.memoizedState?!1:0!==(e&2));g?(f=!0,b.flags&=-65):null!==a&&null===a.memoizedState||void 0===d.fallback||!0===d.unstable_avoidThisFallback||(e|=1);A(M,e&1);if(null===a){void 0!==d.fallback&&$d(b);a=d.children;e=d.fallback;if(f)return a=df(b,a,e,c),b.child.memoizedState={baseLanes:c},b.memoizedState=bf,a;if("number"===typeof d.unstable_expectedLoadTime)return a=df(b,a,e,c),b.child.memoizedState={baseLanes:c},
		b.memoizedState=bf,b.lanes=33554432,a;c=ef({mode:"visible",children:a},b.mode,c,null);c.return=b;return b.child=c}if(null!==a.memoizedState){if(f)return d=ff(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=bf,d;c=gf(a,b,d.children,c);b.memoizedState=null;return c}if(f)return d=ff(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:
		{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=bf,d;c=gf(a,b,d.children,c);b.memoizedState=null;return c}function df(a,b,c,d){var e=a.mode,f=a.child;b={mode:"hidden",children:b};0===(e&2)&&null!==f?(f.childLanes=0,f.pendingProps=b):f=ef(b,e,0,null);c=Id(c,e,d,null);f.return=a;c.return=a;f.sibling=c;a.child=f;return c}
		function gf(a,b,c,d){var e=a.child;a=e.sibling;c=Ed(e,{mode:"visible",children:c});0===(b.mode&2)&&(c.lanes=d);c.return=b;c.sibling=null;null!==a&&(a.nextEffect=null,a.flags=8,b.firstEffect=b.lastEffect=a);return b.child=c}
		function ff(a,b,c,d,e){var f=b.mode,g=a.child;a=g.sibling;var h={mode:"hidden",children:c};0===(f&2)&&b.child!==g?(c=b.child,c.childLanes=0,c.pendingProps=h,g=c.lastEffect,null!==g?(b.firstEffect=c.firstEffect,b.lastEffect=g,g.nextEffect=null):b.firstEffect=b.lastEffect=null):c=Ed(g,h);null!==a?d=Ed(a,d):(d=Id(d,f,e,null),d.flags|=2);d.return=b;c.return=b;c.sibling=d;b.child=c;return d}function hf(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);ed(a.return,b);}
		function jf(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.renderingStartTime=0,g.last=d,g.tail=c,g.tailMode=e,g.lastEffect=f);}
		function kf(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;S(a,b,d.children,c);d=M.current;if(0!==(d&2))d=d&1|2,b.flags|=64;else {if(null!==a&&0!==(a.flags&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&hf(a,c);else if(19===a.tag)hf(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return;}a.sibling.return=a.return;a=a.sibling;}d&=1;}A(M,d);if(0===(b.mode&2))b.memoizedState=
		null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===Td(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);jf(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===Td(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a;}jf(b,!0,c,null,f,b.lastEffect);break;case "together":jf(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null;}return b.child}
		function Re(a,b,c){null!==a&&(b.dependencies=a.dependencies);pd|=b.lanes;if(0!==(c&b.childLanes)){if(null!==a&&b.child!==a.child)throw Error(q(153));if(null!==b.child){a=b.child;c=Ed(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Ed(a,a.pendingProps),c.return=b;c.sibling=null;}return b.child}return null}function lf(a){a.flags|=4;}var mf,nf,of,pf;
		if(Ta)mf=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)Ja(a,c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}},nf=function(){},of=function(a,b,c,d,e){a=a.memoizedProps;if(a!==d){var f=b.stateNode,g=Od(L.current);c=La(f,c,a,d,e,g);(b.updateQueue=c)&&lf(b);}},pf=function(a,b,c,d){c!==d&&lf(b);};else if(Ua){mf=function(a,
		b,c,d){for(var e=b.child;null!==e;){if(5===e.tag){var f=e.stateNode;c&&d&&(f=Db(f,e.type,e.memoizedProps,e));Ja(a,f);}else if(6===e.tag)f=e.stateNode,c&&d&&(f=Eb(f,e.memoizedProps,e)),Ja(a,f);else if(4!==e.tag){if(13===e.tag&&0!==(e.flags&4)&&(f=null!==e.memoizedState)){var g=e.child;if(null!==g&&(null!==g.child&&(g.child.return=g,mf(a,g,!0,f)),f=g.sibling,null!==f)){f.return=e;e=f;continue}}if(null!==e.child){e.child.return=e;e=e.child;continue}}if(e===b)break;for(;null===e.sibling;){if(null===e.return||
		e.return===b)return;e=e.return;}e.sibling.return=e.return;e=e.sibling;}};var qf=function(a,b,c,d){for(var e=b.child;null!==e;){if(5===e.tag){var f=e.stateNode;c&&d&&(f=Db(f,e.type,e.memoizedProps,e));Ab(a,f);}else if(6===e.tag)f=e.stateNode,c&&d&&(f=Eb(f,e.memoizedProps,e)),Ab(a,f);else if(4!==e.tag){if(13===e.tag&&0!==(e.flags&4)&&(f=null!==e.memoizedState)){var g=e.child;if(null!==g&&(null!==g.child&&(g.child.return=g,qf(a,g,!0,f)),f=g.sibling,null!==f)){f.return=e;e=f;continue}}if(null!==e.child){e.child.return=
		e;e=e.child;continue}}if(e===b)break;for(;null===e.sibling;){if(null===e.return||e.return===b)return;e=e.return;}e.sibling.return=e.return;e=e.sibling;}};nf=function(a){var b=a.stateNode;if(null!==a.firstEffect){var c=b.containerInfo,d=zb(c);qf(d,a,!1,!1);b.pendingChildren=d;lf(a);Bb(c,d);}};of=function(a,b,c,d,e){var f=a.stateNode,g=a.memoizedProps;if((a=null===b.firstEffect)&&g===d)b.stateNode=f;else {var h=b.stateNode,k=Od(L.current),l=null;g!==d&&(l=La(h,c,g,d,e,k));a&&null===l?b.stateNode=f:(f=yb(f,
		l,c,g,d,b,a,h),Ka(f,c,d,e,k)&&lf(b),b.stateNode=f,a?lf(b):mf(f,b,!1,!1));}};pf=function(a,b,c,d){c!==d?(a=Od(Nd.current),c=Od(L.current),b.stateNode=Na(d,a,c,b),lf(b)):b.stateNode=a.stateNode;};}else nf=function(){},of=function(){},pf=function(){};
		function rf(a,b){if(!Wd)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null;}}
		function sf(a,b,c){var d=b.pendingProps;switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return E(b.type)&&$b(),null;case 3:Qd();z(D);z(B);ee();d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)be(b)?lf(b):d.hydrate||(b.flags|=256);nf(b);return null;case 5:Sd(b);var e=Od(Nd.current);c=b.type;if(null!==a&&null!=b.stateNode)of(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=128);else {if(!d){if(null===
		b.stateNode)throw Error(q(166));return null}a=Od(L.current);if(be(b)){if(!Va)throw Error(q(175));a=Lb(b.stateNode,b.type,b.memoizedProps,e,a,b);b.updateQueue=a;null!==a&&lf(b);}else {var f=Ia(c,d,e,a,b);mf(f,b,!1,!1);b.stateNode=f;Ka(f,c,d,e,a)&&lf(b);}null!==b.ref&&(b.flags|=128);}return null;case 6:if(a&&null!=b.stateNode)pf(a,b,a.memoizedProps,d);else {if("string"!==typeof d&&null===b.stateNode)throw Error(q(166));a=Od(Nd.current);e=Od(L.current);if(be(b)){if(!Va)throw Error(q(176));Mb(b.stateNode,
		b.memoizedProps,b)&&lf(b);}else b.stateNode=Na(d,a,e,b);}return null;case 13:z(M);d=b.memoizedState;if(0!==(b.flags&64))return b.lanes=c,b;d=null!==d;e=!1;null===a?void 0!==b.memoizedProps.fallback&&be(b):e=null!==a.memoizedState;if(d&&!e&&0!==(b.mode&2))if(null===a&&!0!==b.memoizedProps.unstable_avoidThisFallback||0!==(M.current&1))0===T&&(T=3);else {if(0===T||3===T)T=4;null===R||0===(pd&134217727)&&0===(tf&134217727)||uf(R,U);}Ua&&d&&(b.flags|=4);Ta&&(d||e)&&(b.flags|=4);return null;case 4:return Qd(),
		nf(b),null===a&&ab(b.stateNode.containerInfo),null;case 10:return dd(b),null;case 17:return E(b.type)&&$b(),null;case 19:z(M);d=b.memoizedState;if(null===d)return null;e=0!==(b.flags&64);f=d.rendering;if(null===f)if(e)rf(d,!1);else {if(0!==T||null!==a&&0!==(a.flags&64))for(a=b.child;null!==a;){f=Td(a);if(null!==f){b.flags|=64;rf(d,!1);a=f.updateQueue;null!==a&&(b.updateQueue=a,b.flags|=4);null===d.lastEffect&&(b.firstEffect=null);b.lastEffect=d.lastEffect;a=c;for(d=b.child;null!==d;)e=d,c=a,e.flags&=
		2,e.nextEffect=null,e.firstEffect=null,e.lastEffect=null,f=e.alternate,null===f?(e.childLanes=0,e.lanes=c,e.child=null,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=f.childLanes,e.lanes=f.lanes,e.child=f.child,e.memoizedProps=f.memoizedProps,e.memoizedState=f.memoizedState,e.updateQueue=f.updateQueue,e.type=f.type,c=f.dependencies,e.dependencies=null===c?null:{lanes:c.lanes,firstContext:c.firstContext}),d=d.sibling;A(M,M.current&1|
		2);return b.child}a=a.sibling;}null!==d.tail&&G()>vf&&(b.flags|=64,e=!0,rf(d,!1),b.lanes=33554432);}else {if(!e)if(a=Td(f),null!==a){if(b.flags|=64,e=!0,a=a.updateQueue,null!==a&&(b.updateQueue=a,b.flags|=4),rf(d,!0),null===d.tail&&"hidden"===d.tailMode&&!f.alternate&&!Wd)return b=b.lastEffect=d.lastEffect,null!==b&&(b.nextEffect=null),null}else 2*G()-d.renderingStartTime>vf&&1073741824!==c&&(b.flags|=64,e=!0,rf(d,!1),b.lanes=33554432);d.isBackwards?(f.sibling=b.child,b.child=f):(a=d.last,null!==a?a.sibling=
		f:b.child=f,d.last=f);}return null!==d.tail?(a=d.tail,d.rendering=a,d.tail=a.sibling,d.lastEffect=b.lastEffect,d.renderingStartTime=G(),a.sibling=null,b=M.current,A(M,e?b&1|2:b&1),a):null;case 23:case 24:return wf(),null!==a&&null!==a.memoizedState!==(null!==b.memoizedState)&&"unstable-defer-without-hiding"!==d.mode&&(b.flags|=4),null}throw Error(q(156,b.tag));}
		function xf(a){switch(a.tag){case 1:E(a.type)&&$b();var b=a.flags;return b&4096?(a.flags=b&-4097|64,a):null;case 3:Qd();z(D);z(B);ee();b=a.flags;if(0!==(b&64))throw Error(q(285));a.flags=b&-4097|64;return a;case 5:return Sd(a),null;case 13:return z(M),b=a.flags,b&4096?(a.flags=b&-4097|64,a):null;case 19:return z(M),null;case 4:return Qd(),null;case 10:return dd(a),null;case 23:case 24:return wf(),null;default:return null}}
		function yf(a,b){try{var c="",d=b;do c+=Wc(d),d=d.return;while(d);var e=c;}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack;}return {value:a,source:b,stack:e}}function zf(a,b){try{console.error(b.value);}catch(c){setTimeout(function(){throw c;});}}var Af="function"===typeof WeakMap?WeakMap:Map;function Bf(a,b,c){c=kd(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Cf||(Cf=!0,Df=d);zf(a,b);};return c}
		function Ef(a,b,c){c=kd(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){zf(a,b);return d(e)};}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Ff?Ff=new Set([this]):Ff.add(this),zf(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""});});return c}var Gf="function"===typeof WeakSet?WeakSet:Set;
		function Hf(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null);}catch(c){If(a,c);}else b.current=null;}
		function Jf(a,b){switch(b.tag){case 0:case 11:case 15:case 22:return;case 1:if(b.flags&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:Xc(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b;}return;case 3:Ta&&b.flags&256&&xb(b.stateNode.containerInfo);return;case 5:case 6:case 4:case 17:return}throw Error(q(163));}
		function Kf(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.destroy;c.destroy=void 0;void 0!==d&&d();}c=c.next;}while(c!==b)}}
		function Lf(a,b,c){switch(c.tag){case 0:case 11:case 15:case 22:b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{if(3===(a.tag&3)){var d=a.create;a.destroy=d();}a=a.next;}while(a!==b)}b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{var e=a;d=e.next;e=e.tag;0!==(e&4)&&0!==(e&1)&&(Mf(c,a),Nf(c,a));a=d;}while(a!==b)}return;case 1:a=c.stateNode;c.flags&4&&(null===b?a.componentDidMount():(d=c.elementType===c.type?b.memoizedProps:Xc(c.type,b.memoizedProps),a.componentDidUpdate(d,
		b.memoizedState,a.__reactInternalSnapshotBeforeUpdate)));b=c.updateQueue;null!==b&&qd(c,b,a);return;case 3:b=c.updateQueue;if(null!==b){a=null;if(null!==c.child)switch(c.child.tag){case 5:a=Da(c.child.stateNode);break;case 1:a=c.child.stateNode;}qd(c,b,a);}return;case 5:a=c.stateNode;null===b&&c.flags&4&&mb(a,c.type,c.memoizedProps,c);return;case 6:return;case 4:return;case 12:return;case 13:Va&&null===c.memoizedState&&(c=c.alternate,null!==c&&(c=c.memoizedState,null!==c&&(c=c.dehydrated,null!==c&&
		Pb(c))));return;case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(q(163));}
		function Of(a,b){if(Ta)for(var c=a;;){if(5===c.tag){var d=c.stateNode;b?tb(d):vb(c.stateNode,c.memoizedProps);}else if(6===c.tag)d=c.stateNode,b?ub(d):wb(d,c.memoizedProps);else if((23!==c.tag&&24!==c.tag||null===c.memoizedState||c===a)&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===a)break;for(;null===c.sibling;){if(null===c.return||c.return===a)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}}
		function Pf(a,b){if(fc&&"function"===typeof fc.onCommitFiberUnmount)try{fc.onCommitFiberUnmount(ec,b);}catch(f){}switch(b.tag){case 0:case 11:case 14:case 15:case 22:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var c=a=a.next;do{var d=c,e=d.destroy;d=d.tag;if(void 0!==e)if(0!==(d&4))Mf(b,c);else {d=b;try{e();}catch(f){If(d,f);}}c=c.next;}while(c!==a)}break;case 1:Hf(b);a=b.stateNode;if("function"===typeof a.componentWillUnmount)try{a.props=b.memoizedProps,a.state=b.memoizedState,a.componentWillUnmount();}catch(f){If(b,
		f);}break;case 5:Hf(b);break;case 4:Ta?Qf(a,b):Ua&&Ua&&(b=b.stateNode.containerInfo,a=zb(b),Cb(b,a));}}function Rf(a,b){for(var c=b;;)if(Pf(a,c),null===c.child||Ta&&4===c.tag){if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}else c.child.return=c,c=c.child;}
		function Sf(a){a.alternate=null;a.child=null;a.dependencies=null;a.firstEffect=null;a.lastEffect=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.return=null;a.updateQueue=null;}function Tf(a){return 5===a.tag||3===a.tag||4===a.tag}
		function Uf(a){if(Ta){a:{for(var b=a.return;null!==b;){if(Tf(b))break a;b=b.return;}throw Error(q(160));}var c=b;b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(q(161));}c.flags&16&&(sb(b),c.flags&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||Tf(c.return)){c=null;break a}c=c.return;}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.flags&2)continue b;if(null===
		c.child||4===c.tag)continue b;else c.child.return=c,c=c.child;}if(!(c.flags&2)){c=c.stateNode;break a}}d?Vf(a,c,b):Wf(a,c,b);}}function Vf(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?pb(c,a,b):kb(c,a);else if(4!==d&&(a=a.child,null!==a))for(Vf(a,b,c),a=a.sibling;null!==a;)Vf(a,b,c),a=a.sibling;}
		function Wf(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?ob(c,a,b):jb(c,a);else if(4!==d&&(a=a.child,null!==a))for(Wf(a,b,c),a=a.sibling;null!==a;)Wf(a,b,c),a=a.sibling;}
		function Qf(a,b){for(var c=b,d=!1,e,f;;){if(!d){d=c.return;a:for(;;){if(null===d)throw Error(q(160));e=d.stateNode;switch(d.tag){case 5:f=!1;break a;case 3:e=e.containerInfo;f=!0;break a;case 4:e=e.containerInfo;f=!0;break a}d=d.return;}d=!0;}if(5===c.tag||6===c.tag)Rf(a,c),f?rb(e,c.stateNode):qb(e,c.stateNode);else if(4===c.tag){if(null!==c.child){e=c.stateNode.containerInfo;f=!0;c.child.return=c;c=c.child;continue}}else if(Pf(a,c),null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;
		for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;4===c.tag&&(d=!1);}c.sibling.return=c.return;c=c.sibling;}}
		function Xf(a,b){if(Ta){switch(b.tag){case 0:case 11:case 14:case 15:case 22:Kf(3,b);return;case 1:return;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&nb(c,f,e,a,d,b);}return;case 6:if(null===b.stateNode)throw Error(q(162));c=b.memoizedProps;lb(b.stateNode,null!==a?a.memoizedProps:c,c);return;case 3:Va&&(b=b.stateNode,b.hydrate&&(b.hydrate=!1,Ob(b.containerInfo)));return;case 12:return;case 13:Yf(b);
		Zf(b);return;case 19:Zf(b);return;case 17:return;case 23:case 24:Of(b,null!==b.memoizedState);return}throw Error(q(163));}switch(b.tag){case 0:case 11:case 14:case 15:case 22:Kf(3,b);return;case 12:return;case 13:Yf(b);Zf(b);return;case 19:Zf(b);return;case 3:Va&&(c=b.stateNode,c.hydrate&&(c.hydrate=!1,Ob(c.containerInfo)));break;case 23:case 24:return}a:if(Ua){switch(b.tag){case 1:case 5:case 6:case 20:break a;case 3:case 4:b=b.stateNode;Cb(b.containerInfo,b.pendingChildren);break a}throw Error(q(163));
		}}function Yf(a){null!==a.memoizedState&&($f=G(),Ta&&Of(a.child,!0));}function Zf(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Gf);b.forEach(function(b){var d=ag.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d));});}}function bg(a,b){return null!==a&&(a=a.memoizedState,null===a||null!==a.dehydrated)?(b=b.memoizedState,null!==b&&null===b.dehydrated):!1}var cg=0,dg=1,eg=2,fg=3,gg=4;
		if("function"===typeof Symbol&&Symbol.for){var hg=Symbol.for;cg=hg("selector.component");dg=hg("selector.has_pseudo_class");eg=hg("selector.role");fg=hg("selector.test_id");gg=hg("selector.text");}function ig(a){var b=Wa(a);if(null!=b){if("string"!==typeof b.memoizedProps["data-testname"])throw Error(q(364));return b}a=cb(a);if(null===a)throw Error(q(362));return a.stateNode.current}
		function jg(a,b){switch(b.$$typeof){case cg:if(a.type===b.value)return !0;break;case dg:a:{b=b.value;a=[a,0];for(var c=0;c<a.length;){var d=a[c++],e=a[c++],f=b[e];if(5!==d.tag||!fb(d)){for(;null!=f&&jg(d,f);)e++,f=b[e];if(e===b.length){b=!0;break a}else for(d=d.child;null!==d;)a.push(d,e),d=d.sibling;}}b=!1;}return b;case eg:if(5===a.tag&&gb(a.stateNode,b.value))return !0;break;case gg:if(5===a.tag||6===a.tag)if(a=eb(a),null!==a&&0<=a.indexOf(b.value))return !0;break;case fg:if(5===a.tag&&(a=a.memoizedProps["data-testname"],
		"string"===typeof a&&a.toLowerCase()===b.value.toLowerCase()))return !0;break;default:throw Error(q(365,b));}return !1}function kg(a){switch(a.$$typeof){case cg:return "<"+(wa(a.value)||"Unknown")+">";case dg:return ":has("+(kg(a)||"")+")";case eg:return '[role="'+a.value+'"]';case gg:return '"'+a.value+'"';case fg:return '[data-testname="'+a.value+'"]';default:throw Error(q(365,a));}}
		function lg(a,b){var c=[];a=[a,0];for(var d=0;d<a.length;){var e=a[d++],f=a[d++],g=b[f];if(5!==e.tag||!fb(e)){for(;null!=g&&jg(e,g);)f++,g=b[f];if(f===b.length)c.push(e);else for(e=e.child;null!==e;)a.push(e,f),e=e.sibling;}}return c}function mg(a,b){if(!bb)throw Error(q(363));a=ig(a);a=lg(a,b);b=[];a=Array.from(a);for(var c=0;c<a.length;){var d=a[c++];if(5===d.tag)fb(d)||b.push(d.stateNode);else for(d=d.child;null!==d;)a.push(d),d=d.sibling;}return b}var ng=null;
		function og(a){if(null===ng)try{var b=("require"+Math.random()).slice(0,7);ng=(module&&module[b]).call(module,"timers").setImmediate;}catch(c){ng=function(a){var b=new MessageChannel;b.port1.onmessage=a;b.port2.postMessage(void 0);};}return ng(a)}var pg=Math.ceil,qg=ca.ReactCurrentDispatcher,rg=ca.ReactCurrentOwner,sg=ca.IsSomeRendererActing,V=0,R=null,W=null,U=0,tg=0,ug=Wb(0),T=0,vg=null,wg=0,pd=0,tf=0,xg=0,yg=null,$f=0,vf=Infinity;function zg(){vf=G()+500;}
		var X=null,Cf=!1,Df=null,Ff=null,Ag=!1,Bg=null,Cg=90,Dg=[],Eg=[],Fg=null,Gg=0,Hg=null,Ig=-1,Jg=0,Kg=0,Lg=null,Mg=!1;function K(){return 0!==(V&48)?G():-1!==Ig?Ig:Ig=G()}function td(a){a=a.mode;if(0===(a&2))return 1;if(0===(a&4))return 99===Nc()?1:2;0===Jg&&(Jg=wg);if(0!==Sc.transition){0!==Kg&&(Kg=null!==yg?yg.pendingLanes:0);a=Jg;var b=4186112&~Kg;b&=-b;0===b&&(a=4186112&~a,b=a&-a,0===b&&(b=8192));return b}a=Nc();0!==(V&4)&&98===a?a=oc(12,Jg):(a=jc(a),a=oc(a,Jg));return a}
		function ud(a,b,c){if(50<Gg)throw Gg=0,Hg=null,Error(q(185));a=Ng(a,b);if(null===a)return null;rc(a,b,c);a===R&&(tf|=b,4===T&&uf(a,U));var d=Nc();1===b?0!==(V&8)&&0===(V&48)?Og(a):(Z(a,c),0===V&&(zg(),H())):(0===(V&4)||98!==d&&99!==d||(null===Fg?Fg=new Set([a]):Fg.add(a)),Z(a,c));yg=a;}function Ng(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}
		function Z(a,b){for(var c=a.callbackNode,d=a.suspendedLanes,e=a.pingedLanes,f=a.expirationTimes,g=a.pendingLanes;0<g;){var h=31-mc(g),k=1<<h,l=f[h];if(-1===l){if(0===(k&d)||0!==(k&e)){l=b;ic(k);var n=F;f[h]=10<=n?l+250:6<=n?l+5E3:-1;}}else l<=b&&(a.expiredLanes|=k);g&=~k;}d=lc(a,a===R?U:0);b=F;if(0===d)null!==c&&(c!==Hc&&xc(c),a.callbackNode=null,a.callbackPriority=0);else {if(null!==c){if(a.callbackPriority===b)return;c!==Hc&&xc(c);}15===b?(c=Og.bind(null,a),null===Jc?(Jc=[c],Kc=wc(Cc,Rc)):Jc.push(c),
		c=Hc):14===b?c=Qc(99,Og.bind(null,a)):(c=kc(b),c=Qc(c,Pg.bind(null,a)));a.callbackPriority=b;a.callbackNode=c;}}
		function Pg(a){Ig=-1;Kg=Jg=0;if(0!==(V&48))throw Error(q(327));var b=a.callbackNode;if(Qg()&&a.callbackNode!==b)return null;var c=lc(a,a===R?U:0);if(0===c)return null;var d=c;var e=V;V|=16;var f=Rg();if(R!==a||U!==d)zg(),Sg(a,d);do try{Tg();break}catch(h){Ug(a,h);}while(1);bd();qg.current=f;V=e;null!==W?d=0:(R=null,U=0,d=T);if(0!==(wg&tf))Sg(a,0);else if(0!==d){2===d&&(V|=64,a.hydrate&&(a.hydrate=!1,xb(a.containerInfo)),c=nc(a),0!==c&&(d=Vg(a,c)));if(1===d)throw b=vg,Sg(a,0),uf(a,c),Z(a,G()),b;a.finishedWork=
		a.current.alternate;a.finishedLanes=c;switch(d){case 0:case 1:throw Error(q(345));case 2:Zg(a);break;case 3:uf(a,c);if((c&62914560)===c&&(d=$f+500-G(),10<d)){if(0!==lc(a,0))break;e=a.suspendedLanes;if((e&c)!==c){K();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Pa(Zg.bind(null,a),d);break}Zg(a);break;case 4:uf(a,c);if((c&4186112)===c)break;d=a.eventTimes;for(e=-1;0<c;){var g=31-mc(c);f=1<<g;g=d[g];g>e&&(e=g);c&=~f;}c=e;c=G()-c;c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3E3>c?3E3:4320>
		c?4320:1960*pg(c/1960))-c;if(10<c){a.timeoutHandle=Pa(Zg.bind(null,a),c);break}Zg(a);break;case 5:Zg(a);break;default:throw Error(q(329));}}Z(a,G());return a.callbackNode===b?Pg.bind(null,a):null}function uf(a,b){b&=~xg;b&=~tf;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-mc(b),d=1<<c;a[c]=-1;b&=~d;}}
		function Og(a){if(0!==(V&48))throw Error(q(327));Qg();if(a===R&&0!==(a.expiredLanes&U)){var b=U;var c=Vg(a,b);0!==(wg&tf)&&(b=lc(a,b),c=Vg(a,b));}else b=lc(a,0),c=Vg(a,b);0!==a.tag&&2===c&&(V|=64,a.hydrate&&(a.hydrate=!1,xb(a.containerInfo)),b=nc(a),0!==b&&(c=Vg(a,b)));if(1===c)throw c=vg,Sg(a,0),uf(a,b),Z(a,G()),c;a.finishedWork=a.current.alternate;a.finishedLanes=b;Zg(a);Z(a,G());return null}
		function $g(){if(null!==Fg){var a=Fg;Fg=null;a.forEach(function(a){a.expiredLanes|=24&a.pendingLanes;Z(a,G());});}H();}function ah(a,b){var c=V;V|=1;try{return a(b)}finally{V=c,0===V&&(zg(),H());}}function bh(a,b){var c=V;if(0!==(c&48))return a(b);V|=1;try{if(a)return Pc(99,a.bind(null,b))}finally{V=c,H();}}function Xe(a,b){A(ug,tg);tg|=b;wg|=b;}function wf(){tg=ug.current;z(ug);}
		function Sg(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;c!==Ra&&(a.timeoutHandle=Ra,Qa(c));if(null!==W)for(c=W.return;null!==c;){var d=c;switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&$b();break;case 3:Qd();z(D);z(B);ee();break;case 5:Sd(d);break;case 4:Qd();break;case 13:z(M);break;case 19:z(M);break;case 10:dd(d);break;case 23:case 24:wf();}c=c.return;}R=a;W=Ed(a.current,null);U=tg=wg=b;T=0;vg=null;xg=tf=pd=0;}
		function Ug(a,b){do{var c=W;try{bd();fe.current=pe;if(ie){for(var d=N.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next;}ie=!1;}he=0;P=O=N=null;je=!1;rg.current=null;if(null===c||null===c.return){T=1;vg=b;W=null;break}a:{var f=a,g=c.return,h=c,k=b;b=U;h.flags|=2048;h.firstEffect=h.lastEffect=null;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k;if(0===(h.mode&2)){var n=h.alternate;n?(h.updateQueue=n.updateQueue,h.memoizedState=n.memoizedState,h.lanes=n.lanes):
		(h.updateQueue=null,h.memoizedState=null);}var t=0!==(M.current&1),p=g;do{var y;if(y=13===p.tag){var x=p.memoizedState;if(null!==x)y=null!==x.dehydrated?!0:!1;else {var Y=p.memoizedProps;y=void 0===Y.fallback?!1:!0!==Y.unstable_avoidThisFallback?!0:t?!1:!0;}}if(y){var u=p.updateQueue;if(null===u){var v=new Set;v.add(l);p.updateQueue=v;}else u.add(l);if(0===(p.mode&2)){p.flags|=64;h.flags|=16384;h.flags&=-2981;if(1===h.tag)if(null===h.alternate)h.tag=17;else {var C=kd(-1,1);C.tag=2;md(h,C);}h.lanes|=1;break a}k=
		void 0;h=b;var Oa=f.pingCache;null===Oa?(Oa=f.pingCache=new Af,k=new Set,Oa.set(l,k)):(k=Oa.get(l),void 0===k&&(k=new Set,Oa.set(l,k)));if(!k.has(h)){k.add(h);var Qe=ch.bind(null,f,l,h);l.then(Qe,Qe);}p.flags|=4096;p.lanes=b;break a}p=p.return;}while(null!==p);k=Error((wa(h.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");}5!==T&&(T=2);k=
		yf(k,h);p=g;do{switch(p.tag){case 3:f=k;p.flags|=4096;b&=-b;p.lanes|=b;var Wg=Bf(p,f,b);nd(p,Wg);break a;case 1:f=k;var Xg=p.type,ld=p.stateNode;if(0===(p.flags&64)&&("function"===typeof Xg.getDerivedStateFromError||null!==ld&&"function"===typeof ld.componentDidCatch&&(null===Ff||!Ff.has(ld)))){p.flags|=4096;b&=-b;p.lanes|=b;var Yg=Ef(p,f,b);nd(p,Yg);break a}}p=p.return;}while(null!==p)}dh(c);}catch(w){b=w;W===c&&null!==c&&(W=c=c.return);continue}break}while(1)}
		function Rg(){var a=qg.current;qg.current=pe;return null===a?pe:a}function Vg(a,b){var c=V;V|=16;var d=Rg();R===a&&U===b||Sg(a,b);do try{eh();break}catch(e){Ug(a,e);}while(1);bd();V=c;qg.current=d;if(null!==W)throw Error(q(261));R=null;U=0;return T}function eh(){for(;null!==W;)fh(W);}function Tg(){for(;null!==W&&!yc();)fh(W);}function fh(a){var b=gh(a.alternate,a,tg);a.memoizedProps=a.pendingProps;null===b?dh(a):W=b;rg.current=null;}
		function dh(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&2048)){c=sf(c,b,tg);if(null!==c){W=c;return}c=b;if(24!==c.tag&&23!==c.tag||null===c.memoizedState||0!==(tg&1073741824)||0===(c.mode&4)){for(var d=0,e=c.child;null!==e;)d|=e.lanes|e.childLanes,e=e.sibling;c.childLanes=d;}null!==a&&0===(a.flags&2048)&&(null===a.firstEffect&&(a.firstEffect=b.firstEffect),null!==b.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=b.firstEffect),a.lastEffect=b.lastEffect),1<b.flags&&(null!==
		a.lastEffect?a.lastEffect.nextEffect=b:a.firstEffect=b,a.lastEffect=b));}else {c=xf(b);if(null!==c){c.flags&=2047;W=c;return}null!==a&&(a.firstEffect=a.lastEffect=null,a.flags|=2048);}b=b.sibling;if(null!==b){W=b;return}W=b=a;}while(null!==b);0===T&&(T=5);}function Zg(a){var b=Nc();Pc(99,hh.bind(null,a,b));return null}
		function hh(a,b){do Qg();while(null!==Bg);if(0!==(V&48))throw Error(q(327));var c=a.finishedWork;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(q(177));a.callbackNode=null;var d=c.lanes|c.childLanes,e=d,f=a.pendingLanes&~e;a.pendingLanes=e;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=e;a.mutableReadLanes&=e;a.entangledLanes&=e;e=a.entanglements;for(var g=a.eventTimes,h=a.expirationTimes;0<f;){var k=31-mc(f),l=1<<k;e[k]=0;g[k]=-1;h[k]=-1;f&=~l;}null!==
		Fg&&0===(d&24)&&Fg.has(a)&&Fg.delete(a);a===R&&(W=R=null,U=0);1<c.flags?null!==c.lastEffect?(c.lastEffect.nextEffect=c,d=c.firstEffect):d=c:d=c.firstEffect;if(null!==d){e=V;V|=32;rg.current=null;Lg=Ga(a.containerInfo);Mg=!1;X=d;do try{ih();}catch(v){if(null===X)throw Error(q(330));If(X,v);X=X.nextEffect;}while(null!==X);Lg=null;X=d;do try{for(g=a;null!==X;){var n=X.flags;n&16&&Ta&&sb(X.stateNode);if(n&128){var t=X.alternate;if(null!==t){var p=t.ref;null!==p&&("function"===typeof p?p(null):p.current=
		null);}}switch(n&1038){case 2:Uf(X);X.flags&=-3;break;case 6:Uf(X);X.flags&=-3;Xf(X.alternate,X);break;case 1024:X.flags&=-1025;break;case 1028:X.flags&=-1025;Xf(X.alternate,X);break;case 4:Xf(X.alternate,X);break;case 8:h=g;f=X;Ta?Qf(h,f):Rf(h,f);var y=f.alternate;Sf(f);null!==y&&Sf(y);}X=X.nextEffect;}}catch(v){if(null===X)throw Error(q(330));If(X,v);X=X.nextEffect;}while(null!==X);Mg&&$a();Ha(a.containerInfo);a.current=c;X=d;do try{for(n=a;null!==X;){var x=X.flags;x&36&&Lf(n,X.alternate,X);if(x&128){t=
		void 0;var Y=X.ref;if(null!==Y){var u=X.stateNode;switch(X.tag){case 5:t=Da(u);break;default:t=u;}"function"===typeof Y?Y(t):Y.current=t;}}X=X.nextEffect;}}catch(v){if(null===X)throw Error(q(330));If(X,v);X=X.nextEffect;}while(null!==X);X=null;Ic();V=e;}else a.current=c;if(Ag)Ag=!1,Bg=a,Cg=b;else for(X=d;null!==X;)b=X.nextEffect,X.nextEffect=null,X.flags&8&&(x=X,x.sibling=null,x.stateNode=null),X=b;d=a.pendingLanes;0===d&&(Ff=null);1===d?a===Hg?Gg++:(Gg=0,Hg=a):Gg=0;c=c.stateNode;if(fc&&"function"===typeof fc.onCommitFiberRoot)try{fc.onCommitFiberRoot(ec,
		c,void 0,64===(c.current.flags&64));}catch(v){}Z(a,G());if(Cf)throw Cf=!1,a=Df,Df=null,a;if(0!==(V&8))return null;H();return null}function ih(){for(;null!==X;){var a=X.alternate;Mg||null===Lg||(0!==(X.flags&8)?Ca(X,Lg)&&(Mg=!0,Za()):13===X.tag&&bg(a,X)&&Ca(X,Lg)&&(Mg=!0,Za()));var b=X.flags;0!==(b&256)&&Jf(a,X);0===(b&512)||Ag||(Ag=!0,Qc(97,function(){Qg();return null}));X=X.nextEffect;}}function Qg(){if(90!==Cg){var a=97<Cg?97:Cg;Cg=90;return Pc(a,jh)}return !1}
		function Nf(a,b){Dg.push(b,a);Ag||(Ag=!0,Qc(97,function(){Qg();return null}));}function Mf(a,b){Eg.push(b,a);Ag||(Ag=!0,Qc(97,function(){Qg();return null}));}
		function jh(){if(null===Bg)return !1;var a=Bg;Bg=null;if(0!==(V&48))throw Error(q(331));var b=V;V|=32;var c=Eg;Eg=[];for(var d=0;d<c.length;d+=2){var e=c[d],f=c[d+1],g=e.destroy;e.destroy=void 0;if("function"===typeof g)try{g();}catch(k){if(null===f)throw Error(q(330));If(f,k);}}c=Dg;Dg=[];for(d=0;d<c.length;d+=2){e=c[d];f=c[d+1];try{var h=e.create;e.destroy=h();}catch(k){if(null===f)throw Error(q(330));If(f,k);}}for(h=a.current.firstEffect;null!==h;)a=h.nextEffect,h.nextEffect=null,h.flags&8&&(h.sibling=
		null,h.stateNode=null),h=a;V=b;H();return !0}function kh(a,b,c){b=yf(c,b);b=Bf(a,b,1);md(a,b);b=K();a=Ng(a,1);null!==a&&(rc(a,1,b),Z(a,b));}
		function If(a,b){if(3===a.tag)kh(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){kh(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ff||!Ff.has(d))){a=yf(b,a);var e=Ef(c,a,1);md(c,e);e=K();c=Ng(c,1);if(null!==c)rc(c,1,e),Z(c,e);else if("function"===typeof d.componentDidCatch&&(null===Ff||!Ff.has(d)))try{d.componentDidCatch(b,a);}catch(f){}break}}c=c.return;}}
		function ch(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=K();a.pingedLanes|=a.suspendedLanes&c;R===a&&(U&c)===c&&(4===T||3===T&&(U&62914560)===U&&500>G()-$f?Sg(a,0):xg|=c);Z(a,b);}function ag(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=a.mode,0===(b&2)?b=1:0===(b&4)?b=99===Nc()?1:2:(0===Jg&&(Jg=wg),b=pc(62914560&~Jg),0===b&&(b=4194304)));c=K();a=Ng(a,b);null!==a&&(rc(a,b,c),Z(a,c));}var gh;
		gh=function(a,b,c){var d=b.lanes;if(null!==a)if(a.memoizedProps!==b.pendingProps||D.current)gd=!0;else if(0!==(c&d))gd=0!==(a.flags&16384)?!0:!1;else {gd=!1;switch(b.tag){case 3:af(b);ce();break;case 5:Rd(b);break;case 1:E(b.type)&&cc(b);break;case 4:Pd(b,b.stateNode.containerInfo);break;case 10:cd(b,b.memoizedProps.value);break;case 13:if(null!==b.memoizedState){if(0!==(c&b.child.childLanes))return cf(a,b,c);A(M,M.current&1);b=Re(a,b,c);return null!==b?b.sibling:null}A(M,M.current&1);break;case 19:d=
		0!==(c&b.childLanes);if(0!==(a.flags&64)){if(d)return kf(a,b,c);b.flags|=64;}var e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);A(M,M.current);if(d)break;else return null;case 23:case 24:return b.lanes=0,We(a,b,c)}return Re(a,b,c)}else gd=!1;b.lanes=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);a=b.pendingProps;e=Zb(b,B.current);fd(b,c);e=le(null,b,d,a,e,c);b.flags|=1;if("object"===typeof e&&null!==e&&"function"===typeof e.render&&
		void 0===e.$$typeof){b.tag=1;b.memoizedState=null;b.updateQueue=null;if(E(d)){var f=!0;cc(b);}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;id(b);var g=d.getDerivedStateFromProps;"function"===typeof g&&sd(b,d,g,a);e.updater=vd;b.stateNode=e;e._reactInternals=b;zd(b,d,a,c);b=$e(null,b,d,!0,f,c);}else b.tag=0,S(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;a:{null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);a=b.pendingProps;f=e._init;e=f(e._payload);b.type=e;
		f=b.tag=lh(e);a=Xc(e,a);switch(f){case 0:b=Ve(null,b,e,a,c);break a;case 1:b=Ze(null,b,e,a,c);break a;case 11:b=Pe(null,b,e,a,c);break a;case 14:b=Se(null,b,e,Xc(e.type,a),d,c);break a}throw Error(q(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Xc(d,e),Ve(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Xc(d,e),Ze(a,b,d,e,c);case 3:af(b);d=b.updateQueue;if(null===a||null===d)throw Error(q(282));d=b.pendingProps;e=b.memoizedState;e=null!==
		e?e.element:null;jd(a,b);od(b,d,null,c);d=b.memoizedState.element;if(d===e)ce(),b=Re(a,b,c);else {e=b.stateNode;if(f=e.hydrate)Va?(Vd=Kb(b.stateNode.containerInfo),Ud=b,f=Wd=!0):f=!1;if(f){if(Va&&(a=e.mutableSourceEagerHydrationData,null!=a))for(e=0;e<a.length;e+=2)f=a[e],g=a[e+1],Sa?f._workInProgressVersionPrimary=g:f._workInProgressVersionSecondary=g,de.push(f);c=Kd(b,null,d,c);for(b.child=c;c;)c.flags=c.flags&-3|1024,c=c.sibling;}else S(a,b,d,c),ce();b=b.child;}return b;case 5:return Rd(b),null===
		a&&$d(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ma(d,e)?g=null:null!==f&&Ma(d,f)&&(b.flags|=16),Ye(a,b),S(a,b,g,c),b.child;case 6:return null===a&&$d(b),null;case 13:return cf(a,b,c);case 4:return Pd(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Jd(b,null,d,c):S(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Xc(d,e),Pe(a,b,d,e,c);case 7:return S(a,b,b.pendingProps,c),b.child;case 8:return S(a,b,b.pendingProps.children,
		c),b.child;case 12:return S(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;cd(b,f);if(null!==g){var h=g.value;f=I(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0;if(0===f){if(g.children===e.children&&!D.current){b=Re(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var k=h.dependencies;if(null!==k){g=h.child;for(var l=k.firstContext;null!==l;){if(l.context===d&&0!==
		(l.observedBits&f)){1===h.tag&&(l=kd(-1,c&-c),l.tag=2,md(h,l));h.lanes|=c;l=h.alternate;null!==l&&(l.lanes|=c);ed(h.return,c);k.lanes|=c;break}l=l.next;}}else g=10===h.tag?h.type===b.type?null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return;}h=g;}}S(a,b,e.children,c);b=b.child;}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,fd(b,c),e=J(e,f.unstable_observedBits),d=d(e),b.flags|=1,S(a,b,
		d,c),b.child;case 14:return e=b.type,f=Xc(e,b.pendingProps),f=Xc(e.type,f),Se(a,b,e,f,d,c);case 15:return Ue(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Xc(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),b.tag=1,E(d)?(a=!0,cc(b)):a=!1,fd(b,c),xd(b,d,e),zd(b,d,e,c),$e(null,b,d,!0,a,c);case 19:return kf(a,b,c);case 23:return We(a,b,c);case 24:return We(a,b,c)}throw Error(q(156,b.tag));};
		var mh={current:!1},nh=m.unstable_flushAllWithoutAsserting,oh="function"===typeof nh;function ph(){if(void 0!==nh)return nh();for(var a=!1;Qg();)a=!0;return a}function qh(a){try{ph(),og(function(){ph()?qh(a):a();});}catch(b){a(b);}}var rh=0,sh=!1;
		function th(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.flags=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childLanes=this.lanes=0;this.alternate=null;}function Yd(a,b,c,d){return new th(a,b,c,d)}function Te(a){a=a.prototype;return !(!a||!a.isReactComponent)}
		function lh(a){if("function"===typeof a)return Te(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===la)return 11;if(a===oa)return 14}return 2}
		function Ed(a,b){var c=a.alternate;null===c?(c=Yd(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
		c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
		function Gd(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)Te(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case fa:return Id(c.children,e,f,b);case ra:g=8;e|=16;break;case ha:g=8;e|=1;break;case ia:return a=Yd(12,c,b,e|8),a.elementType=ia,a.type=ia,a.lanes=f,a;case ma:return a=Yd(13,c,b,e),a.type=ma,a.elementType=ma,a.lanes=f,a;case na:return a=Yd(19,c,b,e),a.elementType=na,a.lanes=f,a;case sa:return ef(c,e,f,b);case ta:return a=Yd(24,c,b,e),a.elementType=ta,a.lanes=f,a;default:if("object"===
		typeof a&&null!==a)switch(a.$$typeof){case ja:g=10;break a;case ka:g=9;break a;case la:g=11;break a;case oa:g=14;break a;case pa:g=16;d=null;break a;case qa:g=22;break a}throw Error(q(130,null==a?a:typeof a,""));}b=Yd(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Id(a,b,c,d){a=Yd(7,a,d,b);a.lanes=c;return a}function ef(a,b,c,d){a=Yd(23,a,d,b);a.elementType=sa;a.lanes=c;return a}function Fd(a,b,c){a=Yd(6,a,null,b);a.lanes=c;return a}
		function Hd(a,b,c){b=Yd(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
		function uh(a,b,c){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=Ra;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=0;this.eventTimes=qc(0);this.expirationTimes=qc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=qc(0);Va&&(this.mutableSourceEagerHydrationData=null);}
		function vh(a){var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(q(188));throw Error(q(268,Object.keys(a)));}a=Aa(b);return null===a?null:a.stateNode}function wh(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b;}}function xh(a,b){wh(a,b);(a=a.alternate)&&wh(a,b);}function yh(a){a=Aa(a);return null===a?null:a.stateNode}function zh(){return null}exports.IsThisRendererActing=mh;
		exports.act=function(a){function b(){rh--;sg.current=c;mh.current=d;}!1===sh&&(sh=!0,console.error("act(...) is not supported in production builds of React, and might not behave as expected."));rh++;var c=sg.current,d=mh.current;sg.current=!0;mh.current=!0;try{var e=ah(a);}catch(f){throw b(),f;}if(null!==e&&"object"===typeof e&&"function"===typeof e.then)return {then:function(a,d){e.then(function(){1<rh||!0===oh&&!0===c?(b(),a()):qh(function(c){b();c?d(c):a();});},function(a){b();d(a);});}};try{1!==rh||
		!1!==oh&&!1!==c||ph(),b();}catch(f){throw b(),f;}return {then:function(a){a();}}};exports.attemptContinuousHydration=function(a){if(13===a.tag){var b=K();ud(a,67108864,b);xh(a,67108864);}};exports.attemptHydrationAtCurrentPriority=function(a){if(13===a.tag){var b=K(),c=td(a);ud(a,c,b);xh(a,c);}};
		exports.attemptSynchronousHydration=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.hydrate){var c=ic(b.pendingLanes);b.expiredLanes|=c&b.pendingLanes;Z(b,G());0===(V&48)&&(zg(),H());}break;case 13:var d=K();bh(function(){return ud(a,1,d)});xh(a,4);}};exports.attemptUserBlockingHydration=function(a){if(13===a.tag){var b=K();ud(a,4,b);xh(a,4);}};exports.batchedEventUpdates=function(a,b){var c=V;V|=2;try{return a(b)}finally{V=c,0===V&&(zg(),H());}};exports.batchedUpdates=ah;
		exports.createComponentSelector=function(a){return {$$typeof:cg,value:a}};exports.createContainer=function(a,b,c){a=new uh(a,b,c);b=Yd(3,null,null,2===b?7:1===b?3:0);a.current=b;b.stateNode=a;id(b);return a};exports.createHasPsuedoClassSelector=function(a){return {$$typeof:dg,value:a}};exports.createPortal=function(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return {$$typeof:ea,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}};
		exports.createRoleSelector=function(a){return {$$typeof:eg,value:a}};exports.createTestNameSelector=function(a){return {$$typeof:fg,value:a}};exports.createTextSelector=function(a){return {$$typeof:gg,value:a}};exports.deferredUpdates=function(a){return Pc(97,a)};exports.discreteUpdates=function(a,b,c,d,e){var f=V;V|=4;try{return Pc(98,a.bind(null,b,c,d,e))}finally{V=f,0===V&&(zg(),H());}};exports.findAllNodes=mg;
		exports.findBoundingRects=function(a,b){if(!bb)throw Error(q(363));b=mg(a,b);a=[];for(var c=0;c<b.length;c++)a.push(db(b[c]));for(b=a.length-1;0<b;b--){c=a[b];for(var d=c.x,e=d+c.width,f=c.y,g=f+c.height,h=b-1;0<=h;h--)if(b!==h){var k=a[h],l=k.x,n=l+k.width,t=k.y,p=t+k.height;if(d>=l&&f>=t&&e<=n&&g<=p){a.splice(b,1);break}else if(!(d!==l||c.width!==k.width||p<f||t>g)){t>f&&(k.height+=t-f,k.y=f);p<g&&(k.height=g-t);a.splice(b,1);break}else if(!(f!==t||c.height!==k.height||n<d||l>e)){l>d&&(k.width+=
		l-d,k.x=d);n<e&&(k.width=e-l);a.splice(b,1);break}}}return a};exports.findHostInstance=vh;exports.findHostInstanceWithNoPortals=function(a){a=Ba(a);return null===a?null:20===a.tag?a.stateNode.instance:a.stateNode};exports.findHostInstanceWithWarning=function(a){return vh(a)};exports.flushControlled=function(a){var b=V;V|=1;try{Pc(99,a);}finally{V=b,0===V&&(zg(),H());}};exports.flushDiscreteUpdates=function(){0===(V&49)&&($g(),Qg());};exports.flushPassiveEffects=Qg;exports.flushSync=bh;
		exports.focusWithin=function(a,b){if(!bb)throw Error(q(363));a=ig(a);b=lg(a,b);b=Array.from(b);for(a=0;a<b.length;){var c=b[a++];if(!fb(c)){if(5===c.tag&&hb(c.stateNode))return !0;for(c=c.child;null!==c;)b.push(c),c=c.sibling;}}return !1};exports.getCurrentUpdateLanePriority=function(){return hc};
		exports.getFindAllNodesFailureDescription=function(a,b){if(!bb)throw Error(q(363));var c=0,d=[];a=[ig(a),0];for(var e=0;e<a.length;){var f=a[e++],g=a[e++],h=b[g];if(5!==f.tag||!fb(f))if(jg(f,h)&&(d.push(kg(h)),g++,g>c&&(c=g)),g<b.length)for(f=f.child;null!==f;)a.push(f,g),f=f.sibling;}if(c<b.length){for(a=[];c<b.length;c++)a.push(kg(b[c]));return "findAllNodes was able to match part of the selector:\n  "+(d.join(" > ")+"\n\nNo matching component was found for:\n  ")+a.join(" > ")}return null};
		exports.getPublicRootInstance=function(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return Da(a.child.stateNode);default:return a.child.stateNode}};
		exports.injectIntoDevTools=function(a){a={bundleType:a.bundleType,version:a.version,rendererPackageName:a.rendererPackageName,rendererConfig:a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ca.ReactCurrentDispatcher,findHostInstanceByFiber:yh,findFiberByHostInstance:a.findFiberByHostInstance||zh,findHostInstancesForRefresh:null,
		scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)a=!1;else {var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!b.isDisabled&&b.supportsFiber)try{ec=b.inject(a),fc=b;}catch(c){}a=!0;}return a};exports.observeVisibleRects=function(a,b,c,d){if(!bb)throw Error(q(363));a=mg(a,b);var e=ib(a,c,d).disconnect;return {disconnect:function(){e();}}};
		exports.registerMutableSourceForHydration=function(a,b){var c=b._getVersion;c=c(b._source);null==a.mutableSourceEagerHydrationData?a.mutableSourceEagerHydrationData=[b,c]:a.mutableSourceEagerHydrationData.push(b,c);};exports.runWithPriority=function(a,b){var c=hc;try{return hc=a,b()}finally{hc=c;}};exports.shouldSuspend=function(){return !1};exports.unbatchedUpdates=function(a,b){var c=V;V&=-2;V|=8;try{return a(b)}finally{V=c,0===V&&(zg(),H());}};
		exports.updateContainer=function(a,b,c,d){var e=b.current,f=K(),g=td(e);a:if(c){c=c._reactInternals;b:{if(xa(c)!==c||1!==c.tag)throw Error(q(170));var h=c;do{switch(h.tag){case 3:h=h.stateNode.context;break b;case 1:if(E(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}}h=h.return;}while(null!==h);throw Error(q(171));}if(1===c.tag){var k=c.type;if(E(k)){c=bc(c,k,h);break a}}c=h;}else c=Xb;null===b.context?b.context=c:b.pendingContext=c;b=kd(f,g);b.payload={element:a};d=void 0===
		d?null:d;null!==d&&(b.callback=d);md(e,b);ud(e,g,f);return g};

		    return exports;
		};
} (reactReconciler_production_min));
	return reactReconciler_production_min.exports;
}

var hasRequiredReactReconciler;

function requireReactReconciler () {
	if (hasRequiredReactReconciler) return reactReconciler.exports;
	hasRequiredReactReconciler = 1;
	(function (module) {

		{
		  module.exports = requireReactReconciler_production_min();
		}
} (reactReconciler));
	return reactReconciler.exports;
}

var dom = {};

var measureText = {};

var widestLine = {exports: {}};

var stringWidth = {exports: {}};

var ansiRegex;
var hasRequiredAnsiRegex;

function requireAnsiRegex () {
	if (hasRequiredAnsiRegex) return ansiRegex;
	hasRequiredAnsiRegex = 1;

	ansiRegex = ({onlyFirst = false} = {}) => {
		const pattern = [
			'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
			'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
		].join('|');

		return new RegExp(pattern, onlyFirst ? undefined : 'g');
	};
	return ansiRegex;
}

var stripAnsi;
var hasRequiredStripAnsi;

function requireStripAnsi () {
	if (hasRequiredStripAnsi) return stripAnsi;
	hasRequiredStripAnsi = 1;
	const ansiRegex = requireAnsiRegex();

	stripAnsi = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;
	return stripAnsi;
}

var isFullwidthCodePoint = {exports: {}};

/* eslint-disable yoda */

var hasRequiredIsFullwidthCodePoint;

function requireIsFullwidthCodePoint () {
	if (hasRequiredIsFullwidthCodePoint) return isFullwidthCodePoint.exports;
	hasRequiredIsFullwidthCodePoint = 1;

	const isFullwidthCodePoint$1 = codePoint => {
		if (Number.isNaN(codePoint)) {
			return false;
		}

		// Code points are derived from:
		// http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt
		if (
			codePoint >= 0x1100 && (
				codePoint <= 0x115F || // Hangul Jamo
				codePoint === 0x2329 || // LEFT-POINTING ANGLE BRACKET
				codePoint === 0x232A || // RIGHT-POINTING ANGLE BRACKET
				// CJK Radicals Supplement .. Enclosed CJK Letters and Months
				(0x2E80 <= codePoint && codePoint <= 0x3247 && codePoint !== 0x303F) ||
				// Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
				(0x3250 <= codePoint && codePoint <= 0x4DBF) ||
				// CJK Unified Ideographs .. Yi Radicals
				(0x4E00 <= codePoint && codePoint <= 0xA4C6) ||
				// Hangul Jamo Extended-A
				(0xA960 <= codePoint && codePoint <= 0xA97C) ||
				// Hangul Syllables
				(0xAC00 <= codePoint && codePoint <= 0xD7A3) ||
				// CJK Compatibility Ideographs
				(0xF900 <= codePoint && codePoint <= 0xFAFF) ||
				// Vertical Forms
				(0xFE10 <= codePoint && codePoint <= 0xFE19) ||
				// CJK Compatibility Forms .. Small Form Variants
				(0xFE30 <= codePoint && codePoint <= 0xFE6B) ||
				// Halfwidth and Fullwidth Forms
				(0xFF01 <= codePoint && codePoint <= 0xFF60) ||
				(0xFFE0 <= codePoint && codePoint <= 0xFFE6) ||
				// Kana Supplement
				(0x1B000 <= codePoint && codePoint <= 0x1B001) ||
				// Enclosed Ideographic Supplement
				(0x1F200 <= codePoint && codePoint <= 0x1F251) ||
				// CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
				(0x20000 <= codePoint && codePoint <= 0x3FFFD)
			)
		) {
			return true;
		}

		return false;
	};

	isFullwidthCodePoint.exports = isFullwidthCodePoint$1;
	isFullwidthCodePoint.exports.default = isFullwidthCodePoint$1;
	return isFullwidthCodePoint.exports;
}

var emojiRegex;
var hasRequiredEmojiRegex;

function requireEmojiRegex () {
	if (hasRequiredEmojiRegex) return emojiRegex;
	hasRequiredEmojiRegex = 1;

	emojiRegex = function () {
	  // https://mths.be/emoji
	  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
	};
	return emojiRegex;
}

var hasRequiredStringWidth;

function requireStringWidth () {
	if (hasRequiredStringWidth) return stringWidth.exports;
	hasRequiredStringWidth = 1;
	const stripAnsi = requireStripAnsi();
	const isFullwidthCodePoint = requireIsFullwidthCodePoint();
	const emojiRegex = requireEmojiRegex();

	const stringWidth$1 = string => {
		if (typeof string !== 'string' || string.length === 0) {
			return 0;
		}

		string = stripAnsi(string);

		if (string.length === 0) {
			return 0;
		}

		string = string.replace(emojiRegex(), '  ');

		let width = 0;

		for (let i = 0; i < string.length; i++) {
			const code = string.codePointAt(i);

			// Ignore control characters
			if (code <= 0x1F || (code >= 0x7F && code <= 0x9F)) {
				continue;
			}

			// Ignore combining characters
			if (code >= 0x300 && code <= 0x36F) {
				continue;
			}

			// Surrogates
			if (code > 0xFFFF) {
				i++;
			}

			width += isFullwidthCodePoint(code) ? 2 : 1;
		}

		return width;
	};

	stringWidth.exports = stringWidth$1;
	// TODO: remove this in the next major version
	stringWidth.exports.default = stringWidth$1;
	return stringWidth.exports;
}

var hasRequiredWidestLine;

function requireWidestLine () {
	if (hasRequiredWidestLine) return widestLine.exports;
	hasRequiredWidestLine = 1;
	const stringWidth = requireStringWidth();

	const widestLine$1 = input => {
		let max = 0;

		for (const line of input.split('\n')) {
			max = Math.max(max, stringWidth(line));
		}

		return max;
	};

	widestLine.exports = widestLine$1;
	// TODO: remove this in the next major version
	widestLine.exports.default = widestLine$1;
	return widestLine.exports;
}

var hasRequiredMeasureText;

function requireMeasureText () {
	if (hasRequiredMeasureText) return measureText;
	hasRequiredMeasureText = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(measureText, "__esModule", { value: true });
	const widest_line_1 = __importDefault(requireWidestLine());
	const cache = {};
	measureText.default = (text) => {
	    if (text.length === 0) {
	        return {
	            width: 0,
	            height: 0
	        };
	    }
	    if (cache[text]) {
	        return cache[text];
	    }
	    const width = widest_line_1.default(text);
	    const height = text.split('\n').length;
	    cache[text] = { width, height };
	    return { width, height };
	};
	
	return measureText;
}

var styles = {};

var hasRequiredStyles;

function requireStyles () {
	if (hasRequiredStyles) return styles;
	hasRequiredStyles = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(styles, "__esModule", { value: true });
	/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
	const yoga_layout_prebuilt_1 = __importDefault(require$$0$3);
	const applyPositionStyles = (node, style) => {
	    if ('position' in style) {
	        node.setPositionType(style.position === 'absolute'
	            ? yoga_layout_prebuilt_1.default.POSITION_TYPE_ABSOLUTE
	            : yoga_layout_prebuilt_1.default.POSITION_TYPE_RELATIVE);
	    }
	};
	const applyMarginStyles = (node, style) => {
	    if ('marginLeft' in style) {
	        node.setMargin(yoga_layout_prebuilt_1.default.EDGE_START, style.marginLeft || 0);
	    }
	    if ('marginRight' in style) {
	        node.setMargin(yoga_layout_prebuilt_1.default.EDGE_END, style.marginRight || 0);
	    }
	    if ('marginTop' in style) {
	        node.setMargin(yoga_layout_prebuilt_1.default.EDGE_TOP, style.marginTop || 0);
	    }
	    if ('marginBottom' in style) {
	        node.setMargin(yoga_layout_prebuilt_1.default.EDGE_BOTTOM, style.marginBottom || 0);
	    }
	};
	const applyPaddingStyles = (node, style) => {
	    if ('paddingLeft' in style) {
	        node.setPadding(yoga_layout_prebuilt_1.default.EDGE_LEFT, style.paddingLeft || 0);
	    }
	    if ('paddingRight' in style) {
	        node.setPadding(yoga_layout_prebuilt_1.default.EDGE_RIGHT, style.paddingRight || 0);
	    }
	    if ('paddingTop' in style) {
	        node.setPadding(yoga_layout_prebuilt_1.default.EDGE_TOP, style.paddingTop || 0);
	    }
	    if ('paddingBottom' in style) {
	        node.setPadding(yoga_layout_prebuilt_1.default.EDGE_BOTTOM, style.paddingBottom || 0);
	    }
	};
	const applyFlexStyles = (node, style) => {
	    var _a;
	    if ('flexGrow' in style) {
	        node.setFlexGrow((_a = style.flexGrow) !== null && _a !== void 0 ? _a : 0);
	    }
	    if ('flexShrink' in style) {
	        node.setFlexShrink(typeof style.flexShrink === 'number' ? style.flexShrink : 1);
	    }
	    if ('flexDirection' in style) {
	        if (style.flexDirection === 'row') {
	            node.setFlexDirection(yoga_layout_prebuilt_1.default.FLEX_DIRECTION_ROW);
	        }
	        if (style.flexDirection === 'row-reverse') {
	            node.setFlexDirection(yoga_layout_prebuilt_1.default.FLEX_DIRECTION_ROW_REVERSE);
	        }
	        if (style.flexDirection === 'column') {
	            node.setFlexDirection(yoga_layout_prebuilt_1.default.FLEX_DIRECTION_COLUMN);
	        }
	        if (style.flexDirection === 'column-reverse') {
	            node.setFlexDirection(yoga_layout_prebuilt_1.default.FLEX_DIRECTION_COLUMN_REVERSE);
	        }
	    }
	    if ('flexBasis' in style) {
	        if (typeof style.flexBasis === 'number') {
	            node.setFlexBasis(style.flexBasis);
	        }
	        else if (typeof style.flexBasis === 'string') {
	            node.setFlexBasisPercent(Number.parseInt(style.flexBasis, 10));
	        }
	        else {
	            // This should be replaced with node.setFlexBasisAuto() when new Yoga release is out
	            node.setFlexBasis(NaN);
	        }
	    }
	    if ('alignItems' in style) {
	        if (style.alignItems === 'stretch' || !style.alignItems) {
	            node.setAlignItems(yoga_layout_prebuilt_1.default.ALIGN_STRETCH);
	        }
	        if (style.alignItems === 'flex-start') {
	            node.setAlignItems(yoga_layout_prebuilt_1.default.ALIGN_FLEX_START);
	        }
	        if (style.alignItems === 'center') {
	            node.setAlignItems(yoga_layout_prebuilt_1.default.ALIGN_CENTER);
	        }
	        if (style.alignItems === 'flex-end') {
	            node.setAlignItems(yoga_layout_prebuilt_1.default.ALIGN_FLEX_END);
	        }
	    }
	    if ('alignSelf' in style) {
	        if (style.alignSelf === 'auto' || !style.alignSelf) {
	            node.setAlignSelf(yoga_layout_prebuilt_1.default.ALIGN_AUTO);
	        }
	        if (style.alignSelf === 'flex-start') {
	            node.setAlignSelf(yoga_layout_prebuilt_1.default.ALIGN_FLEX_START);
	        }
	        if (style.alignSelf === 'center') {
	            node.setAlignSelf(yoga_layout_prebuilt_1.default.ALIGN_CENTER);
	        }
	        if (style.alignSelf === 'flex-end') {
	            node.setAlignSelf(yoga_layout_prebuilt_1.default.ALIGN_FLEX_END);
	        }
	    }
	    if ('justifyContent' in style) {
	        if (style.justifyContent === 'flex-start' || !style.justifyContent) {
	            node.setJustifyContent(yoga_layout_prebuilt_1.default.JUSTIFY_FLEX_START);
	        }
	        if (style.justifyContent === 'center') {
	            node.setJustifyContent(yoga_layout_prebuilt_1.default.JUSTIFY_CENTER);
	        }
	        if (style.justifyContent === 'flex-end') {
	            node.setJustifyContent(yoga_layout_prebuilt_1.default.JUSTIFY_FLEX_END);
	        }
	        if (style.justifyContent === 'space-between') {
	            node.setJustifyContent(yoga_layout_prebuilt_1.default.JUSTIFY_SPACE_BETWEEN);
	        }
	        if (style.justifyContent === 'space-around') {
	            node.setJustifyContent(yoga_layout_prebuilt_1.default.JUSTIFY_SPACE_AROUND);
	        }
	    }
	};
	const applyDimensionStyles = (node, style) => {
	    var _a, _b;
	    if ('width' in style) {
	        if (typeof style.width === 'number') {
	            node.setWidth(style.width);
	        }
	        else if (typeof style.width === 'string') {
	            node.setWidthPercent(Number.parseInt(style.width, 10));
	        }
	        else {
	            node.setWidthAuto();
	        }
	    }
	    if ('height' in style) {
	        if (typeof style.height === 'number') {
	            node.setHeight(style.height);
	        }
	        else if (typeof style.height === 'string') {
	            node.setHeightPercent(Number.parseInt(style.height, 10));
	        }
	        else {
	            node.setHeightAuto();
	        }
	    }
	    if ('minWidth' in style) {
	        if (typeof style.minWidth === 'string') {
	            node.setMinWidthPercent(Number.parseInt(style.minWidth, 10));
	        }
	        else {
	            node.setMinWidth((_a = style.minWidth) !== null && _a !== void 0 ? _a : 0);
	        }
	    }
	    if ('minHeight' in style) {
	        if (typeof style.minHeight === 'string') {
	            node.setMinHeightPercent(Number.parseInt(style.minHeight, 10));
	        }
	        else {
	            node.setMinHeight((_b = style.minHeight) !== null && _b !== void 0 ? _b : 0);
	        }
	    }
	};
	const applyDisplayStyles = (node, style) => {
	    if ('display' in style) {
	        node.setDisplay(style.display === 'flex' ? yoga_layout_prebuilt_1.default.DISPLAY_FLEX : yoga_layout_prebuilt_1.default.DISPLAY_NONE);
	    }
	};
	const applyBorderStyles = (node, style) => {
	    if ('borderStyle' in style) {
	        const borderWidth = typeof style.borderStyle === 'string' ? 1 : 0;
	        node.setBorder(yoga_layout_prebuilt_1.default.EDGE_TOP, borderWidth);
	        node.setBorder(yoga_layout_prebuilt_1.default.EDGE_BOTTOM, borderWidth);
	        node.setBorder(yoga_layout_prebuilt_1.default.EDGE_LEFT, borderWidth);
	        node.setBorder(yoga_layout_prebuilt_1.default.EDGE_RIGHT, borderWidth);
	    }
	};
	styles.default = (node, style = {}) => {
	    applyPositionStyles(node, style);
	    applyMarginStyles(node, style);
	    applyPaddingStyles(node, style);
	    applyFlexStyles(node, style);
	    applyDimensionStyles(node, style);
	    applyDisplayStyles(node, style);
	    applyBorderStyles(node, style);
	};
	
	return styles;
}

var wrapText = {};

var ansiStyles = {exports: {}};

var colorName;
var hasRequiredColorName;

function requireColorName () {
	if (hasRequiredColorName) return colorName;
	hasRequiredColorName = 1;

	colorName = {
		"aliceblue": [240, 248, 255],
		"antiquewhite": [250, 235, 215],
		"aqua": [0, 255, 255],
		"aquamarine": [127, 255, 212],
		"azure": [240, 255, 255],
		"beige": [245, 245, 220],
		"bisque": [255, 228, 196],
		"black": [0, 0, 0],
		"blanchedalmond": [255, 235, 205],
		"blue": [0, 0, 255],
		"blueviolet": [138, 43, 226],
		"brown": [165, 42, 42],
		"burlywood": [222, 184, 135],
		"cadetblue": [95, 158, 160],
		"chartreuse": [127, 255, 0],
		"chocolate": [210, 105, 30],
		"coral": [255, 127, 80],
		"cornflowerblue": [100, 149, 237],
		"cornsilk": [255, 248, 220],
		"crimson": [220, 20, 60],
		"cyan": [0, 255, 255],
		"darkblue": [0, 0, 139],
		"darkcyan": [0, 139, 139],
		"darkgoldenrod": [184, 134, 11],
		"darkgray": [169, 169, 169],
		"darkgreen": [0, 100, 0],
		"darkgrey": [169, 169, 169],
		"darkkhaki": [189, 183, 107],
		"darkmagenta": [139, 0, 139],
		"darkolivegreen": [85, 107, 47],
		"darkorange": [255, 140, 0],
		"darkorchid": [153, 50, 204],
		"darkred": [139, 0, 0],
		"darksalmon": [233, 150, 122],
		"darkseagreen": [143, 188, 143],
		"darkslateblue": [72, 61, 139],
		"darkslategray": [47, 79, 79],
		"darkslategrey": [47, 79, 79],
		"darkturquoise": [0, 206, 209],
		"darkviolet": [148, 0, 211],
		"deeppink": [255, 20, 147],
		"deepskyblue": [0, 191, 255],
		"dimgray": [105, 105, 105],
		"dimgrey": [105, 105, 105],
		"dodgerblue": [30, 144, 255],
		"firebrick": [178, 34, 34],
		"floralwhite": [255, 250, 240],
		"forestgreen": [34, 139, 34],
		"fuchsia": [255, 0, 255],
		"gainsboro": [220, 220, 220],
		"ghostwhite": [248, 248, 255],
		"gold": [255, 215, 0],
		"goldenrod": [218, 165, 32],
		"gray": [128, 128, 128],
		"green": [0, 128, 0],
		"greenyellow": [173, 255, 47],
		"grey": [128, 128, 128],
		"honeydew": [240, 255, 240],
		"hotpink": [255, 105, 180],
		"indianred": [205, 92, 92],
		"indigo": [75, 0, 130],
		"ivory": [255, 255, 240],
		"khaki": [240, 230, 140],
		"lavender": [230, 230, 250],
		"lavenderblush": [255, 240, 245],
		"lawngreen": [124, 252, 0],
		"lemonchiffon": [255, 250, 205],
		"lightblue": [173, 216, 230],
		"lightcoral": [240, 128, 128],
		"lightcyan": [224, 255, 255],
		"lightgoldenrodyellow": [250, 250, 210],
		"lightgray": [211, 211, 211],
		"lightgreen": [144, 238, 144],
		"lightgrey": [211, 211, 211],
		"lightpink": [255, 182, 193],
		"lightsalmon": [255, 160, 122],
		"lightseagreen": [32, 178, 170],
		"lightskyblue": [135, 206, 250],
		"lightslategray": [119, 136, 153],
		"lightslategrey": [119, 136, 153],
		"lightsteelblue": [176, 196, 222],
		"lightyellow": [255, 255, 224],
		"lime": [0, 255, 0],
		"limegreen": [50, 205, 50],
		"linen": [250, 240, 230],
		"magenta": [255, 0, 255],
		"maroon": [128, 0, 0],
		"mediumaquamarine": [102, 205, 170],
		"mediumblue": [0, 0, 205],
		"mediumorchid": [186, 85, 211],
		"mediumpurple": [147, 112, 219],
		"mediumseagreen": [60, 179, 113],
		"mediumslateblue": [123, 104, 238],
		"mediumspringgreen": [0, 250, 154],
		"mediumturquoise": [72, 209, 204],
		"mediumvioletred": [199, 21, 133],
		"midnightblue": [25, 25, 112],
		"mintcream": [245, 255, 250],
		"mistyrose": [255, 228, 225],
		"moccasin": [255, 228, 181],
		"navajowhite": [255, 222, 173],
		"navy": [0, 0, 128],
		"oldlace": [253, 245, 230],
		"olive": [128, 128, 0],
		"olivedrab": [107, 142, 35],
		"orange": [255, 165, 0],
		"orangered": [255, 69, 0],
		"orchid": [218, 112, 214],
		"palegoldenrod": [238, 232, 170],
		"palegreen": [152, 251, 152],
		"paleturquoise": [175, 238, 238],
		"palevioletred": [219, 112, 147],
		"papayawhip": [255, 239, 213],
		"peachpuff": [255, 218, 185],
		"peru": [205, 133, 63],
		"pink": [255, 192, 203],
		"plum": [221, 160, 221],
		"powderblue": [176, 224, 230],
		"purple": [128, 0, 128],
		"rebeccapurple": [102, 51, 153],
		"red": [255, 0, 0],
		"rosybrown": [188, 143, 143],
		"royalblue": [65, 105, 225],
		"saddlebrown": [139, 69, 19],
		"salmon": [250, 128, 114],
		"sandybrown": [244, 164, 96],
		"seagreen": [46, 139, 87],
		"seashell": [255, 245, 238],
		"sienna": [160, 82, 45],
		"silver": [192, 192, 192],
		"skyblue": [135, 206, 235],
		"slateblue": [106, 90, 205],
		"slategray": [112, 128, 144],
		"slategrey": [112, 128, 144],
		"snow": [255, 250, 250],
		"springgreen": [0, 255, 127],
		"steelblue": [70, 130, 180],
		"tan": [210, 180, 140],
		"teal": [0, 128, 128],
		"thistle": [216, 191, 216],
		"tomato": [255, 99, 71],
		"turquoise": [64, 224, 208],
		"violet": [238, 130, 238],
		"wheat": [245, 222, 179],
		"white": [255, 255, 255],
		"whitesmoke": [245, 245, 245],
		"yellow": [255, 255, 0],
		"yellowgreen": [154, 205, 50]
	};
	return colorName;
}

/* MIT license */

var conversions;
var hasRequiredConversions;

function requireConversions () {
	if (hasRequiredConversions) return conversions;
	hasRequiredConversions = 1;
	/* eslint-disable no-mixed-operators */
	const cssKeywords = requireColorName();

	// NOTE: conversions should only return primitive values (i.e. arrays, or
	//       values that give correct `typeof` results).
	//       do not use box values types (i.e. Number(), String(), etc.)

	const reverseKeywords = {};
	for (const key of Object.keys(cssKeywords)) {
		reverseKeywords[cssKeywords[key]] = key;
	}

	const convert = {
		rgb: {channels: 3, labels: 'rgb'},
		hsl: {channels: 3, labels: 'hsl'},
		hsv: {channels: 3, labels: 'hsv'},
		hwb: {channels: 3, labels: 'hwb'},
		cmyk: {channels: 4, labels: 'cmyk'},
		xyz: {channels: 3, labels: 'xyz'},
		lab: {channels: 3, labels: 'lab'},
		lch: {channels: 3, labels: 'lch'},
		hex: {channels: 1, labels: ['hex']},
		keyword: {channels: 1, labels: ['keyword']},
		ansi16: {channels: 1, labels: ['ansi16']},
		ansi256: {channels: 1, labels: ['ansi256']},
		hcg: {channels: 3, labels: ['h', 'c', 'g']},
		apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
		gray: {channels: 1, labels: ['gray']}
	};

	conversions = convert;

	// Hide .channels and .labels properties
	for (const model of Object.keys(convert)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		const {channels, labels} = convert[model];
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}

	convert.rgb.hsl = function (rgb) {
		const r = rgb[0] / 255;
		const g = rgb[1] / 255;
		const b = rgb[2] / 255;
		const min = Math.min(r, g, b);
		const max = Math.max(r, g, b);
		const delta = max - min;
		let h;
		let s;

		if (max === min) {
			h = 0;
		} else if (r === max) {
			h = (g - b) / delta;
		} else if (g === max) {
			h = 2 + (b - r) / delta;
		} else if (b === max) {
			h = 4 + (r - g) / delta;
		}

		h = Math.min(h * 60, 360);

		if (h < 0) {
			h += 360;
		}

		const l = (min + max) / 2;

		if (max === min) {
			s = 0;
		} else if (l <= 0.5) {
			s = delta / (max + min);
		} else {
			s = delta / (2 - max - min);
		}

		return [h, s * 100, l * 100];
	};

	convert.rgb.hsv = function (rgb) {
		let rdif;
		let gdif;
		let bdif;
		let h;
		let s;

		const r = rgb[0] / 255;
		const g = rgb[1] / 255;
		const b = rgb[2] / 255;
		const v = Math.max(r, g, b);
		const diff = v - Math.min(r, g, b);
		const diffc = function (c) {
			return (v - c) / 6 / diff + 1 / 2;
		};

		if (diff === 0) {
			h = 0;
			s = 0;
		} else {
			s = diff / v;
			rdif = diffc(r);
			gdif = diffc(g);
			bdif = diffc(b);

			if (r === v) {
				h = bdif - gdif;
			} else if (g === v) {
				h = (1 / 3) + rdif - bdif;
			} else if (b === v) {
				h = (2 / 3) + gdif - rdif;
			}

			if (h < 0) {
				h += 1;
			} else if (h > 1) {
				h -= 1;
			}
		}

		return [
			h * 360,
			s * 100,
			v * 100
		];
	};

	convert.rgb.hwb = function (rgb) {
		const r = rgb[0];
		const g = rgb[1];
		let b = rgb[2];
		const h = convert.rgb.hsl(rgb)[0];
		const w = 1 / 255 * Math.min(r, Math.min(g, b));

		b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

		return [h, w * 100, b * 100];
	};

	convert.rgb.cmyk = function (rgb) {
		const r = rgb[0] / 255;
		const g = rgb[1] / 255;
		const b = rgb[2] / 255;

		const k = Math.min(1 - r, 1 - g, 1 - b);
		const c = (1 - r - k) / (1 - k) || 0;
		const m = (1 - g - k) / (1 - k) || 0;
		const y = (1 - b - k) / (1 - k) || 0;

		return [c * 100, m * 100, y * 100, k * 100];
	};

	function comparativeDistance(x, y) {
		/*
			See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
		*/
		return (
			((x[0] - y[0]) ** 2) +
			((x[1] - y[1]) ** 2) +
			((x[2] - y[2]) ** 2)
		);
	}

	convert.rgb.keyword = function (rgb) {
		const reversed = reverseKeywords[rgb];
		if (reversed) {
			return reversed;
		}

		let currentClosestDistance = Infinity;
		let currentClosestKeyword;

		for (const keyword of Object.keys(cssKeywords)) {
			const value = cssKeywords[keyword];

			// Compute comparative distance
			const distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}

		return currentClosestKeyword;
	};

	convert.keyword.rgb = function (keyword) {
		return cssKeywords[keyword];
	};

	convert.rgb.xyz = function (rgb) {
		let r = rgb[0] / 255;
		let g = rgb[1] / 255;
		let b = rgb[2] / 255;

		// Assume sRGB
		r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
		g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
		b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

		const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
		const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
		const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

		return [x * 100, y * 100, z * 100];
	};

	convert.rgb.lab = function (rgb) {
		const xyz = convert.rgb.xyz(rgb);
		let x = xyz[0];
		let y = xyz[1];
		let z = xyz[2];

		x /= 95.047;
		y /= 100;
		z /= 108.883;

		x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
		y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
		z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

		const l = (116 * y) - 16;
		const a = 500 * (x - y);
		const b = 200 * (y - z);

		return [l, a, b];
	};

	convert.hsl.rgb = function (hsl) {
		const h = hsl[0] / 360;
		const s = hsl[1] / 100;
		const l = hsl[2] / 100;
		let t2;
		let t3;
		let val;

		if (s === 0) {
			val = l * 255;
			return [val, val, val];
		}

		if (l < 0.5) {
			t2 = l * (1 + s);
		} else {
			t2 = l + s - l * s;
		}

		const t1 = 2 * l - t2;

		const rgb = [0, 0, 0];
		for (let i = 0; i < 3; i++) {
			t3 = h + 1 / 3 * -(i - 1);
			if (t3 < 0) {
				t3++;
			}

			if (t3 > 1) {
				t3--;
			}

			if (6 * t3 < 1) {
				val = t1 + (t2 - t1) * 6 * t3;
			} else if (2 * t3 < 1) {
				val = t2;
			} else if (3 * t3 < 2) {
				val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
			} else {
				val = t1;
			}

			rgb[i] = val * 255;
		}

		return rgb;
	};

	convert.hsl.hsv = function (hsl) {
		const h = hsl[0];
		let s = hsl[1] / 100;
		let l = hsl[2] / 100;
		let smin = s;
		const lmin = Math.max(l, 0.01);

		l *= 2;
		s *= (l <= 1) ? l : 2 - l;
		smin *= lmin <= 1 ? lmin : 2 - lmin;
		const v = (l + s) / 2;
		const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

		return [h, sv * 100, v * 100];
	};

	convert.hsv.rgb = function (hsv) {
		const h = hsv[0] / 60;
		const s = hsv[1] / 100;
		let v = hsv[2] / 100;
		const hi = Math.floor(h) % 6;

		const f = h - Math.floor(h);
		const p = 255 * v * (1 - s);
		const q = 255 * v * (1 - (s * f));
		const t = 255 * v * (1 - (s * (1 - f)));
		v *= 255;

		switch (hi) {
			case 0:
				return [v, t, p];
			case 1:
				return [q, v, p];
			case 2:
				return [p, v, t];
			case 3:
				return [p, q, v];
			case 4:
				return [t, p, v];
			case 5:
				return [v, p, q];
		}
	};

	convert.hsv.hsl = function (hsv) {
		const h = hsv[0];
		const s = hsv[1] / 100;
		const v = hsv[2] / 100;
		const vmin = Math.max(v, 0.01);
		let sl;
		let l;

		l = (2 - s) * v;
		const lmin = (2 - s) * vmin;
		sl = s * vmin;
		sl /= (lmin <= 1) ? lmin : 2 - lmin;
		sl = sl || 0;
		l /= 2;

		return [h, sl * 100, l * 100];
	};

	// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
	convert.hwb.rgb = function (hwb) {
		const h = hwb[0] / 360;
		let wh = hwb[1] / 100;
		let bl = hwb[2] / 100;
		const ratio = wh + bl;
		let f;

		// Wh + bl cant be > 1
		if (ratio > 1) {
			wh /= ratio;
			bl /= ratio;
		}

		const i = Math.floor(6 * h);
		const v = 1 - bl;
		f = 6 * h - i;

		if ((i & 0x01) !== 0) {
			f = 1 - f;
		}

		const n = wh + f * (v - wh); // Linear interpolation

		let r;
		let g;
		let b;
		/* eslint-disable max-statements-per-line,no-multi-spaces */
		switch (i) {
			default:
			case 6:
			case 0: r = v;  g = n;  b = wh; break;
			case 1: r = n;  g = v;  b = wh; break;
			case 2: r = wh; g = v;  b = n; break;
			case 3: r = wh; g = n;  b = v; break;
			case 4: r = n;  g = wh; b = v; break;
			case 5: r = v;  g = wh; b = n; break;
		}
		/* eslint-enable max-statements-per-line,no-multi-spaces */

		return [r * 255, g * 255, b * 255];
	};

	convert.cmyk.rgb = function (cmyk) {
		const c = cmyk[0] / 100;
		const m = cmyk[1] / 100;
		const y = cmyk[2] / 100;
		const k = cmyk[3] / 100;

		const r = 1 - Math.min(1, c * (1 - k) + k);
		const g = 1 - Math.min(1, m * (1 - k) + k);
		const b = 1 - Math.min(1, y * (1 - k) + k);

		return [r * 255, g * 255, b * 255];
	};

	convert.xyz.rgb = function (xyz) {
		const x = xyz[0] / 100;
		const y = xyz[1] / 100;
		const z = xyz[2] / 100;
		let r;
		let g;
		let b;

		r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
		g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
		b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

		// Assume sRGB
		r = r > 0.0031308
			? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
			: r * 12.92;

		g = g > 0.0031308
			? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
			: g * 12.92;

		b = b > 0.0031308
			? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
			: b * 12.92;

		r = Math.min(Math.max(0, r), 1);
		g = Math.min(Math.max(0, g), 1);
		b = Math.min(Math.max(0, b), 1);

		return [r * 255, g * 255, b * 255];
	};

	convert.xyz.lab = function (xyz) {
		let x = xyz[0];
		let y = xyz[1];
		let z = xyz[2];

		x /= 95.047;
		y /= 100;
		z /= 108.883;

		x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
		y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
		z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

		const l = (116 * y) - 16;
		const a = 500 * (x - y);
		const b = 200 * (y - z);

		return [l, a, b];
	};

	convert.lab.xyz = function (lab) {
		const l = lab[0];
		const a = lab[1];
		const b = lab[2];
		let x;
		let y;
		let z;

		y = (l + 16) / 116;
		x = a / 500 + y;
		z = y - b / 200;

		const y2 = y ** 3;
		const x2 = x ** 3;
		const z2 = z ** 3;
		y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
		x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
		z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

		x *= 95.047;
		y *= 100;
		z *= 108.883;

		return [x, y, z];
	};

	convert.lab.lch = function (lab) {
		const l = lab[0];
		const a = lab[1];
		const b = lab[2];
		let h;

		const hr = Math.atan2(b, a);
		h = hr * 360 / 2 / Math.PI;

		if (h < 0) {
			h += 360;
		}

		const c = Math.sqrt(a * a + b * b);

		return [l, c, h];
	};

	convert.lch.lab = function (lch) {
		const l = lch[0];
		const c = lch[1];
		const h = lch[2];

		const hr = h / 360 * 2 * Math.PI;
		const a = c * Math.cos(hr);
		const b = c * Math.sin(hr);

		return [l, a, b];
	};

	convert.rgb.ansi16 = function (args, saturation = null) {
		const [r, g, b] = args;
		let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

		value = Math.round(value / 50);

		if (value === 0) {
			return 30;
		}

		let ansi = 30
			+ ((Math.round(b / 255) << 2)
			| (Math.round(g / 255) << 1)
			| Math.round(r / 255));

		if (value === 2) {
			ansi += 60;
		}

		return ansi;
	};

	convert.hsv.ansi16 = function (args) {
		// Optimization here; we already know the value and don't need to get
		// it converted for us.
		return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
	};

	convert.rgb.ansi256 = function (args) {
		const r = args[0];
		const g = args[1];
		const b = args[2];

		// We use the extended greyscale palette here, with the exception of
		// black and white. normal palette only has 4 greyscale shades.
		if (r === g && g === b) {
			if (r < 8) {
				return 16;
			}

			if (r > 248) {
				return 231;
			}

			return Math.round(((r - 8) / 247) * 24) + 232;
		}

		const ansi = 16
			+ (36 * Math.round(r / 255 * 5))
			+ (6 * Math.round(g / 255 * 5))
			+ Math.round(b / 255 * 5);

		return ansi;
	};

	convert.ansi16.rgb = function (args) {
		let color = args % 10;

		// Handle greyscale
		if (color === 0 || color === 7) {
			if (args > 50) {
				color += 3.5;
			}

			color = color / 10.5 * 255;

			return [color, color, color];
		}

		const mult = (~~(args > 50) + 1) * 0.5;
		const r = ((color & 1) * mult) * 255;
		const g = (((color >> 1) & 1) * mult) * 255;
		const b = (((color >> 2) & 1) * mult) * 255;

		return [r, g, b];
	};

	convert.ansi256.rgb = function (args) {
		// Handle greyscale
		if (args >= 232) {
			const c = (args - 232) * 10 + 8;
			return [c, c, c];
		}

		args -= 16;

		let rem;
		const r = Math.floor(args / 36) / 5 * 255;
		const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
		const b = (rem % 6) / 5 * 255;

		return [r, g, b];
	};

	convert.rgb.hex = function (args) {
		const integer = ((Math.round(args[0]) & 0xFF) << 16)
			+ ((Math.round(args[1]) & 0xFF) << 8)
			+ (Math.round(args[2]) & 0xFF);

		const string = integer.toString(16).toUpperCase();
		return '000000'.substring(string.length) + string;
	};

	convert.hex.rgb = function (args) {
		const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
		if (!match) {
			return [0, 0, 0];
		}

		let colorString = match[0];

		if (match[0].length === 3) {
			colorString = colorString.split('').map(char => {
				return char + char;
			}).join('');
		}

		const integer = parseInt(colorString, 16);
		const r = (integer >> 16) & 0xFF;
		const g = (integer >> 8) & 0xFF;
		const b = integer & 0xFF;

		return [r, g, b];
	};

	convert.rgb.hcg = function (rgb) {
		const r = rgb[0] / 255;
		const g = rgb[1] / 255;
		const b = rgb[2] / 255;
		const max = Math.max(Math.max(r, g), b);
		const min = Math.min(Math.min(r, g), b);
		const chroma = (max - min);
		let grayscale;
		let hue;

		if (chroma < 1) {
			grayscale = min / (1 - chroma);
		} else {
			grayscale = 0;
		}

		if (chroma <= 0) {
			hue = 0;
		} else
		if (max === r) {
			hue = ((g - b) / chroma) % 6;
		} else
		if (max === g) {
			hue = 2 + (b - r) / chroma;
		} else {
			hue = 4 + (r - g) / chroma;
		}

		hue /= 6;
		hue %= 1;

		return [hue * 360, chroma * 100, grayscale * 100];
	};

	convert.hsl.hcg = function (hsl) {
		const s = hsl[1] / 100;
		const l = hsl[2] / 100;

		const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

		let f = 0;
		if (c < 1.0) {
			f = (l - 0.5 * c) / (1.0 - c);
		}

		return [hsl[0], c * 100, f * 100];
	};

	convert.hsv.hcg = function (hsv) {
		const s = hsv[1] / 100;
		const v = hsv[2] / 100;

		const c = s * v;
		let f = 0;

		if (c < 1.0) {
			f = (v - c) / (1 - c);
		}

		return [hsv[0], c * 100, f * 100];
	};

	convert.hcg.rgb = function (hcg) {
		const h = hcg[0] / 360;
		const c = hcg[1] / 100;
		const g = hcg[2] / 100;

		if (c === 0.0) {
			return [g * 255, g * 255, g * 255];
		}

		const pure = [0, 0, 0];
		const hi = (h % 1) * 6;
		const v = hi % 1;
		const w = 1 - v;
		let mg = 0;

		/* eslint-disable max-statements-per-line */
		switch (Math.floor(hi)) {
			case 0:
				pure[0] = 1; pure[1] = v; pure[2] = 0; break;
			case 1:
				pure[0] = w; pure[1] = 1; pure[2] = 0; break;
			case 2:
				pure[0] = 0; pure[1] = 1; pure[2] = v; break;
			case 3:
				pure[0] = 0; pure[1] = w; pure[2] = 1; break;
			case 4:
				pure[0] = v; pure[1] = 0; pure[2] = 1; break;
			default:
				pure[0] = 1; pure[1] = 0; pure[2] = w;
		}
		/* eslint-enable max-statements-per-line */

		mg = (1.0 - c) * g;

		return [
			(c * pure[0] + mg) * 255,
			(c * pure[1] + mg) * 255,
			(c * pure[2] + mg) * 255
		];
	};

	convert.hcg.hsv = function (hcg) {
		const c = hcg[1] / 100;
		const g = hcg[2] / 100;

		const v = c + g * (1.0 - c);
		let f = 0;

		if (v > 0.0) {
			f = c / v;
		}

		return [hcg[0], f * 100, v * 100];
	};

	convert.hcg.hsl = function (hcg) {
		const c = hcg[1] / 100;
		const g = hcg[2] / 100;

		const l = g * (1.0 - c) + 0.5 * c;
		let s = 0;

		if (l > 0.0 && l < 0.5) {
			s = c / (2 * l);
		} else
		if (l >= 0.5 && l < 1.0) {
			s = c / (2 * (1 - l));
		}

		return [hcg[0], s * 100, l * 100];
	};

	convert.hcg.hwb = function (hcg) {
		const c = hcg[1] / 100;
		const g = hcg[2] / 100;
		const v = c + g * (1.0 - c);
		return [hcg[0], (v - c) * 100, (1 - v) * 100];
	};

	convert.hwb.hcg = function (hwb) {
		const w = hwb[1] / 100;
		const b = hwb[2] / 100;
		const v = 1 - b;
		const c = v - w;
		let g = 0;

		if (c < 1) {
			g = (v - c) / (1 - c);
		}

		return [hwb[0], c * 100, g * 100];
	};

	convert.apple.rgb = function (apple) {
		return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
	};

	convert.rgb.apple = function (rgb) {
		return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
	};

	convert.gray.rgb = function (args) {
		return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
	};

	convert.gray.hsl = function (args) {
		return [0, 0, args[0]];
	};

	convert.gray.hsv = convert.gray.hsl;

	convert.gray.hwb = function (gray) {
		return [0, 100, gray[0]];
	};

	convert.gray.cmyk = function (gray) {
		return [0, 0, 0, gray[0]];
	};

	convert.gray.lab = function (gray) {
		return [gray[0], 0, 0];
	};

	convert.gray.hex = function (gray) {
		const val = Math.round(gray[0] / 100 * 255) & 0xFF;
		const integer = (val << 16) + (val << 8) + val;

		const string = integer.toString(16).toUpperCase();
		return '000000'.substring(string.length) + string;
	};

	convert.rgb.gray = function (rgb) {
		const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
		return [val / 255 * 100];
	};
	return conversions;
}

var route;
var hasRequiredRoute;

function requireRoute () {
	if (hasRequiredRoute) return route;
	hasRequiredRoute = 1;
	const conversions = requireConversions();

	/*
		This function routes a model to all other models.

		all functions that are routed have a property `.conversion` attached
		to the returned synthetic function. This property is an array
		of strings, each with the steps in between the 'from' and 'to'
		color models (inclusive).

		conversions that are not possible simply are not included.
	*/

	function buildGraph() {
		const graph = {};
		// https://jsperf.com/object-keys-vs-for-in-with-closure/3
		const models = Object.keys(conversions);

		for (let len = models.length, i = 0; i < len; i++) {
			graph[models[i]] = {
				// http://jsperf.com/1-vs-infinity
				// micro-opt, but this is simple.
				distance: -1,
				parent: null
			};
		}

		return graph;
	}

	// https://en.wikipedia.org/wiki/Breadth-first_search
	function deriveBFS(fromModel) {
		const graph = buildGraph();
		const queue = [fromModel]; // Unshift -> queue -> pop

		graph[fromModel].distance = 0;

		while (queue.length) {
			const current = queue.pop();
			const adjacents = Object.keys(conversions[current]);

			for (let len = adjacents.length, i = 0; i < len; i++) {
				const adjacent = adjacents[i];
				const node = graph[adjacent];

				if (node.distance === -1) {
					node.distance = graph[current].distance + 1;
					node.parent = current;
					queue.unshift(adjacent);
				}
			}
		}

		return graph;
	}

	function link(from, to) {
		return function (args) {
			return to(from(args));
		};
	}

	function wrapConversion(toModel, graph) {
		const path = [graph[toModel].parent, toModel];
		let fn = conversions[graph[toModel].parent][toModel];

		let cur = graph[toModel].parent;
		while (graph[cur].parent) {
			path.unshift(graph[cur].parent);
			fn = link(conversions[graph[cur].parent][cur], fn);
			cur = graph[cur].parent;
		}

		fn.conversion = path;
		return fn;
	}

	route = function (fromModel) {
		const graph = deriveBFS(fromModel);
		const conversion = {};

		const models = Object.keys(graph);
		for (let len = models.length, i = 0; i < len; i++) {
			const toModel = models[i];
			const node = graph[toModel];

			if (node.parent === null) {
				// No possible conversion, or this node is the source model.
				continue;
			}

			conversion[toModel] = wrapConversion(toModel, graph);
		}

		return conversion;
	};
	return route;
}

var colorConvert;
var hasRequiredColorConvert;

function requireColorConvert () {
	if (hasRequiredColorConvert) return colorConvert;
	hasRequiredColorConvert = 1;
	const conversions = requireConversions();
	const route = requireRoute();

	const convert = {};

	const models = Object.keys(conversions);

	function wrapRaw(fn) {
		const wrappedFn = function (...args) {
			const arg0 = args[0];
			if (arg0 === undefined || arg0 === null) {
				return arg0;
			}

			if (arg0.length > 1) {
				args = arg0;
			}

			return fn(args);
		};

		// Preserve .conversion property if there is one
		if ('conversion' in fn) {
			wrappedFn.conversion = fn.conversion;
		}

		return wrappedFn;
	}

	function wrapRounded(fn) {
		const wrappedFn = function (...args) {
			const arg0 = args[0];

			if (arg0 === undefined || arg0 === null) {
				return arg0;
			}

			if (arg0.length > 1) {
				args = arg0;
			}

			const result = fn(args);

			// We're assuming the result is an array here.
			// see notice in conversions.js; don't use box types
			// in conversion functions.
			if (typeof result === 'object') {
				for (let len = result.length, i = 0; i < len; i++) {
					result[i] = Math.round(result[i]);
				}
			}

			return result;
		};

		// Preserve .conversion property if there is one
		if ('conversion' in fn) {
			wrappedFn.conversion = fn.conversion;
		}

		return wrappedFn;
	}

	models.forEach(fromModel => {
		convert[fromModel] = {};

		Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
		Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

		const routes = route(fromModel);
		const routeModels = Object.keys(routes);

		routeModels.forEach(toModel => {
			const fn = routes[toModel];

			convert[fromModel][toModel] = wrapRounded(fn);
			convert[fromModel][toModel].raw = wrapRaw(fn);
		});
	});

	colorConvert = convert;
	return colorConvert;
}

var hasRequiredAnsiStyles;

function requireAnsiStyles () {
	if (hasRequiredAnsiStyles) return ansiStyles.exports;
	hasRequiredAnsiStyles = 1;
	(function (module) {

		const wrapAnsi16 = (fn, offset) => (...args) => {
			const code = fn(...args);
			return `\u001B[${code + offset}m`;
		};

		const wrapAnsi256 = (fn, offset) => (...args) => {
			const code = fn(...args);
			return `\u001B[${38 + offset};5;${code}m`;
		};

		const wrapAnsi16m = (fn, offset) => (...args) => {
			const rgb = fn(...args);
			return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
		};

		const ansi2ansi = n => n;
		const rgb2rgb = (r, g, b) => [r, g, b];

		const setLazyProperty = (object, property, get) => {
			Object.defineProperty(object, property, {
				get: () => {
					const value = get();

					Object.defineProperty(object, property, {
						value,
						enumerable: true,
						configurable: true
					});

					return value;
				},
				enumerable: true,
				configurable: true
			});
		};

		/** @type {typeof import('color-convert')} */
		let colorConvert;
		const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
			if (colorConvert === undefined) {
				colorConvert = requireColorConvert();
			}

			const offset = isBackground ? 10 : 0;
			const styles = {};

			for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
				const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
				if (sourceSpace === targetSpace) {
					styles[name] = wrap(identity, offset);
				} else if (typeof suite === 'object') {
					styles[name] = wrap(suite[targetSpace], offset);
				}
			}

			return styles;
		};

		function assembleStyles() {
			const codes = new Map();
			const styles = {
				modifier: {
					reset: [0, 0],
					// 21 isn't widely supported and 22 does the same thing
					bold: [1, 22],
					dim: [2, 22],
					italic: [3, 23],
					underline: [4, 24],
					inverse: [7, 27],
					hidden: [8, 28],
					strikethrough: [9, 29]
				},
				color: {
					black: [30, 39],
					red: [31, 39],
					green: [32, 39],
					yellow: [33, 39],
					blue: [34, 39],
					magenta: [35, 39],
					cyan: [36, 39],
					white: [37, 39],

					// Bright color
					blackBright: [90, 39],
					redBright: [91, 39],
					greenBright: [92, 39],
					yellowBright: [93, 39],
					blueBright: [94, 39],
					magentaBright: [95, 39],
					cyanBright: [96, 39],
					whiteBright: [97, 39]
				},
				bgColor: {
					bgBlack: [40, 49],
					bgRed: [41, 49],
					bgGreen: [42, 49],
					bgYellow: [43, 49],
					bgBlue: [44, 49],
					bgMagenta: [45, 49],
					bgCyan: [46, 49],
					bgWhite: [47, 49],

					// Bright color
					bgBlackBright: [100, 49],
					bgRedBright: [101, 49],
					bgGreenBright: [102, 49],
					bgYellowBright: [103, 49],
					bgBlueBright: [104, 49],
					bgMagentaBright: [105, 49],
					bgCyanBright: [106, 49],
					bgWhiteBright: [107, 49]
				}
			};

			// Alias bright black as gray (and grey)
			styles.color.gray = styles.color.blackBright;
			styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
			styles.color.grey = styles.color.blackBright;
			styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

			for (const [groupName, group] of Object.entries(styles)) {
				for (const [styleName, style] of Object.entries(group)) {
					styles[styleName] = {
						open: `\u001B[${style[0]}m`,
						close: `\u001B[${style[1]}m`
					};

					group[styleName] = styles[styleName];

					codes.set(style[0], style[1]);
				}

				Object.defineProperty(styles, groupName, {
					value: group,
					enumerable: false
				});
			}

			Object.defineProperty(styles, 'codes', {
				value: codes,
				enumerable: false
			});

			styles.color.close = '\u001B[39m';
			styles.bgColor.close = '\u001B[49m';

			setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
			setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
			setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
			setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
			setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
			setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));

			return styles;
		}

		// Make the export immutable
		Object.defineProperty(module, 'exports', {
			enumerable: true,
			get: assembleStyles
		});
} (ansiStyles));
	return ansiStyles.exports;
}

var wrapAnsi_1;
var hasRequiredWrapAnsi;

function requireWrapAnsi () {
	if (hasRequiredWrapAnsi) return wrapAnsi_1;
	hasRequiredWrapAnsi = 1;
	const stringWidth = requireStringWidth();
	const stripAnsi = requireStripAnsi();
	const ansiStyles = requireAnsiStyles();

	const ESCAPES = new Set([
		'\u001B',
		'\u009B'
	]);

	const END_CODE = 39;

	const wrapAnsi = code => `${ESCAPES.values().next().value}[${code}m`;

	// Calculate the length of words split on ' ', ignoring
	// the extra characters added by ansi escape codes
	const wordLengths = string => string.split(' ').map(character => stringWidth(character));

	// Wrap a long word across multiple rows
	// Ansi escape codes do not count towards length
	const wrapWord = (rows, word, columns) => {
		const characters = [...word];

		let isInsideEscape = false;
		let visible = stringWidth(stripAnsi(rows[rows.length - 1]));

		for (const [index, character] of characters.entries()) {
			const characterLength = stringWidth(character);

			if (visible + characterLength <= columns) {
				rows[rows.length - 1] += character;
			} else {
				rows.push(character);
				visible = 0;
			}

			if (ESCAPES.has(character)) {
				isInsideEscape = true;
			} else if (isInsideEscape && character === 'm') {
				isInsideEscape = false;
				continue;
			}

			if (isInsideEscape) {
				continue;
			}

			visible += characterLength;

			if (visible === columns && index < characters.length - 1) {
				rows.push('');
				visible = 0;
			}
		}

		// It's possible that the last row we copy over is only
		// ansi escape characters, handle this edge-case
		if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
			rows[rows.length - 2] += rows.pop();
		}
	};

	// Trims spaces from a string ignoring invisible sequences
	const stringVisibleTrimSpacesRight = str => {
		const words = str.split(' ');
		let last = words.length;

		while (last > 0) {
			if (stringWidth(words[last - 1]) > 0) {
				break;
			}

			last--;
		}

		if (last === words.length) {
			return str;
		}

		return words.slice(0, last).join(' ') + words.slice(last).join('');
	};

	// The wrap-ansi module can be invoked in either 'hard' or 'soft' wrap mode
	//
	// 'hard' will never allow a string to take up more than columns characters
	//
	// 'soft' allows long words to expand past the column length
	const exec = (string, columns, options = {}) => {
		if (options.trim !== false && string.trim() === '') {
			return '';
		}

		let pre = '';
		let ret = '';
		let escapeCode;

		const lengths = wordLengths(string);
		let rows = [''];

		for (const [index, word] of string.split(' ').entries()) {
			if (options.trim !== false) {
				rows[rows.length - 1] = rows[rows.length - 1].trimLeft();
			}

			let rowLength = stringWidth(rows[rows.length - 1]);

			if (index !== 0) {
				if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
					// If we start with a new word but the current row length equals the length of the columns, add a new row
					rows.push('');
					rowLength = 0;
				}

				if (rowLength > 0 || options.trim === false) {
					rows[rows.length - 1] += ' ';
					rowLength++;
				}
			}

			// In 'hard' wrap mode, the length of a line is never allowed to extend past 'columns'
			if (options.hard && lengths[index] > columns) {
				const remainingColumns = (columns - rowLength);
				const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
				const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
				if (breaksStartingNextLine < breaksStartingThisLine) {
					rows.push('');
				}

				wrapWord(rows, word, columns);
				continue;
			}

			if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
				if (options.wordWrap === false && rowLength < columns) {
					wrapWord(rows, word, columns);
					continue;
				}

				rows.push('');
			}

			if (rowLength + lengths[index] > columns && options.wordWrap === false) {
				wrapWord(rows, word, columns);
				continue;
			}

			rows[rows.length - 1] += word;
		}

		if (options.trim !== false) {
			rows = rows.map(stringVisibleTrimSpacesRight);
		}

		pre = rows.join('\n');

		for (const [index, character] of [...pre].entries()) {
			ret += character;

			if (ESCAPES.has(character)) {
				const code = parseFloat(/\d[^m]*/.exec(pre.slice(index, index + 4)));
				escapeCode = code === END_CODE ? null : code;
			}

			const code = ansiStyles.codes.get(Number(escapeCode));

			if (escapeCode && code) {
				if (pre[index + 1] === '\n') {
					ret += wrapAnsi(code);
				} else if (character === '\n') {
					ret += wrapAnsi(escapeCode);
				}
			}
		}

		return ret;
	};

	// For each newline, invoke the method separately
	wrapAnsi_1 = (string, columns, options) => {
		return String(string)
			.normalize()
			.replace(/\r\n/g, '\n')
			.split('\n')
			.map(line => exec(line, columns, options))
			.join('\n');
	};
	return wrapAnsi_1;
}

var astralRegex_1;
var hasRequiredAstralRegex;

function requireAstralRegex () {
	if (hasRequiredAstralRegex) return astralRegex_1;
	hasRequiredAstralRegex = 1;
	const regex = '[\uD800-\uDBFF][\uDC00-\uDFFF]';

	const astralRegex = options => options && options.exact ? new RegExp(`^${regex}$`) : new RegExp(regex, 'g');

	astralRegex_1 = astralRegex;
	return astralRegex_1;
}

var sliceAnsi;
var hasRequiredSliceAnsi;

function requireSliceAnsi () {
	if (hasRequiredSliceAnsi) return sliceAnsi;
	hasRequiredSliceAnsi = 1;
	const isFullwidthCodePoint = requireIsFullwidthCodePoint();
	const astralRegex = requireAstralRegex();
	const ansiStyles = requireAnsiStyles();

	const ESCAPES = [
		'\u001B',
		'\u009B'
	];

	const wrapAnsi = code => `${ESCAPES[0]}[${code}m`;

	const checkAnsi = (ansiCodes, isEscapes, endAnsiCode) => {
		let output = [];
		ansiCodes = [...ansiCodes];

		for (let ansiCode of ansiCodes) {
			const ansiCodeOrigin = ansiCode;
			if (ansiCode.match(';')) {
				ansiCode = ansiCode.split(';')[0][0] + '0';
			}

			const item = ansiStyles.codes.get(parseInt(ansiCode, 10));
			if (item) {
				const indexEscape = ansiCodes.indexOf(item.toString());
				if (indexEscape >= 0) {
					ansiCodes.splice(indexEscape, 1);
				} else {
					output.push(wrapAnsi(isEscapes ? item : ansiCodeOrigin));
				}
			} else if (isEscapes) {
				output.push(wrapAnsi(0));
				break;
			} else {
				output.push(wrapAnsi(ansiCodeOrigin));
			}
		}

		if (isEscapes) {
			output = output.filter((element, index) => output.indexOf(element) === index);
			if (endAnsiCode !== undefined) {
				const fistEscapeCode = wrapAnsi(ansiStyles.codes.get(parseInt(endAnsiCode, 10)));
				output = output.reduce((current, next) => next === fistEscapeCode ? [next, ...current] : [...current, next], []);
			}
		}

		return output.join('');
	};

	sliceAnsi = (string, begin, end) => {
		const characters = [...string.normalize()];
		const ansiCodes = [];

		end = typeof end === 'number' ? end : characters.length;

		let isInsideEscape = false;
		let ansiCode;
		let visible = 0;
		let output = '';

		for (const [index, character] of characters.entries()) {
			let leftEscape = false;

			if (ESCAPES.includes(character)) {
				const code = /\d[^m]*/.exec(string.slice(index, index + 18));
				ansiCode = code && code.length > 0 ? code[0] : undefined;
				if (visible < end) {
					isInsideEscape = true;
					if (ansiCode !== undefined) {
						ansiCodes.push(ansiCode);
					}
				}
			} else if (isInsideEscape && character === 'm') {
				isInsideEscape = false;
				leftEscape = true;
			}

			if (!isInsideEscape && !leftEscape) {
				++visible;
			}

			if (!astralRegex({exact: true}).test(character) && isFullwidthCodePoint(character.codePointAt())) {
				++visible;
			}

			if (visible > begin && visible <= end) {
				output += character;
			} else if (visible === begin && !isInsideEscape && ansiCode !== undefined) {
				output = checkAnsi(ansiCodes);
			} else if (visible >= end) {
				output += checkAnsi(ansiCodes, true, ansiCode);
				break;
			}
		}

		return output;
	};
	return sliceAnsi;
}

var cliTruncate;
var hasRequiredCliTruncate;

function requireCliTruncate () {
	if (hasRequiredCliTruncate) return cliTruncate;
	hasRequiredCliTruncate = 1;
	const sliceAnsi = requireSliceAnsi();
	const stringWidth = requireStringWidth();

	function getIndexOfNearestSpace(string, index, shouldSearchRight) {
		if (string.charAt(index) === ' ') {
			return index;
		}

		for (let i = 1; i <= 3; i++) {
			if (shouldSearchRight) {
				if (string.charAt(index + i) === ' ') {
					return index + i;
				}
			} else if (string.charAt(index - i) === ' ') {
				return index - i;
			}
		}

		return index;
	}

	cliTruncate = (text, columns, options) => {
		options = {
			position: 'end',
			preferTruncationOnSpace: false,
			...options
		};

		const {position, space, preferTruncationOnSpace} = options;
		let ellipsis = '…';
		let ellipsisWidth = 1;

		if (typeof text !== 'string') {
			throw new TypeError(`Expected \`input\` to be a string, got ${typeof text}`);
		}

		if (typeof columns !== 'number') {
			throw new TypeError(`Expected \`columns\` to be a number, got ${typeof columns}`);
		}

		if (columns < 1) {
			return '';
		}

		if (columns === 1) {
			return ellipsis;
		}

		const length = stringWidth(text);

		if (length <= columns) {
			return text;
		}

		if (position === 'start') {
			if (preferTruncationOnSpace) {
				const nearestSpace = getIndexOfNearestSpace(text, length - columns + 1, true);
				return ellipsis + sliceAnsi(text, nearestSpace, length).trim();
			}

			if (space === true) {
				ellipsis += ' ';
				ellipsisWidth = 2;
			}

			return ellipsis + sliceAnsi(text, length - columns + ellipsisWidth, length);
		}

		if (position === 'middle') {
			if (space === true) {
				ellipsis = ' ' + ellipsis + ' ';
				ellipsisWidth = 3;
			}

			const half = Math.floor(columns / 2);

			if (preferTruncationOnSpace) {
				const spaceNearFirstBreakPoint = getIndexOfNearestSpace(text, half);
				const spaceNearSecondBreakPoint = getIndexOfNearestSpace(text, length - (columns - half) + 1, true);
				return sliceAnsi(text, 0, spaceNearFirstBreakPoint) + ellipsis + sliceAnsi(text, spaceNearSecondBreakPoint, length).trim();
			}

			return (
				sliceAnsi(text, 0, half) +
				ellipsis +
				sliceAnsi(text, length - (columns - half) + ellipsisWidth, length)
			);
		}

		if (position === 'end') {
			if (preferTruncationOnSpace) {
				const nearestSpace = getIndexOfNearestSpace(text, columns - 1);
				return sliceAnsi(text, 0, nearestSpace) + ellipsis;
			}

			if (space === true) {
				ellipsis = ' ' + ellipsis;
				ellipsisWidth = 2;
			}

			return sliceAnsi(text, 0, columns - ellipsisWidth) + ellipsis;
		}

		throw new Error(`Expected \`options.position\` to be either \`start\`, \`middle\` or \`end\`, got ${position}`);
	};
	return cliTruncate;
}

var hasRequiredWrapText;

function requireWrapText () {
	if (hasRequiredWrapText) return wrapText;
	hasRequiredWrapText = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(wrapText, "__esModule", { value: true });
	const wrap_ansi_1 = __importDefault(requireWrapAnsi());
	const cli_truncate_1 = __importDefault(requireCliTruncate());
	const cache = {};
	wrapText.default = (text, maxWidth, wrapType) => {
	    const cacheKey = text + String(maxWidth) + String(wrapType);
	    if (cache[cacheKey]) {
	        return cache[cacheKey];
	    }
	    let wrappedText = text;
	    if (wrapType === 'wrap') {
	        wrappedText = wrap_ansi_1.default(text, maxWidth, {
	            trim: false,
	            hard: true
	        });
	    }
	    if (wrapType.startsWith('truncate')) {
	        let position = 'end';
	        if (wrapType === 'truncate-middle') {
	            position = 'middle';
	        }
	        if (wrapType === 'truncate-start') {
	            position = 'start';
	        }
	        wrappedText = cli_truncate_1.default(text, maxWidth, { position });
	    }
	    cache[cacheKey] = wrappedText;
	    return wrappedText;
	};
	
	return wrapText;
}

var squashTextNodes = {};

var hasRequiredSquashTextNodes;

function requireSquashTextNodes () {
	if (hasRequiredSquashTextNodes) return squashTextNodes;
	hasRequiredSquashTextNodes = 1;
	Object.defineProperty(squashTextNodes, "__esModule", { value: true });
	// Squashing text nodes allows to combine multiple text nodes into one and write
	// to `Output` instance only once. For example, <Text>hello{' '}world</Text>
	// is actually 3 text nodes, which would result 3 writes to `Output`.
	//
	// Also, this is necessary for libraries like ink-link (https://github.com/sindresorhus/ink-link),
	// which need to wrap all children at once, instead of wrapping 3 text nodes separately.
	const squashTextNodes$1 = (node) => {
	    let text = '';
	    if (node.childNodes.length > 0) {
	        for (const childNode of node.childNodes) {
	            let nodeText = '';
	            if (childNode.nodeName === '#text') {
	                nodeText = childNode.nodeValue;
	            }
	            else {
	                if (childNode.nodeName === 'ink-text' ||
	                    childNode.nodeName === 'ink-virtual-text') {
	                    nodeText = squashTextNodes$1(childNode);
	                }
	                // Since these text nodes are being concatenated, `Output` instance won't be able to
	                // apply children transform, so we have to do it manually here for each text node
	                if (nodeText.length > 0 &&
	                    typeof childNode.internal_transform === 'function') {
	                    nodeText = childNode.internal_transform(nodeText);
	                }
	            }
	            text += nodeText;
	        }
	    }
	    return text;
	};
	squashTextNodes.default = squashTextNodes$1;
	
	return squashTextNodes;
}

var hasRequiredDom;

function requireDom () {
	if (hasRequiredDom) return dom;
	hasRequiredDom = 1;
	(function (exports) {
		var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.setTextNodeValue = exports.createTextNode = exports.setStyle = exports.setAttribute = exports.removeChildNode = exports.insertBeforeNode = exports.appendChildNode = exports.createNode = exports.TEXT_NAME = void 0;
		const yoga_layout_prebuilt_1 = __importDefault(require$$0$3);
		const measure_text_1 = __importDefault(requireMeasureText());
		const styles_1 = __importDefault(requireStyles());
		const wrap_text_1 = __importDefault(requireWrapText());
		const squash_text_nodes_1 = __importDefault(requireSquashTextNodes());
		exports.TEXT_NAME = '#text';
		exports.createNode = (nodeName) => {
		    var _a;
		    const node = {
		        nodeName,
		        style: {},
		        attributes: {},
		        childNodes: [],
		        parentNode: null,
		        yogaNode: nodeName === 'ink-virtual-text' ? undefined : yoga_layout_prebuilt_1.default.Node.create()
		    };
		    if (nodeName === 'ink-text') {
		        (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.setMeasureFunc(measureTextNode.bind(null, node));
		    }
		    return node;
		};
		exports.appendChildNode = (node, childNode) => {
		    var _a;
		    if (childNode.parentNode) {
		        exports.removeChildNode(childNode.parentNode, childNode);
		    }
		    childNode.parentNode = node;
		    node.childNodes.push(childNode);
		    if (childNode.yogaNode) {
		        (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.insertChild(childNode.yogaNode, node.yogaNode.getChildCount());
		    }
		    if (node.nodeName === 'ink-text' || node.nodeName === 'ink-virtual-text') {
		        markNodeAsDirty(node);
		    }
		};
		exports.insertBeforeNode = (node, newChildNode, beforeChildNode) => {
		    var _a, _b;
		    if (newChildNode.parentNode) {
		        exports.removeChildNode(newChildNode.parentNode, newChildNode);
		    }
		    newChildNode.parentNode = node;
		    const index = node.childNodes.indexOf(beforeChildNode);
		    if (index >= 0) {
		        node.childNodes.splice(index, 0, newChildNode);
		        if (newChildNode.yogaNode) {
		            (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.insertChild(newChildNode.yogaNode, index);
		        }
		        return;
		    }
		    node.childNodes.push(newChildNode);
		    if (newChildNode.yogaNode) {
		        (_b = node.yogaNode) === null || _b === void 0 ? void 0 : _b.insertChild(newChildNode.yogaNode, node.yogaNode.getChildCount());
		    }
		    if (node.nodeName === 'ink-text' || node.nodeName === 'ink-virtual-text') {
		        markNodeAsDirty(node);
		    }
		};
		exports.removeChildNode = (node, removeNode) => {
		    var _a, _b;
		    if (removeNode.yogaNode) {
		        (_b = (_a = removeNode.parentNode) === null || _a === void 0 ? void 0 : _a.yogaNode) === null || _b === void 0 ? void 0 : _b.removeChild(removeNode.yogaNode);
		    }
		    removeNode.parentNode = null;
		    const index = node.childNodes.indexOf(removeNode);
		    if (index >= 0) {
		        node.childNodes.splice(index, 1);
		    }
		    if (node.nodeName === 'ink-text' || node.nodeName === 'ink-virtual-text') {
		        markNodeAsDirty(node);
		    }
		};
		exports.setAttribute = (node, key, value) => {
		    node.attributes[key] = value;
		};
		exports.setStyle = (node, style) => {
		    node.style = style;
		    if (node.yogaNode) {
		        styles_1.default(node.yogaNode, style);
		    }
		};
		exports.createTextNode = (text) => {
		    const node = {
		        nodeName: '#text',
		        nodeValue: text,
		        yogaNode: undefined,
		        parentNode: null,
		        style: {}
		    };
		    exports.setTextNodeValue(node, text);
		    return node;
		};
		const measureTextNode = function (node, width) {
		    var _a, _b;
		    const text = node.nodeName === '#text' ? node.nodeValue : squash_text_nodes_1.default(node);
		    const dimensions = measure_text_1.default(text);
		    // Text fits into container, no need to wrap
		    if (dimensions.width <= width) {
		        return dimensions;
		    }
		    // This is happening when <Box> is shrinking child nodes and Yoga asks
		    // if we can fit this text node in a <1px space, so we just tell Yoga "no"
		    if (dimensions.width >= 1 && width > 0 && width < 1) {
		        return dimensions;
		    }
		    const textWrap = (_b = (_a = node.style) === null || _a === void 0 ? void 0 : _a.textWrap) !== null && _b !== void 0 ? _b : 'wrap';
		    const wrappedText = wrap_text_1.default(text, width, textWrap);
		    return measure_text_1.default(wrappedText);
		};
		const findClosestYogaNode = (node) => {
		    var _a;
		    if (!node || !node.parentNode) {
		        return undefined;
		    }
		    return (_a = node.yogaNode) !== null && _a !== void 0 ? _a : findClosestYogaNode(node.parentNode);
		};
		const markNodeAsDirty = (node) => {
		    // Mark closest Yoga node as dirty to measure text dimensions again
		    const yogaNode = findClosestYogaNode(node);
		    yogaNode === null || yogaNode === void 0 ? void 0 : yogaNode.markDirty();
		};
		exports.setTextNodeValue = (node, text) => {
		    if (typeof text !== 'string') {
		        text = String(text);
		    }
		    node.nodeValue = text;
		    markNodeAsDirty(node);
		};
		
} (dom));
	return dom;
}

var hasRequiredReconciler;

function requireReconciler () {
	if (hasRequiredReconciler) return reconciler;
	hasRequiredReconciler = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(reconciler, "__esModule", { value: true });
	const scheduler_1 = requireScheduler();
	const react_reconciler_1 = __importDefault(requireReactReconciler());
	const yoga_layout_prebuilt_1 = __importDefault(require$$0$3);
	const dom_1 = requireDom();
	const cleanupYogaNode = (node) => {
	    node === null || node === void 0 ? void 0 : node.unsetMeasureFunc();
	    node === null || node === void 0 ? void 0 : node.freeRecursive();
	};
	reconciler.default = react_reconciler_1.default({
	    // @ts-ignore
	    schedulePassiveEffects: scheduler_1.unstable_scheduleCallback,
	    cancelPassiveEffects: scheduler_1.unstable_cancelCallback,
	    now: Date.now,
	    getRootHostContext: () => ({
	        isInsideText: false
	    }),
	    prepareForCommit: () => null,
	    preparePortalMount: () => null,
	    clearContainer: () => false,
	    shouldDeprioritizeSubtree: () => false,
	    resetAfterCommit: rootNode => {
	        // Since renders are throttled at the instance level and <Static> component children
	        // are rendered only once and then get deleted, we need an escape hatch to
	        // trigger an immediate render to ensure <Static> children are written to output before they get erased
	        if (rootNode.isStaticDirty) {
	            rootNode.isStaticDirty = false;
	            if (typeof rootNode.onImmediateRender === 'function') {
	                rootNode.onImmediateRender();
	            }
	            return;
	        }
	        if (typeof rootNode.onRender === 'function') {
	            rootNode.onRender();
	        }
	    },
	    getChildHostContext: (parentHostContext, type) => {
	        const previousIsInsideText = parentHostContext.isInsideText;
	        const isInsideText = type === 'ink-text' || type === 'ink-virtual-text';
	        if (previousIsInsideText === isInsideText) {
	            return parentHostContext;
	        }
	        return { isInsideText };
	    },
	    shouldSetTextContent: () => false,
	    createInstance: (originalType, newProps, _root, hostContext) => {
	        if (hostContext.isInsideText && originalType === 'ink-box') {
	            throw new Error(`<Box> can’t be nested inside <Text> component`);
	        }
	        const type = originalType === 'ink-text' && hostContext.isInsideText
	            ? 'ink-virtual-text'
	            : originalType;
	        const node = dom_1.createNode(type);
	        for (const [key, value] of Object.entries(newProps)) {
	            if (key === 'children') {
	                continue;
	            }
	            else if (key === 'style') {
	                dom_1.setStyle(node, value);
	            }
	            else if (key === 'internal_transform') {
	                node.internal_transform = value;
	            }
	            else if (key === 'internal_static') {
	                node.internal_static = true;
	            }
	            else {
	                dom_1.setAttribute(node, key, value);
	            }
	        }
	        return node;
	    },
	    createTextInstance: (text, _root, hostContext) => {
	        if (!hostContext.isInsideText) {
	            throw new Error(`Text string "${text}" must be rendered inside <Text> component`);
	        }
	        return dom_1.createTextNode(text);
	    },
	    resetTextContent: () => { },
	    hideTextInstance: node => {
	        dom_1.setTextNodeValue(node, '');
	    },
	    unhideTextInstance: (node, text) => {
	        dom_1.setTextNodeValue(node, text);
	    },
	    getPublicInstance: instance => instance,
	    hideInstance: node => {
	        var _a;
	        (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.setDisplay(yoga_layout_prebuilt_1.default.DISPLAY_NONE);
	    },
	    unhideInstance: node => {
	        var _a;
	        (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.setDisplay(yoga_layout_prebuilt_1.default.DISPLAY_FLEX);
	    },
	    appendInitialChild: dom_1.appendChildNode,
	    appendChild: dom_1.appendChildNode,
	    insertBefore: dom_1.insertBeforeNode,
	    finalizeInitialChildren: (node, _type, _props, rootNode) => {
	        if (node.internal_static) {
	            rootNode.isStaticDirty = true;
	            // Save reference to <Static> node to skip traversal of entire
	            // node tree to find it
	            rootNode.staticNode = node;
	        }
	        return false;
	    },
	    supportsMutation: true,
	    appendChildToContainer: dom_1.appendChildNode,
	    insertInContainerBefore: dom_1.insertBeforeNode,
	    removeChildFromContainer: (node, removeNode) => {
	        dom_1.removeChildNode(node, removeNode);
	        cleanupYogaNode(removeNode.yogaNode);
	    },
	    prepareUpdate: (node, _type, oldProps, newProps, rootNode) => {
	        if (node.internal_static) {
	            rootNode.isStaticDirty = true;
	        }
	        const updatePayload = {};
	        const keys = Object.keys(newProps);
	        for (const key of keys) {
	            if (newProps[key] !== oldProps[key]) {
	                const isStyle = key === 'style' &&
	                    typeof newProps.style === 'object' &&
	                    typeof oldProps.style === 'object';
	                if (isStyle) {
	                    const newStyle = newProps.style;
	                    const oldStyle = oldProps.style;
	                    const styleKeys = Object.keys(newStyle);
	                    for (const styleKey of styleKeys) {
	                        // Always include `borderColor` and `borderStyle` to ensure border is rendered,
	                        // otherwise resulting `updatePayload` may not contain them
	                        // if they weren't changed during this update
	                        if (styleKey === 'borderStyle' || styleKey === 'borderColor') {
	                            if (typeof updatePayload.style !== 'object') {
	                                // Linter didn't like `= {} as Style`
	                                const style = {};
	                                updatePayload.style = style;
	                            }
	                            updatePayload.style.borderStyle = newStyle.borderStyle;
	                            updatePayload.style.borderColor = newStyle.borderColor;
	                        }
	                        if (newStyle[styleKey] !== oldStyle[styleKey]) {
	                            if (typeof updatePayload.style !== 'object') {
	                                // Linter didn't like `= {} as Style`
	                                const style = {};
	                                updatePayload.style = style;
	                            }
	                            updatePayload.style[styleKey] = newStyle[styleKey];
	                        }
	                    }
	                    continue;
	                }
	                updatePayload[key] = newProps[key];
	            }
	        }
	        return updatePayload;
	    },
	    commitUpdate: (node, updatePayload) => {
	        for (const [key, value] of Object.entries(updatePayload)) {
	            if (key === 'children') {
	                continue;
	            }
	            else if (key === 'style') {
	                dom_1.setStyle(node, value);
	            }
	            else if (key === 'internal_transform') {
	                node.internal_transform = value;
	            }
	            else if (key === 'internal_static') {
	                node.internal_static = true;
	            }
	            else {
	                dom_1.setAttribute(node, key, value);
	            }
	        }
	    },
	    commitTextUpdate: (node, _oldText, newText) => {
	        dom_1.setTextNodeValue(node, newText);
	    },
	    removeChild: (node, removeNode) => {
	        dom_1.removeChildNode(node, removeNode);
	        cleanupYogaNode(removeNode.yogaNode);
	    }
	});
	
	return reconciler;
}

var renderer = {};

var renderNodeToOutput = {};

var indentString;
var hasRequiredIndentString;

function requireIndentString () {
	if (hasRequiredIndentString) return indentString;
	hasRequiredIndentString = 1;

	indentString = (string, count = 1, options) => {
		options = {
			indent: ' ',
			includeEmptyLines: false,
			...options
		};

		if (typeof string !== 'string') {
			throw new TypeError(
				`Expected \`input\` to be a \`string\`, got \`${typeof string}\``
			);
		}

		if (typeof count !== 'number') {
			throw new TypeError(
				`Expected \`count\` to be a \`number\`, got \`${typeof count}\``
			);
		}

		if (typeof options.indent !== 'string') {
			throw new TypeError(
				`Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``
			);
		}

		if (count === 0) {
			return string;
		}

		const regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;

		return string.replace(regex, options.indent.repeat(count));
	};
	return indentString;
}

var getMaxWidth = {};

var hasRequiredGetMaxWidth;

function requireGetMaxWidth () {
	if (hasRequiredGetMaxWidth) return getMaxWidth;
	hasRequiredGetMaxWidth = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(getMaxWidth, "__esModule", { value: true });
	const yoga_layout_prebuilt_1 = __importDefault(require$$0$3);
	getMaxWidth.default = (yogaNode) => {
	    return (yogaNode.getComputedWidth() -
	        yogaNode.getComputedPadding(yoga_layout_prebuilt_1.default.EDGE_LEFT) -
	        yogaNode.getComputedPadding(yoga_layout_prebuilt_1.default.EDGE_RIGHT) -
	        yogaNode.getComputedBorder(yoga_layout_prebuilt_1.default.EDGE_LEFT) -
	        yogaNode.getComputedBorder(yoga_layout_prebuilt_1.default.EDGE_RIGHT));
	};
	
	return getMaxWidth;
}

var renderBorder = {};

var cliBoxes = {exports: {}};

var single = {
	topLeft: "┌",
	topRight: "┐",
	bottomRight: "┘",
	bottomLeft: "└",
	vertical: "│",
	horizontal: "─"
};
var double = {
	topLeft: "╔",
	topRight: "╗",
	bottomRight: "╝",
	bottomLeft: "╚",
	vertical: "║",
	horizontal: "═"
};
var round = {
	topLeft: "╭",
	topRight: "╮",
	bottomRight: "╯",
	bottomLeft: "╰",
	vertical: "│",
	horizontal: "─"
};
var bold = {
	topLeft: "┏",
	topRight: "┓",
	bottomRight: "┛",
	bottomLeft: "┗",
	vertical: "┃",
	horizontal: "━"
};
var singleDouble = {
	topLeft: "╓",
	topRight: "╖",
	bottomRight: "╜",
	bottomLeft: "╙",
	vertical: "║",
	horizontal: "─"
};
var doubleSingle = {
	topLeft: "╒",
	topRight: "╕",
	bottomRight: "╛",
	bottomLeft: "╘",
	vertical: "│",
	horizontal: "═"
};
var classic = {
	topLeft: "+",
	topRight: "+",
	bottomRight: "+",
	bottomLeft: "+",
	vertical: "|",
	horizontal: "-"
};
var require$$0 = {
	single: single,
	double: double,
	round: round,
	bold: bold,
	singleDouble: singleDouble,
	doubleSingle: doubleSingle,
	classic: classic
};

var hasRequiredCliBoxes;

function requireCliBoxes () {
	if (hasRequiredCliBoxes) return cliBoxes.exports;
	hasRequiredCliBoxes = 1;
	const cliBoxes$1 = require$$0;

	cliBoxes.exports = cliBoxes$1;
	// TODO: Remove this for the next major release
	cliBoxes.exports.default = cliBoxes$1;
	return cliBoxes.exports;
}

var colorize = {};

var hasFlag;
var hasRequiredHasFlag;

function requireHasFlag () {
	if (hasRequiredHasFlag) return hasFlag;
	hasRequiredHasFlag = 1;

	hasFlag = (flag, argv = process.argv) => {
		const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
		const position = argv.indexOf(prefix + flag);
		const terminatorPosition = argv.indexOf('--');
		return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
	};
	return hasFlag;
}

var supportsColor_1;
var hasRequiredSupportsColor;

function requireSupportsColor () {
	if (hasRequiredSupportsColor) return supportsColor_1;
	hasRequiredSupportsColor = 1;
	const os$1 = os;
	const tty = require$$1;
	const hasFlag = requireHasFlag();

	const {env} = process;

	let forceColor;
	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false') ||
		hasFlag('color=never')) {
		forceColor = 0;
	} else if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		forceColor = 1;
	}

	if ('FORCE_COLOR' in env) {
		if (env.FORCE_COLOR === 'true') {
			forceColor = 1;
		} else if (env.FORCE_COLOR === 'false') {
			forceColor = 0;
		} else {
			forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
		}
	}

	function translateLevel(level) {
		if (level === 0) {
			return false;
		}

		return {
			level,
			hasBasic: true,
			has256: level >= 2,
			has16m: level >= 3
		};
	}

	function supportsColor(haveStream, streamIsTTY) {
		if (forceColor === 0) {
			return 0;
		}

		if (hasFlag('color=16m') ||
			hasFlag('color=full') ||
			hasFlag('color=truecolor')) {
			return 3;
		}

		if (hasFlag('color=256')) {
			return 2;
		}

		if (haveStream && !streamIsTTY && forceColor === undefined) {
			return 0;
		}

		const min = forceColor || 0;

		if (env.TERM === 'dumb') {
			return min;
		}

		if (process.platform === 'win32') {
			// Windows 10 build 10586 is the first Windows release that supports 256 colors.
			// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
			const osRelease = os$1.release().split('.');
			if (
				Number(osRelease[0]) >= 10 &&
				Number(osRelease[2]) >= 10586
			) {
				return Number(osRelease[2]) >= 14931 ? 3 : 2;
			}

			return 1;
		}

		if ('CI' in env) {
			if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
				return 1;
			}

			return min;
		}

		if ('TEAMCITY_VERSION' in env) {
			return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
		}

		if (env.COLORTERM === 'truecolor') {
			return 3;
		}

		if ('TERM_PROGRAM' in env) {
			const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

			switch (env.TERM_PROGRAM) {
				case 'iTerm.app':
					return version >= 3 ? 3 : 2;
				case 'Apple_Terminal':
					return 2;
				// No default
			}
		}

		if (/-256(color)?$/i.test(env.TERM)) {
			return 2;
		}

		if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
			return 1;
		}

		if ('COLORTERM' in env) {
			return 1;
		}

		return min;
	}

	function getSupportLevel(stream) {
		const level = supportsColor(stream, stream && stream.isTTY);
		return translateLevel(level);
	}

	supportsColor_1 = {
		supportsColor: getSupportLevel,
		stdout: translateLevel(supportsColor(true, tty.isatty(1))),
		stderr: translateLevel(supportsColor(true, tty.isatty(2)))
	};
	return supportsColor_1;
}

var util;
var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;

	const stringReplaceAll = (string, substring, replacer) => {
		let index = string.indexOf(substring);
		if (index === -1) {
			return string;
		}

		const substringLength = substring.length;
		let endIndex = 0;
		let returnValue = '';
		do {
			returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
			endIndex = index + substringLength;
			index = string.indexOf(substring, endIndex);
		} while (index !== -1);

		returnValue += string.substr(endIndex);
		return returnValue;
	};

	const stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
		let endIndex = 0;
		let returnValue = '';
		do {
			const gotCR = string[index - 1] === '\r';
			returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
			endIndex = index + 1;
			index = string.indexOf('\n', endIndex);
		} while (index !== -1);

		returnValue += string.substr(endIndex);
		return returnValue;
	};

	util = {
		stringReplaceAll,
		stringEncaseCRLFWithFirstIndex
	};
	return util;
}

var templates;
var hasRequiredTemplates;

function requireTemplates () {
	if (hasRequiredTemplates) return templates;
	hasRequiredTemplates = 1;
	const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
	const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
	const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
	const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;

	const ESCAPES = new Map([
		['n', '\n'],
		['r', '\r'],
		['t', '\t'],
		['b', '\b'],
		['f', '\f'],
		['v', '\v'],
		['0', '\0'],
		['\\', '\\'],
		['e', '\u001B'],
		['a', '\u0007']
	]);

	function unescape(c) {
		const u = c[0] === 'u';
		const bracket = c[1] === '{';

		if ((u && !bracket && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
			return String.fromCharCode(parseInt(c.slice(1), 16));
		}

		if (u && bracket) {
			return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
		}

		return ESCAPES.get(c) || c;
	}

	function parseArguments(name, arguments_) {
		const results = [];
		const chunks = arguments_.trim().split(/\s*,\s*/g);
		let matches;

		for (const chunk of chunks) {
			const number = Number(chunk);
			if (!Number.isNaN(number)) {
				results.push(number);
			} else if ((matches = chunk.match(STRING_REGEX))) {
				results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
			} else {
				throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
			}
		}

		return results;
	}

	function parseStyle(style) {
		STYLE_REGEX.lastIndex = 0;

		const results = [];
		let matches;

		while ((matches = STYLE_REGEX.exec(style)) !== null) {
			const name = matches[1];

			if (matches[2]) {
				const args = parseArguments(name, matches[2]);
				results.push([name].concat(args));
			} else {
				results.push([name]);
			}
		}

		return results;
	}

	function buildStyle(chalk, styles) {
		const enabled = {};

		for (const layer of styles) {
			for (const style of layer.styles) {
				enabled[style[0]] = layer.inverse ? null : style.slice(1);
			}
		}

		let current = chalk;
		for (const [styleName, styles] of Object.entries(enabled)) {
			if (!Array.isArray(styles)) {
				continue;
			}

			if (!(styleName in current)) {
				throw new Error(`Unknown Chalk style: ${styleName}`);
			}

			current = styles.length > 0 ? current[styleName](...styles) : current[styleName];
		}

		return current;
	}

	templates = (chalk, temporary) => {
		const styles = [];
		const chunks = [];
		let chunk = [];

		// eslint-disable-next-line max-params
		temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
			if (escapeCharacter) {
				chunk.push(unescape(escapeCharacter));
			} else if (style) {
				const string = chunk.join('');
				chunk = [];
				chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
				styles.push({inverse, styles: parseStyle(style)});
			} else if (close) {
				if (styles.length === 0) {
					throw new Error('Found extraneous } in Chalk template literal');
				}

				chunks.push(buildStyle(chalk, styles)(chunk.join('')));
				chunk = [];
				styles.pop();
			} else {
				chunk.push(character);
			}
		});

		chunks.push(chunk.join(''));

		if (styles.length > 0) {
			const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
			throw new Error(errMessage);
		}

		return chunks.join('');
	};
	return templates;
}

var source;
var hasRequiredSource;

function requireSource () {
	if (hasRequiredSource) return source;
	hasRequiredSource = 1;
	const ansiStyles = requireAnsiStyles();
	const {stdout: stdoutColor, stderr: stderrColor} = requireSupportsColor();
	const {
		stringReplaceAll,
		stringEncaseCRLFWithFirstIndex
	} = requireUtil();

	const {isArray} = Array;

	// `supportsColor.level` → `ansiStyles.color[name]` mapping
	const levelMapping = [
		'ansi',
		'ansi',
		'ansi256',
		'ansi16m'
	];

	const styles = Object.create(null);

	const applyOptions = (object, options = {}) => {
		if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
			throw new Error('The `level` option should be an integer from 0 to 3');
		}

		// Detect level if not set manually
		const colorLevel = stdoutColor ? stdoutColor.level : 0;
		object.level = options.level === undefined ? colorLevel : options.level;
	};

	class ChalkClass {
		constructor(options) {
			// eslint-disable-next-line no-constructor-return
			return chalkFactory(options);
		}
	}

	const chalkFactory = options => {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = (...arguments_) => chalkTag(chalk.template, ...arguments_);

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = () => {
			throw new Error('`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.');
		};

		chalk.template.Instance = ChalkClass;

		return chalk.template;
	};

	function Chalk(options) {
		return chalkFactory(options);
	}

	for (const [styleName, style] of Object.entries(ansiStyles)) {
		styles[styleName] = {
			get() {
				const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
				Object.defineProperty(this, styleName, {value: builder});
				return builder;
			}
		};
	}

	styles.visible = {
		get() {
			const builder = createBuilder(this, this._styler, true);
			Object.defineProperty(this, 'visible', {value: builder});
			return builder;
		}
	};

	const usedModels = ['rgb', 'hex', 'keyword', 'hsl', 'hsv', 'hwb', 'ansi', 'ansi256'];

	for (const model of usedModels) {
		styles[model] = {
			get() {
				const {level} = this;
				return function (...arguments_) {
					const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
					return createBuilder(this, styler, this._isEmpty);
				};
			}
		};
	}

	for (const model of usedModels) {
		const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
		styles[bgModel] = {
			get() {
				const {level} = this;
				return function (...arguments_) {
					const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
					return createBuilder(this, styler, this._isEmpty);
				};
			}
		};
	}

	const proto = Object.defineProperties(() => {}, {
		...styles,
		level: {
			enumerable: true,
			get() {
				return this._generator.level;
			},
			set(level) {
				this._generator.level = level;
			}
		}
	});

	const createStyler = (open, close, parent) => {
		let openAll;
		let closeAll;
		if (parent === undefined) {
			openAll = open;
			closeAll = close;
		} else {
			openAll = parent.openAll + open;
			closeAll = close + parent.closeAll;
		}

		return {
			open,
			close,
			openAll,
			closeAll,
			parent
		};
	};

	const createBuilder = (self, _styler, _isEmpty) => {
		const builder = (...arguments_) => {
			if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
				// Called as a template literal, for example: chalk.red`2 + 3 = {bold ${2+3}}`
				return applyStyle(builder, chalkTag(builder, ...arguments_));
			}

			// Single argument is hot path, implicit coercion is faster than anything
			// eslint-disable-next-line no-implicit-coercion
			return applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));
		};

		// We alter the prototype because we must return a function, but there is
		// no way to create a function with a different prototype
		Object.setPrototypeOf(builder, proto);

		builder._generator = self;
		builder._styler = _styler;
		builder._isEmpty = _isEmpty;

		return builder;
	};

	const applyStyle = (self, string) => {
		if (self.level <= 0 || !string) {
			return self._isEmpty ? '' : string;
		}

		let styler = self._styler;

		if (styler === undefined) {
			return string;
		}

		const {openAll, closeAll} = styler;
		if (string.indexOf('\u001B') !== -1) {
			while (styler !== undefined) {
				// Replace any instances already present with a re-opening code
				// otherwise only the part of the string until said closing code
				// will be colored, and the rest will simply be 'plain'.
				string = stringReplaceAll(string, styler.close, styler.open);

				styler = styler.parent;
			}
		}

		// We can move both next actions out of loop, because remaining actions in loop won't have
		// any/visible effect on parts we add here. Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
		const lfIndex = string.indexOf('\n');
		if (lfIndex !== -1) {
			string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
		}

		return openAll + string + closeAll;
	};

	let template;
	const chalkTag = (chalk, ...strings) => {
		const [firstString] = strings;

		if (!isArray(firstString) || !isArray(firstString.raw)) {
			// If chalk() was called by itself or with a string,
			// return the string itself as a string.
			return strings.join(' ');
		}

		const arguments_ = strings.slice(1);
		const parts = [firstString.raw[0]];

		for (let i = 1; i < firstString.length; i++) {
			parts.push(
				String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'),
				String(firstString.raw[i])
			);
		}

		if (template === undefined) {
			template = requireTemplates();
		}

		return template(chalk, parts.join(''));
	};

	Object.defineProperties(Chalk.prototype, styles);

	const chalk = Chalk(); // eslint-disable-line new-cap
	chalk.supportsColor = stdoutColor;
	chalk.stderr = Chalk({level: stderrColor ? stderrColor.level : 0}); // eslint-disable-line new-cap
	chalk.stderr.supportsColor = stderrColor;

	source = chalk;
	return source;
}

var hasRequiredColorize;

function requireColorize () {
	if (hasRequiredColorize) return colorize;
	hasRequiredColorize = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(colorize, "__esModule", { value: true });
	const chalk_1 = __importDefault(requireSource());
	const RGB_LIKE_REGEX = /^(rgb|hsl|hsv|hwb)\(\s?(\d+),\s?(\d+),\s?(\d+)\s?\)$/;
	const ANSI_REGEX = /^(ansi|ansi256)\(\s?(\d+)\s?\)$/;
	const getMethod = (name, type) => {
	    if (type === 'foreground') {
	        return name;
	    }
	    return 'bg' + name[0].toUpperCase() + name.slice(1);
	};
	colorize.default = (str, color, type) => {
	    if (!color) {
	        return str;
	    }
	    if (color in chalk_1.default) {
	        const method = getMethod(color, type);
	        return chalk_1.default[method](str);
	    }
	    if (color.startsWith('#')) {
	        const method = getMethod('hex', type);
	        return chalk_1.default[method](color)(str);
	    }
	    if (color.startsWith('ansi')) {
	        const matches = ANSI_REGEX.exec(color);
	        if (!matches) {
	            return str;
	        }
	        const method = getMethod(matches[1], type);
	        const value = Number(matches[2]);
	        return chalk_1.default[method](value)(str);
	    }
	    const isRgbLike = color.startsWith('rgb') ||
	        color.startsWith('hsl') ||
	        color.startsWith('hsv') ||
	        color.startsWith('hwb');
	    if (isRgbLike) {
	        const matches = RGB_LIKE_REGEX.exec(color);
	        if (!matches) {
	            return str;
	        }
	        const method = getMethod(matches[1], type);
	        const firstValue = Number(matches[2]);
	        const secondValue = Number(matches[3]);
	        const thirdValue = Number(matches[4]);
	        return chalk_1.default[method](firstValue, secondValue, thirdValue)(str);
	    }
	    return str;
	};
	
	return colorize;
}

var hasRequiredRenderBorder;

function requireRenderBorder () {
	if (hasRequiredRenderBorder) return renderBorder;
	hasRequiredRenderBorder = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(renderBorder, "__esModule", { value: true });
	const cli_boxes_1 = __importDefault(requireCliBoxes());
	const colorize_1 = __importDefault(requireColorize());
	renderBorder.default = (x, y, node, output) => {
	    if (typeof node.style.borderStyle === 'string') {
	        const width = node.yogaNode.getComputedWidth();
	        const height = node.yogaNode.getComputedHeight();
	        const color = node.style.borderColor;
	        const box = cli_boxes_1.default[node.style.borderStyle];
	        const topBorder = colorize_1.default(box.topLeft + box.horizontal.repeat(width - 2) + box.topRight, color, 'foreground');
	        const verticalBorder = (colorize_1.default(box.vertical, color, 'foreground') + '\n').repeat(height - 2);
	        const bottomBorder = colorize_1.default(box.bottomLeft + box.horizontal.repeat(width - 2) + box.bottomRight, color, 'foreground');
	        output.write(x, y, topBorder, { transformers: [] });
	        output.write(x, y + 1, verticalBorder, { transformers: [] });
	        output.write(x + width - 1, y + 1, verticalBorder, { transformers: [] });
	        output.write(x, y + height - 1, bottomBorder, { transformers: [] });
	    }
	};
	
	return renderBorder;
}

var hasRequiredRenderNodeToOutput;

function requireRenderNodeToOutput () {
	if (hasRequiredRenderNodeToOutput) return renderNodeToOutput;
	hasRequiredRenderNodeToOutput = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(renderNodeToOutput, "__esModule", { value: true });
	const yoga_layout_prebuilt_1 = __importDefault(require$$0$3);
	const widest_line_1 = __importDefault(requireWidestLine());
	const indent_string_1 = __importDefault(requireIndentString());
	const wrap_text_1 = __importDefault(requireWrapText());
	const get_max_width_1 = __importDefault(requireGetMaxWidth());
	const squash_text_nodes_1 = __importDefault(requireSquashTextNodes());
	const render_border_1 = __importDefault(requireRenderBorder());
	// If parent container is `<Box>`, text nodes will be treated as separate nodes in
	// the tree and will have their own coordinates in the layout.
	// To ensure text nodes are aligned correctly, take X and Y of the first text node
	// and use it as offset for the rest of the nodes
	// Only first node is taken into account, because other text nodes can't have margin or padding,
	// so their coordinates will be relative to the first node anyway
	const applyPaddingToText = (node, text) => {
	    var _a;
	    const yogaNode = (_a = node.childNodes[0]) === null || _a === void 0 ? void 0 : _a.yogaNode;
	    if (yogaNode) {
	        const offsetX = yogaNode.getComputedLeft();
	        const offsetY = yogaNode.getComputedTop();
	        text = '\n'.repeat(offsetY) + indent_string_1.default(text, offsetX);
	    }
	    return text;
	};
	// After nodes are laid out, render each to output object, which later gets rendered to terminal
	const renderNodeToOutput$1 = (node, output, options) => {
	    var _a;
	    const { offsetX = 0, offsetY = 0, transformers = [], skipStaticElements } = options;
	    if (skipStaticElements && node.internal_static) {
	        return;
	    }
	    const { yogaNode } = node;
	    if (yogaNode) {
	        if (yogaNode.getDisplay() === yoga_layout_prebuilt_1.default.DISPLAY_NONE) {
	            return;
	        }
	        // Left and top positions in Yoga are relative to their parent node
	        const x = offsetX + yogaNode.getComputedLeft();
	        const y = offsetY + yogaNode.getComputedTop();
	        // Transformers are functions that transform final text output of each component
	        // See Output class for logic that applies transformers
	        let newTransformers = transformers;
	        if (typeof node.internal_transform === 'function') {
	            newTransformers = [node.internal_transform, ...transformers];
	        }
	        if (node.nodeName === 'ink-text') {
	            let text = squash_text_nodes_1.default(node);
	            if (text.length > 0) {
	                const currentWidth = widest_line_1.default(text);
	                const maxWidth = get_max_width_1.default(yogaNode);
	                if (currentWidth > maxWidth) {
	                    const textWrap = (_a = node.style.textWrap) !== null && _a !== void 0 ? _a : 'wrap';
	                    text = wrap_text_1.default(text, maxWidth, textWrap);
	                }
	                text = applyPaddingToText(node, text);
	                output.write(x, y, text, { transformers: newTransformers });
	            }
	            return;
	        }
	        if (node.nodeName === 'ink-box') {
	            render_border_1.default(x, y, node, output);
	        }
	        if (node.nodeName === 'ink-root' || node.nodeName === 'ink-box') {
	            for (const childNode of node.childNodes) {
	                renderNodeToOutput$1(childNode, output, {
	                    offsetX: x,
	                    offsetY: y,
	                    transformers: newTransformers,
	                    skipStaticElements
	                });
	            }
	        }
	    }
	};
	renderNodeToOutput.default = renderNodeToOutput$1;
	
	return renderNodeToOutput;
}

var output = {};

var hasRequiredOutput;

function requireOutput () {
	if (hasRequiredOutput) return output;
	hasRequiredOutput = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(output, "__esModule", { value: true });
	const slice_ansi_1 = __importDefault(requireSliceAnsi());
	const string_width_1 = __importDefault(requireStringWidth());
	class Output {
	    constructor(options) {
	        // Initialize output array with a specific set of rows, so that margin/padding at the bottom is preserved
	        this.writes = [];
	        const { width, height } = options;
	        this.width = width;
	        this.height = height;
	    }
	    write(x, y, text, options) {
	        const { transformers } = options;
	        if (!text) {
	            return;
	        }
	        this.writes.push({ x, y, text, transformers });
	    }
	    get() {
	        const output = [];
	        for (let y = 0; y < this.height; y++) {
	            output.push(' '.repeat(this.width));
	        }
	        for (const write of this.writes) {
	            const { x, y, text, transformers } = write;
	            const lines = text.split('\n');
	            let offsetY = 0;
	            for (let line of lines) {
	                const currentLine = output[y + offsetY];
	                // Line can be missing if `text` is taller than height of pre-initialized `this.output`
	                if (!currentLine) {
	                    continue;
	                }
	                const width = string_width_1.default(line);
	                for (const transformer of transformers) {
	                    line = transformer(line);
	                }
	                output[y + offsetY] =
	                    slice_ansi_1.default(currentLine, 0, x) +
	                        line +
	                        slice_ansi_1.default(currentLine, x + width);
	                offsetY++;
	            }
	        }
	        // eslint-disable-next-line unicorn/prefer-trim-start-end
	        const generatedOutput = output.map(line => line.trimRight()).join('\n');
	        return {
	            output: generatedOutput,
	            height: output.length
	        };
	    }
	}
	output.default = Output;
	
	return output;
}

var hasRequiredRenderer;

function requireRenderer () {
	if (hasRequiredRenderer) return renderer;
	hasRequiredRenderer = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(renderer, "__esModule", { value: true });
	const yoga_layout_prebuilt_1 = __importDefault(require$$0$3);
	const render_node_to_output_1 = __importDefault(requireRenderNodeToOutput());
	const output_1 = __importDefault(requireOutput());
	renderer.default = (node, terminalWidth) => {
	    var _a;
	    node.yogaNode.setWidth(terminalWidth);
	    if (node.yogaNode) {
	        node.yogaNode.calculateLayout(undefined, undefined, yoga_layout_prebuilt_1.default.DIRECTION_LTR);
	        const output = new output_1.default({
	            width: node.yogaNode.getComputedWidth(),
	            height: node.yogaNode.getComputedHeight()
	        });
	        render_node_to_output_1.default(node, output, { skipStaticElements: true });
	        let staticOutput;
	        if ((_a = node.staticNode) === null || _a === void 0 ? void 0 : _a.yogaNode) {
	            staticOutput = new output_1.default({
	                width: node.staticNode.yogaNode.getComputedWidth(),
	                height: node.staticNode.yogaNode.getComputedHeight()
	            });
	            render_node_to_output_1.default(node.staticNode, staticOutput, {
	                skipStaticElements: false
	            });
	        }
	        const { output: generatedOutput, height: outputHeight } = output.get();
	        return {
	            output: generatedOutput,
	            outputHeight,
	            // Newline at the end is needed, because static output doesn't have one, so
	            // interactive output will override last line of static output
	            staticOutput: staticOutput ? `${staticOutput.get().output}\n` : ''
	        };
	    }
	    return {
	        output: '',
	        outputHeight: 0,
	        staticOutput: ''
	    };
	};
	
	return renderer;
}

var build;
var hasRequiredBuild$1;

function requireBuild$1 () {
	if (hasRequiredBuild$1) return build;
	hasRequiredBuild$1 = 1;
	const stream_1 = require$$0$4;
	const CONSOLE_METHODS = [
	    'assert',
	    'count',
	    'countReset',
	    'debug',
	    'dir',
	    'dirxml',
	    'error',
	    'group',
	    'groupCollapsed',
	    'groupEnd',
	    'info',
	    'log',
	    'table',
	    'time',
	    'timeEnd',
	    'timeLog',
	    'trace',
	    'warn'
	];
	let originalMethods = {};
	const patchConsole = (callback) => {
	    const stdout = new stream_1.PassThrough();
	    const stderr = new stream_1.PassThrough();
	    stdout.write = (data) => callback('stdout', data);
	    stderr.write = (data) => callback('stderr', data);
	    const internalConsole = new console.Console(stdout, stderr);
	    for (const method of CONSOLE_METHODS) {
	        originalMethods[method] = console[method];
	        console[method] = internalConsole[method];
	    }
	    return () => {
	        for (const method of CONSOLE_METHODS) {
	            console[method] = originalMethods[method];
	        }
	        originalMethods = {};
	    };
	};
	build = patchConsole;
	
	return build;
}

var instances = {};

var hasRequiredInstances;

function requireInstances () {
	if (hasRequiredInstances) return instances;
	hasRequiredInstances = 1;
	Object.defineProperty(instances, "__esModule", { value: true });
	// Store all instances of Ink (instance.js) to ensure that consecutive render() calls
	// use the same instance of Ink and don't create a new one
	//
	// This map has to be stored in a separate file, because render.js creates instances,
	// but instance.js should delete itself from the map on unmount
	instances.default = new WeakMap();
	
	return instances;
}

var App = {};

var AppContext = {};

var hasRequiredAppContext;

function requireAppContext () {
	if (hasRequiredAppContext) return AppContext;
	hasRequiredAppContext = 1;
	Object.defineProperty(AppContext, "__esModule", { value: true });
	const react_1 = requireReact();
	/**
	 * `AppContext` is a React context, which exposes a method to manually exit the app (unmount).
	 */
	const AppContext$1 = react_1.createContext({
	    exit: () => { }
	});
	AppContext$1.displayName = 'InternalAppContext';
	AppContext.default = AppContext$1;
	
	return AppContext;
}

var StdinContext = {};

var hasRequiredStdinContext;

function requireStdinContext () {
	if (hasRequiredStdinContext) return StdinContext;
	hasRequiredStdinContext = 1;
	Object.defineProperty(StdinContext, "__esModule", { value: true });
	const react_1 = requireReact();
	/**
	 * `StdinContext` is a React context, which exposes input stream.
	 */
	const StdinContext$1 = react_1.createContext({
	    stdin: undefined,
	    setRawMode: () => { },
	    isRawModeSupported: false,
	    internal_exitOnCtrlC: true
	});
	StdinContext$1.displayName = 'InternalStdinContext';
	StdinContext.default = StdinContext$1;
	
	return StdinContext;
}

var StdoutContext = {};

var hasRequiredStdoutContext;

function requireStdoutContext () {
	if (hasRequiredStdoutContext) return StdoutContext;
	hasRequiredStdoutContext = 1;
	Object.defineProperty(StdoutContext, "__esModule", { value: true });
	const react_1 = requireReact();
	/**
	 * `StdoutContext` is a React context, which exposes stdout stream, where Ink renders your app.
	 */
	const StdoutContext$1 = react_1.createContext({
	    stdout: undefined,
	    write: () => { }
	});
	StdoutContext$1.displayName = 'InternalStdoutContext';
	StdoutContext.default = StdoutContext$1;
	
	return StdoutContext;
}

var StderrContext = {};

var hasRequiredStderrContext;

function requireStderrContext () {
	if (hasRequiredStderrContext) return StderrContext;
	hasRequiredStderrContext = 1;
	Object.defineProperty(StderrContext, "__esModule", { value: true });
	const react_1 = requireReact();
	/**
	 * `StderrContext` is a React context, which exposes stderr stream.
	 */
	const StderrContext$1 = react_1.createContext({
	    stderr: undefined,
	    write: () => { }
	});
	StderrContext$1.displayName = 'InternalStderrContext';
	StderrContext.default = StderrContext$1;
	
	return StderrContext;
}

var FocusContext = {};

var hasRequiredFocusContext;

function requireFocusContext () {
	if (hasRequiredFocusContext) return FocusContext;
	hasRequiredFocusContext = 1;
	Object.defineProperty(FocusContext, "__esModule", { value: true });
	const react_1 = requireReact();
	const FocusContext$1 = react_1.createContext({
	    activeId: undefined,
	    add: () => { },
	    remove: () => { },
	    activate: () => { },
	    deactivate: () => { },
	    enableFocus: () => { },
	    disableFocus: () => { },
	    focusNext: () => { },
	    focusPrevious: () => { },
	    focus: () => { }
	});
	FocusContext$1.displayName = 'InternalFocusContext';
	FocusContext.default = FocusContext$1;
	
	return FocusContext;
}

var ErrorOverview = {};

var escapeStringRegexp;
var hasRequiredEscapeStringRegexp;

function requireEscapeStringRegexp () {
	if (hasRequiredEscapeStringRegexp) return escapeStringRegexp;
	hasRequiredEscapeStringRegexp = 1;

	const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;

	escapeStringRegexp = string => {
		if (typeof string !== 'string') {
			throw new TypeError('Expected a string');
		}

		return string.replace(matchOperatorsRegex, '\\$&');
	};
	return escapeStringRegexp;
}

var stackUtils;
var hasRequiredStackUtils;

function requireStackUtils () {
	if (hasRequiredStackUtils) return stackUtils;
	hasRequiredStackUtils = 1;

	const escapeStringRegexp = requireEscapeStringRegexp();

	const cwd = typeof process === 'object' && process && typeof process.cwd === 'function'
	  ? process.cwd()
	  : '.';

	const natives = [].concat(
	  require$$1$1.builtinModules,
	  'bootstrap_node',
	  'node',
	).map(n => new RegExp(`(?:\\((?:node:)?${n}(?:\\.js)?:\\d+:\\d+\\)$|^\\s*at (?:node:)?${n}(?:\\.js)?:\\d+:\\d+$)`));

	natives.push(
	  /\((?:node:)?internal\/[^:]+:\d+:\d+\)$/,
	  /\s*at (?:node:)?internal\/[^:]+:\d+:\d+$/,
	  /\/\.node-spawn-wrap-\w+-\w+\/node:\d+:\d+\)?$/
	);

	class StackUtils {
	  constructor (opts) {
	    opts = {
	      ignoredPackages: [],
	      ...opts
	    };

	    if ('internals' in opts === false) {
	      opts.internals = StackUtils.nodeInternals();
	    }

	    if ('cwd' in opts === false) {
	      opts.cwd = cwd;
	    }

	    this._cwd = opts.cwd.replace(/\\/g, '/');
	    this._internals = [].concat(
	      opts.internals,
	      ignoredPackagesRegExp(opts.ignoredPackages)
	    );

	    this._wrapCallSite = opts.wrapCallSite || false;
	  }

	  static nodeInternals () {
	    return [...natives];
	  }

	  clean (stack, indent = 0) {
	    indent = ' '.repeat(indent);

	    if (!Array.isArray(stack)) {
	      stack = stack.split('\n');
	    }

	    if (!(/^\s*at /.test(stack[0])) && (/^\s*at /.test(stack[1]))) {
	      stack = stack.slice(1);
	    }

	    let outdent = false;
	    let lastNonAtLine = null;
	    const result = [];

	    stack.forEach(st => {
	      st = st.replace(/\\/g, '/');

	      if (this._internals.some(internal => internal.test(st))) {
	        return;
	      }

	      const isAtLine = /^\s*at /.test(st);

	      if (outdent) {
	        st = st.trimEnd().replace(/^(\s+)at /, '$1');
	      } else {
	        st = st.trim();
	        if (isAtLine) {
	          st = st.slice(3);
	        }
	      }

	      st = st.replace(`${this._cwd}/`, '');

	      if (st) {
	        if (isAtLine) {
	          if (lastNonAtLine) {
	            result.push(lastNonAtLine);
	            lastNonAtLine = null;
	          }

	          result.push(st);
	        } else {
	          outdent = true;
	          lastNonAtLine = st;
	        }
	      }
	    });

	    return result.map(line => `${indent}${line}\n`).join('');
	  }

	  captureString (limit, fn = this.captureString) {
	    if (typeof limit === 'function') {
	      fn = limit;
	      limit = Infinity;
	    }

	    const {stackTraceLimit} = Error;
	    if (limit) {
	      Error.stackTraceLimit = limit;
	    }

	    const obj = {};

	    Error.captureStackTrace(obj, fn);
	    const {stack} = obj;
	    Error.stackTraceLimit = stackTraceLimit;

	    return this.clean(stack);
	  }

	  capture (limit, fn = this.capture) {
	    if (typeof limit === 'function') {
	      fn = limit;
	      limit = Infinity;
	    }

	    const {prepareStackTrace, stackTraceLimit} = Error;
	    Error.prepareStackTrace = (obj, site) => {
	      if (this._wrapCallSite) {
	        return site.map(this._wrapCallSite);
	      }

	      return site;
	    };

	    if (limit) {
	      Error.stackTraceLimit = limit;
	    }

	    const obj = {};
	    Error.captureStackTrace(obj, fn);
	    const { stack } = obj;
	    Object.assign(Error, {prepareStackTrace, stackTraceLimit});

	    return stack;
	  }

	  at (fn = this.at) {
	    const [site] = this.capture(1, fn);

	    if (!site) {
	      return {};
	    }

	    const res = {
	      line: site.getLineNumber(),
	      column: site.getColumnNumber()
	    };

	    setFile(res, site.getFileName(), this._cwd);

	    if (site.isConstructor()) {
	      res.constructor = true;
	    }

	    if (site.isEval()) {
	      res.evalOrigin = site.getEvalOrigin();
	    }

	    // Node v10 stopped with the isNative() on callsites, apparently
	    /* istanbul ignore next */
	    if (site.isNative()) {
	      res.native = true;
	    }

	    let typename;
	    try {
	      typename = site.getTypeName();
	    } catch (_) {
	    }

	    if (typename && typename !== 'Object' && typename !== '[object Object]') {
	      res.type = typename;
	    }

	    const fname = site.getFunctionName();
	    if (fname) {
	      res.function = fname;
	    }

	    const meth = site.getMethodName();
	    if (meth && fname !== meth) {
	      res.method = meth;
	    }

	    return res;
	  }

	  parseLine (line) {
	    const match = line && line.match(re);
	    if (!match) {
	      return null;
	    }

	    const ctor = match[1] === 'new';
	    let fname = match[2];
	    const evalOrigin = match[3];
	    const evalFile = match[4];
	    const evalLine = Number(match[5]);
	    const evalCol = Number(match[6]);
	    let file = match[7];
	    const lnum = match[8];
	    const col = match[9];
	    const native = match[10] === 'native';
	    const closeParen = match[11] === ')';
	    let method;

	    const res = {};

	    if (lnum) {
	      res.line = Number(lnum);
	    }

	    if (col) {
	      res.column = Number(col);
	    }

	    if (closeParen && file) {
	      // make sure parens are balanced
	      // if we have a file like "asdf) [as foo] (xyz.js", then odds are
	      // that the fname should be += " (asdf) [as foo]" and the file
	      // should be just "xyz.js"
	      // walk backwards from the end to find the last unbalanced (
	      let closes = 0;
	      for (let i = file.length - 1; i > 0; i--) {
	        if (file.charAt(i) === ')') {
	          closes++;
	        } else if (file.charAt(i) === '(' && file.charAt(i - 1) === ' ') {
	          closes--;
	          if (closes === -1 && file.charAt(i - 1) === ' ') {
	            const before = file.slice(0, i - 1);
	            const after = file.slice(i + 1);
	            file = after;
	            fname += ` (${before}`;
	            break;
	          }
	        }
	      }
	    }

	    if (fname) {
	      const methodMatch = fname.match(methodRe);
	      if (methodMatch) {
	        fname = methodMatch[1];
	        method = methodMatch[2];
	      }
	    }

	    setFile(res, file, this._cwd);

	    if (ctor) {
	      res.constructor = true;
	    }

	    if (evalOrigin) {
	      res.evalOrigin = evalOrigin;
	      res.evalLine = evalLine;
	      res.evalColumn = evalCol;
	      res.evalFile = evalFile && evalFile.replace(/\\/g, '/');
	    }

	    if (native) {
	      res.native = true;
	    }

	    if (fname) {
	      res.function = fname;
	    }

	    if (method && fname !== method) {
	      res.method = method;
	    }

	    return res;
	  }
	}

	function setFile (result, filename, cwd) {
	  if (filename) {
	    filename = filename.replace(/\\/g, '/');
	    if (filename.startsWith(`${cwd}/`)) {
	      filename = filename.slice(cwd.length + 1);
	    }

	    result.file = filename;
	  }
	}

	function ignoredPackagesRegExp(ignoredPackages) {
	  if (ignoredPackages.length === 0) {
	    return [];
	  }

	  const packages = ignoredPackages.map(mod => escapeStringRegexp(mod));

	  return new RegExp(`[\/\\\\]node_modules[\/\\\\](?:${packages.join('|')})[\/\\\\][^:]+:\\d+:\\d+`)
	}

	const re = new RegExp(
	  '^' +
	    // Sometimes we strip out the '    at' because it's noisy
	  '(?:\\s*at )?' +
	    // $1 = ctor if 'new'
	  '(?:(new) )?' +
	    // $2 = function name (can be literally anything)
	    // May contain method at the end as [as xyz]
	  '(?:(.*?) \\()?' +
	    // (eval at <anonymous> (file.js:1:1),
	    // $3 = eval origin
	    // $4:$5:$6 are eval file/line/col, but not normally reported
	  '(?:eval at ([^ ]+) \\((.+?):(\\d+):(\\d+)\\), )?' +
	    // file:line:col
	    // $7:$8:$9
	    // $10 = 'native' if native
	  '(?:(.+?):(\\d+):(\\d+)|(native))' +
	    // maybe close the paren, then end
	    // if $11 is ), then we only allow balanced parens in the filename
	    // any imbalance is placed on the fname.  This is a heuristic, and
	    // bound to be incorrect in some edge cases.  The bet is that
	    // having weird characters in method names is more common than
	    // having weird characters in filenames, which seems reasonable.
	  '(\\)?)$'
	);

	const methodRe = /^(.*?) \[as (.*?)\]$/;

	stackUtils = StackUtils;
	return stackUtils;
}

var convertToSpaces;
var hasRequiredConvertToSpaces;

function requireConvertToSpaces () {
	if (hasRequiredConvertToSpaces) return convertToSpaces;
	hasRequiredConvertToSpaces = 1;

	convertToSpaces = (str, spaces) => {
		return str.replace(/^\t+/gm, $1 => ' '.repeat($1.length * (spaces || 2)));
	};
	return convertToSpaces;
}

var codeExcerpt;
var hasRequiredCodeExcerpt;

function requireCodeExcerpt () {
	if (hasRequiredCodeExcerpt) return codeExcerpt;
	hasRequiredCodeExcerpt = 1;
	const tabsToSpaces = requireConvertToSpaces();

	const generateLineNumbers = (line, around) => {
		const lineNumbers = [];

		const min = line - around;
		const max = line + around;

		for (let lineNumber = min; lineNumber <= max; lineNumber++) {
			lineNumbers.push(lineNumber);
		}

		return lineNumbers;
	};

	codeExcerpt = (source, line, options) => {
		if (typeof source !== 'string') {
			throw new TypeError('Source code is missing.');
		}

		if (!line || line < 1) {
			throw new TypeError('Line number must start from `1`.');
		}

		source = tabsToSpaces(source).split(/\r?\n/);

		if (line > source.length) {
			return;
		}

		options = {
			around: 3,
			...options
		};

		return generateLineNumbers(line, options.around)
			.filter(line => source[line - 1] !== undefined)
			.map(line => ({line, value: source[line - 1]}));
	};
	return codeExcerpt;
}

var Box = {};

var hasRequiredBox;

function requireBox () {
	if (hasRequiredBox) return Box;
	hasRequiredBox = 1;
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	                t[p[i]] = s[p[i]];
	        }
	    return t;
	};
	Object.defineProperty(Box, "__esModule", { value: true });
	/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
	const react_1 = __importStar(requireReact());
	/**
	 * `<Box>` is an essential Ink component to build your layout. It's like `<div style="display: flex">` in the browser.
	 */
	const Box$1 = react_1.forwardRef((_a, ref) => {
	    var { children } = _a, style = __rest(_a, ["children"]);
	    const transformedStyle = Object.assign(Object.assign({}, style), { marginLeft: style.marginLeft || style.marginX || style.margin || 0, marginRight: style.marginRight || style.marginX || style.margin || 0, marginTop: style.marginTop || style.marginY || style.margin || 0, marginBottom: style.marginBottom || style.marginY || style.margin || 0, paddingLeft: style.paddingLeft || style.paddingX || style.padding || 0, paddingRight: style.paddingRight || style.paddingX || style.padding || 0, paddingTop: style.paddingTop || style.paddingY || style.padding || 0, paddingBottom: style.paddingBottom || style.paddingY || style.padding || 0 });
	    return (react_1.default.createElement("ink-box", { ref: ref, style: transformedStyle }, children));
	});
	Box$1.displayName = 'Box';
	Box$1.defaultProps = {
	    flexDirection: 'row',
	    flexGrow: 0,
	    flexShrink: 1
	};
	Box.default = Box$1;
	
	return Box;
}

var Text = {};

var hasRequiredText;

function requireText () {
	if (hasRequiredText) return Text;
	hasRequiredText = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(Text, "__esModule", { value: true });
	const react_1 = __importDefault(requireReact());
	const chalk_1 = __importDefault(requireSource());
	const colorize_1 = __importDefault(requireColorize());
	/**
	 * This component can display text, and change its style to make it colorful, bold, underline, italic or strikethrough.
	 */
	const Text$1 = ({ color, backgroundColor, dimColor, bold, italic, underline, strikethrough, inverse, wrap, children }) => {
	    if (children === undefined || children === null) {
	        return null;
	    }
	    const transform = (children) => {
	        if (dimColor) {
	            children = chalk_1.default.dim(children);
	        }
	        if (color) {
	            children = colorize_1.default(children, color, 'foreground');
	        }
	        if (backgroundColor) {
	            children = colorize_1.default(children, backgroundColor, 'background');
	        }
	        if (bold) {
	            children = chalk_1.default.bold(children);
	        }
	        if (italic) {
	            children = chalk_1.default.italic(children);
	        }
	        if (underline) {
	            children = chalk_1.default.underline(children);
	        }
	        if (strikethrough) {
	            children = chalk_1.default.strikethrough(children);
	        }
	        if (inverse) {
	            children = chalk_1.default.inverse(children);
	        }
	        return children;
	    };
	    return (react_1.default.createElement("ink-text", { style: { flexGrow: 0, flexShrink: 1, flexDirection: 'row', textWrap: wrap }, internal_transform: transform }, children));
	};
	Text$1.displayName = 'Text';
	Text$1.defaultProps = {
	    dimColor: false,
	    bold: false,
	    italic: false,
	    underline: false,
	    strikethrough: false,
	    wrap: 'wrap'
	};
	Text.default = Text$1;
	
	return Text;
}

var hasRequiredErrorOverview;

function requireErrorOverview () {
	if (hasRequiredErrorOverview) return ErrorOverview;
	hasRequiredErrorOverview = 1;
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(ErrorOverview, "__esModule", { value: true });
	const fs = __importStar(require$$0$5);
	const react_1 = __importDefault(requireReact());
	const stack_utils_1 = __importDefault(requireStackUtils());
	const code_excerpt_1 = __importDefault(requireCodeExcerpt());
	const Box_1 = __importDefault(requireBox());
	const Text_1 = __importDefault(requireText());
	const stackUtils = new stack_utils_1.default({
	    cwd: process.cwd(),
	    internals: stack_utils_1.default.nodeInternals()
	});
	const ErrorOverview$1 = ({ error }) => {
	    const stack = error.stack ? error.stack.split('\n').slice(1) : undefined;
	    const origin = stack ? stackUtils.parseLine(stack[0]) : undefined;
	    let excerpt;
	    let lineWidth = 0;
	    if ((origin === null || origin === void 0 ? void 0 : origin.file) && (origin === null || origin === void 0 ? void 0 : origin.line) && fs.existsSync(origin.file)) {
	        const sourceCode = fs.readFileSync(origin.file, 'utf8');
	        excerpt = code_excerpt_1.default(sourceCode, origin.line);
	        if (excerpt) {
	            for (const { line } of excerpt) {
	                lineWidth = Math.max(lineWidth, String(line).length);
	            }
	        }
	    }
	    return (react_1.default.createElement(Box_1.default, { flexDirection: "column", padding: 1 },
	        react_1.default.createElement(Box_1.default, null,
	            react_1.default.createElement(Text_1.default, { backgroundColor: "red", color: "white" },
	                ' ',
	                "ERROR",
	                ' '),
	            react_1.default.createElement(Text_1.default, null,
	                " ",
	                error.message)),
	        origin && (react_1.default.createElement(Box_1.default, { marginTop: 1 },
	            react_1.default.createElement(Text_1.default, { dimColor: true },
	                origin.file,
	                ":",
	                origin.line,
	                ":",
	                origin.column))),
	        origin && excerpt && (react_1.default.createElement(Box_1.default, { marginTop: 1, flexDirection: "column" }, excerpt.map(({ line, value }) => (react_1.default.createElement(Box_1.default, { key: line },
	            react_1.default.createElement(Box_1.default, { width: lineWidth + 1 },
	                react_1.default.createElement(Text_1.default, { dimColor: line !== origin.line, backgroundColor: line === origin.line ? 'red' : undefined, color: line === origin.line ? 'white' : undefined },
	                    String(line).padStart(lineWidth, ' '),
	                    ":")),
	            react_1.default.createElement(Text_1.default, { key: line, backgroundColor: line === origin.line ? 'red' : undefined, color: line === origin.line ? 'white' : undefined }, ' ' + value)))))),
	        error.stack && (react_1.default.createElement(Box_1.default, { marginTop: 1, flexDirection: "column" }, error.stack
	            .split('\n')
	            .slice(1)
	            .map(line => {
	            const parsedLine = stackUtils.parseLine(line);
	            // If the line from the stack cannot be parsed, we print out the unparsed line.
	            if (!parsedLine) {
	                return (react_1.default.createElement(Box_1.default, { key: line },
	                    react_1.default.createElement(Text_1.default, { dimColor: true }, "- "),
	                    react_1.default.createElement(Text_1.default, { dimColor: true, bold: true }, line)));
	            }
	            return (react_1.default.createElement(Box_1.default, { key: line },
	                react_1.default.createElement(Text_1.default, { dimColor: true }, "- "),
	                react_1.default.createElement(Text_1.default, { dimColor: true, bold: true }, parsedLine.function),
	                react_1.default.createElement(Text_1.default, { dimColor: true, color: "gray" },
	                    ' ',
	                    "(",
	                    parsedLine.file,
	                    ":",
	                    parsedLine.line,
	                    ":",
	                    parsedLine.column,
	                    ")")));
	        })))));
	};
	ErrorOverview.default = ErrorOverview$1;
	
	return ErrorOverview;
}

var hasRequiredApp;

function requireApp () {
	if (hasRequiredApp) return App;
	hasRequiredApp = 1;
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(App, "__esModule", { value: true });
	/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
	const react_1 = __importStar(requireReact());
	const cli_cursor_1 = __importDefault(requireCliCursor());
	const AppContext_1 = __importDefault(requireAppContext());
	const StdinContext_1 = __importDefault(requireStdinContext());
	const StdoutContext_1 = __importDefault(requireStdoutContext());
	const StderrContext_1 = __importDefault(requireStderrContext());
	const FocusContext_1 = __importDefault(requireFocusContext());
	const ErrorOverview_1 = __importDefault(requireErrorOverview());
	const TAB = '\t';
	const SHIFT_TAB = '\u001B[Z';
	const ESC = '\u001B';
	// Root component for all Ink apps
	// It renders stdin and stdout contexts, so that children can access them if needed
	// It also handles Ctrl+C exiting and cursor visibility
	class App$1 extends react_1.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.state = {
	            isFocusEnabled: true,
	            activeFocusId: undefined,
	            focusables: [],
	            error: undefined
	        };
	        // Count how many components enabled raw mode to avoid disabling
	        // raw mode until all components don't need it anymore
	        this.rawModeEnabledCount = 0;
	        this.handleSetRawMode = (isEnabled) => {
	            const { stdin } = this.props;
	            if (!this.isRawModeSupported()) {
	                if (stdin === process.stdin) {
	                    throw new Error('Raw mode is not supported on the current process.stdin, which Ink uses as input stream by default.\nRead about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported');
	                }
	                else {
	                    throw new Error('Raw mode is not supported on the stdin provided to Ink.\nRead about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported');
	                }
	            }
	            stdin.setEncoding('utf8');
	            if (isEnabled) {
	                // Ensure raw mode is enabled only once
	                if (this.rawModeEnabledCount === 0) {
	                    stdin.addListener('data', this.handleInput);
	                    stdin.resume();
	                    stdin.setRawMode(true);
	                }
	                this.rawModeEnabledCount++;
	                return;
	            }
	            // Disable raw mode only when no components left that are using it
	            if (--this.rawModeEnabledCount === 0) {
	                stdin.setRawMode(false);
	                stdin.removeListener('data', this.handleInput);
	                stdin.pause();
	            }
	        };
	        this.handleInput = (input) => {
	            // Exit on Ctrl+C
	            // eslint-disable-next-line unicorn/no-hex-escape
	            if (input === '\x03' && this.props.exitOnCtrlC) {
	                this.handleExit();
	            }
	            // Reset focus when there's an active focused component on Esc
	            if (input === ESC && this.state.activeFocusId) {
	                this.setState({
	                    activeFocusId: undefined
	                });
	            }
	            if (this.state.isFocusEnabled && this.state.focusables.length > 0) {
	                if (input === TAB) {
	                    this.focusNext();
	                }
	                if (input === SHIFT_TAB) {
	                    this.focusPrevious();
	                }
	            }
	        };
	        this.handleExit = (error) => {
	            if (this.isRawModeSupported()) {
	                this.handleSetRawMode(false);
	            }
	            this.props.onExit(error);
	        };
	        this.enableFocus = () => {
	            this.setState({
	                isFocusEnabled: true
	            });
	        };
	        this.disableFocus = () => {
	            this.setState({
	                isFocusEnabled: false
	            });
	        };
	        this.focus = (id) => {
	            this.setState(previousState => {
	                const hasFocusableId = previousState.focusables.some(focusable => (focusable === null || focusable === void 0 ? void 0 : focusable.id) === id);
	                if (!hasFocusableId) {
	                    return previousState;
	                }
	                return { activeFocusId: id };
	            });
	        };
	        this.focusNext = () => {
	            this.setState(previousState => {
	                var _a;
	                const firstFocusableId = (_a = previousState.focusables[0]) === null || _a === void 0 ? void 0 : _a.id;
	                const nextFocusableId = this.findNextFocusable(previousState);
	                return {
	                    activeFocusId: nextFocusableId || firstFocusableId
	                };
	            });
	        };
	        this.focusPrevious = () => {
	            this.setState(previousState => {
	                var _a;
	                const lastFocusableId = (_a = previousState.focusables[previousState.focusables.length - 1]) === null || _a === void 0 ? void 0 : _a.id;
	                const previousFocusableId = this.findPreviousFocusable(previousState);
	                return {
	                    activeFocusId: previousFocusableId || lastFocusableId
	                };
	            });
	        };
	        this.addFocusable = (id, { autoFocus }) => {
	            this.setState(previousState => {
	                let nextFocusId = previousState.activeFocusId;
	                if (!nextFocusId && autoFocus) {
	                    nextFocusId = id;
	                }
	                return {
	                    activeFocusId: nextFocusId,
	                    focusables: [
	                        ...previousState.focusables,
	                        {
	                            id,
	                            isActive: true
	                        }
	                    ]
	                };
	            });
	        };
	        this.removeFocusable = (id) => {
	            this.setState(previousState => ({
	                activeFocusId: previousState.activeFocusId === id
	                    ? undefined
	                    : previousState.activeFocusId,
	                focusables: previousState.focusables.filter(focusable => {
	                    return focusable.id !== id;
	                })
	            }));
	        };
	        this.activateFocusable = (id) => {
	            this.setState(previousState => ({
	                focusables: previousState.focusables.map(focusable => {
	                    if (focusable.id !== id) {
	                        return focusable;
	                    }
	                    return {
	                        id,
	                        isActive: true
	                    };
	                })
	            }));
	        };
	        this.deactivateFocusable = (id) => {
	            this.setState(previousState => ({
	                activeFocusId: previousState.activeFocusId === id
	                    ? undefined
	                    : previousState.activeFocusId,
	                focusables: previousState.focusables.map(focusable => {
	                    if (focusable.id !== id) {
	                        return focusable;
	                    }
	                    return {
	                        id,
	                        isActive: false
	                    };
	                })
	            }));
	        };
	        this.findNextFocusable = (state) => {
	            var _a;
	            const activeIndex = state.focusables.findIndex(focusable => {
	                return focusable.id === state.activeFocusId;
	            });
	            for (let index = activeIndex + 1; index < state.focusables.length; index++) {
	                if ((_a = state.focusables[index]) === null || _a === void 0 ? void 0 : _a.isActive) {
	                    return state.focusables[index].id;
	                }
	            }
	            return undefined;
	        };
	        this.findPreviousFocusable = (state) => {
	            var _a;
	            const activeIndex = state.focusables.findIndex(focusable => {
	                return focusable.id === state.activeFocusId;
	            });
	            for (let index = activeIndex - 1; index >= 0; index--) {
	                if ((_a = state.focusables[index]) === null || _a === void 0 ? void 0 : _a.isActive) {
	                    return state.focusables[index].id;
	                }
	            }
	            return undefined;
	        };
	    }
	    static getDerivedStateFromError(error) {
	        return { error };
	    }
	    // Determines if TTY is supported on the provided stdin
	    isRawModeSupported() {
	        return this.props.stdin.isTTY;
	    }
	    render() {
	        return (react_1.default.createElement(AppContext_1.default.Provider, { value: {
	                exit: this.handleExit
	            } },
	            react_1.default.createElement(StdinContext_1.default.Provider, { value: {
	                    stdin: this.props.stdin,
	                    setRawMode: this.handleSetRawMode,
	                    isRawModeSupported: this.isRawModeSupported(),
	                    internal_exitOnCtrlC: this.props.exitOnCtrlC
	                } },
	                react_1.default.createElement(StdoutContext_1.default.Provider, { value: {
	                        stdout: this.props.stdout,
	                        write: this.props.writeToStdout
	                    } },
	                    react_1.default.createElement(StderrContext_1.default.Provider, { value: {
	                            stderr: this.props.stderr,
	                            write: this.props.writeToStderr
	                        } },
	                        react_1.default.createElement(FocusContext_1.default.Provider, { value: {
	                                activeId: this.state.activeFocusId,
	                                add: this.addFocusable,
	                                remove: this.removeFocusable,
	                                activate: this.activateFocusable,
	                                deactivate: this.deactivateFocusable,
	                                enableFocus: this.enableFocus,
	                                disableFocus: this.disableFocus,
	                                focusNext: this.focusNext,
	                                focusPrevious: this.focusPrevious,
	                                focus: this.focus
	                            } }, this.state.error ? (react_1.default.createElement(ErrorOverview_1.default, { error: this.state.error })) : (this.props.children)))))));
	    }
	    componentDidMount() {
	        cli_cursor_1.default.hide(this.props.stdout);
	    }
	    componentWillUnmount() {
	        cli_cursor_1.default.show(this.props.stdout);
	        // ignore calling setRawMode on an handle stdin it cannot be called
	        if (this.isRawModeSupported()) {
	            this.handleSetRawMode(false);
	        }
	    }
	    componentDidCatch(error) {
	        this.handleExit(error);
	    }
	}
	App.default = App$1;
	App$1.displayName = 'InternalApp';
	
	return App;
}

var hasRequiredInk;

function requireInk () {
	if (hasRequiredInk) return ink;
	hasRequiredInk = 1;
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(ink, "__esModule", { value: true });
	const react_1 = __importDefault(requireReact());
	const lodash_1 = requireLodash();
	const log_update_1 = __importDefault(requireLogUpdate());
	const ansi_escapes_1 = __importDefault(requireAnsiEscapes());
	const is_ci_1 = __importDefault(requireIsCi());
	const auto_bind_1 = __importDefault(requireAutoBind());
	const reconciler_1 = __importDefault(requireReconciler());
	const renderer_1 = __importDefault(requireRenderer());
	const signal_exit_1 = __importDefault(requireSignalExit());
	const patch_console_1 = __importDefault(requireBuild$1());
	const dom = __importStar(requireDom());
	const instances_1 = __importDefault(requireInstances());
	const App_1 = __importDefault(requireApp());
	const isCI = process.env.CI === 'false' ? false : is_ci_1.default;
	const noop = () => { };
	class Ink {
	    constructor(options) {
	        this.resolveExitPromise = () => { };
	        this.rejectExitPromise = () => { };
	        this.unsubscribeExit = () => { };
	        this.onRender = () => {
	            if (this.isUnmounted) {
	                return;
	            }
	            const { output, outputHeight, staticOutput } = renderer_1.default(this.rootNode, 
	            // The 'columns' property can be undefined or 0 when not using a TTY.
	            // In that case we fall back to 80.
	            this.options.stdout.columns || 80);
	            // If <Static> output isn't empty, it means new children have been added to it
	            const hasStaticOutput = staticOutput && staticOutput !== '\n';
	            if (this.options.debug) {
	                if (hasStaticOutput) {
	                    this.fullStaticOutput += staticOutput;
	                }
	                this.options.stdout.write(this.fullStaticOutput + output);
	                return;
	            }
	            if (isCI) {
	                if (hasStaticOutput) {
	                    this.options.stdout.write(staticOutput);
	                }
	                this.lastOutput = output;
	                return;
	            }
	            if (hasStaticOutput) {
	                this.fullStaticOutput += staticOutput;
	            }
	            if (outputHeight >= this.options.stdout.rows) {
	                this.options.stdout.write(ansi_escapes_1.default.clearTerminal + this.fullStaticOutput + output);
	                this.lastOutput = output;
	                return;
	            }
	            // To ensure static output is cleanly rendered before main output, clear main output first
	            if (hasStaticOutput) {
	                this.log.clear();
	                this.options.stdout.write(staticOutput);
	                this.log(output);
	            }
	            if (!hasStaticOutput && output !== this.lastOutput) {
	                this.throttledLog(output);
	            }
	            this.lastOutput = output;
	        };
	        auto_bind_1.default(this);
	        this.options = options;
	        this.rootNode = dom.createNode('ink-root');
	        this.rootNode.onRender = options.debug
	            ? this.onRender
	            : lodash_1.throttle(this.onRender, 32, {
	                leading: true,
	                trailing: true
	            });
	        this.rootNode.onImmediateRender = this.onRender;
	        this.log = log_update_1.default.create(options.stdout);
	        this.throttledLog = options.debug
	            ? this.log
	            : lodash_1.throttle(this.log, undefined, {
	                leading: true,
	                trailing: true
	            });
	        // Ignore last render after unmounting a tree to prevent empty output before exit
	        this.isUnmounted = false;
	        // Store last output to only rerender when needed
	        this.lastOutput = '';
	        // This variable is used only in debug mode to store full static output
	        // so that it's rerendered every time, not just new static parts, like in non-debug mode
	        this.fullStaticOutput = '';
	        this.container = reconciler_1.default.createContainer(this.rootNode, 
	        // Legacy mode
	        0, false, null);
	        // Unmount when process exits
	        this.unsubscribeExit = signal_exit_1.default(this.unmount, { alwaysLast: false });
	        if (options.patchConsole) {
	            this.patchConsole();
	        }
	        if (!isCI) {
	            options.stdout.on('resize', this.onRender);
	            this.unsubscribeResize = () => {
	                options.stdout.off('resize', this.onRender);
	            };
	        }
	    }
	    render(node) {
	        const tree = (react_1.default.createElement(App_1.default, { stdin: this.options.stdin, stdout: this.options.stdout, stderr: this.options.stderr, writeToStdout: this.writeToStdout, writeToStderr: this.writeToStderr, exitOnCtrlC: this.options.exitOnCtrlC, onExit: this.unmount }, node));
	        reconciler_1.default.updateContainer(tree, this.container, null, noop);
	    }
	    writeToStdout(data) {
	        if (this.isUnmounted) {
	            return;
	        }
	        if (this.options.debug) {
	            this.options.stdout.write(data + this.fullStaticOutput + this.lastOutput);
	            return;
	        }
	        if (isCI) {
	            this.options.stdout.write(data);
	            return;
	        }
	        this.log.clear();
	        this.options.stdout.write(data);
	        this.log(this.lastOutput);
	    }
	    writeToStderr(data) {
	        if (this.isUnmounted) {
	            return;
	        }
	        if (this.options.debug) {
	            this.options.stderr.write(data);
	            this.options.stdout.write(this.fullStaticOutput + this.lastOutput);
	            return;
	        }
	        if (isCI) {
	            this.options.stderr.write(data);
	            return;
	        }
	        this.log.clear();
	        this.options.stderr.write(data);
	        this.log(this.lastOutput);
	    }
	    unmount(error) {
	        if (this.isUnmounted) {
	            return;
	        }
	        this.onRender();
	        this.unsubscribeExit();
	        if (typeof this.restoreConsole === 'function') {
	            this.restoreConsole();
	        }
	        if (typeof this.unsubscribeResize === 'function') {
	            this.unsubscribeResize();
	        }
	        // CIs don't handle erasing ansi escapes well, so it's better to
	        // only render last frame of non-static output
	        if (isCI) {
	            this.options.stdout.write(this.lastOutput + '\n');
	        }
	        else if (!this.options.debug) {
	            this.log.done();
	        }
	        this.isUnmounted = true;
	        reconciler_1.default.updateContainer(null, this.container, null, noop);
	        instances_1.default.delete(this.options.stdout);
	        if (error instanceof Error) {
	            this.rejectExitPromise(error);
	        }
	        else {
	            this.resolveExitPromise();
	        }
	    }
	    waitUntilExit() {
	        if (!this.exitPromise) {
	            this.exitPromise = new Promise((resolve, reject) => {
	                this.resolveExitPromise = resolve;
	                this.rejectExitPromise = reject;
	            });
	        }
	        return this.exitPromise;
	    }
	    clear() {
	        if (!isCI && !this.options.debug) {
	            this.log.clear();
	        }
	    }
	    patchConsole() {
	        if (this.options.debug) {
	            return;
	        }
	        this.restoreConsole = patch_console_1.default((stream, data) => {
	            if (stream === 'stdout') {
	                this.writeToStdout(data);
	            }
	            if (stream === 'stderr') {
	                const isReactMessage = data.startsWith('The above error occurred');
	                if (!isReactMessage) {
	                    this.writeToStderr(data);
	                }
	            }
	        });
	    }
	}
	ink.default = Ink;
	
	return ink;
}

var hasRequiredRender;

function requireRender () {
	if (hasRequiredRender) return render;
	hasRequiredRender = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(render, "__esModule", { value: true });
	const ink_1 = __importDefault(requireInk());
	const instances_1 = __importDefault(requireInstances());
	const stream_1 = require$$0$4;
	/**
	 * Mount a component and render the output.
	 */
	const render$1 = (node, options) => {
	    const inkOptions = Object.assign({ stdout: process.stdout, stdin: process.stdin, stderr: process.stderr, debug: false, exitOnCtrlC: true, patchConsole: true }, getOptions(options));
	    const instance = getInstance(inkOptions.stdout, () => new ink_1.default(inkOptions));
	    instance.render(node);
	    return {
	        rerender: instance.render,
	        unmount: () => instance.unmount(),
	        waitUntilExit: instance.waitUntilExit,
	        cleanup: () => instances_1.default.delete(inkOptions.stdout),
	        clear: instance.clear
	    };
	};
	render.default = render$1;
	const getOptions = (stdout = {}) => {
	    if (stdout instanceof stream_1.Stream) {
	        return {
	            stdout,
	            stdin: process.stdin
	        };
	    }
	    return stdout;
	};
	const getInstance = (stdout, createInstance) => {
	    let instance;
	    if (instances_1.default.has(stdout)) {
	        instance = instances_1.default.get(stdout);
	    }
	    else {
	        instance = createInstance();
	        instances_1.default.set(stdout, instance);
	    }
	    return instance;
	};
	
	return render;
}

var Static = {};

var hasRequiredStatic;

function requireStatic () {
	if (hasRequiredStatic) return Static;
	hasRequiredStatic = 1;
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(Static, "__esModule", { value: true });
	const react_1 = __importStar(requireReact());
	/**
	 * `<Static>` component permanently renders its output above everything else.
	 * It's useful for displaying activity like completed tasks or logs - things that
	 * are not changing after they're rendered (hence the name "Static").
	 *
	 * It's preferred to use `<Static>` for use cases like these, when you can't know
	 * or control the amount of items that need to be rendered.
	 *
	 * For example, [Tap](https://github.com/tapjs/node-tap) uses `<Static>` to display
	 * a list of completed tests. [Gatsby](https://github.com/gatsbyjs/gatsby) uses it
	 * to display a list of generated pages, while still displaying a live progress bar.
	 */
	const Static$1 = (props) => {
	    const { items, children: render, style: customStyle } = props;
	    const [index, setIndex] = react_1.useState(0);
	    const itemsToRender = react_1.useMemo(() => {
	        return items.slice(index);
	    }, [items, index]);
	    react_1.useLayoutEffect(() => {
	        setIndex(items.length);
	    }, [items.length]);
	    const children = itemsToRender.map((item, itemIndex) => {
	        return render(item, index + itemIndex);
	    });
	    const style = react_1.useMemo(() => (Object.assign({ position: 'absolute', flexDirection: 'column' }, customStyle)), [customStyle]);
	    return (react_1.default.createElement("ink-box", { 
	        // @ts-ignore
	        internal_static: true, style: style }, children));
	};
	Static$1.displayName = 'Static';
	Static.default = Static$1;
	
	return Static;
}

var Transform = {};

var hasRequiredTransform;

function requireTransform () {
	if (hasRequiredTransform) return Transform;
	hasRequiredTransform = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(Transform, "__esModule", { value: true });
	const react_1 = __importDefault(requireReact());
	/**
	 * Transform a string representation of React components before they are written to output.
	 * For example, you might want to apply a gradient to text, add a clickable link or create some text effects.
	 * These use cases can't accept React nodes as input, they are expecting a string.
	 * That's what <Transform> component does, it gives you an output string of its child components and lets you transform it in any way.
	 */
	const Transform$1 = ({ children, transform }) => {
	    if (children === undefined || children === null) {
	        return null;
	    }
	    return (react_1.default.createElement("ink-text", { style: { flexGrow: 0, flexShrink: 1, flexDirection: 'row' }, internal_transform: transform }, children));
	};
	Transform$1.displayName = 'Transform';
	Transform.default = Transform$1;
	
	return Transform;
}

var Newline = {};

var hasRequiredNewline;

function requireNewline () {
	if (hasRequiredNewline) return Newline;
	hasRequiredNewline = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(Newline, "__esModule", { value: true });
	const react_1 = __importDefault(requireReact());
	/**
	 * Adds one or more newline (\n) characters. Must be used within <Text> components.
	 */
	const Newline$1 = ({ count = 1 }) => (react_1.default.createElement("ink-text", null, '\n'.repeat(count)));
	Newline$1.displayName = 'Newline';
	Newline.default = Newline$1;
	
	return Newline;
}

var Spacer = {};

var hasRequiredSpacer;

function requireSpacer () {
	if (hasRequiredSpacer) return Spacer;
	hasRequiredSpacer = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(Spacer, "__esModule", { value: true });
	const react_1 = __importDefault(requireReact());
	const Box_1 = __importDefault(requireBox());
	/**
	 * A flexible space that expands along the major axis of its containing layout.
	 * It's useful as a shortcut for filling all the available spaces between elements.
	 */
	const Spacer$1 = () => react_1.default.createElement(Box_1.default, { flexGrow: 1 });
	Spacer$1.displayName = 'Spacer';
	Spacer.default = Spacer$1;
	
	return Spacer;
}

var useInput = {};

var useStdin = {};

var hasRequiredUseStdin;

function requireUseStdin () {
	if (hasRequiredUseStdin) return useStdin;
	hasRequiredUseStdin = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(useStdin, "__esModule", { value: true });
	const react_1 = requireReact();
	const StdinContext_1 = __importDefault(requireStdinContext());
	/**
	 * `useStdin` is a React hook, which exposes stdin stream.
	 */
	const useStdin$1 = () => react_1.useContext(StdinContext_1.default);
	useStdin.default = useStdin$1;
	
	return useStdin;
}

var hasRequiredUseInput;

function requireUseInput () {
	if (hasRequiredUseInput) return useInput;
	hasRequiredUseInput = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(useInput, "__esModule", { value: true });
	const react_1 = requireReact();
	const use_stdin_1 = __importDefault(requireUseStdin());
	/**
	 * This hook is used for handling user input.
	 * It's a more convenient alternative to using `StdinContext` and listening to `data` events.
	 * The callback you pass to `useInput` is called for each character when user enters any input.
	 * However, if user pastes text and it's more than one character, the callback will be called only once and the whole string will be passed as `input`.
	 *
	 * ```
	 * import {useInput} from 'ink';
	 *
	 * const UserInput = () => {
	 *   useInput((input, key) => {
	 *     if (input === 'q') {
	 *       // Exit program
	 *     }
	 *
	 *     if (key.leftArrow) {
	 *       // Left arrow key pressed
	 *     }
	 *   });
	 *
	 *   return …
	 * };
	 * ```
	 */
	const useInput$1 = (inputHandler, options = {}) => {
	    const { stdin, setRawMode, internal_exitOnCtrlC } = use_stdin_1.default();
	    react_1.useEffect(() => {
	        if (options.isActive === false) {
	            return;
	        }
	        setRawMode(true);
	        return () => {
	            setRawMode(false);
	        };
	    }, [options.isActive, setRawMode]);
	    react_1.useEffect(() => {
	        if (options.isActive === false) {
	            return;
	        }
	        const handleData = (data) => {
	            let input = String(data);
	            const key = {
	                upArrow: input === '\u001B[A',
	                downArrow: input === '\u001B[B',
	                leftArrow: input === '\u001B[D',
	                rightArrow: input === '\u001B[C',
	                pageDown: input === '\u001B[6~',
	                pageUp: input === '\u001B[5~',
	                return: input === '\r',
	                escape: input === '\u001B',
	                ctrl: false,
	                shift: false,
	                tab: input === '\t' || input === '\u001B[Z',
	                backspace: input === '\u0008',
	                delete: input === '\u007F' || input === '\u001B[3~',
	                meta: false
	            };
	            // Copied from `keypress` module
	            if (input <= '\u001A' && !key.return) {
	                input = String.fromCharCode(input.charCodeAt(0) + 'a'.charCodeAt(0) - 1);
	                key.ctrl = true;
	            }
	            if (input.startsWith('\u001B')) {
	                input = input.slice(1);
	                key.meta = true;
	            }
	            const isLatinUppercase = input >= 'A' && input <= 'Z';
	            const isCyrillicUppercase = input >= 'А' && input <= 'Я';
	            if (input.length === 1 && (isLatinUppercase || isCyrillicUppercase)) {
	                key.shift = true;
	            }
	            // Shift+Tab
	            if (key.tab && input === '[Z') {
	                key.shift = true;
	            }
	            if (key.tab || key.backspace || key.delete) {
	                input = '';
	            }
	            // If app is not supposed to exit on Ctrl+C, then let input listener handle it
	            if (!(input === 'c' && key.ctrl) || !internal_exitOnCtrlC) {
	                inputHandler(input, key);
	            }
	        };
	        stdin === null || stdin === void 0 ? void 0 : stdin.on('data', handleData);
	        return () => {
	            stdin === null || stdin === void 0 ? void 0 : stdin.off('data', handleData);
	        };
	    }, [options.isActive, stdin, internal_exitOnCtrlC, inputHandler]);
	};
	useInput.default = useInput$1;
	
	return useInput;
}

var useApp = {};

var hasRequiredUseApp;

function requireUseApp () {
	if (hasRequiredUseApp) return useApp;
	hasRequiredUseApp = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(useApp, "__esModule", { value: true });
	const react_1 = requireReact();
	const AppContext_1 = __importDefault(requireAppContext());
	/**
	 * `useApp` is a React hook, which exposes a method to manually exit the app (unmount).
	 */
	const useApp$1 = () => react_1.useContext(AppContext_1.default);
	useApp.default = useApp$1;
	
	return useApp;
}

var useStdout = {};

var hasRequiredUseStdout;

function requireUseStdout () {
	if (hasRequiredUseStdout) return useStdout;
	hasRequiredUseStdout = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(useStdout, "__esModule", { value: true });
	const react_1 = requireReact();
	const StdoutContext_1 = __importDefault(requireStdoutContext());
	/**
	 * `useStdout` is a React hook, which exposes stdout stream.
	 */
	const useStdout$1 = () => react_1.useContext(StdoutContext_1.default);
	useStdout.default = useStdout$1;
	
	return useStdout;
}

var useStderr = {};

var hasRequiredUseStderr;

function requireUseStderr () {
	if (hasRequiredUseStderr) return useStderr;
	hasRequiredUseStderr = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(useStderr, "__esModule", { value: true });
	const react_1 = requireReact();
	const StderrContext_1 = __importDefault(requireStderrContext());
	/**
	 * `useStderr` is a React hook, which exposes stderr stream.
	 */
	const useStderr$1 = () => react_1.useContext(StderrContext_1.default);
	useStderr.default = useStderr$1;
	
	return useStderr;
}

var useFocus = {};

var hasRequiredUseFocus;

function requireUseFocus () {
	if (hasRequiredUseFocus) return useFocus;
	hasRequiredUseFocus = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(useFocus, "__esModule", { value: true });
	const react_1 = requireReact();
	const FocusContext_1 = __importDefault(requireFocusContext());
	const use_stdin_1 = __importDefault(requireUseStdin());
	/**
	 * Component that uses `useFocus` hook becomes "focusable" to Ink,
	 * so when user presses <kbd>Tab</kbd>, Ink will switch focus to this component.
	 * If there are multiple components that execute `useFocus` hook, focus will be
	 * given to them in the order that these components are rendered in.
	 * This hook returns an object with `isFocused` boolean property, which
	 * determines if this component is focused or not.
	 */
	const useFocus$1 = ({ isActive = true, autoFocus = false, id: customId } = {}) => {
	    const { isRawModeSupported, setRawMode } = use_stdin_1.default();
	    const { activeId, add, remove, activate, deactivate, focus } = react_1.useContext(FocusContext_1.default);
	    const id = react_1.useMemo(() => {
	        return customId !== null && customId !== void 0 ? customId : Math.random().toString().slice(2, 7);
	    }, [customId]);
	    react_1.useEffect(() => {
	        add(id, { autoFocus });
	        return () => {
	            remove(id);
	        };
	    }, [id, autoFocus]);
	    react_1.useEffect(() => {
	        if (isActive) {
	            activate(id);
	        }
	        else {
	            deactivate(id);
	        }
	    }, [isActive, id]);
	    react_1.useEffect(() => {
	        if (!isRawModeSupported || !isActive) {
	            return;
	        }
	        setRawMode(true);
	        return () => {
	            setRawMode(false);
	        };
	    }, [isActive]);
	    return {
	        isFocused: Boolean(id) && activeId === id,
	        focus
	    };
	};
	useFocus.default = useFocus$1;
	
	return useFocus;
}

var useFocusManager = {};

var hasRequiredUseFocusManager;

function requireUseFocusManager () {
	if (hasRequiredUseFocusManager) return useFocusManager;
	hasRequiredUseFocusManager = 1;
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(useFocusManager, "__esModule", { value: true });
	const react_1 = requireReact();
	const FocusContext_1 = __importDefault(requireFocusContext());
	/**
	 * This hook exposes methods to enable or disable focus management for all
	 * components or manually switch focus to next or previous components.
	 */
	const useFocusManager$1 = () => {
	    const focusContext = react_1.useContext(FocusContext_1.default);
	    return {
	        enableFocus: focusContext.enableFocus,
	        disableFocus: focusContext.disableFocus,
	        focusNext: focusContext.focusNext,
	        focusPrevious: focusContext.focusPrevious,
	        focus: focusContext.focus
	    };
	};
	useFocusManager.default = useFocusManager$1;
	
	return useFocusManager;
}

var measureElement = {};

var hasRequiredMeasureElement;

function requireMeasureElement () {
	if (hasRequiredMeasureElement) return measureElement;
	hasRequiredMeasureElement = 1;
	Object.defineProperty(measureElement, "__esModule", { value: true });
	/**
	 * Measure the dimensions of a particular `<Box>` element.
	 */
	measureElement.default = (node) => {
	    var _a, _b, _c, _d;
	    return ({
	        width: (_b = (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.getComputedWidth()) !== null && _b !== void 0 ? _b : 0,
	        height: (_d = (_c = node.yogaNode) === null || _c === void 0 ? void 0 : _c.getComputedHeight()) !== null && _d !== void 0 ? _d : 0
	    });
	};
	
	return measureElement;
}

var hasRequiredBuild;

function requireBuild () {
	if (hasRequiredBuild) return build$1;
	hasRequiredBuild = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		var render_1 = requireRender();
		Object.defineProperty(exports, "render", { enumerable: true, get: function () { return render_1.default; } });
		var Box_1 = requireBox();
		Object.defineProperty(exports, "Box", { enumerable: true, get: function () { return Box_1.default; } });
		var Text_1 = requireText();
		Object.defineProperty(exports, "Text", { enumerable: true, get: function () { return Text_1.default; } });
		var Static_1 = requireStatic();
		Object.defineProperty(exports, "Static", { enumerable: true, get: function () { return Static_1.default; } });
		var Transform_1 = requireTransform();
		Object.defineProperty(exports, "Transform", { enumerable: true, get: function () { return Transform_1.default; } });
		var Newline_1 = requireNewline();
		Object.defineProperty(exports, "Newline", { enumerable: true, get: function () { return Newline_1.default; } });
		var Spacer_1 = requireSpacer();
		Object.defineProperty(exports, "Spacer", { enumerable: true, get: function () { return Spacer_1.default; } });
		var use_input_1 = requireUseInput();
		Object.defineProperty(exports, "useInput", { enumerable: true, get: function () { return use_input_1.default; } });
		var use_app_1 = requireUseApp();
		Object.defineProperty(exports, "useApp", { enumerable: true, get: function () { return use_app_1.default; } });
		var use_stdin_1 = requireUseStdin();
		Object.defineProperty(exports, "useStdin", { enumerable: true, get: function () { return use_stdin_1.default; } });
		var use_stdout_1 = requireUseStdout();
		Object.defineProperty(exports, "useStdout", { enumerable: true, get: function () { return use_stdout_1.default; } });
		var use_stderr_1 = requireUseStderr();
		Object.defineProperty(exports, "useStderr", { enumerable: true, get: function () { return use_stderr_1.default; } });
		var use_focus_1 = requireUseFocus();
		Object.defineProperty(exports, "useFocus", { enumerable: true, get: function () { return use_focus_1.default; } });
		var use_focus_manager_1 = requireUseFocusManager();
		Object.defineProperty(exports, "useFocusManager", { enumerable: true, get: function () { return use_focus_manager_1.default; } });
		var measure_element_1 = requireMeasureElement();
		Object.defineProperty(exports, "measureElement", { enumerable: true, get: function () { return measure_element_1.default; } });
		
} (build$1));
	return build$1;
}

var buildExports = requireBuild();

var dist = {};

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
Object.defineProperty(dist,"__esModule",{value:!0});var o=requireReact(),r=requireBuild(),x=require$$2$1;function m(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var t=m(o),l=m(x);const T=({children:e})=>t.default.createElement(r.Box,{flexDirection:"column"},e);function v(){return l.default.platform!=="win32"?l.default.env.TERM!=="linux":Boolean(l.default.env.CI)||Boolean(l.default.env.WT_SESSION)||l.default.env.ConEmuTask==="{cmd::Cmder}"||l.default.env.TERM_PROGRAM==="vscode"||l.default.env.TERM==="xterm-256color"||l.default.env.TERM==="alacritty"||l.default.env.TERMINAL_EMULATOR==="JetBrains-JediTerm"}const y={arrowRight:"\u2192",tick:"\u2714",info:"\u2139",warning:"\u26A0",cross:"\u2716",squareSmallFilled:"\u25FC",pointer:"\u276F"},R={arrowRight:"\u2192",tick:"\u221A",info:"i",warning:"\u203C",cross:"\xD7",squareSmallFilled:"\u25A0",pointer:">"};var n=v()?y:R;const k=({spinner:e})=>{const[a,u]=o.useState(0);return o.useEffect(()=>{const c=setInterval(()=>{u(i=>i===e.frames.length-1?0:i+1);},e.interval);return ()=>{clearInterval(c);}},[e]),t.default.createElement(r.Text,null,e.frames[a])},w=e=>e==="warning"?t.default.createElement(r.Text,{color:"yellow"},n.warning):e==="error"?t.default.createElement(r.Text,{color:"red"},n.cross):e==="success"?t.default.createElement(r.Text,{color:"green"},n.tick):e==="pending"?t.default.createElement(r.Text,{color:"gray"},n.squareSmallFilled):" ",S=e=>t.default.createElement(r.Text,{color:e==="error"?"red":"yellow"},n.pointer),h=({label:e,state:a="pending",status:u,output:c,spinner:i,isExpanded:f,children:E})=>{const d=o.Children.toArray(E).filter(g=>o.isValidElement(g));let s=a==="loading"?t.default.createElement(r.Text,{color:"yellow"},t.default.createElement(k,{spinner:i})):w(a);return f&&(s=S(a)),t.default.createElement(r.Box,{flexDirection:"column"},t.default.createElement(r.Box,null,t.default.createElement(r.Box,{marginRight:1},t.default.createElement(r.Text,null,s)),t.default.createElement(r.Text,null,e),u?t.default.createElement(r.Box,{marginLeft:1},t.default.createElement(r.Text,{dimColor:!0},"[",u,"]")):void 0),c?t.default.createElement(r.Box,{marginLeft:2},t.default.createElement(r.Text,{color:"gray"},`${n.arrowRight} ${c}`)):void 0,f&&d.length>0&&t.default.createElement(r.Box,{flexDirection:"column",marginLeft:2},d))};dist.Task=h,dist.TaskList=T;
	return dist;
}

var distExports = requireDist();

const spinner = {
  interval: 100,
  frames: [
    "\u280B",
    "\u2819",
    "\u2839",
    "\u2838",
    "\u283C",
    "\u2834",
    "\u2826",
    "\u2827",
    "\u2807",
    "\u280F"
  ]
};
const TaskListItem = ({
  task
}) => {
  const childTasks = task.children.length > 0 ? task.children.map((childTask, index) => /* @__PURE__ */ reactExports.createElement(TaskListItem, {
    key: index,
    task: childTask
  })) : [];
  return /* @__PURE__ */ reactExports.createElement(distExports.Task, {
    state: task.state,
    label: task.title,
    status: task.status,
    spinner,
    output: task.output,
    isExpanded: childTasks.length > 0
  }, childTasks);
};

const TaskListApp = ({
  taskList
}) => {
  const state = useSnapshot(taskList);
  return /* @__PURE__ */ reactExports.createElement(distExports.TaskList, null, state.map((task, index) => /* @__PURE__ */ reactExports.createElement(TaskListItem, {
    key: index,
    task
  })));
};

function createApp(taskList) {
  const inkApp = buildExports.render(/* @__PURE__ */ reactExports.createElement(TaskListApp, {
    taskList
  }));
  return {
    remove() {
      inkApp.rerender(null);
      inkApp.unmount();
      inkApp.clear();
      inkApp.cleanup();
    }
  };
}

const runSymbol = Symbol("run");

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const createTaskInnerApi = (taskState) => {
  const api = {
    task: createTaskFunction(taskState.children),
    setTitle(title) {
      taskState.title = title;
    },
    setStatus(status) {
      taskState.status = status;
    },
    setOutput(output) {
      taskState.output = typeof output === "string" ? output : "message" in output ? output.message : "";
    },
    setWarning(warning) {
      taskState.state = "warning";
      if (warning !== void 0) {
        api.setOutput(warning);
      }
    },
    setError(error) {
      taskState.state = "error";
      if (error !== void 0) {
        api.setOutput(error);
      }
    }
  };
  return api;
};
let app;
function registerTask(taskList, taskTitle, taskFunction) {
  if (!app) {
    app = createApp(taskList);
    taskList.isRoot = true;
  }
  const task = arrayAdd(taskList, {
    title: taskTitle,
    state: "pending",
    children: []
  });
  return {
    task,
    async [runSymbol]() {
      const api = createTaskInnerApi(task);
      task.state = "loading";
      let taskResult;
      try {
        taskResult = await taskFunction(api);
      } catch (error) {
        api.setError(error);
        throw error;
      }
      if (task.state === "loading") {
        task.state = "success";
      }
      return taskResult;
    },
    clear() {
      arrayRemove(taskList, task);
      if (taskList.isRoot && taskList.length === 0) {
        app.remove();
        app = void 0;
      }
    }
  };
}
function createTaskFunction(taskList) {
  const task = async (title, taskFunction) => {
    const registeredTask = registerTask(taskList, title, taskFunction);
    const result = await registeredTask[runSymbol]();
    return {
      result,
      get state() {
        return registeredTask.task.state;
      },
      clear: registeredTask.clear
    };
  };
  task.group = async (createTasks, options) => {
    const tasksQueue = createTasks((title, taskFunction) => registerTask(taskList, title, taskFunction));
    const results = await pMap(tasksQueue, async (taskApi) => ({
      result: await taskApi[runSymbol](),
      get state() {
        return taskApi.task.state;
      },
      clear: taskApi.clear
    }), __spreadValues({
      concurrency: 1
    }, options));
    return Object.assign(results, {
      clear() {
        for (const taskApi of tasksQueue) {
          taskApi.clear();
        }
      }
    });
  };
  return task;
}
const rootTaskList = proxy([]);
var index = createTaskFunction(rootTaskList);

export { index as default };
