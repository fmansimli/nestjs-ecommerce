import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';

import { CategoriesModule } from './_features/categories/categories.module';
import { ProductsModule } from './_features/products/products.module';
import { SuppliersModule } from './_features/suppliers/suppliers.module';
import { AddressesModule } from './_features/addresses/addresses.module';
import { OrdersModule } from './_features/orders/orders.module';
import { CustomersModule } from './_features/customers/customers.module';
import { ReviewsModule } from './_features/reviews/reviews.module';
import { ShippingModule } from './_features/shipping/shipping.module';
import { CouponsModule } from './_features/coupons/coupons.module';
import { PaymentsModule } from './_features/payments/payments.module';
import { PaymentMethodsModule } from './_features/payment-methods/payment-methods.module';
import { StoresModule } from './_features/stores/stores.module';
import { LanguagesModule } from './_features/languages/languages.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    CategoriesModule,
    ProductsModule,
    SuppliersModule,
    AddressesModule,
    OrdersModule,
    CustomersModule,
    ReviewsModule,
    ShippingModule,
    CouponsModule,
    PaymentsModule,
    PaymentMethodsModule,
    StoresModule,
    LanguagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
