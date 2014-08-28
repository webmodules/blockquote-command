/// <reference path='require.d.ts' />

/**
 * TypeScript dependencies.
 */

import Command = require('command');
import NativeCommand = require('native-command');

/**
 * JavaScript dependencies.
 */

var closest = require('component-closest');
var currentRange = require('current-range');
var debug = require('debug')('blockquote-command');

/**
 * `BlockquoteCommand` class is either the "outdent" or "indent" native command,
 * depending on the current state of the supplied Range.
 *
 * ``` js
 * var blockquote = new BlockquoteCommand();
 * blockquote.execute();
 * ```
 *
 * @public
 */

class BlockquoteCommand implements Command {
  public document: Document;
  public indent: Command;
  public outdent: Command;

  constructor(doc?: Document) {
    this.document = doc || document;
    this.indent = new NativeCommand('indent');
    this.outdent = new NativeCommand('outdent');
    debug('created BlockquoteCommand: document %o', this.document);
  }

  execute(range?: Range, value?: any): void {
    var cmd = this.queryState(range) ? this.outdent : this.indent;
    cmd.execute(range);
    if (!range) range = currentRange(this.document);
    var blockquote = closest(range.commonAncestorContainer, 'blockquote', true);
    if (blockquote) {
      // On Chrome, at least, the BLOCKQUOTE gets created with `margin`,
      // `border` and `padding` inline style attributes. We must remove them.
      blockquote.removeAttribute('style');
    }
  }

  queryEnabled(range?: Range): boolean {
    var cmd = this.queryState(range) ? this.outdent : this.indent;
    return cmd.queryEnabled(range);
  }

  queryState(range?: Range): boolean {
    if (!range) range = currentRange(this.document);
    if (!range) return false;
    var blockquote = closest(range.commonAncestorContainer, 'blockquote', true);
    return !! blockquote;
  }
}

export = BlockquoteCommand;
