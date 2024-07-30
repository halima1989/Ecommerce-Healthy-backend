import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
export class paymentMethodDto {
  [x: string]: any;
  @MaxLength(50)
  @IsString()
  @IsUUID()
  paymentMethodId: string;

  @ApiProperty({
    type: 'number',
    description: 'Amount',
    example: 21,
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  details: string;
}
