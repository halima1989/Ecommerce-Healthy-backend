import {
  IsString,
  IsNotEmpty,
  IsStrongPassword,
  IsEmail,
  isNotEmpty,
  IsOptional,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  isActive: boolean;
}
