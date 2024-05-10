import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/users/createUser.dto';
import { LoginDto } from './dto/login.dto';
import { profile } from 'console';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signIn')
  loginPos(@Body() body: any) {
    return this.authService.loginPos(body);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(
    @Request()
    req: any,
  ) {
    return req.user;
  }
}
