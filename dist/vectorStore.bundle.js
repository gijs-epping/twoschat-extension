var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __await = function(promise, isYieldStar) {
  this[0] = promise;
  this[1] = isYieldStar;
};
var __asyncGenerator = (__this, __arguments, generator) => {
  var resume = (k, v, yes, no) => {
    try {
      var x = generator[k](v), isAwait = (v = x.value) instanceof __await, done = x.done;
      Promise.resolve(isAwait ? v[0] : v).then((y) => isAwait ? resume(k === "return" ? k : "next", v[1] ? { done: y.done, value: y.value } : y, yes, no) : yes({ value: y, done })).catch((e) => resume("throw", e, yes, no));
    } catch (e) {
      no(e);
    }
  }, method = (k) => it[k] = (x) => new Promise((yes, no) => resume(k, x, yes, no)), it = {};
  return generator = generator.apply(__this, __arguments), it[__knownSymbol("asyncIterator")] = () => it, method("next"), method("throw"), method("return"), it;
};
var __forAwait = (obj, it, method) => (it = obj[__knownSymbol("asyncIterator")]) ? it.call(obj) : (obj = obj[__knownSymbol("iterator")](), it = {}, method = (key, fn) => (fn = obj[key]) && (it[key] = (arg) => new Promise((yes, no, done) => (arg = fn.call(obj, arg), done = arg.done, Promise.resolve(arg.value).then((value) => yes({ value, done }), no)))), method("next"), method("return"), it);

// node_modules/openai/internal/qs/formats.js
var require_formats = __commonJS({
  "node_modules/openai/internal/qs/formats.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RFC3986 = exports.RFC1738 = exports.formatters = exports.default_format = void 0;
    exports.default_format = "RFC3986";
    exports.formatters = {
      RFC1738: (v) => String(v).replace(/%20/g, "+"),
      RFC3986: (v) => String(v)
    };
    exports.RFC1738 = "RFC1738";
    exports.RFC3986 = "RFC3986";
  }
});

// node_modules/openai/internal/qs/utils.js
var require_utils = __commonJS({
  "node_modules/openai/internal/qs/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.maybe_map = exports.combine = exports.is_buffer = exports.is_regexp = exports.compact = exports.encode = exports.decode = exports.assign_single_source = exports.merge = void 0;
    var formats_1 = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var is_array = Array.isArray;
    var hex_table = (() => {
      const array = [];
      for (let i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    })();
    function compact_queue(queue) {
      while (queue.length > 1) {
        const item = queue.pop();
        if (!item)
          continue;
        const obj = item.obj[item.prop];
        if (is_array(obj)) {
          const compacted = [];
          for (let j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    }
    function array_to_object(source, options) {
      const obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (let i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    }
    function merge(target, source, options = {}) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (is_array(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      let mergeTarget = target;
      if (is_array(target) && !is_array(source)) {
        mergeTarget = array_to_object(target, options);
      }
      if (is_array(target) && is_array(source)) {
        source.forEach(function(item, i) {
          if (has.call(target, i)) {
            const targetItem = target[i];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i] = merge(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        const value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    }
    exports.merge = merge;
    function assign_single_source(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    }
    exports.assign_single_source = assign_single_source;
    function decode(str, _, charset) {
      const strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    }
    exports.decode = decode;
    var limit = 1024;
    var encode = (str, _defaultEncoder, charset, _kind, format) => {
      if (str.length === 0) {
        return str;
      }
      let string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      let out = "";
      for (let j = 0; j < string.length; j += limit) {
        const segment = string.length >= limit ? string.slice(j, j + limit) : string;
        const arr = [];
        for (let i = 0; i < segment.length; ++i) {
          let c = segment.charCodeAt(i);
          if (c === 45 || // -
          c === 46 || // .
          c === 95 || // _
          c === 126 || // ~
          c >= 48 && c <= 57 || // 0-9
          c >= 65 && c <= 90 || // a-z
          c >= 97 && c <= 122 || // A-Z
          format === formats_1.RFC1738 && (c === 40 || c === 41)) {
            arr[arr.length] = segment.charAt(i);
            continue;
          }
          if (c < 128) {
            arr[arr.length] = hex_table[c];
            continue;
          }
          if (c < 2048) {
            arr[arr.length] = hex_table[192 | c >> 6] + hex_table[128 | c & 63];
            continue;
          }
          if (c < 55296 || c >= 57344) {
            arr[arr.length] = hex_table[224 | c >> 12] + hex_table[128 | c >> 6 & 63] + hex_table[128 | c & 63];
            continue;
          }
          i += 1;
          c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
          arr[arr.length] = hex_table[240 | c >> 18] + hex_table[128 | c >> 12 & 63] + hex_table[128 | c >> 6 & 63] + hex_table[128 | c & 63];
        }
        out += arr.join("");
      }
      return out;
    };
    exports.encode = encode;
    function compact(value) {
      const queue = [{ obj: { o: value }, prop: "o" }];
      const refs = [];
      for (let i = 0; i < queue.length; ++i) {
        const item = queue[i];
        const obj = item.obj[item.prop];
        const keys = Object.keys(obj);
        for (let j = 0; j < keys.length; ++j) {
          const key = keys[j];
          const val = obj[key];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key });
            refs.push(val);
          }
        }
      }
      compact_queue(queue);
      return value;
    }
    exports.compact = compact;
    function is_regexp(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    }
    exports.is_regexp = is_regexp;
    function is_buffer(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    }
    exports.is_buffer = is_buffer;
    function combine(a, b) {
      return [].concat(a, b);
    }
    exports.combine = combine;
    function maybe_map(val, fn) {
      if (is_array(val)) {
        const mapped = [];
        for (let i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    }
    exports.maybe_map = maybe_map;
  }
});

// node_modules/openai/internal/qs/stringify.js
var require_stringify = __commonJS({
  "node_modules/openai/internal/qs/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stringify = void 0;
    var utils_1 = require_utils();
    var formats_1 = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var array_prefix_generators = {
      brackets(prefix) {
        return String(prefix) + "[]";
      },
      comma: "comma",
      indices(prefix, key) {
        return String(prefix) + "[" + key + "]";
      },
      repeat(prefix) {
        return String(prefix);
      }
    };
    var is_array = Array.isArray;
    var push = Array.prototype.push;
    var push_to_array = function(arr, value_or_array) {
      push.apply(arr, is_array(value_or_array) ? value_or_array : [value_or_array]);
    };
    var to_ISO = Date.prototype.toISOString;
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      allowEmptyArrays: false,
      arrayFormat: "indices",
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encodeDotInKeys: false,
      encoder: utils_1.encode,
      encodeValuesOnly: false,
      format: formats_1.default_format,
      formatter: formats_1.formatters[formats_1.default_format],
      /** @deprecated */
      indices: false,
      serializeDate(date) {
        return to_ISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    function is_non_nullish_primitive(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    }
    var sentinel = {};
    function inner_stringify(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
      let obj = object;
      let tmp_sc = sideChannel;
      let step = 0;
      let find_flag = false;
      while ((tmp_sc = tmp_sc.get(sentinel)) !== void 0 && !find_flag) {
        const pos = tmp_sc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            find_flag = true;
          }
        }
        if (typeof tmp_sc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate == null ? void 0 : serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && is_array(obj)) {
        obj = (0, utils_1.maybe_map)(obj, function(value) {
          if (value instanceof Date) {
            return serializeDate == null ? void 0 : serializeDate(value);
          }
          return value;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? (
            // @ts-expect-error
            encoder(prefix, defaults.encoder, charset, "key", format)
          ) : prefix;
        }
        obj = "";
      }
      if (is_non_nullish_primitive(obj) || (0, utils_1.is_buffer)(obj)) {
        if (encoder) {
          const key_value = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          return [
            (formatter == null ? void 0 : formatter(key_value)) + "=" + // @ts-expect-error
            (formatter == null ? void 0 : formatter(encoder(obj, defaults.encoder, charset, "value", format)))
          ];
        }
        return [(formatter == null ? void 0 : formatter(prefix)) + "=" + (formatter == null ? void 0 : formatter(String(obj)))];
      }
      const values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      let obj_keys;
      if (generateArrayPrefix === "comma" && is_array(obj)) {
        if (encodeValuesOnly && encoder) {
          obj = (0, utils_1.maybe_map)(obj, encoder);
        }
        obj_keys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (is_array(filter)) {
        obj_keys = filter;
      } else {
        const keys = Object.keys(obj);
        obj_keys = sort ? keys.sort(sort) : keys;
      }
      const encoded_prefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
      const adjusted_prefix = commaRoundTrip && is_array(obj) && obj.length === 1 ? encoded_prefix + "[]" : encoded_prefix;
      if (allowEmptyArrays && is_array(obj) && obj.length === 0) {
        return adjusted_prefix + "[]";
      }
      for (let j = 0; j < obj_keys.length; ++j) {
        const key = obj_keys[j];
        const value = (
          // @ts-ignore
          typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key]
        );
        if (skipNulls && value === null) {
          continue;
        }
        const encoded_key = allowDots && encodeDotInKeys ? key.replace(/\./g, "%2E") : key;
        const key_prefix = is_array(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjusted_prefix, encoded_key) : adjusted_prefix : adjusted_prefix + (allowDots ? "." + encoded_key : "[" + encoded_key + "]");
        sideChannel.set(object, step);
        const valueSideChannel = /* @__PURE__ */ new WeakMap();
        valueSideChannel.set(sentinel, sideChannel);
        push_to_array(values, inner_stringify(
          value,
          key_prefix,
          generateArrayPrefix,
          commaRoundTrip,
          allowEmptyArrays,
          strictNullHandling,
          skipNulls,
          encodeDotInKeys,
          // @ts-ignore
          generateArrayPrefix === "comma" && encodeValuesOnly && is_array(obj) ? null : encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset,
          valueSideChannel
        ));
      }
      return values;
    }
    function normalize_stringify_options(opts = defaults) {
      if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      }
      if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
        throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      const charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      let format = formats_1.default_format;
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats_1.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      const formatter = formats_1.formatters[format];
      let filter = defaults.filter;
      if (typeof opts.filter === "function" || is_array(opts.filter)) {
        filter = opts.filter;
      }
      let arrayFormat;
      if (opts.arrayFormat && opts.arrayFormat in array_prefix_generators) {
        arrayFormat = opts.arrayFormat;
      } else if ("indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = defaults.arrayFormat;
      }
      if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      const allowDots = typeof opts.allowDots === "undefined" ? !!opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        // @ts-ignore
        allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        arrayFormat,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        commaRoundTrip: !!opts.commaRoundTrip,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        // @ts-ignore
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    }
    function stringify(object, opts = {}) {
      let obj = object;
      const options = normalize_stringify_options(opts);
      let obj_keys;
      let filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (is_array(options.filter)) {
        filter = options.filter;
        obj_keys = filter;
      }
      const keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      const generateArrayPrefix = array_prefix_generators[options.arrayFormat];
      const commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
      if (!obj_keys) {
        obj_keys = Object.keys(obj);
      }
      if (options.sort) {
        obj_keys.sort(options.sort);
      }
      const sideChannel = /* @__PURE__ */ new WeakMap();
      for (let i = 0; i < obj_keys.length; ++i) {
        const key = obj_keys[i];
        if (options.skipNulls && obj[key] === null) {
          continue;
        }
        push_to_array(keys, inner_stringify(
          obj[key],
          key,
          // @ts-expect-error
          generateArrayPrefix,
          commaRoundTrip,
          options.allowEmptyArrays,
          options.strictNullHandling,
          options.skipNulls,
          options.encodeDotInKeys,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset,
          sideChannel
        ));
      }
      const joined = keys.join(options.delimiter);
      let prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    }
    exports.stringify = stringify;
  }
});

// node_modules/openai/internal/qs/index.js
var require_qs = __commonJS({
  "node_modules/openai/internal/qs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formats = exports.stringify = void 0;
    var formats_1 = require_formats();
    var formats = {
      formatters: formats_1.formatters,
      RFC1738: formats_1.RFC1738,
      RFC3986: formats_1.RFC3986,
      default: formats_1.default_format
    };
    exports.formats = formats;
    var stringify_1 = require_stringify();
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return stringify_1.stringify;
    } });
  }
});

// node_modules/openai/version.js
var require_version = __commonJS({
  "node_modules/openai/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VERSION = void 0;
    exports.VERSION = "4.78.1";
  }
});

// node_modules/openai/_shims/registry.js
var require_registry = __commonJS({
  "node_modules/openai/_shims/registry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setShims = exports.isFsReadStream = exports.fileFromPath = exports.getDefaultAgent = exports.getMultipartRequestOptions = exports.ReadableStream = exports.File = exports.Blob = exports.FormData = exports.Headers = exports.Response = exports.Request = exports.fetch = exports.kind = exports.auto = void 0;
    exports.auto = false;
    exports.kind = void 0;
    exports.fetch = void 0;
    exports.Request = void 0;
    exports.Response = void 0;
    exports.Headers = void 0;
    exports.FormData = void 0;
    exports.Blob = void 0;
    exports.File = void 0;
    exports.ReadableStream = void 0;
    exports.getMultipartRequestOptions = void 0;
    exports.getDefaultAgent = void 0;
    exports.fileFromPath = void 0;
    exports.isFsReadStream = void 0;
    function setShims(shims, options = { auto: false }) {
      if (exports.auto) {
        throw new Error(`you must \`import 'openai/shims/${shims.kind}'\` before importing anything else from openai`);
      }
      if (exports.kind) {
        throw new Error(`can't \`import 'openai/shims/${shims.kind}'\` after \`import 'openai/shims/${exports.kind}'\``);
      }
      exports.auto = options.auto;
      exports.kind = shims.kind;
      exports.fetch = shims.fetch;
      exports.Request = shims.Request;
      exports.Response = shims.Response;
      exports.Headers = shims.Headers;
      exports.FormData = shims.FormData;
      exports.Blob = shims.Blob;
      exports.File = shims.File;
      exports.ReadableStream = shims.ReadableStream;
      exports.getMultipartRequestOptions = shims.getMultipartRequestOptions;
      exports.getDefaultAgent = shims.getDefaultAgent;
      exports.fileFromPath = shims.fileFromPath;
      exports.isFsReadStream = shims.isFsReadStream;
    }
    exports.setShims = setShims;
  }
});

// node_modules/openai/_shims/MultipartBody.js
var require_MultipartBody = __commonJS({
  "node_modules/openai/_shims/MultipartBody.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultipartBody = void 0;
    var MultipartBody = class {
      constructor(body) {
        this.body = body;
      }
      get [Symbol.toStringTag]() {
        return "MultipartBody";
      }
    };
    exports.MultipartBody = MultipartBody;
  }
});

// node_modules/openai/_shims/web-runtime.js
var require_web_runtime = __commonJS({
  "node_modules/openai/_shims/web-runtime.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRuntime = void 0;
    var MultipartBody_1 = require_MultipartBody();
    function getRuntime({ manuallyImported } = {}) {
      const recommendation = manuallyImported ? `You may need to use polyfills` : `Add one of these imports before your first \`import \u2026 from 'openai'\`:
- \`import 'openai/shims/node'\` (if you're running on Node)
- \`import 'openai/shims/web'\` (otherwise)
`;
      let _fetch, _Request, _Response, _Headers;
      try {
        _fetch = fetch;
        _Request = Request;
        _Response = Response;
        _Headers = Headers;
      } catch (error) {
        throw new Error(`this environment is missing the following Web Fetch API type: ${error.message}. ${recommendation}`);
      }
      return {
        kind: "web",
        fetch: _fetch,
        Request: _Request,
        Response: _Response,
        Headers: _Headers,
        FormData: (
          // @ts-ignore
          typeof FormData !== "undefined" ? FormData : class FormData {
            // @ts-ignore
            constructor() {
              throw new Error(`file uploads aren't supported in this environment yet as 'FormData' is undefined. ${recommendation}`);
            }
          }
        ),
        Blob: typeof Blob !== "undefined" ? Blob : class Blob {
          constructor() {
            throw new Error(`file uploads aren't supported in this environment yet as 'Blob' is undefined. ${recommendation}`);
          }
        },
        File: (
          // @ts-ignore
          typeof File !== "undefined" ? File : class File {
            // @ts-ignore
            constructor() {
              throw new Error(`file uploads aren't supported in this environment yet as 'File' is undefined. ${recommendation}`);
            }
          }
        ),
        ReadableStream: (
          // @ts-ignore
          typeof ReadableStream !== "undefined" ? ReadableStream : class ReadableStream {
            // @ts-ignore
            constructor() {
              throw new Error(`streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${recommendation}`);
            }
          }
        ),
        getMultipartRequestOptions: async (form, opts) => __spreadProps(__spreadValues({}, opts), {
          body: new MultipartBody_1.MultipartBody(form)
        }),
        getDefaultAgent: (url) => void 0,
        fileFromPath: () => {
          throw new Error("The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/openai/openai-node#file-uploads");
        },
        isFsReadStream: (value) => false
      };
    }
    exports.getRuntime = getRuntime;
  }
});

// node_modules/openai/_shims/auto/runtime.js
var require_runtime = __commonJS({
  "node_modules/openai/_shims/auto/runtime.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_web_runtime(), exports);
  }
});

// node_modules/openai/_shims/index.js
var require_shims = __commonJS({
  "node_modules/openai/_shims/index.js"(exports) {
    var shims = require_registry();
    var auto = require_runtime();
    if (!shims.kind) shims.setShims(auto.getRuntime(), { auto: true });
    for (const property of Object.keys(shims)) {
      Object.defineProperty(exports, property, {
        get() {
          return shims[property];
        }
      });
    }
  }
});

// node_modules/openai/error.js
var require_error = __commonJS({
  "node_modules/openai/error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ContentFilterFinishReasonError = exports.LengthFinishReasonError = exports.InternalServerError = exports.RateLimitError = exports.UnprocessableEntityError = exports.ConflictError = exports.NotFoundError = exports.PermissionDeniedError = exports.AuthenticationError = exports.BadRequestError = exports.APIConnectionTimeoutError = exports.APIConnectionError = exports.APIUserAbortError = exports.APIError = exports.OpenAIError = void 0;
    var core_1 = require_core();
    var OpenAIError = class extends Error {
    };
    exports.OpenAIError = OpenAIError;
    var APIError = class _APIError extends OpenAIError {
      constructor(status, error, message, headers) {
        super(`${_APIError.makeMessage(status, error, message)}`);
        this.status = status;
        this.headers = headers;
        this.request_id = headers == null ? void 0 : headers["x-request-id"];
        this.error = error;
        const data = error;
        this.code = data == null ? void 0 : data["code"];
        this.param = data == null ? void 0 : data["param"];
        this.type = data == null ? void 0 : data["type"];
      }
      static makeMessage(status, error, message) {
        const msg = (error == null ? void 0 : error.message) ? typeof error.message === "string" ? error.message : JSON.stringify(error.message) : error ? JSON.stringify(error) : message;
        if (status && msg) {
          return `${status} ${msg}`;
        }
        if (status) {
          return `${status} status code (no body)`;
        }
        if (msg) {
          return msg;
        }
        return "(no status code or body)";
      }
      static generate(status, errorResponse, message, headers) {
        if (!status || !headers) {
          return new APIConnectionError({ message, cause: (0, core_1.castToError)(errorResponse) });
        }
        const error = errorResponse == null ? void 0 : errorResponse["error"];
        if (status === 400) {
          return new BadRequestError(status, error, message, headers);
        }
        if (status === 401) {
          return new AuthenticationError(status, error, message, headers);
        }
        if (status === 403) {
          return new PermissionDeniedError(status, error, message, headers);
        }
        if (status === 404) {
          return new NotFoundError(status, error, message, headers);
        }
        if (status === 409) {
          return new ConflictError(status, error, message, headers);
        }
        if (status === 422) {
          return new UnprocessableEntityError(status, error, message, headers);
        }
        if (status === 429) {
          return new RateLimitError(status, error, message, headers);
        }
        if (status >= 500) {
          return new InternalServerError(status, error, message, headers);
        }
        return new _APIError(status, error, message, headers);
      }
    };
    exports.APIError = APIError;
    var APIUserAbortError = class extends APIError {
      constructor({ message } = {}) {
        super(void 0, void 0, message || "Request was aborted.", void 0);
      }
    };
    exports.APIUserAbortError = APIUserAbortError;
    var APIConnectionError = class extends APIError {
      constructor({ message, cause }) {
        super(void 0, void 0, message || "Connection error.", void 0);
        if (cause)
          this.cause = cause;
      }
    };
    exports.APIConnectionError = APIConnectionError;
    var APIConnectionTimeoutError = class extends APIConnectionError {
      constructor({ message } = {}) {
        super({ message: message != null ? message : "Request timed out." });
      }
    };
    exports.APIConnectionTimeoutError = APIConnectionTimeoutError;
    var BadRequestError = class extends APIError {
    };
    exports.BadRequestError = BadRequestError;
    var AuthenticationError = class extends APIError {
    };
    exports.AuthenticationError = AuthenticationError;
    var PermissionDeniedError = class extends APIError {
    };
    exports.PermissionDeniedError = PermissionDeniedError;
    var NotFoundError = class extends APIError {
    };
    exports.NotFoundError = NotFoundError;
    var ConflictError = class extends APIError {
    };
    exports.ConflictError = ConflictError;
    var UnprocessableEntityError = class extends APIError {
    };
    exports.UnprocessableEntityError = UnprocessableEntityError;
    var RateLimitError = class extends APIError {
    };
    exports.RateLimitError = RateLimitError;
    var InternalServerError = class extends APIError {
    };
    exports.InternalServerError = InternalServerError;
    var LengthFinishReasonError = class extends OpenAIError {
      constructor() {
        super(`Could not parse response content as the length limit was reached`);
      }
    };
    exports.LengthFinishReasonError = LengthFinishReasonError;
    var ContentFilterFinishReasonError = class extends OpenAIError {
      constructor() {
        super(`Could not parse response content as the request was rejected by the content filter`);
      }
    };
    exports.ContentFilterFinishReasonError = ContentFilterFinishReasonError;
  }
});

// node_modules/openai/internal/decoders/line.js
var require_line = __commonJS({
  "node_modules/openai/internal/decoders/line.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineDecoder = void 0;
    var error_1 = require_error();
    var LineDecoder = class _LineDecoder {
      constructor() {
        this.buffer = [];
        this.trailingCR = false;
      }
      decode(chunk) {
        let text = this.decodeText(chunk);
        if (this.trailingCR) {
          text = "\r" + text;
          this.trailingCR = false;
        }
        if (text.endsWith("\r")) {
          this.trailingCR = true;
          text = text.slice(0, -1);
        }
        if (!text) {
          return [];
        }
        const trailingNewline = _LineDecoder.NEWLINE_CHARS.has(text[text.length - 1] || "");
        let lines = text.split(_LineDecoder.NEWLINE_REGEXP);
        if (trailingNewline) {
          lines.pop();
        }
        if (lines.length === 1 && !trailingNewline) {
          this.buffer.push(lines[0]);
          return [];
        }
        if (this.buffer.length > 0) {
          lines = [this.buffer.join("") + lines[0], ...lines.slice(1)];
          this.buffer = [];
        }
        if (!trailingNewline) {
          this.buffer = [lines.pop() || ""];
        }
        return lines;
      }
      decodeText(bytes) {
        var _a;
        if (bytes == null)
          return "";
        if (typeof bytes === "string")
          return bytes;
        if (typeof Buffer !== "undefined") {
          if (bytes instanceof Buffer) {
            return bytes.toString();
          }
          if (bytes instanceof Uint8Array) {
            return Buffer.from(bytes).toString();
          }
          throw new error_1.OpenAIError(`Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`);
        }
        if (typeof TextDecoder !== "undefined") {
          if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
            (_a = this.textDecoder) != null ? _a : this.textDecoder = new TextDecoder("utf8");
            return this.textDecoder.decode(bytes);
          }
          throw new error_1.OpenAIError(`Unexpected: received non-Uint8Array/ArrayBuffer (${bytes.constructor.name}) in a web platform. Please report this error.`);
        }
        throw new error_1.OpenAIError(`Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.`);
      }
      flush() {
        if (!this.buffer.length && !this.trailingCR) {
          return [];
        }
        const lines = [this.buffer.join("")];
        this.buffer = [];
        this.trailingCR = false;
        return lines;
      }
    };
    exports.LineDecoder = LineDecoder;
    LineDecoder.NEWLINE_CHARS = /* @__PURE__ */ new Set(["\n", "\r"]);
    LineDecoder.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
  }
});

