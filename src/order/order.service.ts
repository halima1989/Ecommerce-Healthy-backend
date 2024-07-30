import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrders() {
    return this.prisma.order.findMany();
  }

  async getOrderById(id: string) {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async insertNewOrder(dto: OrderDto, userId: string) {
    return this.prisma.order.create({
      data: {
        userId: userId,
        totalAmount: dto.totalAmount,
        status: dto.status,
      },
    });
  }

  async editOrder(id: string, dto: OrderDto, userId: string) {
    return this.prisma.order.update({
      where: { id },
      data: {
        totalAmount: dto.totalAmount,
        status: dto.status,
      },
    });
  }

  async deleteOrder(id: string) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
