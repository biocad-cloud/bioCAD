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
/**
 * Provides a set of static (Shared in Visual Basic) methods for querying
 * objects that implement ``System.Collections.Generic.IEnumerable<T>``.
 *
 * (这个枚举器类型是构建出一个Linq查询表达式所必须的基础类型)
*/
var IEnumerator = /** @class */ (function () {
    //#endregion
    /**
     * 可以从一个数组或者枚举器构建出一个Linq序列
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
            return TypeInfo.typeof(this.First());
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
     * Get the first element in this sequence
    */
    IEnumerator.prototype.First = function () {
        return this.sequence[0];
    };
    /**
     * Get the last element in this sequence
    */
    IEnumerator.prototype.Last = function () {
        return this.sequence[this.Count - 1];
    };
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
    */
    IEnumerator.prototype.Where = function (predicate) {
        return Enumerable.Where(this.sequence, predicate);
    };
    /**
     * 求取这个序列集合的最小元素，使用这个函数要求序列之中的元素都必须能够被转换为数值
    */
    IEnumerator.prototype.Min = function (project) {
        if (project === void 0) { project = function (e) { return DataExtensions.as_numeric(e); }; }
        return Enumerable.OrderBy(this.sequence, project).First();
    };
    /**
     * 求取这个序列集合的最大元素，使用这个函数要求序列之中的元素都必须能够被转换为数值
    */
    IEnumerator.prototype.Max = function (project) {
        if (project === void 0) { project = function (e) { return DataExtensions.as_numeric(e); }; }
        return Enumerable.OrderByDescending(this.sequence, project).First();
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
    IEnumerator.prototype.Take = function (n) {
        return Enumerable.Take(this.sequence, n);
    };
    IEnumerator.prototype.Skip = function (n) {
        return Enumerable.Skip(this.sequence, n);
    };
    /**
     * Returns elements from a sequence as long as a specified condition is true.
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
            .Select(function (group) { return group.First(); });
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
    IEnumerator.prototype.Unlist = function () {
        var list = [];
        this.ForEach(function (a) {
            var array = a;
            array.forEach(function (x) { return list.push(x); });
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
    IEnumerator.prototype.ToList = function () {
        return new List(this.sequence);
    };
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
    IEnumerator.prototype.ToPointer = function () {
        return new Pointer(this);
    };
    IEnumerator.prototype.SlideWindows = function (winSize, step) {
        if (step === void 0) { step = 1; }
        return data.SlideWindow.Split(this, winSize, step);
    };
    return IEnumerator;
}());
/**
 * 通用数据拓展函数集合
*/
var DataExtensions;
(function (DataExtensions) {
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
        if (obj == null || obj == undefined) {
            return 0;
        }
        if (typeof obj === 'number') {
            return obj;
        }
        else if (typeof obj === 'boolean') {
            if (obj == true) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (typeof obj == 'undefined') {
            return 0;
        }
        else if (typeof obj == 'string') {
            if (obj == '') {
                // 将空字符串转换为零
                return 0;
            }
            else {
                return parseFloat(obj);
            }
        }
        else {
            return 0;
        }
    }
    DataExtensions.as_numeric = as_numeric;
})(DataExtensions || (DataExtensions = {}));
/// <reference path="Linq/Enumerator.ts" />
/// <reference path="Helpers/Extensions.ts" />
var $ = function (expr) {
};
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
/**
 * HTML/Javascript: how to access JSON data loaded in a script tag.
*/
function LoadJson(id) {
    return JSON.parse(document.getElementById(id).textContent);
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
    /**
     * 获取某一个对象的类型信息
    */
    TypeInfo.typeof = function (obj) {
        var type = typeof obj;
        var isObject = type == "object";
        return {
            TypeOf: typeof obj,
            class: isObject ? obj.constructor.name : "",
            property: isObject ? Object.keys(obj) : [],
            methods: TypeInfo.GetObjectMethods(obj)
        };
    };
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
        if (this.TypeOf == "object") {
            return "<" + this.TypeOf + "> " + this.class;
        }
        else {
            return this.TypeOf;
        }
    };
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
    return TypeInfo;
}());
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
        dataframe.prototype.buildDoc = function () {
            return this.Select(function (r) { return r.rowLine; }).JoinBy("\n");
        };
        dataframe.prototype.Objects = function () {
            var header = this.headers.ToArray();
            var objs = this.Skip(1).Select(function (r) {
                var o = {};
                r.ForEach(function (c, i) {
                    o[header[i]] = c;
                });
                return o;
            });
            return objs;
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
        dataframe.Load = function (url, callback) {
            if (callback === void 0) { callback = null; }
            if (callback == null || callback == undefined) {
                // 同步
                return dataframe.Parse(HttpHelpers.GET(url));
            }
            else {
                // 异步
                HttpHelpers.GetAsyn(url, function (text, code) {
                    if (code == 200) {
                        callback(dataframe.Parse(text));
                    }
                    else {
                        throw "Error while load csv data source, http " + code + ": " + text;
                    }
                });
            }
            return null;
        };
        dataframe.Parse = function (text) {
            return new dataframe(From(text.split(/\n/)).Select(csv.row.Parse));
        };
        return dataframe;
    }(IEnumerator));
    csv_1.dataframe = dataframe;
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
/// <reference path="../Linq/Pointer.ts" />
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
            var seq = From(numbers);
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
        NumericRange.prototype.PopulateNumbers = function (step) {
            if (step === void 0) { step = (this.Length / 10); }
            var data = [];
            for (var x = this.min; x < this.max; x += step) {
                data.push(x);
            }
            return data;
        };
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
var HttpHelpers;
(function (HttpHelpers) {
    /**
     * 这个函数只会返回200成功代码的响应内容，对于其他的状态代码都会返回null
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
var Strings;
(function (Strings) {
    /**
     * 判断给定的字符串是否是空值？
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
     * > https://jsperf.com/convert-string-to-char-code-array/9
     * 经过测试，使用数组push的效率最高
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
})(Strings || (Strings = {}));
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
 * 键值对映射哈希表
*/
var Dictionary = /** @class */ (function (_super) {
    __extends(Dictionary, _super);
    /**
     * 将目标对象转换为一个类型约束的映射序列集合
    */
    function Dictionary(maps) {
        var _this = _super.call(this, Dictionary.ObjectMaps(maps)) || this;
        _this.maps = maps;
        return _this;
    }
    Dictionary.prototype.Item = function (key) {
        return (this.maps[key]);
    };
    Object.defineProperty(Dictionary.prototype, "Keys", {
        get: function () {
            return From(Object.keys(this.maps));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "Values", {
        get: function () {
            var _this = this;
            return this.Keys.Select(function (key) { return _this.Item(key); });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 将目标对象转换为一个类型约束的映射序列集合
    */
    Dictionary.ObjectMaps = function (maps) {
        return From(Object.keys(maps))
            .Select(function (key) { return new Map(key, maps[key]); })
            .ToArray();
    };
    Dictionary.prototype.ContainsKey = function (key) {
        return key in this.maps;
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
        return Enumerable.Where(source, predicate);
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
        return Enumerable.Where(source, function (o) {
            return !predicate(o);
        });
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
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(src) {
        return _super.call(this, src) || this;
    }
    List.prototype.Add = function (x) {
        this.sequence.push(x);
        return this;
    };
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
    List.prototype.IndexOf = function (x) {
        return this.sequence.indexOf(x);
    };
    return List;
}(IEnumerator));
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
var Linq;
(function (Linq) {
    var DOM;
    (function (DOM) {
        function query(expr) {
            var type = expr.charAt(0);
            var nodes;
            if (type == ".") {
                nodes = document.getElementsByClassName(expr.substr(1));
            }
            else if (type == "#") {
                nodes = [document.getElementById(expr.substr(1))];
            }
            else {
                nodes = document.getElementsByTagName(expr);
            }
            var list = [];
            var len = nodes.length;
            for (var i = 0; i < len; i++) {
                list.push(nodes[i]);
            }
            return new IEnumerator(list);
        }
        DOM.query = query;
        /**
         *
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
//# sourceMappingURL=linq.js.map