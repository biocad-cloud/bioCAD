/// <reference path="../../javascript/linq.d.ts" />

/**
 * Term for suggestion
*/
class term {

    /**
     * 这个term在数据库之中的id编号
    */
    public id: number;
    public term: string;

    constructor(id: number, term: string) {
        this.id = id;
        this.term = term;
    }

    /**
     * 使用动态规划算法计算出当前的这个term和用户输入之间的相似度
    */
    public dist(input: string): number {
        // return leven.compute(this.term, input);
        return term.indexOf(this.term, input);
    }

    public static indexOf(term: string, input: string): number {
        var i = term.indexOf(input);

        if (i == -1) {
            return 1000000;
        } else {
            return Math.abs(input.length - term.length);
        }
    }
}

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

        console.log(caseInsensitive);

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

class scoreTerm {

    public score: number;
    public term: term;

    constructor(term: term, score: number) {
        this.term = term;
        this.score = score;
    }
}
