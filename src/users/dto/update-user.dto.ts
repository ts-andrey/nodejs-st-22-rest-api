import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
    message:
      'password must contain at least 1 letter and 1 number, no special characters is allowed',
  })
  @MinLength(3)
  @IsString()
  password: string;

  @IsNumber()
  @Min(4)
  @Max(130)
  age: number;

  @IsBoolean()
  isDeleted: boolean;
}
