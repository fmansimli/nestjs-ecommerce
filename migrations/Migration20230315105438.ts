import { Migration } from '@mikro-orm/migrations';

export class Migration20230315105438 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "addresses" drop constraint "addresses_store_id_foreign";');

    this.addSql('alter table "addresses" add constraint "addresses_store_id_foreign" foreign key ("store_id") references "stores" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "addresses" drop constraint "addresses_store_id_foreign";');

    this.addSql('alter table "addresses" add constraint "addresses_store_id_foreign" foreign key ("store_id") references "addresses" ("id") on update cascade;');
  }

}
