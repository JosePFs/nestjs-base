import { Injectable, Logger } from '@nestjs/common';

import { transports, createLogger, Logger as logger, format, LogEntry } from 'winston';

@Injectable()
export class LoggerService extends Logger {

    private logger: logger;

    constructor() {
        super(null, true);
        this.createLogger();
    }

    private createLogger() {
        this.logger = createLogger({
            level: 'info',
            format: format.json(),
            transports: [
                //
                // - Write to all logs with level `info` and below to `combined.log`
                // - Write all logs error (and below) to `error.log`.
                //
                new transports.File({ dirname: '../data/logs/', filename: 'error.log', level: 'error' }),
                new transports.File({ dirname: '../data/logs/', filename: 'combined.log' }),
            ],
        });

        //
        // If we're not in production then log to the `console` with the format:
        // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
        //
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new transports.Console({
                format: format.simple(),
            }));
        }
    }

    public logToFile(message: string, trace?: string, context?: string): void {
        const logEntry: LogEntry = { level: 'error', message: `Message: ${message}. Trace: ${trace}` };
        // tslint:disable-next-line:no-console
        console.log('entra', logEntry);
        this.logger.log(logEntry);
    }

}
