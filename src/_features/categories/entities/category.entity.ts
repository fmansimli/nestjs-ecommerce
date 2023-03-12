import { Property, PrimaryKey, Entity, ManyToMany, Collection, OneToMany } from '@mikro-orm/core';

import { Product } from '../../products/entities/product.entity';
import { CategoryLocale } from './category-locale.entity';

@Entity({ tableName: 'categories' })
export class Category {
  @PrimaryKey()
  id: number;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt = null;

  @ManyToMany(() => Product, 'categories', { owner: true })
  products = new Collection<Product>(this);

  @OneToMany(() => CategoryLocale, (locale) => locale.category)
  locales = new Collection<CategoryLocale>(this);
}
