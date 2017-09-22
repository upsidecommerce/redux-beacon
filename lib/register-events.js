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