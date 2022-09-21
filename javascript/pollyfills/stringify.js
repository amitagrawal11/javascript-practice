if (!window.NJSON) {
    window.NJSON = {
        parse: function (sJSON) { return eval('(' + sJSON + ')'); },
        stringify: (function () {
            var toString = Object.prototype.toString;
            var isArray = Array.isArray || function (a) { return toString.call(a) === '[object Array]'; };
            var escMap = { '"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t' };
            var escFunc = function (m) { return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1); };
            var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
            return function stringify(value) {
                if (value == null) {
                    return 'null';
                } else if (typeof value === 'number') {
                    return isFinite(value) ? value.toString() : 'null';
                } else if (typeof value === 'boolean') {
                    return value.toString();
                } else if (typeof value === 'object') {
                    if (typeof value.toJSON === 'function') {
                        return stringify(value.toJSON());
                    } else if (isArray(value)) {
                        var res = '[';
                        for (var i = 0; i < value.length; i++)
                            res += (i ? ', ' : '') + stringify(value[i]);
                        return res + ']';
                    } else if (toString.call(value) === '[object Object]') {
                        var tmp = [];
                        for (var k in value) {
                            if (value.hasOwnProperty(k))
                                tmp.push(stringify(k) + ': ' + stringify(value[k]));
                        }
                        return '{' + tmp.join(', ') + '}';
                    }
                }
                return '"' + value.toString().replace(escRE, escFunc) + '"';
            };
        })()
    };
}

/* Custom Enhanced Stringify function*/
function stringifyV2(value) {
    if (value === null) {
        return 'null';
    } else if (typeof value === 'number') {
        return isFinite(value) ? value.toString() : 'null';
    } else if (typeof value === 'string') {
        return value.toString();
    } else if (value.constructor === Array) {
        var res = '[';
        for (var i = 0; i < value.length; i++)
            res += (i ? ', ' : '') + stringify(value[i]);
        return res + ']';
    } else if (typeof value === '') {
        var tmp = [];
        for (var k in value) {
            if (value.hasOwnProperty(k))
                tmp.push(stringify(k) + ': ' + stringify(value[k]));
        }
        return '{' + tmp.join(', ') + '}';
    }
}


/* Custom Stringify function*/
function stringify(obj) {
    // Step 1: handle primitive types
    if (typeof obj === "string") {
        return `"${obj}"`;
    }
    if (typeof obj === "number" || typeof obj === "boolean") {
        return "${obj}";
    }

    // Step 2: handle arrays
    if (obj.constructor === Array) {     // since old browsers does not support isArray()
        let result = `"["`;
        for (let i = 0; i < obj.length; i++) {
            result += `"${stringify(obj[i])}", `;
        }
        // remove extra comma from end of result
        result = result.substring(0, result.length - 2) + `"]"`;
        return result;
    }

    // Step 3: handle object
    if (typeof obj === "object" && typeof obj !== null) {
        let result = `"{"`;
        const objectKeys = Object.keys(obj);
        for (let i = 0; i < objectKeys.length; i++) {
            const key = objectKeys[i];
            result += `"${key}":"${stringify(obj[key])}", `;
        }
        // remove extra comma from end of result
        result = result.substring(0, result.length - 2) + `"}"`;
        return result;
    }
}