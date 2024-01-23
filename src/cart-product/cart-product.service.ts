import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { Repository } from 'typeorm';
import { InsertCartDTO } from 'src/cart/dtos/insert-cart.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,

    private readonly productService: ProductService,
  ) {}

  async havingProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });

    if (!cartProduct) {
      throw new NotFoundException('Cart is empty');
    }

    return cartProduct;
  }

  async insertProductInCart(
    insertCart: InsertCartDTO,
    cartId: number,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(insertCart.productId);

    const cartProduct = await this.havingProductInCart(
      insertCart.productId,
      cartId,
    ).catch(() => undefined);

    if (!cartProduct) {
      return await this.cartProductRepository.save({
        amount: insertCart.amount,
        productId: insertCart.productId,
        cartId,
      });
    } else {
      return this.cartProductRepository.save({
        ...cartProduct,
        amount: cartProduct.amount + insertCart.amount,
      });
    }
  }
}
