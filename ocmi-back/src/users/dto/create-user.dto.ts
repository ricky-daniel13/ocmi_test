import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, isEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  access: number;
}
