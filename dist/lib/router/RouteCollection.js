"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exception_1 = require("../exception");
const HttpStatus_1 = require("../constants/HttpStatus");
const HttpMethod_1 = require("../constants/HttpMethod");
class RouteCollection extends Set {
    /**
     * 匹配路由
     * @param path
     */
    match(path) {
        const routeCollection = new RouteCollection();
        this.forEach(route => {
            if (route.regexp.test(path)) {
                routeCollection.add(route);
            }
        });
        return routeCollection;
    }
    /**
     * 转换数组
     */
    toArray() {
        return Array.from(this);
    }
    /**
     * 转换json
     * @param space
     */
    toJSON(space = 2) {
        return JSON.stringify(this.toArray(), null, space);
    }
    async handlerResponse(context) {
        for (let route of this) {
            if (route.regexp.test(context.request.url || "") && (route.method === HttpMethod_1.HttpMethod.ALL || route.method === context.method)) {
                if (route.children) {
                    await route.children.handlerResponse(context);
                }
                if (typeof route.handler === "function") {
                    await route.handler(context, route);
                }
            }
            if (context.response.writableFinished)
                break;
        }
        if (!context.response.writableFinished) {
            throw new exception_1.HttpException(HttpStatus_1.HttpStatus.NOT_FOUND);
        }
    }
    static create(...routes) {
        return new RouteCollection(routes);
    }
}
exports.RouteCollection = RouteCollection;
