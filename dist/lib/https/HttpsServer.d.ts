/// <reference types="node" />
import { Server } from "https";
import { HttpRequest } from "../HttpRequest";
import { HttpResponse } from "../HttpResponse";
import { HttpContext } from "../HttpContext";
import { HttpsServerOption } from "./HttpsServerOption";
import { Router } from "../router/Router";
export declare abstract class HttpsServer extends Server {
    router: Router;
    protected constructor(options: HttpsServerOption);
    private handleRequest;
    abstract handlerResponse(context: HttpContext): void | Promise<void>;
    /**
     * 创建 Context
     * @param request
     * @param response
     */
    static createContext(request: HttpRequest, response: HttpResponse): HttpContext;
}
