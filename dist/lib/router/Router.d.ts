import { HttpContext } from "../HttpContext";
import { Route, RouteOption } from "./Route";
import { RouteCollection } from "./RouteCollection";
export declare class Router {
    routes: RouteCollection;
    onResponse(context: HttpContext): Promise<void>;
    /**
     * 添加路由
     * @param route
     */
    addRoute(route: Route | RouteOption): this;
    toArray(): Route[];
    toJSON(space: 2): string;
}
