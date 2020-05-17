import { HttpQueryParamParseOption } from "./HttpQueryParamParseOption";
import { HttpQueryParamStringifyOption } from "./HttpQueryParamStringifyOption";
import { ObjectedMap } from "../../ObjectedMap";
export declare class HttpQueryParam<T extends object> extends ObjectedMap<T> {
    options: HttpQueryParamParseOption;
    private _rawQueryString;
    set rawQueryString(value: string);
    get rawQueryString(): string;
    constructor(queryString: string, options?: HttpQueryParamParseOption);
    toQueryString(option?: HttpQueryParamStringifyOption): string;
    static createParseOption<T extends HttpQueryParamParseOption>(option?: T): HttpQueryParamParseOption;
    static createStringifyOption<T extends HttpQueryParamStringifyOption>(option?: T): HttpQueryParamStringifyOption;
    static parse<T extends object, O extends HttpQueryParamParseOption>(str: string, option?: O): HttpQueryParam<T>;
    static stringify<T extends object, O extends HttpQueryParamStringifyOption>(httpQueryParam: HttpQueryParam<T>, httpQueryParamStringifyOption?: O): string;
}
