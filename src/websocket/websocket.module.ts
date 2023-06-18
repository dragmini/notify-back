import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { MyGateway } from './websocket.gateway';

@Module({
  providers: [MyGateway, WebsocketService]
})
export class WebsocketModule {}
