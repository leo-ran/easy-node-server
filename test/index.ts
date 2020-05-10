import {HttpServer} from "../src/lib/http";
import {HttpContext} from "../src";
import {Route} from "../src/lib/router/Route";
import {HttpMethod} from "../src/lib/constants/HttpMethod";

export class Server extends HttpServer {
  constructor() {
    super();
    const route = Route.create({
      path: "/app",
      children: [
        {
          path: "/user",
          handler: context => context.response.end("/app/user"),
          children: [
            {
              path: "/update",
              handler: context => context.response.end("/app/user/update"),
            },
            {
              path: "/list",
              method: HttpMethod.GET,
              handler: context => context.response.end("/app/user/list"),
            },
            {
              path: "/info",
              handler: context => context.response.end("/app/user/info"),
            }
          ]
        },
        {
          path: "/info",
          handler: context => context.response.end("/app/info"),
          children: [
            {
              path: "/:id/:name",
              handler: (context, route) => {
                console.log(route.getPathParam(context.request.url || ""));
                context.response.end("ok");
              }
            }
          ]
        }
      ],
      handler: (context) => {
        context.response.end("/app");
      }
    })

    this.router.addRoute(route)
  }
  public async handlerResponse(context: HttpContext) {
    await this.router.onResponse(context);
  }
}

new Server().listen(3000);

// console.log(this)