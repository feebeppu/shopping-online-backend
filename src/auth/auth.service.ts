import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDTO } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDTO } from './dtos/returnLogin.dto';
import { ListUserDTO } from 'src/user/dtos/list-user.dto';
import { LoginPayloadDTO } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<ReturnLoginDTO> {
    const user: UserEntity = await this.userService
      .findUserByEmail(loginDTO.email)
      .catch(() => undefined);
    const isMatch = await compare(loginDTO.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password invalid');
    }

    return {
      accessToken: await this.jwtService.sign({ ...new LoginPayloadDTO(user) }),
      user: new ListUserDTO(user),
    };
  }
}
