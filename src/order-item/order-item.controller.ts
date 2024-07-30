import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { OrderItemService } from './order-item.service';
import { orderItemDto } from './dto/orderItem.dto';

@Controller('orderItem')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @UseGuards(JwtGuard)
  @Get('/all')
  async getAllOrders(@Req() req: any) {
    const userId = req.user.id;
    const orderItems = await this.orderItemService.getOrderItems(userId);
    return {
      message: 'All order items retrieved successfully',
      data: orderItems,
    };
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  async getOrderById(@Param('id') id: string) {
    const orderItem = await this.orderItemService.getOrderById(id);
    return {
      message: `Order item with ID ${id} retrieved successfully`,
      data: orderItem,
    };
  }

  @UseGuards(JwtGuard)
  @Post('/')
  async createOrderItem(@Req() req: any, @Body() dto: orderItemDto) {
    const userId = req.user.id;
    const newOrderItem = await this.orderItemService.createOrderItem(
      userId,
      dto,
    );
    return {
      message: 'Order item created successfully',
      data: newOrderItem,
    };
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  async editOrderItem(
    @Param('id') id: string,
    @Body() dto: orderItemDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    const updatedOrderItem = await this.orderItemService.editOrderItem(
      id,
      userId,
      dto,
    );
    return {
      message: `Order item with ID ${id} updated successfully`,
      data: updatedOrderItem,
    };
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  async deleteOrder(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    await this.orderItemService.deleteOrderItem(id, userId);
    return {
      message: `Order item with ID ${id} deleted successfully`,
    };
  }
}
