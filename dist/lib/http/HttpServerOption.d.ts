/// <reference types="node" />
import { ObjectedMap } from "../ObjectedMap";
import { ServerOptions } from "http";
export declare class HttpServerOption extends ObjectedMap<ServerOptions> {
    static create(options?: ServerOptions): HttpServerOption;
}
