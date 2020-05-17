"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpQueryParamStringifyOption = void 0;
class HttpQueryParamStringifyOption {
    static form(option) {
        const options = new HttpQueryParamStringifyOption();
        Object.keys(option || {}).forEach(key => {
            // @ts-ignore
            options[key] = option[key];
        });
        return options;
    }
}
exports.HttpQueryParamStringifyOption = HttpQueryParamStringifyOption;
