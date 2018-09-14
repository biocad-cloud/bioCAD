/**
 * Provides a set of static (Shared in Visual Basic) methods for querying
 * objects that implement ``System.Collections.Generic.IEnumerable<T>``.
 *
 * (这个枚举器类型是构建出一个Linq查询表达式所必须的基础类型)
*/
declare class IEnumerator<T> {
    /**
     * The data sequence with specific type.
    */
    protected sequence: T[];
    /**
     * 获取序列的元素类型
    */
    readonly ElementType: TypeInfo;
    /**
     * The number of elements in the data sequence.
    */
    readonly Count: number;
    /**
     * 可以从一个数组或者枚举器构建出一个Linq序列
    */
    constructor(source: T[] | IEnumerator<T>);
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
    Select<TOut>(selector: (o: T, i: number) => TOut): IEnumerator<TOut>;
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
    OrderByDescending(key: (e: T) => number): IEnumerator<T>;
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
     * 对序列中的元素进行去重
    */
    Distinct(key?: (o: T) => string): IEnumerator<T>;
    /**
     * Performs the specified action for each element in an array.
     *
     * @param callbackfn  A function that accepts up to three arguments. forEach
     * calls the callbackfn function one time for each element in the array.
     *
    */
    ForEach(callbackfn: (x: T, index: number) => void): void;
    /**
     * Contract the data sequence to string
     *
     * @param deli Delimiter string that using for the string.join function
     * @param toString A lambda that describ how to convert the generic type object to string token
    */
    JoinBy(deli: string, toString?: (x: T) => string): string;
    Unlist<U>(): IEnumerator<U>;
    /**
     * This function returns a clone copy of the source sequence.
    */
    ToArray(): T[];
    ToList(): List<T>;
    ToDictionary<K, V>(keySelector: (x: T) => string, elementSelector?: (x: T) => V): Dictionary<V>;
    ToPointer(): Pointer<T>;
    SlideWindows(winSize: number, step?: number): IEnumerator<data.SlideWindow<T>>;
}
/**
 * 通用数据拓展函数集合
*/
declare module DataExtensions {
    /**
     * 将URL查询字符串解析为字典对象
     *
     * @param queryString URL查询参数
     * @param lowerName 是否将所有的参数名称转换为小写形式？
     *
     * @returns 键值对形式的字典对象
    */
    function parseQueryString(queryString: string, lowerName?: boolean): object;
    /**
     * 尝试将任意类型的目标对象转换为数值类型
     *
     * @returns 一个数值
    */
    function as_numeric(obj: any): number;
}
declare var $: (expr: any) => void;
/**
 * Linq数据流程管线的起始函数
 *
 * @param source 需要进行数据加工的集合对象
*/
declare function From<T>(source: T[] | IEnumerator<T>): IEnumerator<T>;
declare function CharEnumerator(str: string): IEnumerator<string>;
/**
 * 判断目标对象集合是否是空的？
 *
 * @param array 如果这个数组对象是空值或者未定义，都会被判定为空，如果长度为零，则同样也会被判定为空值
*/
declare function IsNullOrEmpty<T>(array: T[] | IEnumerator<T>): boolean;
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
 * 类似于反射类型
