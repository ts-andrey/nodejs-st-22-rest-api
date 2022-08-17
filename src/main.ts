import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorLoggerFilter } from './middlewares/error-logger.filter';

process.on('uncaughtException', (error, origin) =>
  console.log({ error, origin }),
);

process.on('unhandledRejection', (reason, promise) =>
  console.log({ reason, promise }),
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorLoggerFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
