import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUser {
  @IsNotEmpty()
  id?: number;

  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @IsEmail()
  @IsNotEmpty()
  email?: string;
}
