interface JSONObjectConstructor {
    new <T extends object>(): JSONObject<T>;
}
export declare const JSONObject: JSONObjectConstructor;
export declare type JSONObject<T extends object> = Partial<T> & {
    setField: <K extends keyof T>(key: K, value: T[K]) => T;
    getField: <K extends keyof T>(key: K) => T[K];
    stringify(space?: number, replacer?: (this: any, key: string, value: any) => any): string;
};
export {};
