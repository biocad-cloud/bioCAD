class table {

    public headers: string[];
    public rowNumbers: number;
    public tbody: HTMLElement;

    /**
     * 这个构造函数将会创建一个新的table对象
     * 
     * @param id id value of a <div> tag. 
    */
    constructor(headers: string[], id: string) {
        this.headers = headers;
        this.rowNumbers = 0;

        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        document.getElementById(id).appendChild(table);
        table.appendChild(thead);
        table.appendChild(tbody);

        var tr = document.createElement("tr");
        thead.appendChild(tr);

        headers.forEach(header => {
            var th = document.createElement("th");
            th.innerText = header;
            thead.appendChild(th);
        });

        this.tbody = tbody;
    }

    public addNew() {
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

        var editor_td = document.createElement("td");
        editor_td.innerHTML = editor_template;

        tr.appendChild(editor_td);
        var NULL = new editor(editor_td);
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

class editor {

    private td: HTMLElement;
    private edit_lock: boolean;

    constructor(td: HTMLElement) {
        this.td = td;
        this.edit_lock = false;

        // 进行按钮的事件绑定
        this.getElementById("confirm").onclick = this.confirmNew;
        this.getElementById("cancel").onclick = this.cancelAddNew;
        this.getElementById("remove").onclick = this.removeCurrent;
        this.getElementById("edit").onclick = this.editThis;
        this.getElementById("ok").onclick = this.confirmEdit;
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

    public confirmNew() {
        this.getElementById("row-new-pending").style.display = "none";
        this.getElementById("remove-button").style.display = "block";
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

