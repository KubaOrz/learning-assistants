import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDTO } from '../dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async getUserData(@Param('email') email: string): Promise<UserDTO> {
    const userData = await this.userService.findUserByEmail(email);
    return userData;
  }
}
