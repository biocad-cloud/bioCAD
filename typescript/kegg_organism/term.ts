class organismTerm {

    public id: number;
    public code: string;
    public name: string;
    public lineage: string[];

    constructor(name: string, lineage: string[]) {
        var parts = name.split("\s{2}");

        this.code = parts[0];
        this.name = parts[1];
        this.id = organismTerm.calcCode(this.code.toUpperCase());
        this.lineage = lineage;
    }

    private static calcCode(codeText: string): number {
        var x = 0;

        for (var i = 0; i < codeText.length; i++) {
            var ascii = codeText.charCodeAt(i);
            x += ascii * Math.pow(10, i * 2);
        }

        return x;
    }
}