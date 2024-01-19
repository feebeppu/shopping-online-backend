import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListUserDTO } from './dtos/list-user.dto';
import { UserType } from './enum/user-type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    const salt = 10;
    const passwordHash = await hash(createUser.password, salt);

    return this.userEntityRepository.save({
      ...createUser,
      typeUser: UserType.User,
      password: passwordHash,
    });
  }

  async getUserByIdUsingRelations(userId: number): Promise<ListUserDTO> {
    const userWithAddress = await this.userEntityRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });

    const usersWithAddressList = new ListUserDTO(userWithAddress);

    return usersWithAddressList;
  }

  async getAllUser(): Promise<ListUserDTO[]> {
    const users = await this.userEntityRepository.find();
    const usersList = users.map((user) => new ListUserDTO(user));

    return usersList;
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userEntityRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('UserId Not Found');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userEntityRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Email Not Found');
    }

    return user;
  }
}
