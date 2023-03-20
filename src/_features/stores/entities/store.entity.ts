import { Entity, PrimaryKey, Property, OneToMany, OneToOne, Collection } from '@mikro-orm/core';

import { Address } from 'src/_features/addresses/entities/address.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ tableName: 'stores' })
export class Store {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date = null;

  @OneToMany(() => Product, (product) => product.store)
  prodcuts = new Collection<Product>(this);

  @OneToOne(() => Address, { nullable: true })
  address: Address;
}
