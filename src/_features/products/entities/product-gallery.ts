import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity({ tableName: 'product_gallery' })
export class ProductGallery {
  @PrimaryKey()
  id: number;

  @Property()
  imageUrl: string;

  @Property({ type: 'boolean' })
  cover = false;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @ManyToOne(() => Product)
  product: Product;
}
