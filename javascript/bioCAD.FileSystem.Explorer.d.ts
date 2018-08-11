/// <reference path="linq.d.ts" />
declare module "bioMimeTypes" {
    export module bioMimeTypes {
        enum bioClassType {
            /**
             * The unknown class type
            */
            unknown = 0,
            /**
             * General text file
            */
            text = 1,
            /**
             * Image file
            */
            image = 2,
            /**
             * The data table is a kind of numeric matrix for gene expression data, or something.
            */
            data_table = 3,
            /**
             * The biological sequence data type, like fasta sequence file.
            */
            bioSequence = 4,
        }
        /**
         * bio class type to font-awsome icon name
        */
        function classToFontAwsome(cls: bioClassType): string[];
    }
}
/**
 * 文件模型
*/
declare class bioCADFile {
    /**
     * 在数据库之中的唯一编号
    */
    id: number;
    /**
     * 显示的文件名
    */
    fileName: string;
    /**
     * 文件大小，单位为``B``
    */
    size: number;
    /**
     * 文件的格式信息描述
    */
    mime: bioCADmimeType;
    toString(): string;
}
declare class bioCADmimeType {
    /**
     * 这种文件格式在数据库之中的唯一编号
    */
    classID: number;
    /**
     * 对文件内容的摘要描述信息
    */
    contentType: string;
    /**
     * 详细的描述信息
    */
    description: string;
    constructor(data: any);
    toString(): string;
}
/**
 * 将文件呈现给用户的UI代码部分
*/
declare class FileHandle {
    divId: string;
    /**
     * 目标文件的数据模型对象
    */
    file: bioCADFile;
    div: HTMLDivElement;
    readonly fileId: string;
    constructor(file: bioCADFile);
    static classNames: string[];
    private footer();
    private actionButtons();
    /**
     * @returns UI html string
    */
    toString(): string;
}
declare const containerClassName: string;
/**
 * 文件浏览器的模型，这个对象是一个文件的集合
*/
declare class Explorer {
    files: FileHandle[];
    divId: string;
    container: HTMLDivElement;
    constructor(div: HTMLDivElement, files: FileHandle[]);
    /**
     * @param divId 文件浏览器将会显示在这个div之中
    */
    static show(divId: string, files: bioCADFile[], icons?: Map<string, string>[]): Explorer;
}
