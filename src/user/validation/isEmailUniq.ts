import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from '../user.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: any): Promise<boolean> {
    try {
      const existingUserWithEmail =
        await this.userService.findUserByEmail(value);
      return !existingUserWithEmail;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return true;
      }
      throw error;
    }
  }
}

export const isEmailUniq = (validationOptions: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqValidator,
    });
  };
};
