import { ObjectedMap } from "../ObjectedMap";
import { JSONObject } from "../JSONObject";
/**
 * 路径参数解析
 */
export declare class HttpPathParam<T extends object> extends ObjectedMap<T> {
    constructor(value: T);
    /**
     * 转为json
     * @param space
     */
    toJSON(space?: number): string;
    /**
     * 转换为对象结构
     */
    toJSONObject<T extends object>(): JSONObject<T>;
    /**
     * 创建
     * @param value
     */
    static create<T extends object>(value: T): HttpPathParam<T>;
    /**
     * 转换为json
     * @param httpPathParam
     * @param space
     */
    static toJSON<T extends object>(httpPathParam: HttpPathParam<T>, space?: number): string;
}
export interface HttpPathParamConstructor {
    new <T extends object>(value: T): HttpPathParam<T>;
    create<T extends object>(value: T): HttpPathParam<T>;
}
