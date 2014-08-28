
var assert = require('assert');
var BlockquoteCommand = require('../');

describe('BlockquoteCommand', function () {
  var div;

  afterEach(function () {
    if (div) {
      // clean up...
      document.body.removeChild(div);
      div = null;
    }
  });

  describe('new BlockquoteCommand()', function () {

    it('should create a `BlockquoteCommand` instance', function () {
      var h1 = new BlockquoteCommand('h1');

      assert(h1 instanceof BlockquoteCommand);
      assert(h1.document === document);
    });

    describe('execute()', function () {


    });

  });

});
