class table {

    public headers: string[];
    public rowNumbers: number;

    /**
     * @param id id value of a <table> tag. 
    */
    constructor(headers: string[], id: string) {
        this.headers = headers;
        this.rowNumbers = 0;
    }

    public addNew() {
        // 根据header的数量来生成对应的列

    }
}

class editor {

    private td: HTMLDocument;
    private edit_lock: boolean;

    constructor(td: HTMLDocument) {
        this.td = td;
        this.edit_lock = false;

        // 进行按钮的事件绑定
        this.td.getElementById("confirm").onclick = this.confirmNew;
        this.td.getElementById("cancel").onclick = this.cancelAddNew;
        this.td.getElementById("remove").onclick = this.removeCurrent;
        this.td.getElementById("edit").onclick = this.editThis;
        this.td.getElementById("ok").onclick = this.confirmEdit;
    }

    public confirmNew() {
        this.td.getElementById("row-new-pending").style.display = "none";
        this.td.getElementById("remove-button").style.display = "block";
        this.edit_lock = false;
    }

    public cancelAddNew() {

    }

    public removeCurrent() {

    }

    public editThis() {

    }

    public confirmEdit() {

    }
}

const editor_template: string = '\
    <div id="row-new-pending">\
        <a href="#" id="confirm" onclick="newRowWrite(this.parentNode);" >\
            <span class="label label-success">OK</span>\
        </a>&nbsp;\
        <a href="#" id="cancel" onclick="newRowCancel();">\
            <span class="label label-warning">Cancel</span>\
        </a>\
    </div>\
    <div class="remove-button" style="display:none;">\
        <a href="#" id="remove" onclick="remove(this);">\
            <span class="label label-warning">Remove</span>\
        </a>\
        <a href="#" id="edit" onclick="edit(this);">\
            <span class="label label-info">Edit</span>\
        </a>\
    </div>\
    <div class="edit-button" style="display:none;">\
        <a href="#" id="ok" onclick="edit_write(this.parentNode);">\
            <span class="label label-success">OK</span>\
        </a>\
    </div>';

