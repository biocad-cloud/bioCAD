class editor {

    private td: HTMLElement;
    private tr: HTMLElement;
    private tbody: HTMLElement;
    private table: tableEditor;

    constructor(tr: HTMLElement, tbody: HTMLElement, table: tableEditor) {
        var td = document.createElement("td");

        td.innerHTML = template.editor_template;
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

            if (textDisplay && inputBox) {
                textDisplay.innerText = inputBox.value;
                textDisplay.style.display = "block";

                inputBox.style.display = "none";
            }
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

            if (textDisplay && inputBox) {
                inputBox.value = textDisplay.innerText;
                inputBox.style.display = "block";

                textDisplay.style.display = "none";
            }
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

