import {parse, stringify} from "qs";
import {HttpQueryParamParseOption} from "./HttpQueryParamParseOption";
import {HttpQueryParamStringifyOption} from "./HttpQueryParamStringifyOption";
import {ObjectedMap} from "../../ObjectedMap";

export class HttpQueryParam<T extends object> extends ObjectedMap<T> {
  private _rawQueryString: string;
  public set rawQueryString(value) {
    const query = parse(value, this.options || {});
    (<Array<keyof T>>Object.keys(query)).forEach(key => {
      this.set(key, query[key]);
    })
  }
  public get rawQueryString(): string {
    return this._rawQueryString;
  }
  constructor(
    queryString: string,
    public options: HttpQueryParamParseOption = {}
    ) {
    super();
    this.rawQueryString = queryString;
  }

  public stringify(option?: HttpQueryParamStringifyOption): string {
    return HttpQueryParam.stringify(this, option);
  }

  static createParseOption<T extends HttpQueryParamParseOption>(option?: T) {
    return HttpQueryParamParseOption.form(option);
  }

  static createStringifyOption<T extends HttpQueryParamStringifyOption>(option?: T) {
    return HttpQueryParamStringifyOption.form(option);
  }

  static parse<T extends object, O extends HttpQueryParamParseOption>(str: string, option?: O): HttpQueryParam<T> {
    return new HttpQueryParam<T>(str, option);
  }

  static stringify<
    T extends object,
    O extends HttpQueryParamStringifyOption
    >(httpQueryParam: HttpQueryParam<T>, httpQueryParamStringifyOption?: O): string {
    return stringify(httpQueryParam.toJSONObject(), httpQueryParamStringifyOption || {})
  }
}