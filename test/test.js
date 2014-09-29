
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
      var blockquote = new BlockquoteCommand();

      assert(blockquote instanceof BlockquoteCommand);
      assert(blockquote.document === document);
    });

    describe('execute()', function () {

      it('should insert a BLOCKQUOTE element around parent block', function () {
        div = document.createElement('div');
        div.innerHTML = '<p>hello</p><p>world!</p>';
        div.setAttribute('contenteditable', 'true');
        document.body.appendChild(div);

        // set current selection
        var range = document.createRange();
        range.setStart(div.firstChild.firstChild, 1);
        range.setEnd(div.firstChild.firstChild, 1);
        assert(range.collapsed);

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        var blockquote = new BlockquoteCommand();
        blockquote.execute();

        // test that we have the expected HTML at this point
        assert.equal('<blockquote><p>hello</p></blockquote><p>world!</p>', div.innerHTML);

        // test that the Selection remains intact
        sel = window.getSelection();
        range = sel.getRangeAt(0);
        assert(range.startContainer === div.firstChild.firstChild.firstChild);
        assert(range.startOffset === 1);
        assert(range.endContainer === div.firstChild.firstChild.firstChild);
        assert(range.endOffset === 1);
      });

      it('should remove a BLOCKQUOTE element when parent already contains one', function () {
        div = document.createElement('div');
        div.innerHTML = '<blockquote><p>hello</p></blockquote><p>world!</p>';
        div.setAttribute('contenteditable', 'true');
        document.body.appendChild(div);

        // set current selection
        var range = document.createRange();
        range.setStart(div.firstChild.firstChild.firstChild, 1);
        range.setEnd(div.firstChild.firstChild.firstChild, 1);
        assert(range.collapsed);

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        var blockquote = new BlockquoteCommand();
        blockquote.execute();

        // test that we have the expected HTML at this point
        assert.equal('<p>hello</p><p>world!</p>', div.innerHTML);

        // test that the Selection remains intact
        sel = window.getSelection();
        range = sel.getRangeAt(0);
        assert(range.startContainer === div.firstChild.firstChild);
        assert(range.startOffset === 1);
        assert(range.endContainer === div.firstChild.firstChild);
        assert(range.endOffset === 1);
      });

    });

  });

});
