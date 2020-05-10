import {HttpRequest} from "../HttpRequest";
import {HttpResponse} from "../HttpResponse";
import {HttpContext} from "../HttpContext";
import {HttpServerOption} from "./HttpServerOption";
import {Server} from "http";
import {Router} from "../router/Router";
import {HttpException} from "../exception";
import {HttpStatus} from "../constants/HttpStatus";

export abstract class HttpServer extends Server{
  public router = new Router();
  constructor(options: HttpServerOption = HttpServerOption.create()) {
    super(options.toJSONObject(),
      (req, res) => this.handleRequest(HttpServer.createContext(req as HttpRequest, res as HttpResponse))
    );
  }

  private async handleRequest(context: HttpContext) {
    try {
      await this.handlerResponse(context);
      if (!context.response.writableEnded) {
        throw new HttpException(HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      if (e instanceof HttpException) {
        context.response.statusMessage = e.message;
        context.response.statusCode = e.code;
        if (process.env.EASY_NODE_ENV === "development") {
          context.response.end(e.stack)
        }
        context.response.end(`${e.message} ${e.code}`)
      } else {
        context.response.statusCode = 500;
        context.response.end(`HttpException INTERNAL SERVER ERROR`)
      }
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