import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'price',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(1000000)
  price: number;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
