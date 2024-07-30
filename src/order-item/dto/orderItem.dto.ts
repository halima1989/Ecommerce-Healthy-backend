import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class orderItemDto {
  @Min(1)
  @Max(10000)
  @IsPositive()
  @IsNumber()
  quantity: number;

  @IsNumber()
  @MaxLength(50)
  @MinLength(1)
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  orderId: string;
}
