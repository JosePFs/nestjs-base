import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  constructor(private logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const exceptionResponse = {
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
    };

    this.logger.log(exceptionResponse.message);

    response
      .status(status)
      .json(exceptionResponse);
  }
}