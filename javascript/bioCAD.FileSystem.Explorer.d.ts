/// <reference path="linq.d.ts" />
declare module "bioMimeTypes" {
    export enum bioClassType {
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
    export module bioMimeTypes {
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
declare module "Explorer" {
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
    mimeIcon: string[];
    readonly fileId: string;
    constructor(file: bioCADFile, icon: string[]);
    static classNames: string[];
    private footer();
    private actionButtons();
    /**
     * @returns UI html string
    */
    toString(): string;
}
declare module Browser {
    /**
     * Feature detection for drag&drop upload
    */
    function isAdvancedUpload(): boolean;
}
/**
 * 在这里进行自定义的成功以及失败事件的处理工作
*/
declare class EventHandler {
    /**
     * 上传开始的时间
    */
    ot: number;
    /**
     * 已经上传的文件大小
    */
    oloaded: number;
    onLoadStart(): void;
    private complete;
    private failed;
    constructor(complete: (xhr: XMLHttpRequest, event: Event) => any, failed: (xhr: XMLHttpRequest, event: ErrorEvent) => any);
    /**
     * 请求完成
    */
    UploadComplete(xhr: XMLHttpRequest, event: Event): any;
    /**
     * 请求失败
    */
    UploadFailed(xhr: XMLHttpRequest, event: ErrorEvent): any;
    /**
     * 【上传进度调用方法实现】
    */
    ProgressFunction(xhr: XMLHttpRequest, evt: ProgressEvent): any;
}
/**
 * 在这个模块之中处理HTML上传事件
*/
declare module UploadHandler {
    /**
     * @param inputId input html element id.
    */
    function upload(url: string, handler: EventHandler, inputId?: string): void;
}
declare module Uploader {
    function hasDroppedFiles(): boolean;
    function DroppedFiles(): FileList;
    /**
     * Applying the effect for every form
     *
     * @param divId 上传模块将会显示在这个div容器之中
     * @param api 这个url是数据上传的数据api url
     * @param upload 这个对象描述了如何处理上传过程之中的完成以及失败的事件
    */
    function Register(divId: string, api: string, upload: EventHandler): void;
}