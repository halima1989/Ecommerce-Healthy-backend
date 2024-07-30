import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { orderItemDto } from './dto/orderItem.dto';
@Injectable()
export class OrderItemService {
  getOrderById(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  async getOrderItems(userId: string) {
    // await checkUserIsAdmin(userId);

    return this.prisma.orderItem.findMany({
      select: {
        productId: true,
        price: true,
        quantity: true,
        orderId: true,
      },
    });
  }

  async createOrderItem(userId: string, dto: orderItemDto) {
    // await checkUserIsAdmin(userId);

    const orderItem = await this.prisma.orderItem.create({
      data: {
        quantity: dto.quantity,
        price: dto.price,
        productId: dto.productId,
        orderId: dto.orderId,
      },
    });

    return orderItem;
  }
  async editOrderItem(userId: string, orderItemId: string, dto: orderItemDto) {
    // await checkUserIsAdmin(userId);

    const orderItem = await this.prisma.orderItem.findUnique({
      where: {
        id: orderItemId,
      },
    });

    if (!orderItem || orderItem.id !== orderItemId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.orderItem.update({
      where: {
        id: orderItem.id,
      },
      data: {
        ...dto,
      },
    });
  }
  async deleteOrderItem(userId: string, id: string) {
    // await checkUserIsAdmin(userId);

    const orderItem = await this.prisma.orderItem.findUnique({
      where: {
        id: id,
      },
    });

    if (!orderItem || orderItem.id !== id)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.orderItem.delete({
      where: {
        id: orderItem.id,
      },
    });
  }
}
