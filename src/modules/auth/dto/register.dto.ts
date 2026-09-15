import { IsEmail, IsString, MinLength, IsMobilePhone } from 'class-validator';

export class RegisterDto {
  @IsString()  fullName: string;
  @IsEmail()   email:    string;
  @IsMobilePhone() phone: string;
  @IsString() @MinLength(8) password: string;
}
