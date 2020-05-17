import {HttpStatus} from "../constants";

export class HttpException extends Error{
  constructor(public code: HttpStatus, message?: string) {
    super(message || HttpStatus[code].replace(/(-|_)/g, " "));
  }
}

HttpException.prototype.name = 'HttpException';