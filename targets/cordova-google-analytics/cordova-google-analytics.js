'use strict';

var CordovaGoogleAnalytics = function CordovaGoogleAnalytics() {
  return function (events) {
    events.forEach(function (event) {
      switch (event.hitType) {
        case 'pageview':
          window.ga.trackView(event.page, event.location, event.newSession);
          break;
        case 'event':
          window.ga.trackEvent(event.eventCategory, event.eventAction, event.eventLabel, event.eventValue);
          break;
        default:
          break;
      }
    });
  };
};

module.exports = { CordovaGoogleAnalytics: CordovaGoogleAnalytics };