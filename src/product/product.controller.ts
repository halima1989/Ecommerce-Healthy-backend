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

import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { ProductService } from './product.service';
import { ProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @UseGuards(JwtGuard)
  @Get('/all')
  getProducts() {
    return this.productService.getProducts();
  }

  @Get('/search/:name')
  searchProducts(@Param('name') productName: string) {
    return this.productService.searchProducts(productName);
  }

  // @UseGuards(JwtGuard)
  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductsById(id);
  }

  @UseGuards(JwtGuard)
  @Post('/new')
  createProduct(@GetUser('id') userId: string, @Body() dto: ProductDto) {
    return this.productService.createProduct(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('/edit/:id')
  editProduct(
    @GetUser('id') userId: string,
    @Param('id') productId: string,
    @Body() dto: ProductDto,
  ) {
    return this.productService.editProduct(userId, productId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteProduct(@GetUser('id') userId: string, @Param('id') productId: string) {
    return this.productService.deleteProduct(userId, productId);
  }
}
