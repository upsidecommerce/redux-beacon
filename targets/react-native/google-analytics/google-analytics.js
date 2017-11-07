'use strict';

function GoogleAnalytics(trackingId, GoogleAnalyticsTracker) {
  var tracker = new GoogleAnalyticsTracker(trackingId);

  function target(events) {
    events.forEach(function (event) {
      switch (event.hitType) {
        case 'event':
          {
            var options = {};

            if (event.eventLabel !== undefined) {
              options.label = event.eventLabel;
            }
            if (event.eventValue !== undefined) {
              options.value = event.eventValue;
            }

            if (Object.keys(options).length > 0) {
              tracker.trackEvent(event.eventCategory, event.eventAction, options);
            } else {
              tracker.trackEvent(event.eventCategory, event.eventAction);
            }
            break;
          }

        case 'eventCustomDimensions':
          {
            var _options = {};

            if (event.eventLabel !== undefined) {
              _options.label = event.eventLabel;
            }
            if (event.eventValue !== undefined) {
              _options.value = event.eventValue;
            }

            if (Object.keys(_options).length > 0) {
              tracker.trackEventWithCustomDimensionValues(event.eventCategory, event.eventAction, _options, event.customDimensionDict);
            } else {
              tracker.trackEventWithCustomDimensionValues(event.eventCategory, event.eventAction, {}, event.customDimensionDict);
            }
            break;
          }

        case 'pageview':
          {
            tracker.trackScreenView(event.page);
            break;
          }

        case 'pageviewCustomDimensions':
          {
            tracker.trackScreenViewWithCustomDimensionValues(event.page, event.customDimensionDict);
            break;
          }

        case 'timing':
          {
            // timingVar is always required for timingLabel
            if (event.timingVar !== undefined) {
              var _options2 = { name: event.timingVar };

              if (event.timingLabel !== undefined) {
                _options2.label = event.timingLabel;
              }

              tracker.trackTiming(event.timingCategory, event.timingValue, _options2);
            } else {
              tracker.trackTiming(event.timingCategory, event.timingValue);
            }
            break;
          }

        case 'social':
          {
            tracker.trackSocialInteraction(event.socialNetwork, event.socialAction, event.socialTarget);
            break;
          }

        case 'user':
          {
            tracker.setUser(event.userId);
            break;
          }

        case 'client':
          {
            tracker.setClient(event.clientId);
            break;
          }

        case 'exception':
          {
            tracker.trackException(event.exDescription, event.exFatal);
            break;
          }

        default:
      }
    });
  }

  return target;
}

module.exports = { GoogleAnalytics: GoogleAnalytics };