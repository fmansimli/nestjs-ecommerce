import { Property, PrimaryKey, Entity, ManyToOne } from '@mikro-orm/core';

import { Product } from '../../products/entities/product.entity';
import { Customer } from '../../customers/entities/customer.entity';

@Entity({ tableName: 'product_reviews' })
export class Review {
  @PrimaryKey()
  id: number;

  @Property({ type: 'smallint' })
  rating: number;

  @Property({ type: 'tinytext' })
  comment: string;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date = null;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Customer)
  customer: Customer;
}
