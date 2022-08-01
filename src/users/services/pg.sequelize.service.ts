import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres', 'ants', 'barelyAnt', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  define: {
    timestamps: false,
  },
});

@Injectable()
export class PostgressService {
  async connect() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}