// node_modules/openai/streaming.js
var require_streaming = __commonJS({
  "node_modules/openai/streaming.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.readableStreamAsyncIterable = exports._decodeChunks = exports._iterSSEMessages = exports.Stream = void 0;
    var index_1 = require_shims();
    var error_1 = require_error();
    var line_1 = require_line();
    var error_2 = require_error();
    var Stream = class _Stream {
      constructor(iterator, controller) {
        this.iterator = iterator;
        this.controller = controller;
      }
      static fromSSEResponse(response, controller) {
        let consumed = false;
        function iterator() {
          return __asyncGenerator(this, null, function* () {
            if (consumed) {
              throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
            }
            consumed = true;
            let done = false;
            try {
              try {
                for (var iter = __forAwait(_iterSSEMessages(response, controller)), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
                  const sse = temp.value;
                  if (done)
                    continue;
                  if (sse.data.startsWith("[DONE]")) {
                    done = true;
                    continue;
                  }
                  if (sse.event === null) {
                    let data;
                    try {
                      data = JSON.parse(sse.data);
                    } catch (e) {
                      console.error(`Could not parse message into JSON:`, sse.data);
                      console.error(`From chunk:`, sse.raw);
                      throw e;
                    }
                    if (data && data.error) {
                      throw new error_2.APIError(void 0, data.error, void 0, void 0);
                    }
                    yield data;
                  } else {
                    let data;
                    try {
                      data = JSON.parse(sse.data);
                    } catch (e) {
                      console.error(`Could not parse message into JSON:`, sse.data);
                      console.error(`From chunk:`, sse.raw);
                      throw e;
                    }
                    if (sse.event == "error") {
                      throw new error_2.APIError(void 0, data.error, data.message, void 0);
                    }
                    yield { event: sse.event, data };
                  }
                }
              } catch (temp) {
                error = [temp];
              } finally {
                try {
                  more && (temp = iter.return) && (yield new __await(temp.call(iter)));
                } finally {
                  if (error)
                    throw error[0];
                }
              }
              done = true;
            } catch (e) {
              if (e instanceof Error && e.name === "AbortError")
                return;
              throw e;
            } finally {
              if (!done)
                controller.abort();
            }
          });
        }
        return new _Stream(iterator, controller);
      }
      /**
       * Generates a Stream from a newline-separated ReadableStream
       * where each item is a JSON value.
       */
      static fromReadableStream(readableStream, controller) {
        let consumed = false;
        function iterLines() {
          return __asyncGenerator(this, null, function* () {
            const lineDecoder = new line_1.LineDecoder();
            const iter = readableStreamAsyncIterable(readableStream);
            try {
              for (var iter2 = __forAwait(iter), more, temp, error; more = !(temp = yield new __await(iter2.next())).done; more = false) {
                const chunk = temp.value;
                for (const line of lineDecoder.decode(chunk)) {
                  yield line;
                }
              }
            } catch (temp) {
              error = [temp];
            } finally {
              try {
                more && (temp = iter2.return) && (yield new __await(temp.call(iter2)));
              } finally {
                if (error)
                  throw error[0];
              }
            }
            for (const line of lineDecoder.flush()) {
              yield line;
            }
          });
        }
        function iterator() {
          return __asyncGenerator(this, null, function* () {
            if (consumed) {
              throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
            }
            consumed = true;
            let done = false;
            try {
              try {
                for (var iter = __forAwait(iterLines()), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
                  const line = temp.value;
                  if (done)
                    continue;
                  if (line)
                    yield JSON.parse(line);
                }
              } catch (temp) {
                error = [temp];
              } finally {
                try {
                  more && (temp = iter.return) && (yield new __await(temp.call(iter)));
                } finally {
                  if (error)
                    throw error[0];
                }
              }
              done = true;
            } catch (e) {
              if (e instanceof Error && e.name === "AbortError")
                return;
              throw e;
            } finally {
              if (!done)
                controller.abort();
            }
          });
        }
        return new _Stream(iterator, controller);
      }
      [Symbol.asyncIterator]() {
        return this.iterator();
      }
      /**
       * Splits the stream into two streams which can be
       * independently read from at different speeds.
       */
      tee() {
        const left = [];
        const right = [];
        const iterator = this.iterator();
        const teeIterator = (queue) => {
          return {
            next: () => {
              if (queue.length === 0) {
                const result = iterator.next();
                left.push(result);
                right.push(result);
              }
              return queue.shift();
            }
          };
        };
        return [
          new _Stream(() => teeIterator(left), this.controller),
          new _Stream(() => teeIterator(right), this.controller)
        ];
      }
      /**
       * Converts this stream to a newline-separated ReadableStream of
       * JSON stringified values in the stream
       * which can be turned back into a Stream with `Stream.fromReadableStream()`.
       */
      toReadableStream() {
        const self = this;
        let iter;
        const encoder = new TextEncoder();
        return new index_1.ReadableStream({
          async start() {
            iter = self[Symbol.asyncIterator]();
          },
          async pull(ctrl) {
            try {
              const { value, done } = await iter.next();
              if (done)
                return ctrl.close();
              const bytes = encoder.encode(JSON.stringify(value) + "\n");
              ctrl.enqueue(bytes);
            } catch (err) {
              ctrl.error(err);
            }
          },
          async cancel() {
            var _a;
            await ((_a = iter.return) == null ? void 0 : _a.call(iter));
          }
        });
      }
    };
    exports.Stream = Stream;
    function _iterSSEMessages(response, controller) {
      return __asyncGenerator(this, null, function* () {
        if (!response.body) {
          controller.abort();
          throw new error_1.OpenAIError(`Attempted to iterate over a response with no body`);
        }
        const sseDecoder = new SSEDecoder();
        const lineDecoder = new line_1.LineDecoder();
        const iter = readableStreamAsyncIterable(response.body);
        try {
          for (var iter2 = __forAwait(iterSSEChunks(iter)), more, temp, error; more = !(temp = yield new __await(iter2.next())).done; more = false) {
            const sseChunk = temp.value;
            for (const line of lineDecoder.decode(sseChunk)) {
              const sse = sseDecoder.decode(line);
              if (sse)
                yield sse;
            }
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter2.return) && (yield new __await(temp.call(iter2)));
          } finally {
            if (error)
              throw error[0];
          }
        }
        for (const line of lineDecoder.flush()) {
          const sse = sseDecoder.decode(line);
          if (sse)
            yield sse;
        }
      });
    }
    exports._iterSSEMessages = _iterSSEMessages;
    function iterSSEChunks(iterator) {
      return __asyncGenerator(this, null, function* () {
        let data = new Uint8Array();
        try {
          for (var iter = __forAwait(iterator), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
            const chunk = temp.value;
            if (chunk == null) {
              continue;
            }
            const binaryChunk = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === "string" ? new TextEncoder().encode(chunk) : chunk;
            let newData = new Uint8Array(data.length + binaryChunk.length);
            newData.set(data);
            newData.set(binaryChunk, data.length);
            data = newData;
            let patternIndex;
            while ((patternIndex = findDoubleNewlineIndex(data)) !== -1) {
              yield data.slice(0, patternIndex);
              data = data.slice(patternIndex);
            }
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter.return) && (yield new __await(temp.call(iter)));
          } finally {
            if (error)
              throw error[0];
          }
        }
        if (data.length > 0) {
          yield data;
        }
      });
    }
    function findDoubleNewlineIndex(buffer) {
      const newline = 10;
      const carriage = 13;
      for (let i = 0; i < buffer.length - 2; i++) {
        if (buffer[i] === newline && buffer[i + 1] === newline) {
          return i + 2;
        }
        if (buffer[i] === carriage && buffer[i + 1] === carriage) {
          return i + 2;
        }
        if (buffer[i] === carriage && buffer[i + 1] === newline && i + 3 < buffer.length && buffer[i + 2] === carriage && buffer[i + 3] === newline) {
          return i + 4;
        }
      }
      return -1;
    }
    var SSEDecoder = class {
      constructor() {
        this.event = null;
        this.data = [];
        this.chunks = [];
      }
      decode(line) {
        if (line.endsWith("\r")) {
          line = line.substring(0, line.length - 1);
        }
        if (!line) {
          if (!this.event && !this.data.length)
            return null;
          const sse = {
            event: this.event,
            data: this.data.join("\n"),
            raw: this.chunks
          };
          this.event = null;
          this.data = [];
          this.chunks = [];
          return sse;
        }
        this.chunks.push(line);
        if (line.startsWith(":")) {
          return null;
        }
        let [fieldname, _, value] = partition(line, ":");
        if (value.startsWith(" ")) {
          value = value.substring(1);
        }
        if (fieldname === "event") {
          this.event = value;
        } else if (fieldname === "data") {
          this.data.push(value);
        }
        return null;
      }
    };
    function _decodeChunks(chunks) {
      const decoder = new line_1.LineDecoder();
      const lines = [];
      for (const chunk of chunks) {
        lines.push(...decoder.decode(chunk));
      }
      return lines;
    }
    exports._decodeChunks = _decodeChunks;
    function partition(str, delimiter) {
      const index = str.indexOf(delimiter);
      if (index !== -1) {
        return [str.substring(0, index), delimiter, str.substring(index + delimiter.length)];
      }
      return [str, "", ""];
    }
    function readableStreamAsyncIterable(stream) {
      if (stream[Symbol.asyncIterator])
        return stream;
      const reader = stream.getReader();
      return {
        async next() {
          try {
            const result = await reader.read();
            if (result == null ? void 0 : result.done)
              reader.releaseLock();
            return result;
          } catch (e) {
            reader.releaseLock();
            throw e;
          }
        },
        async return() {
          const cancelPromise = reader.cancel();
          reader.releaseLock();
          await cancelPromise;
          return { done: true, value: void 0 };
        },
        [Symbol.asyncIterator]() {
          return this;
        }
      };
    }
    exports.readableStreamAsyncIterable = readableStreamAsyncIterable;
  }
});

// node_modules/openai/uploads.js
var require_uploads = __commonJS({
  "node_modules/openai/uploads.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createForm = exports.multipartFormRequestOptions = exports.maybeMultipartFormRequestOptions = exports.isMultipartBody = exports.toFile = exports.isUploadable = exports.isBlobLike = exports.isFileLike = exports.isResponseLike = exports.fileFromPath = void 0;
    var index_1 = require_shims();
    var index_2 = require_shims();
    Object.defineProperty(exports, "fileFromPath", { enumerable: true, get: function() {
      return index_2.fileFromPath;
    } });
    var isResponseLike = (value) => value != null && typeof value === "object" && typeof value.url === "string" && typeof value.blob === "function";
    exports.isResponseLike = isResponseLike;
    var isFileLike = (value) => value != null && typeof value === "object" && typeof value.name === "string" && typeof value.lastModified === "number" && (0, exports.isBlobLike)(value);
    exports.isFileLike = isFileLike;
    var isBlobLike = (value) => value != null && typeof value === "object" && typeof value.size === "number" && typeof value.type === "string" && typeof value.text === "function" && typeof value.slice === "function" && typeof value.arrayBuffer === "function";
    exports.isBlobLike = isBlobLike;
    var isUploadable = (value) => {
      return (0, exports.isFileLike)(value) || (0, exports.isResponseLike)(value) || (0, index_1.isFsReadStream)(value);
    };
    exports.isUploadable = isUploadable;
    async function toFile(value, name, options) {
      var _a, _b, _c;
      value = await value;
      if ((0, exports.isFileLike)(value)) {
        return value;
      }
      if ((0, exports.isResponseLike)(value)) {
        const blob = await value.blob();
        name || (name = (_a = new URL(value.url).pathname.split(/[\\/]/).pop()) != null ? _a : "unknown_file");
        const data = (0, exports.isBlobLike)(blob) ? [await blob.arrayBuffer()] : [blob];
        return new index_1.File(data, name, options);
      }
      const bits = await getBytes(value);
      name || (name = (_b = getName(value)) != null ? _b : "unknown_file");
      if (!(options == null ? void 0 : options.type)) {
        const type = (_c = bits[0]) == null ? void 0 : _c.type;
        if (typeof type === "string") {
          options = __spreadProps(__spreadValues({}, options), { type });
        }
      }
      return new index_1.File(bits, name, options);
    }
    exports.toFile = toFile;
    async function getBytes(value) {
      var _a;
      let parts = [];
      if (typeof value === "string" || ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
      value instanceof ArrayBuffer) {
        parts.push(value);
      } else if ((0, exports.isBlobLike)(value)) {
        parts.push(await value.arrayBuffer());
      } else if (isAsyncIterableIterator(value)) {
        try {
          for (var iter = __forAwait(value), more, temp, error; more = !(temp = await iter.next()).done; more = false) {
            const chunk = temp.value;
            parts.push(chunk);
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter.return) && await temp.call(iter);
          } finally {
            if (error)
              throw error[0];
          }
        }
      } else {
        throw new Error(`Unexpected data type: ${typeof value}; constructor: ${(_a = value == null ? void 0 : value.constructor) == null ? void 0 : _a.name}; props: ${propsForError(value)}`);
      }
      return parts;
    }
    function propsForError(value) {
      const props = Object.getOwnPropertyNames(value);
      return `[${props.map((p) => `"${p}"`).join(", ")}]`;
    }
    function getName(value) {
      var _a;
      return getStringFromMaybeBuffer(value.name) || getStringFromMaybeBuffer(value.filename) || // For fs.ReadStream
      ((_a = getStringFromMaybeBuffer(value.path)) == null ? void 0 : _a.split(/[\\/]/).pop());
    }
    var getStringFromMaybeBuffer = (x) => {
      if (typeof x === "string")
        return x;
      if (typeof Buffer !== "undefined" && x instanceof Buffer)
        return String(x);
      return void 0;
    };
    var isAsyncIterableIterator = (value) => value != null && typeof value === "object" && typeof value[Symbol.asyncIterator] === "function";
    var isMultipartBody = (body) => body && typeof body === "object" && body.body && body[Symbol.toStringTag] === "MultipartBody";
    exports.isMultipartBody = isMultipartBody;
    var maybeMultipartFormRequestOptions = async (opts) => {
      if (!hasUploadableValue(opts.body))
        return opts;
      const form = await (0, exports.createForm)(opts.body);
      return (0, index_1.getMultipartRequestOptions)(form, opts);
    };
    exports.maybeMultipartFormRequestOptions = maybeMultipartFormRequestOptions;
    var multipartFormRequestOptions = async (opts) => {
      const form = await (0, exports.createForm)(opts.body);
      return (0, index_1.getMultipartRequestOptions)(form, opts);
    };
    exports.multipartFormRequestOptions = multipartFormRequestOptions;
    var createForm = async (body) => {
      const form = new index_1.FormData();
      await Promise.all(Object.entries(body || {}).map(([key, value]) => addFormValue(form, key, value)));
      return form;
    };
    exports.createForm = createForm;
    var hasUploadableValue = (value) => {
      if ((0, exports.isUploadable)(value))
        return true;
      if (Array.isArray(value))
        return value.some(hasUploadableValue);
      if (value && typeof value === "object") {
        for (const k in value) {
          if (hasUploadableValue(value[k]))
            return true;
        }
      }
      return false;
    };
    var addFormValue = async (form, key, value) => {
      if (value === void 0)
        return;
      if (value == null) {
        throw new TypeError(`Received null for "${key}"; to pass null in FormData, you must use the string 'null'`);
      }
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        form.append(key, String(value));
      } else if ((0, exports.isUploadable)(value)) {
        const file = await toFile(value);
        form.append(key, file);
      } else if (Array.isArray(value)) {
        await Promise.all(value.map((entry) => addFormValue(form, key + "[]", entry)));
      } else if (typeof value === "object") {
        await Promise.all(Object.entries(value).map(([name, prop]) => addFormValue(form, `${key}[${name}]`, prop)));
      } else {
        throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`);
      }
    };
  }
});

// node_modules/openai/core.js
var require_core = __commonJS({
  "node_modules/openai/core.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _AbstractPage_client;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isObj = exports.toBase64 = exports.getHeader = exports.getRequiredHeader = exports.isHeadersProtocol = exports.isRunningInBrowser = exports.debug = exports.hasOwn = exports.isEmptyObj = exports.maybeCoerceBoolean = exports.maybeCoerceFloat = exports.maybeCoerceInteger = exports.coerceBoolean = exports.coerceFloat = exports.coerceInteger = exports.readEnv = exports.ensurePresent = exports.castToError = exports.sleep = exports.safeJSON = exports.isRequestOptions = exports.createResponseHeaders = exports.PagePromise = exports.AbstractPage = exports.APIClient = exports.APIPromise = exports.createForm = exports.multipartFormRequestOptions = exports.maybeMultipartFormRequestOptions = void 0;
    var version_1 = require_version();
    var streaming_1 = require_streaming();
    var error_1 = require_error();
    var index_1 = require_shims();
    var uploads_1 = require_uploads();
    var uploads_2 = require_uploads();
    Object.defineProperty(exports, "maybeMultipartFormRequestOptions", { enumerable: true, get: function() {
      return uploads_2.maybeMultipartFormRequestOptions;
    } });
    Object.defineProperty(exports, "multipartFormRequestOptions", { enumerable: true, get: function() {
      return uploads_2.multipartFormRequestOptions;
    } });
    Object.defineProperty(exports, "createForm", { enumerable: true, get: function() {
      return uploads_2.createForm;
    } });
    async function defaultParseResponse(props) {
      const { response } = props;
      if (props.options.stream) {
        debug("response", response.status, response.url, response.headers, response.body);
        if (props.options.__streamClass) {
          return props.options.__streamClass.fromSSEResponse(response, props.controller);
        }
        return streaming_1.Stream.fromSSEResponse(response, props.controller);
      }
      if (response.status === 204) {
        return null;
      }
      if (props.options.__binaryResponse) {
        return response;
      }
      const contentType = response.headers.get("content-type");
      const isJSON = (contentType == null ? void 0 : contentType.includes("application/json")) || (contentType == null ? void 0 : contentType.includes("application/vnd.api+json"));
      if (isJSON) {
        const json = await response.json();
        debug("response", response.status, response.url, response.headers, json);
        return _addRequestID(json, response);
      }
      const text = await response.text();
      debug("response", response.status, response.url, response.headers, text);
      return text;
    }
    function _addRequestID(value, response) {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return value;
      }
      return Object.defineProperty(value, "_request_id", {
        value: response.headers.get("x-request-id"),
        enumerable: false
      });
    }
    var APIPromise = class _APIPromise extends Promise {
      constructor(responsePromise, parseResponse = defaultParseResponse) {
        super((resolve) => {
          resolve(null);
        });
        this.responsePromise = responsePromise;
        this.parseResponse = parseResponse;
      }
      _thenUnwrap(transform) {
        return new _APIPromise(this.responsePromise, async (props) => _addRequestID(transform(await this.parseResponse(props), props), props.response));
      }
      /**
       * Gets the raw `Response` instance instead of parsing the response
       * data.
       *
       * If you want to parse the response body but still get the `Response`
       * instance, you can use {@link withResponse()}.
       *
       * 👋 Getting the wrong TypeScript type for `Response`?
       * Try setting `"moduleResolution": "NodeNext"` if you can,
       * or add one of these imports before your first `import … from 'openai'`:
       * - `import 'openai/shims/node'` (if you're running on Node)
       * - `import 'openai/shims/web'` (otherwise)
       */
      asResponse() {
        return this.responsePromise.then((p) => p.response);
      }
      /**
       * Gets the parsed response data, the raw `Response` instance and the ID of the request,
       * returned via the X-Request-ID header which is useful for debugging requests and reporting
       * issues to OpenAI.
       *
       * If you just want to get the raw `Response` instance without parsing it,
       * you can use {@link asResponse()}.
       *
       *
       * 👋 Getting the wrong TypeScript type for `Response`?
       * Try setting `"moduleResolution": "NodeNext"` if you can,
       * or add one of these imports before your first `import … from 'openai'`:
       * - `import 'openai/shims/node'` (if you're running on Node)
       * - `import 'openai/shims/web'` (otherwise)
       */
      async withResponse() {
        const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
        return { data, response, request_id: response.headers.get("x-request-id") };
      }
      parse() {
        if (!this.parsedPromise) {
          this.parsedPromise = this.responsePromise.then(this.parseResponse);
        }
        return this.parsedPromise;
      }
      then(onfulfilled, onrejected) {
        return this.parse().then(onfulfilled, onrejected);
      }
      catch(onrejected) {
        return this.parse().catch(onrejected);
      }
      finally(onfinally) {
        return this.parse().finally(onfinally);
      }
    };
    exports.APIPromise = APIPromise;
    var APIClient = class {
      constructor({
        baseURL,
        maxRetries = 2,
        timeout = 6e5,
        // 10 minutes
        httpAgent,
        fetch: overriddenFetch
      }) {
        this.baseURL = baseURL;
        this.maxRetries = validatePositiveInteger("maxRetries", maxRetries);
        this.timeout = validatePositiveInteger("timeout", timeout);
        this.httpAgent = httpAgent;
        this.fetch = overriddenFetch != null ? overriddenFetch : index_1.fetch;
      }
      authHeaders(opts) {
        return {};
      }
      /**
       * Override this to add your own default headers, for example:
       *
       *  {
       *    ...super.defaultHeaders(),
       *    Authorization: 'Bearer 123',
       *  }
       */
      defaultHeaders(opts) {
        return __spreadValues(__spreadValues({
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": this.getUserAgent()
        }, getPlatformHeaders()), this.authHeaders(opts));
      }
      /**
       * Override this to add your own headers validation:
       */
      validateHeaders(headers, customHeaders) {
      }
      defaultIdempotencyKey() {
        return `stainless-node-retry-${uuid4()}`;
      }
      get(path, opts) {
        return this.methodRequest("get", path, opts);
      }
      post(path, opts) {
        return this.methodRequest("post", path, opts);
      }
      patch(path, opts) {
        return this.methodRequest("patch", path, opts);
      }
      put(path, opts) {
        return this.methodRequest("put", path, opts);
      }
      delete(path, opts) {
        return this.methodRequest("delete", path, opts);
      }
      methodRequest(method, path, opts) {
        return this.request(Promise.resolve(opts).then(async (opts2) => {
          const body = opts2 && (0, uploads_1.isBlobLike)(opts2 == null ? void 0 : opts2.body) ? new DataView(await opts2.body.arrayBuffer()) : (opts2 == null ? void 0 : opts2.body) instanceof DataView ? opts2.body : (opts2 == null ? void 0 : opts2.body) instanceof ArrayBuffer ? new DataView(opts2.body) : opts2 && ArrayBuffer.isView(opts2 == null ? void 0 : opts2.body) ? new DataView(opts2.body.buffer) : opts2 == null ? void 0 : opts2.body;
          return __spreadProps(__spreadValues({ method, path }, opts2), { body });
        }));
      }
      getAPIList(path, Page, opts) {
        return this.requestAPIList(Page, __spreadValues({ method: "get", path }, opts));
      }
      calculateContentLength(body) {
        if (typeof body === "string") {
          if (typeof Buffer !== "undefined") {
            return Buffer.byteLength(body, "utf8").toString();
          }
          if (typeof TextEncoder !== "undefined") {
            const encoder = new TextEncoder();
            const encoded = encoder.encode(body);
            return encoded.length.toString();
          }
        } else if (ArrayBuffer.isView(body)) {
          return body.byteLength.toString();
        }
        return null;
      }
      buildRequest(options, { retryCount = 0 } = {}) {
        var _a, _b, _c, _d, _e, _f;
        const { method, path, query, headers = {} } = options;
        const body = ArrayBuffer.isView(options.body) || options.__binaryRequest && typeof options.body === "string" ? options.body : (0, uploads_1.isMultipartBody)(options.body) ? options.body.body : options.body ? JSON.stringify(options.body, null, 2) : null;
        const contentLength = this.calculateContentLength(body);
        const url = this.buildURL(path, query);
        if ("timeout" in options)
          validatePositiveInteger("timeout", options.timeout);
        const timeout = (_a = options.timeout) != null ? _a : this.timeout;
        const httpAgent = (_c = (_b = options.httpAgent) != null ? _b : this.httpAgent) != null ? _c : (0, index_1.getDefaultAgent)(url);
        const minAgentTimeout = timeout + 1e3;
        if (typeof ((_d = httpAgent == null ? void 0 : httpAgent.options) == null ? void 0 : _d.timeout) === "number" && minAgentTimeout > ((_e = httpAgent.options.timeout) != null ? _e : 0)) {
          httpAgent.options.timeout = minAgentTimeout;
        }
        if (this.idempotencyHeader && method !== "get") {
          if (!options.idempotencyKey)
            options.idempotencyKey = this.defaultIdempotencyKey();
          headers[this.idempotencyHeader] = options.idempotencyKey;
        }
        const reqHeaders = this.buildHeaders({ options, headers, contentLength, retryCount });
        const req = __spreadProps(__spreadValues(__spreadProps(__spreadValues({
          method
        }, body && { body }), {
          headers: reqHeaders
        }), httpAgent && { agent: httpAgent }), {
          // @ts-ignore node-fetch uses a custom AbortSignal type that is
          // not compatible with standard web types
          signal: (_f = options.signal) != null ? _f : null
        });
        return { req, url, timeout };
      }
      buildHeaders({ options, headers, contentLength, retryCount }) {
        const reqHeaders = {};
        if (contentLength) {
          reqHeaders["content-length"] = contentLength;
        }
        const defaultHeaders = this.defaultHeaders(options);
        applyHeadersMut(reqHeaders, defaultHeaders);
        applyHeadersMut(reqHeaders, headers);
        if ((0, uploads_1.isMultipartBody)(options.body) && index_1.kind !== "node") {
          delete reqHeaders["content-type"];
        }
        if ((0, exports.getHeader)(defaultHeaders, "x-stainless-retry-count") === void 0 && (0, exports.getHeader)(headers, "x-stainless-retry-count") === void 0) {
          reqHeaders["x-stainless-retry-count"] = String(retryCount);
        }
        this.validateHeaders(reqHeaders, headers);
        return reqHeaders;
      }
      /**
       * Used as a callback for mutating the given `FinalRequestOptions` object.
       */
      async prepareOptions(options) {
      }
      /**
       * Used as a callback for mutating the given `RequestInit` object.
       *
       * This is useful for cases where you want to add certain headers based off of
       * the request properties, e.g. `method` or `url`.
       */
      async prepareRequest(request, { url, options }) {
      }
      parseHeaders(headers) {
        return !headers ? {} : Symbol.iterator in headers ? Object.fromEntries(Array.from(headers).map((header) => [...header])) : __spreadValues({}, headers);
      }
      makeStatusError(status, error, message, headers) {
        return error_1.APIError.generate(status, error, message, headers);
      }
      request(options, remainingRetries = null) {
        return new APIPromise(this.makeRequest(options, remainingRetries));
      }
      async makeRequest(optionsInput, retriesRemaining) {
        var _a, _b, _c;
        const options = await optionsInput;
        const maxRetries = (_a = options.maxRetries) != null ? _a : this.maxRetries;
        if (retriesRemaining == null) {
          retriesRemaining = maxRetries;
        }
        await this.prepareOptions(options);
        const { req, url, timeout } = this.buildRequest(options, { retryCount: maxRetries - retriesRemaining });
        await this.prepareRequest(req, { url, options });
        debug("request", url, options, req.headers);
        if ((_b = options.signal) == null ? void 0 : _b.aborted) {
          throw new error_1.APIUserAbortError();
        }
        const controller = new AbortController();
        const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(exports.castToError);
        if (response instanceof Error) {
          if ((_c = options.signal) == null ? void 0 : _c.aborted) {
            throw new error_1.APIUserAbortError();
          }
          if (retriesRemaining) {
            return this.retryRequest(options, retriesRemaining);
          }
          if (response.name === "AbortError") {
            throw new error_1.APIConnectionTimeoutError();
          }
          throw new error_1.APIConnectionError({ cause: response });
        }
        const responseHeaders = (0, exports.createResponseHeaders)(response.headers);
        if (!response.ok) {
          if (retriesRemaining && this.shouldRetry(response)) {
            const retryMessage2 = `retrying, ${retriesRemaining} attempts remaining`;
            debug(`response (error; ${retryMessage2})`, response.status, url, responseHeaders);
            return this.retryRequest(options, retriesRemaining, responseHeaders);
          }
          const errText = await response.text().catch((e) => (0, exports.castToError)(e).message);
          const errJSON = (0, exports.safeJSON)(errText);
          const errMessage = errJSON ? void 0 : errText;
          const retryMessage = retriesRemaining ? `(error; no more retries left)` : `(error; not retryable)`;
          debug(`response (error; ${retryMessage})`, response.status, url, responseHeaders, errMessage);
          const err = this.makeStatusError(response.status, errJSON, errMessage, responseHeaders);
          throw err;
        }
        return { response, options, controller };
      }
      requestAPIList(Page, options) {
        const request = this.makeRequest(options, null);
        return new PagePromise(this, request, Page);
      }
      buildURL(path, query) {
        const url = isAbsoluteURL(path) ? new URL(path) : new URL(this.baseURL + (this.baseURL.endsWith("/") && path.startsWith("/") ? path.slice(1) : path));
        const defaultQuery = this.defaultQuery();
        if (!isEmptyObj(defaultQuery)) {
          query = __spreadValues(__spreadValues({}, defaultQuery), query);
        }
        if (typeof query === "object" && query && !Array.isArray(query)) {
          url.search = this.stringifyQuery(query);
        }
        return url.toString();
      }
      stringifyQuery(query) {
        return Object.entries(query).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
          if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          }
          if (value === null) {
            return `${encodeURIComponent(key)}=`;
          }
          throw new error_1.OpenAIError(`Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
        }).join("&");
      }
      async fetchWithTimeout(url, init, ms, controller) {
        const _a = init || {}, { signal } = _a, options = __objRest(_a, ["signal"]);
        if (signal)
          signal.addEventListener("abort", () => controller.abort());
        const timeout = setTimeout(() => controller.abort(), ms);
        const fetchOptions = __spreadValues({
          signal: controller.signal
        }, options);
        if (fetchOptions.method) {
          fetchOptions.method = fetchOptions.method.toUpperCase();
        }
        return (
          // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
          this.fetch.call(void 0, url, fetchOptions).finally(() => {
            clearTimeout(timeout);
          })
        );
      }
      shouldRetry(response) {
        const shouldRetryHeader = response.headers.get("x-should-retry");
        if (shouldRetryHeader === "true")
          return true;
        if (shouldRetryHeader === "false")
          return false;
        if (response.status === 408)
          return true;
        if (response.status === 409)
          return true;
        if (response.status === 429)
          return true;
        if (response.status >= 500)
          return true;
        return false;
      }
      async retryRequest(options, retriesRemaining, responseHeaders) {
        var _a;
        let timeoutMillis;
        const retryAfterMillisHeader = responseHeaders == null ? void 0 : responseHeaders["retry-after-ms"];
        if (retryAfterMillisHeader) {
          const timeoutMs = parseFloat(retryAfterMillisHeader);
          if (!Number.isNaN(timeoutMs)) {
            timeoutMillis = timeoutMs;
          }
        }
        const retryAfterHeader = responseHeaders == null ? void 0 : responseHeaders["retry-after"];
        if (retryAfterHeader && !timeoutMillis) {
          const timeoutSeconds = parseFloat(retryAfterHeader);
          if (!Number.isNaN(timeoutSeconds)) {
            timeoutMillis = timeoutSeconds * 1e3;
          } else {
            timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
          }
        }
        if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1e3)) {
          const maxRetries = (_a = options.maxRetries) != null ? _a : this.maxRetries;
          timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
        }
        await (0, exports.sleep)(timeoutMillis);
        return this.makeRequest(options, retriesRemaining - 1);
      }
      calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
        const initialRetryDelay = 0.5;
        const maxRetryDelay = 8;
        const numRetries = maxRetries - retriesRemaining;
        const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
        const jitter = 1 - Math.random() * 0.25;
        return sleepSeconds * jitter * 1e3;
      }
      getUserAgent() {
        return `${this.constructor.name}/JS ${version_1.VERSION}`;
      }
    };
    exports.APIClient = APIClient;
    var AbstractPage = class {
      constructor(client, response, body, options) {
        _AbstractPage_client.set(this, void 0);
        __classPrivateFieldSet(this, _AbstractPage_client, client, "f");
        this.options = options;
        this.response = response;
        this.body = body;
      }
      hasNextPage() {
        const items = this.getPaginatedItems();
        if (!items.length)
          return false;
        return this.nextPageInfo() != null;
      }
      async getNextPage() {
        const nextInfo = this.nextPageInfo();
        if (!nextInfo) {
          throw new error_1.OpenAIError("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
        }
        const nextOptions = __spreadValues({}, this.options);
        if ("params" in nextInfo && typeof nextOptions.query === "object") {
          nextOptions.query = __spreadValues(__spreadValues({}, nextOptions.query), nextInfo.params);
        } else if ("url" in nextInfo) {
          const params = [...Object.entries(nextOptions.query || {}), ...nextInfo.url.searchParams.entries()];
          for (const [key, value] of params) {
            nextInfo.url.searchParams.set(key, value);
          }
          nextOptions.query = void 0;
          nextOptions.path = nextInfo.url.toString();
        }
        return await __classPrivateFieldGet(this, _AbstractPage_client, "f").requestAPIList(this.constructor, nextOptions);
      }
      iterPages() {
        return __asyncGenerator(this, null, function* () {
          let page = this;
          yield page;
          while (page.hasNextPage()) {
            page = yield new __await(page.getNextPage());
            yield page;
          }
        });
      }
      [(_AbstractPage_client = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
        return __asyncGenerator(this, null, function* () {
          try {
            for (var iter = __forAwait(this.iterPages()), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
              const page = temp.value;
              for (const item of page.getPaginatedItems()) {
                yield item;
              }
            }
          } catch (temp) {
            error = [temp];
          } finally {
            try {
              more && (temp = iter.return) && (yield new __await(temp.call(iter)));
            } finally {
              if (error)
                throw error[0];
            }
          }
        });
      }
    };
    exports.AbstractPage = AbstractPage;
    var PagePromise = class extends APIPromise {
      constructor(client, request, Page) {
        super(request, async (props) => new Page(client, props.response, await defaultParseResponse(props), props.options));
      }
      /**
       * Allow auto-paginating iteration on an unawaited list call, eg:
       *
       *    for await (const item of client.items.list()) {
       *      console.log(item)
       *    }
       */
      [Symbol.asyncIterator]() {
        return __asyncGenerator(this, null, function* () {
          const page = yield new __await(this);
          try {
            for (var iter = __forAwait(page), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
              const item = temp.value;
              yield item;
            }
          } catch (temp) {
            error = [temp];
          } finally {
            try {
              more && (temp = iter.return) && (yield new __await(temp.call(iter)));
            } finally {
              if (error)
                throw error[0];
            }
          }
        });
      }
    };
    exports.PagePromise = PagePromise;
    var createResponseHeaders = (headers) => {
      return new Proxy(Object.fromEntries(
        // @ts-ignore
        headers.entries()
      ), {
        get(target, name) {
          const key = name.toString();
          return target[key.toLowerCase()] || target[key];
        }
      });
    };
    exports.createResponseHeaders = createResponseHeaders;
    var requestOptionsKeys = {
      method: true,
      path: true,
      query: true,
      body: true,
      headers: true,
      maxRetries: true,
      stream: true,
      timeout: true,
      httpAgent: true,
      signal: true,
      idempotencyKey: true,
      __binaryRequest: true,
      __binaryResponse: true,
      __streamClass: true
    };
    var isRequestOptions = (obj) => {
      return typeof obj === "object" && obj !== null && !isEmptyObj(obj) && Object.keys(obj).every((k) => hasOwn(requestOptionsKeys, k));
    };
    exports.isRequestOptions = isRequestOptions;
    var getPlatformProperties = () => {
      var _a, _b;
      if (typeof Deno !== "undefined" && Deno.build != null) {
        return {
          "X-Stainless-Lang": "js",
          "X-Stainless-Package-Version": version_1.VERSION,
          "X-Stainless-OS": normalizePlatform(Deno.build.os),
          "X-Stainless-Arch": normalizeArch(Deno.build.arch),
          "X-Stainless-Runtime": "deno",
          "X-Stainless-Runtime-Version": typeof Deno.version === "string" ? Deno.version : (_b = (_a = Deno.version) == null ? void 0 : _a.deno) != null ? _b : "unknown"
        };
      }
      if (typeof EdgeRuntime !== "undefined") {
        return {
          "X-Stainless-Lang": "js",
          "X-Stainless-Package-Version": version_1.VERSION,
          "X-Stainless-OS": "Unknown",
          "X-Stainless-Arch": `other:${EdgeRuntime}`,
          "X-Stainless-Runtime": "edge",
          "X-Stainless-Runtime-Version": process.version
        };
      }
      if (Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]") {
        return {
          "X-Stainless-Lang": "js",
          "X-Stainless-Package-Version": version_1.VERSION,
          "X-Stainless-OS": normalizePlatform(process.platform),
          "X-Stainless-Arch": normalizeArch(process.arch),
          "X-Stainless-Runtime": "node",
          "X-Stainless-Runtime-Version": process.version
        };
      }
      const browserInfo = getBrowserInfo();
      if (browserInfo) {
        return {
          "X-Stainless-Lang": "js",
          "X-Stainless-Package-Version": version_1.VERSION,
          "X-Stainless-OS": "Unknown",
          "X-Stainless-Arch": "unknown",
          "X-Stainless-Runtime": `browser:${browserInfo.browser}`,
          "X-Stainless-Runtime-Version": browserInfo.version
        };
      }
      return {
        "X-Stainless-Lang": "js",
        "X-Stainless-Package-Version": version_1.VERSION,
        "X-Stainless-OS": "Unknown",
        "X-Stainless-Arch": "unknown",
        "X-Stainless-Runtime": "unknown",
        "X-Stainless-Runtime-Version": "unknown"
      };
    };
    function getBrowserInfo() {
      if (typeof navigator === "undefined" || !navigator) {
        return null;
      }
      const browserPatterns = [
        { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
        { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
        { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
        { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
        { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
        { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
      ];
      for (const { key, pattern } of browserPatterns) {
        const match = pattern.exec(navigator.userAgent);
        if (match) {
          const major = match[1] || 0;
          const minor = match[2] || 0;
          const patch = match[3] || 0;
          return { browser: key, version: `${major}.${minor}.${patch}` };
        }
      }
      return null;
    }
    var normalizeArch = (arch) => {
      if (arch === "x32")
        return "x32";
      if (arch === "x86_64" || arch === "x64")
        return "x64";
      if (arch === "arm")
        return "arm";
      if (arch === "aarch64" || arch === "arm64")
        return "arm64";
      if (arch)
        return `other:${arch}`;
      return "unknown";
    };
    var normalizePlatform = (platform) => {
      platform = platform.toLowerCase();
      if (platform.includes("ios"))
        return "iOS";
      if (platform === "android")
        return "Android";
      if (platform === "darwin")
        return "MacOS";
      if (platform === "win32")
        return "Windows";
      if (platform === "freebsd")
        return "FreeBSD";
      if (platform === "openbsd")
        return "OpenBSD";
      if (platform === "linux")
        return "Linux";
      if (platform)
        return `Other:${platform}`;
      return "Unknown";
    };
    var _platformHeaders;
    var getPlatformHeaders = () => {
      return _platformHeaders != null ? _platformHeaders : _platformHeaders = getPlatformProperties();
    };
    var safeJSON = (text) => {
      try {
        return JSON.parse(text);
      } catch (err) {
        return void 0;
      }
    };
    exports.safeJSON = safeJSON;
    var startsWithSchemeRegexp = /^[a-z][a-z0-9+.-]*:/i;
    var isAbsoluteURL = (url) => {
      return startsWithSchemeRegexp.test(url);
    };
    var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    exports.sleep = sleep;
    var validatePositiveInteger = (name, n) => {
      if (typeof n !== "number" || !Number.isInteger(n)) {
        throw new error_1.OpenAIError(`${name} must be an integer`);
      }
      if (n < 0) {
        throw new error_1.OpenAIError(`${name} must be a positive integer`);
      }
      return n;
    };
    var castToError = (err) => {
      if (err instanceof Error)
        return err;
      if (typeof err === "object" && err !== null) {
        try {
          return new Error(JSON.stringify(err));
        } catch (e) {
        }
      }
      return new Error(err);
    };
    exports.castToError = castToError;
    var ensurePresent = (value) => {
      if (value == null)
        throw new error_1.OpenAIError(`Expected a value to be given but received ${value} instead.`);
      return value;
    };
    exports.ensurePresent = ensurePresent;
    var readEnv = (env) => {
      var _a, _b, _c, _d, _e, _f;
      if (typeof process !== "undefined") {
        return (_c = (_b = (_a = process.env) == null ? void 0 : _a[env]) == null ? void 0 : _b.trim()) != null ? _c : void 0;
      }
      if (typeof Deno !== "undefined") {
        return (_f = (_e = (_d = Deno.env) == null ? void 0 : _d.get) == null ? void 0 : _e.call(_d, env)) == null ? void 0 : _f.trim();
      }
      return void 0;
    };
    exports.readEnv = readEnv;
    var coerceInteger = (value) => {
      if (typeof value === "number")
        return Math.round(value);
      if (typeof value === "string")
        return parseInt(value, 10);
      throw new error_1.OpenAIError(`Could not coerce ${value} (type: ${typeof value}) into a number`);
    };
    exports.coerceInteger = coerceInteger;
    var coerceFloat = (value) => {
      if (typeof value === "number")
        return value;
      if (typeof value === "string")
        return parseFloat(value);
      throw new error_1.OpenAIError(`Could not coerce ${value} (type: ${typeof value}) into a number`);
    };
    exports.coerceFloat = coerceFloat;
    var coerceBoolean = (value) => {
      if (typeof value === "boolean")
        return value;
      if (typeof value === "string")
        return value === "true";
      return Boolean(value);
    };
    exports.coerceBoolean = coerceBoolean;
    var maybeCoerceInteger = (value) => {
      if (value === void 0) {
        return void 0;
      }
      return (0, exports.coerceInteger)(value);
    };
    exports.maybeCoerceInteger = maybeCoerceInteger;
    var maybeCoerceFloat = (value) => {
      if (value === void 0) {
        return void 0;
      }
      return (0, exports.coerceFloat)(value);
    };
    exports.maybeCoerceFloat = maybeCoerceFloat;
    var maybeCoerceBoolean = (value) => {
      if (value === void 0) {
        return void 0;
      }
      return (0, exports.coerceBoolean)(value);
    };
    exports.maybeCoerceBoolean = maybeCoerceBoolean;
    function isEmptyObj(obj) {
      if (!obj)
        return true;
      for (const _k in obj)
        return false;
      return true;
    }
    exports.isEmptyObj = isEmptyObj;
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
    exports.hasOwn = hasOwn;
    function applyHeadersMut(targetHeaders, newHeaders) {
      for (const k in newHeaders) {
        if (!hasOwn(newHeaders, k))
          continue;
        const lowerKey = k.toLowerCase();
        if (!lowerKey)
          continue;
        const val = newHeaders[k];
        if (val === null) {
          delete targetHeaders[lowerKey];
        } else if (val !== void 0) {
          targetHeaders[lowerKey] = val;
        }
      }
    }
    function debug(action, ...args) {
      var _a;
      if (typeof process !== "undefined" && ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a["DEBUG"]) === "true") {
        console.log(`OpenAI:DEBUG:${action}`, ...args);
      }
    }
    exports.debug = debug;
    var uuid4 = () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    };
    var isRunningInBrowser = () => {
      return (
        // @ts-ignore
        typeof window !== "undefined" && // @ts-ignore
        typeof window.document !== "undefined" && // @ts-ignore
        typeof navigator !== "undefined"
      );
    };
    exports.isRunningInBrowser = isRunningInBrowser;
    var isHeadersProtocol = (headers) => {
      return typeof (headers == null ? void 0 : headers.get) === "function";
    };
    exports.isHeadersProtocol = isHeadersProtocol;
    var getRequiredHeader = (headers, header) => {
      const foundHeader = (0, exports.getHeader)(headers, header);
      if (foundHeader === void 0) {
        throw new Error(`Could not find ${header} header`);
      }
      return foundHeader;
    };
    exports.getRequiredHeader = getRequiredHeader;
    var getHeader = (headers, header) => {
      var _a;
      const lowerCasedHeader = header.toLowerCase();
      if ((0, exports.isHeadersProtocol)(headers)) {
        const intercapsHeader = ((_a = header[0]) == null ? void 0 : _a.toUpperCase()) + header.substring(1).replace(/([^\w])(\w)/g, (_m, g1, g2) => g1 + g2.toUpperCase());
        for (const key of [header, lowerCasedHeader, header.toUpperCase(), intercapsHeader]) {
          const value = headers.get(key);
          if (value) {
            return value;
          }
        }
      }
      for (const [key, value] of Object.entries(headers)) {
        if (key.toLowerCase() === lowerCasedHeader) {
          if (Array.isArray(value)) {
            if (value.length <= 1)
              return value[0];
            console.warn(`Received ${value.length} entries for the ${header} header, using the first entry.`);
            return value[0];
          }
          return value;
        }
      }
      return void 0;
    };
    exports.getHeader = getHeader;
    var toBase64 = (str) => {
      if (!str)
        return "";
      if (typeof Buffer !== "undefined") {
        return Buffer.from(str).toString("base64");
      }
      if (typeof btoa !== "undefined") {
        return btoa(str);
      }
      throw new error_1.OpenAIError("Cannot generate b64 string; Expected `Buffer` or `btoa` to be defined");
    };
    exports.toBase64 = toBase64;
    function isObj(obj) {
      return obj != null && typeof obj === "object" && !Array.isArray(obj);
    }
    exports.isObj = isObj;
  }
});

// node_modules/openai/pagination.js
var require_pagination = __commonJS({
  "node_modules/openai/pagination.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CursorPage = exports.Page = void 0;
    var core_1 = require_core();
    var Page = class extends core_1.AbstractPage {
      constructor(client, response, body, options) {
        super(client, response, body, options);
        this.data = body.data || [];
        this.object = body.object;
      }
      getPaginatedItems() {
        var _a;
        return (_a = this.data) != null ? _a : [];
      }
      // @deprecated Please use `nextPageInfo()` instead
      /**
       * This page represents a response that isn't actually paginated at the API level
       * so there will never be any next page params.
       */
      nextPageParams() {
        return null;
      }
      nextPageInfo() {
        return null;
      }
    };
    exports.Page = Page;
    var CursorPage = class extends core_1.AbstractPage {
      constructor(client, response, body, options) {
        super(client, response, body, options);
        this.data = body.data || [];
      }
      getPaginatedItems() {
        var _a;
        return (_a = this.data) != null ? _a : [];
      }
      // @deprecated Please use `nextPageInfo()` instead
      nextPageParams() {
        const info = this.nextPageInfo();
        if (!info)
          return null;
        if ("params" in info)
          return info.params;
        const params = Object.fromEntries(info.url.searchParams);
        if (!Object.keys(params).length)
          return null;
        return params;
      }
      nextPageInfo() {
        var _a;
        const data = this.getPaginatedItems();
        if (!data.length) {
          return null;
        }
        const id = (_a = data[data.length - 1]) == null ? void 0 : _a.id;
        if (!id) {
          return null;
        }
        return { params: { after: id } };
      }
    };
    exports.CursorPage = CursorPage;
  }
});

// node_modules/openai/resource.js
var require_resource = __commonJS({
  "node_modules/openai/resource.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.APIResource = void 0;
    var APIResource = class {
      constructor(client) {
        this._client = client;
      }
    };
    exports.APIResource = APIResource;
  }
});

