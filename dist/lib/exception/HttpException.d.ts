import { HttpStatus } from "../constants/HttpStatus";
export declare class HttpException extends Error {
    code: HttpStatus;
    constructor(code: HttpStatus);
}
