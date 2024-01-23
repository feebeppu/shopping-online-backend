import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ListProductsDTO } from './dtos/list-products.dto';
import { CreateProductDTO } from './dtos/create-product.dto';
import { CategoryService } from 'src/category/category.service';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    private readonly categoryService: CategoryService,
  ) {}

  async findAllProducts(): Promise<ListProductsDTO[]> {
    const products = await this.productRepository.find();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found!');
    }

    const product = products.map((product) => new ListProductsDTO(product));

    return product;
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product id not found!');
    }

    return product;
  }

  async createProduct(createProduct: CreateProductDTO): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProduct.categoryId);

    return await this.productRepository.save(createProduct);
  }

  async updateProduct(
    productUpdate: UpdateProductDTO,
    productId: number,
  ): Promise<ProductEntity> {
    const product = await this.findProductById(productId);

    return await this.productRepository.save({ ...product, ...productUpdate });
  }

  async deleteProduct(productId: number): Promise<void> {
    await this.findProductById(productId);

    await this.productRepository.delete(productId);
  }
}
