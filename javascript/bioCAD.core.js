/// <reference path="../../../javascript/linq.d.ts" />
/**
 * The fasta sequence parser and data model
*/
var FastaSeq = /** @class */ (function () {
    function FastaSeq() {
    }
    FastaSeq.ParseFile = function (stream) {
        var seq = [];
        // 使用正则表达式进行切割并去除空白行
        var lines = From(stream.split(/\n/))
            .Where(function (l) { return !StringEmpty(l, true); })
            .ToArray();
        var header;
        var seqBuffer = "";
        var isnull = function () { return StringEmpty(header) && StringEmpty(seqBuffer); };
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.charAt(0) == ">") {
                // 是新的序列起始
                if (!isnull()) {
                    seq.push({
                        headers: header.split("|"),
                        sequence: seqBuffer
                    });
                }
                header = line.substr(1);
                seqBuffer = "";
            }
            else {
                seqBuffer = seqBuffer + line;
            }
        }
        if (!isnull()) {
            seq.push({
                headers: header.split("|"),
                sequence: seqBuffer
            });
        }
        return seq;
    };
    return FastaSeq;
}());
var Utils;
(function (Utils) {
    /**
     * Create a callback function handler for refresh the image
     *
     * @param api URL for image source.
     * @param imgID id attribute of the img tag
    */
    function RefreshImage(api, imgID) {
        var img = document.getElementById(imgID);
        var url = "";
        if (api.indexOf("?") > -1) {
            url = api + "&refresh_rnd=";
        }
        else {
            url = api + "?refresh_rnd=";
        }
        return function () {
            img.setAttribute("src", api + rnd());
        };
    }
    Utils.RefreshImage = RefreshImage;
    /**
     * Alias of the function: ``Math.random``
    */
    function rnd() {
        return Math.random();
    }
    Utils.rnd = rnd;
})(Utils || (Utils = {}));
//# sourceMappingURL=bioCAD.core.js.map