module bioMimeTypes {
       
    /**
     * bio class type to font-awsome icon name
    */
    export function classToFontAwsome(cls: bioClassType): string {
        switch (cls) {

            case bioClassType.text:
                return ``;

            case bioClassType.image:
                return ["fa", "fa-file-image", "text-danger"];

            case bioClassType.matrix:
                return ["fa", "fa-file-excel", "text-info"];

            case bioClassType.bioSequence:
                return ["fa", "fa-dna", "text-info"];

            default:
                return ["fa", "fa-question-square", "text-info"];
        }
    }
}