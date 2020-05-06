/// <reference types="node" />
import { FileSystem } from "./FileSystem";
export declare class Directory extends FileSystem {
    constructor(path: string);
    /**
     * 获取当前目录 文件列表 异步
     */
    list(options?: {
        encoding: BufferEncoding | null;
        withFileTypes?: false;
    }): Promise<FileSystem[]>;
    /**
     * 获取当前目录 文件列表 同步
     */
    listSync(options?: {
        encoding: BufferEncoding | null;
        withFileTypes?: false;
    }): FileSystem[];
    /**
     * 创建目录 异步
     * @param options
     */
    create(options?: DirectoryCreateOption): Promise<string | undefined>;
    /**
     * 创建目录 同步
     * @param options
     */
    createSync(options?: DirectoryCreateOption): string | undefined;
    /**
     * 创建临时目录
     * @param prefix 文件前缀 尽量不要用 x 字符
     * @param options
     */
    createTemp(prefix: string, options?: {
        encoding?: string | null;
    }): Promise<string | Buffer>;
    /**
     * 创建临时目录 同步
     * @param prefix 文件前缀 尽量不要用 x 字符
     * @param options
     */
    createTempSync(prefix: string, options?: {
        encoding?: string | null;
    }): string | Buffer;
    /**
     * 删除目录 异步
     */
    remove(): Promise<void>;
    /**
     * 删除目录 同步
     */
    removeSync(): void;
}
export interface DirectoryCreateOption {
    /**
     * Indicates whether parent folders should be created.
     * If a folder was created, the path to the first created folder will be returned.
     * @default false
     */
    recursive?: boolean;
    /**
     * A file mode. If a string is passed, it is parsed as an octal integer. If not specified
     * @default 0o777
     */
    mode?: number | string;
}
