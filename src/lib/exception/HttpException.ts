import {HttpStatus} from "../constants/HttpStatus";

export class HttpException extends Error{
  constructor(public code: HttpStatus) {
    super(HttpStatus[code].replace(/(-|_)/g, " "));
  }
}

HttpException.prototype.name = 'HttpException';