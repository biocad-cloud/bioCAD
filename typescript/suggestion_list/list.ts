
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
        return leven.compute(this.term, input);
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

        this.terms.forEach(term => {
            if (caseInsensitive) {
                scores.push(new scoreTerm(term, leven.compute(term.term.toLowerCase(), lowerInput)));
            } else {
                scores.push(new scoreTerm(term, term.dist(input)));
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
