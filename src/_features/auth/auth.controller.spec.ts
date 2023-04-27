import { randomBytes } from 'crypto';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

interface IAuth {
  email: string;
  password: string;
}

describe('AuthController', () => {
  let module: TestingModule;
  let controller: AuthController;

  const fakeAuthService: Partial<AuthService> = {
    login: async (body: IAuth) => {
      const resp = {
        user: body,
        auth: { accessToken: randomBytes(13).toString('hex') },
      };

      return Promise.resolve(resp) as any;
    },
    register: (body: IAuth) => {
      return Promise.resolve({
        ...body,
        password: randomBytes(7).toString('hex'),
      }) as any;
    },
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const user = await controller.register({ email, password });

    expect(user).toBeDefined();
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  it('should be able to login and return jwt and appropriate user', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const data = await controller.login({ email, password });
    const { user, auth } = data;

    expect(user).toBeDefined();
    expect(user.email).toEqual(email);
    expect(auth.accessToken).toBeDefined();
  });

  it('should throw BadRequestException if email or password is invalid', async () => {
    fakeAuthService.login = () => Promise.resolve(null);

    const email = 'test@example.com';
    const password = 'password';

    await expect(controller.login({ email, password })).rejects.toThrow(BadRequestException);
  });
});
