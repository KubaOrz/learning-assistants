import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserRequest } from '../dto/create-user-request.dto';
import { AuthenticationRequest } from '../dto/auth-request.dto';
import { AuthenticationResponse } from '../dto/auth-response.dto';
import { Public } from '../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(
    @Body(ValidationPipe) registerDto: CreateUserRequest,
  ): Promise<AuthenticationResponse> {
    const response = this.authService.createNewUser(registerDto);
    return response;
  }

  @Public()
  @Post('/login')
  @HttpCode(200)
  async login(
    @Body(ValidationPipe) loginDto: AuthenticationRequest,
  ): Promise<AuthenticationResponse> {
    return this.authService.authenticateUser(loginDto);
  }

  @Get('/test')
  test(): string {
    return `Hello!`;
  }
}
