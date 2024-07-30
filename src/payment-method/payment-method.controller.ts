import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { PaymentMethodsService } from './payment-method.service';
import { paymentMethodDto } from './dto';

@UseGuards(JwtGuard)
@ApiTags('paymentMethods')
@Controller('paymentMethods')
export class PaymentMethodsController {
  constructor(private paymentMethodsService: PaymentMethodsService) {}

  @Get('/all')
  async getAllPaymentMethods(@GetUser() user: User) {
    const paymentMethods =
      await this.paymentMethodsService.getAllPaymentMethods(user.id);
    return {
      message: 'All payment methods retrieved successfully',
      data: paymentMethods,
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async createPaymentMethods(
    @Body()
    dto: paymentMethodDto,
    @GetUser() user: User,
  ) {
    const newPaymentMethod =
      await this.paymentMethodsService.createPaymentMethod(user.id, dto);
    return {
      message: 'Payment method created successfully',
      data: newPaymentMethod,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update/:id')
  async editPaymentMethodsById(
    @Param('id') paymentMethodsId: string,
    @Body() dto: paymentMethodDto,
    @GetUser() user: User,
  ) {
    const updatedPaymentMethod =
      await this.paymentMethodsService.editPaymentMethodById(
        user.id,
        paymentMethodsId,
        dto,
      );
    return {
      message: `Payment method with ID ${paymentMethodsId} updated successfully`,
      data: updatedPaymentMethod,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/delete/:id')
  async deletePaymentMethodsById(
    @Param('id') paymentMethodsId: string,
    @GetUser() user: User,
  ) {
    await this.paymentMethodsService.deletePaymentMethodById(
      user.id,
      paymentMethodsId,
    );
    return {
      message: `Payment method with ID ${paymentMethodsId} deleted successfully`,
    };
  }
}