// node_modules/openai/resources/chat/completions.js
var require_completions = __commonJS({
  "node_modules/openai/resources/chat/completions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Completions = void 0;
    var resource_1 = require_resource();
    var Completions = class extends resource_1.APIResource {
      create(body, options) {
        var _a;
        return this._client.post("/chat/completions", __spreadProps(__spreadValues({ body }, options), { stream: (_a = body.stream) != null ? _a : false }));
      }
    };
    exports.Completions = Completions;
  }
});

// node_modules/openai/resources/chat/chat.js
var require_chat = __commonJS({
  "node_modules/openai/resources/chat/chat.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Chat = void 0;
    var resource_1 = require_resource();
    var CompletionsAPI = __importStar(require_completions());
    var completions_1 = require_completions();
    var Chat = class extends resource_1.APIResource {
      constructor() {
        super(...arguments);
        this.completions = new CompletionsAPI.Completions(this._client);
      }
    };
    exports.Chat = Chat;
    Chat.Completions = completions_1.Completions;
  }
});

// node_modules/openai/resources/chat/index.js
var require_chat2 = __commonJS({
  "node_modules/openai/resources/chat/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Completions = exports.Chat = void 0;
    var chat_1 = require_chat();
    Object.defineProperty(exports, "Chat", { enumerable: true, get: function() {
      return chat_1.Chat;
    } });
    var completions_1 = require_completions();
    Object.defineProperty(exports, "Completions", { enumerable: true, get: function() {
      return completions_1.Completions;
    } });
  }
});

// node_modules/openai/resources/shared.js
var require_shared = __commonJS({
  "node_modules/openai/resources/shared.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/openai/resources/audio/speech.js
var require_speech = __commonJS({
  "node_modules/openai/resources/audio/speech.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Speech = void 0;
    var resource_1 = require_resource();
    var Speech = class extends resource_1.APIResource {
      /**
       * Generates audio from the input text.
       */
      create(body, options) {
        return this._client.post("/audio/speech", __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ Accept: "application/octet-stream" }, options == null ? void 0 : options.headers),
          __binaryResponse: true
        }));
      }
    };
    exports.Speech = Speech;
  }
});

// node_modules/openai/resources/audio/transcriptions.js
var require_transcriptions = __commonJS({
  "node_modules/openai/resources/audio/transcriptions.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Transcriptions = void 0;
    var resource_1 = require_resource();
    var Core = __importStar(require_core());
    var Transcriptions = class extends resource_1.APIResource {
      create(body, options) {
        return this._client.post("/audio/transcriptions", Core.multipartFormRequestOptions(__spreadValues({ body }, options)));
      }
    };
    exports.Transcriptions = Transcriptions;
  }
});

// node_modules/openai/resources/audio/translations.js
var require_translations = __commonJS({
  "node_modules/openai/resources/audio/translations.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Translations = void 0;
    var resource_1 = require_resource();
    var Core = __importStar(require_core());
    var Translations = class extends resource_1.APIResource {
      create(body, options) {
        return this._client.post("/audio/translations", Core.multipartFormRequestOptions(__spreadValues({ body }, options)));
      }
    };
    exports.Translations = Translations;
  }
});

// node_modules/openai/resources/audio/audio.js
var require_audio = __commonJS({
  "node_modules/openai/resources/audio/audio.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Audio = void 0;
    var resource_1 = require_resource();
    var SpeechAPI = __importStar(require_speech());
    var speech_1 = require_speech();
    var TranscriptionsAPI = __importStar(require_transcriptions());
    var transcriptions_1 = require_transcriptions();
    var TranslationsAPI = __importStar(require_translations());
    var translations_1 = require_translations();
    var Audio = class extends resource_1.APIResource {
      constructor() {
        super(...arguments);
        this.transcriptions = new TranscriptionsAPI.Transcriptions(this._client);
        this.translations = new TranslationsAPI.Translations(this._client);
        this.speech = new SpeechAPI.Speech(this._client);
      }
    };
    exports.Audio = Audio;
    Audio.Transcriptions = transcriptions_1.Transcriptions;
    Audio.Translations = translations_1.Translations;
    Audio.Speech = speech_1.Speech;
  }
});

// node_modules/openai/resources/batches.js
var require_batches = __commonJS({
  "node_modules/openai/resources/batches.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BatchesPage = exports.Batches = void 0;
    var resource_1 = require_resource();
    var core_1 = require_core();
    var pagination_1 = require_pagination();
    var Batches = class extends resource_1.APIResource {
      /**
       * Creates and executes a batch from an uploaded file of requests
       */
      create(body, options) {
        return this._client.post("/batches", __spreadValues({ body }, options));
      }
      /**
       * Retrieves a batch.
       */
      retrieve(batchId, options) {
        return this._client.get(`/batches/${batchId}`, options);
      }
      list(query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/batches", BatchesPage, __spreadValues({ query }, options));
      }
      /**
       * Cancels an in-progress batch. The batch will be in status `cancelling` for up to
       * 10 minutes, before changing to `cancelled`, where it will have partial results
       * (if any) available in the output file.
       */
      cancel(batchId, options) {
        return this._client.post(`/batches/${batchId}/cancel`, options);
      }
    };
    exports.Batches = Batches;
    var BatchesPage = class extends pagination_1.CursorPage {
    };
    exports.BatchesPage = BatchesPage;
    Batches.BatchesPage = BatchesPage;
  }
});

