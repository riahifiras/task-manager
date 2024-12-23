import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Username of the user' })
  username: string;

  @ApiProperty({ description: 'Password of the user' })
  password: string;
}
