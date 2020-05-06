"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = require("qs");
const HttpQueryParamParseOption_1 = require("./HttpQueryParamParseOption");
const HttpQueryParamStringifyOption_1 = require("./HttpQueryParamStringifyOption");
const ObjectedMap_1 = require("../../ObjectedMap");
class HttpQueryParam extends ObjectedMap_1.ObjectedMap {
    constructor(queryString, options = {}) {
        super();
        this.options = options;
        this.rawQueryString = queryString;
    }
    set rawQueryString(value) {
        const query = qs_1.parse(value, this.options || {});
        Object.keys(query).forEach(key => {
            this.set(key, query[key]);
        });
    }
    get rawQueryString() {
        return this._rawQueryString;
    }
    stringify(option) {
        return HttpQueryParam.stringify(this, option);
    }
    static createParseOption(option) {
        return HttpQueryParamParseOption_1.HttpQueryParamParseOption.form(option);
    }
    static createStringifyOption(option) {
        return HttpQueryParamStringifyOption_1.HttpQueryParamStringifyOption.form(option);
    }
    static parse(str, option) {
        return new HttpQueryParam(str, option);
    }
    static stringify(httpQueryParam, httpQueryParamStringifyOption) {
        return qs_1.stringify(httpQueryParam.toJSONObject(), httpQueryParamStringifyOption || {});
    }
}
exports.HttpQueryParam = HttpQueryParam;
