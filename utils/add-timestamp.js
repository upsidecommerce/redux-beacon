"use strict";

function addTimestamp(events) {
  return events.map(function (event) {
    return Object.assign({}, event, { timeSaved: Date.now() });
  });
}

module.exports = {
  addTimestamp: addTimestamp
};