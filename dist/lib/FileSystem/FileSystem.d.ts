/// <reference types="node" />
import * as fs from "fs";
export declare class FileSystem {
    path: string;
    protected constructor(path: string);
    /**
     * 测试对文件/目录的权限 异步
     * @param mode
     */
    access(mode?: number): Promise<void>;
    /**
     * 测试对文件/目录的权限 同步
     * @param mode
     */
    accessSync(mode?: number): void;
    /**
     * 获取文件/目录状态信息 异步
     */
    stat(): Promise<fs.Stats>;
    /**
     * 获取文件/目录状态信息 同步
     */
    statSync(): fs.Stats;
    /**
     * 修改文件/目录名称 异步
     * @param newPath
     */
    rename(newPath: string): Promise<void>;
    /**
     * 修改文件/目录名称 同步
     */
    renameSync(newPath: string): void;
    /**
     * 监听文件/目录变化
     * @param options
     * @param listener
     */
    watch(options: {
        encoding?: BufferEncoding | null;
        persistent?: boolean;
        recursive?: boolean;
    }, listener?: (event: string, filename: string) => any): fs.FSWatcher;
    /**
     * 表明调用进程可以读取文件
     */
    static ACCESS_FILE_OK: number;
    /**
     * 表明文件对调用进程可见
     */
    static ACCESS_READ_OK: number;
    /**
     * 表明调用进程可以写入文件。
     */
    static ACCESS_WRITE_OK: number;
    /**
     * 表明调用进程可以执行文件。 在 Windows 上无效（表现得像 fs.constants.F_OK）。
     */
    static ACCESS_X_OK: number;
}
