module bioMimeTypes {
       
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