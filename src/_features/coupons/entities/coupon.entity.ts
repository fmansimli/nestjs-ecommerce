import { Entity, PrimaryKey, Property, Enum } from '@mikro-orm/core';

@Entity({ tableName: 'coupons' })
export class Coupon {
  @PrimaryKey()
  id: number;

  @Property()
  code: string;

  @Property({ columnType: 'varchar(20)' })
  @Enum({ items: () => DiscountType, nullable: false })
  discountType: string;

  @Property({ type: 'smallint' })
  discountValue: number;

  @Property({ type: 'timestamp' })
  expirationDate: Date = null;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date = null;
}

enum DiscountType {}
