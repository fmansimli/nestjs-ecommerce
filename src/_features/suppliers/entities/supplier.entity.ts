import { Entity, Property, PrimaryKey, OneToOne } from '@mikro-orm/core';
import { Address } from '../../addresses/entities/address.entity';

@Entity({ tableName: 'suppliers' })
export class Supplier {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  phone: string;

  @Property({ type: 'timestamp' })
  createdAt?: Date = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt?: Date = null;

  @OneToOne(() => Address, { orphanRemoval: true })
  address: Address;
}
