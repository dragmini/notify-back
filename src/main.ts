import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyGateway } from './websocket/websocket.gateway';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const gateway = app.get(MyGateway)
  gateway.configure();
  
  await app.listen(3001);
}
bootstrap();
