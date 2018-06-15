
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

    }
}