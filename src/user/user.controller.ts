import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { ListUserDTO } from './dtos/list-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    const createdUser = await this.userService.createUser(createUser);

    const listUser = new ListUserDTO(createdUser);
    const message = 'Usuário Criado com sucesso';

    return { listUser, message };
  }

  @Get()
  async getAllUser(): Promise<ListUserDTO[]> {
    return await this.userService.getAllUser();
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ListUserDTO> {
    return this.userService.getUserByIdUsingRelations(userId);
  }
}
