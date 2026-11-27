import { randomInt } from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminRole, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../auth/dto/login.dto';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

export type AdminView = {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
  // True only for the seeded first-run account.
  isDefaultAccount: boolean;
};

const SALT_ROUNDS = 10;
// Used to keep login timing similar when the email is unknown.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', SALT_ROUNDS);
const ADMIN_TOKEN_TTL = '8h';
const DEFAULT_ADMIN_EMAIL = 'admin@evolanka.com';
const DEFAULT_ADMIN_PASSWORD = 'password123';

const ROLE_LABELS: Record<AdminRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  CONTENT_MODERATOR: 'Content Moderator',
  SUPPORT_AGENT: 'Support Agent',
  FINANCE_MANAGER: 'Finance Manager',
};

const toView = (admin: Admin): AdminView => ({
  id: admin.adminId,
  name: admin.name,
  email: admin.email,
  role: admin.role,
  isDefaultAccount: admin.isBootstrap,
});

const nameFromEmail = (email: string) =>
  email
    .split('@')[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');

// Letters and digits without look-alikes (0/O, 1/l/I), with at least one of each class.
const generatePassword = () => {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghijkmnopqrstuvwxyz';
  const digits = '23456789';
  const all = upper + lower + digits;
  const pick = (set: string) => set[randomInt(set.length)];
  const chars = [pick(upper), pick(lower), pick(digits)];
  while (chars.length < 14) chars.push(pick(all));
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
};

@Injectable()
export class AdminService implements OnModuleInit {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly mail: MailService,
  ) {}

  // First run only: with no admins at all, seed the default account used to add the first Super Admin.
  async onModuleInit() {
    if ((await this.prisma.admin.count()) > 0) return;

    const email = (process.env.ADMIN_BOOTSTRAP_EMAIL ?? DEFAULT_ADMIN_EMAIL).trim().toLowerCase();
    const password = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? DEFAULT_ADMIN_PASSWORD;
    try {
      await this.prisma.admin.create({
        data: {
          email,
          name: 'Default Admin',
          password: await bcrypt.hash(password, SALT_ROUNDS),
          role: AdminRole.SUPER_ADMIN,
          isBootstrap: true,
        },
      });
      this.logger.warn(`Seeded default admin account ${email}. It stops working once the first Super Admin is added.`);
    } catch (error) {
      // Another instance seeded it first.
      if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')) throw error;
    }
  }

  async login(dto: LoginDto) {
    const admin = await this.prisma.admin.findUnique({ where: { email: dto.email.trim().toLowerCase() } });
    const valid = await bcrypt.compare(dto.password, admin?.password ?? DUMMY_HASH);
    if (!admin || !valid) throw new UnauthorizedException('Invalid email or password');
    return { token: await this.jwt.signAsync({ sub: admin.adminId, role: 'admin' }, { expiresIn: ADMIN_TOKEN_TTL }), admin: toView(admin) };
  }

  // Always reads the admin from the database so removed admins and role changes take effect immediately.
  async authenticate(token: string): Promise<AdminView> {
    let payload: { sub: number; role: string };
    try {
      payload = await this.jwt.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
    if (payload.role !== 'admin') throw new UnauthorizedException('Invalid or expired token');

    const admin = await this.prisma.admin.findUnique({ where: { adminId: payload.sub } });
    if (!admin) throw new UnauthorizedException('This admin account no longer exists');
    return toView(admin);
  }

  async changePassword(actor: AdminView, dto: ChangePasswordDto) {
    const admin = await this.prisma.admin.findUnique({ where: { adminId: actor.id } });
    if (!admin || !(await bcrypt.compare(dto.currentPassword, admin.password))) {
      throw new BadRequestException('Current password is incorrect');
    }
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException('Choose a new password different from your current password');
    }
    await this.prisma.admin.update({
      where: { adminId: actor.id },
      data: { password: await bcrypt.hash(dto.newPassword, SALT_ROUNDS) },
    });
    return { message: 'Password updated' };
  }

  async list() {
    const admins = await this.prisma.admin.findMany({ orderBy: { adminId: 'asc' } });
    return admins.map(toView);
  }

  async create(actor: AdminView, dto: CreateAdminDto) {
    this.assertSuperAdmin(actor);
    if (actor.isDefaultAccount && dto.role !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('The first admin you add must be a Super Admin');
    }

    const email = dto.email.trim().toLowerCase();
    const password = generatePassword();
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    try {
      // The email goes out inside the transaction, so a failed send leaves nothing created or deleted.
      const admin = await this.prisma.$transaction(
        async (tx) => {
          if (actor.isDefaultAccount) {
            await tx.admin.deleteMany({ where: { adminId: actor.id, isBootstrap: true } });
          }
          const created = await tx.admin.create({
            data: { email, name: nameFromEmail(email), password: hash, role: dto.role },
          });
          await this.mail.sendAdminCredentials({
            to: email,
            roleLabel: ROLE_LABELS[dto.role],
            password,
            invitedBy: actor.isDefaultAccount ? 'the EVOLANKA system' : actor.name,
          });
          return created;
        },
        { timeout: 30_000 },
      );
      return { admin: toView(admin), defaultAccountRetired: actor.isDefaultAccount };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('An admin with this email already exists');
      }
      throw error;
    }
  }

  async updateRole(actor: AdminView, id: number, role: AdminRole) {
    this.assertSuperAdmin(actor);
    if (actor.isDefaultAccount) throw new ForbiddenException('Add a Super Admin first');
    // The actor is a different, real Super Admin, so at least one always remains.
    if (id === actor.id) throw new ForbiddenException('You cannot change your own role');

    try {
      return toView(await this.prisma.admin.update({ where: { adminId: id }, data: { role } }));
    } catch (error) {
      this.rethrowMissing(error);
    }
  }

  async remove(actor: AdminView, id: number) {
    this.assertSuperAdmin(actor);
    if (actor.isDefaultAccount) throw new ForbiddenException('Add a Super Admin first');
    if (id === actor.id) throw new ForbiddenException('You cannot remove your own account');

    try {
      await this.prisma.admin.delete({ where: { adminId: id } });
    } catch (error) {
      this.rethrowMissing(error);
    }
    return { message: 'Admin removed' };
  }

  private assertSuperAdmin(actor: AdminView) {
    if (actor.role !== AdminRole.SUPER_ADMIN) throw new ForbiddenException('Only a Super Admin can manage admins');
  }

  private rethrowMissing(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new NotFoundException('Admin not found');
    }
    throw error;
  }
}
