import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(private readonly loggerService: LoggerService) {}

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      const message = `${req.headers['user-agent']} ${req.method} ${req.originalUrl}`;
      this.loggerService.access(message);
      next();
    };
  }
}