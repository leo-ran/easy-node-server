/// <reference types="node" />
import { ServerResponse as Response } from "http";
import { Options } from "content-disposition";
import { MimeTypes } from "./MimeTypes";
import { HttpStatus } from "./HttpStatus";
export declare class HttpResponse extends Response {
    get status(): HttpStatus;
    set status(value: HttpStatus);
    get contentType(): string;
    set contentType(value: string | MimeTypes);
    get lastModified(): Date | string | undefined;
    set lastModified(date: Date | string | undefined);
    get etag(): string | undefined;
    set etag(value: string | undefined);
    attachment(filename?: string, options?: Options): this;
    static mimeLookupCache: Map<string, string | false>;
    static getMimeType(type: string): string | false;
}
