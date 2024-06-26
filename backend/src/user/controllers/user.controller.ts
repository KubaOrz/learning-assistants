import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDTO } from '../dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async getUserData(@Param('email') email: string): Promise<UserDTO> {
    const userData = await this.userService.findUserByEmail(email);
    return userData;
  }
}
