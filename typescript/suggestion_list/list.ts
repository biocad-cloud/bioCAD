/// <reference path="../../javascript/linq.d.ts" />

class suggestion {

    private terms: term[];

    constructor(terms: term[]) {
        this.terms = terms;
    }

    /**
     * 返回最相似的前5个结果
    */
    public populateSuggestion(input: string, top: number = 5, caseInsensitive: boolean = false): term[] {
        var lowerInput: string = input.toLowerCase();
        var result = From(this.terms)
            .Select(q => {
                var score: number = suggestion.getScore(q, input, lowerInput, caseInsensitive);
                return new scoreTerm(q, score);
            }).OrderBy(rank => rank.score)
            .Take(top)
            .Select(rank => rank.term)
            .ToArray();

        // console.log(caseInsensitive);

        return result;
    }

    private static getScore(q: term,
        input: string,
        lowerInput: string,
        caseInsensitive: boolean): number {

        if (caseInsensitive) {
            // 大小写不敏感的模式下，都转换为小写
            var lowerTerm: string = q.term.toLowerCase();

            return term.indexOf(
                lowerTerm,
                lowerInput
            );

        } else {
            return q.dist(input);
        }
    }
}