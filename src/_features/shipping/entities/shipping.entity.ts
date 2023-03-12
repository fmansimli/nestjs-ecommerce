import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Shipping {
  @PrimaryKey()
  id: number;

  @Property({ columnType: 'varchar(50)' })
  name: string;

  @Property({ type: 'tinytext' })
  description: string;

  @Property({ type: 'numeric' })
  price: number;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date = null;
}
