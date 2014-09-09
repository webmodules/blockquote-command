/// <reference path='require.d.ts' />

/**
 * TypeScript dependencies.
 */

import Command = require('command');
import IndentCommand = require('indent-command');
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
    this.indent = new IndentCommand(this.document)
    this.outdent = new NativeCommand('outdent', this.document);
    debug('created BlockquoteCommand: document %o', this.document);
  }

  execute(range?: Range, value?: any): void {
    var command: Command = this.queryState(range) ? this.outdent : this.indent;
    command.execute(range);
  }

  queryEnabled(range?: Range): boolean {
    var command: Command = this.queryState(range) ? this.outdent : this.indent;
    return command.queryEnabled(range);
  }

  queryState(range?: Range): boolean {
    return this.indent.queryState(range) || this.outdent.queryState(range);
  }
}

export = BlockquoteCommand;
