import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { decamelizeKeys } from 'humps';
import { Observable, map } from 'rxjs';

@Injectable()
export class DecamelizeInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data) => decamelizeKeys(data)));
  }
}
