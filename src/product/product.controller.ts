import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllProducts() {
    return await this.productService.findAllProducts();
  }

  @Roles(UserType.Admin)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }

  @Roles(UserType.Admin)
  @Delete('/:productId')
  async deleteProduct(@Param('productId') productId: number): Promise<void> {
    await this.productService.deleteProduct(productId);
  }

  @Roles(UserType.Admin)
  @Put('/:productId')
  async updateProduct(
    @Body() productUpdate: UpdateProductDTO,
    @Param('productId') productId: number,
  ): Promise<ProductEntity> {
    return await this.productService.updateProduct(productUpdate, productId);
  }
}
