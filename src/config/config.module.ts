import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useFactory: () => {
        const configFile = process.env.NODE_ENV ?
                          `${process.env.NODE_ENV}.env` :
                          '';
        return new ConfigService(configFile);
      },
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
