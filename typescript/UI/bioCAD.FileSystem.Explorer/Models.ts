class bioCADFile {
    public id: number;
    public fileName: string;
    public size: number;
    public mime: bioCADmimeType;
}

class bioCADmimeType {
    public classID: number;
    public contentType: string;
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