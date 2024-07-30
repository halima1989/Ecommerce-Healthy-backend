import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
export class paymentDto {
  [x: string]: any;
  @MaxLength(50)
  @IsString()
  @IsUUID()
  paymentId: string;

  @ApiProperty({
    type: 'number',

    description: 'Amount',
    example: 21,
  })
  @Min(1)
  @Max(1000)
  @IsNumber()
  @IsPositive()
  amount: number;
}
