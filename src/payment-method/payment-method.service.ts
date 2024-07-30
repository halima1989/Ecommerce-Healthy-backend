import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { checkUserHasAccount, checkUserIsAdmin } from 'src/utils/checkUser';
import { paymentMethodDto } from './dto/paymentMethod.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(private prisma: PrismaService) {}

  async getAllPaymentMethods(userId: string) {
    await checkUserHasAccount(userId);
    return this.prisma.paymentMethod.findMany({
      orderBy: {
        type: 'desc',
      },
      select: {
        id: true,
        type: true,
        details: true,
      },
    });
  }

  async createPaymentMethod(userId: string, dto: paymentMethodDto) {
    await checkUserHasAccount(userId);

    const paymentMethod = await this.prisma.paymentMethod.create({
      data: {
        type: dto.type,
        details: dto.details,
        userId: userId, // Assuming each PaymentMethod is related to a User
      },
    });

    return paymentMethod;
  }

  async editPaymentMethodById(
    userId: string,
    paymentMethodId: string,
    dto: paymentMethodDto,
  ) {
    await checkUserHasAccount(userId);

    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: {
        id: paymentMethodId,
      },
    });

    if (!paymentMethod) {
      throw new ForbiddenException('PaymentMethod does not exist');
    }

    return this.prisma.paymentMethod.update({
      where: {
        id: paymentMethodId,
      },
      data: {
        type: dto.type,
        details: dto.details,
      },
    });
  }

  async deletePaymentMethodById(userId: string, id: string) {
    await checkUserIsAdmin(userId);

    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: {
        id: id,
      },
    });

    if (!paymentMethod) {
      throw new ForbiddenException('PaymentMethod does not exist');
    }

    await this.prisma.paymentMethod.delete({
      where: {
        id: id,
      },
    });
  }
}
