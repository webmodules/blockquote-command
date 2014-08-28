/// <reference path="require.d.ts" />
/**
* TypeScript dependencies.
*/
import NativeCommand = require('native-command');
/**
* `IndentCommand` class is a wrapper around the `indent` native command.
* It applies cross-browser normalization logic, for example, removing any
* inline "style" attributes from the created BLOCKQUOTE element.
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
declare class IndentCommand extends NativeCommand {
    constructor(doc?: Document);
    public execute(range?: Range, value?: any): void;
    public queryState(range?: Range): boolean;
}
export = IndentCommand;
