/**
 * TypeScript dependencies.
 */
import AbstractCommand = require('abstract-command');
/**
 * `IndentCommand` class wraps a BLOCKQUOTE element around the given `Range`.
 *
 * ``` js
 * var indent = new IndentCommand();
 * if (indent.queryEnabled()) {
 *   indent.execute();
 * }
 * ```
 *
 * @public
 */
declare class IndentCommand extends AbstractCommand {
    private root;
    constructor(root?: HTMLElement, doc?: Document);
    protected _execute(range: Range, value?: any): void;
    protected _queryState(range: Range): boolean;
}
export = IndentCommand;
