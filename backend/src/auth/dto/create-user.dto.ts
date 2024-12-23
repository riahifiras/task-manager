import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Username for the new user' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password for the new user', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;
}
