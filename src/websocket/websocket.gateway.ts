import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
// import { Server } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createServer } from 'http';

@WebSocketGateway(8080)
export class MyGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server:Server;


  @SubscribeMessage('message') // Декоратор для обработки конкретного типа сообщения
  handleIncomingMessage(client: WebSocket, payload: any) {
    // Обработка входящего сообщения
    console.log('Received message:', payload);
    
    // Отправка ответа обратно клиенту
    client.send('Server received your message');
  }

  afterInit() {
    console.log('WebSocket сервер инициализирован');
  }

  handleConnection(client: any) {
    console.log('Новое WebSocket соединение');
  }

  handleDisconnect(client: any) {
    console.log('WebSocket соединение разорвано');
  }

  configure() {
    const httpServer = createServer();
    this.server = new Server({ server: httpServer });

    const proxyMiddleware = createProxyMiddleware('/ws', {
      target: 'ws://localhost:3001',
      ws: true,
      // changeOrigin: true,
    });

    this.server.on('upgrade', (req, socket, head) => {
      proxyMiddleware.upgrade!(req, socket, head);
    });
  }
}
