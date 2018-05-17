class tableEditor {

    private headers: string[];
    private rowNumbers: number;
    private tbody: HTMLElement;

    public edit_lock: boolean;
    public warningEditLock: VoidFunction;

    /**
     * 这个构造函数将会创建一个新的table对象
     * 
     * @param id id value of a <div> tag. 
    */
    constructor(headers: string[], id: string,
        style: string = null,
        className: string = null,
        tdWidth: string[] = null,
        warning: VoidFunction = null) {

        this.headers = headers;
        this.rowNumbers = 0;
        this.warningEditLock = warning;

        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        document.getElementById(id).appendChild(table);
        table.appendChild(thead);
        table.appendChild(tbody);

        if (style) {
            table.setAttribute("style", style);
        }
        if (className) {
            table.className = className;
        }

        var tr = document.createElement("tr");
        thead.appendChild(tr);

        headers.forEach((header, i) => {
            var th = document.createElement("th");
            th.innerText = header;
            thead.appendChild(th);

            if (tdWidth) {
                th.setAttribute("style", tdWidth[i]);
            }
        });

        this.tbody = tbody;
    }

    public addNew(): editor {
        if (this.edit_lock) {
            if (!this.warningEditLock) {
                this.warningEditLock();
            }

            return null;
        } else {
            return this.addNewInternal();
        }
    }

    private addNewInternal(): editor {
        // 根据header的数量来生成对应的列
        var tr = document.createElement("tr");
        var i = this.rowNumbers++;

        tr.id = `row-${i}`;

        this.headers.forEach((name) => {
            var td = document.createElement("td");
            var text = document.createElement("div");

            text.id = "text";
            td.appendChild(text);

            // <input id="input-symbol" type="text" style="width: 65%" class="form-control"></input>
            var input = document.createElement("input");
            input.id = `input-${name}`;
            input.type = "text";
            input.style.width = "65%";
            input.className = "form-control";

            td.appendChild(input);

            tr.appendChild(td);
        });

        this.tbody.appendChild(tr);
        this.edit_lock = true;

        return new editor(tr, this.tbody, this);
    }
}

class editor {

    private td: HTMLElement;
    private tr: HTMLElement;
    private tbody: HTMLElement;
    private table: tableEditor;

    public static readonly editor_template: string = '\
        <div id="row-new-pending">\
            <a href="#" id="confirm" onclick="newRowWrite(this.parentNode);" >\
                <span class="label label-success">OK</span>\
            </a>&nbsp;\
            <a href="#" id="cancel" onclick="newRowCancel();">\
                <span class="label label-warning">Cancel</span>\
            </a>\
        </div>\
        <div id="remove-button" style="display:none;">\
            <a href="#" id="remove" onclick="remove(this);">\
                <span class="label label-warning">Remove</span>\
            </a>\
            <a href="#" id="edit" onclick="edit(this);">\
                <span class="label label-info">Edit</span>\
            </a>\
        </div>\
        <div id="edit-button" style="display:none;">\
            <a href="#" id="ok" onclick="edit_write(this.parentNode);">\
                <span class="label label-success">OK</span>\
            </a>\
        </div>';

    constructor(tr: HTMLElement, tbody: HTMLElement, table: tableEditor) {
        var td = document.createElement("td");

        td.innerHTML = editor.editor_template;
        tr.appendChild(td);

        this.tr = tr;
        this.tbody = tbody;
        this.td = td;
        this.table = table;

        // 进行按钮的事件绑定
        this.getElementById("confirm").onclick = () => { this.confirmNew() };
        this.getElementById("cancel").onclick = () => { this.cancelAddNew() };
        this.getElementById("remove").onclick = () => { this.removeCurrent() };
        this.getElementById("edit").onclick = () => { this.editThis() };
        this.getElementById("ok").onclick = () => { this.confirmEdit() };
    }

    public getElementById(id: string): HTMLElement {
        var divs = this.td.getElementsByTagName("div");
        var id_lower = id.toLowerCase();

        for (var i = 0; i < divs.length; i++) {
            var div: HTMLElement = divs[i];

            if (div.id.toLowerCase() == id_lower) {
                return div;
            }

            var abuttons = div.getElementsByTagName("a");

            for (var j = 0; j < abuttons.length; j++) {
                var a: HTMLElement = abuttons[j];

                if (a.id.toLowerCase() == id_lower) {
                    return a;
                }
            }
        }

        return null;
    }

    public show(id: string) {
        this.getElementById(id).style.display = "block";
    }

    public hide(id: string) {
        this.getElementById(id).style.display = "none";
    }

    public hideInputs() {
        var tdList = this.tr.getElementsByTagName("td");

        // 最后一个td是editor的td，没有输入框
        // 所以在这里-1跳过最后一个td
        for (var i = 0; i < tdList.length - 1; i++) {
            var td = tdList[i];
            var textDisplay: HTMLElement = td.getElementsByTagName("div")[0];
            var inputBox: HTMLElement = td.getElementsByTagName("input")[0];

            textDisplay.innerText = inputBox.value;
            textDisplay.style.display = "block";

            inputBox.style.display = "none";
        }
    }

    public showInputs() {
        var tdList = this.tr.getElementsByTagName("td");

        // 最后一个td是editor的td，没有输入框
        // 所以在这里-1跳过最后一个td
        for (var i = 0; i < tdList.length - 1; i++) {
            var td = tdList[i];
            var textDisplay: HTMLElement = td.getElementsByTagName("div")[0];
            var inputBox: HTMLElement = td.getElementsByTagName("input")[0];

            inputBox.value = textDisplay.innerText;
            inputBox.style.display = "block";

            textDisplay.style.display = "none";
        }
    }

    public confirmNew() {
        this.hide("row-new-pending");
        this.show("remove-button");
        this.hideInputs();
        this.table.edit_lock = false;
    }

    public cancelAddNew() {
        this.tr.remove();
        this.table.edit_lock = false;
    }

    public removeCurrent() {
        this.tr.remove();
    }

    public editThis() {
        this.showInputs();
        this.hide("remove-button");
        this.show("edit-button");
        this.table.edit_lock = true;
    }

    public confirmEdit() {
        this.hideInputs();
        this.show("remove-button");
        this.hide("edit-button");
        this.table.edit_lock = false;
    }
}

