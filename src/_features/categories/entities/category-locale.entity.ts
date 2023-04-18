import { Property, PrimaryKey, Entity, ManyToOne, Cascade } from '@mikro-orm/core';

import { Language } from '../../languages/entities/language.entity';
import { Category } from './category.entity';

@Entity({ tableName: 'category_locales' })
export class CategoryLocale {
  constructor(locale: Partial<CategoryLocale>) {
    Object.assign(this, locale);
  }

  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt = null;

  @ManyToOne(() => Language)
  lang?: Language;

  @ManyToOne(() => Category, { cascade: [Cascade.REMOVE] })
  category: Category;
}
