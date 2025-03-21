import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-use.dto';

import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}
  @Post('signup')
  signup(
    @Body()
    userDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }
}
