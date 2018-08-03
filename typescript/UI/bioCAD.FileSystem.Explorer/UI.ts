/// <reference path="../../../javascript/linq.d.ts" />

// 在这里构建出用于显示文件的UI部分的代码

/**
 * 将文件呈现给用户的UI代码部分
*/
class FileHandle {

    public divId: string;
    /**
     * 目标文件的数据模型对象
    */
    public file: bioCADFile;
    public div: HTMLDivElement;

    public toString(): string {
        return this.file.toString();
    }
}

/**
 * 文件浏览器的模型，这个对象是一个文件的集合
*/
class Explorer {

    public files: FileHandle[];
    public divId: string;

    public constructor(div: string, files: FileHandle[]) {
        this.divId = div;
        this.files = files;
    }

    public static show(div: string, files: bioCADFile[], size: number[] = [100, 120], icons: Map<string, string>[] = null): Explorer {

    }
}