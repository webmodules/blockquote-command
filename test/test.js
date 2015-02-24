
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
    });

    it('should allow an explicit `root` and `document`', function () {
      div = document.createElement('div');
      div.setAttribute('contenteditable', 'true');
      document.body.appendChild(div);

      var blockquote = new BlockquoteCommand(div, document);

      assert(blockquote instanceof BlockquoteCommand);
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

      it('should insert a BLOCKQUOTE element around parent block with a BR', function () {
        div = document.createElement('div');
        div.innerHTML = '<p><br></p>';
        div.setAttribute('contenteditable', 'true');
        document.body.appendChild(div);

        // set current selection
        var range = document.createRange();
        range.setStart(div.firstChild, 0);
        range.setEnd(div.firstChild, 0);
        assert(range.collapsed);

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        var blockquote = new BlockquoteCommand();
        blockquote.execute();

        // test that we have the expected HTML at this point
        assert.equal('<blockquote><p><br></p></blockquote>', div.innerHTML);

        // test that the Selection remains intact
        sel = window.getSelection();
        range = sel.getRangeAt(0);
        assert(range.startContainer === div.firstChild.firstChild);
        assert(range.startOffset === 0);
        assert(range.endContainer === div.firstChild.firstChild);
        assert(range.endOffset === 0);
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

      it('should remove a BLOCKQUOTE element when parent with a BR already contains one', function () {
        div = document.createElement('div');
        div.innerHTML = '<blockquote><p><br></p></blockquote>';
        div.setAttribute('contenteditable', 'true');
        document.body.appendChild(div);

        // set current selection
        var range = document.createRange();
        range.setStart(div.firstChild.firstChild, 0);
        range.setEnd(div.firstChild.firstChild, 0);
        assert(range.collapsed);

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        var blockquote = new BlockquoteCommand();
        blockquote.execute();

        // test that we have the expected HTML at this point
        assert.equal('<p><br></p>', div.innerHTML);

        // test that the Selection remains intact
        sel = window.getSelection();
        range = sel.getRangeAt(0);
        assert(range.collapsed);
        assert(range.startContainer === div.firstChild);
        assert(range.startOffset === 0);
        assert(range.endContainer === div.firstChild);
        assert(range.endOffset === 0);
      });

      it('should remove a BLOCKQUOTE element when parent already contains one (2)', function () {
        div = document.createElement('div');
        div.innerHTML = '<blockquote><blockquote><blockquote><p>hello</p><p>world!</p></blockquote></blockquote></blockquote>';
        div.setAttribute('contenteditable', 'true');
        document.body.appendChild(div);

        // set current selection
        var range = document.createRange();
        range.setStart(div.firstChild.firstChild.firstChild.firstChild.firstChild, 2);
        range.setEnd(div.firstChild.firstChild.firstChild.lastChild.firstChild, 2);
        assert(!range.collapsed);
        assert.equal('llowo', range.toString());

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        var blockquote = new BlockquoteCommand();
        blockquote.execute();

        // test that we have the expected HTML at this point
        assert.equal('<blockquote><blockquote><p>hello</p><p>world!</p></blockquote></blockquote>', div.innerHTML);
        // test that the Selection remains intact
        sel = window.getSelection();
        range = sel.getRangeAt(0);
        assert(range.startContainer === div.firstChild.firstChild.firstChild.firstChild);
        assert(range.startOffset === 2);
        assert(range.endContainer === div.firstChild.firstChild.lastChild.firstChild);
        assert(range.endOffset === 2);
        assert.equal('llowo', range.toString());
      });

    });

  });

});
