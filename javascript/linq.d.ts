/**
 * Provides a set of static (Shared in Visual Basic) methods for querying
 * objects that implement ``System.Collections.Generic.IEnumerable<T>``.
 *
 * (这个枚举器类型是构建出一个Linq查询表达式所必须的基础类型)
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
    /**
     * 求取这个序列集合的最小元素，使用这个函数要求序列之中的元素都必须能够被转换为数值
    */
    Min(project?: (e: T) => number): T;
    /**
     * 求取这个序列集合的最大元素，使用这个函数要求序列之中的元素都必须能够被转换为数值
    */
    Max(project?: (e: T) => number): T;
    /**
     * 求取这个序列集合的平均值，使用这个函数要求序列之中的元素都必须能够被转换为数值
    */
    Average(project?: (e: T) => number): number;
    /**
     * 求取这个序列集合的和，使用这个函数要求序列之中的元素都必须能够被转换为数值
    */
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
    /**
     * 判断这个序列之中的所有元素是否都满足特定条件
    */
    All(predicate: (e: T) => boolean): boolean;
    /**
     * 判断这个序列之中的任意一个元素是否满足特定的条件
    */
    Any(predicate?: (e: T) => boolean): boolean;
    /**
     * Performs the specified action for each element in an array.
     *
     * @param callbackfn  A function that accepts up to three arguments. forEach
     * calls the callbackfn function one time for each element in the array.
     *
    */
    ForEach(callbackfn: (x: T, index: number) => void): void;
    /**
     * Contract the sequence to string
    */
    JoinBy(deli: string, toString?: (x: T) => String): string;
    /**
     * This function returns a clone copy of the source sequence.
    */
    ToArray(): T[];
    ToDictionary<K, V>(keySelector: (x: T) => string, elementSelector?: (x: T) => V): Dictionary<V>;
}
/**
 * Linq数据流程管线的起始函数
 *
 * @param source 需要进行数据加工的集合对象
*/
declare function From<T>(source: T[]): IEnumerator<T>;
/**
 * 判断目标对象集合是否是空的？
 *
 * @param array 如果这个数组对象是空值或者未定义，都会被判定为空，如果长度为零，则同样也会被判定为空值
*/
declare function IsNullOrEmpty<T>(array: T[]): boolean;
declare function StringEmpty(str: string, stringAsFactor?: boolean): boolean;
/**
 * HTML/Javascript: how to access JSON data loaded in a script tag.
*/
declare function LoadJson(id: string): any;
/**
 * Quick Tip: Get URL Parameters with JavaScript
 *
 * > https://www.sitepoint.com/get-url-parameters-with-javascript/
 *
 * @param url get query string from url (optional) or window
*/
declare function getAllUrlParams(url?: string): Dictionary<string>;
/**
 * 通用数据拓展函数集合
*/
declare module DataExtensions {
    function parseQueryString(queryString: string, lowerName?: boolean): object;
    /**
     * 尝试将任意类型的目标对象转换为数值类型
    */
    function as_numeric(obj: any): number;
}
/**
 * 一个数值范围
*/
declare class NumericRange implements DoubleRange {
    /**
     * 这个数值范围的最小值
    */
    min: number;
    /**
     * 这个数值范围的最大值
    */
    max: number;
    readonly Length: number;
    constructor(min: number, max: number);
    /**
     * 判断目标数值是否在当前的这个数值范围之内
    */
    IsInside(x: number): boolean;
    /**
     * 从一个数值序列之中创建改数值序列的值范围
    */
    static Create(numbers: number[]): NumericRange;
    PopulateNumbers(step?: number): number[];
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
    /**
     * 构建一个二叉树对象
     *
     * @param comparer 这个函数指针描述了如何进行两个对象之间的比较操作，如果这个函数参数使用默认值的话
     *                 则只能够针对最基本的数值，逻辑变量进行操作
    */
    constructor(comparer?: (a: T, b: T) => number);
    /**
     * 向这个二叉树对象之中添加一个子节点
    */
    add(term: T, value?: V): void;
    /**
     * 根据key值查找一个节点，然后获取该节点之中与key所对应的值
     *
     * @returns 如果这个函数返回空值，则表示可能未找到目标子节点
    */
    find(term: T): V;
    /**
     * 将这个二叉树对象转换为一个节点的数组
    */
    ToArray(): node<T, V>[];
    /**
     * 将这个二叉树对象转换为一个Linq查询表达式所需要的枚举器类型
    */
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
/**
 * 描述了一个键值对集合
*/
declare class Map<K, V> {
    /**
     * 键名称，一般是字符串
    */
    key: K;
    /**
     * 目标键名所映射的值
    */
    value: V;
    /**
     * 创建一个新的键值对集合
     *
    */
    constructor(key?: K, value?: V);
    toString(): string;
}
/**
 * 键值对映射哈希表
*/
declare class Dictionary<V> extends IEnumerator<Map<string, V>> {
    private maps;
    Item(key: string): V;
    readonly Keys: IEnumerator<string>;
    readonly Values: IEnumerator<V>;
    /**
     * 将目标对象转换为一个类型约束的映射序列集合
    */
    constructor(maps: object);
    /**
     * 将目标对象转换为一个类型约束的映射序列集合
    */
    static ObjectMaps<V>(maps: object): Map<string, V>[];
}
/**
 * The linq pipline implements at here.
*/
declare module Enumerable {
    /**
     * 进行数据序列的投影操作
     *
    */
    function Select<T, TOut>(source: T[], project: (e: T) => TOut): IEnumerator<TOut>;
    /**
     * 进行数据序列的排序操作
     *
    */
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
declare class Group<TKey, T> extends IEnumerator<T> {
    Key: TKey;
    /**
     * Group members, readonly property.
    */
    readonly Group: T[];
    constructor(key: TKey, group: T[]);
    /**
     * 创建一个键值对映射序列，这些映射都具有相同的键名
    */
    ToMaps(): Map<TKey, T>[];
}