// node_modules/openai/resources/beta/assistants.js
var require_assistants = __commonJS({
  "node_modules/openai/resources/beta/assistants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AssistantsPage = exports.Assistants = void 0;
    var resource_1 = require_resource();
    var core_1 = require_core();
    var pagination_1 = require_pagination();
    var Assistants = class extends resource_1.APIResource {
      /**
       * Create an assistant with a model and instructions.
       */
      create(body, options) {
        return this._client.post("/assistants", __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Retrieves an assistant.
       */
      retrieve(assistantId, options) {
        return this._client.get(`/assistants/${assistantId}`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Modifies an assistant.
       */
      update(assistantId, body, options) {
        return this._client.post(`/assistants/${assistantId}`, __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      list(query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/assistants", AssistantsPage, __spreadProps(__spreadValues({
          query
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Delete an assistant.
       */
      del(assistantId, options) {
        return this._client.delete(`/assistants/${assistantId}`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
    };
    exports.Assistants = Assistants;
    var AssistantsPage = class extends pagination_1.CursorPage {
    };
    exports.AssistantsPage = AssistantsPage;
    Assistants.AssistantsPage = AssistantsPage;
  }
});

// node_modules/openai/lib/RunnableFunction.js
var require_RunnableFunction = __commonJS({
  "node_modules/openai/lib/RunnableFunction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParsingToolFunction = exports.ParsingFunction = exports.isRunnableFunctionWithParse = void 0;
    function isRunnableFunctionWithParse(fn) {
      return typeof fn.parse === "function";
    }
    exports.isRunnableFunctionWithParse = isRunnableFunctionWithParse;
    var ParsingFunction = class {
      constructor(input) {
        this.function = input.function;
        this.parse = input.parse;
        this.parameters = input.parameters;
        this.description = input.description;
        this.name = input.name;
      }
    };
    exports.ParsingFunction = ParsingFunction;
    var ParsingToolFunction = class {
      constructor(input) {
        this.type = "function";
        this.function = input;
      }
    };
    exports.ParsingToolFunction = ParsingToolFunction;
  }
});

// node_modules/openai/lib/chatCompletionUtils.js
var require_chatCompletionUtils = __commonJS({
  "node_modules/openai/lib/chatCompletionUtils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPresent = exports.isToolMessage = exports.isFunctionMessage = exports.isAssistantMessage = void 0;
    var isAssistantMessage = (message) => {
      return (message == null ? void 0 : message.role) === "assistant";
    };
    exports.isAssistantMessage = isAssistantMessage;
    var isFunctionMessage = (message) => {
      return (message == null ? void 0 : message.role) === "function";
    };
    exports.isFunctionMessage = isFunctionMessage;
    var isToolMessage = (message) => {
      return (message == null ? void 0 : message.role) === "tool";
    };
    exports.isToolMessage = isToolMessage;
    function isPresent(obj) {
      return obj != null;
    }
    exports.isPresent = isPresent;
  }
});

// node_modules/openai/lib/EventStream.js
var require_EventStream = __commonJS({
  "node_modules/openai/lib/EventStream.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _EventStream_instances;
    var _EventStream_connectedPromise;
    var _EventStream_resolveConnectedPromise;
    var _EventStream_rejectConnectedPromise;
    var _EventStream_endPromise;
    var _EventStream_resolveEndPromise;
    var _EventStream_rejectEndPromise;
    var _EventStream_listeners;
    var _EventStream_ended;
    var _EventStream_errored;
    var _EventStream_aborted;
    var _EventStream_catchingPromiseCreated;
    var _EventStream_handleError;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventStream = void 0;
    var error_1 = require_error();
    var EventStream = class {
      constructor() {
        _EventStream_instances.add(this);
        this.controller = new AbortController();
        _EventStream_connectedPromise.set(this, void 0);
        _EventStream_resolveConnectedPromise.set(this, () => {
        });
        _EventStream_rejectConnectedPromise.set(this, () => {
        });
        _EventStream_endPromise.set(this, void 0);
        _EventStream_resolveEndPromise.set(this, () => {
        });
        _EventStream_rejectEndPromise.set(this, () => {
        });
        _EventStream_listeners.set(this, {});
        _EventStream_ended.set(this, false);
        _EventStream_errored.set(this, false);
        _EventStream_aborted.set(this, false);
        _EventStream_catchingPromiseCreated.set(this, false);
        __classPrivateFieldSet(this, _EventStream_connectedPromise, new Promise((resolve, reject) => {
          __classPrivateFieldSet(this, _EventStream_resolveConnectedPromise, resolve, "f");
          __classPrivateFieldSet(this, _EventStream_rejectConnectedPromise, reject, "f");
        }), "f");
        __classPrivateFieldSet(this, _EventStream_endPromise, new Promise((resolve, reject) => {
          __classPrivateFieldSet(this, _EventStream_resolveEndPromise, resolve, "f");
          __classPrivateFieldSet(this, _EventStream_rejectEndPromise, reject, "f");
        }), "f");
        __classPrivateFieldGet(this, _EventStream_connectedPromise, "f").catch(() => {
        });
        __classPrivateFieldGet(this, _EventStream_endPromise, "f").catch(() => {
        });
      }
      _run(executor) {
        setTimeout(() => {
          executor().then(() => {
            this._emitFinal();
            this._emit("end");
          }, __classPrivateFieldGet(this, _EventStream_instances, "m", _EventStream_handleError).bind(this));
        }, 0);
      }
      _connected() {
        if (this.ended)
          return;
        __classPrivateFieldGet(this, _EventStream_resolveConnectedPromise, "f").call(this);
        this._emit("connect");
      }
      get ended() {
        return __classPrivateFieldGet(this, _EventStream_ended, "f");
      }
      get errored() {
        return __classPrivateFieldGet(this, _EventStream_errored, "f");
      }
      get aborted() {
        return __classPrivateFieldGet(this, _EventStream_aborted, "f");
      }
      abort() {
        this.controller.abort();
      }
      /**
       * Adds the listener function to the end of the listeners array for the event.
       * No checks are made to see if the listener has already been added. Multiple calls passing
       * the same combination of event and listener will result in the listener being added, and
       * called, multiple times.
       * @returns this ChatCompletionStream, so that calls can be chained
       */
      on(event, listener) {
        const listeners = __classPrivateFieldGet(this, _EventStream_listeners, "f")[event] || (__classPrivateFieldGet(this, _EventStream_listeners, "f")[event] = []);
        listeners.push({ listener });
        return this;
      }
      /**
       * Removes the specified listener from the listener array for the event.
       * off() will remove, at most, one instance of a listener from the listener array. If any single
       * listener has been added multiple times to the listener array for the specified event, then
       * off() must be called multiple times to remove each instance.
       * @returns this ChatCompletionStream, so that calls can be chained
       */
      off(event, listener) {
        const listeners = __classPrivateFieldGet(this, _EventStream_listeners, "f")[event];
        if (!listeners)
          return this;
        const index = listeners.findIndex((l) => l.listener === listener);
        if (index >= 0)
          listeners.splice(index, 1);
        return this;
      }
      /**
       * Adds a one-time listener function for the event. The next time the event is triggered,
       * this listener is removed and then invoked.
       * @returns this ChatCompletionStream, so that calls can be chained
       */
      once(event, listener) {
        const listeners = __classPrivateFieldGet(this, _EventStream_listeners, "f")[event] || (__classPrivateFieldGet(this, _EventStream_listeners, "f")[event] = []);
        listeners.push({ listener, once: true });
        return this;
      }
      /**
       * This is similar to `.once()`, but returns a Promise that resolves the next time
       * the event is triggered, instead of calling a listener callback.
       * @returns a Promise that resolves the next time given event is triggered,
       * or rejects if an error is emitted.  (If you request the 'error' event,
       * returns a promise that resolves with the error).
       *
       * Example:
       *
       *   const message = await stream.emitted('message') // rejects if the stream errors
       */
      emitted(event) {
        return new Promise((resolve, reject) => {
          __classPrivateFieldSet(this, _EventStream_catchingPromiseCreated, true, "f");
          if (event !== "error")
            this.once("error", reject);
          this.once(event, resolve);
        });
      }
      async done() {
        __classPrivateFieldSet(this, _EventStream_catchingPromiseCreated, true, "f");
        await __classPrivateFieldGet(this, _EventStream_endPromise, "f");
      }
      _emit(event, ...args) {
        if (__classPrivateFieldGet(this, _EventStream_ended, "f")) {
          return;
        }
        if (event === "end") {
          __classPrivateFieldSet(this, _EventStream_ended, true, "f");
          __classPrivateFieldGet(this, _EventStream_resolveEndPromise, "f").call(this);
        }
        const listeners = __classPrivateFieldGet(this, _EventStream_listeners, "f")[event];
        if (listeners) {
          __classPrivateFieldGet(this, _EventStream_listeners, "f")[event] = listeners.filter((l) => !l.once);
          listeners.forEach(({ listener }) => listener(...args));
        }
        if (event === "abort") {
          const error = args[0];
          if (!__classPrivateFieldGet(this, _EventStream_catchingPromiseCreated, "f") && !(listeners == null ? void 0 : listeners.length)) {
            Promise.reject(error);
          }
          __classPrivateFieldGet(this, _EventStream_rejectConnectedPromise, "f").call(this, error);
          __classPrivateFieldGet(this, _EventStream_rejectEndPromise, "f").call(this, error);
          this._emit("end");
          return;
        }
        if (event === "error") {
          const error = args[0];
          if (!__classPrivateFieldGet(this, _EventStream_catchingPromiseCreated, "f") && !(listeners == null ? void 0 : listeners.length)) {
            Promise.reject(error);
          }
          __classPrivateFieldGet(this, _EventStream_rejectConnectedPromise, "f").call(this, error);
          __classPrivateFieldGet(this, _EventStream_rejectEndPromise, "f").call(this, error);
          this._emit("end");
        }
      }
      _emitFinal() {
      }
    };
    exports.EventStream = EventStream;
    _EventStream_connectedPromise = /* @__PURE__ */ new WeakMap(), _EventStream_resolveConnectedPromise = /* @__PURE__ */ new WeakMap(), _EventStream_rejectConnectedPromise = /* @__PURE__ */ new WeakMap(), _EventStream_endPromise = /* @__PURE__ */ new WeakMap(), _EventStream_resolveEndPromise = /* @__PURE__ */ new WeakMap(), _EventStream_rejectEndPromise = /* @__PURE__ */ new WeakMap(), _EventStream_listeners = /* @__PURE__ */ new WeakMap(), _EventStream_ended = /* @__PURE__ */ new WeakMap(), _EventStream_errored = /* @__PURE__ */ new WeakMap(), _EventStream_aborted = /* @__PURE__ */ new WeakMap(), _EventStream_catchingPromiseCreated = /* @__PURE__ */ new WeakMap(), _EventStream_instances = /* @__PURE__ */ new WeakSet(), _EventStream_handleError = function _EventStream_handleError2(error) {
      __classPrivateFieldSet(this, _EventStream_errored, true, "f");
      if (error instanceof Error && error.name === "AbortError") {
        error = new error_1.APIUserAbortError();
      }
      if (error instanceof error_1.APIUserAbortError) {
        __classPrivateFieldSet(this, _EventStream_aborted, true, "f");
        return this._emit("abort", error);
      }
      if (error instanceof error_1.OpenAIError) {
        return this._emit("error", error);
      }
      if (error instanceof Error) {
        const openAIError = new error_1.OpenAIError(error.message);
        openAIError.cause = error;
        return this._emit("error", openAIError);
      }
      return this._emit("error", new error_1.OpenAIError(String(error)));
    };
  }
});

// node_modules/openai/lib/parser.js
var require_parser = __commonJS({
  "node_modules/openai/lib/parser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateInputTools = exports.hasAutoParseableInput = exports.shouldParseToolCall = exports.parseChatCompletion = exports.maybeParseChatCompletion = exports.isAutoParsableTool = exports.makeParseableTool = exports.isAutoParsableResponseFormat = exports.makeParseableResponseFormat = void 0;
    var error_1 = require_error();
    function makeParseableResponseFormat(response_format, parser) {
      const obj = __spreadValues({}, response_format);
      Object.defineProperties(obj, {
        $brand: {
          value: "auto-parseable-response-format",
          enumerable: false
        },
        $parseRaw: {
          value: parser,
          enumerable: false
        }
      });
      return obj;
    }
    exports.makeParseableResponseFormat = makeParseableResponseFormat;
    function isAutoParsableResponseFormat(response_format) {
      return (response_format == null ? void 0 : response_format["$brand"]) === "auto-parseable-response-format";
    }
    exports.isAutoParsableResponseFormat = isAutoParsableResponseFormat;
    function makeParseableTool(tool, { parser, callback }) {
      const obj = __spreadValues({}, tool);
      Object.defineProperties(obj, {
        $brand: {
          value: "auto-parseable-tool",
          enumerable: false
        },
        $parseRaw: {
          value: parser,
          enumerable: false
        },
        $callback: {
          value: callback,
          enumerable: false
        }
      });
      return obj;
    }
    exports.makeParseableTool = makeParseableTool;
    function isAutoParsableTool(tool) {
      return (tool == null ? void 0 : tool["$brand"]) === "auto-parseable-tool";
    }
    exports.isAutoParsableTool = isAutoParsableTool;
    function maybeParseChatCompletion(completion, params) {
      if (!params || !hasAutoParseableInput(params)) {
        return __spreadProps(__spreadValues({}, completion), {
          choices: completion.choices.map((choice) => {
            var _a;
            return __spreadProps(__spreadValues({}, choice), {
              message: __spreadProps(__spreadValues({}, choice.message), { parsed: null, tool_calls: (_a = choice.message.tool_calls) != null ? _a : [] })
            });
          })
        });
      }
      return parseChatCompletion(completion, params);
    }
    exports.maybeParseChatCompletion = maybeParseChatCompletion;
    function parseChatCompletion(completion, params) {
      const choices = completion.choices.map((choice) => {
        var _a, _b;
        if (choice.finish_reason === "length") {
          throw new error_1.LengthFinishReasonError();
        }
        if (choice.finish_reason === "content_filter") {
          throw new error_1.ContentFilterFinishReasonError();
        }
        return __spreadProps(__spreadValues({}, choice), {
          message: __spreadProps(__spreadValues({}, choice.message), {
            tool_calls: (_b = (_a = choice.message.tool_calls) == null ? void 0 : _a.map((toolCall) => parseToolCall(params, toolCall))) != null ? _b : [],
            parsed: choice.message.content && !choice.message.refusal ? parseResponseFormat(params, choice.message.content) : null
          })
        });
      });
      return __spreadProps(__spreadValues({}, completion), { choices });
    }
    exports.parseChatCompletion = parseChatCompletion;
    function parseResponseFormat(params, content) {
      var _a, _b;
      if (((_a = params.response_format) == null ? void 0 : _a.type) !== "json_schema") {
        return null;
      }
      if (((_b = params.response_format) == null ? void 0 : _b.type) === "json_schema") {
        if ("$parseRaw" in params.response_format) {
          const response_format = params.response_format;
          return response_format.$parseRaw(content);
        }
        return JSON.parse(content);
      }
      return null;
    }
    function parseToolCall(params, toolCall) {
      var _a;
      const inputTool = (_a = params.tools) == null ? void 0 : _a.find((inputTool2) => {
        var _a2;
        return ((_a2 = inputTool2.function) == null ? void 0 : _a2.name) === toolCall.function.name;
      });
      return __spreadProps(__spreadValues({}, toolCall), {
        function: __spreadProps(__spreadValues({}, toolCall.function), {
          parsed_arguments: isAutoParsableTool(inputTool) ? inputTool.$parseRaw(toolCall.function.arguments) : (inputTool == null ? void 0 : inputTool.function.strict) ? JSON.parse(toolCall.function.arguments) : null
        })
      });
    }
    function shouldParseToolCall(params, toolCall) {
      var _a;
      if (!params) {
        return false;
      }
      const inputTool = (_a = params.tools) == null ? void 0 : _a.find((inputTool2) => {
        var _a2;
        return ((_a2 = inputTool2.function) == null ? void 0 : _a2.name) === toolCall.function.name;
      });
      return isAutoParsableTool(inputTool) || (inputTool == null ? void 0 : inputTool.function.strict) || false;
    }
    exports.shouldParseToolCall = shouldParseToolCall;
    function hasAutoParseableInput(params) {
      var _a, _b;
      if (isAutoParsableResponseFormat(params.response_format)) {
        return true;
      }
      return (_b = (_a = params.tools) == null ? void 0 : _a.some((t) => isAutoParsableTool(t) || t.type === "function" && t.function.strict === true)) != null ? _b : false;
    }
    exports.hasAutoParseableInput = hasAutoParseableInput;
    function validateInputTools(tools) {
      for (const tool of tools != null ? tools : []) {
        if (tool.type !== "function") {
          throw new error_1.OpenAIError(`Currently only \`function\` tool types support auto-parsing; Received \`${tool.type}\``);
        }
        if (tool.function.strict !== true) {
          throw new error_1.OpenAIError(`The \`${tool.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`);
        }
      }
    }
    exports.validateInputTools = validateInputTools;
  }
});

// node_modules/openai/lib/AbstractChatCompletionRunner.js
var require_AbstractChatCompletionRunner = __commonJS({
  "node_modules/openai/lib/AbstractChatCompletionRunner.js"(exports) {
    "use strict";
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _AbstractChatCompletionRunner_instances;
    var _AbstractChatCompletionRunner_getFinalContent;
    var _AbstractChatCompletionRunner_getFinalMessage;
    var _AbstractChatCompletionRunner_getFinalFunctionCall;
    var _AbstractChatCompletionRunner_getFinalFunctionCallResult;
    var _AbstractChatCompletionRunner_calculateTotalUsage;
    var _AbstractChatCompletionRunner_validateParams;
    var _AbstractChatCompletionRunner_stringifyFunctionCallResult;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractChatCompletionRunner = void 0;
    var error_1 = require_error();
    var RunnableFunction_1 = require_RunnableFunction();
    var chatCompletionUtils_1 = require_chatCompletionUtils();
    var EventStream_1 = require_EventStream();
    var parser_1 = require_parser();
    var DEFAULT_MAX_CHAT_COMPLETIONS = 10;
    var AbstractChatCompletionRunner = class extends EventStream_1.EventStream {
      constructor() {
        super(...arguments);
        _AbstractChatCompletionRunner_instances.add(this);
        this._chatCompletions = [];
        this.messages = [];
      }
      _addChatCompletion(chatCompletion) {
        var _a;
        this._chatCompletions.push(chatCompletion);
        this._emit("chatCompletion", chatCompletion);
        const message = (_a = chatCompletion.choices[0]) == null ? void 0 : _a.message;
        if (message)
          this._addMessage(message);
        return chatCompletion;
      }
      _addMessage(message, emit = true) {
        if (!("content" in message))
          message.content = null;
        this.messages.push(message);
        if (emit) {
          this._emit("message", message);
          if (((0, chatCompletionUtils_1.isFunctionMessage)(message) || (0, chatCompletionUtils_1.isToolMessage)(message)) && message.content) {
            this._emit("functionCallResult", message.content);
          } else if ((0, chatCompletionUtils_1.isAssistantMessage)(message) && message.function_call) {
            this._emit("functionCall", message.function_call);
          } else if ((0, chatCompletionUtils_1.isAssistantMessage)(message) && message.tool_calls) {
            for (const tool_call of message.tool_calls) {
              if (tool_call.type === "function") {
                this._emit("functionCall", tool_call.function);
              }
            }
          }
        }
      }
      /**
       * @returns a promise that resolves with the final ChatCompletion, or rejects
       * if an error occurred or the stream ended prematurely without producing a ChatCompletion.
       */
      async finalChatCompletion() {
        await this.done();
        const completion = this._chatCompletions[this._chatCompletions.length - 1];
        if (!completion)
          throw new error_1.OpenAIError("stream ended without producing a ChatCompletion");
        return completion;
      }
      /**
       * @returns a promise that resolves with the content of the final ChatCompletionMessage, or rejects
       * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
       */
      async finalContent() {
        await this.done();
        return __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
      }
      /**
       * @returns a promise that resolves with the the final assistant ChatCompletionMessage response,
       * or rejects if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
       */
      async finalMessage() {
        await this.done();
        return __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
      }
      /**
       * @returns a promise that resolves with the content of the final FunctionCall, or rejects
       * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
       */
      async finalFunctionCall() {
        await this.done();
        return __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCall).call(this);
      }
      async finalFunctionCallResult() {
        await this.done();
        return __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCallResult).call(this);
      }
      async totalUsage() {
        await this.done();
        return __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this);
      }
      allChatCompletions() {
        return [...this._chatCompletions];
      }
      _emitFinal() {
        const completion = this._chatCompletions[this._chatCompletions.length - 1];
        if (completion)
          this._emit("finalChatCompletion", completion);
        const finalMessage = __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
        if (finalMessage)
          this._emit("finalMessage", finalMessage);
        const finalContent = __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
        if (finalContent)
          this._emit("finalContent", finalContent);
        const finalFunctionCall = __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCall).call(this);
        if (finalFunctionCall)
          this._emit("finalFunctionCall", finalFunctionCall);
        const finalFunctionCallResult = __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCallResult).call(this);
        if (finalFunctionCallResult != null)
          this._emit("finalFunctionCallResult", finalFunctionCallResult);
        if (this._chatCompletions.some((c) => c.usage)) {
          this._emit("totalUsage", __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this));
        }
      }
      async _createChatCompletion(client, params, options) {
        const signal = options == null ? void 0 : options.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_validateParams).call(this, params);
        const chatCompletion = await client.chat.completions.create(__spreadProps(__spreadValues({}, params), { stream: false }), __spreadProps(__spreadValues({}, options), { signal: this.controller.signal }));
        this._connected();
        return this._addChatCompletion((0, parser_1.parseChatCompletion)(chatCompletion, params));
      }
      async _runChatCompletion(client, params, options) {
        for (const message of params.messages) {
          this._addMessage(message, false);
        }
        return await this._createChatCompletion(client, params, options);
      }
      async _runFunctions(client, params, options) {
        var _b;
        const role = "function";
        const _a = params, { function_call = "auto", stream } = _a, restParams = __objRest(_a, ["function_call", "stream"]);
        const singleFunctionToCall = typeof function_call !== "string" && (function_call == null ? void 0 : function_call.name);
        const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS } = options || {};
        const functionsByName = {};
        for (const f of params.functions) {
          functionsByName[f.name || f.function.name] = f;
        }
        const functions = params.functions.map((f) => ({
          name: f.name || f.function.name,
          parameters: f.parameters,
          description: f.description
        }));
        for (const message of params.messages) {
          this._addMessage(message, false);
        }
        for (let i = 0; i < maxChatCompletions; ++i) {
          const chatCompletion = await this._createChatCompletion(client, __spreadProps(__spreadValues({}, restParams), {
            function_call,
            functions,
            messages: [...this.messages]
          }), options);
          const message = (_b = chatCompletion.choices[0]) == null ? void 0 : _b.message;
          if (!message) {
            throw new error_1.OpenAIError(`missing message in ChatCompletion response`);
          }
          if (!message.function_call)
            return;
          const { name, arguments: args } = message.function_call;
          const fn = functionsByName[name];
          if (!fn) {
            const content2 = `Invalid function_call: ${JSON.stringify(name)}. Available options are: ${functions.map((f) => JSON.stringify(f.name)).join(", ")}. Please try again`;
            this._addMessage({ role, name, content: content2 });
            continue;
          } else if (singleFunctionToCall && singleFunctionToCall !== name) {
            const content2 = `Invalid function_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
            this._addMessage({ role, name, content: content2 });
            continue;
          }
          let parsed;
          try {
            parsed = (0, RunnableFunction_1.isRunnableFunctionWithParse)(fn) ? await fn.parse(args) : args;
          } catch (error) {
            this._addMessage({
              role,
              name,
              content: error instanceof Error ? error.message : String(error)
            });
            continue;
          }
          const rawContent = await fn.function(parsed, this);
          const content = __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_stringifyFunctionCallResult).call(this, rawContent);
          this._addMessage({ role, name, content });
          if (singleFunctionToCall)
            return;
        }
      }
      async _runTools(client, params, options) {
        var _b, _c, _d;
        const role = "tool";
        const _a = params, { tool_choice = "auto", stream } = _a, restParams = __objRest(_a, ["tool_choice", "stream"]);
        const singleFunctionToCall = typeof tool_choice !== "string" && ((_b = tool_choice == null ? void 0 : tool_choice.function) == null ? void 0 : _b.name);
        const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS } = options || {};
        const inputTools = params.tools.map((tool) => {
          if ((0, parser_1.isAutoParsableTool)(tool)) {
            if (!tool.$callback) {
              throw new error_1.OpenAIError("Tool given to `.runTools()` that does not have an associated function");
            }
            return {
              type: "function",
              function: {
                function: tool.$callback,
                name: tool.function.name,
                description: tool.function.description || "",
                parameters: tool.function.parameters,
                parse: tool.$parseRaw,
                strict: true
              }
            };
          }
          return tool;
        });
        const functionsByName = {};
        for (const f of inputTools) {
          if (f.type === "function") {
            functionsByName[f.function.name || f.function.function.name] = f.function;
          }
        }
        const tools = "tools" in params ? inputTools.map((t) => t.type === "function" ? {
          type: "function",
          function: {
            name: t.function.name || t.function.function.name,
            parameters: t.function.parameters,
            description: t.function.description,
            strict: t.function.strict
          }
        } : t) : void 0;
        for (const message of params.messages) {
          this._addMessage(message, false);
        }
        for (let i = 0; i < maxChatCompletions; ++i) {
          const chatCompletion = await this._createChatCompletion(client, __spreadProps(__spreadValues({}, restParams), {
            tool_choice,
            tools,
            messages: [...this.messages]
          }), options);
          const message = (_c = chatCompletion.choices[0]) == null ? void 0 : _c.message;
          if (!message) {
            throw new error_1.OpenAIError(`missing message in ChatCompletion response`);
          }
          if (!((_d = message.tool_calls) == null ? void 0 : _d.length)) {
            return;
          }
          for (const tool_call of message.tool_calls) {
            if (tool_call.type !== "function")
              continue;
            const tool_call_id = tool_call.id;
            const { name, arguments: args } = tool_call.function;
            const fn = functionsByName[name];
            if (!fn) {
              const content2 = `Invalid tool_call: ${JSON.stringify(name)}. Available options are: ${Object.keys(functionsByName).map((name2) => JSON.stringify(name2)).join(", ")}. Please try again`;
              this._addMessage({ role, tool_call_id, content: content2 });
              continue;
            } else if (singleFunctionToCall && singleFunctionToCall !== name) {
              const content2 = `Invalid tool_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
              this._addMessage({ role, tool_call_id, content: content2 });
              continue;
            }
            let parsed;
            try {
              parsed = (0, RunnableFunction_1.isRunnableFunctionWithParse)(fn) ? await fn.parse(args) : args;
            } catch (error) {
              const content2 = error instanceof Error ? error.message : String(error);
              this._addMessage({ role, tool_call_id, content: content2 });
              continue;
            }
            const rawContent = await fn.function(parsed, this);
            const content = __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_stringifyFunctionCallResult).call(this, rawContent);
            this._addMessage({ role, tool_call_id, content });
            if (singleFunctionToCall) {
              return;
            }
          }
        }
        return;
      }
    };
    exports.AbstractChatCompletionRunner = AbstractChatCompletionRunner;
    _AbstractChatCompletionRunner_instances = /* @__PURE__ */ new WeakSet(), _AbstractChatCompletionRunner_getFinalContent = function _AbstractChatCompletionRunner_getFinalContent2() {
      var _a;
      return (_a = __classPrivateFieldGet(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this).content) != null ? _a : null;
    }, _AbstractChatCompletionRunner_getFinalMessage = function _AbstractChatCompletionRunner_getFinalMessage2() {
      var _b, _c;
      let i = this.messages.length;
      while (i-- > 0) {
        const message = this.messages[i];
        if ((0, chatCompletionUtils_1.isAssistantMessage)(message)) {
          const _a = message, { function_call } = _a, rest = __objRest(_a, ["function_call"]);
          const ret = __spreadProps(__spreadValues({}, rest), {
            content: (_b = message.content) != null ? _b : null,
            refusal: (_c = message.refusal) != null ? _c : null
          });
          if (function_call) {
            ret.function_call = function_call;
          }
          return ret;
        }
      }
      throw new error_1.OpenAIError("stream ended without producing a ChatCompletionMessage with role=assistant");
    }, _AbstractChatCompletionRunner_getFinalFunctionCall = function _AbstractChatCompletionRunner_getFinalFunctionCall2() {
      var _a, _b;
      for (let i = this.messages.length - 1; i >= 0; i--) {
        const message = this.messages[i];
        if ((0, chatCompletionUtils_1.isAssistantMessage)(message) && (message == null ? void 0 : message.function_call)) {
          return message.function_call;
        }
        if ((0, chatCompletionUtils_1.isAssistantMessage)(message) && ((_a = message == null ? void 0 : message.tool_calls) == null ? void 0 : _a.length)) {
          return (_b = message.tool_calls.at(-1)) == null ? void 0 : _b.function;
        }
      }
      return;
    }, _AbstractChatCompletionRunner_getFinalFunctionCallResult = function _AbstractChatCompletionRunner_getFinalFunctionCallResult2() {
      for (let i = this.messages.length - 1; i >= 0; i--) {
        const message = this.messages[i];
        if ((0, chatCompletionUtils_1.isFunctionMessage)(message) && message.content != null) {
          return message.content;
        }
        if ((0, chatCompletionUtils_1.isToolMessage)(message) && message.content != null && typeof message.content === "string" && this.messages.some((x) => {
          var _a;
          return x.role === "assistant" && ((_a = x.tool_calls) == null ? void 0 : _a.some((y) => y.type === "function" && y.id === message.tool_call_id));
        })) {
          return message.content;
        }
      }
      return;
    }, _AbstractChatCompletionRunner_calculateTotalUsage = function _AbstractChatCompletionRunner_calculateTotalUsage2() {
      const total = {
        completion_tokens: 0,
        prompt_tokens: 0,
        total_tokens: 0
      };
      for (const { usage } of this._chatCompletions) {
        if (usage) {
          total.completion_tokens += usage.completion_tokens;
          total.prompt_tokens += usage.prompt_tokens;
          total.total_tokens += usage.total_tokens;
        }
      }
      return total;
    }, _AbstractChatCompletionRunner_validateParams = function _AbstractChatCompletionRunner_validateParams2(params) {
      if (params.n != null && params.n > 1) {
        throw new error_1.OpenAIError("ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.");
      }
    }, _AbstractChatCompletionRunner_stringifyFunctionCallResult = function _AbstractChatCompletionRunner_stringifyFunctionCallResult2(rawContent) {
      return typeof rawContent === "string" ? rawContent : rawContent === void 0 ? "undefined" : JSON.stringify(rawContent);
    };
  }
});

// node_modules/openai/lib/ChatCompletionRunner.js
var require_ChatCompletionRunner = __commonJS({
  "node_modules/openai/lib/ChatCompletionRunner.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChatCompletionRunner = void 0;
    var AbstractChatCompletionRunner_1 = require_AbstractChatCompletionRunner();
    var chatCompletionUtils_1 = require_chatCompletionUtils();
    var ChatCompletionRunner = class _ChatCompletionRunner extends AbstractChatCompletionRunner_1.AbstractChatCompletionRunner {
      /** @deprecated - please use `runTools` instead. */
      static runFunctions(client, params, options) {
        const runner = new _ChatCompletionRunner();
        const opts = __spreadProps(__spreadValues({}, options), {
          headers: __spreadProps(__spreadValues({}, options == null ? void 0 : options.headers), { "X-Stainless-Helper-Method": "runFunctions" })
        });
        runner._run(() => runner._runFunctions(client, params, opts));
        return runner;
      }
      static runTools(client, params, options) {
        const runner = new _ChatCompletionRunner();
        const opts = __spreadProps(__spreadValues({}, options), {
          headers: __spreadProps(__spreadValues({}, options == null ? void 0 : options.headers), { "X-Stainless-Helper-Method": "runTools" })
        });
        runner._run(() => runner._runTools(client, params, opts));
        return runner;
      }
      _addMessage(message, emit = true) {
        super._addMessage(message, emit);
        if ((0, chatCompletionUtils_1.isAssistantMessage)(message) && message.content) {
          this._emit("content", message.content);
        }
      }
    };
    exports.ChatCompletionRunner = ChatCompletionRunner;
  }
});

