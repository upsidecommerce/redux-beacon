'use strict';

var path = require('path');

var _require = require('typings-tester'),
    check = _require.check;

function tsTypesTester(tsFiles) {
  describe('Typescript type definitions', function () {
    it('compiles successfully', function () {
      var tsConfigFile = path.join(__dirname, 'tsconfig.json');
      check(tsFiles, tsConfigFile);
    });
  });
}

module.exports = { tsTypesTester: tsTypesTester };