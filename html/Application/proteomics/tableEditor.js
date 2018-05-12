var symbols = 0;
var edit_lock = false;

function addSymbol() {
    // 先检查是否存在没有写入数据的row
    var rowNew = document.getElementById("row-new");

    if (rowNew || edit_lock) {
        // 不添加
        layer.msg("Can not add new row which edit data <br /> is not committed yet!", { icon: 5, time: 2000 });
    } else {
        $('#symbol-table').append($('#hidden-template').html());
    }

    edit_lock = true;
}

function newRowCancel() {
    console.log("--");
    $('#symbol-table tr:last').remove();
    $('#symbol-table tr:last').remove();

    edit_lock = false;
}

function newRowWrite(i) {
    if (!$("#input-symbol").val() || !$("#input-sampleID").val()) {
        // 给出输入不为空的警告
        layer.msg("This row has empty column content!", { icon: 5, time: 2000 });
    } else {
        var td = i.parentNode;
        var tr = td.parentNode;

        td.removeChild(i);

        $(".remove-button").show();

        var NO = ++symbols;
        var symbol = $("#input-symbol").val();
        var sampleID = $("#input-sampleID").val();

        var childs = tr.childNodes;

        childs[1].innerText = NO;
        childs[1].id = NO;
        childs[3].innerText = symbol;
        childs[5].innerText = sampleID;

        edit_lock = false;

        tableData("symbol-table");
    }
}

function remove(i) {
    var tr = i.parentNode  // div
        .parentNode  // td
        .parentNode; // tr                       

    tr.parentNode.removeChild(tr);
}

function edit(i) {

    if (edit_lock) {
        return;
    }

    var td = i.parentNode.parentNode;
    var tr = td.parentNode; // tr
    var childs = tr.childNodes;
    var symbol = childs[3].innerText;
    var sampleID = childs[5].innerText;

    childs[3].innerHTML = '<input id="input-symbol" type="text" style="width: 65%" class="form-control" value="' + symbol + '"></input>';
    childs[5].innerHTML = '<input id="input-sampleID" type="text" style="width: 65%" class="form-control" value="' + sampleID + '"></input>';

    i.parentNode.style.display = "none";

    var div = td.childNodes;

    div[4].style.display = "block";

    edit_lock = true;
}

function edit_write(i) {
    var td = i.parentNode;
    var tr = td.parentNode; // tr

    var childs = tr.childNodes;
    var symbol = $("#input-symbol").val();
    var sampleID = $("#input-sampleID").val();

    console.log(childs);

    childs[3].innerText = symbol;
    childs[5].innerText = sampleID;

    $(".remove-button").show();
    $(".edit-button").hide();

    edit_lock = false;

    tableData("symbol-table");
}

function tableData(id) {
    var table = {};
    var names = [];
    var headers = document.getElementById(id) // tbody
        .parentNode                           // table
        .childNodes[1]                        // thead
        .childNodes[1]                        // tr
        .childNodes.forEach(function (td) {

            if (td.innerText) {
                names.push(td.innerText);
            }
        });

    console.log(names);

    var tr = $("#" + id + " tr").each(function () {
        var row = {};
        var i = 0;

        $(this).children("td").each(function () {
            if (i < names.length - 1) {
                row[names[i++]] = $(this).text();
            }
        });

        table[row[names[0]]] = row;
    });

    console.log(table);

    $(".remove-button").show();

}    