"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const path_to_regexp_1 = require("path-to-regexp");
const HttpMethod_1 = require("../constants/HttpMethod");
const RouteCollection_1 = require("./RouteCollection");
const HttpPathParam_1 = require("./HttpPathParam");
class Route {
    constructor(options) {
        this.keys = [];
        this.method = HttpMethod_1.HttpMethod.ALL;
        this.method = options.method || HttpMethod_1.HttpMethod.ALL;
        this.parent = options.parent;
        this.handler = options.handler;
        this._path = options.path;
        // 创建子路由
        if (Array.isArray(options.children)) {
            this.children = RouteCollection_1.RouteCollection.create(...options.children.map(option => {
                return Route.createChildRoute(this, option);
            }));
        }
    }
    get path() {
        return `${this.parent ? this.parent.path : ""}${this._path}`;
    }
    set path(value) {
        this._path = value;
    }
    get regexp() {
        this.keys = [];
        return path_to_regexp_1.pathToRegexp(this.path, this.keys, {
            end: !Boolean(this.children)
        });
    }
    /**
     * 匹配路由
     * @param path
     */
    match(path) {
        return this.regexp.test(path);
    }
    /**
     * 添加子路由
     */
    add(route) {
        this.children = this.children || new RouteCollection_1.RouteCollection();
        this.children.add(Route.create({
            ...route,
            parent: this,
        }));
        return this;
    }
    /**
     * 路径参数
     * @param url
     */
    getPathParam(url) {
        const o = {};
        const exec = this.regexp.exec(url);
        if (exec) {
            this.keys.forEach((item, index) => {
                o[item.name] = exec[index + 1];
            });
        }
        return HttpPathParam_1.HttpPathParam.create(o);
    }
    /**
     * 创建Route
     * @param options
     */
    static create(options) {
        return new Route(options);
    }
    static createChildRoute(parent, options) {
        return new Route({
            ...options,
            parent,
        });
    }
}
exports.Route = Route;
