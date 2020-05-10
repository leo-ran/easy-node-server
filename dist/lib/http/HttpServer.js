"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpContext_1 = require("../HttpContext");
const HttpServerOption_1 = require("./HttpServerOption");
const http_1 = require("http");
const Router_1 = require("../router/Router");
const exception_1 = require("../exception");
const HttpStatus_1 = require("../constants/HttpStatus");
class HttpServer extends http_1.Server {
    constructor(options = HttpServerOption_1.HttpServerOption.create()) {
        super(options.toJSONObject(), (req, res) => this.handleRequest(HttpServer.createContext(req, res)));
        this.router = new Router_1.Router();
    }
    async handleRequest(context) {
        try {
            await this.handlerResponse(context);
            if (!context.response.writableEnded) {
                throw new exception_1.HttpException(HttpStatus_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (e) {
            if (e instanceof exception_1.HttpException) {
                context.response.statusMessage = e.message;
                context.response.statusCode = e.code;
                if (process.env.EASY_NODE_ENV === "development") {
                    context.response.end(e.stack);
                }
                context.response.end(`${e.message} ${e.code}`);
            }
            else {
                context.response.statusCode = 500;
                context.response.end(`HttpException INTERNAL SERVER ERROR`);
            }
        }
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
