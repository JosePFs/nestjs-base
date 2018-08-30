import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import 'reflect-metadata';

import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors();

  const options = new DocumentBuilder()
      .setTitle('Contentcloud CAF')
      .setDescription('Contentcloud CAF Backend API')
      .setVersion('0.1')
      .setBasePath('/api')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  app.useLogger(app.get(LoggerService));

  app.useGlobalFilters(new HttpExceptionFilter(app.get(LoggerService)));

  await app.listen(3000);
}
bootstrap();
