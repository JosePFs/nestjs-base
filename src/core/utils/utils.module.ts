import { Module } from '@nestjs/common';

import { DateService } from './date.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [DateService],
  exports: [DateService],
})
export class UtilsModule {}
