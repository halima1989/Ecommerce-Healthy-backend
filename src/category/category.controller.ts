import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtGuard } from 'src/auth/guard';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  async getAllCategories() {
    const categories = await this.categoryService.getAllCategories();
    return {
      message: 'All categories retrieved successfully',
      data: categories,
    };
  }

  @UseGuards(JwtGuard)
  @Post('/new')
  async insertNewCategory(@Body() dto: CategoryDto) {
    const newCategory = await this.categoryService.insertNewCategory(dto);
    return {
      message: 'Category created successfully',
      data: newCategory,
    };
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  async editCategory(@Body() dto: CategoryDto, @Param('id') id: string) {
    const updatedCategory = await this.categoryService.editCategory(dto, id);
    return {
      message: `Category with ID ${id} updated successfully`,
      data: updatedCategory,
    };
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  async deleteCategory(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);
    return {
      message: `Category with ID ${id} deleted successfully`,
    };
  }
}
