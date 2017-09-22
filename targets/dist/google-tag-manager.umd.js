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
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(13);

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

	'use strict';

	var GoogleTagManager = function GoogleTagManager() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      _ref$dataLayerName = _ref.dataLayerName,
	      dataLayerName = _ref$dataLayerName === undefined ? 'dataLayer' : _ref$dataLayerName;

	  return function (events) {
	    if (typeof window === 'undefined') {
	      return;
	    }
	    if (!window[dataLayerName] || typeof window[dataLayerName].push !== 'function') {
	      throw new Error('redux-beacon error: window.' + dataLayerName + ' is not defined. Have you forgotten to include Google Tag Manager and dataLayer?');
	    }
	    events.forEach(function (event) {
	      var eventToPush = function () {
	        if (event.event === undefined && event.hitType !== undefined) {
	          return Object.assign({}, event, { event: event.hitType });
	        }
	        return event;
	      }();
	      window[dataLayerName].push(eventToPush);
	    });
	  };
	};

	module.exports = { GoogleTagManager: GoogleTagManager };

/***/ })

/******/ })
});
;