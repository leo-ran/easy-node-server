"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JSONObject_1 = require("./JSONObject");
class ObjectedMap extends Map {
    set(key, value) {
        return super.set(key, value);
    }
    get(key) {
        return super.get(key);
    }
    toJSON() {
        return this.toJSONObject().stringify();
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
