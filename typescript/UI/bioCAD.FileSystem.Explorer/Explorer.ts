/// <reference path="../../../javascript/linq.d.ts" />
/// <reference path="./Models.ts" />

import { bioClassType, bioMimeTypes } from "./bioMimeTypes";

const containerClassName: string = "file-preview-thumbnails";

/**
 * 文件浏览器的模型，这个对象是一个文件的集合
*/
class Explorer {

    public files: FileHandle[];
    public divId: string;
    public container: HTMLDivElement;

    public constructor(div: HTMLDivElement, files: FileHandle[]) {
        this.divId = div.id;
        this.files = files;
        this.container = div;
    }

    /**
     * @param divId 文件浏览器将会显示在这个div之中
     * @param icons 将文件的mime type转换为大分类的映射数组
    */
    public static show(divId: string, files: bioCADFile[], icons: Map<string, bioClassType>[] = null): Explorer {
        var div: HTMLDivElement = <HTMLDivElement>document.getElementById(divId);
        var iconTypes: Dictionary<bioClassType> = From(icons).ToDictionary(map => map.key, map => map.value);
        var fileHandles: IEnumerator<FileHandle> = From(files)
            .Select((file: bioCADFile) => {
                var cls: bioClassType = iconTypes.Item(file.mime.contentType);
                var classNames: string[] = bioMimeTypes.classToFontAwsome(cls);
                var handle: FileHandle = new FileHandle(file, classNames);

                return handle;
            });

        // 初始化容器div对象
        if (!div.classList.contains(containerClassName)) {
            div.classList.add(containerClassName);
        }
        div.innerHTML = fileHandles
            .Select(file => file.toString())
            .JoinBy("\n\n");

        // 按照class查找对应的按钮注册处理事件

        return new Explorer(div, fileHandles.ToArray());
    }
}