/// <reference types="node" />
import { File } from "./FileSystem";
export declare class Etag {
    url: string;
    mtime: Date;
    size: number;
    data?: Buffer | undefined;
    constructor(url: string, mtime: Date, size: number, data?: Buffer | undefined);
    stringify(): string;
    /**
     * 从文件创建Etag
     * @param url 访问的 url
     * @param file 文件对象
     * @param mode 强弱模式 easy-弱  / strict-强
     */
    static fromFile(url: string, file: File, mode?: 'easy' | 'strict'): Etag;
    static parse(stringEtag: string): ParsedStringEtag;
}
export interface ParsedStringEtag {
    url?: string;
    mtime?: Date;
    size?: number;
}
