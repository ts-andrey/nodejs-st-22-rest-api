import { Column, DataType } from 'sequelize-typescript';

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export class Group {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  permissions: Permission[];
}
