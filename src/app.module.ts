import { Module } from '@nestjs/common';
import { PostgressService } from './services/pg.sequelize.service';

import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [PostgressService],
})
export class AppModule {}
