/**
 * Provides a set of static (Shared in Visual Basic) methods for querying
 * objects that implement ``System.Collections.Generic.IEnumerable<T>``.
*/
declare class IEnumerator<T> implements IEnumerable<T> {
    readonly [index: number]: T;
    /**
     * The number of elements in the data sequence.
    */
    readonly Count: number;
    /**
     * The data sequence with specific type.
    */
    protected sequence: T[];
    constructor(source: T[]);
    /**
     * Get the first element in this sequence
    */
    First(): T;
    /**
     * Get the last element in this sequence
    */
    Last(): T;
    /**
     * Projects each element of a sequence into a new form.
     *
     * @typedef TOut The type of the value returned by selector.
     *
     * @param selector A transform function to apply to each element.
     *
     * @returns An ``System.Collections.Generic.IEnumerable<T>``
     *          whose elements are the result of invoking the
     *          transform function on each element of source.
    */
    Select<TOut>(selector: (o: T) => TOut): IEnumerator<TOut>;
    /**
     * Groups the elements of a sequence according to a key selector function.
     * The keys are compared by using a comparer and each group's elements
     * are projected by using a specified function.
     *
     * @param compares 注意，javascript在进行中文字符串的比较的时候存在bug，如果当key的类型是字符串的时候，
     *                 在这里需要将key转换为数值进行比较，遇到中文字符串可能会出现bug
    */
    GroupBy<TKey>(keySelector: (o: T) => TKey, compares: (a: TKey, b: TKey) => number): IEnumerator<Group<TKey, T>>;
    /**
     * Filters a sequence of values based on a predicate.
    */
    Where(predicate: (e: T) => boolean): IEnumerator<T>;
    Min(project?: (e: T) => number): T;
    Max(project?: (e: T) => number): T;
    Average(project?: (e: T) => number): number;
    Sum(project?: (e: T) => number): number;
    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     *
     * @param key A function to extract a key from an element.
     *
     * @returns An ``System.Linq.IOrderedEnumerable<T>`` whose elements are
     *          sorted according to a key.
    */
    OrderBy(key: (e: T) => number): IEnumerator<T>;
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     *
     * @param key A function to extract a key from an element.
     *
     * @returns An ``System.Linq.IOrderedEnumerable<T>`` whose elements are
     *          sorted in descending order according to a key.
    */
    OrderByOrderByDescending(key: (e: T) => number): IEnumerator<T>;
    Take(n: number): IEnumerator<T>;
    Skip(n: number): IEnumerator<T>;
    /**
     * Returns elements from a sequence as long as a specified condition is true.
    */
    TakeWhile(predicate: (e: T) => boolean): IEnumerator<T>;
    /**
     * Bypasses elements in a sequence as long as a specified condition is true
     * and then returns the remaining elements.
    */
    SkipWhile(predicate: (e: T) => boolean): IEnumerator<T>;
    All(predicate: (e: T) => boolean): boolean;
    Any(predicate?: (e: T) => boolean): boolean;
    /**
     * Performs the specified action for each element in an array.
     *
     * @param callbackfn  A function that accepts up to three arguments. forEach
     * calls the callbackfn function one time for each element in the array.
     *
    */
    ForEach(callbackfn: (x: T, index: number) => void): void;
    JoinBy(deli: string, toString?: (x: T) => String): string;
    /**
     * This function returns a clone copy of the source sequence.
    */
    ToArray(): T[];
}
/**
 * Linq数据流程管线的起始函数
 *
 * @param source 需要进行数据加工的集合对象
*/
declare function From<T>(source: T[]): IEnumerator<T>;
/**
 * 判断目标对象集合是否是空的？
*/
declare function IsNullOrEmpty<T>(array: T[]): boolean;
/**
 * 通用数据拓展函数集合
*/
declare module DataExtensions {
    /**
     * 尝试将任意类型的目标对象转换为数值类型
    */
    function as_numeric(obj: any): number;
}
declare class NumericRange implements DoubleRange {
    min: number;
    max: number;
    constructor(min: number, max: number);
    IsInside(x: number): boolean;
    static Create(min: number, max: number): NumericRange;
    toString(): string;
}
/**
 * 用于进行数据分组所需要的最基础的二叉树数据结构
*/
declare class binaryTree<T, V> {
    /**
     * 根节点，根节点的key值可能会对二叉树的构建造成很大的影响
    */
    root: node<T, V>;
    /**
     * 这个函数指针描述了如何对两个``key``之间进行比较
     *
     * 返回结果值：
     *
     * + ``等于0`` 表示二者相等
     * + ``大于0`` 表示a大于b
     * + ``小于0`` 表示a小于b
    */
    compares: (a: T, b: T) => number;
    constructor(comparer: (a: T, b: T) => number);
    add(term: T, value?: V): void;
    /**
     * 根据key值查找一个节点，然后获取该节点之中与key所对应的值
    */
    find(term: T): V;
    ToArray(): node<T, V>[];
    AsEnumerable(): IEnumerator<node<T, V>>;
}
declare module binaryTreeExtensions {
    function populateNodes<T, V>(tree: node<T, V>): node<T, V>[];
}
declare class node<T, V> {
    key: T;
    value: V;
    left: node<T, V>;
    right: node<T, V>;
    constructor(key: T, value?: V, left?: node<T, V>, right?: node<T, V>);
}
interface IEnumerable<T> {
    readonly Count: number;
    readonly [index: number]: T;
    /**
     * This function should returns a clone copy of the source sequence.
    */
    ToArray(): T[];
}
declare class Group<TKey, T> extends IEnumerator<T> {
    Key: TKey;
    /**
     * Group members, readonly property.
    */
    readonly Group: T[];
    constructor(key: TKey, group: T[]);
}
declare module Enumerable {
    function Select<T, TOut>(source: T[], project: (e: T) => TOut): IEnumerator<TOut>;
    function OrderBy<T>(source: T[], key: (e: T) => number): IEnumerator<T>;
    function OrderByDescending<T>(source: T[], key: (e: T) => number): IEnumerator<T>;
    function Take<T>(source: T[], n: number): IEnumerator<T>;
    function Skip<T>(source: T[], n: number): IEnumerator<T>;
    function TakeWhile<T>(source: T[], predicate: (e: T) => boolean): IEnumerator<T>;
    function Where<T>(source: T[], predicate: (e: T) => boolean): IEnumerator<T>;
    function SkipWhile<T>(source: T[], predicate: (e: T) => boolean): IEnumerator<T>;
    function All<T>(source: T[], predicate: (e: T) => boolean): boolean;
    function Any<T>(source: T[], predicate: (e: T) => boolean): boolean;
    function GroupBy<T, TKey>(source: T[], getKey: (e: T) => TKey, compares: (a: TKey, b: TKey) => number): IEnumerator<Group<TKey, T>>;
}
