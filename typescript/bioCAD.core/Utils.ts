module Utils {

    /**
     * Create a callback function handler for refresh the image
     * 
     * @param api URL for image source.
     * @param imgID id attribute of the img tag
    */
    export function RefreshImage(api: string, imgID: string): () => void {
        var img = document.getElementById(imgID);
        var url = "";

        if (api.indexOf("?") > -1) {
            url = api + "&refresh_rnd=";
        } else {
            url = api + "?refresh_rnd=";
        }

        return () => {
            img.setAttribute("src", api + rnd());
        }
    }

    /**
     * Alias of the function: ``Math.random``
    */
    export function rnd() {
        return Math.random();
    }
}