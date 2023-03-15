import { Migration } from '@mikro-orm/migrations';

export class Migration20230315105819 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "addresses" drop constraint "addresses_supplier_id_foreign";');

    this.addSql('alter table "addresses" alter column "deleted_at" type timestamptz(0) using ("deleted_at"::timestamptz(0));');
    this.addSql('alter table "addresses" alter column "deleted_at" drop not null;');
    this.addSql('alter table "addresses" add constraint "addresses_supplier_id_foreign" foreign key ("supplier_id") references "suppliers" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "addresses" drop constraint "addresses_supplier_id_foreign";');

    this.addSql('alter table "addresses" alter column "deleted_at" type timestamptz(0) using ("deleted_at"::timestamptz(0));');
    this.addSql('alter table "addresses" alter column "deleted_at" set not null;');
    this.addSql('alter table "addresses" add constraint "addresses_supplier_id_foreign" foreign key ("supplier_id") references "addresses" ("id") on update cascade;');
  }

}
