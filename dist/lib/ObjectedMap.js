"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectedMap = void 0;
const JSONObject_1 = require("./JSONObject");
class ObjectedMap extends Map {
    set(key, value) {
        return super.set(key, value);
    }
    get(key) {
        return super.get(key);
    }
    stringify(space = 0) {
        return this.toJSONObject().stringify(space);
    }
    toJSONObject() {
        return ObjectedMap.toJSONObject(this);
    }
    static toJSONObject(objectedMap) {
        const jsonObject = new JSONObject_1.JSONObject();
        objectedMap.forEach((value, key) => {
            jsonObject.setField(key, value);
        });
        return jsonObject;
    }
}
exports.ObjectedMap = ObjectedMap;
