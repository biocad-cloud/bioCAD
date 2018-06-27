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
    First(): T;
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
    JoinBy(deli: string, toString?: (x: T) => String): string;
    /**
     * This function returns a clone copy of the source sequence.
    */
    ToArray(): T[];
}
declare function From<T>(source: T[]): IEnumerator<T>;
declare class binaryTree<T, V> {
    root: node<T, V>;
    compares: (a: T, b: T) => number;
    constructor(comparer: (a: T, b: T) => number);
    add(term: T, value?: V): void;
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
