import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { UserMapper } from '../dto/user.mapper';
import { CreateUserRequest } from '../../auth/dto/create-user-request.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly userMapper: UserMapper
    ) {}

    async findUserForAuthentication(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found!`);
        }
        return user;
    }

    async userExists(email: string): Promise<boolean> {
        const exists = await this.userRepository.existsBy({ email });
        return exists;
    }

    async findUserByEmail(email: string): Promise<UserDTO> {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found!`);
        }
        return this.userMapper.mapToDto(user);
    }

    async createNewUser(createUserRequest: CreateUserRequest): Promise<UserDTO> {
        const newUser = new User();
        newUser.email = createUserRequest.email;
        newUser.password = createUserRequest.password;
        newUser.firstName = createUserRequest.firstName;
        newUser.lastName = createUserRequest.lastName;

        const savedUser = await this.userRepository.save(newUser);
        return this.userMapper.mapToDto(savedUser);
      }
}
