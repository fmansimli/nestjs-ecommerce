import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

export const setup = (app: INestApplication) => {
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
};
