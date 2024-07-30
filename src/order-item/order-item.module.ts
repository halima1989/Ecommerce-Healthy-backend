import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service'; // Correction de 'OrderItemService' en 'orderItemService'

import { OrderItemController } from './order-item.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, PrismaService],
})
export class OrderItemModule {}
