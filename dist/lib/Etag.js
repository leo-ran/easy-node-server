"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
class Etag {
    constructor(url, mtime, size, data) {
        this.url = url;
        this.mtime = mtime;
        this.size = size;
        this.data = data;
    }
    stringify() {
        const { mtime, size, data, url } = this;
        if (data) {
            return `${toHex(url)}-${mtime.getTime()}-${size}-${crypto.createHash("md5").update(data).digest("hex")}`;
        }
        return `w/"${toHex(url)}-${mtime.getTime()}-${size}"`;
    }
    /**
     * 从文件创建Etag
     * @param url 访问的 url
     * @param file 文件对象
     * @param mode 强弱模式 easy-弱  / strict-强
     */
    static fromFile(url, file, mode = 'easy') {
        const stat = file.statSync();
        const buffer = file.readAsBufferSync();
        if (mode === 'easy') {
            return new Etag(url, stat.mtime, stat.size);
        }
        else {
            return new Etag(url, stat.mtime, stat.size, buffer);
        }
    }
    static parse(stringEtag) {
        if (stringEtag === null || stringEtag === undefined)
            throw new TypeError("stringEtag must be an string");
        const o = {};
        const [url, mtime, size] = stringEtag.split("-");
        return {
            url: Buffer.from(url, "hex").toString(),
            mtime: new Date(Number(mtime)),
            size: Number(size),
        };
    }
}
exports.Etag = Etag;
function toHex(value) {
    return Buffer.from(value).toString("hex");
}
