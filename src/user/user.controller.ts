import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/all')
  getAllUsers(@GetUser('id') userId: string) {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  async updateUser(
    @Body() dto: UserDto,
    @Param('id') id: string,
    @GetUser('id') userId: string,
  ) {
    const updatedUser = await this.userService.updateUser(id, dto, userId);
    return {
      message: `User with ID ${id} updated successfully`,
      data: updatedUser,
    };
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string, @GetUser('id') userId: string) {
    await this.userService.deleteUser(userId, id);
    return {
      message: `User with ID ${id} deleted successfully`,
    };
  }
}
