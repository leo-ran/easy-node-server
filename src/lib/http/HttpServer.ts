import {HttpRequest} from "../HttpRequest";
import {HttpResponse} from "../HttpResponse";
import {HttpContext} from "../HttpContext";
import {HttpServerOption} from "./HttpServerOption";
import {Server} from "http";

export abstract class HttpServer extends Server{
  protected constructor(options: HttpServerOption = HttpServerOption.create()) {
    super(options.toJSONObject(),
      (req, res) => this.handlerResponse(HttpServer.createContext(req as HttpRequest, res as HttpResponse))
    );
  }

  abstract handlerResponse(context: HttpContext): void;

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