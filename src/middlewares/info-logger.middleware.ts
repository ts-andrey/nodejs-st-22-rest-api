import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class InfoLoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const data = {
      url: req.url,
      method: req.method,
      request: req,
      response: res,
    };
    console.log(JSON.stringify(data));
    next();
  }
}
