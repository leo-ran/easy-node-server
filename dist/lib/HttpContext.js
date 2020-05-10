"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fresh_1 = __importDefault(require("fresh"));
class HttpContext {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    get fresh() {
        const { method, statusCode = 200 } = this.request;
        // GET or HEAD for weak freshness validation only
        if ('GET' != method && 'HEAD' != method)
            return false;
        // 2xx or 304 as per rfc2616 14.26
        if ((statusCode >= 200 && statusCode < 300) || 304 == statusCode) {
            return fresh_1.default(this.request.headers, this.response.getHeaders());
        }
        return false;
    }
    get method() {
        return (this.request.method || "GET").toUpperCase();
    }
}
exports.HttpContext = HttpContext;
