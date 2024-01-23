import { ListCartProductDTO } from 'src/cart-product/dtos/list-cart-product.dto';
import { CartEntity } from '../entities/cart.entity';

export class ListCartDTO {
  id: number;
  userId: number;
  cartProduct?: ListCartProductDTO[];

  constructor(cartWithRelations: CartEntity) {
    this.id = cartWithRelations.id;
    this.userId = cartWithRelations.userId;
    this.cartProduct = cartWithRelations.cartProduct
      ? cartWithRelations.cartProduct.map(
          (cartProduct) => new ListCartProductDTO(cartProduct),
        )
      : undefined;
  }
}
