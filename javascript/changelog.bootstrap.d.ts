/// <reference path="linq.d.ts" />
declare class Update {
    /**
     * The github commit hash of this update
    */
    commit_hash: string;
    date: Date;
    updates: updateItem[];
    readonly HTML: string;
}
declare class updateItem {
    tag: updateTypes;
    note: string;
    constructor(tag: updateTypes, note: string);
    readonly bootstrapItem: string;
    toString(): string;
}
declare enum updateTypes {
    New = 0,
    Improvement = 1,
    Bugfix = 2,
    Removes = 3,
}
