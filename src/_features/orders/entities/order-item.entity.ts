import { Property, Entity, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity({ tableName: 'order_items' })
export class OrderItem {
  @PrimaryKey()
  id: number;

  @Property()
  quantity: number;

  @Property({ type: 'numeric' })
  price: number;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @ManyToOne(() => Order)
  order: Order;

  @ManyToOne(() => Product)
  product: Product;
}
