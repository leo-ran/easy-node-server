export declare class HttpQueryParamParseOption {
    comma?: boolean;
    delimiter?: string | RegExp;
    depth?: number | false;
    decoder?: (str: string, defaultDecoder: DefaultDecoder, charset: string, type: 'key' | 'value') => any;
    arrayLimit?: number;
    parseArrays?: boolean;
    allowDots?: boolean;
    plainObjects?: boolean;
    allowPrototypes?: boolean;
    parameterLimit?: number;
    strictNullHandling?: boolean;
    ignoreQueryPrefix?: boolean;
    charset?: 'utf-8' | 'iso-8859-1';
    charsetSentinel?: boolean;
    interpretNumericEntities?: boolean;
    static form<T extends HttpQueryParamParseOption>(option?: T): HttpQueryParamParseOption;
}
export declare type DefaultDecoder = (str: string, decoder?: any, charset?: string) => string;
