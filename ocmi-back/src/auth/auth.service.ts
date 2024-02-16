import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(loginDto: LoginDto): Promise<any> {
    console.log("Entering service login");
    console.log(loginDto);
    const user = await this.usersService.findOneMail(loginDto.username);
    if(!user)
      throw new UnauthorizedException();
    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException();
    }
    const { mail, access, ...result } = user; //This should be some kind of auth token.
    return result;
  }
}

