import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import type { Request } from 'express';
import { AdminService, type AdminView } from '../admin.service';

export type AdminRequest = Request & { admin: AdminView };

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly admins: AdminService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AdminRequest>();
    const [scheme, token] = request.headers.authorization?.split(' ') ?? [];
    if (scheme !== 'Bearer' || !token) throw new UnauthorizedException();

    request.admin = await this.admins.authenticate(token);
    return true;
  }
}

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { admin } = context.switchToHttp().getRequest<AdminRequest>();
    if (admin?.role !== AdminRole.SUPER_ADMIN) throw new ForbiddenException('Only a Super Admin can manage admins');
    return true;
  }
}
