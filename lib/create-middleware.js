'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createEvents = require('./create-events');

var _createEvents2 = _interopRequireDefault(_createEvents);

var _registerEvents = require('./register-events');

var _registerEvents2 = _interopRequireDefault(_registerEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMiddleware(eventDefinitionsMap, target) {
  var extensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return function (store) {
    return function (next) {
      return function (action) {
        if (!eventDefinitionsMap[action.type]) {
          return next(action);
        }

        var prevState = store.getState();
        var result = next(action);
        var nextState = store.getState();

        var events = (0, _createEvents2.default)(eventDefinitionsMap[action.type], prevState, action, nextState);

        (0, _registerEvents2.default)(events, target, extensions, prevState, action);

        return result;
      };
    };
  };
}

exports.default = createMiddleware;