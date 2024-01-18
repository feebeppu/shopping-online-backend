import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { isEmailUniq } from '../validation/isEmailUniq';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @isEmailUniq({ message: 'Este email já existe, tente outro!' })
  email: string;

  @IsString()
  phone: string;

  @IsString()
  cpf: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,30}$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
  })
  password: string;
}
