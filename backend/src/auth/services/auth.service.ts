import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { CreateUserRequest } from '../dto/create-user-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/model/user.entity';
import { Repository } from 'typeorm';
import { AuthenticationRequest } from '../dto/auth-request.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationResponse } from '../dto/auth-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticateUser(
    loginRequest: AuthenticationRequest,
  ): Promise<AuthenticationResponse> {
    const user = await this.userService.findUserForAuthentication(
      loginRequest.email,
    );
    if (!user) {
      throw new UnauthorizedException(`Wrong email ${loginRequest.email}`);
    }

    const passwordMatch = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException(`Wrong password`);
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      accessToken,
    };
  }

  async createNewUser(
    createUserRequest: CreateUserRequest,
  ): Promise<AuthenticationResponse> {
    const userAlreadyExists = await this.userService.userExists(
      createUserRequest.email,
    );
    if (userAlreadyExists) {
      throw new ConflictException(
        `User with email ${createUserRequest.email} already exists`,
      );
    }

    const hashedPassword = await bcrypt.hash(createUserRequest.password, 10);
    const userToCreate: CreateUserRequest = {
      email: createUserRequest.email,
      firstName: createUserRequest.firstName,
      lastName: createUserRequest.lastName,
      password: hashedPassword,
    };
    const user = await this.userService.createNewUser(userToCreate);

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user,
      accessToken,
    };
  }

  // async refreshToken(refreshTokenRequest: RefreshTokenRequest): Promise<RefreshTokenResponse> {

  // }
}
