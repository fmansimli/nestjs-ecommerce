import { Entity, Property, PrimaryKey, Enum, ManyToOne } from '@mikro-orm/core';

import { PaymentMethod } from '../../payment-methods/entities/payment-method.entity';

@Entity({ tableName: 'payments' })
export class Payment {
  @PrimaryKey()
  id: number;

  @Property({ columnType: 'varchar(20)' })
  @Enum({ items: () => PaymentStatus, nullable: false })
  status: string;

  @Property({ type: 'numeric' })
  amount: number;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date = null;

  @ManyToOne(() => PaymentMethod)
  method: PaymentMethod;
}

enum PaymentStatus {
  AUTHORIZED = 'authorized',
  CAPTURED = 'captured',
  REFUNDED = 'refunded',
}
