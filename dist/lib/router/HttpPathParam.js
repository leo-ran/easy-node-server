"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectedMap_1 = require("../ObjectedMap");
const JSONObject_1 = require("../JSONObject");
/**
 * 路径参数解析
 */
class HttpPathParam extends ObjectedMap_1.ObjectedMap {
    constructor(value) {
        super();
        Object.keys(value).forEach(key => {
            this.set(key, value[key]);
        });
    }
    /**
     * 转为json
     * @param space
     */
    toJSON(space = 0) {
        return HttpPathParam.toJSON(this);
    }
    /**
     * 转换为对象结构
     */
    toJSONObject() {
        const jsonObject = new JSONObject_1.JSONObject();
        this.forEach((v, k) => {
            jsonObject.setField(k, v);
        });
        return jsonObject;
    }
    /**
     * 创建
     * @param value
     */
    static create(value) {
        return new HttpPathParam(value);
    }
    /**
     * 转换为json
     * @param httpPathParam
     * @param space
     */
    static toJSON(httpPathParam, space = 0) {
        return httpPathParam.toJSONObject().stringify(space);
    }
}
exports.HttpPathParam = HttpPathParam;
