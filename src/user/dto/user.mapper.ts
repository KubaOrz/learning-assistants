import { Injectable } from '@nestjs/common';
import { User } from '../model/user.entity';
import { UserDTO } from './user.dto';

@Injectable()
export class UserMapper {
  mapToDto(user: User): UserDTO {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
