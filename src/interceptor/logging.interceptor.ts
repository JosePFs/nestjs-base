import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoggerService } from 'logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  constructor(private readonly loggerService: LoggerService) {}

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {

    const method = context.switchToHttp().getRequest<Request>().method;
    const url = context.switchToHttp().getRequest<Request>().url;
    const userAgent = context.switchToHttp().getRequest<Request>().headers['user-agent'];

    const message = `${userAgent} ${method} ${url}`;

    return call$.pipe(
      tap(() =>  {
        this.loggerService.access(message);
      }),
    );

  }
}