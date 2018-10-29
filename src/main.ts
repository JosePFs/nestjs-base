import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import 'reflect-metadata';

import { AppModule } from './app.module';
import { ConfigService } from './core/config/config.service';
import { LoggerService } from './core/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const config = app.get(ConfigService);

  app.useLogger(app.get(LoggerService));

  app.setGlobalPrefix(config.get('PREFIX'));

  app.enableCors();

  const options = new DocumentBuilder()
      .setTitle('Nestjs base')
      .setDescription('Nestjs base API')
      .setVersion('0.1')
      .setBasePath(`/${config.get('PREFIX')}`)
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(config.get('PORT'));
}
bootstrap();
