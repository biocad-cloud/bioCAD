/**
 * 对表格之中的单行数据的编辑操作的对象
*/
declare class editor {
    /**
     * 操作按钮的表格的列对象
    */
    private td;
    /**
     * 进行数据编辑操作的行对象
    */
    private tr;
    private tbody;
    private table;
    constructor(tr: HTMLElement, tbody: HTMLElement, table: tableEditor);
    getElementById(id: string): HTMLElement;
    /**
     * 将符合id条件的html元素显示出来
    */
    show(id: string): void;
    /**
     * 隐藏掉目标html元素对象
    */
    hide(id: string): void;
    /**
     * 将表格内容的输入框隐藏掉
    */
    hideInputs(): void;
    /**
     * 点击编辑按钮之后显示表格的单元格内容编辑的输入框
    */
    showInputs(): void;
    /**
     * 确认添加新的表格行数据
    */
    confirmNew(): void;
    /**
     * 取消新增的行数据
    */
    cancelAddNew(): void;
    /**
     * 对当前的行数据进行删除
    */
    removeCurrent(): void;
    /**
     * 当前的行进入编辑模式
    */
    editThis(): void;
    /**
     * 确认对当前的行数据的编辑操作，并退出编辑模式
    */
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
    private addNewInternal;
    TableData(): Object[];
}
declare module template {
    /**
     * 定义了如何生成表格之中的行数据进行编辑操作的按钮的html用户界面
    */
    const editor_template: string;
}
