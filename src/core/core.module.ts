import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { UtilsModule } from './utils/utils.module';
import { LoggerModule } from './logger/logger.module';
import { AllExceptionsFilter } from './filter/all-exception.filter';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
    imports: [ConfigModule, DatabaseModule, UtilsModule, LoggerModule],
    exports: [ConfigModule, DatabaseModule, UtilsModule, LoggerModule],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class CoreModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
          .apply(LoggerMiddleware)
          .with('CoreModule')
          .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
