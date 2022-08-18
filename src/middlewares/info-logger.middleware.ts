import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class InfoLoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const data = {
      path: req.url,
      method: req.method,
      request: req,
      response: res,
    };
    console.log(data);
    next();
  }
}
