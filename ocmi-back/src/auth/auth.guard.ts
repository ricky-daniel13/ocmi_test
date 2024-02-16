import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

class Token {
  uid: string;
  password: string;
  constructor(uid: string, pass: string) {
    this.uid = uid;
    this.password = pass;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private reflector: Reflector) {} //Inject usersService to load user data, reflector service to check public endpoints

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]); //Gets the public decorator value
    
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.usersService.findOneUid(token.uid);
      if (user.password != token.password) throw new UnauthorizedException();
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): Token | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // Create a buffer from the string
    if(!token)
      return undefined;

    let bufferObj = Buffer.from(token, "base64");

    // Encode the Buffer as a utf8 string
    let loginInfo = bufferObj.toString("utf8");
    const [uid, hashpass] = loginInfo.split(':') ?? [];
    return type === 'Basic' && uid && hashpass
      ? new Token(uid, hashpass)
      : undefined;
  }
}
