/// <reference types="node" />
import { HttpRequest } from "../HttpRequest";
import { HttpResponse } from "../HttpResponse";
import { HttpContext } from "../HttpContext";
import { HttpServerOption } from "./HttpServerOption";
import { Server } from "http";
export declare abstract class HttpServer extends Server {
    protected constructor(options?: HttpServerOption);
    abstract handlerResponse(context: HttpContext): void;
    /**
     * 创建 Context
     * @param request
     * @param response
     */
    static createContext(request: HttpRequest, response: HttpResponse): HttpContext;
}
