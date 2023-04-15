import { CallHandler, ExecutionContext, NestInterceptor, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

//import { UsersService } from 'src/features/users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  //constructor(private readonly service: UsersService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.user = { modified: new Date() };

    // const { userId } = req.session || {};

    // if (userId) {
    //   const user = await this.service.findById(userId);
    //   req.user = user;
    // }

    return next.handle();
  }
}
