/// <reference types="node" />
import { HttpRequest } from "../HttpRequest";
import { HttpResponse } from "../HttpResponse";
import { HttpContext } from "../HttpContext";
import { HttpServerOption } from "./HttpServerOption";
import { Server } from "http";
import { Router } from "../router/Router";
export declare abstract class HttpServer extends Server {
    router: Router;
    constructor(options?: HttpServerOption);
    private handleRequest;
    abstract handlerResponse(context: HttpContext): void | Promise<void>;
    /**
     * 创建 Context
     * @param request
     * @param response
     */
    static createContext(request: HttpRequest, response: HttpResponse): HttpContext;
}
