(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createEvents = exports.createMetaReducer = exports.createMiddleware = undefined;

	var _createMiddleware = __webpack_require__(1);

	var _createMiddleware2 = _interopRequireDefault(_createMiddleware);

	var _createMetaReducer = __webpack_require__(4);

	var _createMetaReducer2 = _interopRequireDefault(_createMetaReducer);

	var _createEvents = __webpack_require__(2);

	var _createEvents2 = _interopRequireDefault(_createEvents);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.createMiddleware = _createMiddleware2.default;
	exports.createMetaReducer = _createMetaReducer2.default;
	exports.createEvents = _createEvents2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createEvents = __webpack_require__(2);

	var _createEvents2 = _interopRequireDefault(_createEvents);

	var _registerEvents = __webpack_require__(3);

	var _registerEvents2 = _interopRequireDefault(_registerEvents);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createMiddleware(eventDefinitionsMap, target) {
	  var extensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  return function (store) {
	    return function (next) {
	      return function (action) {
	        if (!eventDefinitionsMap[action.type]) {
	          return next(action);
	        }

	        var prevState = store.getState();
	        var result = next(action);
	        var nextState = store.getState();

	        var events = (0, _createEvents2.default)(eventDefinitionsMap[action.type], prevState, action, nextState);

	        (0, _registerEvents2.default)(events, target, extensions, prevState, action);

	        return result;
	      };
	    };
	  };
	}

	exports.default = createMiddleware;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var createEvents = function createEvents(eventDefinition, prevState, action, nextState) {
	  return [].concat(eventDefinition(action, prevState, nextState)).filter(function (ifTruethy) {
	    return ifTruethy;
	  });
	};

	exports.default = createEvents;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function registerEvents(events, target) {
	  var extensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var state = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	  var action = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	  var logger = extensions.logger,
	      offlineStorage = extensions.offlineStorage;


	  var ifLoggerLog = function ifLoggerLog() {
	    if (typeof logger === 'function') {
	      logger.apply(undefined, arguments);
	    }
	  };

	  if (offlineStorage === undefined) {
	    target(events);
	    ifLoggerLog(events, action, state);
	  } else if (offlineStorage.isConnected(state)) {
	    target(events);
	    ifLoggerLog(events, action, state);
	    offlineStorage.purgeEvents(function (oldEvents) {
	      if (Array.isArray(oldEvents) && oldEvents.length > 0) {
	        target(oldEvents);
	        ifLoggerLog(oldEvents, null, null, false, true);
	      }
	    });
	  } else {
	    offlineStorage.saveEvents(events);
	    ifLoggerLog(events, action, state, true, false);
	  }
	}

	exports.default = registerEvents;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createEvents = __webpack_require__(2);

	var _createEvents2 = _interopRequireDefault(_createEvents);

	var _registerEvents = __webpack_require__(3);

	var _registerEvents2 = _interopRequireDefault(_registerEvents);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createMetaReducer(eventDefinitionsMap, target) {
	  var extensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  /* Why not arrow functions? AOT... */
	  /* eslint-disable func-names */
	  return function (reducer) {
	    return function (prevState, action) {
	      if (!eventDefinitionsMap[action.type]) {
	        return reducer(prevState, action);
	      }

	      var nextState = reducer(prevState, action);
	      var events = (0, _createEvents2.default)(eventDefinitionsMap[action.type], prevState, action, nextState);

	      (0, _registerEvents2.default)(events, target, extensions, prevState, action);

	      return nextState;
	    };
	  };
	}

	exports.default = createMetaReducer;

/***/ })
/******/ ])
});
;