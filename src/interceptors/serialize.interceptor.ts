import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {
    //
  };
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor) {}

  intercept(_context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map((_data: any) => {
        const data = plainToInstance(this.dto, _data, {
          excludeExtraneousValues: true,
        });

        return data;
      }),
    );
  }
}
