/**
 * Native functions
 * @author Bendy Zhang <zb@bndy.net>
 * @copyright BNDY.NET 2017
 * @see {@link http://bndy.net|Home Page}
 */


'use strict';
//===================================================================

/**
 * Gets a random string.
 * @param {number} len - The random string length.
 * @returns {string} A random string.
 * @example
 * generateRandomAlphaNum(10);
 * // => "4zvu4la1cd"
 */
function generateRandomAlphaNum(len) {
    var rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);

}

/**
 * Checks whether is number.
 * @param {*} n 
 * @returns {boolean} true if number, otherwise false.
 */
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Checks whether is an Array.
 * @param {*} obj - The target.
 * @returns {boolean} true if an array, otherwise false.
 */
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * Checks whether is a function.
 * @param {*} obj - The target.
 * @returns {boolean} true if function, otherwise false.
 */
function isFunction(obj) {
    return typeof obj === 'function';
}

/**
 * Escapes the html string.
 * @param {*} text - The html string.
 * @returns {string} A string escaped.
 * @example
 * escapeHTML('<h1>Hell World!</h1>');
 * // => "&lt;h1&gt;Hell World!&lt;/h1&gt;"
 */
function escapeHTML(text) {
    var replacements = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "\"": "&quot;"
    };
    return text.replace(/[<>&"]/g, function (character) {
        return replacements[character];
    });
}


//===================================================================
/**
 * @external Object
 */

Object.defineProperties(Object.prototype, {
    /**
     * To do something if the object hasOwnProperty.
     * @function external:Object#ifHasProperty
     * @param {string} propertyName - The property name.
     * @param {function} callback - The callback function.
     * @example
     * {name: 'Bendy'}.ifHasProperty('name', function(propertyValue) { console.debug(propertyValue); });
     * // Bendy
     */
    ifHasProperty: {
        value: function (propertyName, callback) {
            if (this.hasOwnProperty(propertyName)) {
                if (callback) {
                    callback(this[propertyName]);
                }
            }
        },
        enumerable: false, // defaults to false
        writable: false, // defaults to false
    },

    /**
     * Converts an object to json string.
     * @function external:Object#toJsonString
     * @returns {string} A json string.
     * @example
     * {name:'zhang'}.toJsonString();
     * // => "{"name":"zhang"}"
     */
    toJsonString: {
        value: function () {
            return JSON.stringify(this);
        },
    },
});

//===================================================================
/**
 * @external String
 */

if (!String.prototype.trim) {
    /**
     * Removes whitespace from both ends of a string. Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.) and all the line terminator characters (LF, CR, etc.).
     * @function external:String#trim
     * @returns {string} - A new string representing the calling string stripped of whitespace from both ends.
     * @example
     * ' bendy '.trim();
     * // => "bendy"
     */
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

/**
 * Removes whitespace from the left of a string.
 * @function external:String#ltrim
 * @returns {string}
 * @example
 * ' bendy '.ltrim();
 * // => "bendy  "
 */
String.prototype.ltrim = function () {
    if (String.prototype.trimLeft) {
        return this.trimLeft();
    }

    return this.replace(/^\s+/, '');
}
/**
 * Removes whitespace from the right of a string.
 * @function external:String#rtrim
 * @returns {string}
 * @example
 * ' bendy '.rtrim();
 * // => "  bendy"
 */
String.prototype.rtrim = function () {
    if (String.prototype.trimRight) {
        return this.trimRight();
    }

    return this.replace(/\s+$/, '');
}
/**
 * Replaces text inside a string.
 * @function external:String#replaceAll
 * @returns {string}
 * @example
 * 'Bendy Zhang'.replaceAll('n', '-');
 * // => "Be-dy Zha-g"
 */
String.prototype.replaceAll = function (search, replace) {
    if (replace === undefined) {
        return this.toString();
    }
    return this.split(search).join(replace);
};

/**
 * Dasherizes string.
 * @function external:String#dasherize
 * @returns {string}
 * @example
 * 'Bendy Zhang 1949.10'.dasherize();
 * // => "bendy-zhang-1949-10"
 */
String.prototype.dasherize = function () {
    return this.replace(/\W+/g, "-").toLowerCase();
};

/**
 * Capitalizes string.
 * @function external:String#capitalize
 * @returns {string}
 * @example
 * 'bendy zhang'.capitalize();
 * // => "Bendy Zhang"
 */
String.prototype.capitalize = function () {
    var tmp = this.split(' ');
    var result = '';
    for (var idx = 0; idx < tmp.length; idx++) {
        var s = tmp[idx];
        if (s) {
            result += (idx ? ' ' : '') + s.charAt(0).toUpperCase() + s.slice(1);
        } else {
            result += (idx ? ' ' : '');
        }
    }
    return result;
};

/**
 * Strips html tags.
 * @function external:String#stripHtmlTag
 * @returns {string} The string which does not include any html tags.
 * @example
 * '<div>Hello <span>World!</span></div>'.stripHtmlTag();
 * // => "Hello World!""
 */
String.prototype.stripHtmlTag = function () {
    if (this) {
        return this.replace(/<.*?>/g, '').replace(/\s+/g, ' ').trim();
    }
    return '';
};

/**
 * Cuts the string.
 * @function external:String#cut
 * @param {number} len - The length needs to cut.
 * @param {string} [ellipsis=...] - The ellipsis if the len larger than string length.
 * @returns {string} A cutted string with ellipsis or self.
 * @example
 * 'Bendy'.cut(3);
 * // => "Ben..."
 * 'Bendy'.cut(3, '---');
 * // => "Ben---"
 */
String.prototype.cut = function (len, ellipsis) {
    ellipsis = ellipsis || '...';
    if (this.length > len) {
        return this.substr(0, len) + ellipsis;
    }
    return this;
};

/**
 * Converts a string to Json object.
 * @function external:String#toJson
 * @returns {object} The parsed object.
 */
String.prototype.toJson = function () {
    if (this) {
        return JSON.parse(this);
    }
    return null;
};