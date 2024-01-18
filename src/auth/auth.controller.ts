import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDTO } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDTO: LoginDTO): Promise<ReturnLoginDTO> {
    const userLogin = await this.authService.login(loginDTO);

    return userLogin;
  }
}
