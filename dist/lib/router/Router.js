"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const Route_1 = require("./Route");
const RouteCollection_1 = require("./RouteCollection");
class Router {
    constructor() {
        this.routes = new RouteCollection_1.RouteCollection();
    }
    async onResponse(context) {
        return await this.routes.handlerResponse(context);
    }
    /**
     * 添加路由
     * @param route
     */
    addRoute(route) {
        if (route instanceof Route_1.Route) {
            this.routes.add(route);
        }
        else {
            this.routes.add(Route_1.Route.create(route));
        }
        return this;
    }
    toArray() {
        return this.routes.toArray();
    }
    toJSON(space) {
        return JSON.stringify(this.toArray(), null, space);
    }
}
exports.Router = Router;
