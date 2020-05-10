import { HttpRequest } from "./HttpRequest";
import { HttpResponse } from "./HttpResponse";
import { HttpMethod } from "./constants/HttpMethod";
export declare class HttpContext<Req extends HttpRequest = HttpRequest, Res extends HttpResponse = HttpResponse> {
    request: Req;
    response: Res;
    constructor(request: Req, response: Res);
    get fresh(): boolean;
    get method(): HttpMethod;
}
