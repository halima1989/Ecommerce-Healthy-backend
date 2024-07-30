import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { checkUserHasAccount, checkUserIsAdmin } from 'src/utils/checkUser';
import { paymentDto } from './dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async getAllPayments(userId: string) {
    await checkUserHasAccount(userId);
    return this.prisma.payment.findMany({
      orderBy: {
        amount: 'desc',
      },
      select: {
        amount: true,
        status: true,
        methodId: true,
      },
    });
  }

  async createPayment(userId: string, dto: paymentDto) {
    await checkUserHasAccount(userId);
    const payment = await this.prisma.payment.create({
      data: {
        amount: dto.amount,
        status: dto.status,
        methodId: dto.methodId,
        orderId: dto.orderId,
      },
    });

    return payment;
  }

  async editPaymentById(userId: string, paymentId: string, dto: paymentDto) {
    await checkUserHasAccount(userId);

    const payment = await this.prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
    });

    if (!payment) {
      throw new ForbiddenException('Payment does not exist');
    }

    return this.prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        amount: dto.amount,
        status: dto.status,
        methodId: dto.methodId,
      },
    });
  }

  async deletePaymentById(userId: string, id: string) {
    await checkUserIsAdmin(userId);

    const payment = await this.prisma.payment.findUnique({
      where: {
        id: id,
      },
    });

    if (!payment) {
      throw new ForbiddenException('Payment does not exist');
    }

    await this.prisma.payment.delete({
      where: {
        id: id,
      },
    });
  }
}
