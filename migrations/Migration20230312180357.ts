import { Migration } from '@mikro-orm/migrations';

export class Migration20230312180357 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category_locales" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "lang_id" int not null, "category_id" int not null);');

    this.addSql('alter table "category_locales" add constraint "category_locales_lang_id_foreign" foreign key ("lang_id") references "languages" ("id") on update cascade;');
    this.addSql('alter table "category_locales" add constraint "category_locales_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade;');

    this.addSql('alter table "addresses" add column "store_id" int not null;');
    this.addSql('alter table "addresses" add constraint "addresses_store_id_foreign" foreign key ("store_id") references "addresses" ("id") on update cascade;');
    this.addSql('alter table "addresses" add constraint "addresses_store_id_unique" unique ("store_id");');

    this.addSql('alter table "stores" add column "address_id" int not null;');
    this.addSql('alter table "stores" add constraint "stores_address_id_foreign" foreign key ("address_id") references "addresses" ("id") on update cascade;');
    this.addSql('alter table "stores" add constraint "stores_address_id_unique" unique ("address_id");');

    this.addSql('alter table "products" add column "store_id" int not null;');
    this.addSql('alter table "products" add constraint "products_store_id_foreign" foreign key ("store_id") references "stores" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "addresses" drop constraint "addresses_store_id_foreign";');

    this.addSql('alter table "products" drop constraint "products_store_id_foreign";');

    this.addSql('alter table "stores" drop constraint "stores_address_id_foreign";');

    this.addSql('alter table "addresses" drop constraint "addresses_store_id_unique";');

    this.addSql('alter table "categories" add column "name" varchar(255) not null, add column "description" varchar(255) not null;');

    this.addSql('alter table "stores" drop constraint "stores_address_id_unique";');
  }

}
