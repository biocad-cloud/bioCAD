/// <reference path="linq.d.ts" />
/**
 * The fasta sequence parser and data model
*/
declare class FastaSeq {
    headers: string[];
    sequence: string;
    static ParseFile(stream: string): FastaSeq[];
}
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
