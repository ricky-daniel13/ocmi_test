import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Access } from './access.decorator';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    let access = this.reflector.get(Access, context.getHandler());
    console.log("Executing access guard");
    console.log(access);
    if (access === undefined) {
      access = 1;
    }
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if(isPublic)
      return true;


    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    console.log("Current user data: ");
    console.log(user);
    return (user.access >= access)

  }
}
