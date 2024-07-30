import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { OrderItemModule } from './order-item/order-item.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { RoleModule } from './role/role.module';
import { ImageModule } from './image/image.module';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    OrderModule,
    PrismaModule,
    AuthModule,
    CategoryModule,
    OrderItemModule,
    PaymentModule,
    PaymentMethodModule,
    RoleModule,
    ImageModule,
    EmailModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