// node_modules/openai/_vendor/partial-json-parser/parser.js
var require_parser2 = __commonJS({
  "node_modules/openai/_vendor/partial-json-parser/parser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MalformedJSON = exports.PartialJSON = exports.partialParse = void 0;
    var STR = 1;
    var NUM = 2;
    var ARR = 4;
    var OBJ = 8;
    var NULL = 16;
    var BOOL = 32;
    var NAN = 64;
    var INFINITY = 128;
    var MINUS_INFINITY = 256;
    var INF = INFINITY | MINUS_INFINITY;
    var SPECIAL = NULL | BOOL | INF | NAN;
    var ATOM = STR | NUM | SPECIAL;
    var COLLECTION = ARR | OBJ;
    var ALL = ATOM | COLLECTION;
    var Allow = {
      STR,
      NUM,
      ARR,
      OBJ,
      NULL,
      BOOL,
      NAN,
      INFINITY,
      MINUS_INFINITY,
      INF,
      SPECIAL,
      ATOM,
      COLLECTION,
      ALL
    };
    var PartialJSON = class extends Error {
    };
    exports.PartialJSON = PartialJSON;
    var MalformedJSON = class extends Error {
    };
    exports.MalformedJSON = MalformedJSON;
    function parseJSON(jsonString, allowPartial = Allow.ALL) {
      if (typeof jsonString !== "string") {
        throw new TypeError(`expecting str, got ${typeof jsonString}`);
      }
      if (!jsonString.trim()) {
        throw new Error(`${jsonString} is empty`);
      }
      return _parseJSON(jsonString.trim(), allowPartial);
    }
    var _parseJSON = (jsonString, allow) => {
      const length = jsonString.length;
      let index = 0;
      const markPartialJSON = (msg) => {
        throw new PartialJSON(`${msg} at position ${index}`);
      };
      const throwMalformedError = (msg) => {
        throw new MalformedJSON(`${msg} at position ${index}`);
      };
      const parseAny = () => {
        skipBlank();
        if (index >= length)
          markPartialJSON("Unexpected end of input");
        if (jsonString[index] === '"')
          return parseStr();
        if (jsonString[index] === "{")
          return parseObj();
        if (jsonString[index] === "[")
          return parseArr();
        if (jsonString.substring(index, index + 4) === "null" || Allow.NULL & allow && length - index < 4 && "null".startsWith(jsonString.substring(index))) {
          index += 4;
          return null;
        }
        if (jsonString.substring(index, index + 4) === "true" || Allow.BOOL & allow && length - index < 4 && "true".startsWith(jsonString.substring(index))) {
          index += 4;
          return true;
        }
        if (jsonString.substring(index, index + 5) === "false" || Allow.BOOL & allow && length - index < 5 && "false".startsWith(jsonString.substring(index))) {
          index += 5;
          return false;
        }
        if (jsonString.substring(index, index + 8) === "Infinity" || Allow.INFINITY & allow && length - index < 8 && "Infinity".startsWith(jsonString.substring(index))) {
          index += 8;
          return Infinity;
        }
        if (jsonString.substring(index, index + 9) === "-Infinity" || Allow.MINUS_INFINITY & allow && 1 < length - index && length - index < 9 && "-Infinity".startsWith(jsonString.substring(index))) {
          index += 9;
          return -Infinity;
        }
        if (jsonString.substring(index, index + 3) === "NaN" || Allow.NAN & allow && length - index < 3 && "NaN".startsWith(jsonString.substring(index))) {
          index += 3;
          return NaN;
        }
        return parseNum();
      };
      const parseStr = () => {
        const start = index;
        let escape2 = false;
        index++;
        while (index < length && (jsonString[index] !== '"' || escape2 && jsonString[index - 1] === "\\")) {
          escape2 = jsonString[index] === "\\" ? !escape2 : false;
          index++;
        }
        if (jsonString.charAt(index) == '"') {
          try {
            return JSON.parse(jsonString.substring(start, ++index - Number(escape2)));
          } catch (e) {
            throwMalformedError(String(e));
          }
        } else if (Allow.STR & allow) {
          try {
            return JSON.parse(jsonString.substring(start, index - Number(escape2)) + '"');
          } catch (e) {
            return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf("\\")) + '"');
          }
        }
        markPartialJSON("Unterminated string literal");
      };
      const parseObj = () => {
        index++;
        skipBlank();
        const obj = {};
        try {
          while (jsonString[index] !== "}") {
            skipBlank();
            if (index >= length && Allow.OBJ & allow)
              return obj;
            const key = parseStr();
            skipBlank();
            index++;
            try {
              const value = parseAny();
              Object.defineProperty(obj, key, { value, writable: true, enumerable: true, configurable: true });
            } catch (e) {
              if (Allow.OBJ & allow)
                return obj;
              else
                throw e;
            }
            skipBlank();
            if (jsonString[index] === ",")
              index++;
          }
        } catch (e) {
          if (Allow.OBJ & allow)
            return obj;
          else
            markPartialJSON("Expected '}' at end of object");
        }
        index++;
        return obj;
      };
      const parseArr = () => {
        index++;
        const arr = [];
        try {
          while (jsonString[index] !== "]") {
            arr.push(parseAny());
            skipBlank();
            if (jsonString[index] === ",") {
              index++;
            }
          }
        } catch (e) {
          if (Allow.ARR & allow) {
            return arr;
          }
          markPartialJSON("Expected ']' at end of array");
        }
        index++;
        return arr;
      };
      const parseNum = () => {
        if (index === 0) {
          if (jsonString === "-" && Allow.NUM & allow)
            markPartialJSON("Not sure what '-' is");
          try {
            return JSON.parse(jsonString);
          } catch (e) {
            if (Allow.NUM & allow) {
              try {
                if ("." === jsonString[jsonString.length - 1])
                  return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf(".")));
                return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf("e")));
              } catch (e2) {
              }
            }
            throwMalformedError(String(e));
          }
        }
        const start = index;
        if (jsonString[index] === "-")
          index++;
        while (jsonString[index] && !",]}".includes(jsonString[index]))
          index++;
        if (index == length && !(Allow.NUM & allow))
          markPartialJSON("Unterminated number literal");
        try {
          return JSON.parse(jsonString.substring(start, index));
        } catch (e) {
          if (jsonString.substring(start, index) === "-" && Allow.NUM & allow)
            markPartialJSON("Not sure what '-' is");
          try {
            return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf("e")));
          } catch (e2) {
            throwMalformedError(String(e2));
          }
        }
      };
      const skipBlank = () => {
        while (index < length && " \n\r	".includes(jsonString[index])) {
          index++;
        }
      };
      return parseAny();
    };
    var partialParse = (input) => parseJSON(input, Allow.ALL ^ Allow.NUM);
    exports.partialParse = partialParse;
  }
});

// node_modules/openai/lib/ChatCompletionStream.js
var require_ChatCompletionStream = __commonJS({
  "node_modules/openai/lib/ChatCompletionStream.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _ChatCompletionStream_instances;
    var _ChatCompletionStream_params;
    var _ChatCompletionStream_choiceEventStates;
    var _ChatCompletionStream_currentChatCompletionSnapshot;
    var _ChatCompletionStream_beginRequest;
    var _ChatCompletionStream_getChoiceEventState;
    var _ChatCompletionStream_addChunk;
    var _ChatCompletionStream_emitToolCallDoneEvent;
    var _ChatCompletionStream_emitContentDoneEvents;
    var _ChatCompletionStream_endRequest;
    var _ChatCompletionStream_getAutoParseableResponseFormat;
    var _ChatCompletionStream_accumulateChatCompletion;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChatCompletionStream = void 0;
    var error_1 = require_error();
    var AbstractChatCompletionRunner_1 = require_AbstractChatCompletionRunner();
    var streaming_1 = require_streaming();
    var parser_1 = require_parser();
    var parser_2 = require_parser2();
    var ChatCompletionStream = class _ChatCompletionStream extends AbstractChatCompletionRunner_1.AbstractChatCompletionRunner {
      constructor(params) {
        super();
        _ChatCompletionStream_instances.add(this);
        _ChatCompletionStream_params.set(this, void 0);
        _ChatCompletionStream_choiceEventStates.set(this, void 0);
        _ChatCompletionStream_currentChatCompletionSnapshot.set(this, void 0);
        __classPrivateFieldSet(this, _ChatCompletionStream_params, params, "f");
        __classPrivateFieldSet(this, _ChatCompletionStream_choiceEventStates, [], "f");
      }
      get currentChatCompletionSnapshot() {
        return __classPrivateFieldGet(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
      }
      /**
       * Intended for use on the frontend, consuming a stream produced with
       * `.toReadableStream()` on the backend.
       *
       * Note that messages sent to the model do not appear in `.on('message')`
       * in this context.
       */
      static fromReadableStream(stream) {
        const runner = new _ChatCompletionStream(null);
        runner._run(() => runner._fromReadableStream(stream));
        return runner;
      }
      static createChatCompletion(client, params, options) {
        const runner = new _ChatCompletionStream(params);
        runner._run(() => runner._runChatCompletion(client, __spreadProps(__spreadValues({}, params), { stream: true }), __spreadProps(__spreadValues({}, options), { headers: __spreadProps(__spreadValues({}, options == null ? void 0 : options.headers), { "X-Stainless-Helper-Method": "stream" }) })));
        return runner;
      }
      async _createChatCompletion(client, params, options) {
        var _a;
        super._createChatCompletion;
        const signal = options == null ? void 0 : options.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
        const stream = await client.chat.completions.create(__spreadProps(__spreadValues({}, params), { stream: true }), __spreadProps(__spreadValues({}, options), { signal: this.controller.signal }));
        this._connected();
        try {
          for (var iter = __forAwait(stream), more, temp, error; more = !(temp = await iter.next()).done; more = false) {
            const chunk = temp.value;
            __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter.return) && await temp.call(iter);
          } finally {
            if (error)
              throw error[0];
          }
        }
        if ((_a = stream.controller.signal) == null ? void 0 : _a.aborted) {
          throw new error_1.APIUserAbortError();
        }
        return this._addChatCompletion(__classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
      }
      async _fromReadableStream(readableStream, options) {
        var _a;
        const signal = options == null ? void 0 : options.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
        this._connected();
        const stream = streaming_1.Stream.fromReadableStream(readableStream, this.controller);
        let chatId;
        try {
          for (var iter = __forAwait(stream), more, temp, error; more = !(temp = await iter.next()).done; more = false) {
            const chunk = temp.value;
            if (chatId && chatId !== chunk.id) {
              this._addChatCompletion(__classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
            }
            __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
            chatId = chunk.id;
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter.return) && await temp.call(iter);
          } finally {
            if (error)
              throw error[0];
          }
        }
        if ((_a = stream.controller.signal) == null ? void 0 : _a.aborted) {
          throw new error_1.APIUserAbortError();
        }
        return this._addChatCompletion(__classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
      }
      [(_ChatCompletionStream_params = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_choiceEventStates = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_currentChatCompletionSnapshot = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_instances = /* @__PURE__ */ new WeakSet(), _ChatCompletionStream_beginRequest = function _ChatCompletionStream_beginRequest2() {
        if (this.ended)
          return;
        __classPrivateFieldSet(this, _ChatCompletionStream_currentChatCompletionSnapshot, void 0, "f");
      }, _ChatCompletionStream_getChoiceEventState = function _ChatCompletionStream_getChoiceEventState2(choice) {
        let state = __classPrivateFieldGet(this, _ChatCompletionStream_choiceEventStates, "f")[choice.index];
        if (state) {
          return state;
        }
        state = {
          content_done: false,
          refusal_done: false,
          logprobs_content_done: false,
          logprobs_refusal_done: false,
          done_tool_calls: /* @__PURE__ */ new Set(),
          current_tool_call_index: null
        };
        __classPrivateFieldGet(this, _ChatCompletionStream_choiceEventStates, "f")[choice.index] = state;
        return state;
      }, _ChatCompletionStream_addChunk = function _ChatCompletionStream_addChunk2(chunk) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
        if (this.ended)
          return;
        const completion = __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_accumulateChatCompletion).call(this, chunk);
        this._emit("chunk", chunk, completion);
        for (const choice of chunk.choices) {
          const choiceSnapshot = completion.choices[choice.index];
          if (choice.delta.content != null && ((_a = choiceSnapshot.message) == null ? void 0 : _a.role) === "assistant" && ((_b = choiceSnapshot.message) == null ? void 0 : _b.content)) {
            this._emit("content", choice.delta.content, choiceSnapshot.message.content);
            this._emit("content.delta", {
              delta: choice.delta.content,
              snapshot: choiceSnapshot.message.content,
              parsed: choiceSnapshot.message.parsed
            });
          }
          if (choice.delta.refusal != null && ((_c = choiceSnapshot.message) == null ? void 0 : _c.role) === "assistant" && ((_d = choiceSnapshot.message) == null ? void 0 : _d.refusal)) {
            this._emit("refusal.delta", {
              delta: choice.delta.refusal,
              snapshot: choiceSnapshot.message.refusal
            });
          }
          if (((_e = choice.logprobs) == null ? void 0 : _e.content) != null && ((_f = choiceSnapshot.message) == null ? void 0 : _f.role) === "assistant") {
            this._emit("logprobs.content.delta", {
              content: (_g = choice.logprobs) == null ? void 0 : _g.content,
              snapshot: (_i = (_h = choiceSnapshot.logprobs) == null ? void 0 : _h.content) != null ? _i : []
            });
          }
          if (((_j = choice.logprobs) == null ? void 0 : _j.refusal) != null && ((_k = choiceSnapshot.message) == null ? void 0 : _k.role) === "assistant") {
            this._emit("logprobs.refusal.delta", {
              refusal: (_l = choice.logprobs) == null ? void 0 : _l.refusal,
              snapshot: (_n = (_m = choiceSnapshot.logprobs) == null ? void 0 : _m.refusal) != null ? _n : []
            });
          }
          const state = __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
          if (choiceSnapshot.finish_reason) {
            __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitContentDoneEvents).call(this, choiceSnapshot);
            if (state.current_tool_call_index != null) {
              __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitToolCallDoneEvent).call(this, choiceSnapshot, state.current_tool_call_index);
            }
          }
          for (const toolCall of (_o = choice.delta.tool_calls) != null ? _o : []) {
            if (state.current_tool_call_index !== toolCall.index) {
              __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitContentDoneEvents).call(this, choiceSnapshot);
              if (state.current_tool_call_index != null) {
                __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitToolCallDoneEvent).call(this, choiceSnapshot, state.current_tool_call_index);
              }
            }
            state.current_tool_call_index = toolCall.index;
          }
          for (const toolCallDelta of (_p = choice.delta.tool_calls) != null ? _p : []) {
            const toolCallSnapshot = (_q = choiceSnapshot.message.tool_calls) == null ? void 0 : _q[toolCallDelta.index];
            if (!(toolCallSnapshot == null ? void 0 : toolCallSnapshot.type)) {
              continue;
            }
            if ((toolCallSnapshot == null ? void 0 : toolCallSnapshot.type) === "function") {
              this._emit("tool_calls.function.arguments.delta", {
                name: (_r = toolCallSnapshot.function) == null ? void 0 : _r.name,
                index: toolCallDelta.index,
                arguments: toolCallSnapshot.function.arguments,
                parsed_arguments: toolCallSnapshot.function.parsed_arguments,
                arguments_delta: (_t = (_s = toolCallDelta.function) == null ? void 0 : _s.arguments) != null ? _t : ""
              });
            } else {
              assertNever(toolCallSnapshot == null ? void 0 : toolCallSnapshot.type);
            }
          }
        }
      }, _ChatCompletionStream_emitToolCallDoneEvent = function _ChatCompletionStream_emitToolCallDoneEvent2(choiceSnapshot, toolCallIndex) {
        var _a, _b, _c;
        const state = __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
        if (state.done_tool_calls.has(toolCallIndex)) {
          return;
        }
        const toolCallSnapshot = (_a = choiceSnapshot.message.tool_calls) == null ? void 0 : _a[toolCallIndex];
        if (!toolCallSnapshot) {
          throw new Error("no tool call snapshot");
        }
        if (!toolCallSnapshot.type) {
          throw new Error("tool call snapshot missing `type`");
        }
        if (toolCallSnapshot.type === "function") {
          const inputTool = (_c = (_b = __classPrivateFieldGet(this, _ChatCompletionStream_params, "f")) == null ? void 0 : _b.tools) == null ? void 0 : _c.find((tool) => tool.type === "function" && tool.function.name === toolCallSnapshot.function.name);
          this._emit("tool_calls.function.arguments.done", {
            name: toolCallSnapshot.function.name,
            index: toolCallIndex,
            arguments: toolCallSnapshot.function.arguments,
            parsed_arguments: (0, parser_1.isAutoParsableTool)(inputTool) ? inputTool.$parseRaw(toolCallSnapshot.function.arguments) : (inputTool == null ? void 0 : inputTool.function.strict) ? JSON.parse(toolCallSnapshot.function.arguments) : null
          });
        } else {
          assertNever(toolCallSnapshot.type);
        }
      }, _ChatCompletionStream_emitContentDoneEvents = function _ChatCompletionStream_emitContentDoneEvents2(choiceSnapshot) {
        var _a, _b;
        const state = __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
        if (choiceSnapshot.message.content && !state.content_done) {
          state.content_done = true;
          const responseFormat = __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getAutoParseableResponseFormat).call(this);
          this._emit("content.done", {
            content: choiceSnapshot.message.content,
            parsed: responseFormat ? responseFormat.$parseRaw(choiceSnapshot.message.content) : null
          });
        }
        if (choiceSnapshot.message.refusal && !state.refusal_done) {
          state.refusal_done = true;
          this._emit("refusal.done", { refusal: choiceSnapshot.message.refusal });
        }
        if (((_a = choiceSnapshot.logprobs) == null ? void 0 : _a.content) && !state.logprobs_content_done) {
          state.logprobs_content_done = true;
          this._emit("logprobs.content.done", { content: choiceSnapshot.logprobs.content });
        }
        if (((_b = choiceSnapshot.logprobs) == null ? void 0 : _b.refusal) && !state.logprobs_refusal_done) {
          state.logprobs_refusal_done = true;
          this._emit("logprobs.refusal.done", { refusal: choiceSnapshot.logprobs.refusal });
        }
      }, _ChatCompletionStream_endRequest = function _ChatCompletionStream_endRequest2() {
        if (this.ended) {
          throw new error_1.OpenAIError(`stream has ended, this shouldn't happen`);
        }
        const snapshot = __classPrivateFieldGet(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
        if (!snapshot) {
          throw new error_1.OpenAIError(`request ended without sending any chunks`);
        }
        __classPrivateFieldSet(this, _ChatCompletionStream_currentChatCompletionSnapshot, void 0, "f");
        __classPrivateFieldSet(this, _ChatCompletionStream_choiceEventStates, [], "f");
        return finalizeChatCompletion(snapshot, __classPrivateFieldGet(this, _ChatCompletionStream_params, "f"));
      }, _ChatCompletionStream_getAutoParseableResponseFormat = function _ChatCompletionStream_getAutoParseableResponseFormat2() {
        var _a;
        const responseFormat = (_a = __classPrivateFieldGet(this, _ChatCompletionStream_params, "f")) == null ? void 0 : _a.response_format;
        if ((0, parser_1.isAutoParsableResponseFormat)(responseFormat)) {
          return responseFormat;
        }
        return null;
      }, _ChatCompletionStream_accumulateChatCompletion = function _ChatCompletionStream_accumulateChatCompletion2(chunk) {
        var _c2, _d2, _f, _g, _h, _i;
        var _a, _b, _c, _d;
        let snapshot = __classPrivateFieldGet(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
        const _a2 = chunk, { choices } = _a2, rest = __objRest(_a2, ["choices"]);
        if (!snapshot) {
          snapshot = __classPrivateFieldSet(this, _ChatCompletionStream_currentChatCompletionSnapshot, __spreadProps(__spreadValues({}, rest), {
            choices: []
          }), "f");
        } else {
          Object.assign(snapshot, rest);
        }
        for (const _l of chunk.choices) {
          const _m = _l, { delta, finish_reason, index, logprobs = null } = _m, other = __objRest(_m, ["delta", "finish_reason", "index", "logprobs"]);
          let choice = snapshot.choices[index];
          if (!choice) {
            choice = snapshot.choices[index] = __spreadValues({ finish_reason, index, message: {}, logprobs }, other);
          }
          if (logprobs) {
            if (!choice.logprobs) {
              choice.logprobs = Object.assign({}, logprobs);
            } else {
              const _b2 = logprobs, { content: content2, refusal: refusal2 } = _b2, rest3 = __objRest(_b2, ["content", "refusal"]);
              assertIsEmpty(rest3);
              Object.assign(choice.logprobs, rest3);
              if (content2) {
                (_c2 = (_a = choice.logprobs).content) != null ? _c2 : _a.content = [];
                choice.logprobs.content.push(...content2);
              }
              if (refusal2) {
                (_d2 = (_b = choice.logprobs).refusal) != null ? _d2 : _b.refusal = [];
                choice.logprobs.refusal.push(...refusal2);
              }
            }
          }
          if (finish_reason) {
            choice.finish_reason = finish_reason;
            if (__classPrivateFieldGet(this, _ChatCompletionStream_params, "f") && (0, parser_1.hasAutoParseableInput)(__classPrivateFieldGet(this, _ChatCompletionStream_params, "f"))) {
              if (finish_reason === "length") {
                throw new error_1.LengthFinishReasonError();
              }
              if (finish_reason === "content_filter") {
                throw new error_1.ContentFilterFinishReasonError();
              }
            }
          }
          Object.assign(choice, other);
          if (!delta)
            continue;
          const _e = delta, { content, refusal, function_call, role, tool_calls } = _e, rest2 = __objRest(_e, ["content", "refusal", "function_call", "role", "tool_calls"]);
          assertIsEmpty(rest2);
          Object.assign(choice.message, rest2);
          if (refusal) {
            choice.message.refusal = (choice.message.refusal || "") + refusal;
          }
          if (role)
            choice.message.role = role;
          if (function_call) {
            if (!choice.message.function_call) {
              choice.message.function_call = function_call;
            } else {
              if (function_call.name)
                choice.message.function_call.name = function_call.name;
              if (function_call.arguments) {
                (_f = (_c = choice.message.function_call).arguments) != null ? _f : _c.arguments = "";
                choice.message.function_call.arguments += function_call.arguments;
              }
            }
          }
          if (content) {
            choice.message.content = (choice.message.content || "") + content;
            if (!choice.message.refusal && __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getAutoParseableResponseFormat).call(this)) {
              choice.message.parsed = (0, parser_2.partialParse)(choice.message.content);
            }
          }
          if (tool_calls) {
            if (!choice.message.tool_calls)
              choice.message.tool_calls = [];
            for (const _j of tool_calls) {
              const _k = _j, { index: index2, id, type, function: fn } = _k, rest3 = __objRest(_k, ["index", "id", "type", "function"]);
              const tool_call = (_g = (_d = choice.message.tool_calls)[index2]) != null ? _g : _d[index2] = {};
              Object.assign(tool_call, rest3);
              if (id)
                tool_call.id = id;
              if (type)
                tool_call.type = type;
              if (fn)
                (_i = tool_call.function) != null ? _i : tool_call.function = { name: (_h = fn.name) != null ? _h : "", arguments: "" };
              if (fn == null ? void 0 : fn.name)
                tool_call.function.name = fn.name;
              if (fn == null ? void 0 : fn.arguments) {
                tool_call.function.arguments += fn.arguments;
                if ((0, parser_1.shouldParseToolCall)(__classPrivateFieldGet(this, _ChatCompletionStream_params, "f"), tool_call)) {
                  tool_call.function.parsed_arguments = (0, parser_2.partialParse)(tool_call.function.arguments);
                }
              }
            }
          }
        }
        return snapshot;
      }, Symbol.asyncIterator)]() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        this.on("chunk", (chunk) => {
          const reader = readQueue.shift();
          if (reader) {
            reader.resolve(chunk);
          } else {
            pushQueue.push(chunk);
          }
        });
        this.on("end", () => {
          done = true;
          for (const reader of readQueue) {
            reader.resolve(void 0);
          }
          readQueue.length = 0;
        });
        this.on("abort", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        this.on("error", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        return {
          next: async () => {
            if (!pushQueue.length) {
              if (done) {
                return { value: void 0, done: true };
              }
              return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((chunk2) => chunk2 ? { value: chunk2, done: false } : { value: void 0, done: true });
            }
            const chunk = pushQueue.shift();
            return { value: chunk, done: false };
          },
          return: async () => {
            this.abort();
            return { value: void 0, done: true };
          }
        };
      }
      toReadableStream() {
        const stream = new streaming_1.Stream(this[Symbol.asyncIterator].bind(this), this.controller);
        return stream.toReadableStream();
      }
    };
    exports.ChatCompletionStream = ChatCompletionStream;
    function finalizeChatCompletion(snapshot, params) {
      const _a = snapshot, { id, choices, created, model, system_fingerprint } = _a, rest = __objRest(_a, ["id", "choices", "created", "model", "system_fingerprint"]);
      const completion = __spreadValues(__spreadProps(__spreadValues({}, rest), {
        id,
        choices: choices.map((_b) => {
          var _c = _b, { message, finish_reason, index, logprobs } = _c, choiceRest = __objRest(_c, ["message", "finish_reason", "index", "logprobs"]);
          var _b2, _c2, _d;
          if (!finish_reason) {
            throw new error_1.OpenAIError(`missing finish_reason for choice ${index}`);
          }
          const _a2 = message, { content = null, function_call, tool_calls } = _a2, messageRest = __objRest(_a2, ["content", "function_call", "tool_calls"]);
          const role = message.role;
          if (!role) {
            throw new error_1.OpenAIError(`missing role for choice ${index}`);
          }
          if (function_call) {
            const { arguments: args, name } = function_call;
            if (args == null) {
              throw new error_1.OpenAIError(`missing function_call.arguments for choice ${index}`);
            }
            if (!name) {
              throw new error_1.OpenAIError(`missing function_call.name for choice ${index}`);
            }
            return __spreadProps(__spreadValues({}, choiceRest), {
              message: {
                content,
                function_call: { arguments: args, name },
                role,
                refusal: (_b2 = message.refusal) != null ? _b2 : null
              },
              finish_reason,
              index,
              logprobs
            });
          }
          if (tool_calls) {
            return __spreadProps(__spreadValues({}, choiceRest), {
              index,
              finish_reason,
              logprobs,
              message: __spreadProps(__spreadValues({}, messageRest), {
                role,
                content,
                refusal: (_c2 = message.refusal) != null ? _c2 : null,
                tool_calls: tool_calls.map((tool_call, i) => {
                  const _a3 = tool_call, { function: fn, type, id: id2 } = _a3, toolRest = __objRest(_a3, ["function", "type", "id"]);
                  const _b3 = fn || {}, { arguments: args, name } = _b3, fnRest = __objRest(_b3, ["arguments", "name"]);
                  if (id2 == null) {
                    throw new error_1.OpenAIError(`missing choices[${index}].tool_calls[${i}].id
${str(snapshot)}`);
                  }
                  if (type == null) {
                    throw new error_1.OpenAIError(`missing choices[${index}].tool_calls[${i}].type
${str(snapshot)}`);
                  }
                  if (name == null) {
                    throw new error_1.OpenAIError(`missing choices[${index}].tool_calls[${i}].function.name
${str(snapshot)}`);
                  }
                  if (args == null) {
                    throw new error_1.OpenAIError(`missing choices[${index}].tool_calls[${i}].function.arguments
${str(snapshot)}`);
                  }
                  return __spreadProps(__spreadValues({}, toolRest), { id: id2, type, function: __spreadProps(__spreadValues({}, fnRest), { name, arguments: args }) });
                })
              })
            });
          }
          return __spreadProps(__spreadValues({}, choiceRest), {
            message: __spreadProps(__spreadValues({}, messageRest), { content, role, refusal: (_d = message.refusal) != null ? _d : null }),
            finish_reason,
            index,
            logprobs
          });
        }),
        created,
        model,
        object: "chat.completion"
      }), system_fingerprint ? { system_fingerprint } : {});
      return (0, parser_1.maybeParseChatCompletion)(completion, params);
    }
    function str(x) {
      return JSON.stringify(x);
    }
    function assertIsEmpty(obj) {
      return;
    }
    function assertNever(_x) {
    }
  }
});

// node_modules/openai/lib/ChatCompletionStreamingRunner.js
var require_ChatCompletionStreamingRunner = __commonJS({
  "node_modules/openai/lib/ChatCompletionStreamingRunner.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChatCompletionStreamingRunner = void 0;
    var ChatCompletionStream_1 = require_ChatCompletionStream();
    var ChatCompletionStreamingRunner = class _ChatCompletionStreamingRunner extends ChatCompletionStream_1.ChatCompletionStream {
      static fromReadableStream(stream) {
        const runner = new _ChatCompletionStreamingRunner(null);
        runner._run(() => runner._fromReadableStream(stream));
        return runner;
      }
      /** @deprecated - please use `runTools` instead. */
      static runFunctions(client, params, options) {
        const runner = new _ChatCompletionStreamingRunner(null);
        const opts = __spreadProps(__spreadValues({}, options), {
          headers: __spreadProps(__spreadValues({}, options == null ? void 0 : options.headers), { "X-Stainless-Helper-Method": "runFunctions" })
        });
        runner._run(() => runner._runFunctions(client, params, opts));
        return runner;
      }
      static runTools(client, params, options) {
        const runner = new _ChatCompletionStreamingRunner(
          // @ts-expect-error TODO these types are incompatible
          params
        );
        const opts = __spreadProps(__spreadValues({}, options), {
          headers: __spreadProps(__spreadValues({}, options == null ? void 0 : options.headers), { "X-Stainless-Helper-Method": "runTools" })
        });
        runner._run(() => runner._runTools(client, params, opts));
        return runner;
      }
    };
    exports.ChatCompletionStreamingRunner = ChatCompletionStreamingRunner;
  }
});

