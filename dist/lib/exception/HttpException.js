"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const constants_1 = require("../constants");
class HttpException extends Error {
    constructor(code, message) {
        super(message || constants_1.HttpStatus[code].replace(/(-|_)/g, " "));
        this.code = code;
    }
}
exports.HttpException = HttpException;
HttpException.prototype.name = 'HttpException';
