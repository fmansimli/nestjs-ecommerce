import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets';
import { WsResponse } from '@nestjs/websockets/interfaces';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebrtcService } from './webrtc.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway()
export class WebrtcGateway implements OnGatewayConnection {
  constructor(private readonly webrtcService: WebrtcService, private jwtService: JwtService) {}

  async handleConnection(socket: any, ..._args: any[]) {
    try {
      const token = socket.handshake.auth.token.split(' ')[1];
      const data = await this.jwtService.verifyAsync(token);
      socket.data = data as any;
      return;
    } catch (error) {
      //
    }
  }

  @SubscribeMessage('call')
  call(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'call-reply';

    return { event, data };
  }

  @SubscribeMessage('test')
  test(@MessageBody() numbers: number[]): Observable<WsResponse<number>> {
    const event = 'test-reply';

    const _numbers = [4, 5, 6, 7, 77];

    return from(numbers.concat(_numbers)).pipe(
      map((data) => {
        {
          return { event, data };
        }
      }),
    );
  }
}
