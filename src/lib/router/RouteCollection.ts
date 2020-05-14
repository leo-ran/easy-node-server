import {Route} from "./Route";
import {HttpContext} from "../HttpContext";
import {HttpException} from "../exception";
import {HttpStatus} from "../constants/HttpStatus";
import {HttpMethod} from "../constants/HttpMethod";


export class RouteCollection extends Set<Route>{
  /**
   * 匹配路由
   * @param path
   */
  public match(path: string): RouteCollection {
    const routeCollection = new RouteCollection();
    this.forEach(route => {
      if (route.regexp.test(path)) {
        routeCollection.add(route);
      }
    })
    return routeCollection;
  }

  /**
   * 转换数组
   */
  public toArray(): Route[] {
    return Array.from(this);
  }

  /**
   * 转换json
   * @param space
   */
  public toJson(space: number = 2) {
    return JSON.stringify(this.toArray(), null, space)
  }

  public async handlerResponse(context: HttpContext): Promise<void> {
    for (let route of this) {
      if (route.regexp.test(context.request.url || "") && (route.method === HttpMethod.ALL || route.method === context.method)) {
        // 调整执行顺序，有可能父路由会有拦截行为
        if (typeof route.handler === "function") {
          await route.handler(context, route);
        }
        if (route.children) {
          await route.children.handlerResponse(context);
        }
      }
      if (context.response.writableFinished) break;
    }
    if (!context.response.writableFinished) {
      throw new HttpException(HttpStatus.NOT_FOUND);
    }
  }

  static create(...routes: Route[]): RouteCollection {
    return new RouteCollection(routes);
  }
}