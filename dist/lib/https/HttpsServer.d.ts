/// <reference types="node" />
import { Server } from "https";
import { HttpRequest } from "../HttpRequest";
import { HttpResponse } from "../HttpResponse";
import { HttpContext } from "../HttpContext";
import { HttpsServerOption } from "./HttpsServerOption";
export declare abstract class HttpsServer extends Server {
    protected constructor(options: HttpsServerOption);
    abstract handlerResponse(context: HttpContext): void;
    /**
     * 创建 Context
     * @param request
     * @param response
     */
    static createContext(request: HttpRequest, response: HttpResponse): HttpContext;
}
