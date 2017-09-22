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

	module.exports = __webpack_require__(6);

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(7),
	    addTimestamp = _require.addTimestamp;

	var DB_NAME = 'AnalyticsEvents';
	var DB_VERSION = 1;

	function openDB(dbName, version) {
	  return new Promise(function (resolve, reject) {
	    var request = window.indexedDB.open(dbName, version);

	    request.onsuccess = function (event) {
	      var db = event.target.result;
	      resolve(db);
	    };
	    request.onupgradeneeded = function (event) {
	      /* Runs if the db hasn't been created yet, or if the requested db
	       * version is greater than the existing db version.  This will run
	       * before onsuccess */
	      var db = event.target.result;
	      db.createObjectStore('EventsStore', { autoIncrement: true });
	    };
	    request.onerror = reject;
	  });
	}

	function save(events, db) {
	  return new Promise(function (resolve, reject) {
	    var transaction = db.transaction(['EventsStore'], 'readwrite');
	    var objectStore = transaction.objectStore('EventsStore');

	    var addEvents = objectStore.add(addTimestamp(events));
	    addEvents.onsuccess = function () {
	      return resolve(events);
	    };
	    addEvents.onerror = reject;
	  });
	}

	function purge(db) {
	  return new Promise(function (resolve, reject) {
	    var transaction = db.transaction(['EventsStore'], 'readwrite');
	    var objectStore = transaction.objectStore('EventsStore');
	    var openCursor = objectStore.openCursor();

	    var oldEvents = [];
	    openCursor.onsuccess = function (event) {
	      var cursor = event.target.result;
	      if (cursor) {
	        oldEvents = oldEvents.concat(cursor.value);
	        objectStore.delete(cursor.key);
	        cursor.continue();
	      } else {
	        resolve(oldEvents);
	      }
	    };
	    openCursor.onerror = reject;
	  });
	}

	function offlineWeb(isConnected) {
	  return {
	    saveEvents: function saveEvents(events) {
	      return openDB(DB_NAME, DB_VERSION).then(function (db) {
	        return save(events, db);
	      });
	    },
	    purgeEvents: function purgeEvents(handlePurgedEvents) {
	      return openDB(DB_NAME, DB_VERSION).then(purge).then(handlePurgedEvents);
	    },

	    isConnected: isConnected
	  };
	}

	module.exports = { offlineWeb: offlineWeb, addTimestamp: addTimestamp };

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	function addTimestamp(events) {
	  return events.map(function (event) {
	    return Object.assign({}, event, { timeSaved: Date.now() });
	  });
	}

	module.exports = {
	  addTimestamp: addTimestamp
	};

/***/ })
/******/ ])
});
;