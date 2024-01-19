import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ListCategoriesDTO } from './dtos/list-categories.dto';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAllCategories(): Promise<ListCategoriesDTO[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories empty or not found!');
    }

    const category = categories.map(
      (category) => new ListCategoriesDTO(category),
    );

    return category;
  }

  async createCategory(
    createCategory: CreateCategoryDTO,
  ): Promise<CategoryEntity> {
    const existingCategory = await this.findCategoryByName(
      createCategory.categoryName,
    ).catch(() => undefined);

    if (existingCategory) {
      throw new BadRequestException('Category name already exists!');
    }

    return this.categoryRepository.save(createCategory);
  }

  async findCategoryByName(categoryName: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { categoryName },
    });

    if (!category) {
      throw new NotFoundException('Category name not found!');
    }

    return category;
  }
}
