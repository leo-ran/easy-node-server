import * as fs from "fs";

export class FileSystem {
  protected constructor(
    public path: string,
  ) {}

  /**
   * 测试对文件/目录的权限 异步
   * @param mode
   */
  public access(mode: number = FileSystem.ACCESS_FILE_OK) {
    return fs.promises.access(this.path, mode);
  }
  /**
   * 测试对文件/目录的权限 同步
   * @param mode
   */
  public accessSync(mode: number = FileSystem.ACCESS_FILE_OK) {
    return fs.accessSync(this.path, mode);
  }

  /**
   * 获取文件/目录状态信息 异步
   */
  public stat(): Promise<fs.Stats> {
    return fs.promises.stat(this.path)
  }

  /**
   * 获取文件/目录状态信息 同步
   */
  public statSync(): fs.Stats {
    return fs.statSync(this.path);
  }

  /**
   * 修改文件/目录名称 异步
   * @param newPath
   */
  public rename(newPath: string): Promise<void> {
    const res = fs.promises.rename(this.path, newPath);
    res.then(() => this.path = newPath);
    return  res;
  }

  /**
   * 修改文件/目录名称 同步
   */
  public renameSync(newPath: string): void {
    fs.renameSync(this.path, newPath);
    this.path = newPath;
  }

  /**
   * 监听文件/目录变化
   * @param options
   * @param listener
   */
  public watch(options: {encoding?: BufferEncoding | null, persistent?: boolean, recursive?: boolean},listener?: (event: string, filename: string) => any): fs.FSWatcher {
    return fs.watch(this.path, {})
  }

  /**
   * 表明调用进程可以读取文件
   */
  static ACCESS_FILE_OK = fs.constants.F_OK;
  /**
   * 表明文件对调用进程可见
   */
  static ACCESS_READ_OK = fs.constants.R_OK;

  /**
   * 表明调用进程可以写入文件。
   */
  static ACCESS_WRITE_OK = fs.constants.W_OK;

  /**
   * 表明调用进程可以执行文件。 在 Windows 上无效（表现得像 fs.constants.F_OK）。
   */
  static ACCESS_X_OK = fs.constants.X_OK;
}