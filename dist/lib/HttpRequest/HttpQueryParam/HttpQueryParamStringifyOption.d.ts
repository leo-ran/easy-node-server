export declare class HttpQueryParamStringifyOption {
    delimiter?: string;
    strictNullHandling?: boolean;
    skipNulls?: boolean;
    encode?: boolean;
    filter?: Array<string | number> | ((prefix: string, value: any) => any);
    arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';
    indices?: boolean;
    sort?: (a: any, b: any) => number;
    serializeDate?: (d: Date) => string;
    format?: 'RFC1738' | 'RFC3986';
    encodeValuesOnly?: boolean;
    addQueryPrefix?: boolean;
    allowDots?: boolean;
    charset?: 'utf-8' | 'iso-8859-1';
    charsetSentinel?: boolean;
    static form<T extends HttpQueryParamStringifyOption>(option?: T): HttpQueryParamStringifyOption;
}
export declare type DefaultEncoder = (str: any, defaultEncoder?: any, charset?: string) => string;
