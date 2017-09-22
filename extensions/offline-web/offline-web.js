'use strict';

var _require = require('../../utils/add-timestamp'),
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