import * as fs from "fs";
import {FileSystem} from "./FileSystem";
export class File extends FileSystem {
  constructor(path: string) {
    super(path);
  }

  /**
   * 复制文件 异步
   */
  public async copy(path: string): Promise<File> {
    await fs.promises.copyFile(this.path, path);
    return new File(path);
  }
  /**
   * 复制文件同步
   */
  public copySync(path: string): File {
    fs.copyFileSync(this.path, path);
    return new File(path);
  }

  /**
   * 以文本形式写入 异步
   * @param data
   * @param options
   */
  public writeAsString(data: string, options: {encoding?: BufferEncoding, mode?: string | number, flag?: string | number}) {
    return fs.promises.writeFile(this.path, data, options);
  }
  /**
   * 以文本形式写入 同步
   * @param data
   * @param options
   */
  public writeAsStringSync(data: string, options: {encoding?: BufferEncoding, mode?: string | number, flag?: string | number}) {
    return fs.writeFileSync(this.path, data, options as any);
  }

  /**
   * 以buffer形式写入
   * @param data
   */
  public writeAsBuffer(data: Buffer) {
    return fs.promises.writeFile(this.path, data);
  }
  public writeAsBufferSync(data: Buffer) {
    return fs.writeFileSync(this.path, data);
  }


  /**
   * 以文本形式追加 异步
   * @param data
   * @param options
   */
  public appendAsString(data: string, options: {encoding?: BufferEncoding, mode?: string | number, flag?: string | number}) {
    return fs.promises.appendFile(this.path, data, options);
  }
  /**
   * 以文本形式追加 同步
   * @param data
   * @param options
   */
  public appendAsStringSync(data: string, options: {encoding?: BufferEncoding, mode?: string | number, flag?: string | number}) {
    return fs.appendFileSync(this.path, data, options as any);
  }

  /**
   * 以buffer形式追加 同步
   * @param data
   */
  public appendAsBuffer(data: Buffer) {
    return fs.promises.appendFile(this.path, data);
  }
  /**
   * 以buffer形式追加 异步
   * @param data
   */
  public appendAsBufferSync(data: Buffer) {
    return fs.appendFileSync(this.path, data);
  }

  /**
   * 以文本形式读取文件 异步
   * @param encoding
   * @param flag
   */
  public readAsString(encoding: BufferEncoding = "utf8", flag?: string | number): Promise<string> {
    return fs.promises.readFile(this.path, {
      encoding,
      flag
    })
  }
  /**
   * 以文本形式读取文件 同步
   * @param encoding
   * @param flag
   */
  public readAsStringSync(encoding: BufferEncoding = "utf8", flag?: string): string {
    return fs.readFileSync(this.path, {
      encoding,
      flag,
    })
  }

  /**
   * 以Buffer的形式读取文件 异步
   */
  public readAsBuffer(): Promise<Buffer> {
    return fs.promises.readFile(this.path);
  }
  /**
   * 以Buffer的形式读取文件 同步
   */
  public readAsBufferSync(): Buffer {
    return fs.readFileSync(this.path);
  }

  /**
   * 以流的形式读取
   * @param options
   */
  public readAsStream(options: {
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
  } = {}): fs.ReadStream {
    return fs.createReadStream(this.path, options);
  }

  /**
   * 以流的形式写入
   * @param options
   */
  public writeAsStream(options: {
    flags?: string;
    encoding?: string;
    fd?: number;
    mode?: number;
    autoClose?: boolean;
    emitClose?: boolean;
    start?: number;
    highWaterMark?: number;
  } = {}): fs.WriteStream {
    return  fs.createWriteStream(this.path, options);
  }

  /**
   * 删除文件 异步
   */
  public remove(): Promise<void> {
    return fs.promises.unlink(this.path);
  }

  /**
   * 删除文件 同步
   */
  public removeSync(): void {
    fs.unlinkSync(this.path);
  }

}