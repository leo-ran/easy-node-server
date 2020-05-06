export class HttpQueryParamStringifyOption {
  public delimiter?: string;
  public strictNullHandling?: boolean;
  public skipNulls?: boolean;
  public encode?: boolean;
  public filter?: Array<string | number> | ((prefix: string, value: any) => any);
  public arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';
  public indices?: boolean;
  public sort?: (a: any, b: any) => number;
  public serializeDate?: (d: Date) => string;
  public format?: 'RFC1738' | 'RFC3986';
  public encodeValuesOnly?: boolean;
  public addQueryPrefix?: boolean;
  public allowDots?: boolean;
  public charset?: 'utf-8' | 'iso-8859-1';
  public charsetSentinel?: boolean;
  static form<T extends HttpQueryParamStringifyOption>(option?: T): HttpQueryParamStringifyOption {
    const options =  new HttpQueryParamStringifyOption();
    (<Array<keyof HttpQueryParamStringifyOption>>Object.keys(option||{})).forEach(key => {
      // @ts-ignore
      options[key] = option[key]
    });

    return options;
  }
}

export type DefaultEncoder = (str: any, defaultEncoder?: any, charset?: string) => string;