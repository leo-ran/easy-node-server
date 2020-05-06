"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpQueryParamParseOption {
    static form(option) {
        const options = new HttpQueryParamParseOption();
        Object.keys(option || {}).forEach(key => {
            // @ts-ignore
            options[key] = option[key];
        });
        return options;
    }
}
exports.HttpQueryParamParseOption = HttpQueryParamParseOption;
