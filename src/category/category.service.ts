import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    return this.prisma.category.findMany({
      where: {
        name: 'house',
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async insertNewCategory(categoryDto: CategoryDto) {
    return this.prisma.category.create({
      data: {
        name: categoryDto.name,
      },
    });
  }

  async editCategory(dto: CategoryDto, id: string) {
    return this.prisma.category.findMany({
      where: {
        name: 'house',
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async deleteCategory(id: string) {
    return this.prisma.category.findMany({
      where: {
        name: 'house',
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
