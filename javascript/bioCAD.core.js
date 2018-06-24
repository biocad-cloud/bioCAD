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