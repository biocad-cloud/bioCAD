declare module Utils {
    /**
     * Create a callback function handler for refresh the image
     *
     * @param api URL for image source.
     * @param imgID id attribute of the img tag
    */
    function RefreshImage(api: string, imgID: string): () => void;
    /**
     * Alias of the function: ``Math.random``
    */
    function rnd(): number;
}
