"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequest = void 0;
const http_1 = require("http");
const url = __importStar(require("url"));
const HttpQueryParam_1 = require("./HttpQueryParam/HttpQueryParam");
const accepts_1 = __importDefault(require("accepts"));
/**
 * Http request
 */
class HttpRequest extends http_1.IncomingMessage {
    get URL() {
        return url.parse(this.headers.referer || `http://${this.headers.host}${this.url}` || "");
    }
    get contentType() {
        return this.headers["content-type"];
    }
    get query() {
        return new HttpQueryParam_1.HttpQueryParam(this.URL.query || "");
    }
    get accept() {
        return this._accept || (this._accept = accepts_1.default(this));
    }
    set accept(value) {
        this._accept = value;
    }
    /**
     * Check if the given `type(s)` is acceptable, returning
     * the best match when true, otherwise `false`, in which
     * case you should respond with 406 "Not Acceptable".
     *
     * The `type` value may be a single mime type string
     * such as "application/json", the extension name
     * such as "json" or an array `["json", "html", "text/plain"]`. When a list
     * or array is given the _best_ match, if any is returned.
     *
     * Examples:
     * ```
     *     // Accept: text/html
     *     this.accepts('html');
     *     // => "html"
     *
     *     // Accept: text/*, application/json
     *     this.accepts('html');
     *     // => "html"
     *     this.accepts('text/html');
     *     // => "text/html"
     *     this.accepts('json', 'text');
     *     // => "json"
     *     this.accepts('application/json');
     *     // => "application/json"
     *
     *     // Accept: text/*, application/json
     *     this.accepts('image/png');
     *     this.accepts('png');
     *     // => false
     *
     *     // Accept: text/*;q=.5, application/json
     *     this.accepts(['html', 'json']);
     *     this.accepts('html', 'json');
     *     // => "json"
     * ```
     */
    accepts(...types) {
        return this.accept.types(...types);
    }
    /**
     *  Return accepted encodings or best fit based on `encodings`.
     *
     * Given `Accept-Encoding: gzip, deflate`
     * an array sorted by quality is returned:
     *
     *     ['gzip', 'deflate']
     *
     * @param encodings
     */
    acceptsEncodings(...encodings) {
        if (encodings.length === 0)
            return this.accept.encodings();
        return this.accept.encodings(...encodings);
    }
    /**
     * Return accepted charsets or best fit based on `charsets`.
     * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
     * an array sorted by quality is returned:
     *     ['utf-8', 'utf-7', 'iso-8859-1']
     * @param charsets
     */
    acceptsCharsets(...charsets) {
        if (charsets.length === 0)
            return this.accept.charsets();
        return this.accept.charsets(...charsets);
    }
    /**
     * Return accepted languages or best fit based on `langs`.
     *
     * Given `Accept-Language: en;q=0.8, es, pt`
     * an array sorted by quality is returned:
     *
     *     ['es', 'pt', 'en']
     *
     * @param languages
     */
    acceptsLanguages(...languages) {
        if (languages.length === 0)
            return this.accept.languages();
        return this.accept.languages(...languages);
    }
}
exports.HttpRequest = HttpRequest;
