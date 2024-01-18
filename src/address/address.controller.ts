import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';
import { ListAddressDTO } from './dtos/list-address.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(
    @Body() createAddress: CreateAddressDTO,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return await this.addressService.createAddress(createAddress, userId);
  }

  @Get()
  async findAddressByUserId(
    @UserId() userId: number,
  ): Promise<ListAddressDTO[]> {
    return await this.addressService.findAddressByUserId(userId);
  }
}
