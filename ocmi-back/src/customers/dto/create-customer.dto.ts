import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID, isEmail } from 'class-validator';

export class CreateCustomerDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    userUid: string;
  
    @ApiProperty()
    @IsNotEmpty()
    bussName: string;
  }
  