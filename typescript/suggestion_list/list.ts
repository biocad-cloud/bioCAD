
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
        var scores: scoreTerm[] = [];
        var lowerInput: string = input.toLowerCase();

        this.terms.forEach(q => {
            if (caseInsensitive) {
                var score: number = term.indexOf(q.term.toLowerCase(), lowerInput);
                scores.push(new scoreTerm(q, score));
            } else {
                scores.push(new scoreTerm(q, q.dist(input)));
            }
        });

        scores.sort(function (a, b) {
            // 降序排序的
            return b.score - a.score;
        });

        var out: term[] = [];

        scores.slice(0, top).forEach(score => {
            out.push(score.term);
        });

        return out;
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
