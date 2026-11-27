import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminRoleDto } from './dto/update-admin-role.dto';
import { AdminAuthGuard, SuperAdminGuard, type AdminRequest } from './guards/admin-auth.guard';

@Controller('admin/admins')
@UseGuards(AdminAuthGuard)
export class AdminsController {
  constructor(private readonly admins: AdminService) {}

  @Get()
  list() {
    return this.admins.list();
  }

  @Post()
  @UseGuards(SuperAdminGuard)
  create(@Req() req: AdminRequest, @Body() dto: CreateAdminDto) {
    return this.admins.create(req.admin, dto);
  }

  @Patch(':id/role')
  @UseGuards(SuperAdminGuard)
  updateRole(@Req() req: AdminRequest, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAdminRoleDto) {
    return this.admins.updateRole(req.admin, id, dto.role);
  }

  @Delete(':id')
  @UseGuards(SuperAdminGuard)
  remove(@Req() req: AdminRequest, @Param('id', ParseIntPipe) id: number) {
    return this.admins.remove(req.admin, id);
  }
}
