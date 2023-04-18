import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
  OneToMany,
  ManyToOne,
} from '@mikro-orm/core';

import { Category } from '../../categories/entities/category.entity';
import { ProductVariation } from './product-variation.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Store } from '../../stores/entities/store.entity';

@Entity({ tableName: 'products' })
export class Product {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ type: 'numeric' })
  price: number;

  @Property({ nullable: true })
  description: string;

  @Property()
  sku: number;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date = null;

  @ManyToMany(() => Category, (category) => category.products)
  categories = new Collection<Category>(this);

  @OneToMany(() => ProductVariation, (variation) => variation.product)
  variations = new Collection<ProductVariation>(this);

  @OneToMany(() => Review, (review) => review.product)
  reviews = new Collection<Review>(this);

  @ManyToOne(() => Store)
  store: Store;
}
