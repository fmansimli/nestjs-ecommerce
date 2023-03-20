import { Property, Entity, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'addresses' })
export class Address {
  constructor(address: Partial<Address>) {
    Object.assign(this, address);
  }

  @PrimaryKey()
  id: number;

  @Property()
  country: string;

  @Property()
  state: string;

  @Property()
  city: string;

  @Property()
  street: string;

  @Property({ type: 'timestamp' })
  createdAt?: Date = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt?: Date = null;
}
