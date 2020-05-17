"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const fs = __importStar(require("fs"));
const FileSystem_1 = require("./FileSystem");
class File extends FileSystem_1.FileSystem {
    constructor(path) {
        super(path);
    }
    /**
     * 复制文件 异步
     */
    async copy(path) {
        await fs.promises.copyFile(this.path, path);
        return new File(path);
    }
    /**
     * 复制文件同步
     */
    copySync(path) {
        fs.copyFileSync(this.path, path);
        return new File(path);
    }
    /**
     * 以文本形式写入 异步
     * @param data
     * @param options
     */
    writeAsString(data, options) {
        return fs.promises.writeFile(this.path, data, options);
    }
    /**
     * 以文本形式写入 同步
     * @param data
     * @param options
     */
    writeAsStringSync(data, options) {
        return fs.writeFileSync(this.path, data, options);
    }
    /**
     * 以buffer形式写入
     * @param data
     */
    writeAsBuffer(data) {
        return fs.promises.writeFile(this.path, data);
    }
    writeAsBufferSync(data) {
        return fs.writeFileSync(this.path, data);
    }
    /**
     * 以文本形式追加 异步
     * @param data
     * @param options
     */
    appendAsString(data, options) {
        return fs.promises.appendFile(this.path, data, options);
    }
    /**
     * 以文本形式追加 同步
     * @param data
     * @param options
     */
    appendAsStringSync(data, options) {
        return fs.appendFileSync(this.path, data, options);
    }
    /**
     * 以buffer形式追加 同步
     * @param data
     */
    appendAsBuffer(data) {
        return fs.promises.appendFile(this.path, data);
    }
    /**
     * 以buffer形式追加 异步
     * @param data
     */
    appendAsBufferSync(data) {
        return fs.appendFileSync(this.path, data);
    }
    /**
     * 以文本形式读取文件 异步
     * @param encoding
     * @param flag
     */
    readAsString(encoding = "utf8", flag) {
        return fs.promises.readFile(this.path, {
            encoding,
            flag
        });
    }
    /**
     * 以文本形式读取文件 同步
     * @param encoding
     * @param flag
     */
    readAsStringSync(encoding = "utf8", flag) {
        return fs.readFileSync(this.path, {
            encoding,
            flag,
        });
    }
    /**
     * 以Buffer的形式读取文件 异步
     */
    readAsBuffer() {
        return fs.promises.readFile(this.path);
    }
    /**
     * 以Buffer的形式读取文件 同步
     */
    readAsBufferSync() {
        return fs.readFileSync(this.path);
    }
    /**
     * 以流的形式读取
     * @param options
     */
    readAsStream(options = {}) {
        return fs.createReadStream(this.path, options);
    }
    /**
     * 以流的形式写入
     * @param options
     */
    writeAsStream(options = {}) {
        return fs.createWriteStream(this.path, options);
    }
    /**
     * 删除文件 异步
     */
    remove() {
        return fs.promises.unlink(this.path);
    }
    /**
     * 删除文件 同步
     */
    removeSync() {
        fs.unlinkSync(this.path);
    }
}
exports.File = File;
