import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { LoggerModule } from './logger/logger.module';
import { AllExceptionsFilter } from './filter/all-exception.filter';
import { TemplatesModule } from './templates/templates.module';
import { ConfigModule } from './config/config.module';
import { UtilsModule } from './utils/utils.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('DATABASE_HOST'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/entity/*{.ts,.js}'],
        synchronize: configService.get('DATABASE_SYNCHRONIZE'),
        logging: configService.get('DATABASE_LOGGING'),
        subscribers: [__dirname + '/subscribers/*{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        cli: {
          entitiesDir: 'src/entity',
          migrationsDir: 'src/migration',
          subscribersDir: 'src/subscriber',
        },
      }),
      inject: [ConfigService],
    }),
    TemplatesModule,
    LoggerModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
