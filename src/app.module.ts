import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { LoggerModule } from './logger/logger.module';
import { TemplatesModule } from './templates/templates.module';
import { AllExceptionsFilter } from './filter/all-exception.filter';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TemplatesModule, LoggerModule, ConfigModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
