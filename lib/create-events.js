"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createEvents = function createEvents(eventDefinition, prevState, action, nextState) {
  return [].concat(eventDefinition(action, prevState, nextState)).filter(function (ifTruethy) {
    return ifTruethy;
  });
};

exports.default = createEvents;