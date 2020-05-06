import {Server} from "https";
import {HttpRequest} from "../HttpRequest";
import {HttpResponse} from "../HttpResponse";
import {HttpContext} from "../HttpContext";
import {HttpsServerOption} from "./HttpsServerOption";

export abstract class HttpsServer extends Server{
  protected constructor(options: HttpsServerOption) {
    super(options.toJSONObject(),
      (req, res) => this.handlerResponse(HttpsServer.createContext(req as HttpRequest, res as HttpResponse))
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