*/
declare class TypeInfo {
    readonly TypeOf: string;
    /**
     * 如果这个属性是空的，则说明是js之中的基础类型
    */
    readonly class: string;
    readonly property: string[];
    readonly methods: string[];
    /**
     * 是否是js之中的基础类型？
    */
    readonly IsPrimitive: boolean;
    /**
     * 获取某一个对象的类型信息
    */
    static typeof<T>(obj: T): TypeInfo;
    static GetObjectMethods<T>(obj: T): string[];
    toString(): string;
    static EmptyObject<V>(names: string[] | IEnumerator<string>, init: () => V): object;
}
/**
 * http://www.rfc-editor.org/rfc/rfc4180.txt
*/
declare namespace csv {
    /**
     * ``csv``文件模型
    */
    class dataframe extends IEnumerator<csv.row> {
        /**
         * Csv文件的第一行作为header
        */
        readonly headers: IEnumerator<string>;
        constructor(rows: row[] | IEnumerator<row>);
        buildDoc(): string;
        Objects<T>(): IEnumerator<T>;
        /**
         * 使用ajax将csv文件保存到服务器
         *
         * @param url csv文件数据将会被通过post方法保存到这个url所指定的网络资源上面
         * @param callback ajax异步回调，默认是打印返回结果到终端之上
         *
        */
        save(url: string, callback?: (response: string) => void): void;
        /**
         * 使用ajax GET加载csv文件数据，不推荐使用这个方法处理大型的csv文件数据
         *
         * @param callback 当这个异步回调为空值的时候，函数使用同步的方式工作，返回csv对象
         *                 如果这个参数不是空值，则以异步的方式工作，此时函数会返回空值
        */
        static Load(url: string, callback?: (csv: dataframe) => void): dataframe;
        static Parse(text: string): dataframe;
    }
}
declare namespace csv {
    /**
     * 一行数据
    */
    class row extends IEnumerator<string> {
        /**
         * 当前的这一个行对象的列数据集合
         *
         * 注意，你无法通过直接修改这个数组之中的元素来达到修改这个行之中的值的目的
         * 因为这个属性会返回这个行的数组值的复制对象
        */
        readonly columns: string[];
        /**
         * 这个只读属性仅用于生成csv文件
        */
        readonly rowLine: string;
        constructor(cells: string[]);
        ProjectObject(headers: string[] | IEnumerator<string>): object;
        private static autoEscape;
        static Parse(line: string): row;
    }
}
/**
 * A data sequence object with a internal index pointer.
*/
declare class Pointer<T> extends IEnumerator<T> {
    /**
     * The index pointer of the current data sequence.
    */
    i: number;
    /**
     * The index pointer is at the end of the data sequence?
    */
    readonly EndRead: boolean;
    /**
     * Get the element value in current location i;
    */
    readonly Current: T;
    /**
     * Get current index element value and then move the pointer
     * to next position.
    */
    readonly Next: T;
    constructor(src: T[] | IEnumerator<T>);
    /**
     * Just move the pointer to the next position and then
     * returns current pointer object.
    */
    MoveNext(): Pointer<T>;
}
declare namespace csv {
    /**
     * 通过Chars枚举来解析域，分隔符默认为逗号
     * > https://github.com/xieguigang/sciBASIC/blame/701f9d0e6307a779bb4149c57a22a71572f1e40b/Data/DataFrame/IO/csv/Tokenizer.vb#L97
     *
    */
    function CharsParser(s: string, delimiter?: string, quot?: string): string[];
}
declare namespace data {
    /**
     * 一个数值范围
    */
    class NumericRange implements DoubleRange {
        /**
         * 这个数值范围的最大值
        */
        max: number;
        /**
         * 这个数值范围的最小值
        */
        min: number;
        constructor(min: number, max: number);
        readonly Length: number;
        /**
         * 从一个数值序列之中创建改数值序列的值范围
        */
        static Create(numbers: number[]): NumericRange;
        /**
         * 判断目标数值是否在当前的这个数值范围之内
        */
        IsInside(x: number): boolean;
        PopulateNumbers(step?: number): number[];
        toString(): string;
    }
}
declare namespace data {
    class SlideWindow<T> extends IEnumerator<T> {
        /**
         * 这个滑窗对象在原始的数据序列之中的最左端的位置
        */
        index: number;
        constructor(index: number, src: T[] | IEnumerator<T>);
        /**
         * 创建指定片段长度的滑窗对象
         *
         * @param winSize 滑窗片段的长度
         * @param step 滑窗的步进长度，默认是一个步进
        */
        static Split<T>(src: T[] | IEnumerator<T>, winSize: number, step?: number): IEnumerator<SlideWindow<T>>;
    }
}
declare module HttpHelpers {
    /**
     * 这个函数只会返回200成功代码的响应内容，对于其他的状态代码都会返回null
    */
    function GET(url: string): string;
    function GetAsyn(url: string, callback: (response: string, code: number) => void): void;
    function POST(url: string, postData: PostData, callback: (response: string, code: number) => void): void;
    function UploadFile(url: string, postData: PostData, callback: (response: string, code: number) => void): void;
    class PostData {
        /**
         * content type
        */
        type: string;
        data: any;
        toString(): string;
    }
}
declare module Strings {
    /**
     * 判断给定的字符串是否是空值？
     *
     * @param stringAsFactor 假若这个参数为真的话，那么字符串``undefined``也将会被当作为空值处理
    */
    function Empty(str: string, stringAsFactor?: boolean): boolean;
    function IsPattern(str: string, pattern: RegExp): boolean;
    /**
     * Remove duplicate string values from JS array
     *
     * https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    */
    function uniq(a: string[]): string[];
    /**
     * 将字符串转换为字符数组
     *
     * > https://jsperf.com/convert-string-to-char-code-array/9
     * 经过测试，使用数组push的效率最高
    */
    function ToCharArray(str: string): string[];
    function Len(s: string): number;
    function CompareTo(s1: string, s2: string): number;
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
    ContainsKey(key: string): boolean;
}
/**
 * The linq pipline implements at here. (在这个模块之中实现具体的数据序列算法)
*/
declare module Enumerable {
    /**
     * 进行数据序列的投影操作
     *
    */
    function Select<T, TOut>(source: T[], project: (e: T, i: number) => TOut): IEnumerator<TOut>;
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
    /**
     * Implements a ``group by`` operation by binary tree data structure.
    */
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
declare class List<T> extends IEnumerator<T> {
    constructor(src: T[] | IEnumerator<T>);
    Add(x: T): List<T>;
    AddRange(x: T[] | IEnumerator<T>): List<T>;
    IndexOf(x: T): number;
}
/**
 * Binary tree implements
*/
declare namespace algorithm.BTree {
    /**
     * 用于进行数据分组所需要的最基础的二叉树数据结构
    */
    class binaryTree<T, V> {
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
}
declare namespace algorithm.BTree {
    /**
     * data extension module for binary tree nodes data sequence
    */
    module binaryTreeExtensions {
        /**
         * Convert a binary tree object as a node array.
        */
        function populateNodes<T, V>(tree: node<T, V>): node<T, V>[];
    }
}
declare namespace algorithm.BTree {
    /**
     * A binary tree node.
    */
    class node<T, V> {
        key: T;
        value: V;
        left: node<T, V>;
        right: node<T, V>;
        constructor(key: T, value?: V, left?: node<T, V>, right?: node<T, V>);
        toString(): string;
    }
}
declare namespace Linq.DOM {
    function query(expr: string): IEnumerator<HTMLElement>;
    /**
     *
    */
    function addEvent(el: any, type: string, fn: (event: Event) => void): void;
}
