import { User } from '../entities/user.entity';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsString()
  name: string;
}
