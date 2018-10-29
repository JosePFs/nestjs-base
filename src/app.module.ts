import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [
    CoreModule,
    TemplatesModule,
  ],
})
export class AppModule {}
