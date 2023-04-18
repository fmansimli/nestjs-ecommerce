import { Entity, Property, PrimaryKey, OneToMany, Collection } from '@mikro-orm/core';

import { Payment } from '../../payments/entities/payment.entity';

@Entity({ tableName: 'payment_methods' })
export class PaymentMethod {
  @PrimaryKey()
  id: number;

  @Property({ columnType: 'varchar(50)' })
  name: string;

  @Property()
  description: string;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date = null;

  @OneToMany(() => Payment, (payment) => payment.method)
  payments = new Collection<Payment>(this);
}
