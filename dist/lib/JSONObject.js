"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONObject = void 0;
exports.JSONObject = class {
    setField(key, value) {
        // @ts-ignore
        this[key] = value;
        return this;
    }
    getField(key) {
        // @ts-ignore
        return this[key];
    }
    stringify(space = 0, replacer) {
        const { setField, getField, stringify, ...more } = this;
        return JSON.stringify(more, replacer, space);
    }
};
