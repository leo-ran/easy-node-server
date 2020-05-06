import {IncomingMessage} from "http";
import {UrlWithStringQuery} from "url";
import * as url from "url";
import {MimeTypes} from "../MimeTypes";
import {HttpQueryParam} from "./HttpQueryParam/HttpQueryParam";
import accepts, {Accepts} from "accepts";

/**
 * Http request
 */
export class HttpRequest<Q extends object = any> extends IncomingMessage {
  private _accept: Accepts;
  public get URL(): UrlWithStringQuery {
    return url.parse(this.headers.referer || `http://${this.headers.host}${this.url}` || "");
  }
  public get contentType(): MimeTypes | undefined {
    return this.headers["content-type"] as MimeTypes;
  }
  public get query(): HttpQueryParam<Q> {
    return new HttpQueryParam<Q>(this.URL.query || "");
  }

  public get accept(): Accepts {
    return this._accept || (this._accept = accepts(this));
  }
  public set accept(value) {
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
  public accepts(...types: string[]) {
    return this.accept.types(...types);
  }

  /**
   *  Return accepted encodings or best fit based on `encodings`.
   *
   * Given `Accept-Encoding: gzip, deflate`
   * an array sorted by quality is returned:
   *
   *     ['gzip', 'deflate']
   */
  public acceptsEncodings(): string[];
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
  public acceptsEncodings(...encodings: string[]) {
    if (encodings.length === 0) return  this.accept.encodings();
    return this.accept.encodings(...encodings);
  }

  /**
   * Return accepted charsets or best fit based on `charsets`.
   * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
   * an array sorted by quality is returned:
   *     ['utf-8', 'utf-7', 'iso-8859-1']
   */
  public acceptsCharsets(): string[];
  /**
   * Return accepted charsets or best fit based on `charsets`.
   * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
   * an array sorted by quality is returned:
   *     ['utf-8', 'utf-7', 'iso-8859-1']
   * @param charsets
   */
  public acceptsCharsets(...charsets: string[]): string[] | string | false {
    if (charsets.length === 0) return this.accept.charsets();
    return this.accept.charsets(...charsets);
  }

  /**
   * Return accepted languages or best fit based on `langs`.
   *
   * Given `Accept-Language: en;q=0.8, es, pt`
   * an array sorted by quality is returned:
   *
   *     ['es', 'pt', 'en']
   */
  public acceptsLanguages(): string[];
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
  public acceptsLanguages(...languages: string[]): string[] | string | false {
    if (languages.length === 0) return this.accept.languages();
    return this.accept.languages(...languages);
  }

}