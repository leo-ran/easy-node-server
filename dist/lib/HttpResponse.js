"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const content_disposition_1 = __importDefault(require("content-disposition"));
const mime_types_1 = __importDefault(require("mime-types"));
class HttpResponse extends http_1.ServerResponse {
    get status() {
        return this.statusCode;
    }
    set status(value) {
        this.statusCode = value;
    }
    get contentType() {
        const type = this.getHeader('Content-Type');
        if (!type)
            return '';
        return type.split(';', 1)[0];
    }
    set contentType(value) {
        const mime = HttpResponse.getMimeType(value) || value;
        if (mime)
            this.setHeader("Content-Type", mime);
    }
    get lastModified() {
        const date = this.getHeader('last-modified');
        if (date)
            return new Date(date);
        return undefined;
    }
    set lastModified(date) {
        if (date) {
            if (typeof date === "string")
                date = new Date(date);
            this.setHeader("Last-Modified", date.toUTCString());
        }
    }
    get etag() {
        return this.getHeader("ETag");
    }
    set etag(value) {
        if (!value)
            return;
        if (!/^(W\/)?"/.test(value))
            value = `"${value}"`;
        this.setHeader('ETag', value);
    }
    attachment(filename, options) {
        this.setHeader("Content-Disposition", content_disposition_1.default(filename));
        return this;
    }
    static getMimeType(type) {
        if (HttpResponse.mimeLookupCache.has(type)) {
            return HttpResponse.mimeLookupCache.get(type);
        }
        else {
            const mime = mime_types_1.default.lookup(type);
            this.mimeLookupCache.set(type, mime);
            return mime;
        }
    }
}
exports.HttpResponse = HttpResponse;
HttpResponse.mimeLookupCache = new Map();
