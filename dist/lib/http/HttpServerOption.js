"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServerOption = void 0;
const HttpRequest_1 = require("../HttpRequest");
const HttpResponse_1 = require("../HttpResponse");
const ObjectedMap_1 = require("../ObjectedMap");
class HttpServerOption extends ObjectedMap_1.ObjectedMap {
    static create(options = {}) {
        const httpsServerOption = new HttpServerOption();
        if (options) {
            Object.keys(options).forEach(key => {
                httpsServerOption.set(key, options[key]);
            });
        }
        if (!httpsServerOption.has("IncomingMessage")) {
            httpsServerOption.set("IncomingMessage", HttpRequest_1.HttpRequest);
        }
        if (!httpsServerOption.has("ServerResponse")) {
            httpsServerOption.set("ServerResponse", HttpResponse_1.HttpResponse);
        }
        return httpsServerOption;
    }
}
exports.HttpServerOption = HttpServerOption;
