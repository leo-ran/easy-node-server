import {Server} from "https";
import {HttpRequest} from "../HttpRequest";
import {HttpResponse} from "../HttpResponse";
import {HttpContext} from "../HttpContext";
import {HttpsServerOption} from "./HttpsServerOption";
import {HttpException} from "../exception";
import {HttpStatus} from "../constants/HttpStatus";
import {Router} from "../router/Router";

export abstract class HttpsServer extends Server{
  public router = new Router();
  protected constructor(options: HttpsServerOption) {
    super(options.toJSONObject(),
      (req, res) => this.handleRequest(HttpsServer.createContext(req as HttpRequest, res as HttpResponse))
    );
    this.on("exception", (context, e) => this.onException(context, e));
  }

  private async handleRequest(context: HttpContext) {
    try {
      await this.handlerResponse(context);
      if (!context.response.writableEnded) {
        throw new HttpException(HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      if (this.listenerCount("exception")) {
        this.emit("exception", context, e);
      }
    }
  }

  public onException<E extends Error>(context: HttpContext, e: E) {
    // 如果为开发模式 输出错误信息
    if (process.env.EASY_NODE_ENV === "development") {
      context.response.end(e.stack)
    }
    if (e instanceof HttpException) {
      context.response.statusMessage = e.message;
      context.response.statusCode = e.code;
      context.response.end(`${e.message} ${e.code}`)
    } else {
      // 监听异常
      context.response.statusCode = 500;
      context.response.end(`HttpException INTERNAL SERVER ERROR`)
    }
  }

  abstract handlerResponse(context: HttpContext): void | Promise<void>;

  /**
   * 创建 Context
   * @param request
   * @param response
   */
  static createContext(request: HttpRequest, response: HttpResponse): HttpContext {
    return new HttpContext(
      request,
      response
    );
  }
}