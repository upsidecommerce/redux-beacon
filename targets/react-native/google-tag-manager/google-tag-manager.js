"use strict";

function GoogleTagManager(trackingId, GTMBridge) {
  GTMBridge.openContainerWithId(trackingId);
  return function GoogleTagManagerTarget(events) {
    events.forEach(function (event) {
      var eventToPush = function () {
        if (event.event === undefined && event.hitType !== undefined) {
          return Object.assign({}, event, { event: event.hitType });
        }
        return event;
      }();
      GTMBridge.pushDataLayerEvent(eventToPush);
    });
  };
}

module.exports = { GoogleTagManager: GoogleTagManager };