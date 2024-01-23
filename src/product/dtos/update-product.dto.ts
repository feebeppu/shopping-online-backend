import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsString()
  productName: string;

  @IsOptional()
  @IsInt()
  price: number;

  @IsOptional()
  @IsString()
  image: string;
}
