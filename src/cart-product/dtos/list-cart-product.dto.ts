import { ListProductsDTO } from 'src/product/dtos/list-products.dto';
import { CartProductEntity } from '../entities/cart-product.entity';
import { ListCartDTO } from 'src/cart/dtos/list-cart.dto';

export class ListCartProductDTO {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ListProductsDTO;
  cart?: ListCartDTO;

  constructor(cartProduct: CartProductEntity) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cartId;
    this.productId = cartProduct.productId;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new ListProductsDTO(cartProduct.product)
      : undefined;
    this.cart = cartProduct.cart
      ? new ListCartDTO(cartProduct.cart)
      : undefined;
  }
}
