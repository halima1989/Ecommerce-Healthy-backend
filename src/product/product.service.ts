import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { checkUserHasAccount, checkUserIsAdmin } from 'src/utils/checkUser';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // async getProducts() {
  //   // await checkUserHasAccount(userId);

  //   return this.prisma.product.findMany({
  //     orderBy: {
  //       name: 'asc',
  //     },
  //   });
  // }

  async getProducts() {
    const products = await this.prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    // await checkUserHasAccount(userId);

    return this.prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getProductsById(userId: string) {
    // await checkUserHasAccount(userId);

    return this.prisma.product.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async searchProducts(productName: string) {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: productName,
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async createProduct(userId: string, dto: ProductDto) {
    try {
      await checkUserIsAdmin(userId);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException(
          'You do not have permission to create a product.',
        );
      }
      throw error;
    }

    const existingProductsWithSameName = await this.prisma.product.findMany({
      where: {
        name: dto.name,
      },
    });
    if (existingProductsWithSameName.length > 0) {
      throw new ForbiddenException('Name already taken');
    }
    const newProduct = await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        imageUrl: dto.imageUrl,
        categoryId: dto.categoryId,
      },
    });

    return newProduct;
  }

  async editProduct(userId: string, productId: string, dto: ProductDto) {
    await checkUserIsAdmin(userId);
    if (!productId) {
      throw new Error('Product ID is required');
    }
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product || product.id !== productId) {
      throw new ForbiddenException('Access to admin account denied');
    }

    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteProduct(userId: string, productId: string) {
    await checkUserIsAdmin(userId);
    if (!productId) {
      throw new Error('Product ID is required');
    }

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new ForbiddenException('Product not found');
    }

    await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return { message: 'Product deleted successfully' };
  }
}
