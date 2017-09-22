'use strict';

var _require = require('../../utils'),
    filterEcommEvents = _require.filterEcommEvents,
    isEcommEvent = _require.isEcommEvent;

function GoogleAnalytics(events) {
  if (typeof window === 'undefined') {
    return;
  }
  if (typeof window.ga !== 'function') {
    throw new Error('window.ga is not defined, Have you forgotten to include Google Analytics?');
  }
  events.forEach(function (event) {
    if (isEcommEvent(event)) {
      var trackerId = event.customTrackerId ? event.customTrackerId + '.' : '';
      var callEvent = function callEvent(type) {
        return {
          addItem: function addItem() {
            return window.ga(trackerId + 'ecommerce:addItem', filterEcommEvents(event));
          },
          addTransaction: function addTransaction() {
            return window.ga(trackerId + 'ecommerce:addTransaction', filterEcommEvents(event));
          },
          ecommClear: function ecommClear() {
            return window.ga(trackerId + 'ecommerce:clear');
          },
          ecommSend: function ecommSend() {
            return window.ga(trackerId + 'ecommerce:send');
          }
        }[type]();
      };

      callEvent(event.hitType);
    } else {
      if (event.hitType === 'pageview') {
        window.ga('set', 'page', event.page);
      }
      window.ga('send', event);
    }
  });
}

module.exports = { GoogleAnalytics: GoogleAnalytics };