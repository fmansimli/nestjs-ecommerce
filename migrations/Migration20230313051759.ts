import { Migration } from '@mikro-orm/migrations';

export class Migration20230313051759 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "addresses" ("id" serial primary key, "country" varchar(255) not null, "state" varchar(255) not null, "city" varchar(255) not null, "street" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) not null, "supplier_id" int not null, "store_id" int not null);');
    this.addSql('alter table "addresses" add constraint "addresses_supplier_id_unique" unique ("supplier_id");');
    this.addSql('alter table "addresses" add constraint "addresses_store_id_unique" unique ("store_id");');

    this.addSql('create table "categories" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);');

    this.addSql('create table "coupons" ("id" serial primary key, "code" varchar(255) not null, "discount_type" varchar(20) not null, "discount_value" smallint not null, "expiration_date" timestamptz(0) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);');

    this.addSql('create table "customers" ("id" serial primary key, "firstname" varchar(50) not null, "lastname" varchar(50) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);');

    this.addSql('create table "languages" ("id" serial primary key, "name" varchar(20) not null, "prefix" varchar(10) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);');

    this.addSql('create table "category_locales" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "lang_id" int not null, "category_id" int not null);');

    this.addSql('create table "orders" ("id" serial primary key, "total_price" numeric(10,0) not null, "status" varchar(20) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "customer_id" int not null);');

    this.addSql('create table "payment_methods" ("id" serial primary key, "name" varchar(50) not null, "description" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);');

    this.addSql('create table "payments" ("id" serial primary key, "status" varchar(20) not null, "amount" numeric(10,0) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "method_id" int not null);');

    this.addSql('create table "shipping" ("id" serial primary key, "name" varchar(50) not null, "description" varchar(255) not null, "price" numeric(10,0) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);');

    this.addSql('create table "stores" ("id" serial primary key, "name" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "address_id" int not null);');
    this.addSql('alter table "stores" add constraint "stores_address_id_unique" unique ("address_id");');

    this.addSql('create table "products" ("id" serial primary key, "name" varchar(255) not null, "price" numeric(10,0) not null, "description" varchar(255) null, "sku" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "store_id" int not null);');

    this.addSql('create table "product_reviews" ("id" serial primary key, "rating" smallint not null, "comment" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "product_id" int not null, "customer_id" int not null);');

    this.addSql('create table "product_variations" ("id" serial primary key, "name" varchar(50) not null, "description" text not null, "price" numeric(10,0) not null, "sku" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "product_id" int not null);');

    this.addSql('create table "order_items" ("id" serial primary key, "quantity" int not null, "price" numeric(10,0) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order_id" int not null, "product_id" int not null);');

    this.addSql('create table "categories_products" ("category_id" int not null, "product_id" int not null, constraint "categories_products_pkey" primary key ("category_id", "product_id"));');

    this.addSql('create table "suppliers" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) not null, "address_id" int not null);');
    this.addSql('alter table "suppliers" add constraint "suppliers_address_id_unique" unique ("address_id");');

    this.addSql('alter table "addresses" add constraint "addresses_supplier_id_foreign" foreign key ("supplier_id") references "addresses" ("id") on update cascade;');
    this.addSql('alter table "addresses" add constraint "addresses_store_id_foreign" foreign key ("store_id") references "addresses" ("id") on update cascade;');

    this.addSql('alter table "category_locales" add constraint "category_locales_lang_id_foreign" foreign key ("lang_id") references "languages" ("id") on update cascade;');
    this.addSql('alter table "category_locales" add constraint "category_locales_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade;');

    this.addSql('alter table "orders" add constraint "orders_customer_id_foreign" foreign key ("customer_id") references "customers" ("id") on update cascade;');

    this.addSql('alter table "payments" add constraint "payments_method_id_foreign" foreign key ("method_id") references "payment_methods" ("id") on update cascade;');

    this.addSql('alter table "stores" add constraint "stores_address_id_foreign" foreign key ("address_id") references "addresses" ("id") on update cascade;');

    this.addSql('alter table "products" add constraint "products_store_id_foreign" foreign key ("store_id") references "stores" ("id") on update cascade;');

    this.addSql('alter table "product_reviews" add constraint "product_reviews_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;');
    this.addSql('alter table "product_reviews" add constraint "product_reviews_customer_id_foreign" foreign key ("customer_id") references "customers" ("id") on update cascade;');

    this.addSql('alter table "product_variations" add constraint "product_variations_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;');

    this.addSql('alter table "order_items" add constraint "order_items_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update cascade;');
    this.addSql('alter table "order_items" add constraint "order_items_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;');

    this.addSql('alter table "categories_products" add constraint "categories_products_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "categories_products" add constraint "categories_products_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "suppliers" add constraint "suppliers_address_id_foreign" foreign key ("address_id") references "addresses" ("id") on update cascade;');
  }

}
