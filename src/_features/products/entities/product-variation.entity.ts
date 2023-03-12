import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity({ tableName: 'product_variations' })
export class ProductVariation {
  @PrimaryKey()
  id: number;

  @Property({ columnType: 'varchar(50)' })
  name: string;

  @Property({ type: 'text' })
  description: string;

  @Property({ type: 'numeric' })
  price: number;

  @Property()
  sku: number;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date = null;

  @ManyToOne(() => Product)
  product: Product;
}
