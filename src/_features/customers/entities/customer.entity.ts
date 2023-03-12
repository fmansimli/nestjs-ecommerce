import { Entity, PrimaryKey, OneToMany, Property, Collection } from '@mikro-orm/core';

import { Order } from 'src/_features/orders/entities/order.entity';
import { Review } from 'src/_features/reviews/entities/review.entity';

@Entity({ tableName: 'customers' })
export class Customer {
  @PrimaryKey()
  id: number;

  @Property({ columnType: 'varchar(50)' })
  firstname: string;

  @Property({ columnType: 'varchar(50)' })
  lastname: string;

  @Property()
  email: string;

  @Property()
  phone: string;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date = null;

  @OneToMany(() => Order, (order) => order.customer)
  orders = new Collection<Order>(this);

  @OneToMany(() => Review, (review) => review.customer)
  reviews = new Collection<Review>(this);
}
