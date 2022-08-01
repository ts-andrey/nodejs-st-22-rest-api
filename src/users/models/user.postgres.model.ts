import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../services/pg.sequelize.service';

interface UserAttributes {
  id: number;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}
interface UserCreationAttributes {
  login: string;
  password: string;
  age: number;
}

export class User extends Model<UserAttributes, UserCreationAttributes> {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },

    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },

    age: { type: DataTypes.INTEGER, allowNull: false },

    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, modelName: 'User' },
);
