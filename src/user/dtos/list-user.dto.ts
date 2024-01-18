import { ListAddressDTO } from 'src/address/dtos/list-address.dto';
import { UserEntity } from '../entities/user.entity';

export class ListUserDTO {
  user: {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
  };
  addresses?: ListAddressDTO[];

  constructor(userEntity: UserEntity) {
    (this.user = {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      cpf: userEntity.cpf,
      phone: userEntity.phone,
    }),
      (this.addresses = userEntity.addresses
        ? userEntity.addresses.map((address) => new ListAddressDTO(address))
        : undefined);
  }
}
