import { Property, Entity, PrimaryKey, OneToOne } from '@mikro-orm/core';

import { Supplier } from '../../suppliers/entities/supplier.entity';
import { Store } from 'src/_features/stores/entities/store.entity';

@Entity({ tableName: 'addresses' })
export class Address {
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
  createdAt: Date = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ type: 'timestamp' })
  deletedAt: Date = null;

  @OneToOne(() => Address, { orphanRemoval: true })
  supplier: Supplier;

  @OneToOne(() => Address, { orphanRemoval: true })
  store: Store;
}
