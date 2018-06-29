declare class bioCADFile {
    id: number;
    fileName: string;
    size: number;
    mime: bioCADmimeType;
}
declare class bioCADmimeType {
    classID: number;
    contentType: string;
    description: string;
    constructor(data: any);
    toString(): string;
}
