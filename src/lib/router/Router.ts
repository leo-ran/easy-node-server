import {HttpContext} from "../HttpContext";
import {Route, RouteOption} from "./Route";
import {RouteCollection} from "./RouteCollection";

export class Router {
  public routes = new RouteCollection();

  public async onResponse(context: HttpContext): Promise<void> {
    return await this.routes.handlerResponse(context);
  }

  /**
   * 添加路由
   * @param route
   */
  public addRoute(route: Route | RouteOption): this {
    if (route instanceof  Route) {
      this.routes.add(route);
    } else {
      this.routes.add(Route.create(route));
    }
    return this;
  }

  public toArray(): Route[] {
    return this.routes.toArray();
  }

  public toJSON(space: 2): string {
    return JSON.stringify(this.toArray(), null, space);
  }
}