import { Test, TestingModule } from '@nestjs/testing';
import { LanguagesService } from './languages.service';

import { Language } from './entities/language.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

describe('LanguagesService', () => {
  let service: LanguagesService;
  let module: TestingModule;

  beforeEach(async () => {
    const fakeLangRepo: Partial<EntityRepository<Language>> = {
      findAll: () => Promise.resolve([]),
    };

    module = await Test.createTestingModule({
      providers: [LanguagesService, , { provide: EntityRepository<Language>, useValue: fakeLangRepo }],
    }).compile();

    service = module.get<LanguagesService>(LanguagesService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
