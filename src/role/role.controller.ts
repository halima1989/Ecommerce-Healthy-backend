import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { RoleDto } from './dto/role.dto';

@UseGuards(JwtGuard)
@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('/all')
  getAllRoles(@GetUser() user: User) {
    return this.roleService.getRolesAdmin(user.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async createRole(
    @Body()
    dto: RoleDto,
    @GetUser() user: User,
  ) {
    const role = await this.roleService.createRole(user.id, dto);
    return {
      message: 'Role created successfully',
      role,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update/:id')
  async editRoleById(
    @Param('id') roleId: string,
    @Body() dto: RoleDto,
    @GetUser() user: User,
  ) {
    const role = await this.roleService.editRoleById(user.id, roleId, dto);
    return {
      message: 'Role updated successfully',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  async deleteRoleById(@Param('id') roleId: string, @GetUser() user: User) {
    await this.roleService.deleteRoleById(user.id, roleId);
    return {
      message: 'Role deleted successfully',
    };
  }
}
