'use strict';

var filterEcommEvents = function filterEcommEvents(obj) {
  var newObj = {};
  Object.keys(obj).forEach(function (key) {
    if (key !== 'hitType' && key !== 'customTrackerId') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

var isEcommEvent = function isEcommEvent(event) {
  return ['addTransaction', 'addItem', 'ecommSend', 'ecommClear'].indexOf(event.hitType) > -1;
};

module.exports = {
  filterEcommEvents: filterEcommEvents,
  isEcommEvent: isEcommEvent
};