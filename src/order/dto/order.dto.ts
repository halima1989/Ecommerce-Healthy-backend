import { OrderStatus } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty()
  @IsOptional()
  status?: OrderStatus;
}
