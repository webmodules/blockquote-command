/// <reference path='require.d.ts' />

/**
 * TypeScript dependencies.
 */

import Command = require('command');
import IndentCommand = require('indent-command');
import OutdentCommand = require('outdent-command');

/**
 * JavaScript dependencies.
 */

var debug = require('debug')('blockquote-command');

/**
 * `BlockquoteCommand` class is either the `OutdentCommand` or `IndentCommand`
 * command, depending on the current state of the supplied Range.
 *
 * ``` js
 * var blockquote = new BlockquoteCommand();
 * blockquote.execute();
 * ```
 *
 * @public
 */

class BlockquoteCommand implements Command {
  public indent: Command;
  public outdent: Command;

  constructor(root: HTMLElement = document.documentElement, doc: Document = root.ownerDocument) {
    this.indent = new IndentCommand(root, doc);
    this.outdent = new OutdentCommand(doc);
    debug('created BlockquoteCommand: root %o, document %o', root, doc);
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
    return this.indent.queryState(range);
  }
}

export = BlockquoteCommand;
