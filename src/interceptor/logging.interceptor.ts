import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  constructor(private readonly loggerService: LoggerService) {}

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {

    const request = context.switchToHttp().getRequest();
    const message = `${request.headers['user-agent']} ${request.raw.method} ${request.raw.url}`;

    return call$.pipe(
      tap(() =>  {
        this.loggerService.access(message);
      }),
    );

  }
}