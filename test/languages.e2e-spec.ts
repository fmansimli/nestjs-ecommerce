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
      const { body } = await request(app.getHttpServer())
        .post('/api/v1/languages')
        .send(LANGUAGE)
        .expect(201);

      LANGUAGE.id = body.id;

      expect(body.id).toBeDefined();
      expect(body.name).toBe(LANGUAGE.name);
      expect(body.prefix).toBe(LANGUAGE.prefix);
      expect(body.createdAt).toBeDefined();
      expect(body.updatedAt).toBeDefined();
      //
    } catch (error) {
      throw error;
    }
  });

  it('/api/v1/languages (GET) should return languages list', async () => {
    try {
      const { body } = await request(app.getHttpServer()).get('/api/v1/languages').expect(200);

      const firstRecord: Language = body[0];

      expect(body.length).toBeGreaterThan(0);

      expect(firstRecord).toHaveProperty('id');
      expect(firstRecord).toHaveProperty('createdAt');
      expect(firstRecord).toHaveProperty('updatedAt');
      expect(firstRecord.name).toBe(LANGUAGE.name);
      expect(firstRecord.prefix).toBe(LANGUAGE.prefix);
    } catch (error) {
      throw error;
    }
  });

  it('/api/v1/languages/:id (GET) should return a lang by given id', async () => {
    try {
      const { body } = await request(app.getHttpServer())
        .get('/api/v1/languages/' + LANGUAGE.id)
        .expect(200);

      expect(body.id).toBe(LANGUAGE.id);
      expect(body.prefix).toBe(LANGUAGE.prefix);
      expect(body.name).toBe(LANGUAGE.name);
      expect(body.createdAt).toBeDefined();
      expect(body.updatedAt).toBeDefined();
    } catch (error) {
      throw error;
    }
  });

  it('/api/v1/languages/:id (PATCH) should update a lang by given id', async () => {
    const attrs = {
      name: 'Language 1',
      prefix: 'lng',
    };

    try {
      const { body } = await request(app.getHttpServer())
        .put('/api/v1/languages/' + LANGUAGE.id)
        .send(attrs)
        .expect(200);

      LANGUAGE.name = attrs.name;
      LANGUAGE.prefix = attrs.prefix;

      expect(body.id).toBe(LANGUAGE.id);
      expect(body.prefix).toBe(attrs.prefix);
      expect(body.name).toBe(attrs.name);
      expect(body.createdAt).toBeDefined();
      expect(body.updatedAt).toBeDefined();
    } catch (error) {
      throw error;
    }
  });

  it('/api/v1/languages/:id (DELETE) should delete a lang by given id', async () => {
    try {
      const { body } = await request(app.getHttpServer())
        .delete('/api/v1/languages/' + LANGUAGE.id)
        .expect(200);

      expect(body.id).toBe(LANGUAGE.id);
      expect(body.prefix).toBe(LANGUAGE.prefix);
      expect(body.name).toBe(LANGUAGE.name);
      expect(body.createdAt).toBeDefined();
      expect(body.updatedAt).toBeDefined();
    } catch (error) {
      throw error;
    }
  });

  it('/api/v1/languages/:id (GET) should throw 404 error', async () => {
    try {
      await request(app.getHttpServer())
        .delete('/api/v1/languages/' + LANGUAGE.id)
        .expect(404);
    } catch (error) {
      throw error;
    }
  });
});
