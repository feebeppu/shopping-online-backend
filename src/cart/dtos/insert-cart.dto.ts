import { IsInt } from 'class-validator';

export class InsertCartDTO {
  @IsInt()
  productId: number;

  @IsInt()
  amount: number;
}
