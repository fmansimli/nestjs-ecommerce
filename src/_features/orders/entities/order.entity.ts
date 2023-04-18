import { Entity, PrimaryKey, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { Customer } from '../../customers/entities/customer.entity';

@Entity({ tableName: 'orders' })
export class Order {
  @PrimaryKey()
  id: number;

  @Property({ type: 'decimal' })
  totalPrice: number;

  @Property({ columnType: 'varchar(20)' })
  @Enum(() => OrderStatus)
  status: string;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date = null;

  @ManyToOne(() => Customer)
  customer: Customer;
}

enum OrderStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  REJECTED = 'rejected',
  CANCELED = 'canceled',
}
