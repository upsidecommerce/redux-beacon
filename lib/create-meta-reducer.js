'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createEvents = require('./create-events');

var _createEvents2 = _interopRequireDefault(_createEvents);

var _registerEvents = require('./register-events');

var _registerEvents2 = _interopRequireDefault(_registerEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMetaReducer(eventDefinitionsMap, target) {
  var extensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  /* Why not arrow functions? AOT... */
  /* eslint-disable func-names */
  return function (reducer) {
    return function (prevState, action) {
      if (!eventDefinitionsMap[action.type]) {
        return reducer(prevState, action);
      }

      var nextState = reducer(prevState, action);
      var events = (0, _createEvents2.default)(eventDefinitionsMap[action.type], prevState, action, nextState);

      (0, _registerEvents2.default)(events, target, extensions, prevState, action);

      return nextState;
    };
  };
}

exports.default = createMetaReducer;