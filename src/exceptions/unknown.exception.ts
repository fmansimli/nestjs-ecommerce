import { HttpException, HttpStatus } from '@nestjs/common';

export class UnknownException extends HttpException {
  constructor() {
    super('Unknown, Something went wrong!', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


new UnknownException()