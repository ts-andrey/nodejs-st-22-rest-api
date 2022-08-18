import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const args = context.getArgs();
        const method = context.getHandler().name; // "create"
        const controller = context.getClass().name; // "CatsController"
        const dataObj = { arguments: args, method, controller };
        console.log(dataObj);
        return throwError(() => err);
      }),
    );
  }
}
