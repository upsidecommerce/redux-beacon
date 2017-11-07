'use strict';

var _utils = require('../../utils');

var GoogleAnalytics = function GoogleAnalytics() {
  return function (events) {
    if (typeof window === 'undefined') {
      return;
    }
    if (typeof window.ga !== 'function') {
      throw new Error('window.ga is not defined, Have you forgotten to include Google Analytics?');
    }
    events.forEach(function (event) {
      var customTrackerId = event.customTrackerId || event.tracker;
      var trackerId = !!customTrackerId && !!customTrackerId.trim() ? customTrackerId + '.' : '';
      var ecommPluginType = event.ecommType === 'enhanced' ? 'ec' : 'ecommerce';

      if ((0, _utils.isEcommEvent)(event)) {
        var callEvent = function callEvent(type) {
          return {
            addItem: function addItem() {
              return window.ga('' + trackerId + ecommPluginType + ':addItem', (0, _utils.filterEcommEvents)(event));
            },
            addTransaction: function addTransaction() {
              return window.ga('' + trackerId + ecommPluginType + ':addTransaction', (0, _utils.filterEcommEvents)(event));
            },
            addImpression: function addImpression() {
              return window.ga('' + trackerId + ecommPluginType + ':addImpression', (0, _utils.filterEcommEvents)(event));
            },
            addProduct: function addProduct() {
              return window.ga('' + trackerId + ecommPluginType + ':addProduct', (0, _utils.filterEcommEvents)(event));
            },
            addPromo: function addPromo() {
              return window.ga('' + trackerId + ecommPluginType + ':addPromo', (0, _utils.filterEcommEvents)(event));
            },
            addAction: function addAction() {
              return window.ga('' + trackerId + ecommPluginType + ':addAction', event.actionName, (0, _utils.filterEcommEvents)(event));
            },
            ecommClear: function ecommClear() {
              return window.ga('' + trackerId + ecommPluginType + ':clear');
            },
            ecommSend: function ecommSend() {
              return window.ga('' + trackerId + ecommPluginType + ':send');
            }
          }[type]();
        };

        callEvent(event.hitType);
      } else {
        if (event.hitType === 'pageview') {
          window.ga(trackerId + 'set', 'page', event.page);
        }
        window.ga(trackerId + 'send', event);
      }
    });
  };
};

module.exports = { GoogleAnalytics: GoogleAnalytics };