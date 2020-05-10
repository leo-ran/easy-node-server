import { Key } from "path-to-regexp";
import { HttpMethod } from "../constants/HttpMethod";
import { HttpContext } from "../HttpContext";
import { RouteCollection } from "./RouteCollection";
import { HttpPathParam } from "./HttpPathParam";
export declare class Route {
    private _path;
    keys: Key[];
    method: HttpMethod;
    handler?: RouteHandler;
    children?: RouteCollection;
    parent?: Route;
    get path(): string;
    set path(value: string);
    get regexp(): RegExp;
    constructor(options: RouteOption);
    /**
     * 匹配路由
     * @param path
     */
    match(path: string): boolean;
    /**
     * 添加子路由
     */
    add(route: RouteOption): this;
    /**
     * 路径参数
     * @param url
     */
    getPathParam<T extends object>(url: string): HttpPathParam<T>;
    /**
     * 创建Route
     * @param options
     */
    static create(options: RouteOption): Route;
    static createChildRoute(parent: Route, options: RouteOption): Route;
}
export interface RouteHandler {
    (httpContext: HttpContext, route: Route): Promise<void> | void;
}
export interface RouteOption {
    parent?: Route;
    path: string;
    handler?: RouteHandler;
    method?: HttpMethod;
    children?: RouteOption[];
}
