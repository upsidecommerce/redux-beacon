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