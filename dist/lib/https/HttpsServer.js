"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpsServer = void 0;
const https_1 = require("https");
const HttpContext_1 = require("../HttpContext");
const exception_1 = require("../exception");
const HttpStatus_1 = require("../constants/HttpStatus");
const Router_1 = require("../router/Router");
class HttpsServer extends https_1.Server {
    constructor(options) {
        super(options.toJSONObject(), (req, res) => this.handleRequest(HttpsServer.createContext(req, res)));
        this.router = new Router_1.Router();
        this.on("exception", (context, e) => this.onException(context, e));
    }
    async handleRequest(context) {
        try {
            await this.handlerResponse(context);
            if (!context.response.writableEnded) {
                throw new exception_1.HttpException(HttpStatus_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (e) {
            if (this.listenerCount("exception")) {
                this.emit("exception", context, e);
            }
        }
    }
    onException(context, e) {
        // 如果为开发模式 输出错误信息
        if (process.env.EASY_NODE_ENV === "development") {
            context.response.end(e.stack);
        }
        if (e instanceof exception_1.HttpException) {
            context.response.statusMessage = e.message;
            context.response.statusCode = e.code;
            context.response.end(`${e.message} ${e.code}`);
        }
        else {
            // 监听异常
            context.response.statusCode = 500;
            context.response.end(`HttpException INTERNAL SERVER ERROR`);
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
exports.HttpsServer = HttpsServer;
