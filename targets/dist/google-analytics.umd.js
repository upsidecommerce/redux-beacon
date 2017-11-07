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

	module.exports = __webpack_require__(9);

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(10);

	var GoogleAnalytics = function GoogleAnalytics() {
	  return function (events) {
	    if (typeof window === 'undefined') {
	      return;
	    }
	    if (typeof window.ga !== 'function') {
	      throw new Error('window.ga is not defined, Have you forgotten to include Google Analytics?');
	    }
	    events.forEach(function (event) {
	      var customTrackerId = event.customTrackerId || event.tracker;
	      var trackerId = !!customTrackerId && !!customTrackerId.trim() ? customTrackerId + '.' : '';
	      var ecommPluginType = event.ecommType === 'enhanced' ? 'ec' : 'ecommerce';

	      if ((0, _utils.isEcommEvent)(event)) {
	        var callEvent = function callEvent(type) {
	          return {
	            addItem: function addItem() {
	              return window.ga('' + trackerId + ecommPluginType + ':addItem', (0, _utils.filterEcommEvents)(event));
	            },
	            addTransaction: function addTransaction() {
	              return window.ga('' + trackerId + ecommPluginType + ':addTransaction', (0, _utils.filterEcommEvents)(event));
	            },
	            addImpression: function addImpression() {
	              return window.ga('' + trackerId + ecommPluginType + ':addImpression', (0, _utils.filterEcommEvents)(event));
	            },
	            addProduct: function addProduct() {
	              return window.ga('' + trackerId + ecommPluginType + ':addProduct', (0, _utils.filterEcommEvents)(event));
	            },
	            addPromo: function addPromo() {
	              return window.ga('' + trackerId + ecommPluginType + ':addPromo', (0, _utils.filterEcommEvents)(event));
	            },
	            addAction: function addAction() {
	              return window.ga('' + trackerId + ecommPluginType + ':addAction', event.actionName, (0, _utils.filterEcommEvents)(event));
	            },
	            ecommClear: function ecommClear() {
	              return window.ga('' + trackerId + ecommPluginType + ':clear');
	            },
	            ecommSend: function ecommSend() {
	              return window.ga('' + trackerId + ecommPluginType + ':send');
	            }
	          }[type]();
	        };

	        callEvent(event.hitType);
	      } else {
	        if (event.hitType === 'pageview') {
	          window.ga(trackerId + 'set', 'page', event.page);
	        }
	        window.ga(trackerId + 'send', event);
	      }
	    });
	  };
	};

	module.exports = { GoogleAnalytics: GoogleAnalytics };

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(11),
	    ensure = _require.ensure;

	var _require2 = __webpack_require__(12),
	    filterEcommEvents = _require2.filterEcommEvents,
	    isEcommEvent = _require2.isEcommEvent;

	module.exports = {
	  ensure: ensure,
	  filterEcommEvents: filterEcommEvents,
	  isEcommEvent: isEcommEvent
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	var ensure = function ensure(isValid, eventDef) {
	  return function () {
	    var event = eventDef.apply(undefined, arguments);
	    return isValid(event) ? event : null;
	  };
	};

	module.exports = { ensure: ensure };

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	var filterEcommEvents = function filterEcommEvents(obj) {
	  var newObj = {};
	  var invalidKeys = ['hitType', 'customTrackerId', 'ecommType', 'actionName'];
	  Object.keys(obj).forEach(function (key) {
	    if (invalidKeys.indexOf(key) === -1) {
	      newObj[key] = obj[key];
	    }
	  });
	  return newObj;
	};

	var isEcommEvent = function isEcommEvent(event) {
	  return ['addTransaction', 'addItem', 'addImpression', 'addProduct', 'addPromo', 'addAction', 'ecommSend', 'ecommClear'].indexOf(event.hitType) > -1;
	};

	module.exports = {
	  filterEcommEvents: filterEcommEvents,
	  isEcommEvent: isEcommEvent
	};

/***/ })
/******/ ])
});
;