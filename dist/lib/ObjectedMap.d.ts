import { JSONObject } from "./JSONObject";
export declare class ObjectedMap<T extends object> extends Map {
    set<K extends keyof T, V extends T[K]>(key: K, value: V): this;
    get<K extends keyof T>(key: K): T[K];
    toJSON(): string;
    toJSONObject(): JSONObject<T>;
    static toJSONObject<T extends object, O extends ObjectedMap<T>>(objectedMap: O): JSONObject<T>;
}
