import { CategoryEntity } from '../entities/category.entity';

export class ListCategoriesDTO {
  id: number;
  name: string;

  constructor(categoryEntity: CategoryEntity) {}
}
