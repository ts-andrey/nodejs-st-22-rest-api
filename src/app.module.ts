import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';

import { InfoLoggerMiddleware } from './middlewares/info-logger.middleware';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.example' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT_NUMBER),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_USER_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    GroupsModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggerInterceptor }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InfoLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
