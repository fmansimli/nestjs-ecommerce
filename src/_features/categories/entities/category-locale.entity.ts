import { Property, PrimaryKey, Entity, ManyToOne } from '@mikro-orm/core';

import { Language } from 'src/_features/languages/entities/language.entity';
import { Category } from './category.entity';

@Entity({ tableName: 'category_locales' })
export class CategoryLocale {
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
  lang: Language;

  @ManyToOne(() => Category)
  category: Category;
}
