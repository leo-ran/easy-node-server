import { HttpRequest } from "./HttpRequest";
import { HttpResponse } from "./HttpResponse";
export declare class HttpContext<Req extends HttpRequest = HttpRequest, Res extends HttpResponse = HttpResponse> {
    request: Req;
    response: Res;
    constructor(request: Req, response: Res);
    get fresh(): boolean;
}
