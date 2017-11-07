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