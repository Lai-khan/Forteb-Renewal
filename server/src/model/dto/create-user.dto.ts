import { IsEmail, isEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  readonly id: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
