/// <reference path="linq.d.ts" />
declare module markdownParser {
}
declare class Update {
    /**
     * The github commit hash of this update
    */
    commit_hash: string;
    date: Date;
    updates: updateLog[];
    readonly HTML: string;
}
/**
 * 更新的类型枚举值
*/
declare enum updateTypes {
    /**
     * 功能新增
    */
    New = 0,
    /**
     * 功能加强
    */
    Improvement = 1,
    /**
     * Bug修复
    */
    Bugfix = 2,
    /**
     * 移除了一个旧功能
    */
    Removes = 3
}
declare class updateLog {
    /**
     * 更新的类型的标签枚举值
    */
    tag: updateTypes;
    /**
     * 更新的内容日志
    */
    note: string;
    constructor(tag?: updateTypes, note?: string);
    readonly bootstrapItem: string;
    toString(): string;
}
