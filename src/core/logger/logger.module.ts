import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { LoggerService } from './logger.service';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [ConfigModule, UtilsModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
