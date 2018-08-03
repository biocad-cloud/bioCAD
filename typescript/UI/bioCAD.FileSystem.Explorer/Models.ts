/**
 * 文件模型
*/
class bioCADFile {

    /**
     * 在数据库之中的唯一编号
    */
    public id: number;
    /**
     * 显示的文件名
    */
    public fileName: string;
    /**
     * 文件大小，单位为``B``
    */
    public size: number;
    /**
     * 文件的格式信息描述
    */
    public mime: bioCADmimeType;

    public toString(): string {
        return this.fileName;
    }
}

class bioCADmimeType {

    /**
     * 这种文件格式在数据库之中的唯一编号
    */
    public classID: number;
    /**
     * 对文件内容的摘要描述信息
    */
    public contentType: string;
    /**
     * 详细的描述信息
    */
    public description: string;

    constructor(data: any) {
        this.classID = data.classID;
        this.contentType = data.type;
        this.description = data.descript;
    }

    public toString(): string {
        return this.contentType;
    }
}