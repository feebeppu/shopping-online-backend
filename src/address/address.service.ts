import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';
import { ListAddressDTO } from './dtos/list-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    createAddress: CreateAddressDTO,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAddress.cityId);

    return this.addressRepository.save({
      ...createAddress,
      userId,
    });
  }

  async findAddressByUserId(userId: number): Promise<ListAddressDTO[]> {
    const addresses = await this.addressRepository.find({
      where: { userId },
      relations: {
        city: {
          state: true,
        },
      },
    });
    const address = addresses.map((address) => new ListAddressDTO(address));

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException(`Address not found for userId: ${userId}`);
    }

    return address;
  }
}
