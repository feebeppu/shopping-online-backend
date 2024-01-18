import { AddressEntity } from '../entities/address.entity';
import { ListCityDTO } from 'src/city/dtos/list-city.dto';

export class ListAddressDTO {
  address: {
    complement: string;
    numberAddress: number;
    cep: string;
    cityName: ListCityDTO;
  };

  constructor(addressEntity: AddressEntity) {
    this.address = {
      complement: addressEntity.complement,
      numberAddress: addressEntity.numberAddress,
      cep: addressEntity.cep,
      cityName: addressEntity.city
        ? new ListCityDTO(addressEntity.city)
        : undefined,
    };
  }
}
