import {ServerResponse as Response} from "http";
import contentDisposition, { Options } from "content-disposition";
import mimeTypes from "mime-types";
import {MimeTypes} from "./constants/MimeTypes";
import {HttpStatus} from "./constants/HttpStatus";

export class HttpResponse extends Response {

  public get status(): HttpStatus {
    return this.statusCode;
  }
  public set status(value) {
    this.statusCode = value;
  }

  public get contentType(): string {
    const type: string | undefined = this.getHeader('Content-Type') as string | undefined;
    if (!type) return '';
    return type.split(';', 1)[0];
  }
  public set contentType(value: string | MimeTypes) {
    const mime = HttpResponse.getMimeType(value) || value;
    if (mime) this.setHeader("Content-Type", mime);
  }

  public get lastModified(): Date | string | undefined {
    const date = this.getHeader('last-modified') as string;
    if (date) return new Date(date);
    return undefined;
  }
  public set lastModified(date: Date | string | undefined) {
    if (date) {
      if (typeof date === "string") date = new Date(date);
      this.setHeader("Last-Modified", date.toUTCString());
    }
  }

  public get etag(): string | undefined {
    return this.getHeader("ETag") as string | undefined;
  }
  public set etag(value) {
    if (!value) return;
    if (!/^(W\/)?"/.test(value)) value = `"${value}"`;
    this.setHeader('ETag', value);
  }

  public attachment(filename?: string, options?: Options) {
    this.setHeader("Content-Disposition", contentDisposition(filename));
    return this;
  }

  static mimeLookupCache = new Map<string, string | false>();
  static getMimeType(type: string): string | false {
      if (HttpResponse.mimeLookupCache.has(type)) {
        return <string|false>HttpResponse.mimeLookupCache.get(type);
      } else {
        const mime = mimeTypes.lookup(type);
        this.mimeLookupCache.set(type, mime);
        return mime;
      }
  }
}