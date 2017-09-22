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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getTimestamp = exports.logger = undefined;

	var _logger = __webpack_require__(5);

	exports.logger = _logger.logger;
	exports.getTimestamp = _logger.getTimestamp;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function getTimestamp(sinceEpoch) {
	  var date = new Date(sinceEpoch);
	  return date.toTimeString().match(/^\d\d:\d\d:\d\d/g).concat(date.getTime().toString().slice(-3)).join('.');
	}

	var styles = {
	  title: {
	    primary: 'color: #1da1f2; font-weight: bold;',
	    danger: 'color: #D63230; font-weight: bold;',
	    warning: 'color: #F39237; font-weight: bold;'
	  },
	  label: 'color: #93748A; font-weight: bold;'
	};

	/* eslint-disable no-console */
	function logEvents(events) {
	  if (events.length > 1) {
	    console.group('%c Events:', styles.label);
	    events.forEach(function (event, index) {
	      console.log('%c (' + (index + 1) + ')', styles.label, event);
	    });
	    console.groupEnd('Events');
	  } else if (events.length === 1) {
	    console.log('%c Event:', styles.label, events[0]);
	  }
	}

	function logAction(action) {
	  console.log('%c Action:', styles.label, action);
	}

	function logger(events, action, state, isSavedOffline, wasSavedOffline) {
	  var timestamp = getTimestamp(Date.now());
	  var title = 'Analytics events @ ' + timestamp + ' ' + (action ? action.type : '');

	  if (events.length > 0) {
	    if (isSavedOffline) {
	      console.group('%c ' + title + ' (saved offline)', styles.title.danger);
	      logAction(action);
	      logEvents(events);
	      console.groupEnd();
	    } else if (wasSavedOffline) {
	      console.group('%c ' + title + ' (was offline)', styles.title.warning);
	      logEvents(events);
	      console.groupEnd();
	    } else {
	      console.group('%c ' + title, styles.title.primary);
	      logAction(action);
	      logEvents(events);
	      console.groupEnd();
	    }
	  }
	}

	exports.logger = logger;
	exports.getTimestamp = getTimestamp;

/***/ })

/******/ })
});
;