"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const FileSystem_1 = require("./FileSystem");
class Directory extends FileSystem_1.FileSystem {
    constructor(path) {
        super(path);
    }
    /**
     * 获取当前目录 文件列表 异步
     */
    list(options = { encoding: 'utf8' }) {
        return new Promise((resolve, reject) => {
            fs.readdir(this.path, options, (err, files) => {
                if (err)
                    return reject(err);
                return resolve(files.map(item => new FileSystem_1.FileSystem(path.join(this.path, item))));
            });
        });
    }
    /**
     * 获取当前目录 文件列表 同步
     */
    listSync(options = { encoding: 'utf8' }) {
        const files = fs.readdirSync(this.path, options);
        return files.map(item => new FileSystem_1.FileSystem(path.join(this.path, item)));
    }
    /**
     * 创建目录 异步
     * @param options
     */
    create(options = {}) {
        return fs.promises.mkdir(this.path, options);
    }
    /**
     * 创建目录 同步
     * @param options
     */
    createSync(options = {}) {
        return fs.mkdirSync(this.path, options);
    }
    /**
     * 创建临时目录
     * @param prefix 文件前缀 尽量不要用 x 字符
     * @param options
     */
    createTemp(prefix, options = {}) {
        return fs.promises.mkdtemp(prefix, options);
    }
    /**
     * 创建临时目录 同步
     * @param prefix 文件前缀 尽量不要用 x 字符
     * @param options
     */
    createTempSync(prefix, options = {}) {
        return fs.mkdtempSync(prefix, options);
    }
    /**
     * 删除目录 异步
     */
    remove() {
        return fs.promises.rmdir(this.path);
    }
    /**
     * 删除目录 同步
     */
    removeSync() {
        return fs.rmdirSync(this.path);
    }
}
exports.Directory = Directory;
