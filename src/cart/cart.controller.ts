import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { ListCartDTO } from './dtos/list-cart.dto';

@Roles(UserType.Admin, UserType.User)
@Roles(UserType.User)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async insertProductInCart(
    @Body() insertCart: InsertCartDTO,
    @UserId() userId: number,
  ): Promise<ListCartDTO> {
    return new ListCartDTO(
      await this.cartService.insertProductInCart(insertCart, userId),
    );
  }
}
