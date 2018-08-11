export module bioMimeTypes {

    export enum bioClassType {
        /**
         * The unknown class type
        */
        unknown,
        /**
         * General text file
        */
        text,
        /**
         * Image file
        */
        image,
        /**
         * The data table is a kind of numeric matrix for gene expression data, or something.
        */
        data_table,
        /**
         * The biological sequence data type, like fasta sequence file.
        */
        bioSequence
    }

    /**
     * bio class type to font-awsome icon name
    */
    export function classToFontAwsome(cls: bioClassType): string[] {
        switch (cls) {

            case bioClassType.text:
                return ["fa", "fa-file-text-o", "text-info"];

            case bioClassType.image:
                return ["fa", "fa-file-photo-o", "text-danger"];

            case bioClassType.data_table:
                return [""];

            default:
                return [];
        }
    }
}