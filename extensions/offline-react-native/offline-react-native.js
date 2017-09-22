'use strict';

var _require = require('../../utils/add-timestamp'),
    addTimestamp = _require.addTimestamp;

var STORE_KEY = 'EventsStore';

function offlineReactNative(AsyncStorage, isConnected) {
  var saveEvents = function saveEvents(events) {
    return AsyncStorage.getItem(STORE_KEY).then(JSON.parse).then(function (oldEvents) {
      var stampedEvents = addTimestamp(events);
      return oldEvents ? oldEvents.concat(stampedEvents) : stampedEvents;
    }).then(JSON.stringify).then(AsyncStorage.setItem.bind(null, STORE_KEY)).then(function () {
      return events;
    });
  };

  var purgeEvents = function purgeEvents(handlePurgedEvents) {
    return AsyncStorage.getItem(STORE_KEY, function () {
      return AsyncStorage.removeItem(STORE_KEY);
    }).then(JSON.parse).then(handlePurgedEvents);
  };

  return {
    isConnected: isConnected,
    saveEvents: saveEvents,
    purgeEvents: purgeEvents
  };
}

module.exports = { offlineReactNative: offlineReactNative };