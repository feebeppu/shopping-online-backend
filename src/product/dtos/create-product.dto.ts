import { IsInt, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsInt()
  categoryId: number;

  @IsString()
  productName: string;

  @IsInt()
  price: number;

  @IsString()
  image: string;
}
