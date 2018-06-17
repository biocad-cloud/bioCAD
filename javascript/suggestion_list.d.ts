/// <reference path="linq.d.ts" />
declare function makeSuggestions(terms: term[], div: string, click: (term: term) => void, top?: number, caseInsensitive?: boolean): (input: string) => void;
declare function showSuggestions(suggestion: suggestion, input: string, div: string, click: (term: term) => void, top?: number, caseInsensitive?: boolean): void;
declare function listItem(term: term, click: (term: term) => void): HTMLElement;
/**
 * Measure the difference between two strings with the fastest JS implementation
 * of the Levenshtein distance algorithm
 *
 * > https://github.com/sindresorhus/leven/blob/master/index.js
*/
declare class leven {
    static compute(a: string, b: string): number;
    private static levelInternal(a, b, aLen, bLen, start);
}
/**
 * Term for suggestion
*/
declare class term {
    /**
     * 这个term在数据库之中的id编号
    */
    id: number;
    term: string;
    constructor(id: number, term: string);
    /**
     * 使用动态规划算法计算出当前的这个term和用户输入之间的相似度
    */
    dist(input: string): number;
    static indexOf(term: string, input: string): number;
}
declare class suggestion {
    private terms;
    constructor(terms: term[]);
    /**
     * 返回最相似的前5个结果
    */
    populateSuggestion(input: string, top?: number, caseInsensitive?: boolean): term[];
    private static getScore(q, input, lowerInput, caseInsensitive);
}
declare class scoreTerm {
    score: number;
    term: term;
    constructor(term: term, score: number);
}
