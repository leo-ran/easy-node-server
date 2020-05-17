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
exports.FileSystem = void 0;
const fs = __importStar(require("fs"));
let FileSystem = /** @class */ (() => {
    class FileSystem {
        constructor(path) {
            this.path = path;
        }
        /**
         * 测试对文件/目录的权限 异步
         * @param mode
         */
        access(mode = FileSystem.ACCESS_FILE_OK) {
            return fs.promises.access(this.path, mode);
        }
        /**
         * 测试对文件/目录的权限 同步
         * @param mode
         */
        accessSync(mode = FileSystem.ACCESS_FILE_OK) {
            return fs.accessSync(this.path, mode);
        }
        /**
         * 获取文件/目录状态信息 异步
         */
        stat() {
            return fs.promises.stat(this.path);
        }
        /**
         * 获取文件/目录状态信息 同步
         */
        statSync() {
            return fs.statSync(this.path);
        }
        /**
         * 修改文件/目录名称 异步
         * @param newPath
         */
        rename(newPath) {
            const res = fs.promises.rename(this.path, newPath);
            res.then(() => this.path = newPath);
            return res;
        }
        /**
         * 修改文件/目录名称 同步
         */
        renameSync(newPath) {
            fs.renameSync(this.path, newPath);
            this.path = newPath;
        }
        /**
         * 监听文件/目录变化
         * @param options
         * @param listener
         */
        watch(options, listener) {
            return fs.watch(this.path, {});
        }
    }
    /**
     * 表明调用进程可以读取文件
     */
    FileSystem.ACCESS_FILE_OK = fs.constants.F_OK;
    /**
     * 表明文件对调用进程可见
     */
    FileSystem.ACCESS_READ_OK = fs.constants.R_OK;
    /**
     * 表明调用进程可以写入文件。
     */
    FileSystem.ACCESS_WRITE_OK = fs.constants.W_OK;
    /**
     * 表明调用进程可以执行文件。 在 Windows 上无效（表现得像 fs.constants.F_OK）。
     */
    FileSystem.ACCESS_X_OK = fs.constants.X_OK;
    return FileSystem;
})();
exports.FileSystem = FileSystem;
