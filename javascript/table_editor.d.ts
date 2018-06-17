declare class editor {
    private td;
    private tr;
    private tbody;
    private table;
    constructor(tr: HTMLElement, tbody: HTMLElement, table: tableEditor);
    getElementById(id: string): HTMLElement;
    show(id: string): void;
    hide(id: string): void;
    hideInputs(): void;
    showInputs(): void;
    confirmNew(): void;
    cancelAddNew(): void;
    removeCurrent(): void;
    editThis(): void;
    confirmEdit(): void;
}
declare class tableEditor {
    private headers;
    private rowNumbers;
    private tbody;
    private showRowNumber;
    edit_lock: boolean;
    warningEditLock: () => void;
    /**
     * 这个构造函数将会创建一个新的table对象
     *
     * @param id id value of a <div> tag.
    */
    constructor(headers: string[], id: string, style?: string, className?: string, tdWidth?: string[], warning?: () => void, showRowNumber?: boolean);
    addNew(): editor;
    private addNewInternal();
    TableData(): Object[];
}
declare module template {
    const editor_template: string;
}
