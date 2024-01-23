import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { CartProductService } from 'src/cart-product/cart-product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    private readonly cartProductService: CartProductService,
  ) {}

  async isCartActive(userId: number): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({
      where: {
        userId,
        active: true,
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart active not found');
    }

    return cart;
  }

  async createCart(userId: number): Promise<CartEntity> {
    return this.cartRepository.save({
      active: true,
      userId,
    });
  }

  async insertProductInCart(
    insertCart: InsertCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.isCartActive(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.insertProductInCart(insertCart, cart.id);

    return this.findCartWithRelations(userId);
  }

  async findCartWithRelations(userId: number): Promise<CartEntity> {
    const cartWithRelations = await this.cartRepository.findOne({
      where: { userId, active: true },
      relations: {
        cartProduct: {
          product: true,
        },
      },
    });

    if (!cartWithRelations) {
      undefined;
    }

    return cartWithRelations;
  }
}
