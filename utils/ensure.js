"use strict";

var ensure = function ensure(isValid, eventDef) {
  return function () {
    var event = eventDef.apply(undefined, arguments);
    return isValid(event) ? event : null;
  };
};

module.exports = { ensure: ensure };