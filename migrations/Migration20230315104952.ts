import { Migration } from '@mikro-orm/migrations';

export class Migration20230315104952 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "suppliers" alter column "deleted_at" type timestamptz(0) using ("deleted_at"::timestamptz(0));');
    this.addSql('alter table "suppliers" alter column "deleted_at" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "suppliers" alter column "deleted_at" type timestamptz(0) using ("deleted_at"::timestamptz(0));');
    this.addSql('alter table "suppliers" alter column "deleted_at" set not null;');
  }

}
