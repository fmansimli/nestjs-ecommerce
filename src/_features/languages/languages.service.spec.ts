import { Test, TestingModule } from '@nestjs/testing';
import { EntityRepository } from '@mikro-orm/postgresql';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';

import { LanguagesService } from './languages.service';
import { Language } from './entities/language.entity';

describe('LanguagesService', () => {
  let module: TestingModule;
  let languagesService: LanguagesService;
  let fakeLangRepo: Partial<EntityRepository<Language>>;

  beforeEach(async () => {
    fakeLangRepo = {
      findAll: () => Promise.resolve([]),
      findOne: () => {
        return Promise.resolve(
          new Language({
            id: 1,
            name: 'langg 1',
            prefix: 'lng',
            createdAt: new Date(),
            updatedAt: new Date(),
          }) as any,
        );
      },
    };

    module = await Test.createTestingModule({
      providers: [LanguagesService, { provide: getRepositoryToken(Language), useValue: fakeLangRepo }],
      imports: [MikroOrmModule.forRoot(), MikroOrmModule.forFeature({ entities: [Language] })],
    }).compile();

    languagesService = module.get<LanguagesService>(LanguagesService);
  });

  afterEach(async () => {
    await module?.close();
  });

  it('should be defined', () => {
    expect(languagesService).toBeDefined();
  });

  it('should create a language with a name and prefix', async () => {
    const LANG = { name: 'Lang', prefix: 'prefix' };

    fakeLangRepo.create = () => {
      return { ...LANG, createdAt: new Date(), updatedAt: new Date() } as Language;
    };

    fakeLangRepo.persistAndFlush = () => {
      return Promise.resolve();
    };

    const lang = await languagesService.create({ name: LANG.name, prefix: LANG.prefix });

    expect(lang.name).toBe(LANG.name);
    expect(lang.prefix).toBe(LANG.prefix);
    expect(lang.createdAt).toBeInstanceOf(Date);
    expect(lang.updatedAt).toBeInstanceOf(Date);
  });

  it('should return all languages', async () => {
    fakeLangRepo.findAll = () =>
      Promise.resolve([
        new Language({ id: 1, name: 'lang 1', prefix: 'lng' }),
        new Language({ id: 2, name: 'lang 2', prefix: 'lng' }),
        new Language({ id: 3, name: 'lang 3', prefix: 'lng' }),
      ] as any[]);

    const languages = await languagesService.findAll();

    expect(languages).toBeInstanceOf(Array);
    expect(languages.length).toBe(3);

    const lang = languages[0];

    expect(lang).toBeInstanceOf(Language);
    expect(lang.id).toBe(1);
  });

  it('should return single language by given id', async () => {
    const lang = await languagesService.findOne(1);

    expect(lang).toBeInstanceOf(Language);
    expect(lang.id).toBe(1);
    expect(lang.name).toBe('langg 1');
    expect(lang.createdAt).toBeInstanceOf(Date);
    expect(lang.updatedAt).toBeInstanceOf(Date);
  });

  it('should update a language by given id and return it', async () => {
    const _lang = new Language({
      id: 1,
      name: 'langg 1',
      prefix: 'lng',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    fakeLangRepo.findOne = () => {
      return Promise.resolve(_lang as any);
    };

    fakeLangRepo.assign = (lang: Language, attrs: Partial<Language>) => {
      Object.assign(lang, attrs);
      return lang;
    };
    fakeLangRepo.flush = () => Promise.resolve();

    const lang = await languagesService.update(1, { name: 'test', prefix: 'test' });

    expect(lang.name).toBe('test');
    expect(lang.prefix).toBe('test');
  });

  it('should delete a language and return it', async () => {
    fakeLangRepo.removeAndFlush = (_lang: Language) => {
      return Promise.resolve();
    };

    const lang = await languagesService.remove(1);

    expect(lang.id).toBeDefined();
    expect(lang.id).toBe(1);
    expect(lang.name).toBe('langg 1');
    expect(lang.prefix).toBe('lng');
    expect(lang.createdAt).toBeInstanceOf(Date);
    expect(lang.updatedAt).toBeInstanceOf(Date);
  });
});
