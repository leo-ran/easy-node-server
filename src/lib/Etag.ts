import * as fs from "fs";
import * as crypto from "crypto";
import {File} from "./FileSystem";

export class Etag {
  constructor(
    public url: string,
    public mtime: Date,
    public size: number,
    public data?: Buffer,
  ) {}

  public stringify() {
    const {mtime, size, data, url} = this;
    if (data) {
      return `${toHex(url)}-${mtime.getTime()}-${size}-${crypto.createHash("md5").update(data).digest("hex")}`;
    }
    return `w/"${toHex(url)}-${mtime.getTime()}-${size}"`;
  }

  /**
   * 从文件创建Etag
   * @param url 访问的 url
   * @param file 文件对象
   * @param mode 强弱模式 easy-弱  / strict-强
   */
  static fromFile(url: string, file: File, mode: 'easy' | 'strict' = 'easy'): Etag {
    const stat = file.statSync();
    const buffer = file.readAsBufferSync();
    if (mode === 'easy') {
      return new Etag(
        url,
        stat.mtime,
        stat.size,
      )
    } else {
      return new Etag(
        url,
        stat.mtime,
        stat.size,
        buffer
      )
    }

  }

  static parse(stringEtag: string): ParsedStringEtag {
    if (stringEtag === null || stringEtag === undefined) throw new TypeError("stringEtag must be an string");
    const o: ParsedStringEtag = {};
    const [url, mtime, size] = stringEtag.split("-");
    return {
      url: Buffer.from(url, "hex").toString(),
      mtime: new Date(Number(mtime)),
      size: Number(size),
    }
  }
}

function toHex(value: string | Buffer | number[] | Array<any> | object): string {
  return Buffer.from(value).toString("hex");
}

export interface ParsedStringEtag {
  url?: string;
  mtime?: Date;
  size?: number;
}