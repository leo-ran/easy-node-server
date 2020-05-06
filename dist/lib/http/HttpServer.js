"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpContext_1 = require("../HttpContext");
const HttpServerOption_1 = require("./HttpServerOption");
const http_1 = require("http");
class HttpServer extends http_1.Server {
    constructor(options = HttpServerOption_1.HttpServerOption.create()) {
        super(options.toJSONObject(), (req, res) => this.handlerResponse(HttpServer.createContext(req, res)));
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
exports.HttpServer = HttpServer;
