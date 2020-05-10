"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus_1 = require("../constants/HttpStatus");
class HttpException extends Error {
    constructor(code) {
        super(HttpStatus_1.HttpStatus[code].replace(/(-|_)/g, " "));
        this.code = code;
    }
}
exports.HttpException = HttpException;
HttpException.prototype.name = 'HttpException';
