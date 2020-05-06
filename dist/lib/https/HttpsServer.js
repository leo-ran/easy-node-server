"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const HttpContext_1 = require("../HttpContext");
class HttpsServer extends https_1.Server {
    constructor(options) {
        super(options.toJSONObject(), (req, res) => this.handlerResponse(HttpsServer.createContext(req, res)));
    }
    /**
     * 创建 Context
     * @param request
     * @param response
     */
    static createContext(request, response) {
        return new HttpContext_1.HttpContext(request, response);
    }
}
exports.HttpsServer = HttpsServer;
