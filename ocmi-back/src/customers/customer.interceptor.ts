import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomersService } from './customers.service';
import { User } from '@prisma/client';

@Injectable()
export class CustomerInterceptor implements NestInterceptor {
  constructor(private customersService: CustomersService){};
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user: User = request['user'];
    
    console.log("Executing interceptor");
    console.log(user);

    const now = Date.now();
    return next.handle();
  }
}