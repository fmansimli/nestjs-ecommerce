import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, _res: Response, next: (_error?: any) => void) {
    const _url = req.originalUrl;

    //console.log('from custom logger middleware', _url);

    next();
  }
}
