import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
              type: 'mongodb',
              host: configService.get('DATABASE_HOST'),
              database: configService.get('DATABASE_NAME'),
              entities: [__dirname + '/../../entity/*{.ts,.js}'],
              synchronize: configService.get('DATABASE_SYNCHRONIZE'),
              logging: configService.get('DATABASE_LOGGING'),
              subscribers: [__dirname + '/../../subscribers/*{.ts,.js}'],
              migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
              cli: {
                entitiesDir: 'src/entity',
                migrationsDir: 'src/migration',
                subscribersDir: 'src/subscriber',
              },
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
