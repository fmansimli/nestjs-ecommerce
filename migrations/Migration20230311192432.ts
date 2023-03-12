import { Migration } from '@mikro-orm/migrations';

export class Migration20230311192432 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "languages" ("id" serial primary key, "name" varchar(20) not null, "prefix" varchar(10) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);');
  }

}
