import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { WebrtcService } from './webrtc.service';
import { WebrtcGateway } from './webrtc.gateway';

import { jwtConstants } from '../../_features/auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      verifyOptions: { ignoreExpiration: false },
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [WebrtcGateway, WebrtcService],
})
export class WebrtcModule {}
