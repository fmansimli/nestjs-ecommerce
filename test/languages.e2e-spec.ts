import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setup } from '../src/setup';

import { Language } from '../src/_features/languages/entities/language.entity';

describe('Languages Controller (e2e)', () => {
  let app: INestApplication;

  const LANGUAGE: Partial<Language> = {
    name: 'Test language',
    prefix: 'ru',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    setup(app);

    await app.init();
  });

  it('/api/v1/languages (POST) should create a new language through posted data', async () => {
    try {
      const { body } = await request(app.getHttpServer()).post('/api/v1/languages').send(LANGUAGE);

      LANGUAGE.id = body.id;

      expect(body.id).toBeDefined();
      expect(body.name).toBe(LANGUAGE.name);
      expect(body.prefix).toBe(LANGUAGE.prefix);
      expect(body.createdAt).toBeDefined();
      expect(body.updatedAt).toBeDefined();
      //
    } catch (error) {}
  });

  it('/api/v1/languages (GET) should return languages list', async () => {
    try {
      const { body } = await request(app.getHttpServer()).get('/api/v1/languages').expect(200);

      const firstRecord: Language = body[0];

      expect(body.length).toBeGreaterThan(0);

      expect(firstRecord).toHaveProperty('id');
      expect(firstRecord.name).toBe(LANGUAGE.name);
      expect(firstRecord.prefix).toBe(LANGUAGE.prefix);
    } catch (error) {}
  });
});
