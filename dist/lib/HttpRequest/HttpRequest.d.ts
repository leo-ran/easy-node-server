/// <reference types="node" />
import { IncomingMessage } from "http";
import { UrlWithStringQuery } from "url";
import { MimeTypes } from "../constants/MimeTypes";
import { HttpQueryParam } from "./HttpQueryParam/HttpQueryParam";
import { Accepts } from "accepts";
/**
 * Http request
 */
export declare class HttpRequest<Q extends object = any> extends IncomingMessage {
    private _accept;
    get URL(): UrlWithStringQuery;
    get contentType(): MimeTypes | undefined;
    get query(): HttpQueryParam<Q>;
    get accept(): Accepts;
    set accept(value: Accepts);
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
    accepts(...types: string[]): string | false | string[];
    /**
     *  Return accepted encodings or best fit based on `encodings`.
     *
     * Given `Accept-Encoding: gzip, deflate`
     * an array sorted by quality is returned:
     *
     *     ['gzip', 'deflate']
     */
    acceptsEncodings(): string[];
    /**
     * Return accepted charsets or best fit based on `charsets`.
     * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
     * an array sorted by quality is returned:
     *     ['utf-8', 'utf-7', 'iso-8859-1']
     */
    acceptsCharsets(): string[];
    /**
     * Return accepted languages or best fit based on `langs`.
     *
     * Given `Accept-Language: en;q=0.8, es, pt`
     * an array sorted by quality is returned:
     *
     *     ['es', 'pt', 'en']
     */
    acceptsLanguages(): string[];
}
