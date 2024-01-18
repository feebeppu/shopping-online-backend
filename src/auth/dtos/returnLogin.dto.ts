import { ListUserDTO } from 'src/user/dtos/list-user.dto';

export class ReturnLoginDTO {
  user: ListUserDTO;
  accessToken: string;
}
