import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyGateway } from './websocket/websocket.gateway';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: ['http://localhost:3000'] },
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const gateway = app.get(MyGateway)
  gateway.configure();

  SwaggerModule.setup('docs', app, document);
  
  await app.listen(3001);
}
bootstrap();
