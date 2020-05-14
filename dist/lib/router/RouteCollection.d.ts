import { Route } from "./Route";
import { HttpContext } from "../HttpContext";
export declare class RouteCollection extends Set<Route> {
    /**
     * 匹配路由
     * @param path
     */
    match(path: string): RouteCollection;
    /**
     * 转换数组
     */
    toArray(): Route[];
    /**
     * 转换json
     * @param space
     */
    toJson(space?: number): string;
    handlerResponse(context: HttpContext): Promise<void>;
    static create(...routes: Route[]): RouteCollection;
}
