import { HttpStatus } from "../constants";
export declare class HttpException extends Error {
    code: HttpStatus;
    constructor(code: HttpStatus, message?: string);
}
