import { Injectable, Logger } from '@nestjs/common';

import { transports, createLogger, Logger as WinstonLogger, format, LogEntry } from 'winston';
import 'winston-daily-rotate-file';

import { ConfigService } from './../config/config.service';

@Injectable()
export class LoggerService extends Logger {

    private logger: WinstonLogger;

    constructor(private configService: ConfigService) {
        super(null, true);
        this.createLogger();
    }

    private createLogger() {
        const transportOptions = {
            dirname: __dirname + '/../../data/logs',
            zippedArchive: true,
        };

        this.logger = createLogger({
            level: 'info',
            format: format.json(),
            transports: [
                new ((transports as any).DailyRotateFile)({
                    ...transportOptions,
                    filename: 'error.log',
                    level: 'error',
                }),
                new ((transports as any).DailyRotateFile)({
                    ...transportOptions,
                    filename: 'combined.log',
                }),
            ],
        });
    }

    log(message: any, context?: string): void {
        super.log(message, context);
        this.logToFile(message, 'info');
    }

    error(message: any, trace?: string, context?: string): void {
        super.error(message, trace, context);
        this.logToFile(message, 'error');
    }

    warn(message: any, context?: string): void {
        super.error(message, context);
        this.logToFile(message, 'warn');
    }

    access(message: string): void {
        this.logToFile(message, 'info');
    }

    logToFile(message: string, level: string): void {
        const logEntry: LogEntry = { time: new Date().toISOString(), level,  message };
        this.logger.log(logEntry);
    }

}
