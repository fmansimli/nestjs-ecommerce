import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { UsersService } from '../_features/users/users.service';

declare global {
  namespace Express {
    interface Request {
      session?: any;
      currentUser?: any;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly service: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.service.findById(userId);
      req.currentUser = user;
    }

    next();
  }
}
