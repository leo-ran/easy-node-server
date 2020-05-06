import {HttpRequest} from "./HttpRequest";
import {HttpResponse} from "./HttpResponse";
import fresh from "fresh";


export class HttpContext<
  Req extends HttpRequest = HttpRequest,
  Res extends HttpResponse = HttpResponse,
  > {
  public constructor(
    public request: Req,
    public response: Res
  ) {}

  public get fresh() {
    const {method, statusCode = 200} = this.request;

    // GET or HEAD for weak freshness validation only
    if ('GET' != method && 'HEAD' != method) return false;

    // 2xx or 304 as per rfc2616 14.26
    if ((statusCode >= 200 && statusCode < 300) || 304 == statusCode) {
      return fresh(this.request.headers, this.response.getHeaders());
    }

    return false;
  }
}