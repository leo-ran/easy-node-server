/// <reference types="node" />
import { ObjectedMap } from "../ObjectedMap";
import { ServerOptions } from "https";
export declare class HttpsServerOption extends ObjectedMap<ServerOptions> {
    static create(options: ServerOptions): HttpsServerOption;
}