// node_modules/openai/resources/beta/chat/completions.js
var require_completions2 = __commonJS({
  "node_modules/openai/resources/beta/chat/completions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Completions = exports.ChatCompletionRunner = exports.ChatCompletionStream = exports.ParsingToolFunction = exports.ParsingFunction = exports.ChatCompletionStreamingRunner = void 0;
    var resource_1 = require_resource();
    var ChatCompletionRunner_1 = require_ChatCompletionRunner();
    var ChatCompletionStreamingRunner_1 = require_ChatCompletionStreamingRunner();
    var ChatCompletionStream_1 = require_ChatCompletionStream();
    var parser_1 = require_parser();
    var ChatCompletionStreamingRunner_2 = require_ChatCompletionStreamingRunner();
    Object.defineProperty(exports, "ChatCompletionStreamingRunner", { enumerable: true, get: function() {
      return ChatCompletionStreamingRunner_2.ChatCompletionStreamingRunner;
    } });
    var RunnableFunction_1 = require_RunnableFunction();
    Object.defineProperty(exports, "ParsingFunction", { enumerable: true, get: function() {
      return RunnableFunction_1.ParsingFunction;
    } });
    Object.defineProperty(exports, "ParsingToolFunction", { enumerable: true, get: function() {
      return RunnableFunction_1.ParsingToolFunction;
    } });
    var ChatCompletionStream_2 = require_ChatCompletionStream();
    Object.defineProperty(exports, "ChatCompletionStream", { enumerable: true, get: function() {
      return ChatCompletionStream_2.ChatCompletionStream;
    } });
    var ChatCompletionRunner_2 = require_ChatCompletionRunner();
    Object.defineProperty(exports, "ChatCompletionRunner", { enumerable: true, get: function() {
      return ChatCompletionRunner_2.ChatCompletionRunner;
    } });
    var Completions = class extends resource_1.APIResource {
      parse(body, options) {
        (0, parser_1.validateInputTools)(body.tools);
        return this._client.chat.completions.create(body, __spreadProps(__spreadValues({}, options), {
          headers: __spreadProps(__spreadValues({}, options == null ? void 0 : options.headers), {
            "X-Stainless-Helper-Method": "beta.chat.completions.parse"
          })
        }))._thenUnwrap((completion) => (0, parser_1.parseChatCompletion)(completion, body));
      }
      runFunctions(body, options) {
        if (body.stream) {
          return ChatCompletionStreamingRunner_1.ChatCompletionStreamingRunner.runFunctions(this._client, body, options);
        }
        return ChatCompletionRunner_1.ChatCompletionRunner.runFunctions(this._client, body, options);
      }
      runTools(body, options) {
        if (body.stream) {
          return ChatCompletionStreamingRunner_1.ChatCompletionStreamingRunner.runTools(this._client, body, options);
        }
        return ChatCompletionRunner_1.ChatCompletionRunner.runTools(this._client, body, options);
      }
      /**
       * Creates a chat completion stream
       */
      stream(body, options) {
        return ChatCompletionStream_1.ChatCompletionStream.createChatCompletion(this._client, body, options);
      }
    };
    exports.Completions = Completions;
  }
});

// node_modules/openai/resources/beta/chat/chat.js
var require_chat3 = __commonJS({
  "node_modules/openai/resources/beta/chat/chat.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Chat = void 0;
    var resource_1 = require_resource();
    var CompletionsAPI = __importStar(require_completions2());
    var Chat = class extends resource_1.APIResource {
      constructor() {
        super(...arguments);
        this.completions = new CompletionsAPI.Completions(this._client);
      }
    };
    exports.Chat = Chat;
    (function(Chat2) {
      Chat2.Completions = CompletionsAPI.Completions;
    })(Chat = exports.Chat || (exports.Chat = {}));
  }
});

// node_modules/openai/resources/beta/realtime/sessions.js
var require_sessions = __commonJS({
  "node_modules/openai/resources/beta/realtime/sessions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sessions = void 0;
    var resource_1 = require_resource();
    var Sessions = class extends resource_1.APIResource {
      /**
       * Create an ephemeral API token for use in client-side applications with the
       * Realtime API. Can be configured with the same session parameters as the
       * `session.update` client event.
       *
       * It responds with a session object, plus a `client_secret` key which contains a
       * usable ephemeral API token that can be used to authenticate browser clients for
       * the Realtime API.
       */
      create(body, options) {
        return this._client.post("/realtime/sessions", __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
    };
    exports.Sessions = Sessions;
  }
});

// node_modules/openai/resources/beta/realtime/realtime.js
var require_realtime = __commonJS({
  "node_modules/openai/resources/beta/realtime/realtime.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Realtime = void 0;
    var resource_1 = require_resource();
    var SessionsAPI = __importStar(require_sessions());
    var sessions_1 = require_sessions();
    var Realtime = class extends resource_1.APIResource {
      constructor() {
        super(...arguments);
        this.sessions = new SessionsAPI.Sessions(this._client);
      }
    };
    exports.Realtime = Realtime;
    Realtime.Sessions = sessions_1.Sessions;
  }
});

