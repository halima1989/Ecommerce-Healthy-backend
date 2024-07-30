import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-method.service';
import { PaymentMethodsController } from './payment-method.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService, PrismaService],
})
export class PaymentMethodModule {}
