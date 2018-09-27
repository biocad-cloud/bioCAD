var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var data;
(function (data) {
    var sprintf;
    (function (sprintf) {
        var match = /** @class */ (function () {
            function match() {
            }
            match.prototype.toString = function () {
                return JSON.stringify(this);
            };
            return match;
        }());
        sprintf.match = match;
        /**
         * 格式化占位符
         *
         * Possible format values:
         *
         * + ``%%`` – Returns a percent sign
         * + ``%b`` – Binary number
         * + ``%c`` – The character according to the ASCII value
         * + ``%d`` – Signed decimal number
         * + ``%f`` – Floating-point number
         * + ``%o`` – Octal number
         * + ``%s`` – String
         * + ``%x`` – Hexadecimal number (lowercase letters)
         * + ``%X`` – Hexadecimal number (uppercase letters)
         *
         * Additional format values. These are placed between the % and the letter (example %.2f):
         *
         * + ``+``      (Forces both + and – in front of numbers. By default, only negative numbers are marked)
         * + ``–``      (Left-justifies the variable value)
         * + ``0``      zero will be used for padding the results to the right string size
         * + ``[0-9]``  (Specifies the minimum width held of to the variable value)
         * + ``.[0-9]`` (Specifies the number of decimal digits or maximum string length)
         *
        */
        sprintf.placeholder = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
        function parseFormat(string, arguments) {
            var stringPosStart = 0;
            var stringPosEnd = 0;
            var matchPosEnd = 0;
            var convCount = 0;
            var match = null;
            var matches = [];
            var strings = [];
            while (match = sprintf.placeholder.exec(string)) {
                stringPosStart = matchPosEnd;
                stringPosEnd = sprintf.placeholder.lastIndex - match[0].length;
                strings[strings.length] = string.substring(stringPosStart, stringPosEnd);
                matchPosEnd = sprintf.placeholder.lastIndex;
                matches[matches.length] = {
                    match: match[0],
                    left: match[3] ? true : false,
                    sign: match[4] || '',
                    pad: match[5] || ' ',
                    min: match[6] || 0,
                    precision: match[8],
                    code: match[9] || '%',
                    negative: parseInt(arguments[convCount]) < 0 ? true : false,
                    argument: String(arguments[convCount])
                };
                if (match[9]) {
                    convCount += 1;
                }
            }
            strings[strings.length] = string.substring(matchPosEnd);
            return {
                matches: matches,
                convCount: convCount,
                strings: strings
            };
        }
        sprintf.parseFormat = parseFormat;
        /**
         * ### Javascript sprintf
         *
         * > http://www.webtoolkit.info/javascript-sprintf.html#.W5sf9FozaM8
         *
         * Several programming languages implement a sprintf function, to output a
         * formatted string. It originated from the C programming language, printf
         * function. Its a string manipulation function.
         *
         * This is limited sprintf Javascript implementation. Function returns a
         * string formatted by the usual printf conventions. See below for more details.
         * You must specify the string and how to format the variables in it.
        */
        function doFormat(format) {
            var argv = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                argv[_i - 1] = arguments[_i];
            }
            if (typeof arguments == "undefined") {
                return null;
            }
            if (arguments.length < 1) {
                return null;
            }
            if (typeof arguments[0] != "string") {
                return null;
            }
            if (typeof RegExp == "undefined") {
                return null;
            }
            var parsed = sprintf.parseFormat(format, argv);
            var convCount = parsed.convCount;
            if (parsed.matches.length == 0) {
                // 没有格式化参数的占位符，则直接输出原本的字符串
                return format;
            }
            else {
                console.log(parsed);
            }
            if (argv.length < convCount) {
                // 格式化参数的数量少于占位符的数量，则抛出错误
                throw "Mismatch format argument numbers (" + argv.length + " !== " + convCount + ")!";
            }
            else {
                return sprintf.doSubstitute(parsed.matches, parsed.strings);
            }
        }
        sprintf.doFormat = doFormat;
        /**
         * 进行格式化占位符对格式化参数的字符串替换操作
        */
        function doSubstitute(matches, strings) {
            var i = null;
            var substitution = null;
            var numVal = 0;
            var newString = '';
            for (i = 0; i < matches.length; i++) {
                if (matches[i].code == '%') {
                    substitution = '%';
                }
                else if (matches[i].code == 'b') {
                    matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
                    substitution = sprintf.convert(matches[i], true);
                }
                else if (matches[i].code == 'c') {
                    numVal = Math.abs(parseInt(matches[i].argument));
                    matches[i].argument = String(String.fromCharCode(parseInt(String(numVal))));
                    substitution = sprintf.convert(matches[i], true);
                }
                else if (matches[i].code == 'd') {
                    matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
                    substitution = sprintf.convert(matches[i]);
                }
                else if (matches[i].code == 'f') {
                    numVal = matches[i].precision ? parseFloat(matches[i].precision) : 6;
                    matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(numVal));
                    substitution = sprintf.convert(matches[i]);
                }
                else if (matches[i].code == 'o') {
                    matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
                    substitution = sprintf.convert(matches[i]);
                }
                else if (matches[i].code == 's') {
                    numVal = matches[i].precision ?
                        parseFloat(matches[i].precision) :
                        matches[i].argument.length;
                    matches[i].argument = matches[i].argument.substring(0, numVal);
                    substitution = sprintf.convert(matches[i], true);
                }
                else if (matches[i].code == 'x') {
                    matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
                    substitution = sprintf.convert(matches[i]);
                }
                else if (matches[i].code == 'X') {
                    matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
                    substitution = sprintf.convert(matches[i]).toUpperCase();
                }
                else {
                    substitution = matches[i].match;
                }
                newString += strings[i];
                newString += substitution;
            }
            return newString + strings[i];
        }
        sprintf.doSubstitute = doSubstitute;
        function convert(match, nosign) {
            if (nosign === void 0) { nosign = false; }
            if (nosign) {
                match.sign = '';
            }
            else {
                match.sign = match.negative ? '-' : match.sign;
            }
            var l = parseFloat(match.min) - match.argument.length + 1 - match.sign.length;
            var pad = new Array(l < 0 ? 0 : l).join(match.pad);
            if (!match.left) {
                if (match.pad == "0" || nosign) {
                    return match.sign + pad + match.argument;
                }
                else {
                    return pad + match.sign + match.argument;
                }
            }
            else {
                if (match.pad == "0" || nosign) {
                    return match.sign + match.argument + pad.replace(/0/g, ' ');
                }
                else {
                    return match.sign + match.argument + pad;
                }
            }
        }
        sprintf.convert = convert;
    })(sprintf = data.sprintf || (data.sprintf = {}));
})(data || (data = {}));
/**
 * Provides a set of static (Shared in Visual Basic) methods for querying
 * objects that implement ``System.Collections.Generic.IEnumerable<T>``.
 *
 * (这个枚举器类型是构建出一个Linq查询表达式所必须的基础类型，这是一个静态的集合，不会发生元素的动态添加或者删除)
*/
var IEnumerator = /** @class */ (function () {
    //#endregion
    /**
     * 可以从一个数组或者枚举器构建出一个Linq序列
     *
     * @param source The enumerator data source, this constructor will perform
     *       a sequence copy action on this given data source sequence at here.
    */
    function IEnumerator(source) {
        if (!source) {
            this.sequence = [];
        }
        else if (Array.isArray(source)) {
            // 2018-07-31 为了防止外部修改source导致sequence数组被修改
            // 在这里进行数组复制，防止出现这种情况
            this.sequence = source.slice();
        }
        else {
            this.sequence = source.sequence.slice();
        }
    }
    Object.defineProperty(IEnumerator.prototype, "ElementType", {
        //#region "readonly property"
        /**
         * 获取序列的元素类型
        */
        get: function () {
            return TypeInfo.typeof(this.First);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(IEnumerator.prototype, "Count", {
        /**
         * The number of elements in the data sequence.
        */
        get: function () {
            return this.sequence.length;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Get the element value at a given index position
     * of this data sequence.
     *
     * @param index index value should be an integer value.
    */
    IEnumerator.prototype.ElementAt = function (index) {
        if (index === void 0) { index = null; }
        if (!index) {
            index = 0;
        }
        else if (typeof index == "string") {
            throw "Item index='" + index + "' must be an integer!";
        }
        return this.sequence[index];
    };
    IEnumerator.prototype.indexOf = function (x) {
        return this.sequence.indexOf(x);
    };
    Object.defineProperty(IEnumerator.prototype, "First", {
        /**
         * Get the first element in this sequence
        */
        get: function () {
            return this.sequence[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IEnumerator.prototype, "Last", {
        /**
         * Get the last element in this sequence
        */
        get: function () {
            return this.sequence[this.Count - 1];
        },
        enumerable: true,
        configurable: true
    });
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
    IEnumerator.prototype.Select = function (selector) {
        return Enumerable.Select(this.sequence, selector);
    };
    /**
     * Groups the elements of a sequence according to a key selector function.
     * The keys are compared by using a comparer and each group's elements
     * are projected by using a specified function.
     *
     * @param compares 注意，javascript在进行中文字符串的比较的时候存在bug，如果当key的类型是字符串的时候，
     *                 在这里需要将key转换为数值进行比较，遇到中文字符串可能会出现bug
    */
    IEnumerator.prototype.GroupBy = function (keySelector, compares) {
        return Enumerable.GroupBy(this.sequence, keySelector, compares);
    };
    /**
     * Filters a sequence of values based on a predicate.
     *
     * @param predicate A test condition function.
     *
     * @returns Sub sequence of the current sequence with all
     *     element test pass by the ``predicate`` function.
    */
    IEnumerator.prototype.Where = function (predicate) {
        return Enumerable.Where(this.sequence, predicate);
    };
    /**
     * Get the min value in current sequence.
     * (求取这个序列集合的最小元素，使用这个函数要求序列之中的元素都必须能够被转换为数值)
    */
    IEnumerator.prototype.Min = function (project) {
        if (project === void 0) { project = function (e) { return DataExtensions.as_numeric(e); }; }
        return Enumerable.OrderBy(this.sequence, project).First;
    };
    /**
     * Get the max value in current sequence.
     * (求取这个序列集合的最大元素，使用这个函数要求序列之中的元素都必须能够被转换为数值)
    */
    IEnumerator.prototype.Max = function (project) {
        if (project === void 0) { project = function (e) { return DataExtensions.as_numeric(e); }; }
        return Enumerable.OrderByDescending(this.sequence, project).First;
    };
    /**
     * 求取这个序列集合的平均值，使用这个函数要求序列之中的元素都必须能够被转换为数值
    */
    IEnumerator.prototype.Average = function (project) {
        if (project === void 0) { project = null; }
        if (this.Count == 0) {
            return 0;
        }
        else {
            return this.Sum(project) / this.sequence.length;
        }
    };
    /**
     * 求取这个序列集合的和，使用这个函数要求序列之中的元素都必须能够被转换为数值
    */
    IEnumerator.prototype.Sum = function (project) {
        if (project === void 0) { project = null; }
        var x = 0;
        if (!project)
            project = function (e) {
                return Number(e);
            };
        for (var i = 0; i < this.sequence.length; i++) {
            x += project(this.sequence[i]);
        }
        return x;
    };
    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     *
     * @param key A function to extract a key from an element.
     *
     * @returns An ``System.Linq.IOrderedEnumerable<T>`` whose elements are
     *          sorted according to a key.
    */
    IEnumerator.prototype.OrderBy = function (key) {
        return Enumerable.OrderBy(this.sequence, key);
    };
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     *
     * @param key A function to extract a key from an element.
     *
     * @returns An ``System.Linq.IOrderedEnumerable<T>`` whose elements are
     *          sorted in descending order according to a key.
    */
    IEnumerator.prototype.OrderByDescending = function (key) {
        return Enumerable.OrderByDescending(this.sequence, key);
    };
    /**
     * 取出序列之中的前n个元素
    */
    IEnumerator.prototype.Take = function (n) {
        return Enumerable.Take(this.sequence, n);
    };
    /**
     * 跳过序列的前n个元素之后返回序列之中的所有剩余元素
    */
    IEnumerator.prototype.Skip = function (n) {
        return Enumerable.Skip(this.sequence, n);
    };
    /**
     * 序列元素的位置反转
    */
    IEnumerator.prototype.Reverse = function () {
        var rseq = this.ToArray().reverse();
        return new IEnumerator(rseq);
    };
    /**
     * Returns elements from a sequence as long as a specified condition is true.
     * (与Where类似，只不过这个函数只要遇到第一个不符合条件的，就会立刻终止迭代)
    */
    IEnumerator.prototype.TakeWhile = function (predicate) {
        return Enumerable.TakeWhile(this.sequence, predicate);
    };
    /**
     * Bypasses elements in a sequence as long as a specified condition is true
     * and then returns the remaining elements.
    */
    IEnumerator.prototype.SkipWhile = function (predicate) {
        return Enumerable.SkipWhile(this.sequence, predicate);
    };
    /**
     * 判断这个序列之中的所有元素是否都满足特定条件
    */
    IEnumerator.prototype.All = function (predicate) {
        return Enumerable.All(this.sequence, predicate);
    };
    /**
     * 判断这个序列之中的任意一个元素是否满足特定的条件
    */
    IEnumerator.prototype.Any = function (predicate) {
        if (predicate === void 0) { predicate = null; }
        if (predicate) {
            return Enumerable.Any(this.sequence, predicate);
        }
        else {
            if (!this.sequence || this.sequence.length == 0) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    /**
     * 对序列中的元素进行去重
    */
    IEnumerator.prototype.Distinct = function (key) {
        if (key === void 0) { key = function (o) { return o.toString(); }; }
        return this
            .GroupBy(key, Strings.CompareTo)
            .Select(function (group) { return group.First; });
    };
    /**
     * 将序列按照符合条件的元素分成区块
     *
     * @param isDelimiter 一个用于判断当前的元素是否是分割元素的函数
     * @param reserve 是否保留下这个分割对象？默认不保留
    */
    IEnumerator.prototype.ChunkWith = function (isDelimiter, reserve) {
        if (reserve === void 0) { reserve = false; }
        var chunks = new List();
        var buffer = [];
        this.sequence.forEach(function (x) {
            if (isDelimiter(x)) {
                chunks.Add(buffer);
                if (reserve) {
                    buffer = [x];
                }
                else {
                    buffer = [];
                }
            }
            else {
                buffer.push(x);
            }
        });
        if (buffer.length > 0) {
            chunks.Add(buffer);
        }
        return chunks;
    };
    /**
     * Performs the specified action for each element in an array.
     *
     * @param callbackfn  A function that accepts up to three arguments. forEach
     * calls the callbackfn function one time for each element in the array.
     *
    */
    IEnumerator.prototype.ForEach = function (callbackfn) {
        this.sequence.forEach(callbackfn);
    };
    /**
     * Contract the data sequence to string
     *
     * @param deli Delimiter string that using for the string.join function
     * @param toString A lambda that describ how to convert the generic type object to string token
     *
     * @returns A contract string.
    */
    IEnumerator.prototype.JoinBy = function (deli, toString) {
        if (toString === void 0) { toString = function (x) {
            if (typeof x === "string") {
                return x;
            }
            else {
                return x.toString();
            }
        }; }
        return this.Select(function (x) { return toString(x); })
            .ToArray()
            .join(deli);
    };
    /**
     * 如果当前的这个数据序列之中的元素的类型是某一种元素类型的集合，或者该元素
     * 可以描述为另一种类型的元素的集合，则可以通过这个函数来进行降维操作处理。
     *
     * @param project 这个投影函数描述了如何将某一种类型的元素降维至另外一种元素类型的集合。
     * 如果这个函数被忽略掉的话，会尝试强制将当前集合的元素类型转换为目标元素类型的数组集合。
    */
    IEnumerator.prototype.Unlist = function (project) {
        if (project === void 0) { project = function (obj) { return obj; }; }
        var list = [];
        this.ForEach(function (a) {
            project(a).forEach(function (x) { return list.push(x); });
        });
        return new IEnumerator(list);
    };
    //#region "conversion"
    /**
     * This function returns a clone copy of the source sequence.
    */
    IEnumerator.prototype.ToArray = function () {
        return this.sequence.slice();
    };
    /**
     * 将当前的这个不可变的只读序列对象转换为可动态增添删除元素的列表对象
    */
    IEnumerator.prototype.ToList = function () {
        return new List(this.sequence);
    };
    /**
     * 将当前的这个数据序列对象转换为键值对字典对象，方便用于数据的查找操作
    */
    IEnumerator.prototype.ToDictionary = function (keySelector, elementSelector) {
        if (elementSelector === void 0) { elementSelector = function (X) {
            return X;
        }; }
        var maps = {};
        this.sequence.forEach(function (x) {
            // 2018-08-11 键名只能够是字符串类型的
            var key = keySelector(x);
            var value = elementSelector(x);
            maps[key] = value;
        });
        return new Dictionary(maps);
    };
    /**
     * 将当前的这个数据序列转换为包含有内部位置指针数据的指针对象
    */
    IEnumerator.prototype.ToPointer = function () {
        return new Pointer(this);
    };
    /**
     * 将当前的这个序列转换为一个滑窗数据的集合
    */
    IEnumerator.prototype.SlideWindows = function (winSize, step) {
        if (step === void 0) { step = 1; }
        return data.SlideWindow.Split(this, winSize, step);
    };
    return IEnumerator;
}());
var Linq;
(function (Linq) {
    var TsQuery;
    (function (TsQuery) {
        TsQuery.handler = {
            /**
             * HTML document query handler
            */
            string: function () { return new stringEval(); },
            /**
             * Create a linq object
            */
            array: function () { return new arrayEval(); }
        };
        /**
         * 字符串格式的值意味着对html文档节点的查询
        */
        var stringEval = /** @class */ (function () {
            function stringEval() {
            }
            stringEval.prototype.doEval = function (expr, type) {
                var query = Linq.DOM.Query.parseQuery(expr);
                if (query.type == Linq.DOM.QueryTypes.id) {
                    return document.getElementById(query.expression);
                }
                else if (query.type == Linq.DOM.QueryTypes.NoQuery) {
                    var declare = Linq.DOM.ParseNodeDeclare(expr);
                    var node = document
                        .createElement(declare.tag);
                    declare.attrs.forEach(function (attr) {
                        node.setAttribute(attr.name, attr.value);
                    });
                    return node;
                }
                else if (!query.singleNode) {
                    var nodes = document
                        .querySelectorAll(query.expression);
                    var it = new Linq.DOM.DOMEnumerator(nodes);
                    return it;
                }
                else {
                    return document.querySelector(query.expression);
                }
            };
            return stringEval;
        }());
        TsQuery.stringEval = stringEval;
        /**
         * Create a Linq Enumerator
        */
        var arrayEval = /** @class */ (function () {
            function arrayEval() {
            }
            arrayEval.prototype.doEval = function (expr, type) {
                return From(expr);
            };
            return arrayEval;
        }());
        TsQuery.arrayEval = arrayEval;
    })(TsQuery = Linq.TsQuery || (Linq.TsQuery = {}));
})(Linq || (Linq = {}));
/**
 * 通用数据拓展函数集合
*/
var DataExtensions;
(function (DataExtensions) {
    function getCook(cookiename) {
        // Get name followed by anything except a semicolon
        var cookie = document.cookie;
        var cookiestring = RegExp("" + cookiename + "[^;]+").exec(cookie);
        var value;
        // Return everything after the equal sign, 
        // or an empty string if the cookie name not found
        if (!!cookiestring) {
            value = cookiestring.toString().replace(/^[^=]+./, "");
        }
        else {
            value = "";
        }
        return decodeURIComponent(value);
    }
    DataExtensions.getCook = getCook;
    /**
     * 将URL查询字符串解析为字典对象
     *
     * @param queryString URL查询参数
     * @param lowerName 是否将所有的参数名称转换为小写形式？
     *
     * @returns 键值对形式的字典对象
    */
    function parseQueryString(queryString, lowerName) {
        if (lowerName === void 0) { lowerName = false; }
        // stuff after # is not part of query string, so get rid of it
        // split our query string into its component parts
        var arr = queryString.split('#')[0].split('&');
        // we'll store the parameters here
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');
            // in case params look like: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });
            // set parameter value (use 'true' if empty)
            var paramValue = typeof (a[1]) === 'undefined' ? "true" : a[1];
            if (lowerName) {
                paramName = paramName.toLowerCase();
            }
            // if parameter name already exists
            if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                if (typeof paramNum === 'undefined') {
                    // if no array index number specified...
                    // put the value on the end of the array
                    obj[paramName].push(paramValue);
                }
                else {
                    // if array index number specified...
                    // put the value at that index number
                    obj[paramName][paramNum] = paramValue;
                }
            }
            else {
                // if param name doesn't exist yet, set it
                obj[paramName] = paramValue;
            }
        }
        return obj;
    }
    DataExtensions.parseQueryString = parseQueryString;
    /**
     * 尝试将任意类型的目标对象转换为数值类型
     *
     * @returns 一个数值
    */
    function as_numeric(obj) {
        return AsNumeric(obj)(obj);
    }
    DataExtensions.as_numeric = as_numeric;
    /**
     * 因为在js之中没有类型信息，所以如果要取得类型信息必须要有一个目标对象实例
     * 所以在这里，函数会需要一个实例对象来取得类型值
    */
    function AsNumeric(obj) {
        if (obj == null || obj == undefined) {
            return null;
        }
        if (typeof obj === 'number') {
            return function (x) { return x; };
        }
        else if (typeof obj === 'boolean') {
            return function (x) {
                if (x == true) {
                    return 1;
                }
                else {
                    return -1;
                }
            };
        }
        else if (typeof obj == 'undefined') {
            return function (x) { return 0; };
        }
        else if (typeof obj == 'string') {
            return function (x) {
                return Strings.Val(x);
            };
        }
        else {
            // 其他的所有情况都转换为零
            return function (x) { return 0; };
        }
    }
    DataExtensions.AsNumeric = AsNumeric;
})(DataExtensions || (DataExtensions = {}));
/**
 * TypeScript string helpers
*/
var Strings;
(function (Strings) {
    Strings.x0 = "0".charCodeAt(0);
    Strings.x9 = "9".charCodeAt(0);
    /**
     * @param text A single character
    */
    function isNumber(text) {
        var code = text.charCodeAt(0);
        return code >= Strings.x0 && code <= Strings.x9;
    }
    Strings.isNumber = isNumber;
    /**
     * 将字符串转换为一个实数
    */
    function Val(str) {
        if (str == null || str == '' || str == undefined || str == "undefined") {
            // 将空字符串转换为零
            return 0;
        }
        else if (str == "NA" || str == "NaN") {
            return Number.NaN;
        }
        else if (str == "Inf") {
            return Number.POSITIVE_INFINITY;
        }
        else if (str == "-Inf") {
            return Number.NEGATIVE_INFINITY;
        }
        else {
            return parseFloat(str);
        }
    }
    Strings.Val = Val;
    /**
     * 将文本字符串按照newline进行分割
    */
    function lineTokens(text) {
        return (!text) ? [] : text.trim().split("\n");
    }
    Strings.lineTokens = lineTokens;
    /**
     * 如果不存在``tag``分隔符，则返回来的``tuple``里面，``name``是输入的字符串，``value``则是空字符串
     *
     * @param tag 分割name和value的分隔符，默认是一个空白符号
    */
    function GetTagValue(str, tag) {
        if (tag === void 0) { tag = " "; }
        if (!str) {
            return new NamedValue();
        }
        else {
            return tagValueImpl(str, tag);
        }
    }
    Strings.GetTagValue = GetTagValue;
    function tagValueImpl(str, tag) {
        var i = str.indexOf(tag);
        var tagLen = Len(tag);
        if (i > -1) {
            var name = str.substr(0, i);
            var value = str.substr(i + tagLen);
            return new NamedValue(name, value);
        }
        else {
            return new NamedValue(str, "");
        }
    }
    /**
     * Removes the given chars from the begining of the given
     * string and the end of the given string.
     *
     * @param chars A collection of characters that will be trimmed.
    */
    function Trim(str, chars) {
        if (typeof chars == "string") {
            chars = From(Strings.ToCharArray(chars))
                .Select(function (c) { return c.charCodeAt(0); })
                .ToArray();
        }
        return function (chars) {
            return From(Strings.ToCharArray(str))
                .SkipWhile(function (c) { return chars.indexOf(c.charCodeAt(0)) > -1; })
                .Reverse()
                .SkipWhile(function (c) { return chars.indexOf(c.charCodeAt(0)) > -1; })
                .Reverse()
                .JoinBy("");
        }(chars);
    }
    Strings.Trim = Trim;
    /**
     * Determine that the given string is empty string or not?
     * (判断给定的字符串是否是空值？)
     *
     * @param stringAsFactor 假若这个参数为真的话，那么字符串``undefined``也将会被当作为空值处理
    */
    function Empty(str, stringAsFactor) {
        if (stringAsFactor === void 0) { stringAsFactor = false; }
        if (!str) {
            return true;
        }
        else if (str == undefined) {
            return true;
        }
        else if (str.length == 0) {
            return true;
        }
        else if (stringAsFactor && str.toString() == "undefined") {
            return true;
        }
        else {
            return false;
        }
    }
    Strings.Empty = Empty;
    /**
     * Determine that the whole given string is match a given regex pattern.
    */
    function IsPattern(str, pattern) {
        var match = str.match(pattern)[0];
        var test = match == str;
        return test;
    }
    Strings.IsPattern = IsPattern;
    /**
     * Remove duplicate string values from JS array
     *
     * https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    */
    function uniq(a) {
        var seen = {};
        return a.filter(function (item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }
    Strings.uniq = uniq;
    /**
     * 将字符串转换为字符数组
     *
     * @description > https://jsperf.com/convert-string-to-char-code-array/9
     *    经过测试，使用数组push的效率最高
     *
     * @returns A character array, all of the string element in the array
     *      is one character length.
    */
    function ToCharArray(str) {
        var cc = [];
        var strLen = str.length;
        for (var i = 0; i < strLen; ++i) {
            cc.push(str.charAt(i));
        }
        return cc;
    }
    Strings.ToCharArray = ToCharArray;
    /**
     * Measure the string length, a null string value or ``undefined``
     * variable will be measured as ZERO length.
    */
    function Len(s) {
        if (!s || s == undefined) {
            return 0;
        }
        else {
            return s.length;
        }
    }
    Strings.Len = Len;
    function CompareTo(s1, s2) {
        var l1 = Strings.Len(s1);
        var l2 = Strings.Len(s2);
        var minl = Math.min(l1, l2);
        for (var i = 0; i < minl; i++) {
            var x = s1.charCodeAt(i);
            var y = s2.charCodeAt(i);
            if (x > y) {
                return 1;
            }
            else if (x < y) {
                return -1;
            }
        }
        if (l1 > l2) {
            return 1;
        }
        else if (l1 < l2) {
            return -1;
        }
        else {
            return 0;
        }
    }
    Strings.CompareTo = CompareTo;
    Strings.sprintf = data.sprintf.doFormat;
})(Strings || (Strings = {}));
/**
 * 类似于反射类型
*/
var TypeInfo = /** @class */ (function () {
    function TypeInfo() {
    }
    Object.defineProperty(TypeInfo.prototype, "IsPrimitive", {
        /**
         * 是否是js之中的基础类型？
        */
        get: function () {
            return !this.class;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeInfo.prototype, "IsArray", {
        get: function () {
            return this.typeOf == "array";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeInfo.prototype, "IsEnumerator", {
        get: function () {
            return this.typeOf == "object" && this.class == "IEnumerator";
        },
        enumerable: true,
        configurable: true
    });
    TypeInfo.prototype.IsArrayOf = function (genericType) {
        return this.IsArray && this.class == genericType;
    };
    /**
     * 获取某一个对象的类型信息
    */
    TypeInfo.typeof = function (obj) {
        var type = typeof obj;
        var isObject = type == "object";
        var isArray = Array.isArray(obj);
        var className = "";
        if (isArray) {
            var x = obj[0];
            if ((className = typeof x) == "object") {
                className = x.constructor.name;
            }
            else {
                // do nothing
            }
        }
        else if (isObject) {
            className = obj.constructor.name;
        }
        else {
            className = "";
        }
        var typeInfo = new TypeInfo;
        typeInfo.typeOf = isArray ? "array" : type;
        typeInfo.class = className;
        typeInfo.property = isObject ? Object.keys(obj) : [];
        typeInfo.methods = TypeInfo.GetObjectMethods(obj);
        return typeInfo;
    };
    /**
     * 获取object对象上所定义的所有的函数
    */
    TypeInfo.GetObjectMethods = function (obj) {
        var res = [];
        for (var m in obj) {
            if (typeof obj[m] == "function") {
                res.push(m);
            }
        }
        return res;
    };
    TypeInfo.prototype.toString = function () {
        if (this.typeOf == "object") {
            return "<" + this.typeOf + "> " + this.class;
        }
        else {
            return this.typeOf;
        }
    };
    /**
     * 利用一个名称字符串集合创建一个js对象
     *
     * @param names object的属性名称列表
     * @param init 使用这个函数为该属性指定一个初始值
    */
    TypeInfo.EmptyObject = function (names, init) {
        var obj = {};
        if (Array.isArray(names)) {
            names.forEach(function (name) { return obj[name] = init(); });
        }
        else {
            names.ForEach(function (name) { return obj[name] = init(); });
        }
        return obj;
    };
    /**
     * 从键值对集合创建object对象，键名或者名称属性会作为object对象的属性名称
    */
    TypeInfo.CreateObject = function (nameValues) {
        var obj = {};
        var type = TypeInfo.typeof(nameValues);
        if (type.IsArray && type.class == "Map") {
            nameValues.forEach(function (map) { return obj[map.key] = map.value; });
        }
        else if (type.IsArray && type.class == "NamedValue") {
            nameValues.forEach(function (nv) { return obj[nv.name] = nv.value; });
        }
        else if (type.class == "IEnumerator") {
            var seq = nameValues;
            type = seq.ElementType;
            if (type.class == "Map") {
                nameValues.ForEach(function (map) { return obj[map.key] = map.value; });
            }
            else if (type.class == "NamedValue") {
                nameValues.ForEach(function (nv) { return obj[nv.name] = nv.value; });
            }
            else {
                console.error(type);
                throw "Unsupport data type: " + type.class;
            }
        }
        else {
            throw "Unsupport data type: " + JSON.stringify(type);
        }
        return obj;
    };
    /**
     * MetaReader对象和字典相似，只不过是没有类型约束，并且为只读集合
    */
    TypeInfo.CreateMetaReader = function (nameValues) {
        return new TsLinq.MetaReader(TypeInfo.CreateObject(nameValues));
    };
    return TypeInfo;
}());
/// <reference path="Data/sprintf.ts" />
/// <reference path="Linq/Collections/Enumerator.ts" />
/// <reference path="Linq/TsQuery.ts" />
/// <reference path="Helpers/Extensions.ts" />
/// <reference path="Helpers/Strings.ts" />
/// <reference path="Type.ts" />
/**
 * 对于这个函数的返回值还需要做类型转换
*/
function $ts(any) {
    var type = TypeInfo.typeof(any);
    var typeOf = type.typeOf;
    var handle = Linq.TsQuery.handler;
    var eval = typeOf in handle ? handle[typeOf]() : null;
    if (type.IsArray) {
        return eval.doEval(any, type);
    }
    else if (type.typeOf == "function") {
        Linq.DOM.ready(any);
    }
    else {
        return eval.doEval(any, type);
    }
}
/**
 * ### Javascript sprintf
 *
 * > http://www.webtoolkit.info/javascript-sprintf.html#.W5sf9FozaM8
 *
 * Several programming languages implement a sprintf function, to output a
 * formatted string. It originated from the C programming language, printf
 * function. Its a string manipulation function.
 *
 * This is limited sprintf Javascript implementation. Function returns a
 * string formatted by the usual printf conventions. See below for more details.
 * You must specify the string and how to format the variables in it.
*/
var sprintf = data.sprintf.doFormat;
/**
 * Linq数据流程管线的起始函数
 *
 * @param source 需要进行数据加工的集合对象
*/
function From(source) {
    return new IEnumerator(source);
}
function CharEnumerator(str) {
    return new IEnumerator(Strings.ToCharArray(str));
}
/**
 * 判断目标对象集合是否是空的？
 *
 * @param array 如果这个数组对象是空值或者未定义，都会被判定为空，如果长度为零，则同样也会被判定为空值
*/
function IsNullOrEmpty(array) {
    if (array == null || array == undefined) {
        return true;
    }
    else if (Array.isArray(array) && array.length == 0) {
        return true;
    }
    else if (array.Count == 0) {
        return true;
    }
    else {
        return false;
    }
}
function isNullOrUndefined(obj) {
    if (obj == null || obj == undefined) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * HTML/Javascript: how to access JSON data loaded in a script tag.
*/
function LoadJson(id) {
    return JSON.parse(LoadText(id));
}
function LoadText(id) {
    return document.getElementById(id).textContent;
}
/**
 * Quick Tip: Get URL Parameters with JavaScript
 *
 * > https://www.sitepoint.com/get-url-parameters-with-javascript/
 *
 * @param url get query string from url (optional) or window
*/
function getAllUrlParams(url) {
    if (url === void 0) { url = window.location.href; }
    var queryString = url.split('?')[1];
    if (queryString) {
        // if query string exists
        return new Dictionary(DataExtensions.parseQueryString(queryString));
    }
    else {
        return new Dictionary({});
    }
}
/**
 * http://www.rfc-editor.org/rfc/rfc4180.txt
*/
var csv;
(function (csv_1) {
    /**
     * Common Format and MIME Type for Comma-Separated Values (CSV) Files
    */
    var contentType = "text/csv";
    /**
     * ``csv``文件模型
    */
    var dataframe = /** @class */ (function (_super) {
        __extends(dataframe, _super);
        function dataframe(rows) {
            return _super.call(this, rows) || this;
        }
        Object.defineProperty(dataframe.prototype, "headers", {
            /**
             * Csv文件的第一行作为header
            */
            get: function () {
                return new IEnumerator(this.sequence[0]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(dataframe.prototype, "contents", {
            /**
             * 获取除了第一行作为``header``数据的剩余的所有的行数据
            */
            get: function () {
                return this.Skip(1);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取指定列名称的所有的行的列数据
         *
         * @param name csv文件的列名称，第一行之中的文本数据的内容
         *
         * @returns 该使用名称所指定的列的所有的内容字符串的枚举序列对象
        */
        dataframe.prototype.Column = function (name) {
            var index = this.sequence[0].indexOf(name);
            if (index == -1) {
                return new IEnumerator([]);
            }
            else {
                return this.Select(function (r) { return r.ElementAt(index); });
            }
        };
        /**
         * 向当前的数据框对象之中添加一行数据
        */
        dataframe.prototype.AppendLine = function (line) {
            this.sequence.push(line);
            return this;
        };
        /**
         * 向当前的数据框对象之中添加多行数据
        */
        dataframe.prototype.AppendRows = function (data) {
            var _this = this;
            if (Array.isArray(data)) {
                data.forEach(function (r) { return _this.sequence.push(r); });
            }
            else {
                data.ForEach(function (r) { return _this.sequence.push(r); });
            }
            return this;
        };
        /**
         * 将当前的这个数据框对象转换为csv文本内容
        */
        dataframe.prototype.buildDoc = function () {
            return this.Select(function (r) { return r.rowLine; }).JoinBy("\n");
        };
        /**
         * 使用反射操作将csv文档转换为特定类型的对象数据序列
         *
         * @param fieldMaps 这个参数是一个对象，其描述了如何将csv文档之中在js之中
         *     的非法标识符转换为合法的标识符的映射
         * @param activator 这个函数指针描述了如何创建一个新的指定类型的对象的过程，
         *     这个函数指针不可以有参数的传递。
         *
         * @returns 这个函数返回类型约束的对象Linq序列集合
        */
        dataframe.prototype.Objects = function (fieldMaps, activator) {
            if (fieldMaps === void 0) { fieldMaps = {}; }
            if (activator === void 0) { activator = function () {
                return {};
            }; }
            var header = dataframe.ensureMapsAll(fieldMaps, this.headers.ToArray());
            var objs = this
                .Skip(1)
                .Select(function (r) {
                var o = activator();
                r.ForEach(function (c, i) {
                    o[header(i)] = c;
                });
                return o;
            });
            return objs;
        };
        dataframe.ensureMapsAll = function (fieldMaps, headers) {
            for (var i = 0; i < headers.length - 1; i++) {
                var column = headers[i];
                if (column in fieldMaps) {
                    // do nothing
                }
                else {
                    // fill gaps
                    fieldMaps[column] = column;
                }
            }
            return function (i) {
                return fieldMaps[headers[i]];
            };
        };
        /**
         * 使用ajax将csv文件保存到服务器
         *
         * @param url csv文件数据将会被通过post方法保存到这个url所指定的网络资源上面
         * @param callback ajax异步回调，默认是打印返回结果到终端之上
         *
        */
        dataframe.prototype.save = function (url, callback) {
            if (callback === void 0) { callback = function (response) {
                console.log(response);
            }; }
            var file = this.buildDoc();
            var data = {
                type: contentType,
                data: file
            };
            HttpHelpers.UploadFile(url, data, callback);
        };
        /**
         * 使用ajax GET加载csv文件数据，不推荐使用这个方法处理大型的csv文件数据
         *
         * @param callback 当这个异步回调为空值的时候，函数使用同步的方式工作，返回csv对象
         *                 如果这个参数不是空值，则以异步的方式工作，此时函数会返回空值
        */
        dataframe.Load = function (url, tsv, callback) {
            if (tsv === void 0) { tsv = false; }
            if (callback === void 0) { callback = null; }
            if (callback == null || callback == undefined) {
                // 同步
                return dataframe.Parse(HttpHelpers.GET(url), tsv);
            }
            else {
                // 异步
                HttpHelpers.GetAsyn(url, function (text, code) {
                    if (code == 200) {
                        callback(dataframe.Parse(text, tsv));
                    }
                    else {
                        throw "Error while load csv data source, http " + code + ": " + text;
                    }
                });
            }
            return null;
        };
        /**
         * 将所给定的文本文档内容解析为数据框对象
         *
         * @param tsv 所需要进行解析的文本内容是否为使用``<TAB>``作为分割符的tsv文本文件？
         *   默认不是，即默认使用逗号``,``作为分隔符的csv文本文件。
        */
        dataframe.Parse = function (text, tsv) {
            if (tsv === void 0) { tsv = false; }
            var parse = tsv ? csv_1.row.ParseTsv : csv_1.row.Parse;
            var rows = From(text.split(/\n/)).Select(parse);
            return new dataframe(rows);
        };
        return dataframe;
    }(IEnumerator));
    csv_1.dataframe = dataframe;
})(csv || (csv = {}));
var csv;
(function (csv) {
    /**
     * 将对象序列转换为``dataframe``对象
     *
     * 这个函数只能够转换object类型的数据，对于基础类型将不保证能够正常工作
     *
     * @param data 因为这个对象序列对象是具有类型约束的，所以可以直接从第一个
     *    元素对象之中得到所有的属性名称作为csv文件头的数据
    */
    function toDataFrame(data) {
        var header = $ts(Object.keys(data.First));
        var rows = data
            .Select(function (obj) {
            var columns = header
                .Select(function (ref, i) {
                return toString(obj[ref]);
            });
            return new csv.row(columns);
        });
        return new csv.dataframe([new csv.row(header)]).AppendRows(rows);
    }
    csv.toDataFrame = toDataFrame;
    function toString(obj) {
        if (isNullOrUndefined(obj)) {
            // 这个对象值是空的，所以在csv文件之中是空字符串
            return "";
        }
        else {
            return "" + obj;
        }
    }
})(csv || (csv = {}));
var csv;
(function (csv) {
    var HTML;
    (function (HTML) {
        var bootstrap = ["table", "table-hover"];
        /**
         * 将数据框对象转换为HTMl格式的表格对象的html代码
         *
         * @param tblClass 所返回来的html表格代码之中的table对象的类型默认是bootstrap类型的，
         * 所以默认可以直接应用bootstrap的样式在这个表格之上
         *
         * @returns 表格的HTML代码
        */
        function toHTMLTable(data, tblClass) {
            if (tblClass === void 0) { tblClass = bootstrap; }
            var th = data.headers
                .Select(function (h) { return "<th>" + h + "</th>"; })
                .JoinBy("\n");
            var tr = data.contents
                .Select(function (r) { return r.Select(function (c) { return "<td>" + c + "</td>"; }).JoinBy(""); })
                .Select(function (r) { return "<tr>" + r + "</tr>"; })
                .JoinBy("\n");
            return "\n            <table class=\"" + tblClass + "\">\n                <thead>\n                    <tr>" + th + "</tr>\n                </thead>\n                <tbody>\n                    " + tr + "\n                </tbody>\n            </table>";
        }
        HTML.toHTMLTable = toHTMLTable;
        function createHTMLTable(data, tblClass) {
            if (tblClass === void 0) { tblClass = bootstrap; }
            return toHTMLTable(csv.toDataFrame(data), tblClass);
        }
        HTML.createHTMLTable = createHTMLTable;
    })(HTML = csv.HTML || (csv.HTML = {}));
})(csv || (csv = {}));
var csv;
(function (csv) {
    /**
     * 一行数据
    */
    var row = /** @class */ (function (_super) {
        __extends(row, _super);
        function row(cells) {
            return _super.call(this, cells) || this;
        }
        Object.defineProperty(row.prototype, "columns", {
            /**
             * 当前的这一个行对象的列数据集合
             *
             * 注意，你无法通过直接修改这个数组之中的元素来达到修改这个行之中的值的目的
             * 因为这个属性会返回这个行的数组值的复制对象
            */
            get: function () {
                return this.sequence.slice();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(row.prototype, "rowLine", {
            /**
             * 这个只读属性仅用于生成csv文件
            */
            get: function () {
                return From(this.columns)
                    .Select(row.autoEscape)
                    .JoinBy(",");
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the index of the first occurrence of a value in an array.
         *
         * 函数得到指定的值在本行对象之中的列的编号
         *
         * @param value The value to locate in the array.
         * @param fromIndex The array index at which to begin the search. If ``fromIndex`` is omitted,
         *      the search starts at index 0.
         *
         * @returns 如果这个函数返回-1则表示找不到
        */
        row.prototype.indexOf = function (value, fromIndex) {
            if (fromIndex === void 0) { fromIndex = 0; }
            return this.sequence.indexOf(value);
        };
        row.prototype.ProjectObject = function (headers) {
            var obj = {};
            var data = this.columns;
            if (Array.isArray(headers)) {
                headers.forEach(function (h, i) {
                    obj[h] = data[i];
                });
            }
            else {
                headers.ForEach(function (h, i) {
                    obj[h] = data[i];
                });
            }
            return obj;
        };
        row.autoEscape = function (c) {
            if (c.indexOf(",") > -1) {
                return "\"" + c + "\"";
            }
            else {
                return c;
            }
        };
        row.Parse = function (line) {
            return new row(csv.CharsParser(line));
        };
        row.ParseTsv = function (line) {
            return new row(csv.CharsParser(line, "\t"));
        };
        return row;
    }(IEnumerator));
    csv.row = row;
})(csv || (csv = {}));
/// <reference path="Enumerator.ts" />
/**
 * A data sequence object with a internal index pointer.
*/
var Pointer = /** @class */ (function (_super) {
    __extends(Pointer, _super);
    function Pointer(src) {
        var _this = _super.call(this, src) || this;
        // 2018-09-02 在js里面，数值必须要进行初始化
        // 否则会出现NA初始值，导致使用EndRead属性判断失败
        // 可能会导致死循环的问题出现
        _this.i = 0;
        return _this;
    }
    Object.defineProperty(Pointer.prototype, "EndRead", {
        /**
         * The index pointer is at the end of the data sequence?
        */
        get: function () {
            return this.i >= this.Count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "Current", {
        /**
         * Get the element value in current location i;
        */
        get: function () {
            return this.sequence[this.i];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "Next", {
        /**
         * Get current index element value and then move the pointer
         * to next position.
        */
        get: function () {
            var x = this.Current;
            this.i = this.i + 1;
            return x;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Just move the pointer to the next position and then
     * returns current pointer object.
    */
    Pointer.prototype.MoveNext = function () {
        this.i = this.i + 1;
        return this;
    };
    return Pointer;
}(IEnumerator));
/// <reference path="../Linq/Collections/Pointer.ts" />
var csv;
(function (csv) {
    /**
     * 通过Chars枚举来解析域，分隔符默认为逗号
     * > https://github.com/xieguigang/sciBASIC/blame/701f9d0e6307a779bb4149c57a22a71572f1e40b/Data/DataFrame/IO/csv/Tokenizer.vb#L97
     *
    */
    function CharsParser(s, delimiter, quot) {
        if (delimiter === void 0) { delimiter = ","; }
        if (quot === void 0) { quot = '"'; }
        var tokens = [];
        var temp = [];
        var openStack = false;
        var buffer = From(Strings.ToCharArray(s)).ToPointer();
        var dblQuot = new RegExp("[" + quot + "]{2}", 'g');
        var cellStr = function () {
            // https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
            // 2018-09-02
            // 如果join函数的参数是空的话，则js之中默认是使用逗号作为连接符的 
            return temp.join("").replace(dblQuot, quot);
        };
        var procEscape = function (c) {
            if (!StartEscaping(temp)) {
                // 查看下一个字符是否为分隔符
                // 因为前面的 Dim c As Char = +buffer 已经位移了，所以在这里直接取当前的字符
                var peek = buffer.Current;
                // 也有可能是 "" 转义 为单个 "
                var lastQuot = (temp.length > 0 && temp[temp.length - 1] != quot);
                if (temp.length == 0 && peek == delimiter) {
                    // openStack意味着前面已经出现一个 " 了
                    // 这里又出现了一个 " 并且下一个字符为分隔符
                    // 则说明是 "", 当前的cell内容是一个空字符串
                    tokens.push("");
                    temp = [];
                    buffer.MoveNext();
                    openStack = false;
                }
                else if ((peek == delimiter || buffer.EndRead) && lastQuot) {
                    // 下一个字符为分隔符，则结束这个token
                    tokens.push(cellStr());
                    temp = [];
                    // 跳过下一个分隔符，因为已经在这里判断过了
                    buffer.MoveNext();
                    openStack = false;
                }
                else {
                    // 不是，则继续添加
                    temp.push(c);
                }
            }
            else {
                // \" 会被转义为单个字符 "
                temp[temp.length - 1] = c;
            }
        };
        while (!buffer.EndRead) {
            var c = buffer.Next;
            if (openStack) {
                if (c == quot) {
                    procEscape(c);
                }
                else {
                    // 由于双引号而产生的转义          
                    temp.push(c);
                }
            }
            else {
                if (temp.length == 0 && c == quot) {
                    // token的第一个字符串为双引号，则开始转义
                    openStack = true;
                }
                else {
                    if (c == delimiter) {
                        tokens.push(cellStr());
                        temp = [];
                    }
                    else {
                        temp.push(c);
                    }
                }
            }
        }
        if (temp.length > 0) {
            tokens.push(cellStr());
        }
        return tokens;
    }
    csv.CharsParser = CharsParser;
    /**
     * 当前的token对象之中是否是转义的起始，即当前的token之中的最后一个符号
     * 是否是转义符<paramref name="escape"/>?
    */
    function StartEscaping(buffer, escape) {
        if (escape === void 0) { escape = "\\"; }
        if (IsNullOrEmpty(buffer)) {
            return false;
        }
        else {
            return buffer[buffer.length - 1] == escape;
        }
    }
})(csv || (csv = {}));
var TsLinq;
(function (TsLinq) {
    var MetaReader = /** @class */ (function () {
        function MetaReader(meta) {
            this.meta = meta;
        }
        /**
         * Read meta object value by call name
         *
         * > https://stackoverflow.com/questions/280389/how-do-you-find-out-the-caller-function-in-javascript
        */
        MetaReader.prototype.GetValue = function (key) {
            if (key === void 0) { key = null; }
            if (!key) {
                key = TsLinq.StackTrace.GetCallerMember().memberName;
            }
            if (key in this.meta) {
                return this.meta[key];
            }
            else {
                return null;
            }
        };
        return MetaReader;
    }());
    TsLinq.MetaReader = MetaReader;
})(TsLinq || (TsLinq = {}));
var TsLinq;
(function (TsLinq) {
    var PriorityQueue = /** @class */ (function (_super) {
        __extends(PriorityQueue, _super);
        function PriorityQueue(events) {
            var _this = _super.call(this, []) || this;
            _this.events = events;
            return _this;
        }
        Object.defineProperty(PriorityQueue.prototype, "Q", {
            /**
             * 队列元素
            */
            get: function () {
                return this.sequence;
            },
            enumerable: true,
            configurable: true
        });
        PriorityQueue.prototype.enqueue = function (obj) {
            var last = this.Last;
            var q = this.Q;
            var x = new QueueItem(obj);
            q.push(x);
            if (last) {
                last.below = x;
                x.above = last;
            }
        };
        PriorityQueue.prototype.extract = function (i) {
            var q = this.Q;
            var x_above = q[i - 1];
            var x_below = q[i + 1];
            var x = q.splice(i, 1)[0];
            if (x_above) {
                x_above.below = x_below;
            }
            if (x_below) {
                x_below.above = x_above;
            }
            return x;
        };
        PriorityQueue.prototype.dequeue = function () {
            return this.extract(0);
        };
        return PriorityQueue;
    }(IEnumerator));
    TsLinq.PriorityQueue = PriorityQueue;
    var QueueItem = /** @class */ (function () {
        function QueueItem(x) {
            this.value = x;
        }
        QueueItem.prototype.toString = function () {
            return this.value.toString();
        };
        return QueueItem;
    }());
    TsLinq.QueueItem = QueueItem;
})(TsLinq || (TsLinq = {}));
var data;
(function (data_1) {
    /**
     * 一个数值范围
    */
    var NumericRange = /** @class */ (function () {
        // #endregion
        // #region Constructors (1)
        function NumericRange(min, max) {
            this.min = min;
            this.max = max;
        }
        Object.defineProperty(NumericRange.prototype, "Length", {
            // #endregion
            // #region Public Accessors (1)
            get: function () {
                return this.max - this.min;
            },
            enumerable: true,
            configurable: true
        });
        // #endregion
        // #region Public Static Methods (1)
        /**
         * 从一个数值序列之中创建改数值序列的值范围
        */
        NumericRange.Create = function (numbers) {
            var seq = Array.isArray(numbers) ?
                $ts(numbers) :
                numbers;
            var min = seq.Min();
            var max = seq.Max();
            return new NumericRange(min, max);
        };
        // #endregion
        // #region Public Methods (3)
        /**
         * 判断目标数值是否在当前的这个数值范围之内
        */
        NumericRange.prototype.IsInside = function (x) {
            return x >= this.min && x <= this.max;
        };
        /**
         * Get a numeric sequence within current range with a given step
         *
         * @param step The delta value of the step forward,
         *      by default is 10% of the range length.
        */
        NumericRange.prototype.PopulateNumbers = function (step) {
            if (step === void 0) { step = (this.Length / 10); }
            var data = [];
            for (var x = this.min; x < this.max; x += step) {
                data.push(x);
            }
            return data;
        };
        /**
         * Display the range in format ``[min, max]``
        */
        NumericRange.prototype.toString = function () {
            return "[" + this.min + ", " + this.max + "]";
        };
        return NumericRange;
    }());
    data_1.NumericRange = NumericRange;
})(data || (data = {}));
var data;
(function (data) {
    var SlideWindow = /** @class */ (function (_super) {
        __extends(SlideWindow, _super);
        function SlideWindow(index, src) {
            var _this = _super.call(this, src) || this;
            _this.index = index;
            return _this;
        }
        /**
         * 创建指定片段长度的滑窗对象
         *
         * @param winSize 滑窗片段的长度
         * @param step 滑窗的步进长度，默认是一个步进
        */
        SlideWindow.Split = function (src, winSize, step) {
            if (step === void 0) { step = 1; }
            if (!Array.isArray(src)) {
                src = src.ToArray();
            }
            var len = src.length - winSize;
            var windows = [];
            for (var i = 0; i < len; i += step) {
                var chunk = new Array(winSize);
                for (var j = 0; j < winSize; j++) {
                    chunk[j] = src[i + j];
                }
                windows.push(new SlideWindow(i, chunk));
            }
            return new IEnumerator(windows);
        };
        return SlideWindow;
    }(IEnumerator));
    data.SlideWindow = SlideWindow;
})(data || (data = {}));
var StringBuilder = /** @class */ (function () {
    function StringBuilder(str, newLine) {
        if (str === void 0) { str = null; }
        if (newLine === void 0) { newLine = "\n"; }
        if (!str) {
            this.buffer = "";
        }
        else if (typeof str == "string") {
            this.buffer = "" + str;
        }
        else {
            this.buffer = "" + str.buffer;
        }
        this.newLine = newLine;
    }
    Object.defineProperty(StringBuilder.prototype, "Length", {
        get: function () {
            return this.buffer.length;
        },
        enumerable: true,
        configurable: true
    });
    StringBuilder.prototype.Append = function (text) {
        this.buffer = this.buffer + text;
        return this;
    };
    StringBuilder.prototype.AppendLine = function (text) {
        return this.Append(text + this.newLine);
    };
    StringBuilder.prototype.toString = function () {
        return this.buffer + "";
    };
    return StringBuilder;
}());
var TsLinq;
(function (TsLinq) {
    /**
     * 性能计数器
    */
    var Benchmark = /** @class */ (function () {
        function Benchmark() {
            this.start = (new Date).getTime();
            this.lastCheck = this.start;
        }
        Benchmark.prototype.Tick = function () {
            var now = (new Date).getTime();
            var checkpoint = new CheckPoint();
            checkpoint.start = this.start;
            checkpoint.time = now;
            checkpoint.sinceFromStart = now - this.start;
            checkpoint.sinceLastCheck = now - this.lastCheck;
            this.lastCheck = now;
            return checkpoint;
        };
        return Benchmark;
    }());
    TsLinq.Benchmark = Benchmark;
    /**
     * 单位都是毫秒
    */
    var CheckPoint = /** @class */ (function () {
        function CheckPoint() {
        }
        Object.defineProperty(CheckPoint.prototype, "elapsedMilisecond", {
            /**
             * 获取从``time``到当前时间所流逝的毫秒计数
            */
            get: function () {
                return (new Date).getTime() - this.time;
            },
            enumerable: true,
            configurable: true
        });
        return CheckPoint;
    }());
    TsLinq.CheckPoint = CheckPoint;
})(TsLinq || (TsLinq = {}));
var CanvasHelper;
(function (CanvasHelper) {
    var innerCanvas;
    /**
     * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
     *
     * @param {String} text The text to be rendered.
     * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
     *
     * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
     *
     */
    function getTextWidth(text, font) {
        // re-use canvas object for better performance
        var canvas = innerCanvas || (innerCanvas = $ts("<canvas>"));
        var context = canvas.getContext("2d");
        var metrics;
        context.font = font;
        metrics = context.measureText(text);
        return metrics.width;
    }
    CanvasHelper.getTextWidth = getTextWidth;
    var fontSize = /** @class */ (function () {
        function fontSize() {
            this.sizes = [];
        }
        return fontSize;
    }());
    CanvasHelper.fontSize = fontSize;
})(CanvasHelper || (CanvasHelper = {}));
var HttpHelpers;
(function (HttpHelpers) {
    /**
     * 这个函数只会返回200成功代码的响应内容，对于其他的状态代码都会返回null
     * (这个函数是同步方式的)
    */
    function GET(url) {
        var request = new XMLHttpRequest();
        // `false` makes the request synchronous
        request.open('GET', url, false);
        request.send(null);
        if (request.status === 200) {
            return request.responseText;
        }
        else {
            return null;
        }
    }
    HttpHelpers.GET = GET;
    /**
     * 使用异步调用的方式进行数据的下载操作
    */
    function GetAsyn(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.onreadystatechange = function () {
            if (http.readyState == 4) {
                callback(http.responseText, http.status);
            }
        };
        http.send(null);
    }
    HttpHelpers.GetAsyn = GetAsyn;
    function POST(url, postData, callback) {
        var http = new XMLHttpRequest();
        var data = postData.data;
        http.open('POST', url, true);
        // Send the proper header information along with the request
        http.setRequestHeader('Content-type', postData.type);
        // Call a function when the state changes.
        http.onreadystatechange = function () {
            if (http.readyState == 4) {
                callback(http.responseText, http.status);
            }
        };
        http.send(data);
    }
    HttpHelpers.POST = POST;
    /**
     * 使用multipart form类型的数据进行文件数据的上传操作
     *
     * @param url 函数会通过POST方式将文件数据上传到这个url所指定的服务器资源位置
     *
    */
    function UploadFile(url, postData, callback) {
        var data = new FormData();
        data.append("File", postData.data);
        HttpHelpers.POST(url, {
            type: postData.type,
            data: data
        }, callback);
    }
    HttpHelpers.UploadFile = UploadFile;
    var PostData = /** @class */ (function () {
        function PostData() {
        }
        PostData.prototype.toString = function () {
            return this.type;
        };
        return PostData;
    }());
    HttpHelpers.PostData = PostData;
})(HttpHelpers || (HttpHelpers = {}));
/**
 * 序列之中的元素下标的操作方法集合
*/
var Which;
(function (Which) {
    /**
     * 查找出所给定的逻辑值集合之中的所有true的下标值
    */
    function Is(booleans) {
        if (Array.isArray(booleans)) {
            booleans = new IEnumerator(booleans);
        }
        return booleans
            .Select(function (flag, i) {
            return {
                flag: flag, index: i
            };
        })
            .Where(function (t) { return t.flag; })
            .Select(function (t) { return t.index; });
    }
    Which.Is = Is;
    /**
     * 默认的通用类型的比较器对象
    */
    var DefaultCompares = /** @class */ (function () {
        function DefaultCompares() {
            /**
             * 一个用于比较通用类型的数值转换器对象
            */
            this.as_numeric = null;
        }
        DefaultCompares.prototype.compares = function (a, b) {
            if (!this.as_numeric) {
                this.as_numeric = DataExtensions.AsNumeric(a);
                if (!this.as_numeric) {
                    this.as_numeric = DataExtensions.AsNumeric(b);
                }
            }
            if (!this.as_numeric) {
                // a 和 b 都是null或者undefined
                // 认为这两个空值是相等的
                // 则this.as_numeric会在下一个循环之中被赋值
                return 0;
            }
            else {
                return this.as_numeric(a) - this.as_numeric(b);
            }
        };
        DefaultCompares.default = function () {
            return new DefaultCompares().compares;
        };
        return DefaultCompares;
    }());
    Which.DefaultCompares = DefaultCompares;
    /**
     * 查找出序列之中最大的元素的序列下标编号
     *
     * @param x 所给定的数据序列
     * @param compare 默认是将x序列之中的元素转换为数值进行大小的比较的
    */
    function Max(x, compare) {
        if (compare === void 0) { compare = DefaultCompares.default(); }
        var xMax = null;
        var iMax = 0;
        for (var i = 0; i < x.Count; i++) {
            if (compare(x.ElementAt(i), xMax) > 0) {
                // x > xMax
                xMax = x.ElementAt(i);
                iMax = i;
            }
        }
        return iMax;
    }
    Which.Max = Max;
    /**
     * 查找出序列之中最小的元素的序列下标编号
     *
     * @param x 所给定的数据序列
     * @param compare 默认是将x序列之中的元素转换为数值进行大小的比较的
    */
    function Min(x, compare) {
        if (compare === void 0) { compare = DefaultCompares.default(); }
        return Max(x, function (a, b) { return -compare(a, b); });
    }
    Which.Min = Min;
})(Which || (Which = {}));
/**
 * Binary tree implements
*/
var algorithm;
(function (algorithm) {
    var BTree;
    (function (BTree) {
        /**
         * 用于进行数据分组所需要的最基础的二叉树数据结构
        */
        var binaryTree = /** @class */ (function () {
            /**
             * 构建一个二叉树对象
             *
             * @param comparer 这个函数指针描述了如何进行两个对象之间的比较操作，如果这个函数参数使用默认值的话
             *                 则只能够针对最基本的数值，逻辑变量进行操作
            */
            function binaryTree(comparer) {
                if (comparer === void 0) { comparer = function (a, b) {
                    var x = DataExtensions.as_numeric(a);
                    var y = DataExtensions.as_numeric(b);
                    return x - y;
                }; }
                this.compares = comparer;
            }
            /**
             * 向这个二叉树对象之中添加一个子节点
            */
            binaryTree.prototype.add = function (term, value) {
                if (value === void 0) { value = null; }
                var np = this.root;
                var cmp = 0;
                if (!np) {
                    // 根节点是空的，则将当前的term作为根节点
                    this.root = new BTree.node(term, value);
                    return;
                }
                while (np) {
                    cmp = this.compares(term, np.key);
                    if (cmp == 0) {
                        // this node is existed
                        // value replace??
                        np.value = value;
                        break;
                    }
                    else if (cmp < 0) {
                        if (np.left) {
                            np = np.left;
                        }
                        else {
                            // np is a leaf node?
                            // add at here
                            np.left = new BTree.node(term, value);
                            break;
                        }
                    }
                    else {
                        if (np.right) {
                            np = np.right;
                        }
                        else {
                            np.right = new BTree.node(term, value);
                            break;
                        }
                    }
                }
            };
            /**
             * 根据key值查找一个节点，然后获取该节点之中与key所对应的值
             *
             * @returns 如果这个函数返回空值，则表示可能未找到目标子节点
            */
            binaryTree.prototype.find = function (term) {
                var np = this.root;
                var cmp = 0;
                while (np) {
                    cmp = this.compares(term, np.key);
                    if (cmp == 0) {
                        return np.value;
                    }
                    else if (cmp < 0) {
                        np = np.left;
                    }
                    else {
                        np = np.right;
                    }
                }
                // not exists
                return null;
            };
            /**
             * 将这个二叉树对象转换为一个节点的数组
            */
            binaryTree.prototype.ToArray = function () {
                return BTree.binaryTreeExtensions.populateNodes(this.root);
            };
            /**
             * 将这个二叉树对象转换为一个Linq查询表达式所需要的枚举器类型
            */
            binaryTree.prototype.AsEnumerable = function () {
                return new IEnumerator(this.ToArray());
            };
            return binaryTree;
        }());
        BTree.binaryTree = binaryTree;
    })(BTree = algorithm.BTree || (algorithm.BTree = {}));
})(algorithm || (algorithm = {}));
var algorithm;
(function (algorithm) {
    var BTree;
    (function (BTree) {
        /**
         * data extension module for binary tree nodes data sequence
        */
        var binaryTreeExtensions;
        (function (binaryTreeExtensions) {
            /**
             * Convert a binary tree object as a node array.
            */
            function populateNodes(tree) {
                var out = [];
                visitInternal(tree, out);
                return out;
            }
            binaryTreeExtensions.populateNodes = populateNodes;
            function visitInternal(tree, out) {
                out.push(tree);
                if (tree.left) {
                    visitInternal(tree.left, out);
                }
                if (tree.right) {
                    visitInternal(tree.right, out);
                }
            }
        })(binaryTreeExtensions = BTree.binaryTreeExtensions || (BTree.binaryTreeExtensions = {}));
    })(BTree = algorithm.BTree || (algorithm.BTree = {}));
})(algorithm || (algorithm = {}));
var algorithm;
(function (algorithm) {
    var BTree;
    (function (BTree) {
        /**
         * A binary tree node.
        */
        var node = /** @class */ (function () {
            function node(key, value, left, right) {
                if (value === void 0) { value = null; }
                if (left === void 0) { left = null; }
                if (right === void 0) { right = null; }
                this.key = key;
                this.left = left;
                this.right = right;
                this.value = value;
            }
            node.prototype.toString = function () {
                return this.key.toString();
            };
            return node;
        }());
        BTree.node = node;
    })(BTree = algorithm.BTree || (algorithm.BTree = {}));
})(algorithm || (algorithm = {}));
var TsLinq;
(function (TsLinq) {
    var StackFrame = /** @class */ (function () {
        function StackFrame() {
        }
        StackFrame.prototype.toString = function () {
            return this.caller + " [as " + this.memberName + "](" + this.file + ":" + this.line + ":" + this.column + ")";
        };
        StackFrame.Parse = function (line) {
            var frame = new StackFrame();
            var file = StackFrame.getFileName(line);
            var caller = line.replace(file, "").trim().substr(3);
            file = file.substr(1, file.length - 2);
            if (caller.indexOf("/") > -1 || caller.indexOf(":") > -1) {
                // 没有替换成功，任然是一个文件路径，则可能
                // 是html文档之中的一个最开始的函数调用
                // 是没有caller的
                caller = "<HTML\\Document>";
            }
            var position = $ts(file.match(/([:]\d+){2}$/m)[0].split(":"));
            var posStrLen = (position.Select(function (s) { return s.length; }).Sum() + 2);
            var location = From(position)
                .Where(function (s) { return s.length > 0; })
                .Select(function (x) { return Strings.Val(x); })
                .ToArray();
            frame.file = file.substr(0, file.length - posStrLen);
            var alias = caller.match(/\[.+\]/);
            var memberName = (!alias || alias.length == 0) ? null : alias[0];
            if (memberName) {
                caller = caller
                    .substr(0, caller.length - memberName.length)
                    .trim();
                frame.memberName = memberName
                    .substr(3, memberName.length - 4)
                    .trim();
            }
            else {
                var t = caller.split(".");
                frame.memberName = t[t.length - 1];
            }
            frame.caller = caller;
            frame.line = location[0];
            frame.column = location[1];
            return frame;
        };
        StackFrame.getFileName = function (line) {
            var matches = line.match(/\(.+\)/);
            if (!matches || matches.length == 0) {
                // 2018-09-14 可能是html文件之中
                return "(" + line.substr(6).trim() + ")";
            }
            else {
                return matches[0];
            }
        };
        return StackFrame;
    }());
    TsLinq.StackFrame = StackFrame;
})(TsLinq || (TsLinq = {}));
var TsLinq;
(function (TsLinq) {
    var StackTrace = /** @class */ (function (_super) {
        __extends(StackTrace, _super);
        function StackTrace(frames) {
            return _super.call(this, frames) || this;
        }
        StackTrace.Dump = function () {
            var err = new Error().stack.split("\n");
            var trace = From(err)
                //   1 是第一行 err 字符串, 
                // + 1 是跳过当前的这个Dump函数的栈信息
                .Skip(1 + 1)
                .Select(TsLinq.StackFrame.Parse);
            return new StackTrace(trace);
        };
        StackTrace.GetCallerMember = function () {
            var trace = StackTrace.Dump().ToArray();
            // index = 1 是GetCallerMemberName这个函数的caller的栈片段
            // index = 2 就是caller的caller的栈片段，即该caller的CallerMemberName
            var caller = trace[1 + 1];
            return caller;
        };
        StackTrace.prototype.toString = function () {
            var sb = new StringBuilder();
            this.ForEach(function (frame) {
                sb.AppendLine("  at " + frame.toString());
            });
            return sb.toString();
        };
        return StackTrace;
    }(IEnumerator));
    TsLinq.StackTrace = StackTrace;
})(TsLinq || (TsLinq = {}));
/// <reference path="../../Data/StackTrace/StackTrace.ts" />
/**
 * 键值对映射哈希表
*/
var Dictionary = /** @class */ (function (_super) {
    __extends(Dictionary, _super);
    /**
     * 将目标对象转换为一个类型约束的映射序列集合
    */
    function Dictionary(maps) {
        var _this = _super.call(this, Dictionary.ObjectMaps(maps)) || this;
        if (Array.isArray(maps)) {
            _this.maps = TypeInfo.CreateObject(maps);
        }
        else if (TypeInfo.typeof(maps).class == "IEnumerator") {
            _this.maps = TypeInfo.CreateObject(maps);
        }
        else {
            _this.maps = maps;
        }
        return _this;
    }
    /**
     * 如果键名称是空值的话，那么这个函数会自动使用caller的函数名称作为键名进行值的获取
     *
     * https://stackoverflow.com/questions/280389/how-do-you-find-out-the-caller-function-in-javascript
     *
     * @param key 键名或者序列的索引号
    */
    Dictionary.prototype.Item = function (key) {
        if (key === void 0) { key = null; }
        if (!key) {
            key = TsLinq.StackTrace.GetCallerMember().memberName;
        }
        if (typeof key == "string") {
            return (this.maps[key]);
        }
        else {
            return this.sequence[key].value;
        }
    };
    Object.defineProperty(Dictionary.prototype, "Keys", {
        /**
         * 获取这个字典对象之中的所有的键名
        */
        get: function () {
            return From(Object.keys(this.maps));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "Values", {
        /**
         * 获取这个字典对象之中的所有的键值
        */
        get: function () {
            var _this = this;
            return this.Keys.Select(function (key) { return _this.Item(key); });
        },
        enumerable: true,
        configurable: true
    });
    Dictionary.FromMaps = function (maps) {
        return new Dictionary(maps);
    };
    /**
     * 将目标对象转换为一个类型约束的映射序列集合
    */
    Dictionary.ObjectMaps = function (maps) {
        var type = TypeInfo.typeof(maps);
        if (Array.isArray(maps)) {
            return maps;
        }
        else if (type.class == "IEnumerator") {
            return maps.ToArray();
        }
        else {
            return From(Object.keys(maps))
                .Select(function (key) { return new Map(key, maps[key]); })
                .ToArray();
        }
    };
    /**
     * 查看这个字典集合之中是否存在所给定的键名
    */
    Dictionary.prototype.ContainsKey = function (key) {
        return key in this.maps;
    };
    /**
     * 向这个字典对象之中添加一个键值对，请注意，如果key已经存在这个字典对象中了，这个函数会自动覆盖掉key所对应的原来的值
    */
    Dictionary.prototype.Add = function (key, value) {
        this.maps[key] = value;
        this.sequence = Dictionary.ObjectMaps(this.maps);
        return this;
    };
    /**
     * 删除一个给定键名所指定的键值对
    */
    Dictionary.prototype.Delete = function (key) {
        if (key in this.maps) {
            delete this.maps[key];
            this.sequence = Dictionary.ObjectMaps(this.maps);
        }
        return this;
    };
    return Dictionary;
}(IEnumerator));
/// <reference path="Enumerator.ts" />
/**
 * The linq pipline implements at here. (在这个模块之中实现具体的数据序列算法)
*/
var Enumerable;
(function (Enumerable) {
    /**
     * 进行数据序列的投影操作
     *
    */
    function Select(source, project) {
        var projections = [];
        source.forEach(function (o, i) {
            projections.push(project(o, i));
        });
        return new IEnumerator(projections);
    }
    Enumerable.Select = Select;
    /**
     * 进行数据序列的排序操作
     *
    */
    function OrderBy(source, key) {
        // array clone
        var clone = source.slice();
        clone.sort(function (a, b) {
            // a - b
            return key(a) - key(b);
        });
        console.log("clone");
        console.log(clone);
        return new IEnumerator(clone);
    }
    Enumerable.OrderBy = OrderBy;
    function OrderByDescending(source, key) {
        return Enumerable.OrderBy(source, function (e) {
            // b - a
            return -key(e);
        });
    }
    Enumerable.OrderByDescending = OrderByDescending;
    function Take(source, n) {
        var takes = [];
        for (var i = 0; i < n - 1; i++) {
            if (i == source.length) {
                break;
            }
            else {
                takes.push(source[i]);
            }
        }
        return new IEnumerator(takes);
    }
    Enumerable.Take = Take;
    function Skip(source, n) {
        var takes = [];
        if (n >= source.length) {
            return new IEnumerator([]);
        }
        for (var i = n; i < source.length; i++) {
            takes.push(source[i]);
        }
        return new IEnumerator(takes);
    }
    Enumerable.Skip = Skip;
    function TakeWhile(source, predicate) {
        var takes = [];
        for (var i = 0; i < source.length; i++) {
            if (predicate(source[i])) {
                takes.push(source[i]);
            }
            else {
                break;
            }
        }
        return new IEnumerator(takes);
    }
    Enumerable.TakeWhile = TakeWhile;
    function Where(source, predicate) {
        var takes = [];
        source.forEach(function (o) {
            if (predicate(o)) {
                takes.push(o);
            }
        });
        return new IEnumerator(takes);
    }
    Enumerable.Where = Where;
    function SkipWhile(source, predicate) {
        for (var i = 0; i < source.length; i++) {
            if (predicate(source[i])) {
                // skip
            }
            else {
                // end skip
                return Enumerable.Skip(source, i);
            }
        }
        // skip all
        return new IEnumerator([]);
    }
    Enumerable.SkipWhile = SkipWhile;
    function All(source, predicate) {
        for (var i = 0; i < source.length; i++) {
            if (!predicate(source[i])) {
                return false;
            }
        }
        return true;
    }
    Enumerable.All = All;
    function Any(source, predicate) {
        for (var i = 0; i < source.length; i++) {
            if (predicate(source[i])) {
                return true;
            }
        }
        return false;
    }
    Enumerable.Any = Any;
    /**
     * Implements a ``group by`` operation by binary tree data structure.
    */
    function GroupBy(source, getKey, compares) {
        var tree = new algorithm.BTree.binaryTree(compares);
        source.forEach(function (obj) {
            var key = getKey(obj);
            var list = tree.find(key);
            if (list) {
                list.push(obj);
            }
            else {
                tree.add(key, [obj]);
            }
        });
        console.log(tree);
        return tree.AsEnumerable().Select(function (node) {
            return new Group(node.key, node.value);
        });
    }
    Enumerable.GroupBy = GroupBy;
})(Enumerable || (Enumerable = {}));
/**
 * 按照某一个键值进行分组的集合对象
*/
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(key, group) {
        var _this = _super.call(this, group) || this;
        _this.Key = key;
        return _this;
    }
    Object.defineProperty(Group.prototype, "Group", {
        /**
         * Group members, readonly property.
        */
        get: function () {
            return this.sequence;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 创建一个键值对映射序列，这些映射都具有相同的键名
    */
    Group.prototype.ToMaps = function () {
        var _this = this;
        return From(this.sequence)
            .Select(function (x) { return new Map(_this.Key, x); })
            .ToArray();
    };
    return Group;
}(IEnumerator));
/**
 * 表示一个动态列表对象
*/
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(src) {
        if (src === void 0) { src = null; }
        return _super.call(this, src || []) || this;
    }
    /**
     * 可以使用这个方法进行静态代码的链式添加
    */
    List.prototype.Add = function (x) {
        this.sequence.push(x);
        return this;
    };
    /**
     * 批量的添加
    */
    List.prototype.AddRange = function (x) {
        var _this = this;
        if (Array.isArray(x)) {
            x.forEach(function (o) { return _this.sequence.push(o); });
        }
        else {
            x.ForEach(function (o) { return _this.sequence.push(o); });
        }
        return this;
    };
    /**
     * 查找给定的元素在当前的这个列表之中的位置，不存在则返回-1
    */
    List.prototype.IndexOf = function (x) {
        return this.sequence.indexOf(x);
    };
    /**
     * 返回列表之中的第一个元素，然后删除第一个元素，剩余元素整体向前平移一个单位
    */
    List.prototype.Pop = function () {
        var x1 = this.First;
        this.sequence = this.sequence.slice(1);
        return x1;
    };
    return List;
}(IEnumerator));
/**
 * 描述了一个键值对集合
*/
var Map = /** @class */ (function () {
    /**
     * 创建一个新的键值对集合
     *
    */
    function Map(key, value) {
        if (key === void 0) { key = null; }
        if (value === void 0) { value = null; }
        this.key = key;
        this.value = value;
    }
    Map.prototype.toString = function () {
        return "[" + this.key.toString() + ", " + this.value.toString() + "]";
    };
    return Map;
}());
/**
 * 描述了一个带有名字属性的变量值
*/
var NamedValue = /** @class */ (function () {
    function NamedValue(name, val) {
        if (name === void 0) { name = null; }
        if (val === void 0) { val = null; }
        this.name = name;
        this.value = val;
    }
    Object.defineProperty(NamedValue.prototype, "TypeOfValue", {
        /**
         * 获取得到变量值的类型定义信息
        */
        get: function () {
            return TypeInfo.typeof(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NamedValue.prototype, "IsEmpty", {
        /**
         * 这个之对象是否是空的？
        */
        get: function () {
            return Strings.Empty(this.name) && (!this.value || this.value == undefined);
        },
        enumerable: true,
        configurable: true
    });
    NamedValue.prototype.toString = function () {
        return this.name;
    };
    return NamedValue;
}());
/**
 * HTML文档操作帮助函数
*/
var Linq;
(function (Linq) {
    var DOM;
    (function (DOM) {
        /**
         * 向指定id编号的div添加select标签的组件
        */
        function AddSelectOptions(items, div, selectName, className) {
            if (className === void 0) { className = ""; }
            var options = From(items)
                .Select(function (item) { return "<option value=\"" + item.value + "\">" + item.key + "</option>"; })
                .JoinBy("\n");
            var html = "\n            <select class=\"" + className + "\" multiple name=\"" + selectName + "\">\n                " + options + "\n            </select>";
            $ts("#" + div).innerHTML = html;
        }
        DOM.AddSelectOptions = AddSelectOptions;
        /**
         * 向给定编号的div对象之中添加一个表格对象
         *
         * @param headers 表头
         * @param div 新生成的table将会被添加在这个div之中
         * @param attrs ``<table>``的属性值，包括id，class等
        */
        function AddHTMLTable(rows, headers, div, attrs) {
            if (attrs === void 0) { attrs = null; }
            var thead = $ts("<thead>");
            var tbody = $ts("<tbody>");
            var table = $ts("<table>");
            if (attrs) {
                if (attrs.id) {
                    table.id = attrs.id;
                }
                if (!IsNullOrEmpty(attrs.classList)) {
                    attrs.classList.forEach(function (c) { return table.classList.add(c); });
                }
                if (!IsNullOrEmpty(attrs.attrs)) {
                    From(attrs.attrs)
                        .Where(function (a) { return a.name != "id" && a.name != "class"; })
                        .ForEach(function (a) {
                        table.setAttribute(a.name, a.value);
                    });
                }
            }
            var fields = headerMaps(headers);
            rows.forEach(function (r) {
                var tr = $ts("<tr>");
                fields.forEach(function (m) {
                    var td = $ts("<td>");
                    td.innerHTML = r[m.key];
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            fields.forEach(function (r) {
                var th = $ts("th");
                th.innerHTML = r.value;
                thead.appendChild(th);
            });
            table.appendChild(thead);
            table.appendChild(tbody);
            $ts(div).appendChild(table);
        }
        DOM.AddHTMLTable = AddHTMLTable;
        function headerMaps(headers) {
            var type = TypeInfo.typeof(headers);
            if (type.IsArrayOf("string")) {
                return From(headers)
                    .Select(function (h) { return new Map(h, h); })
                    .ToArray();
            }
            else if (type.IsArrayOf("Map")) {
                return headers;
            }
            else if (type.IsEnumerator && typeof headers[0] == "string") {
                return headers
                    .Select(function (h) { return new Map(h, h); })
                    .ToArray();
            }
            else if (type.IsEnumerator && TypeInfo.typeof(headers[0]).class == "Map") {
                return headers.ToArray();
            }
            else {
                throw "Invalid sequence type: " + type.class;
            }
        }
        /**
         * Execute a given function when the document is ready.
         *
         * @param fn A function that without any parameters
        */
        function ready(fn) {
            if (typeof fn !== 'function') {
                // Sanity check
                return;
            }
            if (document.readyState === 'complete') {
                // If document is already loaded, run method
                return fn();
            }
            else {
                // Otherwise, wait until document is loaded
                document.addEventListener('DOMContentLoaded', fn, false);
            }
        }
        DOM.ready = ready;
        /**
         * 向一个给定的HTML元素或者HTML元素的集合之中的对象添加给定的事件
         *
         * @param el HTML节点元素或者节点元素的集合
         * @param type 事件的名称字符串
         * @param fn 对事件名称所指定的事件进行处理的工作函数，这个工作函数应该具备有一个事件对象作为函数参数
        */
        function addEvent(el, type, fn) {
            if (document.addEventListener) {
                if (el && (el.nodeName) || el === window) {
                    el.addEventListener(type, fn, false);
                }
                else if (el && el.length) {
                    for (var i = 0; i < el.length; i++) {
                        addEvent(el[i], type, fn);
                    }
                }
            }
            else {
                if (el && el.nodeName || el === window) {
                    el.attachEvent('on' + type, function () {
                        return fn.call(el, window.event);
                    });
                }
                else if (el && el.length) {
                    for (var i = 0; i < el.length; i++) {
                        addEvent(el[i], type, fn);
                    }
                }
            }
        }
        DOM.addEvent = addEvent;
    })(DOM = Linq.DOM || (Linq.DOM = {}));
})(Linq || (Linq = {}));
var Linq;
(function (Linq) {
    var DOM;
    (function (DOM) {
        // /**
        //  * Creates an instance of the element for the specified tag.
        //  * @param tagName The name of an element.
        // */
        // createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options ?: ElementCreationOptions): HTMLElementTagNameMap[K];
        var DOMEnumerator = /** @class */ (function (_super) {
            __extends(DOMEnumerator, _super);
            function DOMEnumerator(elements) {
                return _super.call(this, DOMEnumerator.ensureElements(elements)) || this;
            }
            DOMEnumerator.ensureElements = function (elements) {
                var type = TypeInfo.typeof(elements);
                if (type.typeOf == "array") {
                    return elements;
                }
                else if (type.IsEnumerator) {
                    return elements.ToArray();
                }
                else {
                    var list = [];
                    elements.forEach(function (x) { return list.push(x); });
                    return list;
                }
            };
            /**
             * @param value 如果需要批量清除节点之中的值的话，需要传递一个空字符串，而非空值
            */
            DOMEnumerator.prototype.val = function (value) {
                if (value === void 0) { value = null; }
                if (!(value == null && value == undefined)) {
                    if (typeof value == "string") {
                        // 所有元素都设置同一个值
                        this.ForEach(function (element) {
                            element.nodeValue = value;
                        });
                    }
                    else if (Array.isArray(value)) {
                        this.ForEach(function (element, i) {
                            element.nodeValue = value[i];
                        });
                    }
                    else {
                        this.ForEach(function (element, i) {
                            element.nodeValue = value.ElementAt(i);
                        });
                    }
                }
                return this.Select(function (element) { return element.nodeValue; });
            };
            DOMEnumerator.prototype.AddClass = function (className) {
                this.ForEach(function (x) {
                    if (!x.classList.contains(className)) {
                        x.classList.add(className);
                    }
                });
                return this;
            };
            DOMEnumerator.prototype.AddEvent = function (eventName, handler) {
                Linq.DOM.addEvent(this.ToArray(), eventName, handler);
            };
            DOMEnumerator.prototype.onChange = function (handler) {
                this.AddEvent("onchange", handler);
            };
            DOMEnumerator.prototype.RemoveClass = function (className) {
                this.ForEach(function (x) {
                    if (x.classList.contains(className)) {
                        x.classList.remove(className);
                    }
                });
                return this;
            };
            DOMEnumerator.prototype.hide = function () {
                this.ForEach(function (x) { return x.style.display = "none"; });
                return this;
            };
            DOMEnumerator.prototype.show = function () {
                this.ForEach(function (x) { return x.style.display = "block"; });
                return this;
            };
            /**
             * 将所选定的节点批量删除
            */
            DOMEnumerator.prototype.Delete = function () {
                this.ForEach(function (x) { return x.parentNode.removeChild(x); });
            };
            return DOMEnumerator;
        }(IEnumerator));
        DOM.DOMEnumerator = DOMEnumerator;
    })(DOM = Linq.DOM || (Linq.DOM = {}));
})(Linq || (Linq = {}));
var Linq;
(function (Linq) {
    var DOM;
    (function (DOM) {
        /**
         * HTML文档节点的查询类型
        */
        var QueryTypes;
        (function (QueryTypes) {
            QueryTypes[QueryTypes["NoQuery"] = 0] = "NoQuery";
            /**
             * 表达式为 #xxx
             * 按照节点的id编号进行查询
             *
             * ``<tag id="xxx">``
            */
            QueryTypes[QueryTypes["id"] = 1] = "id";
            /**
             * 表达式为 .xxx
             * 按照节点的class名称进行查询
             *
             * ``<tag class="xxx">``
            */
            QueryTypes[QueryTypes["class"] = 10] = "class";
            /**
             * 表达式为 xxx
             * 按照节点的名称进行查询
             *
             * ``<xxx ...>``
            */
            QueryTypes[QueryTypes["tagName"] = -100] = "tagName";
        })(QueryTypes = DOM.QueryTypes || (DOM.QueryTypes = {}));
        var Query = /** @class */ (function () {
            function Query() {
            }
            Query.parseQuery = function (expr) {
                var isSingle = false;
                if (expr.charAt(0) == "&") {
                    isSingle = true;
                    expr = expr.substr(1);
                }
                else {
                    isSingle = false;
                }
                return Query.parseExpression(expr, isSingle);
            };
            /**
             * by node id
            */
            Query.getById = function (id) {
                return {
                    type: QueryTypes.id,
                    singleNode: true,
                    expression: id
                };
            };
            /**
             * by class name
            */
            Query.getByClass = function (className, isSingle) {
                return {
                    type: QueryTypes.class,
                    singleNode: isSingle,
                    expression: className
                };
            };
            /**
             * by tag name
            */
            Query.getByTag = function (tag, isSingle) {
                return {
                    type: QueryTypes.tagName,
                    singleNode: isSingle,
                    expression: tag
                };
            };
            /**
             * create new node
            */
            Query.createElement = function (expr) {
                return {
                    type: QueryTypes.NoQuery,
                    singleNode: true,
                    expression: expr
                };
            };
            Query.isSelectorQuery = function (expr) {
                var hasMultiple = expr.indexOf(" ") > -1;
                var isNodeCreate = expr.charAt(0) == "<" && expr.charAt(expr.length - 1) == ">";
                return hasMultiple && !isNodeCreate;
            };
            Query.parseExpression = function (expr, isSingle) {
                var prefix = expr.charAt(0);
                if (Query.isSelectorQuery(expr)) {
                    // 可能是复杂查询表达式
                    return {
                        type: QueryTypes.tagName,
                        singleNode: isSingle,
                        expression: expr
                    };
                }
                switch (prefix) {
                    case "#": return this.getById(expr.substr(1));
                    case ".": return this.getByClass(expr, isSingle);
                    case "<": return this.createElement(expr);
                    default: return this.getByTag(expr, isSingle);
                }
            };
            return Query;
        }());
        DOM.Query = Query;
    })(DOM = Linq.DOM || (Linq.DOM = {}));
})(Linq || (Linq = {}));
var Linq;
(function (Linq) {
    var DOM;
    (function (DOM) {
        var node = /** @class */ (function () {
            function node() {
            }
            node.FromNode = function (htmlNode) {
                var n = new node();
                n.tagName = htmlNode.tagName;
                n.id = htmlNode.id;
                n.classList = this.tokenList(htmlNode.classList);
                n.attrs = this.nameValueMaps(htmlNode.attributes);
                return n;
            };
            node.tokenList = function (tokens) {
                var list = [];
                for (var i = 0; i < tokens.length; i++) {
                    list.push(tokens.item(i));
                }
                return list;
            };
            node.nameValueMaps = function (attrs) {
                var list = [];
                var attr;
                var map;
                for (var i = 0; i < attrs.length; i++) {
                    attr = attrs.item(i);
                    map = new NamedValue(attr.name, attr.value);
                    list.push(map);
                }
                return list;
            };
            return node;
        }());
        DOM.node = node;
    })(DOM = Linq.DOM || (Linq.DOM = {}));
})(Linq || (Linq = {}));
var Linq;
(function (Linq) {
    var DOM;
    (function (DOM) {
        DOM.attrs = /\S+\s*[=]\s*((["].*["])|(['].*[']))/g;
        function ParseNodeDeclare(expr) {
            // <a href="..." onclick="...">
            var declare = expr
                .substr(1, expr.length - 2)
                .trim();
            var tagValue = Strings.GetTagValue(declare, " ");
            var tag = tagValue.name;
            var attrs = [];
            if (tagValue.value.length > 0) {
                // 使用正则表达式进行解析
                attrs = From(tagValue.value.match(DOM.attrs))
                    .Where(function (s) { return s.length > 0; })
                    .Select(function (s) {
                    var attr = Strings.GetTagValue(s, "=");
                    var val = attr.value.trim();
                    val = val.substr(1, val.length - 2);
                    return new NamedValue(attr.name, val);
                }).ToArray();
            }
            return {
                tag: tag, attrs: attrs
            };
        }
        DOM.ParseNodeDeclare = ParseNodeDeclare;
    })(DOM = Linq.DOM || (Linq.DOM = {}));
})(Linq || (Linq = {}));
//# sourceMappingURL=linq.js.map