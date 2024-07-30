import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtGuard)
  @Get('/all')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }
  @UseGuards(JwtGuard)
  @Post('/new')
  async insertNewOrder(@Body() dto: OrderDto, @Req() req: any) {
    const userId = req.user.id;
    const order = await this.orderService.insertNewOrder(dto, userId);
    return {
      message: 'Order created successfully',
      data: order,
    };
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  async editOrder(
    @Param('id') id: string,
    @Body() dto: OrderDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    const updatedOrder = await this.orderService.editOrder(id, dto, userId);
    return {
      message: `Order with ID ${id} updated successfully`,
      data: updatedOrder,
    };
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  async deleteOrder(@Param('id') id: string) {
    await this.orderService.deleteOrder(id);
    return {
      message: `Order with ID ${id} deleted successfully`,
    };
  }
}
