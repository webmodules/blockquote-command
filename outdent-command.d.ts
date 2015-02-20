/**
* TypeScript dependencies.
*/
import Command = require('command');
/**
* `OutdentCommand` class is a Command implementation that removes the nearest
* BLOCKQUOTE element from the DOM.
*
* ``` js
* var outdent = new OutdentCommand();
* if (outdent.queryEnabled()) {
*   outdent.execute();
* }
* ```
*
* @public
*/
declare class OutdentCommand implements Command {
    public document: Document;
    constructor(doc?: Document);
    public execute(range?: Range, value?: any): void;
    public queryEnabled(range?: Range): boolean;
    public queryState(range?: Range): boolean;
}
export = OutdentCommand;