// node_modules/openai/lib/AssistantStream.js
var require_AssistantStream = __commonJS({
  "node_modules/openai/lib/AssistantStream.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var _AssistantStream_instances;
    var _AssistantStream_events;
    var _AssistantStream_runStepSnapshots;
    var _AssistantStream_messageSnapshots;
    var _AssistantStream_messageSnapshot;
    var _AssistantStream_finalRun;
    var _AssistantStream_currentContentIndex;
    var _AssistantStream_currentContent;
    var _AssistantStream_currentToolCallIndex;
    var _AssistantStream_currentToolCall;
    var _AssistantStream_currentEvent;
    var _AssistantStream_currentRunSnapshot;
    var _AssistantStream_currentRunStepSnapshot;
    var _AssistantStream_addEvent;
    var _AssistantStream_endRequest;
    var _AssistantStream_handleMessage;
    var _AssistantStream_handleRunStep;
    var _AssistantStream_handleEvent;
    var _AssistantStream_accumulateRunStep;
    var _AssistantStream_accumulateMessage;
    var _AssistantStream_accumulateContent;
    var _AssistantStream_handleRun;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AssistantStream = void 0;
    var Core = __importStar(require_core());
    var streaming_1 = require_streaming();
    var error_1 = require_error();
    var EventStream_1 = require_EventStream();
    var AssistantStream = class _AssistantStream extends EventStream_1.EventStream {
      constructor() {
        super(...arguments);
        _AssistantStream_instances.add(this);
        _AssistantStream_events.set(this, []);
        _AssistantStream_runStepSnapshots.set(this, {});
        _AssistantStream_messageSnapshots.set(this, {});
        _AssistantStream_messageSnapshot.set(this, void 0);
        _AssistantStream_finalRun.set(this, void 0);
        _AssistantStream_currentContentIndex.set(this, void 0);
        _AssistantStream_currentContent.set(this, void 0);
        _AssistantStream_currentToolCallIndex.set(this, void 0);
        _AssistantStream_currentToolCall.set(this, void 0);
        _AssistantStream_currentEvent.set(this, void 0);
        _AssistantStream_currentRunSnapshot.set(this, void 0);
        _AssistantStream_currentRunStepSnapshot.set(this, void 0);
      }
      [(_AssistantStream_events = /* @__PURE__ */ new WeakMap(), _AssistantStream_runStepSnapshots = /* @__PURE__ */ new WeakMap(), _AssistantStream_messageSnapshots = /* @__PURE__ */ new WeakMap(), _AssistantStream_messageSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_finalRun = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentContentIndex = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentContent = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentToolCallIndex = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentToolCall = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentEvent = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentRunSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentRunStepSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_instances = /* @__PURE__ */ new WeakSet(), Symbol.asyncIterator)]() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        this.on("event", (event) => {
          const reader = readQueue.shift();
          if (reader) {
            reader.resolve(event);
          } else {
            pushQueue.push(event);
          }
        });
        this.on("end", () => {
          done = true;
          for (const reader of readQueue) {
            reader.resolve(void 0);
          }
          readQueue.length = 0;
        });
        this.on("abort", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        this.on("error", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        return {
          next: async () => {
            if (!pushQueue.length) {
              if (done) {
                return { value: void 0, done: true };
              }
              return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((chunk2) => chunk2 ? { value: chunk2, done: false } : { value: void 0, done: true });
            }
            const chunk = pushQueue.shift();
            return { value: chunk, done: false };
          },
          return: async () => {
            this.abort();
            return { value: void 0, done: true };
          }
        };
      }
      static fromReadableStream(stream) {
        const runner = new _AssistantStream();
        runner._run(() => runner._fromReadableStream(stream));
        return runner;
      }
      async _fromReadableStream(readableStream, options) {
        var _a;
        const signal = options == null ? void 0 : options.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        this._connected();
        const stream = streaming_1.Stream.fromReadableStream(readableStream, this.controller);
        try {
          for (var iter = __forAwait(stream), more, temp, error; more = !(temp = await iter.next()).done; more = false) {
            const event = temp.value;
            __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter.return) && await temp.call(iter);
          } finally {
            if (error)
              throw error[0];
          }
        }
        if ((_a = stream.controller.signal) == null ? void 0 : _a.aborted) {
          throw new error_1.APIUserAbortError();
        }
        return this._addRun(__classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
      }
      toReadableStream() {
        const stream = new streaming_1.Stream(this[Symbol.asyncIterator].bind(this), this.controller);
        return stream.toReadableStream();
      }
      static createToolAssistantStream(threadId, runId, runs, params, options) {
        const runner = new _AssistantStream();
        runner._run(() => runner._runToolAssistantStream(threadId, runId, runs, params, __spreadProps(__spreadValues({}, options), {
          headers: __spreadProps(__spreadValues({}, options == null ? void 0 : options.headers), { "X-Stainless-Helper-Method": "stream" })
        })));
        return runner;
      }
      async _createToolAssistantStream(run, threadId, runId, params, options) {
        var _a;
        const signal = options == null ? void 0 : options.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        const body = __spreadProps(__spreadValues({}, params), { stream: true });
        const stream = await run.submitToolOutputs(threadId, runId, body, __spreadProps(__spreadValues({}, options), {
          signal: this.controller.signal
        }));
        this._connected();
        try {
          for (var iter = __forAwait(stream), more, temp, error; more = !(temp = await iter.next()).done; more = false) {
            const event = temp.value;
            __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter.return) && await temp.call(iter);
          } finally {
            if (error)
              throw error[0];
          }
        }
        if ((_a = stream.controller.signal) == null ? void 0 : _a.aborted) {
          throw new error_1.APIUserAbortError();
        }
        return this._addRun(__classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
      }
      static createThreadAssistantStream(params, thread, options) {
        const runner = new _AssistantStream();
        runner._run(() => runner._threadAssistantStream(params, thread, __spreadProps(__spreadValues({}, options), {
          headers: __spreadProps(__spreadValues({}, options == null ? void 0 : options.headers), { "X-Stainless-Helper-Method": "stream" })
        })));
        return runner;
      }
      static createAssistantStream(threadId, runs, params, options) {
        const runner = new _AssistantStream();
        runner._run(() => runner._runAssistantStream(threadId, runs, params, __spreadProps(__spreadValues({}, options), {
          headers: __spreadProps(__spreadValues({}, options == null ? void 0 : options.headers), { "X-Stainless-Helper-Method": "stream" })
        })));
        return runner;
      }
      currentEvent() {
        return __classPrivateFieldGet(this, _AssistantStream_currentEvent, "f");
      }
      currentRun() {
        return __classPrivateFieldGet(this, _AssistantStream_currentRunSnapshot, "f");
      }
      currentMessageSnapshot() {
        return __classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f");
      }
      currentRunStepSnapshot() {
        return __classPrivateFieldGet(this, _AssistantStream_currentRunStepSnapshot, "f");
      }
      async finalRunSteps() {
        await this.done();
        return Object.values(__classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f"));
      }
      async finalMessages() {
        await this.done();
        return Object.values(__classPrivateFieldGet(this, _AssistantStream_messageSnapshots, "f"));
      }
      async finalRun() {
        await this.done();
        if (!__classPrivateFieldGet(this, _AssistantStream_finalRun, "f"))
          throw Error("Final run was not received.");
        return __classPrivateFieldGet(this, _AssistantStream_finalRun, "f");
      }
      async _createThreadAssistantStream(thread, params, options) {
        var _a;
        const signal = options == null ? void 0 : options.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        const body = __spreadProps(__spreadValues({}, params), { stream: true });
        const stream = await thread.createAndRun(body, __spreadProps(__spreadValues({}, options), { signal: this.controller.signal }));
        this._connected();
        try {
          for (var iter = __forAwait(stream), more, temp, error; more = !(temp = await iter.next()).done; more = false) {
            const event = temp.value;
            __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter.return) && await temp.call(iter);
          } finally {
            if (error)
              throw error[0];
          }
        }
        if ((_a = stream.controller.signal) == null ? void 0 : _a.aborted) {
          throw new error_1.APIUserAbortError();
        }
        return this._addRun(__classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
      }
      async _createAssistantStream(run, threadId, params, options) {
        var _a;
        const signal = options == null ? void 0 : options.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        const body = __spreadProps(__spreadValues({}, params), { stream: true });
        const stream = await run.create(threadId, body, __spreadProps(__spreadValues({}, options), { signal: this.controller.signal }));
        this._connected();
        try {
          for (var iter = __forAwait(stream), more, temp, error; more = !(temp = await iter.next()).done; more = false) {
            const event = temp.value;
            __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter.return) && await temp.call(iter);
          } finally {
            if (error)
              throw error[0];
          }
        }
        if ((_a = stream.controller.signal) == null ? void 0 : _a.aborted) {
          throw new error_1.APIUserAbortError();
        }
        return this._addRun(__classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
      }
      static accumulateDelta(acc, delta) {
        for (const [key, deltaValue] of Object.entries(delta)) {
          if (!acc.hasOwnProperty(key)) {
            acc[key] = deltaValue;
            continue;
          }
          let accValue = acc[key];
          if (accValue === null || accValue === void 0) {
            acc[key] = deltaValue;
            continue;
          }
          if (key === "index" || key === "type") {
            acc[key] = deltaValue;
            continue;
          }
          if (typeof accValue === "string" && typeof deltaValue === "string") {
            accValue += deltaValue;
          } else if (typeof accValue === "number" && typeof deltaValue === "number") {
            accValue += deltaValue;
          } else if (Core.isObj(accValue) && Core.isObj(deltaValue)) {
            accValue = this.accumulateDelta(accValue, deltaValue);
          } else if (Array.isArray(accValue) && Array.isArray(deltaValue)) {
            if (accValue.every((x) => typeof x === "string" || typeof x === "number")) {
              accValue.push(...deltaValue);
              continue;
            }
            for (const deltaEntry of deltaValue) {
              if (!Core.isObj(deltaEntry)) {
                throw new Error(`Expected array delta entry to be an object but got: ${deltaEntry}`);
              }
              const index = deltaEntry["index"];
              if (index == null) {
                console.error(deltaEntry);
                throw new Error("Expected array delta entry to have an `index` property");
              }
              if (typeof index !== "number") {
                throw new Error(`Expected array delta entry \`index\` property to be a number but got ${index}`);
              }
              const accEntry = accValue[index];
              if (accEntry == null) {
                accValue.push(deltaEntry);
              } else {
                accValue[index] = this.accumulateDelta(accEntry, deltaEntry);
              }
            }
            continue;
          } else {
            throw Error(`Unhandled record type: ${key}, deltaValue: ${deltaValue}, accValue: ${accValue}`);
          }
          acc[key] = accValue;
        }
        return acc;
      }
      _addRun(run) {
        return run;
      }
      async _threadAssistantStream(params, thread, options) {
        return await this._createThreadAssistantStream(thread, params, options);
      }
      async _runAssistantStream(threadId, runs, params, options) {
        return await this._createAssistantStream(runs, threadId, params, options);
      }
      async _runToolAssistantStream(threadId, runId, runs, params, options) {
        return await this._createToolAssistantStream(runs, threadId, runId, params, options);
      }
    };
    exports.AssistantStream = AssistantStream;
    _AssistantStream_addEvent = function _AssistantStream_addEvent2(event) {
      if (this.ended)
        return;
      __classPrivateFieldSet(this, _AssistantStream_currentEvent, event, "f");
      __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_handleEvent).call(this, event);
      switch (event.event) {
        case "thread.created":
          break;
        case "thread.run.created":
        case "thread.run.queued":
        case "thread.run.in_progress":
        case "thread.run.requires_action":
        case "thread.run.completed":
        case "thread.run.failed":
        case "thread.run.cancelling":
        case "thread.run.cancelled":
        case "thread.run.expired":
          __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_handleRun).call(this, event);
          break;
        case "thread.run.step.created":
        case "thread.run.step.in_progress":
        case "thread.run.step.delta":
        case "thread.run.step.completed":
        case "thread.run.step.failed":
        case "thread.run.step.cancelled":
        case "thread.run.step.expired":
          __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_handleRunStep).call(this, event);
          break;
        case "thread.message.created":
        case "thread.message.in_progress":
        case "thread.message.delta":
        case "thread.message.completed":
        case "thread.message.incomplete":
          __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_handleMessage).call(this, event);
          break;
        case "error":
          throw new Error("Encountered an error event in event processing - errors should be processed earlier");
      }
    }, _AssistantStream_endRequest = function _AssistantStream_endRequest2() {
      if (this.ended) {
        throw new error_1.OpenAIError(`stream has ended, this shouldn't happen`);
      }
      if (!__classPrivateFieldGet(this, _AssistantStream_finalRun, "f"))
        throw Error("Final run has not been received");
      return __classPrivateFieldGet(this, _AssistantStream_finalRun, "f");
    }, _AssistantStream_handleMessage = function _AssistantStream_handleMessage2(event) {
      const [accumulatedMessage, newContent] = __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_accumulateMessage).call(this, event, __classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f"));
      __classPrivateFieldSet(this, _AssistantStream_messageSnapshot, accumulatedMessage, "f");
      __classPrivateFieldGet(this, _AssistantStream_messageSnapshots, "f")[accumulatedMessage.id] = accumulatedMessage;
      for (const content of newContent) {
        const snapshotContent = accumulatedMessage.content[content.index];
        if ((snapshotContent == null ? void 0 : snapshotContent.type) == "text") {
          this._emit("textCreated", snapshotContent.text);
        }
      }
      switch (event.event) {
        case "thread.message.created":
          this._emit("messageCreated", event.data);
          break;
        case "thread.message.in_progress":
          break;
        case "thread.message.delta":
          this._emit("messageDelta", event.data.delta, accumulatedMessage);
          if (event.data.delta.content) {
            for (const content of event.data.delta.content) {
              if (content.type == "text" && content.text) {
                let textDelta = content.text;
                let snapshot = accumulatedMessage.content[content.index];
                if (snapshot && snapshot.type == "text") {
                  this._emit("textDelta", textDelta, snapshot.text);
                } else {
                  throw Error("The snapshot associated with this text delta is not text or missing");
                }
              }
              if (content.index != __classPrivateFieldGet(this, _AssistantStream_currentContentIndex, "f")) {
                if (__classPrivateFieldGet(this, _AssistantStream_currentContent, "f")) {
                  switch (__classPrivateFieldGet(this, _AssistantStream_currentContent, "f").type) {
                    case "text":
                      this._emit("textDone", __classPrivateFieldGet(this, _AssistantStream_currentContent, "f").text, __classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f"));
                      break;
                    case "image_file":
                      this._emit("imageFileDone", __classPrivateFieldGet(this, _AssistantStream_currentContent, "f").image_file, __classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f"));
                      break;
                  }
                }
                __classPrivateFieldSet(this, _AssistantStream_currentContentIndex, content.index, "f");
              }
              __classPrivateFieldSet(this, _AssistantStream_currentContent, accumulatedMessage.content[content.index], "f");
            }
          }
          break;
        case "thread.message.completed":
        case "thread.message.incomplete":
          if (__classPrivateFieldGet(this, _AssistantStream_currentContentIndex, "f") !== void 0) {
            const currentContent = event.data.content[__classPrivateFieldGet(this, _AssistantStream_currentContentIndex, "f")];
            if (currentContent) {
              switch (currentContent.type) {
                case "image_file":
                  this._emit("imageFileDone", currentContent.image_file, __classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f"));
                  break;
                case "text":
                  this._emit("textDone", currentContent.text, __classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f"));
                  break;
              }
            }
          }
          if (__classPrivateFieldGet(this, _AssistantStream_messageSnapshot, "f")) {
            this._emit("messageDone", event.data);
          }
          __classPrivateFieldSet(this, _AssistantStream_messageSnapshot, void 0, "f");
      }
    }, _AssistantStream_handleRunStep = function _AssistantStream_handleRunStep2(event) {
      const accumulatedRunStep = __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_accumulateRunStep).call(this, event);
      __classPrivateFieldSet(this, _AssistantStream_currentRunStepSnapshot, accumulatedRunStep, "f");
      switch (event.event) {
        case "thread.run.step.created":
          this._emit("runStepCreated", event.data);
          break;
        case "thread.run.step.delta":
          const delta = event.data.delta;
          if (delta.step_details && delta.step_details.type == "tool_calls" && delta.step_details.tool_calls && accumulatedRunStep.step_details.type == "tool_calls") {
            for (const toolCall of delta.step_details.tool_calls) {
              if (toolCall.index == __classPrivateFieldGet(this, _AssistantStream_currentToolCallIndex, "f")) {
                this._emit("toolCallDelta", toolCall, accumulatedRunStep.step_details.tool_calls[toolCall.index]);
              } else {
                if (__classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f")) {
                  this._emit("toolCallDone", __classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f"));
                }
                __classPrivateFieldSet(this, _AssistantStream_currentToolCallIndex, toolCall.index, "f");
                __classPrivateFieldSet(this, _AssistantStream_currentToolCall, accumulatedRunStep.step_details.tool_calls[toolCall.index], "f");
                if (__classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f"))
                  this._emit("toolCallCreated", __classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f"));
              }
            }
          }
          this._emit("runStepDelta", event.data.delta, accumulatedRunStep);
          break;
        case "thread.run.step.completed":
        case "thread.run.step.failed":
        case "thread.run.step.cancelled":
        case "thread.run.step.expired":
          __classPrivateFieldSet(this, _AssistantStream_currentRunStepSnapshot, void 0, "f");
          const details = event.data.step_details;
          if (details.type == "tool_calls") {
            if (__classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f")) {
              this._emit("toolCallDone", __classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f"));
              __classPrivateFieldSet(this, _AssistantStream_currentToolCall, void 0, "f");
            }
          }
          this._emit("runStepDone", event.data, accumulatedRunStep);
          break;
        case "thread.run.step.in_progress":
          break;
      }
    }, _AssistantStream_handleEvent = function _AssistantStream_handleEvent2(event) {
      __classPrivateFieldGet(this, _AssistantStream_events, "f").push(event);
      this._emit("event", event);
    }, _AssistantStream_accumulateRunStep = function _AssistantStream_accumulateRunStep2(event) {
      switch (event.event) {
        case "thread.run.step.created":
          __classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = event.data;
          return event.data;
        case "thread.run.step.delta":
          let snapshot = __classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
          if (!snapshot) {
            throw Error("Received a RunStepDelta before creation of a snapshot");
          }
          let data = event.data;
          if (data.delta) {
            const accumulated = AssistantStream.accumulateDelta(snapshot, data.delta);
            __classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = accumulated;
          }
          return __classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
        case "thread.run.step.completed":
        case "thread.run.step.failed":
        case "thread.run.step.cancelled":
        case "thread.run.step.expired":
        case "thread.run.step.in_progress":
          __classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = event.data;
          break;
      }
      if (__classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id])
        return __classPrivateFieldGet(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
      throw new Error("No snapshot available");
    }, _AssistantStream_accumulateMessage = function _AssistantStream_accumulateMessage2(event, snapshot) {
      let newContent = [];
      switch (event.event) {
        case "thread.message.created":
          return [event.data, newContent];
        case "thread.message.delta":
          if (!snapshot) {
            throw Error("Received a delta with no existing snapshot (there should be one from message creation)");
          }
          let data = event.data;
          if (data.delta.content) {
            for (const contentElement of data.delta.content) {
              if (contentElement.index in snapshot.content) {
                let currentContent = snapshot.content[contentElement.index];
                snapshot.content[contentElement.index] = __classPrivateFieldGet(this, _AssistantStream_instances, "m", _AssistantStream_accumulateContent).call(this, contentElement, currentContent);
              } else {
                snapshot.content[contentElement.index] = contentElement;
                newContent.push(contentElement);
              }
            }
          }
          return [snapshot, newContent];
        case "thread.message.in_progress":
        case "thread.message.completed":
        case "thread.message.incomplete":
          if (snapshot) {
            return [snapshot, newContent];
          } else {
            throw Error("Received thread message event with no existing snapshot");
          }
      }
      throw Error("Tried to accumulate a non-message event");
    }, _AssistantStream_accumulateContent = function _AssistantStream_accumulateContent2(contentElement, currentContent) {
      return AssistantStream.accumulateDelta(currentContent, contentElement);
    }, _AssistantStream_handleRun = function _AssistantStream_handleRun2(event) {
      __classPrivateFieldSet(this, _AssistantStream_currentRunSnapshot, event.data, "f");
      switch (event.event) {
        case "thread.run.created":
          break;
        case "thread.run.queued":
          break;
        case "thread.run.in_progress":
          break;
        case "thread.run.requires_action":
        case "thread.run.cancelled":
        case "thread.run.failed":
        case "thread.run.completed":
        case "thread.run.expired":
          __classPrivateFieldSet(this, _AssistantStream_finalRun, event.data, "f");
          if (__classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f")) {
            this._emit("toolCallDone", __classPrivateFieldGet(this, _AssistantStream_currentToolCall, "f"));
            __classPrivateFieldSet(this, _AssistantStream_currentToolCall, void 0, "f");
          }
          break;
        case "thread.run.cancelling":
          break;
      }
    };
  }
});

// node_modules/openai/resources/beta/threads/messages.js
var require_messages = __commonJS({
  "node_modules/openai/resources/beta/threads/messages.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessagesPage = exports.Messages = void 0;
    var resource_1 = require_resource();
    var core_1 = require_core();
    var pagination_1 = require_pagination();
    var Messages = class extends resource_1.APIResource {
      /**
       * Create a message.
       */
      create(threadId, body, options) {
        return this._client.post(`/threads/${threadId}/messages`, __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Retrieve a message.
       */
      retrieve(threadId, messageId, options) {
        return this._client.get(`/threads/${threadId}/messages/${messageId}`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Modifies a message.
       */
      update(threadId, messageId, body, options) {
        return this._client.post(`/threads/${threadId}/messages/${messageId}`, __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      list(threadId, query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.list(threadId, {}, query);
        }
        return this._client.getAPIList(`/threads/${threadId}/messages`, MessagesPage, __spreadProps(__spreadValues({
          query
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Deletes a message.
       */
      del(threadId, messageId, options) {
        return this._client.delete(`/threads/${threadId}/messages/${messageId}`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
    };
    exports.Messages = Messages;
    var MessagesPage = class extends pagination_1.CursorPage {
    };
    exports.MessagesPage = MessagesPage;
    Messages.MessagesPage = MessagesPage;
  }
});

// node_modules/openai/resources/beta/threads/runs/steps.js
var require_steps = __commonJS({
  "node_modules/openai/resources/beta/threads/runs/steps.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RunStepsPage = exports.Steps = void 0;
    var resource_1 = require_resource();
    var core_1 = require_core();
    var pagination_1 = require_pagination();
    var Steps = class extends resource_1.APIResource {
      retrieve(threadId, runId, stepId, query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.retrieve(threadId, runId, stepId, {}, query);
        }
        return this._client.get(`/threads/${threadId}/runs/${runId}/steps/${stepId}`, __spreadProps(__spreadValues({
          query
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      list(threadId, runId, query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.list(threadId, runId, {}, query);
        }
        return this._client.getAPIList(`/threads/${threadId}/runs/${runId}/steps`, RunStepsPage, __spreadProps(__spreadValues({
          query
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
    };
    exports.Steps = Steps;
    var RunStepsPage = class extends pagination_1.CursorPage {
    };
    exports.RunStepsPage = RunStepsPage;
    Steps.RunStepsPage = RunStepsPage;
  }
});

// node_modules/openai/resources/beta/threads/runs/runs.js
var require_runs = __commonJS({
  "node_modules/openai/resources/beta/threads/runs/runs.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RunsPage = exports.Runs = void 0;
    var resource_1 = require_resource();
    var core_1 = require_core();
    var AssistantStream_1 = require_AssistantStream();
    var core_2 = require_core();
    var StepsAPI = __importStar(require_steps());
    var steps_1 = require_steps();
    var pagination_1 = require_pagination();
    var Runs = class extends resource_1.APIResource {
      constructor() {
        super(...arguments);
        this.steps = new StepsAPI.Steps(this._client);
      }
      create(threadId, params, options) {
        var _b;
        const _a = params, { include } = _a, body = __objRest(_a, ["include"]);
        return this._client.post(`/threads/${threadId}/runs`, __spreadProps(__spreadValues({
          query: { include },
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers),
          stream: (_b = params.stream) != null ? _b : false
        }));
      }
      /**
       * Retrieves a run.
       */
      retrieve(threadId, runId, options) {
        return this._client.get(`/threads/${threadId}/runs/${runId}`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Modifies a run.
       */
      update(threadId, runId, body, options) {
        return this._client.post(`/threads/${threadId}/runs/${runId}`, __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      list(threadId, query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.list(threadId, {}, query);
        }
        return this._client.getAPIList(`/threads/${threadId}/runs`, RunsPage, __spreadProps(__spreadValues({
          query
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Cancels a run that is `in_progress`.
       */
      cancel(threadId, runId, options) {
        return this._client.post(`/threads/${threadId}/runs/${runId}/cancel`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * A helper to create a run an poll for a terminal state. More information on Run
       * lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      async createAndPoll(threadId, body, options) {
        const run = await this.create(threadId, body, options);
        return await this.poll(threadId, run.id, options);
      }
      /**
       * Create a Run stream
       *
       * @deprecated use `stream` instead
       */
      createAndStream(threadId, body, options) {
        return AssistantStream_1.AssistantStream.createAssistantStream(threadId, this._client.beta.threads.runs, body, options);
      }
      /**
       * A helper to poll a run status until it reaches a terminal state. More
       * information on Run lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      async poll(threadId, runId, options) {
        const headers = __spreadProps(__spreadValues({}, options == null ? void 0 : options.headers), { "X-Stainless-Poll-Helper": "true" });
        if (options == null ? void 0 : options.pollIntervalMs) {
          headers["X-Stainless-Custom-Poll-Interval"] = options.pollIntervalMs.toString();
        }
        while (true) {
          const { data: run, response } = await this.retrieve(threadId, runId, __spreadProps(__spreadValues({}, options), {
            headers: __spreadValues(__spreadValues({}, options == null ? void 0 : options.headers), headers)
          })).withResponse();
          switch (run.status) {
            //If we are in any sort of intermediate state we poll
            case "queued":
            case "in_progress":
            case "cancelling":
              let sleepInterval = 5e3;
              if (options == null ? void 0 : options.pollIntervalMs) {
                sleepInterval = options.pollIntervalMs;
              } else {
                const headerInterval = response.headers.get("openai-poll-after-ms");
                if (headerInterval) {
                  const headerIntervalMs = parseInt(headerInterval);
                  if (!isNaN(headerIntervalMs)) {
                    sleepInterval = headerIntervalMs;
                  }
                }
              }
              await (0, core_2.sleep)(sleepInterval);
              break;
            //We return the run in any terminal state.
            case "requires_action":
            case "incomplete":
            case "cancelled":
            case "completed":
            case "failed":
            case "expired":
              return run;
          }
        }
      }
      /**
       * Create a Run stream
       */
      stream(threadId, body, options) {
        return AssistantStream_1.AssistantStream.createAssistantStream(threadId, this._client.beta.threads.runs, body, options);
      }
      submitToolOutputs(threadId, runId, body, options) {
        var _a;
        return this._client.post(`/threads/${threadId}/runs/${runId}/submit_tool_outputs`, __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers),
          stream: (_a = body.stream) != null ? _a : false
        }));
      }
      /**
       * A helper to submit a tool output to a run and poll for a terminal run state.
       * More information on Run lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      async submitToolOutputsAndPoll(threadId, runId, body, options) {
        const run = await this.submitToolOutputs(threadId, runId, body, options);
        return await this.poll(threadId, run.id, options);
      }
      /**
       * Submit the tool outputs from a previous run and stream the run to a terminal
       * state. More information on Run lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      submitToolOutputsStream(threadId, runId, body, options) {
        return AssistantStream_1.AssistantStream.createToolAssistantStream(threadId, runId, this._client.beta.threads.runs, body, options);
      }
    };
    exports.Runs = Runs;
    var RunsPage = class extends pagination_1.CursorPage {
    };
    exports.RunsPage = RunsPage;
    Runs.RunsPage = RunsPage;
    Runs.Steps = steps_1.Steps;
    Runs.RunStepsPage = steps_1.RunStepsPage;
  }
});

// node_modules/openai/resources/beta/threads/threads.js
var require_threads = __commonJS({
  "node_modules/openai/resources/beta/threads/threads.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Threads = void 0;
    var resource_1 = require_resource();
    var core_1 = require_core();
    var AssistantStream_1 = require_AssistantStream();
    var MessagesAPI = __importStar(require_messages());
    var messages_1 = require_messages();
    var RunsAPI = __importStar(require_runs());
    var runs_1 = require_runs();
    var Threads = class extends resource_1.APIResource {
      constructor() {
        super(...arguments);
        this.runs = new RunsAPI.Runs(this._client);
        this.messages = new MessagesAPI.Messages(this._client);
      }
      create(body = {}, options) {
        if ((0, core_1.isRequestOptions)(body)) {
          return this.create({}, body);
        }
        return this._client.post("/threads", __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Retrieves a thread.
       */
      retrieve(threadId, options) {
        return this._client.get(`/threads/${threadId}`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Modifies a thread.
       */
      update(threadId, body, options) {
        return this._client.post(`/threads/${threadId}`, __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Delete a thread.
       */
      del(threadId, options) {
        return this._client.delete(`/threads/${threadId}`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      createAndRun(body, options) {
        var _a;
        return this._client.post("/threads/runs", __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers),
          stream: (_a = body.stream) != null ? _a : false
        }));
      }
      /**
       * A helper to create a thread, start a run and then poll for a terminal state.
       * More information on Run lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      async createAndRunPoll(body, options) {
        const run = await this.createAndRun(body, options);
        return await this.runs.poll(run.thread_id, run.id, options);
      }
      /**
       * Create a thread and stream the run back
       */
      createAndRunStream(body, options) {
        return AssistantStream_1.AssistantStream.createThreadAssistantStream(body, this._client.beta.threads, options);
      }
    };
    exports.Threads = Threads;
    Threads.Runs = runs_1.Runs;
    Threads.RunsPage = runs_1.RunsPage;
    Threads.Messages = messages_1.Messages;
    Threads.MessagesPage = messages_1.MessagesPage;
  }
});

// node_modules/openai/lib/Util.js
var require_Util = __commonJS({
  "node_modules/openai/lib/Util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.allSettledWithThrow = void 0;
    var allSettledWithThrow = async (promises) => {
      const results = await Promise.allSettled(promises);
      const rejected = results.filter((result) => result.status === "rejected");
      if (rejected.length) {
        for (const result of rejected) {
          console.error(result.reason);
        }
        throw new Error(`${rejected.length} promise(s) failed - see the above errors`);
      }
      const values = [];
      for (const result of results) {
        if (result.status === "fulfilled") {
          values.push(result.value);
        }
      }
      return values;
    };
    exports.allSettledWithThrow = allSettledWithThrow;
  }
});

// node_modules/openai/resources/beta/vector-stores/files.js
var require_files = __commonJS({
  "node_modules/openai/resources/beta/vector-stores/files.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VectorStoreFilesPage = exports.Files = void 0;
    var resource_1 = require_resource();
    var core_1 = require_core();
    var pagination_1 = require_pagination();
    var Files = class extends resource_1.APIResource {
      /**
       * Create a vector store file by attaching a
       * [File](https://platform.openai.com/docs/api-reference/files) to a
       * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object).
       */
      create(vectorStoreId, body, options) {
        return this._client.post(`/vector_stores/${vectorStoreId}/files`, __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Retrieves a vector store file.
       */
      retrieve(vectorStoreId, fileId, options) {
        return this._client.get(`/vector_stores/${vectorStoreId}/files/${fileId}`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      list(vectorStoreId, query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.list(vectorStoreId, {}, query);
        }
        return this._client.getAPIList(`/vector_stores/${vectorStoreId}/files`, VectorStoreFilesPage, __spreadProps(__spreadValues({
          query
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Delete a vector store file. This will remove the file from the vector store but
       * the file itself will not be deleted. To delete the file, use the
       * [delete file](https://platform.openai.com/docs/api-reference/files/delete)
       * endpoint.
       */
      del(vectorStoreId, fileId, options) {
        return this._client.delete(`/vector_stores/${vectorStoreId}/files/${fileId}`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Attach a file to the given vector store and wait for it to be processed.
       */
      async createAndPoll(vectorStoreId, body, options) {
        const file = await this.create(vectorStoreId, body, options);
        return await this.poll(vectorStoreId, file.id, options);
      }
      /**
       * Wait for the vector store file to finish processing.
       *
       * Note: this will return even if the file failed to process, you need to check
       * file.last_error and file.status to handle these cases
       */
      async poll(vectorStoreId, fileId, options) {
        const headers = __spreadProps(__spreadValues({}, options == null ? void 0 : options.headers), { "X-Stainless-Poll-Helper": "true" });
        if (options == null ? void 0 : options.pollIntervalMs) {
          headers["X-Stainless-Custom-Poll-Interval"] = options.pollIntervalMs.toString();
        }
        while (true) {
          const fileResponse = await this.retrieve(vectorStoreId, fileId, __spreadProps(__spreadValues({}, options), {
            headers
          })).withResponse();
          const file = fileResponse.data;
          switch (file.status) {
            case "in_progress":
              let sleepInterval = 5e3;
              if (options == null ? void 0 : options.pollIntervalMs) {
                sleepInterval = options.pollIntervalMs;
              } else {
                const headerInterval = fileResponse.response.headers.get("openai-poll-after-ms");
                if (headerInterval) {
                  const headerIntervalMs = parseInt(headerInterval);
                  if (!isNaN(headerIntervalMs)) {
                    sleepInterval = headerIntervalMs;
                  }
                }
              }
              await (0, core_1.sleep)(sleepInterval);
              break;
            case "failed":
            case "completed":
              return file;
          }
        }
      }
      /**
       * Upload a file to the `files` API and then attach it to the given vector store.
       *
       * Note the file will be asynchronously processed (you can use the alternative
       * polling helper method to wait for processing to complete).
       */
      async upload(vectorStoreId, file, options) {
        const fileInfo = await this._client.files.create({ file, purpose: "assistants" }, options);
        return this.create(vectorStoreId, { file_id: fileInfo.id }, options);
      }
      /**
       * Add a file to a vector store and poll until processing is complete.
       */
      async uploadAndPoll(vectorStoreId, file, options) {
        const fileInfo = await this.upload(vectorStoreId, file, options);
        return await this.poll(vectorStoreId, fileInfo.id, options);
      }
    };
    exports.Files = Files;
    var VectorStoreFilesPage = class extends pagination_1.CursorPage {
    };
    exports.VectorStoreFilesPage = VectorStoreFilesPage;
    Files.VectorStoreFilesPage = VectorStoreFilesPage;
  }
});

// node_modules/openai/resources/beta/vector-stores/file-batches.js
var require_file_batches = __commonJS({
  "node_modules/openai/resources/beta/vector-stores/file-batches.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VectorStoreFilesPage = exports.FileBatches = void 0;
    var resource_1 = require_resource();
    var core_1 = require_core();
    var core_2 = require_core();
    var Util_1 = require_Util();
    var files_1 = require_files();
    Object.defineProperty(exports, "VectorStoreFilesPage", { enumerable: true, get: function() {
      return files_1.VectorStoreFilesPage;
    } });
    var FileBatches = class extends resource_1.APIResource {
      /**
       * Create a vector store file batch.
       */
      create(vectorStoreId, body, options) {
        return this._client.post(`/vector_stores/${vectorStoreId}/file_batches`, __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Retrieves a vector store file batch.
       */
      retrieve(vectorStoreId, batchId, options) {
        return this._client.get(`/vector_stores/${vectorStoreId}/file_batches/${batchId}`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Cancel a vector store file batch. This attempts to cancel the processing of
       * files in this batch as soon as possible.
       */
      cancel(vectorStoreId, batchId, options) {
        return this._client.post(`/vector_stores/${vectorStoreId}/file_batches/${batchId}/cancel`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Create a vector store batch and poll until all files have been processed.
       */
      async createAndPoll(vectorStoreId, body, options) {
        const batch = await this.create(vectorStoreId, body);
        return await this.poll(vectorStoreId, batch.id, options);
      }
      listFiles(vectorStoreId, batchId, query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.listFiles(vectorStoreId, batchId, {}, query);
        }
        return this._client.getAPIList(`/vector_stores/${vectorStoreId}/file_batches/${batchId}/files`, files_1.VectorStoreFilesPage, __spreadProps(__spreadValues({ query }, options), { headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers) }));
      }
      /**
       * Wait for the given file batch to be processed.
       *
       * Note: this will return even if one of the files failed to process, you need to
       * check batch.file_counts.failed_count to handle this case.
       */
      async poll(vectorStoreId, batchId, options) {
        const headers = __spreadProps(__spreadValues({}, options == null ? void 0 : options.headers), { "X-Stainless-Poll-Helper": "true" });
        if (options == null ? void 0 : options.pollIntervalMs) {
          headers["X-Stainless-Custom-Poll-Interval"] = options.pollIntervalMs.toString();
        }
        while (true) {
          const { data: batch, response } = await this.retrieve(vectorStoreId, batchId, __spreadProps(__spreadValues({}, options), {
            headers
          })).withResponse();
          switch (batch.status) {
            case "in_progress":
              let sleepInterval = 5e3;
              if (options == null ? void 0 : options.pollIntervalMs) {
                sleepInterval = options.pollIntervalMs;
              } else {
                const headerInterval = response.headers.get("openai-poll-after-ms");
                if (headerInterval) {
                  const headerIntervalMs = parseInt(headerInterval);
                  if (!isNaN(headerIntervalMs)) {
                    sleepInterval = headerIntervalMs;
                  }
                }
              }
              await (0, core_2.sleep)(sleepInterval);
              break;
            case "failed":
            case "cancelled":
            case "completed":
              return batch;
          }
        }
      }
      /**
       * Uploads the given files concurrently and then creates a vector store file batch.
       *
       * The concurrency limit is configurable using the `maxConcurrency` parameter.
       */
      async uploadAndPoll(vectorStoreId, { files, fileIds = [] }, options) {
        var _a;
        if (files == null || files.length == 0) {
          throw new Error(`No \`files\` provided to process. If you've already uploaded files you should use \`.createAndPoll()\` instead`);
        }
        const configuredConcurrency = (_a = options == null ? void 0 : options.maxConcurrency) != null ? _a : 5;
        const concurrencyLimit = Math.min(configuredConcurrency, files.length);
        const client = this._client;
        const fileIterator = files.values();
        const allFileIds = [...fileIds];
        async function processFiles(iterator) {
          for (let item of iterator) {
            const fileObj = await client.files.create({ file: item, purpose: "assistants" }, options);
            allFileIds.push(fileObj.id);
          }
        }
        const workers = Array(concurrencyLimit).fill(fileIterator).map(processFiles);
        await (0, Util_1.allSettledWithThrow)(workers);
        return await this.createAndPoll(vectorStoreId, {
          file_ids: allFileIds
        });
      }
    };
    exports.FileBatches = FileBatches;
  }
});

// node_modules/openai/resources/beta/vector-stores/vector-stores.js
var require_vector_stores = __commonJS({
  "node_modules/openai/resources/beta/vector-stores/vector-stores.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VectorStoresPage = exports.VectorStores = void 0;
    var resource_1 = require_resource();
    var core_1 = require_core();
    var FileBatchesAPI = __importStar(require_file_batches());
    var file_batches_1 = require_file_batches();
    var FilesAPI = __importStar(require_files());
    var files_1 = require_files();
    var pagination_1 = require_pagination();
    var VectorStores = class extends resource_1.APIResource {
      constructor() {
        super(...arguments);
        this.files = new FilesAPI.Files(this._client);
        this.fileBatches = new FileBatchesAPI.FileBatches(this._client);
      }
      /**
       * Create a vector store.
       */
      create(body, options) {
        return this._client.post("/vector_stores", __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Retrieves a vector store.
       */
      retrieve(vectorStoreId, options) {
        return this._client.get(`/vector_stores/${vectorStoreId}`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Modifies a vector store.
       */
      update(vectorStoreId, body, options) {
        return this._client.post(`/vector_stores/${vectorStoreId}`, __spreadProps(__spreadValues({
          body
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      list(query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/vector_stores", VectorStoresPage, __spreadProps(__spreadValues({
          query
        }, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
      /**
       * Delete a vector store.
       */
      del(vectorStoreId, options) {
        return this._client.delete(`/vector_stores/${vectorStoreId}`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ "OpenAI-Beta": "assistants=v2" }, options == null ? void 0 : options.headers)
        }));
      }
    };
    exports.VectorStores = VectorStores;
    var VectorStoresPage = class extends pagination_1.CursorPage {
    };
    exports.VectorStoresPage = VectorStoresPage;
    VectorStores.VectorStoresPage = VectorStoresPage;
    VectorStores.Files = files_1.Files;
    VectorStores.VectorStoreFilesPage = files_1.VectorStoreFilesPage;
    VectorStores.FileBatches = file_batches_1.FileBatches;
  }
});

// node_modules/openai/resources/beta/beta.js
var require_beta = __commonJS({
  "node_modules/openai/resources/beta/beta.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Beta = void 0;
    var resource_1 = require_resource();
    var AssistantsAPI = __importStar(require_assistants());
    var ChatAPI = __importStar(require_chat3());
    var assistants_1 = require_assistants();
    var RealtimeAPI = __importStar(require_realtime());
    var realtime_1 = require_realtime();
    var ThreadsAPI = __importStar(require_threads());
    var threads_1 = require_threads();
    var VectorStoresAPI = __importStar(require_vector_stores());
    var vector_stores_1 = require_vector_stores();
    var chat_1 = require_chat3();
    var Beta = class extends resource_1.APIResource {
      constructor() {
        super(...arguments);
        this.realtime = new RealtimeAPI.Realtime(this._client);
        this.vectorStores = new VectorStoresAPI.VectorStores(this._client);
        this.chat = new ChatAPI.Chat(this._client);
        this.assistants = new AssistantsAPI.Assistants(this._client);
        this.threads = new ThreadsAPI.Threads(this._client);
      }
    };
    exports.Beta = Beta;
    Beta.Realtime = realtime_1.Realtime;
    Beta.VectorStores = vector_stores_1.VectorStores;
    Beta.VectorStoresPage = vector_stores_1.VectorStoresPage;
    Beta.Assistants = assistants_1.Assistants;
    Beta.AssistantsPage = assistants_1.AssistantsPage;
    Beta.Threads = threads_1.Threads;
  }
});

// node_modules/openai/resources/completions.js
var require_completions3 = __commonJS({
  "node_modules/openai/resources/completions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Completions = void 0;
    var resource_1 = require_resource();
    var Completions = class extends resource_1.APIResource {
      create(body, options) {
        var _a;
        return this._client.post("/completions", __spreadProps(__spreadValues({ body }, options), { stream: (_a = body.stream) != null ? _a : false }));
      }
    };
    exports.Completions = Completions;
  }
});

// node_modules/openai/resources/embeddings.js
var require_embeddings = __commonJS({
  "node_modules/openai/resources/embeddings.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Embeddings = void 0;
    var resource_1 = require_resource();
    var Embeddings = class extends resource_1.APIResource {
      /**
       * Creates an embedding vector representing the input text.
       */
      create(body, options) {
        return this._client.post("/embeddings", __spreadValues({ body }, options));
      }
    };
    exports.Embeddings = Embeddings;
  }
});

// node_modules/openai/resources/files.js
var require_files2 = __commonJS({
  "node_modules/openai/resources/files.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileObjectsPage = exports.Files = void 0;
    var resource_1 = require_resource();
    var core_1 = require_core();
    var core_2 = require_core();
    var error_1 = require_error();
    var Core = __importStar(require_core());
    var pagination_1 = require_pagination();
    var Files = class extends resource_1.APIResource {
      /**
       * Upload a file that can be used across various endpoints. Individual files can be
       * up to 512 MB, and the size of all files uploaded by one organization can be up
       * to 100 GB.
       *
       * The Assistants API supports files up to 2 million tokens and of specific file
       * types. See the
       * [Assistants Tools guide](https://platform.openai.com/docs/assistants/tools) for
       * details.
       *
       * The Fine-tuning API only supports `.jsonl` files. The input also has certain
       * required formats for fine-tuning
       * [chat](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input) or
       * [completions](https://platform.openai.com/docs/api-reference/fine-tuning/completions-input)
       * models.
       *
       * The Batch API only supports `.jsonl` files up to 200 MB in size. The input also
       * has a specific required
       * [format](https://platform.openai.com/docs/api-reference/batch/request-input).
       *
       * Please [contact us](https://help.openai.com/) if you need to increase these
       * storage limits.
       */
      create(body, options) {
        return this._client.post("/files", Core.multipartFormRequestOptions(__spreadValues({ body }, options)));
      }
      /**
       * Returns information about a specific file.
       */
      retrieve(fileId, options) {
        return this._client.get(`/files/${fileId}`, options);
      }
      list(query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/files", FileObjectsPage, __spreadValues({ query }, options));
      }
      /**
       * Delete a file.
       */
      del(fileId, options) {
        return this._client.delete(`/files/${fileId}`, options);
      }
      /**
       * Returns the contents of the specified file.
       */
      content(fileId, options) {
        return this._client.get(`/files/${fileId}/content`, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues({ Accept: "application/binary" }, options == null ? void 0 : options.headers),
          __binaryResponse: true
        }));
      }
      /**
       * Returns the contents of the specified file.
       *
       * @deprecated The `.content()` method should be used instead
       */
      retrieveContent(fileId, options) {
        return this._client.get(`/files/${fileId}/content`, options);
      }
      /**
       * Waits for the given file to be processed, default timeout is 30 mins.
       */
      async waitForProcessing(id, { pollInterval = 5e3, maxWait = 30 * 60 * 1e3 } = {}) {
        const TERMINAL_STATES = /* @__PURE__ */ new Set(["processed", "error", "deleted"]);
        const start = Date.now();
        let file = await this.retrieve(id);
        while (!file.status || !TERMINAL_STATES.has(file.status)) {
          await (0, core_2.sleep)(pollInterval);
          file = await this.retrieve(id);
          if (Date.now() - start > maxWait) {
            throw new error_1.APIConnectionTimeoutError({
              message: `Giving up on waiting for file ${id} to finish processing after ${maxWait} milliseconds.`
            });
          }
        }
        return file;
      }
    };
    exports.Files = Files;
    var FileObjectsPage = class extends pagination_1.CursorPage {
    };
    exports.FileObjectsPage = FileObjectsPage;
    Files.FileObjectsPage = FileObjectsPage;
  }
});

// node_modules/openai/resources/fine-tuning/jobs/checkpoints.js
var require_checkpoints = __commonJS({
  "node_modules/openai/resources/fine-tuning/jobs/checkpoints.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FineTuningJobCheckpointsPage = exports.Checkpoints = void 0;
    var resource_1 = require_resource();
    var core_1 = require_core();
    var pagination_1 = require_pagination();
    var Checkpoints = class extends resource_1.APIResource {
      list(fineTuningJobId, query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.list(fineTuningJobId, {}, query);
        }
        return this._client.getAPIList(`/fine_tuning/jobs/${fineTuningJobId}/checkpoints`, FineTuningJobCheckpointsPage, __spreadValues({ query }, options));
      }
    };
    exports.Checkpoints = Checkpoints;
    var FineTuningJobCheckpointsPage = class extends pagination_1.CursorPage {
    };
    exports.FineTuningJobCheckpointsPage = FineTuningJobCheckpointsPage;
    Checkpoints.FineTuningJobCheckpointsPage = FineTuningJobCheckpointsPage;
  }
});

// node_modules/openai/resources/fine-tuning/jobs/jobs.js
var require_jobs = __commonJS({
  "node_modules/openai/resources/fine-tuning/jobs/jobs.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FineTuningJobEventsPage = exports.FineTuningJobsPage = exports.Jobs = void 0;
    var resource_1 = require_resource();
    var core_1 = require_core();
    var CheckpointsAPI = __importStar(require_checkpoints());
    var checkpoints_1 = require_checkpoints();
    var pagination_1 = require_pagination();
    var Jobs = class extends resource_1.APIResource {
      constructor() {
        super(...arguments);
        this.checkpoints = new CheckpointsAPI.Checkpoints(this._client);
      }
      /**
       * Creates a fine-tuning job which begins the process of creating a new model from
       * a given dataset.
       *
       * Response includes details of the enqueued job including job status and the name
       * of the fine-tuned models once complete.
       *
       * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
       */
      create(body, options) {
        return this._client.post("/fine_tuning/jobs", __spreadValues({ body }, options));
      }
      /**
       * Get info about a fine-tuning job.
       *
       * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
       */
      retrieve(fineTuningJobId, options) {
        return this._client.get(`/fine_tuning/jobs/${fineTuningJobId}`, options);
      }
      list(query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/fine_tuning/jobs", FineTuningJobsPage, __spreadValues({ query }, options));
      }
      /**
       * Immediately cancel a fine-tune job.
       */
      cancel(fineTuningJobId, options) {
        return this._client.post(`/fine_tuning/jobs/${fineTuningJobId}/cancel`, options);
      }
      listEvents(fineTuningJobId, query = {}, options) {
        if ((0, core_1.isRequestOptions)(query)) {
          return this.listEvents(fineTuningJobId, {}, query);
        }
        return this._client.getAPIList(`/fine_tuning/jobs/${fineTuningJobId}/events`, FineTuningJobEventsPage, __spreadValues({
          query
        }, options));
      }
    };
    exports.Jobs = Jobs;
    var FineTuningJobsPage = class extends pagination_1.CursorPage {
    };
    exports.FineTuningJobsPage = FineTuningJobsPage;
    var FineTuningJobEventsPage = class extends pagination_1.CursorPage {
    };
    exports.FineTuningJobEventsPage = FineTuningJobEventsPage;
    Jobs.FineTuningJobsPage = FineTuningJobsPage;
    Jobs.FineTuningJobEventsPage = FineTuningJobEventsPage;
    Jobs.Checkpoints = checkpoints_1.Checkpoints;
    Jobs.FineTuningJobCheckpointsPage = checkpoints_1.FineTuningJobCheckpointsPage;
  }
});

// node_modules/openai/resources/fine-tuning/fine-tuning.js
var require_fine_tuning = __commonJS({
  "node_modules/openai/resources/fine-tuning/fine-tuning.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FineTuning = void 0;
    var resource_1 = require_resource();
    var JobsAPI = __importStar(require_jobs());
    var jobs_1 = require_jobs();
    var FineTuning = class extends resource_1.APIResource {
      constructor() {
        super(...arguments);
        this.jobs = new JobsAPI.Jobs(this._client);
      }
    };
    exports.FineTuning = FineTuning;
    FineTuning.Jobs = jobs_1.Jobs;
    FineTuning.FineTuningJobsPage = jobs_1.FineTuningJobsPage;
    FineTuning.FineTuningJobEventsPage = jobs_1.FineTuningJobEventsPage;
  }
});

// node_modules/openai/resources/images.js
var require_images = __commonJS({
  "node_modules/openai/resources/images.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Images = void 0;
    var resource_1 = require_resource();
    var Core = __importStar(require_core());
    var Images = class extends resource_1.APIResource {
      /**
       * Creates a variation of a given image.
       */
      createVariation(body, options) {
        return this._client.post("/images/variations", Core.multipartFormRequestOptions(__spreadValues({ body }, options)));
      }
      /**
       * Creates an edited or extended image given an original image and a prompt.
       */
      edit(body, options) {
        return this._client.post("/images/edits", Core.multipartFormRequestOptions(__spreadValues({ body }, options)));
      }
      /**
       * Creates an image given a prompt.
       */
      generate(body, options) {
        return this._client.post("/images/generations", __spreadValues({ body }, options));
      }
    };
    exports.Images = Images;
  }
});

// node_modules/openai/resources/models.js
var require_models = __commonJS({
  "node_modules/openai/resources/models.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ModelsPage = exports.Models = void 0;
    var resource_1 = require_resource();
    var pagination_1 = require_pagination();
    var Models = class extends resource_1.APIResource {
      /**
       * Retrieves a model instance, providing basic information about the model such as
       * the owner and permissioning.
       */
      retrieve(model, options) {
        return this._client.get(`/models/${model}`, options);
      }
      /**
       * Lists the currently available models, and provides basic information about each
       * one such as the owner and availability.
       */
      list(options) {
        return this._client.getAPIList("/models", ModelsPage, options);
      }
      /**
       * Delete a fine-tuned model. You must have the Owner role in your organization to
       * delete a model.
       */
      del(model, options) {
        return this._client.delete(`/models/${model}`, options);
      }
    };
    exports.Models = Models;
    var ModelsPage = class extends pagination_1.Page {
    };
    exports.ModelsPage = ModelsPage;
    Models.ModelsPage = ModelsPage;
  }
});

// node_modules/openai/resources/moderations.js
var require_moderations = __commonJS({
  "node_modules/openai/resources/moderations.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Moderations = void 0;
    var resource_1 = require_resource();
    var Moderations = class extends resource_1.APIResource {
      /**
       * Classifies if text and/or image inputs are potentially harmful. Learn more in
       * the [moderation guide](https://platform.openai.com/docs/guides/moderation).
       */
      create(body, options) {
        return this._client.post("/moderations", __spreadValues({ body }, options));
      }
    };
    exports.Moderations = Moderations;
  }
});

// node_modules/openai/resources/uploads/parts.js
var require_parts = __commonJS({
  "node_modules/openai/resources/uploads/parts.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parts = void 0;
    var resource_1 = require_resource();
    var Core = __importStar(require_core());
    var Parts = class extends resource_1.APIResource {
      /**
       * Adds a
       * [Part](https://platform.openai.com/docs/api-reference/uploads/part-object) to an
       * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object.
       * A Part represents a chunk of bytes from the file you are trying to upload.
       *
       * Each Part can be at most 64 MB, and you can add Parts until you hit the Upload
       * maximum of 8 GB.
       *
       * It is possible to add multiple Parts in parallel. You can decide the intended
       * order of the Parts when you
       * [complete the Upload](https://platform.openai.com/docs/api-reference/uploads/complete).
       */
      create(uploadId, body, options) {
        return this._client.post(`/uploads/${uploadId}/parts`, Core.multipartFormRequestOptions(__spreadValues({ body }, options)));
      }
    };
    exports.Parts = Parts;
  }
});

// node_modules/openai/resources/uploads/uploads.js
var require_uploads2 = __commonJS({
  "node_modules/openai/resources/uploads/uploads.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Uploads = void 0;
    var resource_1 = require_resource();
    var PartsAPI = __importStar(require_parts());
    var parts_1 = require_parts();
    var Uploads = class extends resource_1.APIResource {
      constructor() {
        super(...arguments);
        this.parts = new PartsAPI.Parts(this._client);
      }
      /**
       * Creates an intermediate
       * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object
       * that you can add
       * [Parts](https://platform.openai.com/docs/api-reference/uploads/part-object) to.
       * Currently, an Upload can accept at most 8 GB in total and expires after an hour
       * after you create it.
       *
       * Once you complete the Upload, we will create a
       * [File](https://platform.openai.com/docs/api-reference/files/object) object that
       * contains all the parts you uploaded. This File is usable in the rest of our
       * platform as a regular File object.
       *
       * For certain `purpose`s, the correct `mime_type` must be specified. Please refer
       * to documentation for the supported MIME types for your use case:
       *
       * - [Assistants](https://platform.openai.com/docs/assistants/tools/file-search#supported-files)
       *
       * For guidance on the proper filename extensions for each purpose, please follow
       * the documentation on
       * [creating a File](https://platform.openai.com/docs/api-reference/files/create).
       */
      create(body, options) {
        return this._client.post("/uploads", __spreadValues({ body }, options));
      }
      /**
       * Cancels the Upload. No Parts may be added after an Upload is cancelled.
       */
      cancel(uploadId, options) {
        return this._client.post(`/uploads/${uploadId}/cancel`, options);
      }
      /**
       * Completes the
       * [Upload](https://platform.openai.com/docs/api-reference/uploads/object).
       *
       * Within the returned Upload object, there is a nested
       * [File](https://platform.openai.com/docs/api-reference/files/object) object that
       * is ready to use in the rest of the platform.
       *
       * You can specify the order of the Parts by passing in an ordered list of the Part
       * IDs.
       *
       * The number of bytes uploaded upon completion must match the number of bytes
       * initially specified when creating the Upload object. No Parts may be added after
       * an Upload is completed.
       */
      complete(uploadId, body, options) {
        return this._client.post(`/uploads/${uploadId}/complete`, __spreadValues({ body }, options));
      }
    };
    exports.Uploads = Uploads;
    Uploads.Parts = parts_1.Parts;
  }
});

// node_modules/openai/resources/index.js
var require_resources = __commonJS({
  "node_modules/openai/resources/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Uploads = exports.Moderations = exports.Models = exports.ModelsPage = exports.Images = exports.FineTuning = exports.Files = exports.FileObjectsPage = exports.Embeddings = exports.Completions = exports.Beta = exports.Batches = exports.BatchesPage = exports.Audio = void 0;
    __exportStar(require_chat2(), exports);
    __exportStar(require_shared(), exports);
    var audio_1 = require_audio();
    Object.defineProperty(exports, "Audio", { enumerable: true, get: function() {
      return audio_1.Audio;
    } });
    var batches_1 = require_batches();
    Object.defineProperty(exports, "BatchesPage", { enumerable: true, get: function() {
      return batches_1.BatchesPage;
    } });
    Object.defineProperty(exports, "Batches", { enumerable: true, get: function() {
      return batches_1.Batches;
    } });
    var beta_1 = require_beta();
    Object.defineProperty(exports, "Beta", { enumerable: true, get: function() {
      return beta_1.Beta;
    } });
    var completions_1 = require_completions3();
    Object.defineProperty(exports, "Completions", { enumerable: true, get: function() {
      return completions_1.Completions;
    } });
    var embeddings_1 = require_embeddings();
    Object.defineProperty(exports, "Embeddings", { enumerable: true, get: function() {
      return embeddings_1.Embeddings;
    } });
    var files_1 = require_files2();
    Object.defineProperty(exports, "FileObjectsPage", { enumerable: true, get: function() {
      return files_1.FileObjectsPage;
    } });
    Object.defineProperty(exports, "Files", { enumerable: true, get: function() {
      return files_1.Files;
    } });
    var fine_tuning_1 = require_fine_tuning();
    Object.defineProperty(exports, "FineTuning", { enumerable: true, get: function() {
      return fine_tuning_1.FineTuning;
    } });
    var images_1 = require_images();
    Object.defineProperty(exports, "Images", { enumerable: true, get: function() {
      return images_1.Images;
    } });
    var models_1 = require_models();
    Object.defineProperty(exports, "ModelsPage", { enumerable: true, get: function() {
      return models_1.ModelsPage;
    } });
    Object.defineProperty(exports, "Models", { enumerable: true, get: function() {
      return models_1.Models;
    } });
    var moderations_1 = require_moderations();
    Object.defineProperty(exports, "Moderations", { enumerable: true, get: function() {
      return moderations_1.Moderations;
    } });
    var uploads_1 = require_uploads2();
    Object.defineProperty(exports, "Uploads", { enumerable: true, get: function() {
      return uploads_1.Uploads;
    } });
  }
});

// node_modules/openai/index.js
var require_openai = __commonJS({
  "node_modules/openai/index.js"(exports, module) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnprocessableEntityError = exports.PermissionDeniedError = exports.InternalServerError = exports.AuthenticationError = exports.BadRequestError = exports.RateLimitError = exports.ConflictError = exports.NotFoundError = exports.APIUserAbortError = exports.APIConnectionTimeoutError = exports.APIConnectionError = exports.APIError = exports.OpenAIError = exports.fileFromPath = exports.toFile = exports.AzureOpenAI = exports.OpenAI = void 0;
    var qs = __importStar(require_qs());
    var Core = __importStar(require_core());
    var Errors = __importStar(require_error());
    var Pagination = __importStar(require_pagination());
    var Uploads = __importStar(require_uploads());
    var API = __importStar(require_resources());
    var batches_1 = require_batches();
    var completions_1 = require_completions3();
    var embeddings_1 = require_embeddings();
    var files_1 = require_files2();
    var images_1 = require_images();
    var models_1 = require_models();
    var moderations_1 = require_moderations();
    var audio_1 = require_audio();
    var beta_1 = require_beta();
    var chat_1 = require_chat();
    var fine_tuning_1 = require_fine_tuning();
    var uploads_1 = require_uploads2();
    var OpenAI2 = class extends Core.APIClient {
      /**
       * API Client for interfacing with the OpenAI API.
       *
       * @param {string | undefined} [opts.apiKey=process.env['OPENAI_API_KEY'] ?? undefined]
       * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
       * @param {string | null | undefined} [opts.project=process.env['OPENAI_PROJECT_ID'] ?? null]
       * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL'] ?? https://api.openai.com/v1] - Override the default base URL for the API.
       * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
       * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
       * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
       * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
       * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
       * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
       * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
       */
      constructor(_c = {}) {
        var _d = _c, { baseURL = Core.readEnv("OPENAI_BASE_URL"), apiKey = Core.readEnv("OPENAI_API_KEY"), organization = ((_a2) => (_a2 = Core.readEnv("OPENAI_ORG_ID")) != null ? _a2 : null)(), project = ((_b) => (_b = Core.readEnv("OPENAI_PROJECT_ID")) != null ? _b : null)() } = _d, opts = __objRest(_d, ["baseURL", "apiKey", "organization", "project"]);
        var _a3;
        if (apiKey === void 0) {
          throw new Errors.OpenAIError("The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).");
        }
        const options = __spreadProps(__spreadValues({
          apiKey,
          organization,
          project
        }, opts), {
          baseURL: baseURL || `https://api.openai.com/v1`
        });
        if (!options.dangerouslyAllowBrowser && Core.isRunningInBrowser()) {
          throw new Errors.OpenAIError("It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew OpenAI({ apiKey, dangerouslyAllowBrowser: true });\n\nhttps://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\n");
        }
        super({
          baseURL: options.baseURL,
          timeout: (_a3 = options.timeout) != null ? _a3 : 6e5,
          httpAgent: options.httpAgent,
          maxRetries: options.maxRetries,
          fetch: options.fetch
        });
        this.completions = new API.Completions(this);
        this.chat = new API.Chat(this);
        this.embeddings = new API.Embeddings(this);
        this.files = new API.Files(this);
        this.images = new API.Images(this);
        this.audio = new API.Audio(this);
        this.moderations = new API.Moderations(this);
        this.models = new API.Models(this);
        this.fineTuning = new API.FineTuning(this);
        this.beta = new API.Beta(this);
        this.batches = new API.Batches(this);
        this.uploads = new API.Uploads(this);
        this._options = options;
        this.apiKey = apiKey;
        this.organization = organization;
        this.project = project;
      }
      defaultQuery() {
        return this._options.defaultQuery;
      }
      defaultHeaders(opts) {
        return __spreadValues(__spreadProps(__spreadValues({}, super.defaultHeaders(opts)), {
          "OpenAI-Organization": this.organization,
          "OpenAI-Project": this.project
        }), this._options.defaultHeaders);
      }
      authHeaders(opts) {
        return { Authorization: `Bearer ${this.apiKey}` };
      }
      stringifyQuery(query) {
        return qs.stringify(query, { arrayFormat: "brackets" });
      }
    };
    exports.OpenAI = OpenAI2;
    _a = OpenAI2;
    OpenAI2.OpenAI = _a;
    OpenAI2.DEFAULT_TIMEOUT = 6e5;
    OpenAI2.OpenAIError = Errors.OpenAIError;
    OpenAI2.APIError = Errors.APIError;
    OpenAI2.APIConnectionError = Errors.APIConnectionError;
    OpenAI2.APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
    OpenAI2.APIUserAbortError = Errors.APIUserAbortError;
    OpenAI2.NotFoundError = Errors.NotFoundError;
    OpenAI2.ConflictError = Errors.ConflictError;
    OpenAI2.RateLimitError = Errors.RateLimitError;
    OpenAI2.BadRequestError = Errors.BadRequestError;
    OpenAI2.AuthenticationError = Errors.AuthenticationError;
    OpenAI2.InternalServerError = Errors.InternalServerError;
    OpenAI2.PermissionDeniedError = Errors.PermissionDeniedError;
    OpenAI2.UnprocessableEntityError = Errors.UnprocessableEntityError;
    OpenAI2.toFile = Uploads.toFile;
    OpenAI2.fileFromPath = Uploads.fileFromPath;
    OpenAI2.Completions = completions_1.Completions;
    OpenAI2.Chat = chat_1.Chat;
    OpenAI2.Embeddings = embeddings_1.Embeddings;
    OpenAI2.Files = files_1.Files;
    OpenAI2.FileObjectsPage = files_1.FileObjectsPage;
    OpenAI2.Images = images_1.Images;
    OpenAI2.Audio = audio_1.Audio;
    OpenAI2.Moderations = moderations_1.Moderations;
    OpenAI2.Models = models_1.Models;
    OpenAI2.ModelsPage = models_1.ModelsPage;
    OpenAI2.FineTuning = fine_tuning_1.FineTuning;
    OpenAI2.Beta = beta_1.Beta;
    OpenAI2.Batches = batches_1.Batches;
    OpenAI2.BatchesPage = batches_1.BatchesPage;
    OpenAI2.Uploads = uploads_1.Uploads;
    var AzureOpenAI = class extends OpenAI2 {
      /**
       * API Client for interfacing with the Azure OpenAI API.
       *
       * @param {string | undefined} [opts.apiVersion=process.env['OPENAI_API_VERSION'] ?? undefined]
       * @param {string | undefined} [opts.endpoint=process.env['AZURE_OPENAI_ENDPOINT'] ?? undefined] - Your Azure endpoint, including the resource, e.g. `https://example-resource.azure.openai.com/`
       * @param {string | undefined} [opts.apiKey=process.env['AZURE_OPENAI_API_KEY'] ?? undefined]
       * @param {string | undefined} opts.deployment - A model deployment, if given, sets the base client URL to include `/deployments/{deployment}`.
       * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
       * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL']] - Sets the base URL for the API, e.g. `https://example-resource.azure.openai.com/openai/`.
       * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
       * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
       * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
       * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
       * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
       * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
       * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
       */
      constructor(_a2 = {}) {
        var _b = _a2, { baseURL = Core.readEnv("OPENAI_BASE_URL"), apiKey = Core.readEnv("AZURE_OPENAI_API_KEY"), apiVersion = Core.readEnv("OPENAI_API_VERSION"), endpoint, deployment, azureADTokenProvider, dangerouslyAllowBrowser } = _b, opts = __objRest(_b, ["baseURL", "apiKey", "apiVersion", "endpoint", "deployment", "azureADTokenProvider", "dangerouslyAllowBrowser"]);
        if (!apiVersion) {
          throw new Errors.OpenAIError("The OPENAI_API_VERSION environment variable is missing or empty; either provide it, or instantiate the AzureOpenAI client with an apiVersion option, like new AzureOpenAI({ apiVersion: 'My API Version' }).");
        }
        if (typeof azureADTokenProvider === "function") {
          dangerouslyAllowBrowser = true;
        }
        if (!azureADTokenProvider && !apiKey) {
          throw new Errors.OpenAIError("Missing credentials. Please pass one of `apiKey` and `azureADTokenProvider`, or set the `AZURE_OPENAI_API_KEY` environment variable.");
        }
        if (azureADTokenProvider && apiKey) {
          throw new Errors.OpenAIError("The `apiKey` and `azureADTokenProvider` arguments are mutually exclusive; only one can be passed at a time.");
        }
        apiKey != null ? apiKey : apiKey = API_KEY_SENTINEL;
        opts.defaultQuery = __spreadProps(__spreadValues({}, opts.defaultQuery), { "api-version": apiVersion });
        if (!baseURL) {
          if (!endpoint) {
            endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
          }
          if (!endpoint) {
            throw new Errors.OpenAIError("Must provide one of the `baseURL` or `endpoint` arguments, or the `AZURE_OPENAI_ENDPOINT` environment variable");
          }
          baseURL = `${endpoint}/openai`;
        } else {
          if (endpoint) {
            throw new Errors.OpenAIError("baseURL and endpoint are mutually exclusive");
          }
        }
        super(__spreadValues(__spreadValues({
          apiKey,
          baseURL
        }, opts), dangerouslyAllowBrowser !== void 0 ? { dangerouslyAllowBrowser } : {}));
        this.apiVersion = "";
        this._azureADTokenProvider = azureADTokenProvider;
        this.apiVersion = apiVersion;
        this._deployment = deployment;
      }
      buildRequest(options) {
        if (_deployments_endpoints.has(options.path) && options.method === "post" && options.body !== void 0) {
          if (!Core.isObj(options.body)) {
            throw new Error("Expected request body to be an object");
          }
          const model = this._deployment || options.body["model"];
          if (model !== void 0 && !this.baseURL.includes("/deployments")) {
            options.path = `/deployments/${model}${options.path}`;
          }
        }
        return super.buildRequest(options);
      }
      async _getAzureADToken() {
        if (typeof this._azureADTokenProvider === "function") {
          const token = await this._azureADTokenProvider();
          if (!token || typeof token !== "string") {
            throw new Errors.OpenAIError(`Expected 'azureADTokenProvider' argument to return a string but it returned ${token}`);
          }
          return token;
        }
        return void 0;
      }
      authHeaders(opts) {
        return {};
      }
      async prepareOptions(opts) {
        var _a2, _b;
        if ((_a2 = opts.headers) == null ? void 0 : _a2["api-key"]) {
          return super.prepareOptions(opts);
        }
        const token = await this._getAzureADToken();
        (_b = opts.headers) != null ? _b : opts.headers = {};
        if (token) {
          opts.headers["Authorization"] = `Bearer ${token}`;
        } else if (this.apiKey !== API_KEY_SENTINEL) {
          opts.headers["api-key"] = this.apiKey;
        } else {
          throw new Errors.OpenAIError("Unable to handle auth");
        }
        return super.prepareOptions(opts);
      }
    };
    exports.AzureOpenAI = AzureOpenAI;
    var _deployments_endpoints = /* @__PURE__ */ new Set([
      "/completions",
      "/chat/completions",
      "/embeddings",
      "/audio/transcriptions",
      "/audio/translations",
      "/audio/speech",
      "/images/generations"
    ]);
    var API_KEY_SENTINEL = "<Missing Key>";
    var uploads_2 = require_uploads();
    Object.defineProperty(exports, "toFile", { enumerable: true, get: function() {
      return uploads_2.toFile;
    } });
    Object.defineProperty(exports, "fileFromPath", { enumerable: true, get: function() {
      return uploads_2.fileFromPath;
    } });
    var error_1 = require_error();
    Object.defineProperty(exports, "OpenAIError", { enumerable: true, get: function() {
      return error_1.OpenAIError;
    } });
    Object.defineProperty(exports, "APIError", { enumerable: true, get: function() {
      return error_1.APIError;
    } });
    Object.defineProperty(exports, "APIConnectionError", { enumerable: true, get: function() {
      return error_1.APIConnectionError;
    } });
    Object.defineProperty(exports, "APIConnectionTimeoutError", { enumerable: true, get: function() {
      return error_1.APIConnectionTimeoutError;
    } });
    Object.defineProperty(exports, "APIUserAbortError", { enumerable: true, get: function() {
      return error_1.APIUserAbortError;
    } });
    Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
      return error_1.NotFoundError;
    } });
    Object.defineProperty(exports, "ConflictError", { enumerable: true, get: function() {
      return error_1.ConflictError;
    } });
    Object.defineProperty(exports, "RateLimitError", { enumerable: true, get: function() {
      return error_1.RateLimitError;
    } });
    Object.defineProperty(exports, "BadRequestError", { enumerable: true, get: function() {
      return error_1.BadRequestError;
    } });
    Object.defineProperty(exports, "AuthenticationError", { enumerable: true, get: function() {
      return error_1.AuthenticationError;
    } });
    Object.defineProperty(exports, "InternalServerError", { enumerable: true, get: function() {
      return error_1.InternalServerError;
    } });
    Object.defineProperty(exports, "PermissionDeniedError", { enumerable: true, get: function() {
      return error_1.PermissionDeniedError;
    } });
    Object.defineProperty(exports, "UnprocessableEntityError", { enumerable: true, get: function() {
      return error_1.UnprocessableEntityError;
    } });
    exports = module.exports = OpenAI2;
    module.exports.AzureOpenAI = AzureOpenAI;
    exports.default = OpenAI2;
  }
});

// services/vectorStore.js
var import_openai = __toESM(require_openai(), 1);
var createStore = (initialValue) => {
  let value = initialValue;
  const subscribers = /* @__PURE__ */ new Set();
  return {
    set: (newValue) => {
      value = newValue;
      subscribers.forEach((fn) => fn(value));
    },
    subscribe: (fn) => {
      subscribers.add(fn);
      fn(value);
      return () => subscribers.delete(fn);
    },
    get: () => value
  };
};
var vectorSyncStatus = createStore("idle");
var VectorStoreService = class {
  constructor() {
    this.openai = null;
    this.vectorStoreId = null;
    this.statusCallback = null;
    this.initialize();
  }
  setStatusCallback(callback) {
    this.statusCallback = callback;
  }
  updateStatus(message) {
    if (this.statusCallback) {
      this.statusCallback(message);
    }
  }
  initialize() {
    const openaiId = localStorage.getItem("openaiId");
    if (openaiId) {
      this.openai = new import_openai.OpenAI({
        apiKey: openaiId,
        dangerouslyAllowBrowser: true
      });
      this.vectorStoreId = localStorage.getItem("vectorStoreId");
    }
  }
  async cleanupExistingResources() {
    if (!this.openai) {
      throw new Error("OpenAI client not initialized");
    }
    try {
      this.updateStatus("Starting cleanup of existing resources...");
      const existingAssistantId = localStorage.getItem("assistantId");
      if (existingAssistantId) {
        this.updateStatus("Deleting existing assistant...");
        try {
          await this.openai.beta.assistants.del(existingAssistantId);
          localStorage.removeItem("assistantId");
        } catch (error) {
          console.warn("Error deleting assistant:", error);
        }
      }
      const existingVectorStoreId = localStorage.getItem("vectorStoreId");
      if (existingVectorStoreId) {
        this.updateStatus("Deleting existing vector store...");
        try {
          await this.openai.beta.vectorStores.del(existingVectorStoreId);
          localStorage.removeItem("vectorStoreId");
          this.vectorStoreId = null;
        } catch (error) {
          console.warn("Error deleting vector store:", error);
        }
      }
      this.updateStatus("Cleanup completed");
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  }
  async fetchTwosData(userId, token) {
    var _a, _b;
    this.updateStatus("Fetching data from Twos API...");
    const response = await fetch("https://www.twosapp.com/apiV2/user/export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        token,
        page: 0
      })
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data from Twos");
    }
    const data = await response.json();
    this.updateStatus(`Data received: ${((_a = data.entries) == null ? void 0 : _a.length) || 0} entries and ${((_b = data.posts) == null ? void 0 : _b.length) || 0} posts`);
    return data;
  }
  formatDataForVectorStore(data) {
    if (!data.entries || data.entries.length === 0) {
      throw new Error("No entries found in Twos data");
    }
    const formattedEntries = data.entries.map((entry) => {
      const entryPosts = data.posts.filter((post) => post.entry_id === entry._id);
      return {
        title: entry.title,
        _id: entry._id,
        lastModified: entry.lastModified,
        posts: entryPosts.map((post) => ({
          text: post.text,
          _id: post._id,
          type: post.type,
          lastModified: post.lastModified,
          url: post.url || "",
          tags: post.tags || []
        }))
      };
    });
    const chunks = [];
    const CHUNK_SIZE = 50;
    for (let i = 0; i < formattedEntries.length; i += CHUNK_SIZE) {
      const chunk = formattedEntries.slice(i, i + CHUNK_SIZE);
      chunks.push({
        entries: chunk.map((entry) => __spreadProps(__spreadValues({}, entry), {
          // Create a combined content field for better semantic search
          content: `${entry.title}
${entry.posts.map(
            (post) => {
              var _a;
              return `${post.text} ${((_a = post.tags) == null ? void 0 : _a.join(" ")) || ""}`;
            }
          ).join("\n")}`
        }))
      });
    }
    this.updateStatus(`Formatted data into ${chunks.length} chunks`);
    return chunks;
  }
  async uploadFiles(chunks) {
    const fileIds = [];
    for (const [index, chunk] of chunks.entries()) {
      this.updateStatus(`Uploading file ${index + 1} of ${chunks.length}`);
      const file = new File(
        [JSON.stringify(chunk)],
        `twos_data_${index}.json`,
        { type: "application/json" }
      );
      const uploadedFile = await this.openai.files.create({
        file,
        purpose: "assistants"
      });
      fileIds.push(uploadedFile.id);
      this.updateStatus(`File ${index + 1} uploaded successfully`);
    }
    return fileIds;
  }
  async syncToVectorStore(userId, token) {
    if (!this.openai) {
      throw new Error("OpenAI client not initialized");
    }
    if (!userId || !token) {
      throw new Error("Twos User ID and Token are required");
    }
    try {
      vectorSyncStatus.set("syncing");
      await this.cleanupExistingResources();
      const twosData = await this.fetchTwosData(userId, token);
      const chunks = this.formatDataForVectorStore(twosData);
      if (chunks.length === 0) {
        throw new Error("No data available to sync");
      }
      this.updateStatus("Starting file uploads...");
      const fileIds = await this.uploadFiles(chunks);
      this.updateStatus("Creating vector store...");
      const vectorStore = await this.openai.beta.vectorStores.create({
        name: "Twoschat store"
      });
      this.vectorStoreId = vectorStore.id;
      localStorage.setItem("vectorStoreId", vectorStore.id);
      this.updateStatus("Vector store created successfully");
      this.updateStatus("Creating file batch...");
      const fileBatch = await this.openai.beta.vectorStores.fileBatches.create(
        vectorStore.id,
        {
          file_ids: fileIds
        }
      );
      this.updateStatus("Files and vector created, indeing while take a while, check you assistant ");
      this.updateStatus("Creating assistant...");
      const assistant = await this.createAssistant();
      this.updateStatus("Assistant created successfully");
      vectorSyncStatus.set("success");
      return {
        success: true,
        vectorStoreId: vectorStore.id,
        assistantId: assistant.id,
        chunksProcessed: chunks.length,
        fileIds
      };
    } catch (error) {
      console.error("Error syncing to vector store:", error);
      vectorSyncStatus.set("error");
      throw error;
    }
  }
  async createAssistant() {
    if (!this.openai) {
      throw new Error("OpenAI client not initialized");
    }
    if (!this.vectorStoreId) {
      throw new Error("Vector store ID not found. Please sync data first.");
    }
    try {
      const assistant = await this.openai.beta.assistants.create({
        instructions: `You are a helpful assistant that provides information based on the user's TwosApp data. 
Use the vector store to search through their notes and provide relevant information.
When answering questions, try to:
    1. Search for relevant content in the vector store
    2. Provide specific examples from the user's notes when applicable
    3. Include relevant dates and context from the stored data
    4. Quote specific parts of notes when they directly answer the user's question
    5. ALWAYS RETURN MARKDOWN
    6. don't add file references in the response`,
        model: "gpt-4o-mini",
        tools: [{ "type": "file_search" }],
        name: "Twosapp Chat ",
        tool_resources: {
          "file_search": {
            "vector_store_ids": [this.vectorStoreId]
          }
        }
      });
      localStorage.setItem("assistantId", assistant.id);
      return assistant;
    } catch (error) {
      console.error("Error creating assistant:", error);
      throw error;
    }
  }
  async createThread(initialMessage) {
    if (!this.openai || !this.vectorStoreId) {
      throw new Error("OpenAI client or vector store ID not initialized");
    }
    try {
      const thread = await this.openai.beta.threads.create({
        messages: [
          {
            role: "user",
            content: initialMessage || "Hello"
          }
        ],
        tool_resources: {
          "file_search": {
            "vector_store_ids": [this.vectorStoreId]
          }
        }
      });
      return thread;
    } catch (error) {
      console.error("Error creating thread:", error);
      throw error;
    }
  }
};
var vectorStoreService = new VectorStoreService();
export {
  vectorStoreService,
  vectorSyncStatus
};
