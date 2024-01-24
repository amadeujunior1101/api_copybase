import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Copybase - documentation')
    .setDescription('api description')
    .setVersion('1.0')
    .addTag('cobybase')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
