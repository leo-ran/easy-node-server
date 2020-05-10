import {Key, pathToRegexp} from "path-to-regexp";
import {HttpMethod} from "../constants/HttpMethod";
import {HttpContext} from "../HttpContext";
import {RouteCollection} from "./RouteCollection";
import {HttpPathParam} from "./HttpPathParam";

export class Route {
  private _path: string;
  public keys: Key[] = [];
  public method: HttpMethod = HttpMethod.ALL;
  public handler?: RouteHandler;
  public children?: RouteCollection;
  public parent?: Route;
  public get path(): string {
    return `${this.parent ? this.parent.path:""}${this._path}`;
  }
  public set path(value) {
    this._path = value;
  }
  public get regexp(): RegExp {
    this.keys = [];
    return pathToRegexp(this.path, this.keys, {
      end: !Boolean(this.children)
    });
  }
  constructor(options: RouteOption) {
    this.method = options.method || HttpMethod.ALL;
    this.parent = options.parent;
    this.handler = options.handler;
    this._path = options.path;
    // 创建子路由
    if (Array.isArray(options.children)) {
      this.children = RouteCollection.create(
        ...options.children.map(option => {
          return  Route.createChildRoute(this, option);
        })
      )
    }
  }

  /**
   * 匹配路由
   * @param path
   */
  public match(path: string): boolean {
    return this.regexp.test(path);
  }

  /**
   * 添加子路由
   */
  public add(route: RouteOption): this {
    this.children = this.children || new RouteCollection();
    this.children.add(Route.create({
      ...route,
      parent: this,
    }))
    return this;
  }

  /**
   * 路径参数
   * @param url
   */
  public getPathParam<T extends object>(url: string): HttpPathParam<T> {
    const o: any = {};
    const exec = this.regexp.exec(url);
    if (exec) {
      this.keys.forEach((item, index) => {
        o[item.name] = exec[index+1];
      })
    }
    return HttpPathParam.create(o);
  }

  /**
   * 创建Route
   * @param options
   */
  static create(options: RouteOption) {
    return new Route(options);
  }

  static createChildRoute(parent: Route, options: RouteOption): Route {
    return new Route({
      ...options,
      parent,
    });
  }
}

export interface RouteHandler {
  (httpContext: HttpContext, route: Route): Promise<void> | void;
}

export interface RouteOption {
  // 父路由
  parent?: Route;
  // 路由的路径
  path: string;
  // 路由处理函数 可选
  handler?: RouteHandler;
  // 路由的请求方式
  method?: HttpMethod;
  // children
  children?: RouteOption[];
}