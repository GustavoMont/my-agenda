import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { decamelizeKeys } from 'humps';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptioncContent = buildResponseSchema(exception.getResponse());

    const exceptionResponse = handleExceptionResponse(
      exceptioncContent,
      status,
    );

    response.status(status).json(exceptionResponse);
  }
}

const buildResponseSchema = (exceptionContent: string | object) => {
  return typeof exceptionContent === 'string'
    ? {
        message: exceptionContent,
      }
    : exceptionContent;
};

const handleExceptionResponse = (exceptionResponse: object, status: number) =>
  decamelizeKeys({ statusCode: status, ...exceptionResponse });
