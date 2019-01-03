declare class organismTerm {
    id: number;
    code: string;
    name: string;
    lineage: string[];
    constructor(name: string, lineage: string[]);
    private static calcCode;
}
declare class JsonTreeParser {
    /**
     * 通过递归来获取树
    */
    static parseTree(tree: any): organismTerm[];
    private static parseInternal;
}
declare function loadKEGGOrganism(jsonURL: string, load: (terms: organismTerm[]) => void): void;
