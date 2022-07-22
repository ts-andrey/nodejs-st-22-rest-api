import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetUsersFilterDTO {
  @IsOptional()
  @IsString()
  loginSubstring?: string;

  @IsOptional()
  @IsNumberString()
  limit?: number;
}
