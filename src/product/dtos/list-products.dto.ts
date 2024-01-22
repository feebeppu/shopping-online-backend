import { ProductEntity } from '../entities/product.entity';

export class ListProductsDTO {
  id: number;
  productName: string;
  price: number;
  image: string;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.productName = productEntity.productName;
    this.price = productEntity.price;
    this.image = productEntity.image;
  }
}
