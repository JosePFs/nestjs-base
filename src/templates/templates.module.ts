import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateRepository } from './../repository/template.repository';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { Template } from './../entity/Template';

@Module({
  imports: [TypeOrmModule.forFeature([Template, TemplateRepository])],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
