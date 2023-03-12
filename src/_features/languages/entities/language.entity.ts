import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';

import { CategoryLocale } from 'src/_features/categories/entities/category-locale.entity';

@Entity({ tableName: 'languages' })
export class Language {
  @PrimaryKey()
  id: number;

  @Property({ columnType: 'varchar(20)' })
  name: string;

  @Property({ columnType: 'varchar(10)' })
  prefix: string;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date = null;

  @OneToMany(() => CategoryLocale, (locale) => locale.lang)
  categories = new Collection<CategoryLocale>(this);
}
