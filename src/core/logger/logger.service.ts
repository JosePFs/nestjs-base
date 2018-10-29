import { Injectable, Logger } from '@nestjs/common';

import { transports, createLogger, Logger as WinstonLogger, format, LogEntry } from 'winston';
import 'winston-daily-rotate-file';

import { ConfigService } from '../config/config.service';
import { DateService } from '../utils/date.service';

@Injectable()
export class LoggerService extends Logger {

    private logger: WinstonLogger;

    constructor(
        private readonly configService: ConfigService,
        private readonly dateService: DateService,
    ) {
        super(null, true);
        this.createLogger();
    }

    private createLogger() {
        const transportOptions = {
            dirname: __dirname +  `/../../../${this.configService.get('LOGS_FOLDER')}`,
            zippedArchive: true,
        };

        const levels = {
            emerg: 0,
            alert: 1,
            crit: 2,
            error: 3,
            warning: 4,
            notice: 5,
            access: 6,
            info: 7,
            debug: 8,
        };

        this.logger = createLogger({
            levels,
            level: 'info',
            format: format.json(),
            transports: [
                new ((transports as any).DailyRotateFile)({
                    ...transportOptions,
                    filename: 'access.log',
                    level: 'access',
                }),
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
        this.logToFile(message, 'access');
    }

    logToFile(message: string, level: string): void {
        const logEntry: LogEntry = { time: this.dateService.getNowString(), level,  message };
        this.logger.log(logEntry);
    }

}
