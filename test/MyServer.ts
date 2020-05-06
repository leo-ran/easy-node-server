import {HttpContext, HttpServer} from "../src";

export class MyServer extends HttpServer {
  public handlerResponse(context: HttpContext): void {
    console.log(context.request.query);
    context.response.end("ok");
  }
}

const server = new MyServer();

server.listen(3000);
