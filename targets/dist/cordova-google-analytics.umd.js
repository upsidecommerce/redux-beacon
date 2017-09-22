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

	var _require = __webpack_require__(8),
	    CordovaGoogleAnalytics = _require.CordovaGoogleAnalytics;

	module.exports = { CordovaGoogleAnalytics: CordovaGoogleAnalytics };

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

	'use strict';

	function CordovaGoogleAnalytics(events) {
	  events.forEach(function (event) {
	    switch (event.hitType) {
	      case 'pageview':
	        window.ga.trackView(event.page, event.location, event.newSession);
	        break;
	      case 'event':
	        window.ga.trackEvent(event.eventCategory, event.eventAction, event.eventLabel, event.eventValue);
	        break;
	      default:
	        break;
	    }
	  });
	}

	module.exports = { CordovaGoogleAnalytics: CordovaGoogleAnalytics };

/***/ })

/******/ })
});
;