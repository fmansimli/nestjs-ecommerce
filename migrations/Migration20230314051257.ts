import { Migration } from '@mikro-orm/migrations';

export class Migration20230314051257 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "category_locales" drop constraint "category_locales_category_id_foreign";');

    this.addSql('alter table "category_locales" alter column "category_id" type int using ("category_id"::int);');
    this.addSql('alter table "category_locales" alter column "category_id" drop not null;');
    this.addSql('alter table "category_locales" add constraint "category_locales_category_id_foreign" foreign key ("category_id") references "categories" ("id") on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "category_locales" drop constraint "category_locales_category_id_foreign";');

    this.addSql('alter table "category_locales" alter column "category_id" type int using ("category_id"::int);');
    this.addSql('alter table "category_locales" alter column "category_id" set not null;');
    this.addSql('alter table "category_locales" add constraint "category_locales_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade;');
  }

}
