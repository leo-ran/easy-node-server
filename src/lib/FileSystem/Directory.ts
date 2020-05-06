import * as fs from "fs";
import * as path from "path";
import {FileSystem} from "./FileSystem";

export class Directory extends FileSystem {
  constructor(path: string) {
    super(path);
  }

  /**
   * 获取当前目录 文件列表 异步
   */
  public list(options: {encoding: BufferEncoding | null; withFileTypes?: false} = {encoding: 'utf8'}): Promise<FileSystem[]> {
    return new Promise<FileSystem[]>((resolve, reject) => {
        fs.readdir(this.path, options,(err, files) => {
          if (err) return reject(err);
          return resolve(files.map(item => new FileSystem(path.join(this.path, item))));
        })
    });
  }

  /**
   * 获取当前目录 文件列表 同步
   */
  public listSync(options: {encoding: BufferEncoding | null; withFileTypes?: false} = {encoding: 'utf8'}): FileSystem[] {
    const files = fs.readdirSync(this.path, options);
    return files.map(item => new FileSystem(path.join(this.path, item)));
  }

  /**
   * 创建目录 异步
   * @param options
   */
  public create(options: DirectoryCreateOption = {}): Promise<string| undefined> {
    return fs.promises.mkdir(this.path, options)
  }

  /**
   * 创建目录 同步
   * @param options
   */
  public createSync(options: DirectoryCreateOption = {}): string | undefined {
    return fs.mkdirSync(this.path, options);
  }

  /**
   * 创建临时目录
   * @param prefix 文件前缀 尽量不要用 x 字符
   * @param options
   */
  public createTemp(prefix: string, options: { encoding?: string | null } = {}): Promise<string|Buffer> {
    return fs.promises.mkdtemp(prefix, options);
  }

  /**
   * 创建临时目录 同步
   * @param prefix 文件前缀 尽量不要用 x 字符
   * @param options
   */
  public createTempSync(prefix: string, options: { encoding?: string | null } = {}): string|Buffer {
    return fs.mkdtempSync(prefix, options);
  }

  /**
   * 删除目录 异步
   */
  public remove(): Promise<void> {
    return fs.promises.rmdir(this.path);
  }

  /**
   * 删除目录 同步
   */
  public removeSync(): void {
    return fs.rmdirSync(this.path);
  }
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