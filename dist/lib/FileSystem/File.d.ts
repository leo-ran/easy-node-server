/// <reference types="node" />
import * as fs from "fs";
import { FileSystem } from "./FileSystem";
export declare class File extends FileSystem {
    constructor(path: string);
    /**
     * 复制文件 异步
     */
    copy(path: string): Promise<File>;
    /**
     * 复制文件同步
     */
    copySync(path: string): File;
    /**
     * 以文本形式写入 异步
     * @param data
     * @param options
     */
    writeAsString(data: string, options: {
        encoding?: BufferEncoding;
        mode?: string | number;
        flag?: string | number;
    }): Promise<void>;
    /**
     * 以文本形式写入 同步
     * @param data
     * @param options
     */
    writeAsStringSync(data: string, options: {
        encoding?: BufferEncoding;
        mode?: string | number;
        flag?: string | number;
    }): void;
    /**
     * 以buffer形式写入
     * @param data
     */
    writeAsBuffer(data: Buffer): Promise<void>;
    writeAsBufferSync(data: Buffer): void;
    /**
     * 以文本形式追加 异步
     * @param data
     * @param options
     */
    appendAsString(data: string, options: {
        encoding?: BufferEncoding;
        mode?: string | number;
        flag?: string | number;
    }): Promise<void>;
    /**
     * 以文本形式追加 同步
     * @param data
     * @param options
     */
    appendAsStringSync(data: string, options: {
        encoding?: BufferEncoding;
        mode?: string | number;
        flag?: string | number;
    }): void;
    /**
     * 以buffer形式追加 同步
     * @param data
     */
    appendAsBuffer(data: Buffer): Promise<void>;
    /**
     * 以buffer形式追加 异步
     * @param data
     */
    appendAsBufferSync(data: Buffer): void;
    /**
     * 以文本形式读取文件 异步
     * @param encoding
     * @param flag
     */
    readAsString(encoding?: BufferEncoding, flag?: string | number): Promise<string>;
    /**
     * 以文本形式读取文件 同步
     * @param encoding
     * @param flag
     */
    readAsStringSync(encoding?: BufferEncoding, flag?: string): string;
    /**
     * 以Buffer的形式读取文件 异步
     */
    readAsBuffer(): Promise<Buffer>;
    /**
     * 以Buffer的形式读取文件 同步
     */
    readAsBufferSync(): Buffer;
    /**
     * 以流的形式读取
     * @param options
     */
    readAsStream(options?: {
        flags?: string;
        encoding?: string;
        fd?: number;
        mode?: number;
        autoClose?: boolean;
        /**
         * @default false
         */
        emitClose?: boolean;
        start?: number;
        end?: number;
        highWaterMark?: number;
    }): fs.ReadStream;
    /**
     * 以流的形式写入
     * @param options
     */
    writeAsStream(options?: {
        flags?: string;
        encoding?: string;
        fd?: number;
        mode?: number;
        autoClose?: boolean;
        emitClose?: boolean;
        start?: number;
        highWaterMark?: number;
    }): fs.WriteStream;
    /**
     * 删除文件 异步
     */
    remove(): Promise<void>;
    /**
     * 删除文件 同步
     */
    removeSync(): void;
}
