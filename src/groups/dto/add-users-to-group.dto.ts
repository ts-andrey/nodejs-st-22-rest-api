import { IsNotEmpty, IsString } from 'class-validator';

export class addUsersToGroupDto {
  @IsNotEmpty()
  @IsString()
  groupID: string;

  @IsNotEmpty()
  @IsString()
  usersID: string[];
}
