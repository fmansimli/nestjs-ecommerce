import { randomBytes } from 'crypto';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import { Password } from '../..//utils';
import { User } from '../users/user.entity';

describe('AuthService', () => {
  let module: TestingModule;
  let service: AuthService;

  const fakeUserService: Partial<UsersService> = {
    findByEmail: async (email: string) => {
      const password = await Password.toHash('password');
      return { email, password, id: 1 } as User;
    },

    create: async (body: { email: string; password: string }) => {
      const hashed = await Password.toHash(body.password);

      return { ...body, password: hashed } as User;
    },
  };
  const fakeJwtService: Partial<JwtService> = {
    sign: (payload: object) => {
      const str = JSON.stringify(payload);

      const algorithm = randomBytes(7).toString('hex');
      const payloadInBase64 = Buffer.from(str, 'utf-8').toString('base64');
      const signature = randomBytes(7).toString('hex');

      const accessToken = `${algorithm}.${payloadInBase64}.${signature}`;
      return accessToken;
    },
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUserService },
        { provide: JwtService, useValue: fakeJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    module?.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a jwt and user who logged in', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const authData = await service.login({ email, password });
    const { auth, user } = authData || {};

    expect(user).toBeDefined();
    expect(auth).toBeDefined();

    expect(auth.accessToken).toBeDefined();

    const buffer = Buffer.from(auth.accessToken.split('.')[1], 'base64');
    const str = buffer.toString('utf-8');

    const payload = JSON.parse(str);

    expect(payload).toBeDefined();
    expect(payload.email).toEqual(email);
    expect(payload.id).toEqual(1);
    expect(payload.claims).toEqual(['all']);
  });

  it('should register a user and return it', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const user = await service.register({ email, password });

    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });
});
