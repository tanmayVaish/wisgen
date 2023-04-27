import { IsEmail, IsMobilePhone, IsString } from 'class-validator';

export class registerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  areaCode: string;

  @IsMobilePhone()
  mobile: string;

  @IsString()
  password: string;
}
