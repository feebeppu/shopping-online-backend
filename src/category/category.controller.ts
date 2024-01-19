import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ListCategoriesDTO } from './dtos/list-categories.dto';
import { UserType } from 'src/user/enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ListCategoriesDTO[]> {
    return await this.categoryService.findAllCategories();
  }

  @Roles(UserType.Admin)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategoryDTO,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }
}
