import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import 'reflect-metadata';

import { ConfigService } from './config/config.service';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const config = app.get(ConfigService);

  app.useLogger(app.get(LoggerService));

  app.useGlobalInterceptors(new LoggingInterceptor(app.get(LoggerService)));

  app.setGlobalPrefix(config.get('PREFIX'));

  app.enableCors();

  const options = new DocumentBuilder()
      .setTitle('Contentcloud CAF')
      .setDescription('Contentcloud CAF Backend API')
      .setVersion('0.1')
      .setBasePath(`/${config.get('PREFIX')}`)
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(config.get('PORT'));
}
bootstrap();
