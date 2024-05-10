import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/users/createUser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly UsersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    entryDate,
    email,
    password,
    name,
    lastName,
    pinPos,
    shift,
    role,
    employeeNumber,
  }: CreateUserDto) {
    const user = await this.UsersService.findByEmail(email);
    const numberColor = Math.floor(Math.random() * 11);
    const color =
      numberColor === 1
        ? '#8D89CC'
        : numberColor === 2
          ? '#AD83AE'
          : numberColor === 3
            ? '#C37BA1'
            : numberColor === 4
              ? '#B06C4C'
              : numberColor === 5
                ? '#C38B7B'
                : numberColor === 6
                  ? '#D39D58'
                  : numberColor === 7
                    ? '#B6AE19'
                    : numberColor === 8
                      ? '#88B167'
                      : numberColor === 9
                        ? '#53AE9A'
                        : '#4E96B1';

    if (user) {
      throw new BadRequestException('Este correo ya esta en uso');
    }
    return this.UsersService.create({
      entryDate,
      shift,
      name,
      lastName,
      email,
      password: await bcryptjs.hash(password, 10),
      pinPos,
      color,
      role,
      employeeNumber,
    });
  }
  async login({ email, password }: LoginDto) {
    const user = await this.UsersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        'El email y/o contraseña son incorrectos',
      );
    }
    const isValidCredentials: LoginDto = await bcryptjs.compare(
      password,
      user.password,
    );
    if (!isValidCredentials) {
      throw new UnauthorizedException(
        'El email y/o contraseña son incorrectos',
      );
    }
    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { token, email };
  }

  async loginPos({ employeeNumber, pinPos }: any) {
    const user = await this.UsersService.findByEmployeeNumber(employeeNumber);
    if (!user) {
      throw new UnauthorizedException(
        'El email y/o contraseña son incorrectos',
      );
    }
    const isValidCredentials = user.pinPos === pinPos ? true : false;
    if (!isValidCredentials) {
      throw new UnauthorizedException(
        'El email y/o contraseña son incorrectos',
      );
    }
    const payload = { email: user.email, user: user };
    const token = await this.jwtService.signAsync(payload);

    return { token, payload };
  }
}
