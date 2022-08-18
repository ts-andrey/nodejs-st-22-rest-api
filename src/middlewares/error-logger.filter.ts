import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(InternalServerErrorException)
export class ErrorLoggerFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorData = {
      statusCode: 500,
      message: 'Internal server error',
      path: request.url,
      timestamp: new Date().toISOString(),
      status: status,
    };
    console.log(errorData);
    response.status(status).json(errorData);
  }
}
