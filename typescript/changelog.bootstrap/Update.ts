/// <reference path="../../javascript/linq.d.ts" />

class Update {

    /**
     * The github commit hash of this update
    */
    public commit_hash: string;
    public date: Date;
    public updates: updateItem[];

    public get HTML(): string {
        return `
            <p>
                <strong>UPDATE: ${this.date.toLocaleDateString()}</strong> 
                        [<a href="https://github.com/GCModeller-Cloud/bioCAD/tree/${this.commit_hash}">${this.commit_hash}</a>]
            </p>
            <p>
                ${From(this.updates).Select(i => i.bootstrapItem).JoinBy("<br />\n")}
            </p>`;
    }
}

class updateItem {

    public tag: updateTypes;
    public note: string;

    constructor(tag: updateTypes, note: string) {
        this.tag = tag;
        this.note = note;
    }

    public get bootstrapItem(): string {
        var tag: string = null;
        var title: string = null;

        switch (this.tag) {
            case updateTypes.Bugfix:
                tag = "label-warning";
                title = "Bugfix";
            case updateTypes.Improvement:
                tag = "label-info";
                title = "Improvement";
            case updateTypes.New:
                tag = "label-success";
                title = "New";
            case updateTypes.Removes:
                tag = "label-warning";
                title = "Remove";
            default:
                tag = "label-info";
                title = "Undefined";
        }

        return `<span class="label ${tag}">${title}</span> ${this.note}`;
    }

    public toString(): string {
        return this.bootstrapItem;
    }
}

enum updateTypes {
    New, Improvement, Bugfix, Removes
}