import { IsNotEmpty, IsString } from 'class-validator';
import { Permission } from '../entities/group.entity';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  permissions: Permission[];
}
