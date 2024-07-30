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
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { paymentDto } from './dto';
import { PaymentService } from './payment.service';

@UseGuards(JwtGuard)
@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('/all')
  async getAllPayments(@GetUser() user: User) {
    const payments = await this.paymentService.getAllPayments(user.id);
    return {
      message: 'All payments retrieved successfully',
      data: payments,
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async createPayment(@Body() dto: paymentDto, @GetUser() user: User) {
    const newPayment = await this.paymentService.createPayment(user.id, dto);
    return {
      message: 'Payment created successfully',
      data: newPayment,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update/:id')
  async editPaymentById(
    @Param('id') paymentId: string,
    @Body() dto: paymentDto,
    @GetUser() user: User,
  ) {
    const updatedPayment = await this.paymentService.editPaymentById(
      user.id,
      paymentId,
      dto,
    );
    return {
      message: `Payment with ID ${paymentId} updated successfully`,
      data: updatedPayment,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/delete/:id')
  async deletePaymentById(
    @Param('id') paymentId: string,
    @GetUser() user: User,
  ) {
    await this.paymentService.deletePaymentById(user.id, paymentId);
    return {
      message: `Payment with ID ${paymentId} deleted successfully`,
    };
  }
}
