import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesModule } from './templates/templates.module';
import { LoggerModule } from './logger/logger.module';


@Module({
  imports: [TypeOrmModule.forRoot(), TemplatesModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
