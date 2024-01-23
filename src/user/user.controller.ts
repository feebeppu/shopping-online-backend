import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { ListUserDTO } from './dtos/list-user.dto';
import { UpdatePasswordDTO } from './dtos/update-password-dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';

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

  @Roles(UserType.Admin, UserType.User)
  @Patch()
  async updatePasswordUser(
    @Body() updatePassword: UpdatePasswordDTO,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updatePasswordUser(updatePassword, userId);
  }
}
