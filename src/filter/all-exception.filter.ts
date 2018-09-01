import { Catch, ArgumentsHost, HttpServer, Inject } from '@nestjs/common';
import { BaseExceptionFilter, HTTP_SERVER_REF } from '@nestjs/core';

import { LoggerService } from '../logger/logger.service';
import { DateService } from '../utils/date.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    @Inject(HTTP_SERVER_REF) applicationRef: HttpServer,
    private loggerService: LoggerService,
    private readonly dateService: DateService,
  ) {
    super(applicationRef);
  }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const exceptionResponse = {
        statusCode: status,
        error: exception.message.error || exception.getResponse(),
        message: exception.message.message || exception.message,
        timestamp: this.dateService.getNowString(),
        path: request.url,
    };

    const errorLog = exception.message.message ?
                    `${exceptionResponse.message}` :
                    `${exceptionResponse.message} ${exceptionResponse.path}`;
    this.loggerService.error(errorLog);

    response
      .status(status)
      .json(exceptionResponse);
  }
}